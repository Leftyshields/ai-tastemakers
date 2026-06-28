import fs from "node:fs/promises";
import path from "node:path";
import type { Digest, DigestRepo, WeeklyReview } from "../types.js";
import type { ScanObservation } from "./types.js";

const DAILY_DIGEST = /^(\d{4}-\d{2}-\d{2})\/digest\.json$/;
const SKILLS_DIGEST = /^skills\/(\d{4}-\d{2}-\d{2})\/digest\.json$/;
const WEEKLY_REVIEW = /^weekly\/(\d{4}-W\d{2})\/weekly_review\.json$/;
const MONTHLY_REVIEW = /^monthly\/(\d{4}-\d{2})\/monthly_review\.json$/;

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function repoObservation(
  repo: Pick<DigestRepo, "full_name" | "html_url" | "topics" | "brief">,
  date: string,
  source: string,
): ScanObservation {
  return {
    full_name: repo.full_name,
    html_url: repo.html_url,
    topics: repo.topics ?? [],
    brief: repo.brief,
    date,
    source,
  };
}

function observationsFromWeekly(review: WeeklyReview, source: string): ScanObservation[] {
  const date = review.week_end;
  const out: ScanObservation[] = [];
  const seen = new Set<string>();

  const add = (fullName: string, excerpt?: string) => {
    if (!fullName || seen.has(fullName)) return;
    seen.add(fullName);
    const [owner, repo] = fullName.split("/");
    if (!owner || !repo) return;
    out.push({
      full_name: fullName,
      html_url: `https://github.com/${owner}/${repo}`,
      topics: [],
      brief: excerpt ?? null,
      date,
      source,
    });
  };

  const stats = review.stats;
  if (!stats) return out;

  for (const edition of ["oss", "skills"] as const) {
    for (const r of stats.repeat_repos?.[edition] ?? []) {
      add(r.full_name);
    }
    for (const s of stats.standouts?.[edition] ?? []) {
      add(s.full_name, s.excerpt);
    }
  }
  for (const name of stats.cross_edition_overlap ?? []) {
    add(name);
  }

  return out;
}

export async function collectBriefingFiles(briefingsDir: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(dir: string, prefix: string): Promise<void> {
    let entries: string[];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        if (entry.name === "lab") continue;
        await walk(path.join(dir, entry.name), rel);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        if (
          DAILY_DIGEST.test(rel) ||
          SKILLS_DIGEST.test(rel) ||
          WEEKLY_REVIEW.test(rel) ||
          MONTHLY_REVIEW.test(rel)
        ) {
          files.push(rel);
        }
      }
    }
  }

  await walk(briefingsDir, "");
  return files.sort();
}

export async function scanBriefings(briefingsDir: string): Promise<{
  observations: ScanObservation[];
  sources: string[];
}> {
  const relFiles = await collectBriefingFiles(briefingsDir);
  const observations: ScanObservation[] = [];

  for (const rel of relFiles) {
    const fullPath = path.join(briefingsDir, rel);
    const source = `briefings/${rel}`;

    const dailyMatch = rel.match(DAILY_DIGEST);
    if (dailyMatch) {
      const digest = await readJson<Digest>(fullPath);
      if (!digest?.repos) continue;
      const date = dailyMatch[1];
      for (const repo of digest.repos) {
        observations.push(repoObservation(repo, date, source));
      }
      continue;
    }

    const skillsMatch = rel.match(SKILLS_DIGEST);
    if (skillsMatch) {
      const digest = await readJson<Digest>(fullPath);
      if (!digest?.repos) continue;
      const date = skillsMatch[1];
      for (const repo of digest.repos) {
        observations.push(repoObservation(repo, date, source));
      }
      continue;
    }

    const weeklyMatch = rel.match(WEEKLY_REVIEW);
    if (weeklyMatch) {
      const review = await readJson<WeeklyReview>(fullPath);
      if (!review) continue;
      observations.push(...observationsFromWeekly(review, source));
      continue;
    }

    if (MONTHLY_REVIEW.test(rel)) {
      // Monthly JSON has narrative only — no structured repo list in v1.
      continue;
    }
  }

  return {
    observations,
    sources: relFiles.map((r) => `briefings/${r}`),
  };
}
