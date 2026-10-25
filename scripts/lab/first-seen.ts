import fs from "node:fs";
import path from "node:path";

export type FirstSeenList = "OSS" | "Skills";

export interface FirstSeenRecord {
  date: string;
  list: FirstSeenList;
  fullName: string;
}

/** Same date filter/sort as edition-pages `listBriefingDates`, oldest first. */
export function listBriefingDatesAsc(briefingsDir: string): string[] {
  try {
    return fs
      .readdirSync(briefingsDir)
      .filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

function formatFirstSeenDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Reader-facing clause for experiment write-ups (no rank). When `firstSeen` is null,
 * returns `name` only with no trailing comma.
 */
export function formatFirstSeenClause(name: string, firstSeen: FirstSeenRecord | null): string {
  if (!firstSeen) return name;
  const when = formatFirstSeenDisplayDate(firstSeen.date);
  return `${name}, which first appeared on the ${firstSeen.list} list on ${when},`;
}

function findRepoFullNameInDigest(digestPath: string, sourceRepoLower: string): string | null {
  if (!fs.existsSync(digestPath)) return null;
  let parsed: { repos?: Array<{ full_name?: string }> };
  try {
    parsed = JSON.parse(fs.readFileSync(digestPath, "utf8")) as {
      repos?: Array<{ full_name?: string }>;
    };
  } catch {
    return null;
  }
  for (const repo of parsed.repos ?? []) {
    const full = repo.full_name?.trim();
    if (!full) continue;
    if (full.toLowerCase() === sourceRepoLower) return full;
  }
  return null;
}

/**
 * Earliest daily-list appearance of `sourceRepo` across OSS and Skills digest archives.
 */
export function computeFirstSeen(repoRoot: string, sourceRepo: string): FirstSeenRecord | null {
  const needle = sourceRepo.trim().toLowerCase();
  if (!needle) return null;

  const scans: { list: FirstSeenList; briefingsDir: string }[] = [
    { list: "OSS", briefingsDir: path.join(repoRoot, "briefings") },
    { list: "Skills", briefingsDir: path.join(repoRoot, "briefings", "skills") },
  ];

  const timeline: { date: string; list: FirstSeenList; briefingsDir: string }[] = [];
  for (const scan of scans) {
    for (const date of listBriefingDatesAsc(scan.briefingsDir)) {
      timeline.push({ date, list: scan.list, briefingsDir: scan.briefingsDir });
    }
  }
  timeline.sort((a, b) => a.date.localeCompare(b.date));

  for (const row of timeline) {
    const digestPath = path.join(row.briefingsDir, row.date, "digest.json");
    const fullName = findRepoFullNameInDigest(digestPath, needle);
    if (fullName) {
      return { date: row.date, list: row.list, fullName };
    }
  }
  return null;
}
