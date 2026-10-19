import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadExperimentsFile,
  type LabExperimentEntry,
  type LabExperimentStatus,
} from "./validate-experiments.js";

const DEFAULT_HOST = "https://us.posthog.com";
const DEFAULT_PROJECT = "489599";

export interface PostHogExperimentRow {
  id: number;
  name: string;
  feature_flag_key: string | null;
  start_date: string | null;
  end_date: string | null;
  archived: boolean;
  exposure?: number | null;
  sample_size?: number | null;
  metrics?: Array<{
    metric_type?: string;
    name?: string;
    delta?: number | null;
    significant?: boolean;
  }> | null;
  [key: string]: unknown;
}

export interface PostHogLiveSnapshot {
  exposure_count?: number | null;
  sample_count?: number | null;
  metric_delta?: number | null;
  metric_delta_label?: string | null;
}

export interface ExperimentStatusDiscrepancy {
  experiment_id: string;
  field: "start" | "end" | "status";
  expected: string | null;
  posthog: string | null;
  message: string;
}

export interface ExperimentStatusFile {
  schema_version: 1;
  generated_at: string;
  project_id: string;
  posthog_host: string;
  skipped: boolean;
  skip_reason?: string;
  discrepancies: ExperimentStatusDiscrepancy[];
  posthog_experiments: PostHogExperimentRow[];
  matched: Array<{
    experiment_id: string;
    posthog_experiment_id: number | null;
    posthog_flag_key: string | null;
  }>;
  live: Record<string, PostHogLiveSnapshot>;
}

function mapPostHogArchivedToStatus(archived: boolean, endDate: string | null): LabExperimentStatus {
  if (archived) return "done";
  if (endDate) {
    const today = new Date().toISOString().slice(0, 10);
    if (endDate < today) return "done";
  }
  return "running";
}

export function matchPostHogExperiment(
  entry: LabExperimentEntry,
  rows: PostHogExperimentRow[],
): PostHogExperimentRow | undefined {
  const key = entry.posthog_flag?.trim() || entry.experiment_key?.trim() || entry.id;
  return rows.find(
    (r) =>
      r.feature_flag_key === key ||
      r.name === key ||
      r.name === entry.id ||
      r.feature_flag_key === entry.id,
  );
}

export function compareExperimentToPostHog(
  entry: LabExperimentEntry,
  row: PostHogExperimentRow,
): ExperimentStatusDiscrepancy[] {
  const out: ExperimentStatusDiscrepancy[] = [];
  const phStart = row.start_date?.slice(0, 10) ?? null;
  const phEnd = row.end_date?.slice(0, 10) ?? null;

  if (entry.start !== null && phStart !== null && entry.start !== phStart) {
    out.push({
      experiment_id: entry.id,
      field: "start",
      expected: entry.start,
      posthog: phStart,
      message: `start mismatch for ${entry.id}: repo ${entry.start} vs PostHog ${phStart}`,
    });
  }
  if (entry.end !== null && phEnd !== null && entry.end !== phEnd) {
    out.push({
      experiment_id: entry.id,
      field: "end",
      expected: entry.end,
      posthog: phEnd,
      message: `end mismatch for ${entry.id}: repo ${entry.end} vs PostHog ${phEnd}`,
    });
  }

  const phStatus = mapPostHogArchivedToStatus(row.archived, phEnd);
  if (entry.status !== "planned" && phStatus !== entry.status && row.start_date) {
    out.push({
      experiment_id: entry.id,
      field: "status",
      expected: entry.status,
      posthog: phStatus,
      message: `status mismatch for ${entry.id}: repo ${entry.status} vs PostHog-derived ${phStatus}`,
    });
  }

  return out;
}

export async function fetchPostHogExperiments(
  apiKey: string,
  projectId: string,
  host: string,
): Promise<PostHogExperimentRow[]> {
  const url = `${host.replace(/\/$/, "")}/api/projects/${projectId}/experiments/?limit=100`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PostHog experiments API ${res.status}: ${body.slice(0, 400)}`);
  }
  const data = (await res.json()) as { results?: PostHogExperimentRow[] };
  return data.results ?? [];
}

export async function syncPostHogExperimentStatus(repoRoot: string): Promise<ExperimentStatusFile> {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY?.trim();
  const host = process.env.POSTHOG_HOST?.trim() || DEFAULT_HOST;
  const projectId = process.env.POSTHOG_PROJECT_ID?.trim() || DEFAULT_PROJECT;

  const base: ExperimentStatusFile = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    project_id: projectId,
    posthog_host: host,
    skipped: false,
    discrepancies: [],
    posthog_experiments: [],
    matched: [],
    live: {},
  };

  if (!apiKey) {
    return {
      ...base,
      skipped: true,
      skip_reason: "POSTHOG_PERSONAL_API_KEY not set",
    };
  }

  const file = loadExperimentsFile(repoRoot);
  const rows = await fetchPostHogExperiments(apiKey, projectId, host);
  base.posthog_experiments = rows;

  for (const entry of file.experiments) {
    if (!entry.posthog_flag && !entry.experiment_key) continue;
    const row = matchPostHogExperiment(entry, rows);
    base.matched.push({
      experiment_id: entry.id,
      posthog_experiment_id: row?.id ?? null,
      posthog_flag_key: row?.feature_flag_key ?? null,
    });
    if (!row) continue;
    base.discrepancies.push(...compareExperimentToPostHog(entry, row));
    if (entry.status === "running") {
      const metric = row.metrics?.find((m) => m.delta != null) ?? row.metrics?.[0];
      base.live[entry.id] = {
        exposure_count: row.exposure ?? null,
        sample_count: row.sample_size ?? null,
        metric_delta: metric?.delta ?? null,
        metric_delta_label: metric?.name ?? metric?.metric_type ?? null,
      };
    }
  }

  return base;
}

export function extractLiveSnapshot(row: PostHogExperimentRow): PostHogLiveSnapshot {
  const metric = row.metrics?.find((m) => m.delta != null) ?? row.metrics?.[0];
  return {
    exposure_count: row.exposure ?? null,
    sample_count: row.sample_size ?? null,
    metric_delta: metric?.delta ?? null,
    metric_delta_label: metric?.name ?? metric?.metric_type ?? null,
  };
}

async function main(): Promise<void> {
  const repoRoot = path.resolve(path.dirname(process.argv[1]), "../..");
  const outPath = path.join(repoRoot, "lab", "experiment-status.json");
  const status = await syncPostHogExperimentStatus(repoRoot);
  fs.writeFileSync(outPath, `${JSON.stringify(status, null, 2)}\n`, "utf8");

  if (status.skipped) {
    console.log(`PostHog sync skipped: ${status.skip_reason}`);
    return;
  }

  if (status.discrepancies.length > 0) {
    for (const d of status.discrepancies) {
      console.error(d.message);
    }
    process.exit(1);
  }
  console.log(`PostHog sync OK (${status.matched.length} matched, 0 discrepancies)`);
}

const isSyncCli =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isSyncCli) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
