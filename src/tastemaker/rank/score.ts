import { promises as fs } from "node:fs";
import path from "node:path";
import type { Digest } from "../types.js";

export interface BriefingFeaturedSets {
  recentlyFeatured: Set<string>;
  previouslyFeatured: Set<string>;
}

async function listBriefingDates(
  briefingsDir: string,
  excludeDate?: string,
): Promise<string[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(briefingsDir);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw err;
  }

  return entries
    .filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e))
    .filter((e) => e !== excludeDate)
    .sort()
    .reverse();
}

async function repoNamesFromDigest(briefingsDir: string, date: string): Promise<string[]> {
  const jsonPath = path.join(briefingsDir, date, "digest.json");
  try {
    const raw = await fs.readFile(jsonPath, "utf-8");
    const digest = JSON.parse(raw) as Digest;
    return (digest.repos ?? []).map((repo) => repo.full_name);
  } catch {
    return [];
  }
}

/** Soft-dedup window + lifetime prior featured sets in one pass over briefing folders. */
export async function loadBriefingFeaturedSets(
  briefingsDir: string,
  recentCount: number,
  /** Skip this briefing date so same-day re-runs do not treat today's picks as prior history. */
  excludeDate?: string,
): Promise<BriefingFeaturedSets> {
  const recentlyFeatured = new Set<string>();
  const previouslyFeatured = new Set<string>();
  const dates = await listBriefingDates(briefingsDir, excludeDate);

  for (const [index, date] of dates.entries()) {
    const repoNames = await repoNamesFromDigest(briefingsDir, date);
    for (const name of repoNames) {
      previouslyFeatured.add(name);
      if (index < recentCount) {
        recentlyFeatured.add(name);
      }
    }
  }

  return { recentlyFeatured, previouslyFeatured };
}

export async function loadRecentBriefingRepos(
  briefingsDir: string,
  count: number,
  /** Skip this briefing date so same-day re-runs do not penalize today's picks. */
  excludeDate?: string,
): Promise<Set<string>> {
  const { recentlyFeatured } = await loadBriefingFeaturedSets(
    briefingsDir,
    count,
    excludeDate,
  );
  return recentlyFeatured;
}

/** All repos ever featured in prior daily digests for this edition (optional excludeDate skips today). */
export async function loadAllPriorBriefingRepos(
  briefingsDir: string,
  /** Skip this briefing date so same-day re-runs do not treat today's picks as prior history. */
  excludeDate?: string,
): Promise<Set<string>> {
  const { previouslyFeatured } = await loadBriefingFeaturedSets(
    briefingsDir,
    0,
    excludeDate,
  );
  return previouslyFeatured;
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
