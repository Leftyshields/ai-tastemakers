import Anthropic from "@anthropic-ai/sdk";
import type { WeeklyAggregate, WeeklyNarrative } from "../types.js";

const SECTION_HEADERS = [
  { key: "opening" as const, title: "Opening" },
  { key: "oss" as const, title: "AI Tastemakers" },
  { key: "skills" as const, title: "Skill Tastemakers" },
  { key: "cross_lane" as const, title: "Cross-Lane Themes" },
  { key: "takeaway" as const, title: "Builder Takeaway" },
];

export function buildWeeklyPrompt(aggregate: WeeklyAggregate): string {
  const payload = {
    week_id: aggregate.week_id,
    week_start: aggregate.week_start,
    week_end: aggregate.week_end,
    stats: aggregate.stats,
  };

  const lines = [
    "You are the editorial voice of Tastemakers — a daily digest covering AI-derivative open source and agent skills on GitHub.",
    "",
    `Write a weekly wrap-up for ${aggregate.week_start} through ${aggregate.week_end} (${aggregate.week_id}).`,
    "",
    "Use the pre-computed stats and standouts below. Synthesize themes — do NOT list every repo. Overlapping repos across AI Tastemakers and Skill Tastemakers are intentional; discuss overlap once in Cross-Lane Themes.",
    "",
    aggregate.stats.ranking_modes.some((m) => m !== "delta_7d")
      ? "Note: some daily digests used bootstrap ranking while 7-day star history was maturing — caveat momentum stats accordingly."
      : "",
    "",
    "DATA (JSON):",
    JSON.stringify(payload, null, 2),
    "",
    "Respond in English using exactly these markdown section headers in order (## Header):",
    ...SECTION_HEADERS.map((s) => `## ${s.title}`),
    "",
    "Each section: 2–4 sentences, punchy and builder-focused. Editorialize on the stats — what moved, what themes emerged, what builders should watch. No hype.",
  ];

  return lines.filter((l) => l !== undefined).join("\n");
}

export function parseWeeklyNarrative(text: string): WeeklyNarrative {
  const empty: WeeklyNarrative = {
    opening: "",
    oss: "",
    skills: "",
    cross_lane: "",
    takeaway: "",
  };

  const trimmed = text.trim();
  if (!trimmed) return empty;

  const headerPattern = /^##\s+(.+)$/gm;
  const matches = [...trimmed.matchAll(headerPattern)];

  if (matches.length === 0) {
    return { ...empty, opening: trimmed };
  }

  const narrative = { ...empty };

  for (let i = 0; i < matches.length; i++) {
    const title = matches[i][1].trim();
    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? trimmed.length) : trimmed.length;
    const body = trimmed.slice(start, end).trim();

    const section = SECTION_HEADERS.find(
      (s) => s.title.toLowerCase() === title.toLowerCase(),
    );
    if (section) {
      narrative[section.key] = body;
    }
  }

  if (!narrative.opening && !narrative.oss && !narrative.skills) {
    return { ...empty, opening: trimmed };
  }

  return narrative;
}

export function fallbackWeeklyNarrative(reason: string): WeeklyNarrative {
  return {
    opening: `Weekly editorial synthesis was unavailable (${reason}). Stats below are complete.`,
    oss: "",
    skills: "",
    cross_lane: "",
    takeaway: "",
  };
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
      max_tokens: 2000,
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
