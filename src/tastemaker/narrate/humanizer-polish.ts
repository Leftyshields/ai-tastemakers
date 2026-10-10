import Anthropic from "@anthropic-ai/sdk";
import type { ScoredRepo } from "../types.js";
import type { TokenUsage } from "../quality/tokens.js";
import { sanitizeBriefOutput, BRIEF_SECTION_LABELS } from "./sanitize.js";
import { extractUsage } from "./claude.js";

export const HUMANIZER_POLISH_SYSTEM_PROMPT = [
  "You edit daily repository briefs for a generalist technical audience.",
  "Rewrite each brief so it sounds like a sharp human wrote it, not generic AI marketing copy.",
  "Cut AI tells: filler transitions, hype, stock phrases, formulaic openers, and empty praise.",
  "Do not invent facts. Keep every concrete claim from the source brief.",
  "Preserve exact URLs, repository names (owner/repo), and numeric values when they appear.",
  "Keep the three labeled sections and their order. Each section stays one to two sentences.",
  "Make jargon understandable: if a repo name or term assumes specialist knowledge, add a short plain phrase on what it is and why a builder would care.",
  "Output only valid JSON matching the requested schema. No markdown fences or commentary.",
].join(" ");

export interface HumanizerPolishItem {
  full_name: string;
  html_url: string;
  brief: string;
}

export interface HumanizerPolishBatchResult {
  briefs: Map<string, string | null>;
  usage?: TokenUsage;
  prompt_chars: number;
  latency_ms: number;
  /** Whole-batch API or parse failure — caller should keep all originals. */
  batch_failed: boolean;
  /** Per-repo validation failures — those repos fall back to originals. */
  validation_fallbacks: string[];
}

const URL_PATTERN = /https?:\/\/[^\s)\]>]+/gi;

function uniqueUrls(text: string): string[] {
  return [...new Set((text.match(URL_PATTERN) ?? []).map((u) => u.replace(/[.,;]+$/, "")))];
}

function numericTokens(text: string): string[] {
  const matches = text.match(/\d[\d,]*(?:\.\d+)?/g) ?? [];
  return [...new Set(matches.map((n) => n.replace(/,/g, "")))];
}

/** Returns an error string when polish must be rejected; null when acceptable. */
export function validatePolishedBrief(
  original: string,
  polished: string,
  repo: Pick<HumanizerPolishItem, "full_name" | "html_url">,
): string | null {
  const cleaned = sanitizeBriefOutput(polished);
  if (!cleaned) return "missing labeled sections after sanitize";

  for (const label of BRIEF_SECTION_LABELS) {
    if (!cleaned.includes(label)) return `missing section label ${label}`;
  }

  if (original.includes(repo.full_name) && !cleaned.includes(repo.full_name)) {
    return "repository name removed";
  }

  for (const url of uniqueUrls(original)) {
    if (!cleaned.includes(url)) return `url removed: ${url}`;
  }

  for (const num of numericTokens(original)) {
    if (num.length >= 2 && !cleaned.replace(/,/g, "").includes(num)) {
      return `number removed: ${num}`;
    }
  }

  return null;
}

export function buildHumanizerPolishPrompt(items: HumanizerPolishItem[]): string {
  const payload = items.map((item) => ({
    full_name: item.full_name,
    html_url: item.html_url,
    brief: item.brief,
  }));

  return [
    "Polish each brief below. Return JSON only:",
    '{"repos":[{"full_name":"owner/repo","brief":"**What it does:** ...\\n\\n**Why now:** ...\\n\\n**Build with it:** ..."}]}',
    "",
    "Include every repository from the input. Do not drop repos.",
    "",
    JSON.stringify({ repos: payload }, null, 2),
  ].join("\n");
}

function parsePolishResponse(raw: string, expectedNames: Set<string>): Map<string, string> {
  const trimmed = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    throw new Error("polish response is not valid JSON");
  }

  const repos = (parsed as { repos?: unknown }).repos;
  if (!Array.isArray(repos)) throw new Error("polish response missing repos array");

  const out = new Map<string, string>();
  for (const row of repos) {
    if (!row || typeof row !== "object") continue;
    const name = (row as { full_name?: unknown }).full_name;
    const brief = (row as { brief?: unknown }).brief;
    if (typeof name !== "string" || typeof brief !== "string") continue;
    if (!expectedNames.has(name)) continue;
    out.set(name, brief.trim());
  }

  if (out.size === 0) throw new Error("polish response contained no usable briefs");
  return out;
}

