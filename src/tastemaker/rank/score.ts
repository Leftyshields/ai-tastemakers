import { promises as fs } from "node:fs";
import path from "node:path";
import type { Digest } from "../types.js";

export async function loadRecentBriefingRepos(
  briefingsDir: string,
  count: number,
): Promise<Set<string>> {
  const featured = new Set<string>();

  let entries: string[];
  try {
    entries = await fs.readdir(briefingsDir);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return featured;
    }
    throw err;
  }

  const dates = entries.filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e)).sort().reverse();

  for (const date of dates.slice(0, count)) {
    const jsonPath = path.join(briefingsDir, date, "digest.json");
    try {
      const raw = await fs.readFile(jsonPath, "utf-8");
      const digest = JSON.parse(raw) as Digest;
      for (const repo of digest.repos) {
        featured.add(repo.full_name);
      }
    } catch {
      /* skip missing or invalid briefing */
    }
  }

  return featured;
}

export function applySoftDedupPenalty(
  scores: Map<string, number>,
  recentlyFeatured: Set<string>,
  penalty: number,
): Map<string, number> {
  const adjusted = new Map<string, number>();
  for (const [name, score] of scores) {
    adjusted.set(name, recentlyFeatured.has(name) ? score * penalty : score);
  }
  return adjusted;
}
