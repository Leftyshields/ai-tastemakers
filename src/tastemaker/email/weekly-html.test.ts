import { describe, it, expect } from "vitest";
import type { WeeklyReview } from "../types.js";
import {
  renderWeeklyEmailHtml,
  renderWeeklyEmailText,
  weeklyEmailSubject,
  ossTop10Url,
  skillsTop10Url,
  SUNDAY_EMAIL_DEK,
  renderWeeklyMarkup,
} from "./weekly-html.js";

const sampleReview: WeeklyReview = {
  schema_version: 1,
  week_id: "2026-W33",
  week_start: "2026-08-10",
  week_end: "2026-08-16",
  days_covered: { oss: 7, skills: 7 },
  stats: {
    unique_repos: { oss: 30, skills: 24 },
    total_stars_gained: { oss: 1000, skills: 800 },
    top_topics: { oss: ["llm"], skills: ["claude-code"] },
    repeat_repos: { oss: [], skills: [] },
    cross_edition_overlap: ["acme/demo"],
    ranking_modes: ["delta_7d"],
    standouts: { oss: [], skills: [] },
  },
  narrative: {
    executive: "Watch **cost** and memory.",
    generalist: "Ponytail fights overbuilding.",
    statistician: "Star totals are skewed.",
  },
  email: {
    verdict: "This week the interesting work was making agents cheaper to run, and making them remember.",
    body: "Monday a hub jumped. [OmniRoute](https://github.com/diegosouzapw/OmniRoute) is a gateway. Stars measure attention, not spend.",
  },
  generated_at: "2026-08-16T12:00:00.000Z",
};

describe("weekly email", () => {
  it("subject is the verdict", () => {
    expect(weeklyEmailSubject(sampleReview)).toBe(sampleReview.email!.verdict);
  });

  it("html leads with verdict, dek, list links, then flowing body and receipts", () => {
    const html = renderWeeklyEmailHtml(sampleReview, "https://example.com/app");
    expect(html).toContain(sampleReview.email!.verdict);
    expect(html).toContain(SUNDAY_EMAIL_DEK);
    expect(html.indexOf(SUNDAY_EMAIL_DEK)).toBeLessThan(
      html.indexOf(ossTop10Url("https://example.com/app", "2026-08-16")),
    );
    expect(html).toContain("https://github.com/diegosouzapw/OmniRoute");
    expect(html).toContain("Monday a hub jumped");
    expect(html).not.toContain("The tell");
    expect(html).not.toContain("Evidence");
    expect(html).toContain("Receipts");
    expect(html).toContain("AI Tastemakers: 30 unique repos");
    expect(html).toContain("Skill Tastemakers: 24 unique repos");
    expect(html).toContain("Both lists: 1");
    expect(html).toContain("Ranked by 7-day star growth");
    expect(html).toContain(ossTop10Url("https://example.com/app", "2026-08-16"));
    expect(html).toContain(skillsTop10Url("https://example.com/app", "2026-08-16"));
    expect(html).toContain("Full week on the site");
    expect(html).not.toContain("For executives");
    expect(html).not.toContain("For AI generalists");
    expect(html).not.toContain("DIGEST_");
  });

  it("plain text includes dek then top 10 URLs and receipts", () => {
    const text = renderWeeklyEmailText(sampleReview, "https://example.com");
    expect(text).toContain(SUNDAY_EMAIL_DEK);
    expect(text).toContain("Monday a hub jumped");
    expect(text).toContain("RECEIPTS");
    expect(text).toContain("briefings/2026-08-16.html");
    expect(text).toContain("skills/briefings/2026-08-16.html");
    expect(text).not.toContain("THE TELL");
    expect(text).not.toContain("FOR EXECUTIVES");
  });

  it("renders github markdown links and rejects non-github hrefs", () => {
    expect(renderWeeklyMarkup("[OmniRoute](https://github.com/diegosouzapw/OmniRoute)")).toContain(
      'href="https://github.com/diegosouzapw/OmniRoute"',
    );
    expect(renderWeeklyMarkup("[x](https://evil.example/phish)")).toContain("[x](https://evil.example/phish)");
    expect(renderWeeklyMarkup("[x](https://evil.example/phish)")).not.toContain("href=\"https://evil.example");
  });
});
