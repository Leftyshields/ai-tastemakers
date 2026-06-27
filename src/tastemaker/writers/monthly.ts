import { promises as fs } from "node:fs";
import path from "node:path";
import type { MonthlyReview } from "../types.js";

function formatTopicList(topics: string[]): string {
  return topics.length ? topics.join(", ") : "—";
}

export function renderMonthlyMarkdown(review: MonthlyReview): string {
  const { month_stats } = review;
  const lines: string[] = [
    `# Tastemakers Monthly — ${review.month_id}`,
    "",
    `_${review.month_start} – ${review.month_end} · generated ${review.generated_at}_`,
    "",
    "## Month at a glance",
    "",
    `- **AI Tastemakers:** +${month_stats.total_stars_gained.oss.toLocaleString()} stars gained (summed across weekly rollups) · top topics: ${formatTopicList(month_stats.top_topics.oss)}`,
    `- **Skill Tastemakers:** +${month_stats.total_stars_gained.skills.toLocaleString()} stars gained (summed across weekly rollups) · top topics: ${formatTopicList(month_stats.top_topics.skills)}`,
    `- **Weekly sources:** ${month_stats.source_week_ids.join(", ")}`,
    "",
  ];

  if (review.narrative.opening) {
    lines.push("## Opening", "", review.narrative.opening, "");
  }
  if (review.narrative.oss) {
    lines.push("## AI Tastemakers", "", review.narrative.oss, "");
  }
  if (review.narrative.skills) {
    lines.push("## Skill Tastemakers", "", review.narrative.skills, "");
  }
  if (review.narrative.cross_lane) {
    lines.push("## Cross-Lane Themes", "", review.narrative.cross_lane, "");
  }
  if (review.narrative.takeaway) {
    lines.push("## Builder Takeaway", "", review.narrative.takeaway, "");
  }

  lines.push("");
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
