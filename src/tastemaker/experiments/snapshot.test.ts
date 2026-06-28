import { describe, it, expect } from "vitest";
import { parseSnapshotCsv, appendSnapshotToExperiment } from "./snapshot.js";
import type { ExperimentRecord } from "./types.js";

const simplifiedCsv = `type,key,count
pageview,/briefings/2026-06-27.html,42
pageview,/briefings/skills/2026-06-27.html,18
outbound_click,acme/cool-tool,5
outbound_click,repo:other/lib,3
`;

describe("parseSnapshotCsv", () => {
  it("parses simplified type/key/count CSV", () => {
    const snapshot = parseSnapshotCsv(simplifiedCsv, {
      period: { start: "2026-06-20", end: "2026-06-27" },
      source: "tests/fixtures/analytics-export.csv",
    });

    expect(snapshot.period).toEqual({ start: "2026-06-20", end: "2026-06-27" });
    expect(snapshot.metrics.pageviews_by_path).toEqual({
      "/briefings/2026-06-27.html": 42,
      "/briefings/skills/2026-06-27.html": 18,
    });
    expect(snapshot.metrics.outbound_clicks).toEqual({
      "acme/cool-tool": 5,
      "other/lib": 3,
    });
    expect(snapshot.imported_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(snapshot.source).toBe("tests/fixtures/analytics-export.csv");
  });

  it("parses analytics pages export", () => {
    const pagesCsv = `Page,Pageviews
/briefings/2026-06-27.html,100
/lab/index.html,12
`;
    const snapshot = parseSnapshotCsv(pagesCsv);

    expect(snapshot.metrics.pageviews_by_path).toEqual({
      "/briefings/2026-06-27.html": 100,
      "/lab/index.html": 12,
    });
  });

  it("appends snapshot to experiment record", () => {
    const record: ExperimentRecord = {
      schema_version: 1,
      id: "EXP-20260628-web-enrich-skills",
      hypothesis: "test",
      change_summary: "test",
      status: "draft",
      edition: "skills",
      baseline_window: { start: "2026-06-20", end: "2026-07-04" },
      treatment_window: { start: "2026-07-05", end: "2026-07-19" },
      change: { flags: {} },
      snapshots: [],
      shadow_runs: [],
      verdict: "",
      keep_change: null,
      notes: "",
    };

    const snapshot = parseSnapshotCsv(simplifiedCsv);
    const updated = appendSnapshotToExperiment(record, snapshot);

    expect(updated.snapshots).toHaveLength(1);
    expect(record.snapshots).toHaveLength(0);
  });
});
