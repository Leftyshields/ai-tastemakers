import { describe, it, expect } from "vitest";
import { rubricPass, scoreBriefHeuristic } from "./rubric.js";

describe("scoreBriefHeuristic", () => {
  it("penalizes star-count-only Why now", () => {
    const scores = scoreBriefHeuristic({
      full_name: "acme/demo",
      brief: `**What it does:** Demo is a CLI for batch exports.
**Why now:** The repo gained 7,268 stars this week signaling community adoption.
**Build with it:** Run demo export against your S3 bucket nightly.`,
    });
    expect(scores.why_now).toBeLessThanOrEqual(3);
    expect(scores.comment).toContain("star count");
  });

  it("rewards timely hooks in Why now", () => {
    const scores = scoreBriefHeuristic({
      full_name: "acme/demo",
      brief: `**What it does:** Demo is a CLI for batch exports.
**Why now:** Hit front page of Hacker News yesterday after the v2 launch thread drew 400 comments.
**Build with it:** Wire demo into your CI pipeline to export artifacts after each deploy.`,
    });
    expect(scores.why_now).toBeGreaterThanOrEqual(4);
  });

  it("passes well-formed briefs", () => {
    const scores = scoreBriefHeuristic({
      full_name: "acme/demo",
      brief: `**What it does:** Demo exposes an MCP server for Cursor with twelve export tools.
**Why now:** Reddit r/LocalLLaMA thread this week compared it to official Claude Code hooks.
**Build with it:** Add demo as an MCP server in Cursor settings and map export tools to your repo layout.`,
    });
    expect(rubricPass(scores)).toBe(true);
  });
});
