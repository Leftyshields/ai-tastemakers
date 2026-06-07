import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { loadRecentBriefingRepos } from "./score.js";
import type { Digest } from "../types.js";

describe("loadRecentBriefingRepos", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "tastemaker-score-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  async function writeDigest(date: string, repos: string[]): Promise<void> {
    const dir = path.join(tmpDir, date);
    await fs.mkdir(dir, { recursive: true });
    const digest: Digest = {
      schema_version: 1,
      run_id: "test",
      generated_at: `${date}T12:00:00.000Z`,
      ranking_mode: "bootstrap_since_first_seen",
      topic_queries: ["llm"],
      repos: repos.map((full_name, i) => ({
        rank: i + 1,
        full_name,
        html_url: `https://github.com/${full_name}`,
        stars: 100,
        stars_gained_7d: 10,
        topics: ["llm"],
        language: "TS",
        brief: "Brief",
        pushed_at: "2026-06-01T00:00:00Z",
      })),
    };
    await fs.writeFile(path.join(dir, "digest.json"), JSON.stringify(digest), "utf-8");
  }

  it("excludes the current date from soft-dedup sources", async () => {
    await writeDigest("2026-06-06", ["acme/old"]);
    await writeDigest("2026-06-07", ["acme/today"]);

    const withToday = await loadRecentBriefingRepos(tmpDir, 3);
    expect(withToday.has("acme/today")).toBe(true);
    expect(withToday.has("acme/old")).toBe(true);

    const excludingToday = await loadRecentBriefingRepos(tmpDir, 3, "2026-06-07");
    expect(excludingToday.has("acme/today")).toBe(false);
    expect(excludingToday.has("acme/old")).toBe(true);
  });
});
