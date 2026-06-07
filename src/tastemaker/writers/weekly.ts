import { promises as fs } from "node:fs";
import path from "node:path";
import type { WeeklyReview } from "../types.js";

function formatTopicList(topics: string[]): string {
  return topics.length ? topics.join(", ") : "—";
}

export function renderWeeklyMarkdown(review: WeeklyReview): string {
  const { stats } = review;
  const lines: string[] = [
    `# Tastemakers Weekly — ${review.week_id}`,
    "",
    `_${review.week_start} – ${review.week_end} · generated ${review.generated_at}_`,
    "",
    "## Week at a glance",
    "",
    `- **AI Tastemakers:** ${stats.unique_repos.oss} unique repos · +${stats.total_stars_gained.oss.toLocaleString()} stars gained (max 7d delta per repo) · top topics: ${formatTopicList(stats.top_topics.oss)}`,
    `- **Skill Tastemakers:** ${stats.unique_repos.skills} unique repos · +${stats.total_stars_gained.skills.toLocaleString()} stars gained (max 7d delta per repo) · top topics: ${formatTopicList(stats.top_topics.skills)}`,
  ];

  if (stats.cross_edition_overlap.length > 0) {
    lines.push(
      `- **Both lenses:** ${stats.cross_edition_overlap.length} repo(s) appeared in OSS and Skills digests (${stats.cross_edition_overlap.join(", ")})`,
    );
  }

  if (stats.ranking_modes.length > 0) {
    lines.push(`- **Ranking modes this week:** ${stats.ranking_modes.join(", ")}`);
  }

  const repeatOss = stats.repeat_repos.oss;
  if (repeatOss.length > 0) {
    lines.push(
      `- **Sustained OSS momentum:** ${repeatOss.map((r) => `${r.full_name} (${r.days_appeared}d)`).join(", ")}`,
    );
  }

  const repeatSkills = stats.repeat_repos.skills;
  if (repeatSkills.length > 0) {
    lines.push(
      `- **Sustained Skills momentum:** ${repeatSkills.map((r) => `${r.full_name} (${r.days_appeared}d)`).join(", ")}`,
    );
  }

  lines.push("");

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

export async function writeWeeklyReview(
  dir: string,
  review: WeeklyReview,
): Promise<{ jsonPath: string; markdownPath: string }> {
  await fs.mkdir(dir, { recursive: true });
  const jsonPath = path.join(dir, "weekly_review.json");
  const markdownPath = path.join(dir, "weekly_review.md");
  await fs.writeFile(jsonPath, JSON.stringify(review, null, 2) + "\n", "utf-8");
  await fs.writeFile(markdownPath, renderWeeklyMarkdown(review), "utf-8");
  return { jsonPath, markdownPath };
}
