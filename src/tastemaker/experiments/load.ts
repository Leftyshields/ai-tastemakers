import fs from "node:fs/promises";
import path from "node:path";
import type { ExperimentRecord, ExperimentShadowRun } from "./types.js";

const EXPERIMENT_ID = /^EXP-[0-9]{8}-[a-z0-9-]+$/;

export function experimentsDir(rootDir: string): string {
  return path.join(rootDir, "data", "experiments");
}

/** Completed/shipped records removed from the Lab dashboard queue. */
export function experimentsArchiveDir(rootDir: string): string {
  return path.join(experimentsDir(rootDir), "archive");
}

export function experimentFilePath(rootDir: string, id: string): string {
  if (!EXPERIMENT_ID.test(id)) {
    throw new Error(`Invalid experiment id: ${id} (expected EXP-YYYYMMDD-slug)`);
  }
  return path.join(experimentsDir(rootDir), `${id}.json`);
}

export async function loadExperiment(rootDir: string, id: string): Promise<ExperimentRecord> {
  const filePath = experimentFilePath(rootDir, id);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as ExperimentRecord;
}

export async function saveExperiment(rootDir: string, record: ExperimentRecord): Promise<string> {
  const filePath = experimentFilePath(rootDir, record.id);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
  return filePath;
}

export async function listExperimentIds(rootDir: string): Promise<string[]> {
  const dir = experimentsDir(rootDir);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  return entries
    .filter((name) => name.startsWith("EXP-") && name.endsWith(".json"))
    .map((name) => name.replace(/\.json$/, ""))
    .sort();
}

export async function listArchivedExperimentIds(rootDir: string): Promise<string[]> {
  const dir = experimentsArchiveDir(rootDir);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  return entries
    .filter((name) => name.startsWith("EXP-") && name.endsWith(".json"))
    .map((name) => name.replace(/\.json$/, ""))
    .sort();
}

export async function registerExperiment(
  rootDir: string,
  id: string,
  overrides: Partial<ExperimentRecord> = {},
): Promise<string> {
  const templatePath = path.join(experimentsDir(rootDir), "_template.json");
  const raw = await fs.readFile(templatePath, "utf8");
  const template = JSON.parse(raw) as ExperimentRecord;
  const record: ExperimentRecord = {
    ...template,
    ...overrides,
    id,
    schema_version: 1,
    snapshots: overrides.snapshots ?? [],
    shadow_runs: overrides.shadow_runs ?? [],
  };
  return saveExperiment(rootDir, record);
}

export async function appendShadowRun(
  rootDir: string,
  experimentId: string,
  run: ExperimentShadowRun,
): Promise<void> {
  const record = await loadExperiment(rootDir, experimentId);
  const exists = record.shadow_runs.some((r) => r.run_id === run.run_id);
  if (!exists) {
    record.shadow_runs.push(run);
    await saveExperiment(rootDir, record);
  }
}
