import { describe, it, expect } from "vitest";
import { buildMonthlyPrompt } from "./monthly.js";
import { aggregateMonth } from "../monthly/aggregate.js";
import type { MonthlySourceWeek } from "../types.js";

const sources: MonthlySourceWeek[] = [
  {
    week_id: "2026-W23",
    week_start: "2026-06-01",
    week_end: "2026-06-07",
    review: {
      schema_version: 1,
      week_id: "2026-W23",
      week_start: "2026-06-01",
      week_end: "2026-06-07",
      days_covered: { oss: 7, skills: 7 },
      stats: {
        unique_repos: { oss: 10, skills: 8 },
        total_stars_gained: { oss: 500, skills: 300 },
        top_topics: { oss: ["llm"], skills: ["ai-skill"] },
        repeat_repos: { oss: [], skills: [] },
        cross_edition_overlap: [],
        ranking_modes: ["delta_7d"],
        standouts: { oss: [], skills: [] },
      },
      narrative: {
        opening: "Week one opening.",
        oss: "Week one oss.",
        skills: "Week one skills.",
        cross_lane: "Cross.",
        takeaway: "Takeaway.",
      },
      generated_at: "2026-06-07T12:00:00.000Z",
    },
  },
];

describe("monthly narrate", () => {
  it("buildMonthlyPrompt includes weekly narratives and month stats", () => {
    const aggregate = aggregateMonth("2026-06", sources);
    const prompt = buildMonthlyPrompt(aggregate);
    expect(prompt).toContain("monthly rollup");
    expect(prompt).toContain("Week one opening.");
    expect(prompt).toContain("month_stats");
    expect(prompt).toContain("do NOT concatenate");
  });
});
