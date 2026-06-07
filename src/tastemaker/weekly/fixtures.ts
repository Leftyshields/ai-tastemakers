import { promises as fs } from "node:fs";
import path from "node:path";
import type { Digest } from "../types.js";
import { writeDigestJson } from "../writers/json.js";
import { EDITIONS } from "../editions.js";
import { briefingsDirForEdition } from "../editions.js";

export function minimalDigest(overrides: Partial<Digest> = {}): Digest {
  return {
    schema_version: 1,
    run_id: "test-run",
    generated_at: "2026-06-01T12:00:00.000Z",
    ranking_mode: "delta_7d",
    topic_queries: ["llm"],
    repos: [
      {
        rank: 1,
        full_name: "acme/alpha",
        html_url: "https://github.com/acme/alpha",
        stars: 100,
        stars_gained_7d: 10,
        topics: ["llm", "mcp"],
        language: "TypeScript",
        brief:
          "**What it does:** Alpha does things.\n\n**Why now:** Hot.\n\n**Build with it:** Ship.",
        pushed_at: "2026-06-01T00:00:00Z",
      },
      {
        rank: 2,
        full_name: "acme/beta",
        html_url: "https://github.com/acme/beta",
        stars: 80,
        stars_gained_7d: 5,
        topics: ["ai-agent"],
        language: "Python",
        brief: "**What it does:** Beta helps builders.",
        pushed_at: "2026-06-01T00:00:00Z",
      },
    ],
    ...overrides,
  };
}

export async function seedWeekDigests(
  rootDir: string,
  dates: string[],
  options?: { skip?: { date: string; edition: "oss" | "skills" } },
): Promise<void> {
  for (const date of dates) {
    for (const edition of ["oss", "skills"] as const) {
      if (options?.skip?.date === date && options.skip.edition === edition) {
        continue;
      }
      const editionDef = EDITIONS[edition];
      const dir = path.join(briefingsDirForEdition(rootDir, editionDef), date);
      const digest =
        edition === "skills"
          ? minimalDigest({
              repos: [
                {
                  rank: 1,
                  full_name: "skills/one",
                  html_url: "https://github.com/skills/one",
                  stars: 200,
                  stars_gained_7d: 20,
                  topics: ["ai-skill", "claude-code"],
                  language: "TypeScript",
                  brief: "**What it does:** Skill one.",
                  pushed_at: "2026-06-01T00:00:00Z",
                },
                {
                  rank: 2,
                  full_name: "acme/alpha",
                  html_url: "https://github.com/acme/alpha",
                  stars: 100,
                  stars_gained_7d: 8,
                  topics: ["claude-code"],
                  language: "TypeScript",
                  brief: "**What it does:** Alpha overlap.",
                  pushed_at: "2026-06-01T00:00:00Z",
                },
              ],
            })
          : minimalDigest();
      await writeDigestJson(dir, digest);
    }
  }
}
