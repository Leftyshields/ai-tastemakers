import path from "node:path";
import { promises as fs } from "node:fs";

export async function listWeeklyReviewWeeks(rootDir: string): Promise<string[]> {
  const weeklyDir = path.join(rootDir, "briefings", "weekly");
  let entries: string[];
  try {
    entries = await fs.readdir(weeklyDir);
  } catch {
    return [];
  }
  return entries
    .filter((e) => /^\d{4}-W\d{2}$/.test(e))
    .sort((a, b) => a.localeCompare(b));
}
