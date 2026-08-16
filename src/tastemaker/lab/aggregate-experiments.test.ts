import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import {
  buildQueueSummary,
  displayTitle,
  loadAllExperiments,
  loadDashboardExperiments,
  statusLabel,
  writeExperimentsData,
} from "../../../scripts/lab/aggregate-experiments.js";
import type { ExperimentDashboardItem } from "../../../scripts/lab/aggregate-experiments.js";
import type { ExperimentRecord } from "../../experiments/types.js";

function sampleRecord(overrides: Partial<ExperimentRecord> = {}): ExperimentRecord {
  return {
    schema_version: 1,
    id: "EXP-20260628-test",
    hypothesis: "test hypothesis",
    change_summary: "summary",
    status: "baseline",
    edition: "skills",
    baseline_window: { start: "2026-06-28", end: "2026-07-11" },
    treatment_window: { start: "2026-07-12", end: "2026-07-26" },
    change: { flags: {} },
    snapshots: [],
    shadow_runs: [],
    verdict: "",
    keep_change: null,
    notes: "",
    ...overrides,
  };
}

describe("experiment display helpers", () => {
  it("displayTitle prefers title then slug", () => {
    expect(displayTitle(sampleRecord({ title: "Shorter Skills briefs" }))).toBe("Shorter Skills briefs");
    expect(displayTitle(sampleRecord({ id: "EXP-20260701-landing-layout" }))).toBe("Landing layout");
  });

  it("statusLabel uses shipped for archived keep", () => {
    expect(statusLabel("complete", true, true)).toBe("Shipped");
    expect(statusLabel("complete", true, false)).toBe("Kept");
    expect(statusLabel("draft", null, false)).toBe("On hold");
    expect(statusLabel("active", null, false)).toBe("Measuring after");
  });
});

describe("aggregate-experiments", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "lab-exp-"));
    const expDir = path.join(tmpDir, "data", "experiments");
    await fs.mkdir(expDir, { recursive: true });
    await fs.writeFile(
      path.join(expDir, "EXP-20260628-test.json"),
      JSON.stringify(sampleRecord({
        title: "Test experiment",
        reader_glossary: [{ term: "YAGNI", meaning: "You Aren't Gonna Need It." }],
      })),
      "utf-8",
    );
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("loadAllExperiments reads EXP-*.json files", async () => {
    const exps = await loadAllExperiments(tmpDir);
    expect(exps).toHaveLength(1);
    expect(exps[0].id).toBe("EXP-20260628-test");
  });

  it("writeExperimentsData includes archived records and a human queue summary", async () => {
    const archiveDir = path.join(tmpDir, "data", "experiments", "archive");
    await fs.mkdir(archiveDir, { recursive: true });
    await fs.writeFile(
      path.join(archiveDir, "EXP-20260701-archived.json"),
      JSON.stringify(
        sampleRecord({
          id: "EXP-20260701-archived",
          title: "Archived ship",
          status: "complete",
          keep_change: true,
          treatment_window: { start: "2026-08-01", end: "2026-08-14" },
        }),
      ),
      "utf-8",
    );

    const postsDir = path.join(tmpDir, "briefings", "lab", "posts");
    await fs.mkdir(postsDir, { recursive: true });
    await fs.writeFile(path.join(postsDir, "EXP-20260628-test.md"), "# Test experiment\n", "utf-8");

    const labDir = path.join(tmpDir, "site", "lab");
    const count = await writeExperimentsData(tmpDir, labDir);
    expect(count).toBe(2);
    const raw = JSON.parse(await fs.readFile(path.join(labDir, "experiments-data.json"), "utf-8"));
    expect(raw.schema_version).toBe(1);
    expect(raw.queue_summary).toContain("Test experiment");
    expect(raw.queue_summary).toContain("before picture");
    const archived = raw.experiments.find((e: { archived: boolean }) => e.archived);
    expect(archived.title).toBe("Archived ship");
    expect(archived.status_label).toBe("Shipped");
    expect(archived.writeup_href).toBeNull();
    const active = raw.experiments.find((e: { id: string }) => e.id === "EXP-20260628-test");
    expect(active.writeup_href).toBe("posts/EXP-20260628-test.html");
    expect(active.reader_glossary[0].term).toBe("YAGNI");
  });

  it("loadDashboardExperiments returns human titles", async () => {
    const items = await loadDashboardExperiments(tmpDir);
    expect(items[0].title).toBe("Test experiment");
  });
});

describe("buildQueueSummary", () => {
  it("describes an active treatment window in plain language", () => {
    const summary = buildQueueSummary([
      {
        id: "EXP-20260802-ponytail-narration-skills",
        title: "Shorter Skills briefs",
        status: "active",
        treatment_window: { start: "2026-08-17", end: "2026-08-29" },
      } as ExperimentDashboardItem,
    ]);
    expect(summary).toContain("Shorter Skills briefs");
    expect(summary).toContain("The change is on");
    expect(summary).toContain("2026-08-17");
    expect(summary).toContain("2026-08-29");
  });
});
