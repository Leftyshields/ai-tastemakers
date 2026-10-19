import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  validateExperimentsFile,
  filterPublicExperiments,
  inclusiveDaySpan,
  type LabExperimentsFile,
} from "../../../scripts/lab/validate-experiments.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("validateExperimentsFile", () => {
  it("accepts lab/experiments.json", () => {
    const raw = fs.readFileSync(path.join(repoRoot, "lab", "experiments.json"), "utf8");
    const file = JSON.parse(raw) as LabExperimentsFile;
    expect(validateExperimentsFile(file)).toEqual([]);
  });

  it("detects surface overlap", () => {
    const file: LabExperimentsFile = {
      schema_version: 1,
      experiments: [
        {
          id: "a",
          surface: "narration_skills",
          metric: "m",
          start: "2026-01-01",
          end: "2026-01-10",
          min_read_days: 1,
          depends_on: [],
          status: "running",
        },
        {
          id: "b",
          surface: "narration_skills",
          metric: "m",
          start: "2026-01-05",
          end: "2026-01-15",
          min_read_days: 1,
          depends_on: [],
          status: "planned",
        },
      ],
    };
    const issues = validateExperimentsFile(file);
    expect(issues.some((i) => i.code === "overlap")).toBe(true);
  });

  it("detects depends_on order violations", () => {
    const file: LabExperimentsFile = {
      schema_version: 1,
      experiments: [
        {
          id: "dep",
          surface: "digest_ui",
          metric: "m",
          start: "2026-01-01",
          end: "2026-01-20",
          min_read_days: 1,
          depends_on: [],
          status: "done",
        },
        {
          id: "child",
          surface: "digest_ui",
          metric: "m",
          start: "2026-01-15",
          end: "2026-01-25",
          min_read_days: 1,
          depends_on: ["dep"],
          status: "planned",
        },
      ],
    };
    expect(validateExperimentsFile(file).some((i) => i.code === "depends_order")).toBe(true);
  });

  it("detects min_read_days violations", () => {
    const file: LabExperimentsFile = {
      schema_version: 1,
      experiments: [
        {
          id: "short",
          surface: "email",
          metric: "m",
          start: "2026-01-01",
          end: "2026-01-05",
          min_read_days: 10,
          depends_on: [],
          status: "planned",
        },
      ],
    };
    expect(validateExperimentsFile(file).some((i) => i.code === "min_read_days")).toBe(true);
  });
});

describe("filterPublicExperiments", () => {
  it("drops planned entries", () => {
    const raw = fs.readFileSync(path.join(repoRoot, "lab", "experiments.json"), "utf8");
    const file = JSON.parse(raw) as LabExperimentsFile;
    const pub = filterPublicExperiments(file);
    expect(pub.experiments.every((e) => e.status === "running" || e.status === "done")).toBe(true);
    expect(pub.experiments.some((e) => e.id === "EXP-20260913-caveman-compress-skills")).toBe(false);
  });
});

describe("inclusiveDaySpan", () => {
  it("counts inclusive calendar days", () => {
    expect(inclusiveDaySpan("2026-11-01", "2026-11-08")).toBe(8);
  });
});
