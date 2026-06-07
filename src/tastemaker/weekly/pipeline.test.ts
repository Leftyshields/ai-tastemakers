import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { runWeeklyPipeline } from "./pipeline.js";
import { parseWeekId } from "./week.js";
import { seedWeekDigests } from "./fixtures.js";
import type { WeeklyConfig } from "../types.js";

describe("runWeeklyPipeline", () => {
  let tmpDir: string;
  let config: WeeklyConfig;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "weekly-pipe-"));
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
    opening: "Week opened.",
    oss: "OSS lane.",
    skills: "Skills lane.",
    cross_lane: "Overlap themes.",
    takeaway: "Build more.",
  };

  it("skips when week is incomplete", async () => {
    const { dates } = parseWeekId("2026-W23");
    await seedWeekDigests(tmpDir, dates.slice(0, 3));

    const result = await runWeeklyPipeline(
      config,
      { weekId: "2026-W23" },
      {
        narrate: vi.fn(),
        now: new Date("2026-06-07T12:00:00.000Z"),
      },
    );

    expect(result.skipped).toBe(true);
    expect(result.reason).toMatch(/Incomplete week/);
  });

  it("writes weekly artifacts when week is complete", async () => {
    const { dates } = parseWeekId("2026-W23");
    await seedWeekDigests(tmpDir, dates);

    const result = await runWeeklyPipeline(
      config,
      { weekId: "2026-W23" },
      {
        narrate: vi.fn().mockResolvedValue(mockNarrative),
        now: new Date("2026-06-07T12:00:00.000Z"),
      },
    );

    expect(result.skipped).toBe(false);
    expect(result.week_id).toBe("2026-W23");
    expect(result.jsonPath).toBeDefined();
    expect(result.markdownPath).toBeDefined();

    const json = JSON.parse(await fs.readFile(result.jsonPath!, "utf8"));
    expect(json.stats.unique_repos.oss).toBeGreaterThan(0);
    expect(json.narrative.skills).toBe("Skills lane.");

    const md = await fs.readFile(result.markdownPath!, "utf8");
    expect(md).toContain("Tastemakers Weekly");
  });
});
