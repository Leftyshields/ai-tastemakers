import { promises as fs } from "node:fs";
import path from "node:path";
import type { MonthlyReview } from "../types.js";

function formatTopicList(topics: string[]): string {
  return topics.length ? topics.join(", ") : "—";
}

export function renderMonthlyMarkdown(review: MonthlyReview): string {
  const { month_stats, narrative } = review;
  const lines: string[] = [
    `# Tastemakers Monthly — ${review.month_id}`,
    "",
    `_${review.month_start} – ${review.month_end} · generated ${review.generated_at}_`,
    "",
    "Three reads of the same month, in order: **strategy**, then **the stack**, then **the counts**.",
    "",
  ];

  if (narrative.executive) {
    lines.push("## For executives", "", narrative.executive, "");
  }
  if (narrative.generalist) {
    lines.push("## For AI generalists", "", narrative.generalist, "");
  }

  lines.push(
    "## The numbers",
    "",
  );
  if (narrative.statistician) {
    lines.push(narrative.statistician, "");
  }
  lines.push(
    `- **AI Tastemakers:** +${month_stats.total_stars_gained.oss.toLocaleString()} stars gained (summed across weekly rollups) · top topics: ${formatTopicList(month_stats.top_topics.oss)}`,
    `- **Skill Tastemakers:** +${month_stats.total_stars_gained.skills.toLocaleString()} stars gained (summed across weekly rollups) · top topics: ${formatTopicList(month_stats.top_topics.skills)}`,
    `- **Weekly sources:** ${month_stats.source_week_ids.join(", ")}`,
    "",
  );

  return lines.join("\n");
}

export async function writeMonthlyReview(
  dir: string,
  review: MonthlyReview,
): Promise<{ jsonPath: string; markdownPath: string }> {
  await fs.mkdir(dir, { recursive: true });
  const jsonPath = path.join(dir, "monthly_review.json");
  const markdownPath = path.join(dir, "monthly_review.md");
  await fs.writeFile(jsonPath, JSON.stringify(review, null, 2) + "\n", "utf-8");
  await fs.writeFile(markdownPath, renderMonthlyMarkdown(review), "utf-8");
  return { jsonPath, markdownPath };
}
