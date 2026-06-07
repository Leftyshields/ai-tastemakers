import { describe, it, expect } from "vitest";
import { aggregateWeek, extractBriefExcerpt } from "./aggregate.js";
import { parseWeekId } from "./week.js";
import type { LoadedDigestEntry } from "../types.js";
import { minimalDigest } from "./fixtures.js";

describe("extractBriefExcerpt", () => {
  it("parses What it does section", () => {
    expect(
      extractBriefExcerpt("**What it does:** Does X.\n\n**Why now:** Y."),
    ).toBe("Does X.");
  });

  it("falls back to first sentence for legacy briefs", () => {
    expect(extractBriefExcerpt("Legacy paragraph. More text.")).toBe(
      "Legacy paragraph.",
    );
  });

  it("returns empty for null", () => {
    expect(extractBriefExcerpt(null)).toBe("");
  });
});

describe("aggregateWeek", () => {
  it("computes stats, repeats, overlap, and standouts", () => {
    const window = parseWeekId("2026-W23");
    const entries: LoadedDigestEntry[] = [
      {
        date: window.dates[0],
        edition: "oss",
        digest: minimalDigest(),
      },
      {
        date: window.dates[1],
        edition: "oss",
        digest: minimalDigest({
          repos: minimalDigest().repos.map((r) =>
            r.full_name === "acme/alpha"
              ? { ...r, stars_gained_7d: 15 }
              : r,
          ),
        }),
      },
      {
        date: window.dates[0],
        edition: "skills",
        digest: minimalDigest({
          repos: [
            {
              rank: 1,
              full_name: "acme/alpha",
              html_url: "https://github.com/acme/alpha",
              stars: 100,
              stars_gained_7d: 12,
              topics: ["ai-skill"],
              language: "TypeScript",
              brief: "**What it does:** Overlap repo.",
              pushed_at: "2026-06-01T00:00:00Z",
            },
          ],
        }),
      },
    ];

    const agg = aggregateWeek(window, entries);
    expect(agg.stats.unique_repos.oss).toBe(2);
    // total uses max 7d delta per unique repo (alpha=max(10,15)=15, beta=5)
    expect(agg.stats.total_stars_gained.oss).toBe(20);
    expect(agg.stats.repeat_repos.oss).toEqual([
      { full_name: "acme/alpha", days_appeared: 2 },
      { full_name: "acme/beta", days_appeared: 2 },
    ]);
    expect(agg.stats.cross_edition_overlap).toEqual(["acme/alpha"]);
    expect(agg.stats.standouts.oss[0].full_name).toBe("acme/alpha");
    expect(agg.stats.standouts.oss[0].total_stars_gained).toBe(25);
  });
});
