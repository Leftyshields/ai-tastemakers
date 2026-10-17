import { promises as fs } from "node:fs";
import path from "node:path";
import { EDITIONS, briefingsDirForEdition, type EditionDefinition } from "../editions.js";

function allEditions(): EditionDefinition[] {
  return [EDITIONS.oss, EDITIONS.skills];
}
import type { Digest } from "../types.js";

export function canonicalGithubRepoUrl(fullName: string): string {
  return `https://github.com/${fullName}`;
}

/** Collect owner/repo → canonical GitHub URL from published digest snapshots. */
export async function collectDigestRepoAllowlist(repoRoot: string): Promise<Record<string, string>> {
  const allowlist: Record<string, string> = {};

  for (const edition of allEditions()) {
    const briefingsDir = briefingsDirForEdition(repoRoot, edition);
    let entries: string[];
    try {
      entries = await fs.readdir(briefingsDir);
    } catch {
      continue;
    }

    for (const entry of entries) {
      const digestPath = path.join(briefingsDir, entry, "digest.json");
      let raw: string;
      try {
        raw = await fs.readFile(digestPath, "utf8");
      } catch {
        continue;
      }
      let digest: Digest;
      try {
        digest = JSON.parse(raw) as Digest;
      } catch {
        continue;
      }
      for (const repo of digest.repos ?? []) {
        if (!repo.full_name) continue;
        const canonical = canonicalGithubRepoUrl(repo.full_name);
        if (repo.html_url && repo.html_url !== canonical) {
          if (!repo.html_url.startsWith("https://github.com/")) continue;
        }
        allowlist[repo.full_name] = canonical;
      }
    }
  }

  return allowlist;
}
