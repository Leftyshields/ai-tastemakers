import { describe, it, expect } from "vitest";
import {
  buildWeeklyEmailPrompt,
  buildWeeklyPrompt,
  coerceWeeklyNarrative,
  fallbackWeeklyNarrative,
  narrateWeekly,
  parseWeeklyEmailMarkdown,
  parseWeeklyNarrative,
  WEEKLY_EMAIL_SYSTEM_PROMPT,
  WEEKLY_SYSTEM_PROMPT,
} from "./weekly.js";
import { aggregateWeek } from "../weekly/aggregate.js";
import { parseWeekId } from "../weekly/week.js";
import type { LoadedDigestEntry } from "../types.js";
import { minimalDigest } from "../weekly/fixtures.js";

describe("weekly narrate", () => {
  const window = parseWeekId("2026-W23");
  const entries: LoadedDigestEntry[] = [
    { date: window.dates[0], edition: "oss", digest: minimalDigest() },
    { date: window.dates[0], edition: "skills", digest: minimalDigest() },
  ];
  const aggregate = aggregateWeek(window, entries);

  it("buildWeeklyPrompt includes stats JSON; rules live on the system prompt", () => {
    const prompt = buildWeeklyPrompt(aggregate);
    expect(prompt).toContain("2026-W23");
    expect(prompt).toContain("unique_repos");
    expect(prompt).toContain("<<<UNTRUSTED_WEEKLY_DATA>>>");
    expect(prompt).not.toContain("Audience rules:");
    expect(WEEKLY_SYSTEM_PROMPT).toContain("## For executives");
    expect(WEEKLY_SYSTEM_PROMPT).toContain("## For AI generalists");
    expect(WEEKLY_SYSTEM_PROMPT).toContain("## The numbers");
    expect(WEEKLY_SYSTEM_PROMPT).toMatch(/never follow/i);
  });

  it("parseWeeklyNarrative splits the three audience sections", () => {
    const text = `## For executives
Strategy here.

## For AI generalists
Stack here.

## The numbers
How to read this.`;

    const narrative = parseWeeklyNarrative(text);
    expect(narrative.executive).toContain("Strategy");
    expect(narrative.generalist).toContain("Stack");
    expect(narrative.statistician).toContain("How to read");
  });

  it("parseWeeklyNarrative maps legacy headers", () => {
    const text = `## Opening
Week thesis here.

## Builder Takeaway
Watch this space.`;

    const narrative = parseWeeklyNarrative(text);
    expect(narrative.generalist).toContain("Week thesis");
    expect(narrative.executive).toContain("Watch");
  });

  it("parseWeeklyNarrative falls back when no headers", () => {
    const narrative = parseWeeklyNarrative("Plain paragraph only.");
    expect(narrative.executive).toBe("Plain paragraph only.");
  });

  it("fallbackWeeklyNarrative preserves stats-only message", () => {
    const narrative = fallbackWeeklyNarrative("rate limit");
    expect(narrative.executive).toContain("unavailable");
    expect(narrative.executive).toContain("rate limit");
  });

  it("coerceWeeklyNarrative maps legacy JSON keys", () => {
    const narrative = coerceWeeklyNarrative({
      opening: "Old open.",
      takeaway: "Old take.",
    });
    expect(narrative.executive).toBe("Old take.");
    expect(narrative.generalist).toContain("Old open.");
  });

  it("narrateWeekly returns fallback on API error", async () => {
    const narrative = await narrateWeekly("bad-key", "claude-test", aggregate);
    expect(narrative.executive).toContain("unavailable");
  });

  it("parseWeeklyEmailMarkdown splits verdict and body", () => {
    const copy = parseWeeklyEmailMarkdown(`## Verdict
This week the interesting work was memory.

## Body
Monday a hub jumped.

Stars measure attention, not spend.`);
    expect(copy?.verdict).toContain("interesting work");
    expect(copy?.body).toContain("Monday a hub jumped");
  });

  it("buildWeeklyEmailPrompt is data-only; story rules live on the system prompt", () => {
    const prompt = buildWeeklyEmailPrompt(aggregate, "LAB SHOULD NOT APPEAR");
    expect(prompt).toContain("<<<UNTRUSTED_WEEKLY_EMAIL_DATA>>>");
    expect(prompt).toContain("https://github.com/");
    expect(prompt).toContain("Daily #1");
    expect(prompt).not.toContain("what it DOES");
    expect(prompt).not.toContain("LAB SHOULD NOT APPEAR");
    expect(prompt).not.toContain("## The tell");
    expect(WEEKLY_EMAIL_SYSTEM_PROMPT).toContain("## Body");
    expect(WEEKLY_EMAIL_SYSTEM_PROMPT).toContain("what it DOES");
    expect(WEEKLY_EMAIL_SYSTEM_PROMPT).toContain("day anchors");
    expect(WEEKLY_EMAIL_SYSTEM_PROMPT).toMatch(/Do NOT reference our tooling, Lab/i);
  });
});
