import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { renderMonthlyMarkdown, writeMonthlyReview } from "./monthly.js";
import type { MonthlyReview } from "../types.js";

const sampleReview: MonthlyReview = {
  schema_version: 1,
  month_id: "2026-06",
  month_start: "2026-06-01",
  month_end: "2026-06-30",
  source_week_ids: ["2026-W23", "2026-W24"],
  month_stats: {
    total_stars_gained: { oss: 1000, skills: 600 },
    top_topics: { oss: ["llm"], skills: ["ai-skill"] },
    source_week_ids: ["2026-W23", "2026-W24"],
  },
  narrative: {
    opening: "Month opening.",
    oss: "OSS month.",
    skills: "Skills month.",
    cross_lane: "Cross.",
    takeaway: "Takeaway.",
  },
  generated_at: "2026-06-22T12:00:00.000Z",
};

describe("monthly writers", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "monthly-write-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("renderMonthlyMarkdown includes stats and narrative", () => {
    const md = renderMonthlyMarkdown(sampleReview);
    expect(md).toContain("# Tastemakers Monthly — 2026-06");
    expect(md).toContain("Month at a glance");
    expect(md).toContain("2026-W23");
    expect(md).toContain("Month opening.");
  });

  it("writeMonthlyReview writes json and markdown", async () => {
    const { jsonPath, markdownPath } = await writeMonthlyReview(tmpDir, sampleReview);
    const json = JSON.parse(await fs.readFile(jsonPath, "utf8"));
    expect(json.month_id).toBe("2026-06");
    const md = await fs.readFile(markdownPath, "utf8");
    expect(md).toContain("Tastemakers Monthly");
  });
});
