import { describe, it, expect } from "vitest";
import {
  NO_EM_DASH_VOICE_LINE,
  EM_DASH,
  containsEmDash,
  stripEmDashesFromProse,
} from "./brief-voice.js";
import { sanitizeBriefOutput } from "./sanitize.js";
import { NARRATION_SYSTEM_PROMPT } from "./claude.js";
import { HUMANIZER_POLISH_SYSTEM_PROMPT } from "./humanizer-polish.js";
import { WEEKLY_EMAIL_SYSTEM_PROMPT, WEEKLY_SYSTEM_PROMPT } from "./weekly.js";

describe("brief voice em dash policy", () => {
  it("defines the verbatim narration line", () => {
    expect(NO_EM_DASH_VOICE_LINE).toBe(
      'Never use em dashes (—). Use a period, comma, or the word "and" instead, or rewrite the sentence. Normal hyphens are fine.',
    );
  });

  it("OSS/Skills narration prompts include the verbatim line", () => {
    expect(NARRATION_SYSTEM_PROMPT).toContain(NO_EM_DASH_VOICE_LINE);
    expect(HUMANIZER_POLISH_SYSTEM_PROMPT).toContain(NO_EM_DASH_VOICE_LINE);
    expect(WEEKLY_SYSTEM_PROMPT).toContain(NO_EM_DASH_VOICE_LINE);
    expect(WEEKLY_EMAIL_SYSTEM_PROMPT).toContain(NO_EM_DASH_VOICE_LINE);
  });

  it("stripEmDashesFromProse removes U+2014", () => {
    const input = `One idea${EM_DASH}another idea.`;
    const out = stripEmDashesFromProse(input);
    expect(containsEmDash(out)).toBe(false);
    expect(out).toContain("One idea");
    expect(out).toContain("another idea");
  });

  it("sanitizeBriefOutput normalizes em dashes in repo brief sections", () => {
    const dirty = [
      `**What it does:** A tool${EM_DASH}fast and small.`,
      "**Why now:** Trending this week.",
      "**Build with it:** Try the CLI.",
    ].join("\n\n");
    const cleaned = sanitizeBriefOutput(dirty);
    expect(cleaned).not.toBeNull();
    expect(containsEmDash(cleaned!)).toBe(false);
  });
});
