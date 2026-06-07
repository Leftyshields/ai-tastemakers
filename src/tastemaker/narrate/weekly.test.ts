import { describe, it, expect } from "vitest";
import {
  buildWeeklyPrompt,
  fallbackWeeklyNarrative,
  narrateWeekly,
  parseWeeklyNarrative,
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

  it("buildWeeklyPrompt includes stats JSON", () => {
    const prompt = buildWeeklyPrompt(aggregate);
    expect(prompt).toContain("2026-W23");
    expect(prompt).toContain("unique_repos");
    expect(prompt).toContain("## Opening");
    expect(prompt).toContain("## Skill Tastemakers");
  });

  it("parseWeeklyNarrative splits sections", () => {
    const text = `## Opening
Week thesis here.

## AI Tastemakers
OSS editorial.

## Skill Tastemakers
Skills editorial.

## Cross-Lane Themes
Overlap note.

## Builder Takeaway
Watch this space.`;

    const narrative = parseWeeklyNarrative(text);
    expect(narrative.opening).toContain("Week thesis");
    expect(narrative.oss).toContain("OSS editorial");
    expect(narrative.skills).toContain("Skills editorial");
    expect(narrative.cross_lane).toContain("Overlap");
    expect(narrative.takeaway).toContain("Watch");
  });

  it("parseWeeklyNarrative falls back when no headers", () => {
    const narrative = parseWeeklyNarrative("Plain paragraph only.");
    expect(narrative.opening).toBe("Plain paragraph only.");
  });

  it("fallbackWeeklyNarrative preserves stats-only message", () => {
    const narrative = fallbackWeeklyNarrative("rate limit");
    expect(narrative.opening).toContain("unavailable");
    expect(narrative.opening).toContain("rate limit");
  });

  it("narrateWeekly returns fallback on API error", async () => {
    const narrative = await narrateWeekly("bad-key", "claude-test", aggregate);
    expect(narrative.opening).toContain("unavailable");
  });
});
