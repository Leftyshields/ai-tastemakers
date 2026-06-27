import Anthropic from "@anthropic-ai/sdk";
import type { MonthlyAggregate, MonthlyNarrative } from "../types.js";
import {
  parseWeeklyNarrative,
  fallbackWeeklyNarrative,
} from "./weekly.js";

const SECTION_HEADERS = [
  { key: "opening" as const, title: "Opening" },
  { key: "oss" as const, title: "AI Tastemakers" },
  { key: "skills" as const, title: "Skill Tastemakers" },
  { key: "cross_lane" as const, title: "Cross-Lane Themes" },
  { key: "takeaway" as const, title: "Builder Takeaway" },
];

export function buildMonthlyPrompt(aggregate: MonthlyAggregate): string {
  const weeklyInputs = aggregate.sources.map((s) => ({
    week_id: s.week_id,
    week_start: s.week_start,
    week_end: s.week_end,
    stats: s.review.stats,
    narrative: s.review.narrative,
  }));

  const payload = {
    month_id: aggregate.month_id,
    month_start: aggregate.month_start,
    month_end: aggregate.month_end,
    month_stats: aggregate.stats,
    weekly_reviews: weeklyInputs,
  };

  const lines = [
    "You are the editorial voice of Tastemakers — a daily digest covering AI-derivative open source and agent skills on GitHub.",
    "",
    `Write a monthly rollup for ${aggregate.month_start} through ${aggregate.month_end} (${aggregate.month_id}).`,
    "",
    "Use the weekly reviews and month stats below. Synthesize month-level themes — do NOT concatenate weekly text or list every repo. Star totals are summed across weekly rollups (not deduped by repo).",
    "",
    "DATA (JSON):",
    JSON.stringify(payload, null, 2),
    "",
    "Respond in English using exactly these markdown section headers in order (## Header):",
    ...SECTION_HEADERS.map((s) => `## ${s.title}`),
    "",
    "Each section: 3–5 sentences, punchy and builder-focused. Editorialize on how the month evolved across weeks. No hype.",
  ];

  return lines.join("\n");
}

export function fallbackMonthlyNarrative(reason: string): MonthlyNarrative {
  return fallbackWeeklyNarrative(`monthly synthesis unavailable: ${reason}`);
}

export async function narrateMonthly(
  apiKey: string,
  model: string,
  aggregate: MonthlyAggregate,
): Promise<MonthlyNarrative> {
  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model,
      max_tokens: 2500,
      messages: [{ role: "user", content: buildMonthlyPrompt(aggregate) }],
    });

    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
      console.warn("Claude monthly synthesis returned no text");
      return fallbackMonthlyNarrative("empty response");
    }

    return parseWeeklyNarrative(block.text.trim());
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`Claude monthly synthesis failed: ${msg}`);
    return fallbackMonthlyNarrative(msg);
  }
}
