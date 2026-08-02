import fs from "node:fs/promises";
import path from "node:path";
import { listExperimentIds, loadExperiment } from "../../src/tastemaker/experiments/load.js";
import type { ExperimentRecord } from "../../src/tastemaker/experiments/types.js";

export interface ExperimentsDataFile {
  schema_version: 1;
  generated_at: string;
  queue_summary: string;
  experiments: ExperimentRecord[];
}

const STATUS_ORDER: Record<string, number> = {
  active: 0,
  baseline: 1,
  draft: 2,
  complete: 3,
};

/** Active queue first; ponytail experiment leads when statuses tie. */
export function sortExperimentsForDashboard(experiments: ExperimentRecord[]): ExperimentRecord[] {
  return [...experiments].sort((a, b) => {
    const sa = STATUS_ORDER[a.status] ?? 99;
    const sb = STATUS_ORDER[b.status] ?? 99;
    if (sa !== sb) return sa - sb;
    if (a.id === "EXP-20260802-ponytail-narration-skills") return -1;
    if (b.id === "EXP-20260802-ponytail-narration-skills") return 1;
    return a.id.localeCompare(b.id);
  });
}

export function buildQueueSummary(experiments: ExperimentRecord[]): string {
  const active = experiments.find((e) => e.status === "active" || e.status === "baseline");
  if (active?.status === "baseline") {
    const w = windowLabel(active.baseline_window?.start, active.baseline_window?.end);
    return `#1 in queue: ${active.id} — baseline window ${w} (control config; functional metrics on Token dashboard).`;
  }
  if (active?.status === "active") {
    const w = windowLabel(active.treatment_window?.start, active.treatment_window?.end);
    return `#1 in queue: ${active.id} — treatment window ${w}.`;
  }
  const draft = experiments.find((e) => e.status === "draft");
  if (draft) {
    return `Next up: ${draft.id} (${draft.status}). No experiment window running.`;
  }
  return "No active experiment windows. See completed runs below.";
}

function windowLabel(start?: string, end?: string): string {
  if (!start && !end) return "—";
  if (start && end) return `${start} → ${end}`;
  return start || end || "—";
}

export async function loadAllExperiments(repoRoot: string): Promise<ExperimentRecord[]> {
  const ids = await listExperimentIds(repoRoot);
  const experiments: ExperimentRecord[] = [];
  for (const id of ids) {
    experiments.push(await loadExperiment(repoRoot, id));
  }
  return sortExperimentsForDashboard(experiments);
}

export async function writeExperimentsData(
  repoRoot: string,
  siteLabDir: string,
): Promise<number> {
  const experiments = await loadAllExperiments(repoRoot);
  const payload: ExperimentsDataFile = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    queue_summary: buildQueueSummary(experiments),
    experiments,
  };
  await fs.mkdir(siteLabDir, { recursive: true });
  await fs.writeFile(
    path.join(siteLabDir, "experiments-data.json"),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8",
  );
  return experiments.length;
}
