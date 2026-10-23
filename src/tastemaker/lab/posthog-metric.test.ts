import { describe, it, expect } from "vitest";
import {
  buildEventDailyHogQL,
  parsePostHogMetricRef,
} from "../../../scripts/lab/posthog-metric.js";

describe("posthog metric ref", () => {
  it("parses repo_click with section filter", () => {
    const p = parsePostHogMetricRef("event:repo_click?section=skills");
    expect(p.kind).toBe("event");
    expect(p.event).toBe("repo_click");
    expect(p.filters?.section).toBe("skills");
  });

  it("builds hogql for daily repo_click counts filtered by section", () => {
    const sql = buildEventDailyHogQL("repo_click", { section: "skills" }, "2026-10-11", "2026-10-24");
    expect(sql).toContain("repo_click");
    expect(sql).toContain("properties['section'] = 'skills'");
  });
});
