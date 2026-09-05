import Anthropic from "@anthropic-ai/sdk";
import { listExperimentIds, loadExperiment } from "../experiments/load.js";
import type { WeeklyAggregate, WeeklyEmailCopy, WeeklyNarrative } from "../types.js";

export const WEEKLY_SECTION_HEADERS = [
  { key: "executive" as const, title: "For executives" },
  { key: "generalist" as const, title: "For AI generalists" },
  { key: "statistician" as const, title: "The numbers" },
];

const LEGACY_HEADER_MAP: Record<string, keyof WeeklyNarrative> = {
  opening: "generalist",
  "ai tastemakers": "generalist",
  "skill tastemakers": "generalist",
  "cross-lane themes": "generalist",
  "builder takeaway": "executive",
  "for executives": "executive",
  "for ai generalists": "generalist",
  "the numbers": "statistician",
};

export function emptyWeeklyNarrative(): WeeklyNarrative {
  return { executive: "", generalist: "", statistician: "" };
}

export function fallbackWeeklyNarrative(reason: string): WeeklyNarrative {
  return {
    executive: `Weekly editorial synthesis was unavailable (${reason}). The numbers below are complete.`,
    generalist: "",
    statistician: "",
  };
}

export function coerceWeeklyNarrative(raw: unknown): WeeklyNarrative {
  if (!raw || typeof raw !== "object") return emptyWeeklyNarrative();
  const n = raw as Record<string, unknown>;
  const str = (key: string) => (typeof n[key] === "string" ? (n[key] as string) : "");
  if (str("executive") || str("generalist") || str("statistician")) {
    return {
      executive: str("executive"),
      generalist: str("generalist"),
      statistician: str("statistician"),
    };
  }
  return {
    executive: str("takeaway"),
    generalist: [str("opening"), str("oss"), str("skills"), str("cross_lane")].filter(Boolean).join("\n\n"),
    statistician: "",
  };
}

export function buildWeeklyPrompt(aggregate: WeeklyAggregate): string {
  const payload = {
    week_id: aggregate.week_id,
    week_start: aggregate.week_start,
    week_end: aggregate.week_end,
    stats: aggregate.stats,
  };

  const lines = [
    "You are the editorial voice of Tastemakers — a weekly briefing on AI open source and agent skills on GitHub.",
    "",
    `Write a weekly wrap-up for ${aggregate.week_start} through ${aggregate.week_end} (${aggregate.week_id}).`,
    "",
    "Write for three audiences in order, general → specific. Do NOT dump every repo. Do NOT invent numbers that are not in DATA.",
    "",
    "Audience rules:",
    "- For executives: 3–5 sentences. Strategic. What to remember if you run a team. No ranking jargon, no unexplained acronyms. If you name a project, say what it does in the same sentence. End with the bet or watch-item for the quarter.",
    "- For AI generalists: 1–2 short paragraphs. What changed in the builder stack. Explain the notable projects in plain language. You may name repos. Skip star counts and day-streak lists.",
    "- The numbers: 1–3 sentences on how to read the stats (what is skewed, what is a real streak). Do not repeat the JSON tables; we will append those.",
    "",
    aggregate.stats.ranking_modes.some((m) => m !== "delta_7d")
      ? "Note: some daily digests used bootstrap ranking while 7-day star history was maturing — caveat momentum stats accordingly."
      : "",
    "",
    "DATA (JSON):",
    JSON.stringify(payload, null, 2),
    "",
    "Respond in English using exactly these markdown section headers in order (## Header):",
    ...WEEKLY_SECTION_HEADERS.map((s) => `## ${s.title}`),
  ];

  return lines.filter((l) => l !== undefined).join("\n");
}

function appendSection(current: string, incoming: string): string {
  if (!incoming) return current;
  if (!current) return incoming;
  return `${current}\n\n${incoming}`;
}

export function parseWeeklyNarrative(text: string): WeeklyNarrative {
  const empty = emptyWeeklyNarrative();
  const trimmed = text.trim();
  if (!trimmed) return empty;

  const headerPattern = /^##\s+(.+)$/gm;
  const matches = [...trimmed.matchAll(headerPattern)];

  if (matches.length === 0) {
    return { ...empty, executive: trimmed };
  }

  const narrative = { ...empty };

  for (let i = 0; i < matches.length; i++) {
    const title = matches[i][1].trim().toLowerCase();
    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? trimmed.length) : trimmed.length;
    const body = trimmed.slice(start, end).trim();
    const key = LEGACY_HEADER_MAP[title];
    if (!key) continue;
    narrative[key] = appendSection(narrative[key], body);
  }

  if (!narrative.executive && !narrative.generalist && !narrative.statistician) {
    return { ...empty, executive: trimmed };
  }

  return narrative;
}

export async function narrateWeekly(
  apiKey: string,
  model: string,
  aggregate: WeeklyAggregate,
): Promise<WeeklyNarrative> {
  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model,
      max_tokens: 2500,
      messages: [{ role: "user", content: buildWeeklyPrompt(aggregate) }],
    });

    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
      console.warn("Claude weekly synthesis returned no text");
      return fallbackWeeklyNarrative("empty response");
    }

    return parseWeeklyNarrative(block.text.trim());
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`Claude weekly synthesis failed: ${msg}`);
    return fallbackWeeklyNarrative(msg);
  }
}

