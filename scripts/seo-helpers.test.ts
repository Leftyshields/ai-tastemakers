import { describe, it, expect } from "vitest";
import { briefMetaDescription, briefOgTitle, extractBriefSection } from "./seo-helpers.js";
import { briefOgCardSvg } from "./generate-brief-og.js";

describe("brief social metadata", () => {
  it("uses Why now for description hook", () => {
    const desc = briefMetaDescription("AI Tastemakers", "2026-08-01", [
      {
        full_name: "acme/demo",
        brief:
          "**What it does:** A demo tool.\n\n**Why now:** Front page of HN after v2 launch drew 400 comments.\n\n**Build with it:** Wire into CI.",
      },
    ]);
    expect(desc).toContain("HN");
    expect(desc).not.toContain("What it does:");
  });

  it("formats og title with date and picks", () => {
    const repos = Array.from({ length: 10 }, (_, i) => ({ full_name: `acme/repo${i}` }));
    expect(briefOgTitle("AI Tastemakers", "2026-08-01", repos)).toBe(
      "Aug 1 · repo0, repo1 +8 more | AI Tastemakers",
    );
  });
});

describe("briefOgCardSvg", () => {
  it("includes edition and repo picks", () => {
    const svg = briefOgCardSvg({
      date: "2026-08-01",
      editionName: "AI Tastemakers",
      repos: ["acme/demo", "other/tool"],
    });
    expect(svg).toContain("Daily Brief");
    expect(svg).toContain("demo");
  });
});

describe("extractBriefSection", () => {
  it("pulls Why now text", () => {
    const why = extractBriefSection(
      "**What it does:** X.\n\n**Why now:** Trending on GitHub this week.\n\n**Build with it:** Y.",
      "**Why now:**",
    );
    expect(why).toContain("Trending on GitHub");
  });
});
