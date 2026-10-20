import type {
  LabExperimentEntry,
  LabExperimentStatus,
  LabSuccess,
  LabSurface,
} from "./validate-experiments.js";
import type { DailyMetricPoint } from "./posthog-metric.js";
import type { LabTrackStatus } from "./lab-metric-progress.js";
export type LabVerdict = "ship" | "revert" | "inconclusive";

export interface PublicTimelineItem {
  id: string;
  label: string;
  status: LabExperimentStatus;
  start: string;
  end: string;
  surfaces: LabSurface[];
  offset_pct: number;
  width_pct: number;
  offset_pct_full: number;
  width_pct_full: number;
  kind: "experiment" | "collapsed";
  collapsed_count?: number;
  hidden_until_show_all?: boolean;
}

export interface PublicTimelineModel {
  range_start: string;
  range_end: string;
  full_range_start: string;
  today_iso: string;
  today_offset_pct: number | null;
  today_offset_pct_full: number | null;
  month_ticks: { label: string; offset_pct: number; current: boolean }[];
  month_ticks_full: { label: string; offset_pct: number; current: boolean }[];
  freeze: {
    start: string;
    end: string;
    offset_pct: number;
    width_pct: number;
    offset_pct_full: number;
    width_pct_full: number;
  } | null;
  items: PublicTimelineItem[];
  collapsed_count: number;
}

export interface PublicControlPanelSummary {
  testing: { hypothesis: string } | null;
  next_up: { label: string; start: string } | null;
  last_result: { id: string; label: string; verdict: LabVerdict } | null;
}

export interface PostHogEndSnapshot {
  captured_at?: string | null;
  exposure_count?: number | null;
  sample_count?: number | null;
  metric_delta?: number | null;
  metric_delta_label?: string | null;
  raw?: Record<string, unknown>;
}

export interface LabExperimentSource extends LabExperimentEntry {
  label: string;
  result_summary?: string | null;
  verdict?: LabVerdict | null;
  posthog_snapshot_at_end?: PostHogEndSnapshot | null;
}

export interface PublicControlPanelRunning {
  id: string;
  label: string;
  surface: LabSurface | LabSurface[];
  metric: string;
  success: LabSuccess;
  start: string | null;
  end: string | null;
  day_of_min_read: number | null;
  min_read_days: number;
  exposure_count: number | null;
  sample_count: number | null;
  metric_delta: number | null;
  metric_delta_label: string | null;
  metric_current: number | null;
  metric_daily: DailyMetricPoint[];
  metric_baseline: number;
  metric_target: number;
  metric_direction: "increase" | "decrease";
  progress_pct: number | null;
  track_status: LabTrackStatus | null;
}

export interface PublicBacklogItem {
  id: string;
  label: string;
  surface: LabSurface | LabSurface[];
  metric: string;
  start: string | null;
  end: string | null;
  min_read_days: number;
  depends_on: string[];
  experiment_key?: string | null;
  posthog_flag?: string | null;
  note?: string | null;
  target_month: string | null;
}

export interface PublicHistoryItem {
  id: string;
  label: string;
  surface: LabSurface | LabSurface[];
  start: string | null;
  end: string | null;
  metric: string;
  result_summary: string | null;
  verdict: LabVerdict | null;
  posthog_snapshot_at_end: PostHogEndSnapshot | null;
}

export interface LabExperimentsPublicFile {
  schema_version: 2;
  generated_at: string;
  status_sync: {
    generated_at: string | null;
    skipped: boolean;
    skip_reason?: string | null;
  };
  experiments: LabExperimentSource[];
  control_panel: {
    running: PublicControlPanelRunning | null;
    summary: PublicControlPanelSummary;
  };
  timeline: PublicTimelineModel | null;
  backlog: PublicBacklogItem[];
  history: PublicHistoryItem[];
  /** Experiment ids with a built write up under briefings/lab/posts/*.md */
  writeup_post_ids: string[];
}