const WEEKLY_EMAIL_SYSTEM_PROMPT = `You write the Sunday email for AI Tastemakers. One reader: a working engineer who builds with AI, is short on time, and is smart but has NOT been watching these repos trend. They do not already know the repo names, what each one does, or how the two lists work. Earn their attention; do not assume it.

This is a weekly wrap-up with a point of view, not the ranked list. Tell the story of the week from the daily top 10 and land on what it means. Flowing prose. No internal section headers like "The tell" or "Evidence".

WRITE, in this order, with these exact headers:

## Verdict
The week's takeaway as a plain, natural sentence a stranger would understand. The payoff of the story, said up front as a hook. This opens the email body (the inbox subject is a standing wrap-up label, not this sentence). Write it the way you would say it out loud. No contorted constructions. Someone who has never seen the lists still gets it.

## Body
One piece of prose (paragraphs separated by blank lines). No subheads.

Open on the single most interesting thing that actually moved this week: a repo, a surge, a surprise. Something concrete with energy. Not a thesis statement.

Then walk two or three threads through the real repos that defined the week. Make why-now the engine: why this surged this week, not last month. Let the pattern build so the reader feels it by the third repo instead of being told it in sentence one.

Use day anchors (Monday, by Thursday) ONLY when the Daily #1 data actually shows that timing. Never invent or smooth a chronology for momentum (do not say a repo "led both lists" unless it was #1 on both the same day). If the week has no real day-by-day arc, tell it straight without the timeline.

Any concrete detail about what a repo does or contains must come from that repo's excerpt in DATA, not a plausible-sounding guess. If you only have the function at a high level, stay high level. Do not invent files, features, measurements, or product claims. An example in the excerpt illustrates the product; it is not the product. Name the function first (Ponytail steers agents toward minimal solutions), then you may use the example.

Close with the so-what: one paragraph that tells the reader what the week means for what they build. A genuine takeaway (the shape of the field is shifting, a problem is consolidating, a layer is maturing), not a restatement of the hook.

Inclusivity:
- On first mention of any repo, say in plain language what it DOES before you say why it matters. A noun alone is not enough. Bad: "OmniRoute is the router." Good: "OmniRoute (a gateway that sends each request to one of hundreds of model providers)..."
- Define light jargon in a few words the first time (what a coding agent is, what memory means for an agent).
- Never assume the reader knows the two lists, last week's repos, or prior issues. On first mention, AI Tastemakers is the daily list of open-source AI tools; Skill Tastemakers is the daily list of skills you install on an agent.

Each named repo must be a markdown link on first mention, using the exact GitHub URL from DATA: [Name](https://github.com/owner/repo). Never invent a URL. If DATA has no URL, write the name in plain text. First mention only.

Referent check: the noun you assign each repo must match what that repo is.

RULES:
- 200 to 250 words in the Body (Verdict is extra). Cut anything that reads as summary.
- Do NOT reference our tooling, Lab, telemetry, token budgets, experiments, or how this digest is produced. The email is about the week's repos, not about us.
- Trending measures attention, not adoption or spend. Frame the so-what as what attention concentrated on and what that suggests, and say so plainly once. No quantified cost or adoption claim you cannot back from public numbers.
- Use the same name for each list everywhere: AI Tastemakers and Skill Tastemakers.
- Quiet week: say so plainly and keep it short. Never manufacture a thesis.
- No em dashes. No hype words (revolutionary, game-changer, unlock, supercharge). Plain, direct, opinionated. Semicolons over dashes.
- The site page keeps the full layered version. This email is the short story.`;

export function parseWeeklyEmailMarkdown(text: string): WeeklyEmailCopy | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const headerPattern = /^##\s+(.+)$/gm;
  const matches = [...trimmed.matchAll(headerPattern)];
  const sections: Record<string, string> = {};
  for (let i = 0; i < matches.length; i++) {
    const title = matches[i][1].trim().toLowerCase();
    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? trimmed.length) : trimmed.length;
    sections[title] = trimmed.slice(start, end).trim();
  }
  const verdict = sections.verdict;
  const body =
    sections.body ||
    [sections["the tell"], sections.evidence, sections.watch].filter(Boolean).join("\n\n");
  if (!verdict || !body) return null;
  return { verdict, body };
}

export function coerceWeeklyEmail(raw: unknown): WeeklyEmailCopy | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const n = raw as Record<string, unknown>;
  const str = (key: string) => (typeof n[key] === "string" ? n[key] : "");
  const verdict = str("verdict").trim();
  if (!verdict) return undefined;
  const body =
    str("body").trim() ||
    [str("tell"), str("evidence"), str("watch")].filter(Boolean).join("\n\n");
  return { verdict, body };
}

export function fallbackWeeklyEmail(message: string): WeeklyEmailCopy {
  return {
    verdict: "A quiet week on both lists.",
    body: `The weekly email writer failed (${message}). Open the site for the full week.`,
  };
}

