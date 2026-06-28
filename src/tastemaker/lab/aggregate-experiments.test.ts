import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { loadAllExperiments, writeExperimentsData } from "../../../scripts/lab/aggregate-experiments.js";

describe("aggregate-experiments", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "lab-exp-"));
    const expDir = path.join(tmpDir, "data", "experiments");
    await fs.mkdir(expDir, { recursive: true });
    await fs.writeFile(
      path.join(expDir, "EXP-20260628-test.json"),
      JSON.stringify({
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
      }),
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

  it("writeExperimentsData writes site/lab/experiments-data.json", async () => {
    const labDir = path.join(tmpDir, "site", "lab");
    const count = await writeExperimentsData(tmpDir, labDir);
    expect(count).toBe(1);
    const raw = JSON.parse(await fs.readFile(path.join(labDir, "experiments-data.json"), "utf-8"));
    expect(raw.schema_version).toBe(1);
    expect(raw.experiments[0].hypothesis).toBe("test hypothesis");
  });
});
