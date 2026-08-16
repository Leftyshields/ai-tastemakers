import Anthropic from "@anthropic-ai/sdk";
import type { MonthlyAggregate, MonthlyNarrative } from "../types.js";
import {
  parseWeeklyNarrative,
  fallbackWeeklyNarrative,
  WEEKLY_SECTION_HEADERS,
} from "./weekly.js";

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
    "You are the editorial voice of Tastemakers — a monthly briefing on AI open source and agent skills on GitHub.",
    "",
    `Write a monthly rollup for ${aggregate.month_start} through ${aggregate.month_end} (${aggregate.month_id}).`,
    "",
    "Write for three audiences in order, general → specific. Synthesize month-level themes — do NOT concatenate weekly text or list every repo. Star totals are summed across weekly rollups (not deduped by repo).",
    "",
    "Audience rules:",
    "- For executives: 3–5 sentences. Strategic. What to remember if you run a team.",
    "- For AI generalists: 1–2 short paragraphs. How the stack evolved across the month.",
    "- The numbers: 1–3 sentences on how to read the month stats. Do not repeat the JSON tables.",
    "",
    "DATA (JSON):",
    JSON.stringify(payload, null, 2),
    "",
    "Respond in English using exactly these markdown section headers in order (## Header):",
    ...WEEKLY_SECTION_HEADERS.map((s) => `## ${s.title}`),
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
