import path from "node:path";
import fs from "node:fs/promises";

/** Display labels for weekly reviews from `week_start` / `week_end` in weekly_review.json. */

function parseIsoLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function shortMonth(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short" });
}

export function formatWeekReviewDateRange(weekStart: string, weekEnd: string): string {
  const start = parseIsoLocal(weekStart);
  const end = parseIsoLocal(weekEnd);
  const startMonth = shortMonth(start);
  const endMonth = shortMonth(end);
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  const currentYear = new Date().getFullYear();

  if (startYear !== endYear) {
    return `${startMonth} ${start.getDate()}, ${startYear} to ${endMonth} ${end.getDate()}, ${endYear}`;
  }

  const yearSuffix = startYear !== currentYear ? `, ${startYear}` : "";

  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} to ${end.getDate()}${yearSuffix}`;
  }

  return `${startMonth} ${start.getDate()} to ${endMonth} ${end.getDate()}${yearSuffix}`;
}

export async function loadWeekRangeLabels(
  repoRoot: string,
  weekIds: string[],
): Promise<Map<string, string>> {
  const labels = new Map<string, string>();
  for (const weekId of weekIds) {
    const jsonPath = path.join(repoRoot, "briefings", "weekly", weekId, "weekly_review.json");
    const raw = await fs.readFile(jsonPath, "utf8");
    const parsed = JSON.parse(raw) as { week_start?: string; week_end?: string };
    if (!parsed.week_start || !parsed.week_end) {
      throw new Error(`weekly_review.json for ${weekId} missing week_start or week_end`);
    }
    labels.set(weekId, formatWeekReviewDateRange(parsed.week_start, parsed.week_end));
  }
  return labels;
}
