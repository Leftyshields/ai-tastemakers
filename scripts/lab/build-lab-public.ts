import fs from "node:fs";
import path from "node:path";
import {
  inclusiveDaySpan,
  loadExperimentsFile,
  type LabExperimentsFile,
  type LabExperimentStatus,
  validateExperimentsFile,
} from "./validate-experiments.js";
import type { ExperimentStatusFile } from "./sync-posthog-experiment-status.js";
import type { DailyMetricPoint } from "./posthog-metric.js";
import {
  computeTrackStatus,
  effectiveBaseline,
  metricProgressPct,
} from "./lab-metric-progress.js";
import {
  buildTimelineModel,
  type PublicTimelineModel,
  renderLabDashboardHtml,
  findForbiddenLabCopyViolations,
} from "./lab-dashboard-render.js";
import { listLabWriteupPostIds } from "./lab-format.js";
export {
  renderLabDashboardHtml,
  findForbiddenLabCopyViolations,
  buildTimelineModel,
  formatAllNullReadStatusLine,
} from "./lab-dashboard-render.js";
export type { PublicTimelineModel };

import type {
  LabExperimentSource,
  LabExperimentsPublicFile,
  PublicBacklogItem,
  PublicControlPanelSummary,
  PublicHistoryItem,
  PublicTimelineModel,
} from "./lab-public-types.js";
import { sanitizeVisibleCopy } from "./lab-format.js";

export type {
  LabVerdict,
  PostHogEndSnapshot,
  LabExperimentSource,
  LabExperimentsPublicFile,
  PublicControlPanelRunning,
  PublicBacklogItem,
  PublicHistoryItem,
  PublicTimelineModel,
  PublicTimelineItem,
} from "./lab-public-types.js";

export interface PostHogLiveSnapshot {
  exposure_count?: number | null;
  sample_count?: number | null;
  metric_delta?: number | null;
  metric_delta_label?: string | null;
  metric_posthog?: string | null;
  metric_current?: number | null;
  metric_daily?: DailyMetricPoint[];
  metric_window_sum?: number | null;
  metric_fetch_error?: string | null;
}

export interface LabExperimentsSourceFile {
  schema_version: number;
  experiments: LabExperimentSource[];
}

/** @deprecated Use PublicTimelineModel */
export type PublicTimelineGroup = PublicTimelineModel;

export function targetMonthFromStart(start: string | null): string | null {
  if (!start) return null;
  return start.slice(0, 7);
}

export function dayOfMinRead(
  start: string | null,
  asOfIsoDate: string,
): number | null {
  if (!start) return null;
  if (asOfIsoDate < start) return 0;
  return inclusiveDaySpan(start, asOfIsoDate);
}

function loadExperimentStatus(repoRoot: string): ExperimentStatusFile | null {
  const p = path.join(repoRoot, "lab", "experiment-status.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8")) as ExperimentStatusFile;
}

function liveStatsForExperiment(
  status: ExperimentStatusFile | null,
  experimentId: string,
): PostHogLiveSnapshot {
  const live = status?.live?.[experimentId];
  if (live) return live;
  const metrics = status?.metrics?.[experimentId];
  return metrics ?? {};
}

export function buildTimelineGroups(
  entries: LabExperimentSource[],
  statuses: LabExperimentStatus[],
  asOfIsoDate: string = new Date().toISOString().slice(0, 10),
): PublicTimelineModel | null {
  return buildTimelineModel(entries, statuses, asOfIsoDate);
}

export function buildControlPanelSummary(
  all: LabExperimentSource[],
): PublicControlPanelSummary {
  const running = all.find((e) => e.status === "running");
  const testing =
    running?.short_hypothesis?.trim()
      ? { hypothesis: sanitizeVisibleCopy(running.short_hypothesis.trim()) }
      : null;

  const planned = all
    .filter((e) => e.status === "planned" && e.start)
    .sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""));
  const next = planned[0];
  const next_up =
    next?.start != null
      ? { label: next.label, start: next.start }
      : null;

  const done = all
    .filter((e) => e.status === "done" && e.verdict)
    .sort((a, b) => (b.end ?? "").localeCompare(a.end ?? ""));
  const last = done[0];
  const last_result =
    last?.verdict != null
      ? { id: last.id, label: last.label, verdict: last.verdict }
      : null;

  return { testing, next_up, last_result };
}

