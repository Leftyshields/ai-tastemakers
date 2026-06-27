import path from "node:path";
import { promises as fs } from "node:fs";
import type { MonthlySourceWeek, WeeklyReview } from "../types.js";
import { listWeeklyReviewWeeks } from "./list-weeks.js";

export interface LoadMonthResult {
  complete: boolean;
  sources: MonthlySourceWeek[];
  skipReason?: string;
}

const MIN_SOURCE_WEEKS = 2;

async function readWeeklyReview(filePath: string): Promise<WeeklyReview | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as WeeklyReview;
  } catch {
    return null;
  }
}

export async function loadMonthWeeklyReviews(
  rootDir: string,
  monthId: string,
  options: { excludeOnOrAfterWeekStart?: string } = {},
): Promise<LoadMonthResult> {
  const weekIds = await listWeeklyReviewWeeks(rootDir);
  const sources: MonthlySourceWeek[] = [];
  const rollupWeekStart = options.excludeOnOrAfterWeekStart;

  for (const weekId of weekIds) {
    const jsonPath = path.join(
      rootDir,
      "briefings",
      "weekly",
      weekId,
      "weekly_review.json",
    );
    const review = await readWeeklyReview(jsonPath);
    if (!review) continue;

    const weekEndMonth = review.week_end.slice(0, 7);
    if (weekEndMonth !== monthId) continue;

    if (rollupWeekStart && review.week_end >= rollupWeekStart) continue;

    sources.push({
      week_id: review.week_id,
      week_start: review.week_start,
      week_end: review.week_end,
      review,
    });
  }

  sources.sort((a, b) => a.week_start.localeCompare(b.week_start));

  if (sources.length < MIN_SOURCE_WEEKS) {
    return {
      complete: false,
      sources,
      skipReason: `Incomplete month: need ${MIN_SOURCE_WEEKS}+ weekly reviews in ${monthId} before rollup week (found ${sources.length})`,
    };
  }

  return { complete: true, sources };
}
