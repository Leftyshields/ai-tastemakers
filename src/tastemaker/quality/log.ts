import fs from "node:fs/promises";
import path from "node:path";
import type { Digest } from "../types.js";
import { rubricPass, scoreBriefHeuristic, type RubricLogEntry } from "./rubric.js";

export function qualityLogPath(rootDir: string): string {
  return path.join(rootDir, "data", "quality", "rubric-scores.jsonl");
}

export async function scoreDigestRank1(
  rootDir: string,
  edition: string,
  date: string,
  digest: Digest,
): Promise<RubricLogEntry | null> {
  const top = digest.repos[0];
  if (!top?.brief) return null;

  const scores = scoreBriefHeuristic({
    full_name: top.full_name,
    brief: top.brief,
  });

  return {
    scored_at: new Date().toISOString(),
    edition,
    date,
    full_name: top.full_name,
    scores,
    pass: rubricPass(scores),
  };
}

export async function readRubricLog(rootDir: string): Promise<RubricLogEntry[]> {
  const logPath = qualityLogPath(rootDir);
  try {
    const raw = await fs.readFile(logPath, "utf8");
    return raw
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line) as RubricLogEntry);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function appendRubricLog(rootDir: string, entry: RubricLogEntry): Promise<void> {
  const logPath = qualityLogPath(rootDir);
  await fs.mkdir(path.dirname(logPath), { recursive: true });
  await fs.appendFile(logPath, `${JSON.stringify(entry)}\n`, "utf8");
}
