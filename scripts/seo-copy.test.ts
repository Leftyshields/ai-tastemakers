import { describe, expect, it } from "vitest";
import {
  buildSeoDescriptionFromTemplate,
  buildSeoTitleFromTemplate,
  formatSeoDateLabel,
  metaDescriptionFromLead,
  parseWeeklyReviewDateRange,
  SEO_DESCRIPTION_MAX,
  SEO_TITLE_MAX,
} from "./seo-copy.js";

describe("SEO copy helpers", () => {
  it("formats date label for brief titles", () => {
    expect(formatSeoDateLabel("2026-10-25")).toBe("Oct 25, 2026");
  });

  it("parses weekly review date range from markdown", () => {
    const md = "# Weekly\n\n_2026-10-12 – 2026-10-18 · generated_";
    expect(parseWeeklyReviewDateRange(md)).toEqual({
      start: "2026-10-12",
      end: "2026-10-18",
      year: 2026,
    });
  });

  it("shortens postTitle first when lab title exceeds 60 chars", () => {
    const longTitle = "A".repeat(80);
    const title = buildSeoTitleFromTemplate("{postTitle} | Tastemakers Lab", {
      postTitle: longTitle,
    });
    expect(title.length).toBeLessThanOrEqual(SEO_TITLE_MAX);
    expect(title).toContain("Tastemakers Lab");
  });

  it("truncates lead meta at sentence boundary", () => {
    const lead =
      "First sentence is here. " + "Second sentence adds more detail about the experiment and outcomes.";
    const meta = metaDescriptionFromLead(lead, SEO_DESCRIPTION_MAX);
    expect(meta.length).toBeLessThanOrEqual(SEO_DESCRIPTION_MAX);
    expect(meta.endsWith(".")).toBe(true);
  });

  it("shortens topPick when brief description exceeds 155 chars", () => {
    const desc = buildSeoDescriptionFromTemplate(
      "The open source AI projects gaining the most GitHub stars as of {dateLabel}, led by {topPick}. What each does and why now.",
      { dateLabel: "Oct 25, 2026", topPick: "x".repeat(120) },
    );
    expect(desc.length).toBeLessThanOrEqual(SEO_DESCRIPTION_MAX);
  });
});
