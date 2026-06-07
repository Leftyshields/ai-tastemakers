import type { CandidateRepo } from "../types.js";

export function filterCandidates(
  candidates: CandidateRepo[],
  opts: {
    minStars: number;
    blocklist: Set<string>;
    excludeArchived: boolean;
    maxStars?: number;
  },
): CandidateRepo[] {
  return candidates.filter((c) => {
    if (c.stars < opts.minStars) return false;
    if (opts.maxStars != null && c.stars > opts.maxStars) return false;
    if (opts.blocklist.has(c.full_name)) return false;
    if (opts.excludeArchived && c.is_archived) return false;
    return true;
  });
}

export function excludeNegativeDelta(
  scored: { full_name: string; score: number; stars_gained_7d: number }[],
  mode: string,
): typeof scored {
  if (mode !== "delta_7d") {
    return scored;
  }
  return scored.filter((s) => s.stars_gained_7d >= 0);
}
