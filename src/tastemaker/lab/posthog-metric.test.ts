import { describe, it, expect } from "vitest";
import {
  buildEventDailyHogQL,
  parsePostHogMetricRef,
} from "../../../scripts/lab/posthog-metric.js";

describe("posthog metric ref", () => {
  it("parses event with filters", () => {
    const p = parsePostHogMetricRef("event:outbound_repo_click?edition=skills");
    expect(p.kind).toBe("event");
    expect(p.event).toBe("outbound_repo_click");
    expect(p.filters?.edition).toBe("skills");
  });

  it("builds hogql for daily counts", () => {
    const sql = buildEventDailyHogQL("outbound_repo_click", { edition: "skills" }, "2026-10-11", "2026-10-24");
    expect(sql).toContain("outbound_repo_click");
    expect(sql).toContain("properties.edition = 'skills'");
  });
});
