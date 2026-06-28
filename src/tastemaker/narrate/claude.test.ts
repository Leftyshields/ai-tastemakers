import { describe, it, expect } from "vitest";
import { buildPrompt } from "./claude.js";
import type { ScoredRepo } from "../types.js";

const sampleRepo: ScoredRepo = {
  full_name: "acme/demo",
  html_url: "https://github.com/acme/demo",
  stars: 100,
  stars_gained_7d: 12,
  topics: ["llm"],
  language: "TS",
  description: "A demo tool",
  pushed_at: "2026-06-01T00:00:00Z",
  readme_excerpt: "README content",
  score: 12,
};

describe("buildPrompt", () => {
  it("requests three labeled brief sections", () => {
    const prompt = buildPrompt(sampleRepo);
    expect(prompt).toContain("**What it does:**");
    expect(prompt).toContain("**Why now:**");
    expect(prompt).toContain("**Build with it:**");
    expect(prompt).not.toContain("No markdown headings");
    expect(prompt).not.toContain("2–3 sentences");
  });

  it("includes external context when provided", () => {
    const prompt = buildPrompt({
      ...sampleRepo,
      external_context: "[Web]\nRecent launch thread on HN.",
    });
    expect(prompt).toContain("External context (web/HN snippets");
    expect(prompt).toContain("Recent launch thread on HN.");
  });
});
