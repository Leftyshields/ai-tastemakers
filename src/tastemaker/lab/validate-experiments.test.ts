import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { listArchivedExperimentIds, listExperimentIds } from "../experiments/load.js";
import {
  validateExperimentsFile,
  validateSuccessBlock,
  inclusiveDaySpan,
  type LabExperimentsFile,
  type LabExperimentEntry,
} from "../../../scripts/lab/validate-experiments.js";
import { buildLabPublicFile } from "../../../scripts/lab/build-lab-public.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const planPath = path.join(repoRoot, "lab", "experiments.json");

describe("lab/experiments.json", () => {
  const raw = fs.readFileSync(planPath, "utf8");
  const plan = JSON.parse(raw) as LabExperimentsFile;
  const tasks = plan.experiments;

  it("covers every active and archived experiment registry id", async () => {
    const registryIds = [...(await listExperimentIds(repoRoot)), ...(await listArchivedExperimentIds(repoRoot))].sort();
    const covered = new Set(tasks.map((t) => t.id));
    covered.delete("POLICY-DIGEST-UI-FREEZE");
    for (const id of registryIds) {
      expect(covered.has(id), `missing calendar tasks for ${id}`).toBe(true);
    }
  });

  it("uses allowed status values and ISO date windows", () => {
    const allowed = new Set(["done", "running", "planned"]);
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    for (const task of tasks) {
      expect(task.id.length).toBeGreaterThan(0);
      expect(task.label.length).toBeGreaterThan(0);
      if (task.start) expect(iso.test(task.start)).toBe(true);
      if (task.end) expect(iso.test(task.end)).toBe(true);
      if (task.status) {
        expect(allowed.has(task.status)).toBe(true);
      }
    }
  });

  it("resolves depends_on links to existing task ids", () => {
    const ids = new Set(tasks.map((t) => t.id));
    for (const task of tasks) {
      for (const dep of task.depends_on) {
        expect(ids.has(dep), `${task.id} depends on missing ${dep}`).toBe(true);
      }
    }
  });

  it("passes validation with no overlaps", () => {
    expect(validateExperimentsFile(plan)).toEqual([]);
  });

  it("builds public file with full experiment registry", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    expect(pub.experiments.length).toBe(tasks.length);
    expect(pub.backlog.some((b) => b.id === "EXP-20260913-rank-bootstrap-skills")).toBe(true);
  });
});

describe("inclusiveDaySpan", () => {
  it("counts inclusive calendar days", () => {
    expect(inclusiveDaySpan("2026-11-01", "2026-11-08")).toBe(8);
  });
});

describe("validateSuccessBlock", () => {
  const base: LabExperimentEntry = {
    id: "EXP-test",
    label: "Test",
    surface: "narration_skills",
    metric: "m",
    start: "2026-01-01",
    end: "2026-01-07",
    min_read_days: 7,
    depends_on: [],
    status: "planned",
    success: {
      success_criteria: "Ship it.",
      metric: {
        posthog: "event:outbound_repo_click?edition=skills",
        direction: "increase",
        baseline: 1,
        target: 2,
        pass_threshold: "≥10% lift",
      },
    },
  };

  it("flags missing posthog ref", () => {
    const issues = validateSuccessBlock({
      ...base,
      success: {
        success_criteria: "x",
        metric: {
          posthog: "",
          direction: "increase",
          baseline: null,
          target: 1,
          pass_threshold: "p",
        },
      },
    });
    expect(issues.some((i) => i.code === "success")).toBe(true);
  });
});
