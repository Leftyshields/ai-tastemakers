import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type LabSurface = "digest_ui" | "narration_oss" | "narration_skills" | "email";

export type LabExperimentStatus = "planned" | "running" | "done";
export type LabVerdict = "ship" | "revert" | "inconclusive";
export type LabMetricDirection = "increase" | "decrease";
export type LabMetricType = "editorial" | "posthog";

export interface LabSuccessMetric {
  posthog: string;
  direction: LabMetricDirection;
  baseline: number | null;
  target: number;
  pass_threshold: string;
  metric_type: LabMetricType;
  /** Human series label shown in UI (never raw PostHog event strings). */
  metric_label: string;
}

export interface LabSuccess {
  success_criteria: string;
  metric: LabSuccessMetric;
  guessed?: boolean;
}

export interface PostHogEndSnapshot {
  captured_at?: string | null;
  exposure_count?: number | null;
  sample_count?: number | null;
  metric_delta?: number | null;
  metric_delta_label?: string | null;
  raw?: Record<string, unknown>;
}

export interface LabExperimentEntry {
  id: string;
  label: string;
  /** Plain language hypothesis for the control panel (max 120 chars). */
  short_hypothesis: string;
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
  result_summary?: string | null;
  verdict?: LabVerdict | null;
  posthog_snapshot_at_end?: PostHogEndSnapshot | null;
  success: LabSuccess;
}

export interface LabExperimentsFile {
  schema_version: number;
  experiments: LabExperimentEntry[];
}

export interface ValidationIssue {
  code: "overlap" | "depends_order" | "min_read_days" | "schema" | "success";
  message: string;
  experiment_ids?: string[];
}

const METRIC_DIRECTIONS: LabMetricDirection[] = ["increase", "decrease"];

export function validateSuccessBlock(exp: LabExperimentEntry): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const success = exp.success;
  if (!success || typeof success !== "object") {
    issues.push({
      code: "success",
      message: `Missing success object on '${exp.id}'.`,
      experiment_ids: [exp.id],
    });
    return issues;
  }
  if (!success.success_criteria?.trim()) {
    issues.push({
      code: "success",
      message: `Missing success.success_criteria on '${exp.id}'.`,
      experiment_ids: [exp.id],
    });
  }
  const m = success.metric;
  if (!m || typeof m !== "object") {
    issues.push({
      code: "success",
      message: `Missing success.metric on '${exp.id}'.`,
      experiment_ids: [exp.id],
    });
    return issues;
  }
  if (!m.posthog?.trim()) {
    issues.push({
      code: "success",
      message: `Missing success.metric.posthog on '${exp.id}'.`,
      experiment_ids: [exp.id],
    });
  }
  if (!METRIC_DIRECTIONS.includes(m.direction)) {
    issues.push({
      code: "success",
      message: `Invalid success.metric.direction on '${exp.id}' (use increase or decrease).`,
      experiment_ids: [exp.id],
    });
  }
  if (m.target == null || !Number.isFinite(Number(m.target))) {
    issues.push({
      code: "success",
      message: `Missing or invalid success.metric.target on '${exp.id}'.`,
      experiment_ids: [exp.id],
    });
  }
  if (m.baseline != null && !Number.isFinite(Number(m.baseline))) {
    issues.push({
      code: "success",
      message: `Invalid success.metric.baseline on '${exp.id}'.`,
      experiment_ids: [exp.id],
    });
  }
  if (!m.pass_threshold?.trim()) {
    issues.push({
      code: "success",
      message: `Missing success.metric.pass_threshold on '${exp.id}'.`,
      experiment_ids: [exp.id],
    });
  }
  if (m.metric_type !== "editorial" && m.metric_type !== "posthog") {
    issues.push({
      code: "success",
      message: `Missing or invalid success.metric.metric_type on '${exp.id}' (use editorial or posthog).`,
      experiment_ids: [exp.id],
    });
  }
  if (!m.metric_label?.trim()) {
    issues.push({
      code: "success",
      message: `Missing success.metric.metric_label on '${exp.id}'.`,
      experiment_ids: [exp.id],
    });
  }
  return issues;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SURFACES: LabSurface[] = ["digest_ui", "narration_oss", "narration_skills", "email"];
const STATUSES: LabExperimentStatus[] = ["planned", "running", "done"];
const VERDICTS: LabVerdict[] = ["ship", "revert", "inconclusive"];

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
    if (!exp.label?.trim()) {
      issues.push({
        code: "schema",
        message: `Missing label on '${exp.id}'.`,
        experiment_ids: [exp.id],
      });
    }
    if (!exp.short_hypothesis?.trim()) {
      issues.push({
        code: "schema",
        message: `Missing short_hypothesis on '${exp.id}'.`,
        experiment_ids: [exp.id],
      });
    } else if (exp.short_hypothesis.length > 120) {
      issues.push({
        code: "schema",
        message: `short_hypothesis on '${exp.id}' exceeds 120 characters.`,
        experiment_ids: [exp.id],
      });
    }
    issues.push(...validateSuccessBlock(exp));

    if (exp.verdict != null && !VERDICTS.includes(exp.verdict)) {
      issues.push({
        code: "schema",
        message: `Invalid verdict '${exp.verdict}' on '${exp.id}'.`,
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

export function assertExperimentsValid(repoRoot: string): ValidationIssue[] {
  const file = loadExperimentsFile(repoRoot);
  return validateExperimentsFile(file);
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
