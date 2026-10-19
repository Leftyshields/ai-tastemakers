import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type LabSurface = "digest_ui" | "narration_oss" | "narration_skills" | "email";

export type LabExperimentStatus = "planned" | "running" | "done";

export interface LabExperimentEntry {
  id: string;
  surface: LabSurface | LabSurface[];
  metric: string;
  start: string | null;
  end: string | null;
  min_read_days: number;
  depends_on: string[];
  status: LabExperimentStatus;
  experiment_key?: string | null;
  posthog_flag?: string | null;
  note?: string | null;
}

export interface LabExperimentsFile {
  schema_version: number;
  experiments: LabExperimentEntry[];
}

export interface ValidationIssue {
  code: "overlap" | "depends_order" | "min_read_days" | "schema";
  message: string;
  experiment_ids?: string[];
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SURFACES: LabSurface[] = ["digest_ui", "narration_oss", "narration_skills", "email"];
const STATUSES: LabExperimentStatus[] = ["planned", "running", "done"];

export function parseIsoDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function inclusiveDaySpan(start: string, end: string): number {
  const a = parseIsoDate(start).getTime();
  const b = parseIsoDate(end).getTime();
  if (b < a) return 0;
  return Math.floor((b - a) / 86_400_000) + 1;
}

export function surfacesOf(entry: LabExperimentEntry): LabSurface[] {
  return Array.isArray(entry.surface) ? entry.surface : [entry.surface];
}

export function intervalsOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart <= bEnd && bStart <= aEnd;
}

export function validateExperimentsFile(file: LabExperimentsFile): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const byId = new Map<string, LabExperimentEntry>();

  for (const exp of file.experiments) {
    if (byId.has(exp.id)) {
      issues.push({
        code: "schema",
        message: `Duplicate experiment id '${exp.id}'.`,
        experiment_ids: [exp.id],
      });
    }
    byId.set(exp.id, exp);

    const surf = surfacesOf(exp);
    for (const s of surf) {
      if (!SURFACES.includes(s)) {
        issues.push({
          code: "schema",
          message: `Invalid surface '${s}' on '${exp.id}'.`,
          experiment_ids: [exp.id],
        });
      }
    }
    if (!STATUSES.includes(exp.status)) {
      issues.push({
        code: "schema",
        message: `Invalid status '${exp.status}' on '${exp.id}'.`,
        experiment_ids: [exp.id],
      });
    }
    if (exp.start !== null && !ISO_DATE.test(exp.start)) {
      issues.push({
        code: "schema",
        message: `Invalid start date on '${exp.id}'.`,
        experiment_ids: [exp.id],
      });
    }
    if (exp.end !== null && !ISO_DATE.test(exp.end)) {
      issues.push({
        code: "schema",
        message: `Invalid end date on '${exp.id}'.`,
        experiment_ids: [exp.id],
      });
    }
    if (exp.start !== null && exp.end !== null) {
      if (parseIsoDate(exp.end) < parseIsoDate(exp.start)) {
        issues.push({
          code: "schema",
          message: `end before start on '${exp.id}'.`,
          experiment_ids: [exp.id],
        });
      } else {
        const span = inclusiveDaySpan(exp.start, exp.end);
        if (span < exp.min_read_days) {
          issues.push({
            code: "min_read_days",
            message: `'${exp.id}' span ${span} day(s) is less than min_read_days ${exp.min_read_days}.`,
            experiment_ids: [exp.id],
          });
        }
      }
    }
  }

  for (const exp of file.experiments) {
    for (const depId of exp.depends_on) {
      const dep = byId.get(depId);
      if (!dep) {
        issues.push({
          code: "depends_order",
          message: `'${exp.id}' depends_on missing id '${depId}'.`,
          experiment_ids: [exp.id, depId],
        });
        continue;
      }
      if (dep.end === null || exp.start === null) {
        continue;
      }
      if (dep.end >= exp.start) {
        issues.push({
          code: "depends_order",
          message: `'${exp.id}' starts ${exp.start} before dependency '${depId}' ended ${dep.end}.`,
          experiment_ids: [exp.id, depId],
        });
      }
    }
  }

  const dated = file.experiments.filter((e) => e.start !== null && e.end !== null);
  for (let i = 0; i < dated.length; i++) {
    for (let j = i + 1; j < dated.length; j++) {
      const a = dated[i];
      const b = dated[j];
      const shared = surfacesOf(a).filter((s) => surfacesOf(b).includes(s));
      if (shared.length === 0) continue;
      if (intervalsOverlap(a.start!, a.end!, b.start!, b.end!)) {
        issues.push({
          code: "overlap",
          message: `Overlap on ${shared.join(", ")} between '${a.id}' (${a.start} to ${a.end}) and '${b.id}' (${b.start} to ${b.end}).`,
          experiment_ids: [a.id, b.id],
        });
      }
    }
  }

  return issues;
}

export function loadExperimentsFile(repoRoot: string): LabExperimentsFile {
  const filePath = path.join(repoRoot, "lab", "experiments.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as LabExperimentsFile;
}

export function filterPublicExperiments(file: LabExperimentsFile): LabExperimentsFile {
  return {
    schema_version: file.schema_version,
    experiments: file.experiments.filter((e) => e.status === "running" || e.status === "done"),
  };
}

export function assertExperimentsValid(repoRoot: string): ValidationIssue[] {
  const file = loadExperimentsFile(repoRoot);
  return validateExperimentsFile(file);
}

export function writePublicExperiments(repoRoot: string, siteLabDir: string): void {
  const file = loadExperimentsFile(repoRoot);
  const issues = validateExperimentsFile(file);
  if (issues.length > 0) {
    const summary = issues.map((i) => i.message).join("\n");
    throw new Error(`lab/experiments.json validation failed:\n${summary}`);
  }
  const pub = filterPublicExperiments(file);
  fs.mkdirSync(siteLabDir, { recursive: true });
  fs.writeFileSync(
    path.join(siteLabDir, "experiments.public.json"),
    `${JSON.stringify(pub, null, 2)}\n`,
    "utf8",
  );
}

const isValidateCli =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isValidateCli) {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const issues = assertExperimentsValid(repoRoot);
  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(issue.message);
    }
    process.exit(1);
  }
  console.log(`lab/experiments.json OK (${loadExperimentsFile(repoRoot).experiments.length} entries)`);
}
