import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import {
  appendShadowRun,
  experimentFilePath,
  loadExperiment,
  registerExperiment,
} from "./load.js";

describe("experiments/load", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "exp-load-"));
    await fs.mkdir(path.join(tmpDir, "data/experiments"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "data/experiments/_template.json"),
      JSON.stringify({
        schema_version: 1,
        id: "EXP-YYYYMMDD-slug",
        hypothesis: "template hypothesis",
        change_summary: "template summary",
        status: "draft",
        edition: "skills",
        baseline_window: { start: "", end: "" },
        treatment_window: { start: "", end: "" },
        change: { flags: {} },
        snapshots: [],
        shadow_runs: [],
        verdict: "",
        keep_change: null,
        notes: "",
      }),
      "utf-8",
    );
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("registerExperiment creates a new record from template", async () => {
    const id = "EXP-20260628-test";
    const saved = await registerExperiment(tmpDir, id);
    expect(saved).toBe(experimentFilePath(tmpDir, id));

    const record = await loadExperiment(tmpDir, id);
    expect(record.id).toBe(id);
    expect(record.hypothesis).toBe("template hypothesis");
    expect(record.snapshots).toEqual([]);
  });

  it("appendShadowRun dedupes by run_id", async () => {
    const id = "EXP-20260628-dedupe";
    await registerExperiment(tmpDir, id);

    const run = { run_id: "run-1", date: "2026-06-28", edition: "skills" };
    await appendShadowRun(tmpDir, id, run);
    await appendShadowRun(tmpDir, id, run);

    const record = await loadExperiment(tmpDir, id);
    expect(record.shadow_runs).toHaveLength(1);
    expect(record.shadow_runs[0]).toEqual(run);
  });

  it("rejects invalid experiment ids", () => {
    expect(() => experimentFilePath(tmpDir, "bad-id")).toThrow(/Invalid experiment id/);
  });
});
