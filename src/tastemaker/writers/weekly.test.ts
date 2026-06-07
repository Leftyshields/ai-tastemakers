import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { renderWeeklyMarkdown, writeWeeklyReview } from "./weekly.js";
import type { WeeklyReview } from "../types.js";

const sampleReview: WeeklyReview = {
  schema_version: 1,
  week_id: "2026-W23",
  week_start: "2026-06-01",
  week_end: "2026-06-07",
  days_covered: { oss: 7, skills: 7 },
  stats: {
    unique_repos: { oss: 10, skills: 8 },
    total_stars_gained: { oss: 500, skills: 300 },
    top_topics: { oss: ["llm", "mcp"], skills: ["ai-skill"] },
    repeat_repos: { oss: [{ full_name: "acme/alpha", days_appeared: 2 }], skills: [] },
    cross_edition_overlap: ["acme/alpha"],
    ranking_modes: ["delta_7d"],
    standouts: { oss: [], skills: [] },
  },
  narrative: {
    opening: "Opening text.",
    oss: "OSS week.",
    skills: "Skills week.",
    cross_lane: "Cross lane.",
    takeaway: "Takeaway.",
  },
  generated_at: "2026-06-07T12:00:00.000Z",
};

describe("weekly writers", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "weekly-write-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("renderWeeklyMarkdown includes stats and narrative sections", () => {
    const md = renderWeeklyMarkdown(sampleReview);
    expect(md).toContain("# Tastemakers Weekly — 2026-W23");
    expect(md).toContain("Week at a glance");
    expect(md).toContain("acme/alpha");
    expect(md).toContain("## Opening");
    expect(md).toContain("Opening text.");
    expect(md).toContain("## Skill Tastemakers");
  });

  it("writeWeeklyReview writes json and markdown", async () => {
    const { jsonPath, markdownPath } = await writeWeeklyReview(tmpDir, sampleReview);
    const json = JSON.parse(await fs.readFile(jsonPath, "utf8"));
    expect(json.week_id).toBe("2026-W23");
    const md = await fs.readFile(markdownPath, "utf8");
    expect(md).toContain("Tastemakers Weekly");
  });
});
