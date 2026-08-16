import { promises as fs } from "node:fs";
import path from "node:path";
import type { WeeklyReview, WeeklyStats } from "../types.js";

function formatTopicList(topics: string[]): string {
  return topics.length ? topics.join(", ") : "—";
}

export function dailyTop10MarkdownLinks(dateLabel: string): string {
  return `Today's ranked lists: [AI Tastemakers](../briefings/${dateLabel}.html) · [Skill Tastemakers](../skills/briefings/${dateLabel}.html)`;
}

export function renderWeeklyStatsMarkdown(stats: WeeklyStats): string[] {
  const lines: string[] = [
    `- **AI Tastemakers:** ${stats.unique_repos.oss} unique repos · +${stats.total_stars_gained.oss.toLocaleString()} stars gained (max 7d delta per repo) · top topics: ${formatTopicList(stats.top_topics.oss)}`,
    `- **Skill Tastemakers:** ${stats.unique_repos.skills} unique repos · +${stats.total_stars_gained.skills.toLocaleString()} stars gained (max 7d delta per repo) · top topics: ${formatTopicList(stats.top_topics.skills)}`,
  ];

  if (stats.cross_edition_overlap.length > 0) {
    lines.push(
      `- **Both lists:** ${stats.cross_edition_overlap.length} repo(s) appeared in OSS and Skills (${stats.cross_edition_overlap.join(", ")})`,
    );
  }

  if (stats.ranking_modes.length > 0) {
    lines.push(`- **How we ranked this week:** ${stats.ranking_modes.join(", ")}`);
  }

  const repeatOss = stats.repeat_repos.oss;
  if (repeatOss.length > 0) {
    lines.push(
      `- **Held the OSS list:** ${repeatOss.map((r) => `${r.full_name} (${r.days_appeared}d)`).join(", ")}`,
    );
  }

  const repeatSkills = stats.repeat_repos.skills;
  if (repeatSkills.length > 0) {
    lines.push(
      `- **Held the Skills list:** ${repeatSkills.map((r) => `${r.full_name} (${r.days_appeared}d)`).join(", ")}`,
    );
  }

  return lines;
}

export function renderWeeklyMarkdown(review: WeeklyReview): string {
  const { stats, narrative } = review;
  const lines: string[] = [
    `# Tastemakers Weekly — ${review.week_id}`,
    "",
    `_${review.week_start} – ${review.week_end} · generated ${review.generated_at}_`,
    "",
    "Three reads of the same week, in order: **strategy**, then **the stack**, then **the counts**.",
    "",
  ];

  if (narrative.executive) {
    lines.push("## For executives", "", narrative.executive, "");
  }
  if (narrative.generalist) {
    lines.push("## For AI generalists", "", narrative.generalist, "");
  }

  lines.push("## The numbers", "");
  if (narrative.statistician) {
    lines.push(narrative.statistician, "");
  }
  lines.push(...renderWeeklyStatsMarkdown(stats), "", dailyTop10MarkdownLinks(review.week_end), "");

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