function repoUrlIndex(aggregate: WeeklyAggregate): Map<string, string> {
  const urls = new Map<string, string>();
  for (const entry of aggregate.entries) {
    for (const repo of entry.digest.repos) {
      if (repo.html_url && !urls.has(repo.full_name)) {
        urls.set(repo.full_name, repo.html_url);
      }
    }
  }
  return urls;
}

export async function formatActiveLabNotes(rootDir: string): Promise<string> {
  const header =
    "LAB TELEMETRY is the only source for cost or quality claims. Stars measure attention, not adoption or spend. DietrichGebert/ponytail on the ranked lists is not Lab telemetry; EXP-20260802-ponytail-narration-skills is our Skills narration experiment.";
  const ids = await listExperimentIds(rootDir);
  const chunks: string[] = [];
  for (const id of ids) {
    try {
      const exp = await loadExperiment(rootDir, id);
      if (exp.status !== "active" && exp.status !== "baseline") continue;
      chunks.push(
        [
          `${exp.id} title=${exp.title ?? ""} status=${exp.status} edition=${exp.edition}`,
          exp.outcome_line ? `outcome: ${exp.outcome_line}` : "",
          exp.how_we_measure ? `measure: ${exp.how_we_measure}` : "",
          exp.notes ? `notes: ${exp.notes.slice(0, 800)}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      );
    } catch {
      continue;
    }
  }
  if (!chunks.length) return `${header}\nNo active or baseline Lab experiments.`;
  return `${header}\n${chunks.join("\n\n")}`;
}

export function buildWeeklyEmailPrompt(aggregate: WeeklyAggregate, _labNotes?: string): string {
  const overlap = aggregate.stats.cross_edition_overlap;
  const urls = repoUrlIndex(aggregate);
  const withUrl = (fullName: string) => {
    const url = urls.get(fullName);
    return url ? `${fullName} ${url}` : `${fullName} (no url in DATA; do not invent a link)`;
  };
  const daily: string[] = [];
  for (const date of aggregate.dates) {
    for (const edition of ["oss", "skills"] as const) {
      const entry = aggregate.entries.find((e) => e.date === date && e.edition === edition);
      const top = entry?.digest.repos[0];
      if (!top) continue;
      const label = edition === "oss" ? "AI Tastemakers" : "Skill Tastemakers";
      daily.push(`${date} ${label} #1: ${withUrl(top.full_name)} (+${top.stars_gained_7d} attention)`);
    }
  }
  const standouts = [
    ...aggregate.stats.standouts.oss.slice(0, 8).map((r) => `${withUrl(r.full_name)} (AI Tastemakers, ${r.days_appeared}d, +${r.total_stars_gained} attention) ${r.excerpt || ""}`.trim()),
    ...aggregate.stats.standouts.skills.slice(0, 8).map((r) => `${withUrl(r.full_name)} (Skill Tastemakers, ${r.days_appeared}d, +${r.total_stars_gained} attention) ${r.excerpt || ""}`.trim()),
  ];
  return [
    WEEKLY_EMAIL_SYSTEM_PROMPT,
    "",
    `Week ${aggregate.week_id} (${aggregate.week_start} to ${aggregate.week_end}).`,
    `Unique repos: AI Tastemakers ${aggregate.stats.unique_repos.oss}, Skill Tastemakers ${aggregate.stats.unique_repos.skills}.`,
    `Both lists (count only; do not make this the headline): ${overlap.length}.`,
    `Ranking: ${aggregate.stats.ranking_modes.join(", ") || "unknown"} (attention, not spend).`,
    "",
    "Daily #1 (use for why-now; URLs are exact):",
    daily.join("\n") || "none",
    "",
    "Held the lists:",
    `AI Tastemakers: ${aggregate.stats.repeat_repos.oss.map((r) => `${withUrl(r.full_name)} (${r.days_appeared}d)`).join(", ") || "none"}`,
    `Skill Tastemakers: ${aggregate.stats.repeat_repos.skills.map((r) => `${withUrl(r.full_name)} (${r.days_appeared}d)`).join(", ") || "none"}`,
    "",
    "Standouts (star totals are attention, not spend):",
    standouts.join("\n") || "none",
    "",
    "Do not mention Lab, telemetry, token budgets, or how this digest is produced.",
    "",
    "Respond in English using exactly these markdown section headers in order:",
    "## Verdict",
    "## Body",
  ].join("\n");
}

export async function narrateWeeklyEmail(
  apiKey: string,
  model: string,
  aggregate: WeeklyAggregate,
  labNotes: string,
): Promise<WeeklyEmailCopy> {
  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model,
      max_tokens: 1200,
      messages: [{ role: "user", content: buildWeeklyEmailPrompt(aggregate, labNotes) }],
    });
    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
      console.warn("Claude weekly email returned no text");
      return fallbackWeeklyEmail("empty response");
    }
    return parseWeeklyEmailMarkdown(block.text.trim()) ?? fallbackWeeklyEmail("could not parse email sections");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`Claude weekly email failed: ${msg}`);
    return fallbackWeeklyEmail(msg);
  }
}
