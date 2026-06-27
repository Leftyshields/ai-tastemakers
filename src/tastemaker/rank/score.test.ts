import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import {
  loadAllPriorBriefingRepos,
  loadBriefingFeaturedSets,
  loadRecentBriefingRepos,
} from "./score.js";
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

describe("loadAllPriorBriefingRepos", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "tastemaker-score-all-"));
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

  it("returns empty set when briefings dir is missing", async () => {
    const featured = await loadAllPriorBriefingRepos(path.join(tmpDir, "missing"));
    expect(featured.size).toBe(0);
  });

  it("unions repos from all prior briefing dates", async () => {
    await writeDigest("2026-06-01", ["acme/alpha"]);
    await writeDigest("2026-06-02", ["acme/beta"]);
    await writeDigest("2026-06-03", ["acme/gamma"]);

    const featured = await loadAllPriorBriefingRepos(tmpDir);
    expect(featured.has("acme/alpha")).toBe(true);
    expect(featured.has("acme/beta")).toBe(true);
    expect(featured.has("acme/gamma")).toBe(true);
  });

  it("excludes the current date from prior history", async () => {
    await writeDigest("2026-06-06", ["acme/old"]);
    await writeDigest("2026-06-07", ["acme/today"]);

    const featured = await loadAllPriorBriefingRepos(tmpDir, "2026-06-07");
    expect(featured.has("acme/today")).toBe(false);
    expect(featured.has("acme/old")).toBe(true);
  });

  it("includes repos from more dates than the soft-dedup window", async () => {
    for (let day = 1; day <= 8; day++) {
      const date = `2026-06-${String(day).padStart(2, "0")}`;
      await writeDigest(date, [`acme/day-${day}`]);
    }

    const recent = await loadRecentBriefingRepos(tmpDir, 5);
    const allPrior = await loadAllPriorBriefingRepos(tmpDir, "2026-06-09");

    expect(recent.has("acme/day-1")).toBe(false);
    expect(allPrior.has("acme/day-1")).toBe(true);
    expect(allPrior.has("acme/day-8")).toBe(true);
  });

  it("skips dates with missing or invalid digest.json", async () => {
    await writeDigest("2026-06-01", ["acme/valid"]);
    const badDir = path.join(tmpDir, "2026-06-02");
    await fs.mkdir(badDir, { recursive: true });
    await fs.writeFile(path.join(badDir, "digest.json"), "{not json", "utf-8");

    const featured = await loadAllPriorBriefingRepos(tmpDir);
    expect(featured.has("acme/valid")).toBe(true);
    expect(featured.size).toBe(1);
  });

  it("loadBriefingFeaturedSets returns both windows in one pass", async () => {
    for (let day = 1; day <= 6; day++) {
      const date = `2026-06-${String(day).padStart(2, "0")}`;
      await writeDigest(date, [`acme/day-${day}`]);
    }

    const { recentlyFeatured, previouslyFeatured } = await loadBriefingFeaturedSets(
      tmpDir,
      3,
      "2026-06-07",
    );

    expect(recentlyFeatured.has("acme/day-6")).toBe(true);
    expect(recentlyFeatured.has("acme/day-5")).toBe(true);
    expect(recentlyFeatured.has("acme/day-4")).toBe(true);
    expect(recentlyFeatured.has("acme/day-3")).toBe(false);
    expect(previouslyFeatured.has("acme/day-1")).toBe(true);
    expect(previouslyFeatured.has("acme/day-6")).toBe(true);
  });
});
