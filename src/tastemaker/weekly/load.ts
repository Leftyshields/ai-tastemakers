import path from "node:path";
import { promises as fs } from "node:fs";
import type { Digest, LoadedDigestEntry } from "../types.js";
import { EDITIONS } from "../editions.js";
import { briefingsDirForEdition } from "../editions.js";
import { readDigestJson } from "../writers/json.js";

export interface MissingDigest {
  date: string;
  edition: "oss" | "skills";
}

export interface LoadWeekResult {
  complete: boolean;
  missing: MissingDigest[];
  entries: LoadedDigestEntry[];
  days_covered: { oss: number; skills: number };
  skipReason?: string;
}

async function readDigestIfExists(filePath: string): Promise<Digest | null> {
  try {
    return await readDigestJson(filePath);
  } catch {
    return null;
  }
}

export async function loadWeekDigests(
  rootDir: string,
  dates: string[],
): Promise<LoadWeekResult> {
  const missing: MissingDigest[] = [];
  const entries: LoadedDigestEntry[] = [];
  const ossDates = new Set<string>();
  const skillsDates = new Set<string>();

  for (const date of dates) {
    for (const edition of ["oss", "skills"] as const) {
      const editionDef = EDITIONS[edition];
      const briefingsDir = briefingsDirForEdition(rootDir, editionDef);
      const filePath = path.join(briefingsDir, date, "digest.json");
      const digest = await readDigestIfExists(filePath);
      if (!digest) {
        missing.push({ date, edition });
        continue;
      }
      entries.push({ date, edition, digest });
      if (edition === "oss") ossDates.add(date);
      else skillsDates.add(date);
    }
  }

  const complete = missing.length === 0;
  let skipReason: string | undefined;
  if (!complete) {
    const sample = missing
      .slice(0, 3)
      .map((m) => `${m.date}/${m.edition}`)
      .join(", ");
    const more = missing.length > 3 ? ` (+${missing.length - 3} more)` : "";
    skipReason = `Incomplete week: missing ${missing.length}/14 digest(s) (e.g. ${sample}${more})`;
  }

  return {
    complete,
    missing,
    entries,
    days_covered: { oss: ossDates.size, skills: skillsDates.size },
    skipReason,
  };
}