export function applyHumanizerPolishToBriefs(
  items: HumanizerPolishItem[],
  polishedByName: Map<string, string>,
): { briefs: Map<string, string | null>; validation_fallbacks: string[] } {
  const briefs = new Map<string, string | null>();
  const validation_fallbacks: string[] = [];

  for (const item of items) {
    const polishedRaw = polishedByName.get(item.full_name);
    if (!polishedRaw) {
      validation_fallbacks.push(`${item.full_name}: missing from polish response`);
      briefs.set(item.full_name, sanitizeBriefOutput(item.brief));
      continue;
    }
    const err = validatePolishedBrief(item.brief, polishedRaw, item);
    if (err) {
      validation_fallbacks.push(`${item.full_name}: ${err}`);
      briefs.set(item.full_name, sanitizeBriefOutput(item.brief));
      continue;
    }
    briefs.set(item.full_name, sanitizeBriefOutput(polishedRaw));
  }

  return { briefs, validation_fallbacks };
}

export function itemsFromReposAndBriefs(
  repos: ScoredRepo[],
  briefs: Map<string, string | null>,
): HumanizerPolishItem[] {
  const items: HumanizerPolishItem[] = [];
  for (const repo of repos) {
    const brief = briefs.get(repo.full_name);
    const cleaned = sanitizeBriefOutput(brief ?? null);
    if (!cleaned) continue;
    items.push({ full_name: repo.full_name, html_url: repo.html_url, brief: cleaned });
  }
  return items;
}

export interface HumanizerPolishConfig {
  humanizerPolish: boolean;
  anthropicApiKey: string;
  anthropicModel: string;
}

export async function runHumanizerPolishIfEnabled(
  config: HumanizerPolishConfig,
  repos: ScoredRepo[],
  briefs: Map<string, string | null>,
  polishFn: typeof humanizerPolishBriefs = humanizerPolishBriefs,
): Promise<{ briefs: Map<string, string | null>; polish?: HumanizerPolishBatchResult }> {
  if (!config.humanizerPolish) {
    return { briefs };
  }
  const items = itemsFromReposAndBriefs(repos, briefs);
  const polish = await polishFn(config.anthropicApiKey, config.anthropicModel, items);
  const merged = new Map(briefs);
  for (const [name, text] of polish.briefs) {
    merged.set(name, text);
  }
  return { briefs: merged, polish };
}

export async function humanizerPolishBriefs(
  apiKey: string,
  model: string,
  items: HumanizerPolishItem[],
): Promise<HumanizerPolishBatchResult> {
  const empty = (): HumanizerPolishBatchResult => ({
    briefs: new Map(items.map((i) => [i.full_name, sanitizeBriefOutput(i.brief)])),
    prompt_chars: 0,
    latency_ms: 0,
    batch_failed: false,
    validation_fallbacks: [],
  });

  if (items.length === 0) return empty();

  const prompt = buildHumanizerPolishPrompt(items);
  const prompt_chars = prompt.length;
  const expectedNames = new Set(items.map((i) => i.full_name));
  const started = Date.now();

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model,
      max_tokens: Math.min(8192, 400 + items.length * 450),
      system: HUMANIZER_POLISH_SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });
    const latency_ms = Date.now() - started;
    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
      console.warn("Humanizer polish: empty model response; using unpolished briefs");
      return {
        ...empty(),
        usage: extractUsage(message),
        prompt_chars,
        latency_ms,
        batch_failed: true,
      };
    }

    let polishedByName: Map<string, string>;
    try {
      polishedByName = parsePolishResponse(block.text, expectedNames);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`Humanizer polish: ${msg}; using unpolished briefs`);
      return {
        ...empty(),
        usage: extractUsage(message),
        prompt_chars,
        latency_ms,
        batch_failed: true,
      };
    }

    const { briefs, validation_fallbacks } = applyHumanizerPolishToBriefs(items, polishedByName);
    if (validation_fallbacks.length > 0) {
      console.warn(
        `Humanizer polish: ${validation_fallbacks.length} repo(s) fell back to unpolished:`,
        validation_fallbacks.join("; "),
      );
    }

    return {
      briefs,
      usage: extractUsage(message),
      prompt_chars,
      latency_ms,
      batch_failed: false,
      validation_fallbacks,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`Humanizer polish failed: ${msg}; using unpolished briefs`);
    return {
      ...empty(),
      prompt_chars,
      latency_ms: Date.now() - started,
      batch_failed: true,
    };
  }
}
