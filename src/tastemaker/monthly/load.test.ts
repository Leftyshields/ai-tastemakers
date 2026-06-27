import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { loadMonthWeeklyReviews } from "./load.js";
import { aggregateMonth } from "./aggregate.js";
import { juneWeeklyFixtures, seedWeeklyReviews } from "./fixtures.js";

describe("monthly load", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "monthly-load-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("skips when fewer than 2 weekly sources", async () => {
    await seedWeeklyReviews(tmpDir, juneWeeklyFixtures.slice(0, 1));
    const result = await loadMonthWeeklyReviews(tmpDir, "2026-06", {
      excludeOnOrAfterWeekStart: "2026-06-28",
    });
    expect(result.complete).toBe(false);
    expect(result.skipReason).toMatch(/Incomplete month/);
  });

  it("loads 2+ weekly sources before rollup week", async () => {
    await seedWeeklyReviews(tmpDir, juneWeeklyFixtures);
    const result = await loadMonthWeeklyReviews(tmpDir, "2026-06", {
      excludeOnOrAfterWeekStart: "2026-06-28",
    });
    expect(result.complete).toBe(true);
    expect(result.sources.length).toBe(3);
    expect(result.sources.map((s) => s.week_id)).toEqual([
      "2026-W23",
      "2026-W24",
      "2026-W25",
    ]);
  });
});

describe("monthly aggregate", () => {
  it("sums stars and unions topics", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "monthly-agg-"));
    await seedWeeklyReviews(tmpDir, juneWeeklyFixtures);
    const loaded = await loadMonthWeeklyReviews(tmpDir, "2026-06", {
      excludeWeekStartBefore: "2026-06-22",
    });
    const agg = aggregateMonth("2026-06", loaded.sources);
    expect(agg.stats.total_stars_gained.oss).toBe(400 + 450 + 500);
    expect(agg.stats.source_week_ids).toEqual(["2026-W23", "2026-W24", "2026-W25"]);
    await fs.rm(tmpDir, { recursive: true, force: true });
  });
});
