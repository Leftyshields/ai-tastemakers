import { promises as fs } from "node:fs";
import path from "node:path";
import type { SnapshotRecord } from "../types.js";

export async function readSnapshots(filePath: string): Promise<SnapshotRecord[]> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as SnapshotRecord);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

export async function appendSnapshots(
  filePath: string,
  records: SnapshotRecord[],
): Promise<void> {
  if (records.length === 0) {
    return;
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const lines = records.map((r) => JSON.stringify(r)).join("\n") + "\n";
  await fs.appendFile(filePath, lines, "utf-8");
}

/** Latest observation per calendar day (UTC) for each repo. */
export function collapseLatestPerDay(records: SnapshotRecord[]): SnapshotRecord[] {
  const byRepoDay = new Map<string, SnapshotRecord>();

  for (const r of records) {
    const day = r.observed_at.slice(0, 10);
    const key = `${r.full_name}|${day}`;
    const existing = byRepoDay.get(key);
    if (!existing || r.observed_at > existing.observed_at) {
      byRepoDay.set(key, r);
    }
  }

  return [...byRepoDay.values()].sort(
    (a, b) => a.observed_at.localeCompare(b.observed_at),
  );
}

export function snapshotsForRepo(
  all: SnapshotRecord[],
  fullName: string,
): SnapshotRecord[] {
  return collapseLatestPerDay(all.filter((r) => r.full_name === fullName));
}
