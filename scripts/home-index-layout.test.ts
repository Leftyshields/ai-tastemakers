import { describe, it, expect } from "vitest";
import {
  extractWorksWithTools,
  formatWorksWithLine,
  countLabDoneExperiments,
  briefSummaryForPick,
} from "./home-index-layout.js";
import { formatWeekReviewDateRange } from "./week-review-date-range.js";
import type { LabExperimentEntry } from "./lab/validate-experiments.js";

describe("home-index-layout", () => {
  it("extractWorksWithTools prefers longer phrases and avoids double Claude", () => {
    const brief =
      "CC Switch manages MCP servers for Claude Code, Codex, Gemini CLI, and Grok Build.";
    expect(extractWorksWithTools(brief)).toEqual([
      "Claude Code",
      "Gemini CLI",
      "Grok Build",
      "Codex",
    ]);
  });

  it("formatWorksWithLine caps at three tools plus more", () => {
    const line = formatWorksWithLine(["Cursor", "Windsurf", "Claude Code", "Copilot", "Codex"]);
    expect(line.display).toBe("Cursor, Windsurf, Claude Code +2 more");
    expect(line.title).toContain("Copilot");
  });

  it("counts done lab experiments", () => {
    const ex = [{ status: "done" }, { status: "running" }, { status: "done" }] as LabExperimentEntry[];
    expect(countLabDoneExperiments(ex)).toBe(2);
  });

  it("formats weekly review JSON dates as Oct 19 to 25", () => {
    expect(formatWeekReviewDateRange("2026-10-19", "2026-10-25")).toBe("Oct 19 to 25");
  });

  it("briefSummaryForPick strips markdown and truncates", () => {
    const brief = "**What it does:** REA is an MCP server.\n\n**Why now:** Hot.";
    expect(briefSummaryForPick(brief)).toBe("REA is an MCP server.");
  });
});
