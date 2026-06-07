import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { loadWeekDigests } from "./load.js";
import { parseWeekId } from "./week.js";
import { seedWeekDigests } from "./fixtures.js";

describe("loadWeekDigests", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "weekly-load-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("loads complete week (14 digests)", async () => {
    const { dates } = parseWeekId("2026-W23");
    await seedWeekDigests(tmpDir, dates);
    const result = await loadWeekDigests(tmpDir, dates);
    expect(result.complete).toBe(true);
    expect(result.missing).toHaveLength(0);
    expect(result.entries).toHaveLength(14);
    expect(result.days_covered.oss).toBe(7);
    expect(result.days_covered.skills).toBe(7);
  });

  it("reports incomplete when a digest is missing", async () => {
    const { dates } = parseWeekId("2026-W23");
    await seedWeekDigests(tmpDir, dates, {
      skip: { date: dates[3], edition: "skills" },
    });
    const result = await loadWeekDigests(tmpDir, dates);
    expect(result.complete).toBe(false);
    expect(result.missing).toHaveLength(1);
    expect(result.skipReason).toMatch(/Incomplete week/);
  });
});
