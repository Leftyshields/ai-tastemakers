import fs from "node:fs/promises";
import path from "node:path";
import {
  listArchivedExperimentIds,
  listExperimentIds,
  loadArchivedExperiment,
  loadExperiment,
} from "../../src/tastemaker/experiments/load.js";
import type {
  ExperimentEdition,
  ExperimentRecord,
  ExperimentStatus,
} from "../../src/tastemaker/experiments/types.js";

export interface ExperimentDashboardItem extends ExperimentRecord {
  title: string;
  reader_summary: string;
  outcome_line: string;
  status_label: string;
  edition_label: string;
  archived: boolean;
  writeup_href: string | null;
}

export interface ExperimentsDataFile {
  schema_version: 1;
  generated_at: string;
  queue_summary: string;
  experiments: ExperimentDashboardItem[];
}

const STATUS_ORDER: Record<string, number> = {
  active: 0,
  baseline: 1,
  draft: 2,
  complete: 3,
};

export function displayTitle(record: ExperimentRecord): string {
  const named = record.title?.trim();
  if (named) return named;
  const slug = record.id.replace(/^EXP-\d{8}-/, "").replace(/-/g, " ");
  if (!slug) return record.id;
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function editionLabel(edition: ExperimentEdition): string {
  if (edition === "skills") return "Skills digest";
  if (edition === "oss") return "OSS digest";
  return "Site · both editions";
}

export function statusLabel(
  status: ExperimentStatus,
  keepChange: boolean | null,
  archived: boolean,
): string {
  if (status === "baseline") return "Measuring before";
  if (status === "active") return "Measuring after";
  if (status === "draft") return "On hold";
  if (status === "complete") {
    if (archived && keepChange === true) return "Shipped";
    if (keepChange === true) return "Kept";
    if (keepChange === false) return "Reverted";
    return "Finished";
  }
  return status;
}

export function readerSummary(record: ExperimentRecord): string {
  return record.reader_summary?.trim() || record.change_summary;
}

export function outcomeLine(record: ExperimentRecord, archived: boolean): string {
  const named = record.outcome_line?.trim();
  if (named) return named;
  if (record.status === "draft") {
    return "Waiting until the current test finishes.";
  }
  if (record.status === "baseline") {
    return "Collecting the before picture. The change is still off.";
  }
  if (record.status === "active") {
    return "The change is on. Measuring the after picture.";
  }
  if (archived && record.keep_change === true) {
    return "Shipped to the live site without a full before/after measurement.";
  }
  if (record.keep_change === true) return "We kept this change.";
  if (record.keep_change === false) return "We reverted this change.";
  return "";
}

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
    return `We're collecting the before picture for ${displayTitle(active)} (${w}). The change is still off. Cost and quality live on the Token dashboard.`;
  }
  if (active?.status === "active") {
    const start = active.treatment_window?.start || "—";
    const end = active.treatment_window?.end || "—";
    return `We're testing ${displayTitle(active)}. The change is on for Skills digests from ${start} through ${end}. Watch cost and writing quality on the Token dashboard.`;
  }
  const draft = experiments.find((e) => e.status === "draft");
  if (draft) {
    return `Next up: ${displayTitle(draft)}. Nothing is in a measurement window right now.`;
  }
  return "No live measurement window. Completed and shipped work is listed below.";
}

function windowLabel(start?: string, end?: string): string {
  if (!start && !end) return "—";
  if (start && end) return `${start} → ${end}`;
  return start || end || "—";
}

async function writeupHref(repoRoot: string, id: string): Promise<string | null> {
  const mdPath = path.join(repoRoot, "briefings", "lab", "posts", `${id}.md`);
  try {
    await fs.access(mdPath);
    return `posts/${id}.html`;
  } catch {
    return null;
  }
}

export async function toDashboardItem(
  repoRoot: string,
  record: ExperimentRecord,
  archived: boolean,
): Promise<ExperimentDashboardItem> {
  return {
    ...record,
    title: displayTitle(record),
    reader_summary: readerSummary(record),
    outcome_line: outcomeLine(record, archived),
    status_label: statusLabel(record.status, record.keep_change, archived),
    edition_label: editionLabel(record.edition),
    archived,
    writeup_href: await writeupHref(repoRoot, record.id),
  };
}

/** Active Lab queue only — used by token aggregation. */
export async function loadAllExperiments(repoRoot: string): Promise<ExperimentRecord[]> {
  const ids = await listExperimentIds(repoRoot);
  const experiments: ExperimentRecord[] = [];
  for (const id of ids) {
    experiments.push(await loadExperiment(repoRoot, id));
  }
  return sortExperimentsForDashboard(experiments);
}

export async function loadDashboardExperiments(repoRoot: string): Promise<ExperimentDashboardItem[]> {
  const items: ExperimentDashboardItem[] = [];
  for (const id of await listExperimentIds(repoRoot)) {
    items.push(await toDashboardItem(repoRoot, await loadExperiment(repoRoot, id), false));
  }
  for (const id of await listArchivedExperimentIds(repoRoot)) {
    items.push(await toDashboardItem(repoRoot, await loadArchivedExperiment(repoRoot, id), true));
  }
  return items.sort((a, b) => {
    const sa = STATUS_ORDER[a.status] ?? 99;
    const sb = STATUS_ORDER[b.status] ?? 99;
    if (sa !== sb) return sa - sb;
    if (a.archived !== b.archived) return Number(a.archived) - Number(b.archived);
    const aEnd = a.treatment_window?.end || a.baseline_window?.start || a.id;
    const bEnd = b.treatment_window?.end || b.baseline_window?.start || b.id;
    return bEnd.localeCompare(aEnd) || b.id.localeCompare(a.id);
  });
}

export async function writeExperimentsData(
  repoRoot: string,
  siteLabDir: string,
): Promise<number> {
  const experiments = await loadDashboardExperiments(repoRoot);
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
