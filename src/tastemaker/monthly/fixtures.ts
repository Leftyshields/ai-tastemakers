import { promises as fs } from "node:fs";
import path from "node:path";
import type { WeeklyReview, RankingMode } from "../types.js";
import { writeWeeklyReview } from "../writers/weekly.js";
import type { WeeklyReview as WR } from "../types.js";

const sampleStats = {
  unique_repos: { oss: 10, skills: 8 },
  total_stars_gained: { oss: 500, skills: 300 },
  top_topics: { oss: ["llm", "mcp"], skills: ["ai-skill"] },
  repeat_repos: { oss: [], skills: [] },
  cross_edition_overlap: [],
  ranking_modes: ["delta_7d"] as RankingMode[],
  standouts: { oss: [], skills: [] },
};

function weeklyReview(
  weekId: string,
  week_start: string,
  week_end: string,
  ossStars: number,
): WeeklyReview {
  return {
    schema_version: 1,
    week_id: weekId,
    week_start,
    week_end,
    days_covered: { oss: 7, skills: 7 },
    stats: {
      ...sampleStats,
      total_stars_gained: { oss: ossStars, skills: 300 },
    },
    narrative: {
      opening: `Opening for ${weekId}.`,
      oss: `OSS ${weekId}.`,
      skills: `Skills ${weekId}.`,
      cross_lane: "Cross.",
      takeaway: "Build.",
    },
    generated_at: `${week_end}T12:00:00.000Z`,
  };
}

export async function seedWeeklyReviews(
  rootDir: string,
  reviews: WeeklyReview[],
): Promise<void> {
  for (const review of reviews) {
    const dir = path.join(rootDir, "briefings", "weekly", review.week_id);
    await writeWeeklyReview(dir, review);
  }
}

export const juneWeeklyFixtures = [
  weeklyReview("2026-W23", "2026-06-01", "2026-06-07", 400),
  weeklyReview("2026-W24", "2026-06-08", "2026-06-14", 450),
  weeklyReview("2026-W25", "2026-06-15", "2026-06-21", 500),
];