export function buildLabPublicFile(
  repoRoot: string,
  asOfIsoDate: string = new Date().toISOString().slice(0, 10),
): LabExperimentsPublicFile {
  const source = loadExperimentsFile(repoRoot) as LabExperimentsSourceFile;
  const status = loadExperimentStatus(repoRoot);

  const all = source.experiments;
  const running = all.find((e) => e.status === "running");

  let control: PublicControlPanelRunning | null = null;
  if (running) {
    const live = liveStatsForExperiment(status, running.id);
    const daily = live.metric_daily ?? [];
    const current = live.metric_current ?? null;
    const success = running.success;
    const baseline = effectiveBaseline(success.metric, daily);
    const day = dayOfMinRead(running.start, asOfIsoDate);
    control = {
      id: running.id,
      label: running.label,
      surface: running.surface,
      metric: running.metric,
      success,
      start: running.start,
      end: running.end,
      min_read_days: running.min_read_days,
      day_of_min_read: day,
      exposure_count: live.exposure_count ?? null,
      sample_count: live.sample_count ?? null,
      metric_delta: live.metric_delta ?? null,
      metric_delta_label: live.metric_delta_label ?? null,
      metric_current: current,
      metric_daily: daily,
      metric_baseline: baseline,
      metric_target: success.metric.target,
      metric_direction: success.metric.direction,
      progress_pct: metricProgressPct(current, success.metric, baseline),
      track_status:
        current !== null && success.metric.target != null
          ? computeTrackStatus(
              current,
              success.metric,
              baseline,
              day,
              running.min_read_days,
            )
          : null,
    };
  }

  const backlog: PublicBacklogItem[] = all
    .filter((e) => e.status === "planned")
    .map((e) => ({
      id: e.id,
      label: e.label,
      surface: e.surface,
      metric: e.metric,
      start: e.start,
      end: e.end,
      min_read_days: e.min_read_days,
      depends_on: e.depends_on,
      experiment_key: e.experiment_key ?? null,
      posthog_flag: e.posthog_flag ?? null,
      note: e.note ?? null,
      target_month: targetMonthFromStart(e.start),
    }))
    .sort((a, b) => (a.target_month ?? "9999").localeCompare(b.target_month ?? "9999"));

  const history: PublicHistoryItem[] = all
    .filter((e) => e.status === "done")
    .map((e) => ({
      id: e.id,
      label: e.label,
      surface: e.surface,
      start: e.start,
      end: e.end,
      metric: e.metric,
      result_summary: e.result_summary ?? null,
      verdict: e.verdict ?? null,
      posthog_snapshot_at_end: e.posthog_snapshot_at_end ?? null,
    }))
    .sort((a, b) => (b.end ?? "").localeCompare(a.end ?? ""));

  const timeline = buildTimelineModel(all, ["running", "done", "planned"], asOfIsoDate);

  const summary = buildControlPanelSummary(all);

  return {
    schema_version: 2,
    generated_at: new Date().toISOString(),
    status_sync: {
      generated_at: status?.generated_at ?? null,
      skipped: status?.skipped ?? true,
      skip_reason: status?.skip_reason ?? "experiment-status.json missing",
    },
    experiments: all,
    control_panel: { running: control, summary },
    timeline,
    backlog,
    history,
    writeup_post_ids: listLabWriteupPostIds(repoRoot),
  };
}

export function writeLabPublicArtifacts(repoRoot: string, siteLabDir: string): LabExperimentsPublicFile {
  const source = loadExperimentsFile(repoRoot) as LabExperimentsSourceFile;
  const issues = validateExperimentsFile(source);
  if (issues.length > 0) {
    throw new Error(`lab/experiments.json validation failed:\n${issues.map((i) => i.message).join("\n")}`);
  }

  const pub = buildLabPublicFile(repoRoot);
  fs.mkdirSync(siteLabDir, { recursive: true });
  fs.writeFileSync(
    path.join(siteLabDir, "experiments.public.json"),
    `${JSON.stringify(pub, null, 2)}\n`,
    "utf8",
  );
  return pub;
}

export { formatSurfaces } from "./lab-format.js";
