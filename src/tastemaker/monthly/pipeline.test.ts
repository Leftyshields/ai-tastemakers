import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { runMonthlyPipeline } from "./pipeline.js";
import { juneWeeklyFixtures, seedWeeklyReviews } from "./fixtures.js";
import type { MonthlyConfig } from "../types.js";

describe("runMonthlyPipeline", () => {
  let tmpDir: string;
  let config: MonthlyConfig;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "monthly-pipe-"));
    config = {
      rootDir: tmpDir,
      timezone: "America/Los_Angeles",
      anthropicApiKey: "test-key",
      anthropicModel: "claude-test",
    };
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  const mockNarrative = {
    opening: "Month opened.",
    oss: "OSS month.",
    skills: "Skills month.",
    cross_lane: "Cross themes.",
    takeaway: "Build more.",
  };

  it("skips when month is incomplete", async () => {
    await seedWeeklyReviews(tmpDir, juneWeeklyFixtures.slice(0, 1));

    const result = await runMonthlyPipeline(
      config,
      { monthId: "2026-06" },
      { narrate: vi.fn(), now: new Date("2026-06-22T12:00:00.000Z") },
    );

    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/Incomplete month/);
  });

  it("writes monthly artifacts when sources are sufficient", async () => {
    await seedWeeklyReviews(tmpDir, juneWeeklyFixtures);

    const result = await runMonthlyPipeline(
      config,
      { monthId: "2026-06" },
      {
        narrate: vi.fn().mockResolvedValue(mockNarrative),
        now: new Date("2026-06-28T12:00:00.000Z"),
      },
    );

    expect(result.skipped).toBe(false);
    expect(result.month_id).toBe("2026-06");
    expect(result.jsonPath).toBeDefined();

    const json = JSON.parse(await fs.readFile(result.jsonPath!, "utf8"));
    expect(json.source_week_ids).toEqual(["2026-W23", "2026-W24", "2026-W25"]);
    expect(json.narrative.opening).toBe("Month opened.");

    const md = await fs.readFile(result.markdownPath!, "utf8");
    expect(md).toContain("Tastemakers Monthly");
  });
});
