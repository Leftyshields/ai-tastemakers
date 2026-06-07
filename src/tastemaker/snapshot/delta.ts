import type { RankingMode } from "../types.js";
import { snapshotsForRepo } from "./store.js";
import type { SnapshotRecord } from "../types.js";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export interface DeltaResult {
  stars_gained_7d: number;
  has7dBaseline: boolean;
  sinceFirstSeen: number;
}

export function computeDelta(
  history: SnapshotRecord[],
  currentStars: number,
  now = new Date(),
): DeltaResult {
  if (history.length === 0) {
    return { stars_gained_7d: 0, has7dBaseline: false, sinceFirstSeen: 0 };
  }

  const sorted = [...history].sort((a, b) => a.observed_at.localeCompare(b.observed_at));
  const first = sorted[0];
  const sinceFirstSeen = currentStars - first.stars;

  const cutoff = now.getTime() - SEVEN_DAYS_MS;
  let baseline: SnapshotRecord | undefined;

  for (const r of sorted) {
    if (new Date(r.observed_at).getTime() <= cutoff) {
      baseline = r;
    }
  }

  if (baseline) {
    return {
      stars_gained_7d: currentStars - baseline.stars,
      has7dBaseline: true,
      sinceFirstSeen,
    };
  }

  return {
    stars_gained_7d: sinceFirstSeen,
    has7dBaseline: false,
    sinceFirstSeen,
  };
}

export function resolveRankingMode(
  deltas: DeltaResult[],
  currentStars: number[],
): RankingMode {
  const withBaseline = deltas.filter((d) => d.has7dBaseline).length;
  if (withBaseline >= Math.ceil(deltas.length * 0.5) && deltas.length > 0) {
    return "delta_7d";
  }

  const anySinceFirstSeen = deltas.some((d) => d.sinceFirstSeen > 0);
  if (anySinceFirstSeen) {
    return "bootstrap_since_first_seen";
  }

  if (currentStars.some((s) => s > 0)) {
    return "bootstrap_total_stars";
  }

  return "bootstrap_since_first_seen";
}

export function scoreForRanking(
  delta: DeltaResult,
  stars: number,
  mode: RankingMode,
): number {
  switch (mode) {
    case "delta_7d":
      return delta.stars_gained_7d;
    case "bootstrap_since_first_seen":
      return delta.sinceFirstSeen;
    case "bootstrap_total_stars":
      return stars;
    default:
      return delta.stars_gained_7d;
  }
}

export function computeDeltasForCandidates(
  allSnapshots: SnapshotRecord[],
  candidates: { full_name: string; stars: number }[],
  now = new Date(),
): Map<string, DeltaResult> {
  const map = new Map<string, DeltaResult>();
  for (const c of candidates) {
    const history = snapshotsForRepo(allSnapshots, c.full_name);
    map.set(c.full_name, computeDelta(history, c.stars, now));
  }
  return map;
}
