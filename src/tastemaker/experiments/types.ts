export type ExperimentStatus = "draft" | "baseline" | "active" | "complete";

export type ExperimentEdition = "oss" | "skills" | "both";

export interface ExperimentWindow {
  start: string;
  end: string;
}

export interface ExperimentChangeFlags {
  DIGEST_ENRICH_WEB?: string;
  DIGEST_ENRICH_WEB_PROVIDER?: string;
  DIGEST_ENRICH_SHADOW?: string;
  [key: string]: string | undefined;
}

export interface ExperimentSnapshotMetrics {
  pageviews_by_path?: Record<string, number>;
  outbound_clicks?: Record<string, number>;
}

export interface ExperimentSnapshot {
  imported_at: string;
  period: ExperimentWindow;
  metrics: ExperimentSnapshotMetrics;
  source?: string;
}

export interface ExperimentExplainer {
  term: string;
  meaning: string;
}

export interface ExperimentShadowRun {
  run_id: string;
  date: string;
  edition: string;
}

export interface ExperimentRecord {
  schema_version: 1;
  id: string;
  /** Short public name. Falls back to a title-cased slug from the id. */
  title?: string;
  /** One sentence for the Lab dashboard card (avoid flag names). */
  reader_summary?: string;
  /** One-line public outcome for the card footer. */
  outcome_line?: string;
  /** Terms a reader will hit on this experiment; rendered on the dashboard detail. */
  reader_glossary?: ExperimentExplainer[];
  /** How we judge success, in plain language. */
  how_we_measure?: string;
  hypothesis: string;
  change_summary: string;
  status: ExperimentStatus;
  edition: ExperimentEdition;
  baseline_window: ExperimentWindow;
  treatment_window: ExperimentWindow;
  change: {
    flags: ExperimentChangeFlags;
  };
  snapshots: ExperimentSnapshot[];
  shadow_runs: ExperimentShadowRun[];
  verdict: string;
  keep_change: boolean | null;
  notes: string;
}
