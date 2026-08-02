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
    expect(prompt).toContain("External context (web, Hacker News, Reddit");
    expect(prompt).toContain("Recent launch thread on HN.");
    expect(prompt).toContain("Editorial rules");
  });

  it("uses structured context tiers when enabled", () => {
    const prompt = buildPrompt(
      {
        ...sampleRepo,
        external_context: "[Hacker News]\nShow HN thread.",
      },
      { structuredContext: true },
    );
    expect(prompt).toContain("## Context graph");
    expect(prompt).toContain("### Ground truth — README");
    expect(prompt).toContain("### Repo metadata");
    expect(prompt).toContain("### Timely signals");
    expect(prompt).toContain("Show HN thread.");
    expect(prompt).not.toContain("External context (web, Hacker News, Reddit");
  });

  it("adds ponytail constraints when enabled", () => {
    const prompt = buildPrompt(sampleRepo, { ponytail: true });
    expect(prompt).toContain("Ponytail constraints (strict):");
    expect(prompt).toContain("ONE integration step");
    expect(prompt).toContain("no multi-tool stacks");
  });

  it("combines structured context and ponytail rules", () => {
    const prompt = buildPrompt(sampleRepo, {
      structuredContext: true,
      ponytail: true,
    });
    expect(prompt).toContain("## Context graph");
    expect(prompt).toContain("Ponytail constraints (strict):");
    expect(prompt).toContain("Treat README as ground truth");
  });
});
