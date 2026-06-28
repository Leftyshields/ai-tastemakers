import fs from "node:fs/promises";
import path from "node:path";
import { listExperimentIds, loadExperiment } from "../../src/tastemaker/experiments/load.js";
import type { ExperimentRecord } from "../../src/tastemaker/experiments/types.js";

export interface ExperimentsDataFile {
  schema_version: 1;
  generated_at: string;
  experiments: ExperimentRecord[];
}

export async function loadAllExperiments(repoRoot: string): Promise<ExperimentRecord[]> {
  const ids = await listExperimentIds(repoRoot);
  const experiments: ExperimentRecord[] = [];
  for (const id of ids) {
    experiments.push(await loadExperiment(repoRoot, id));
  }
  return experiments;
}

export async function writeExperimentsData(
  repoRoot: string,
  siteLabDir: string,
): Promise<number> {
  const experiments = await loadAllExperiments(repoRoot);
  const payload: ExperimentsDataFile = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
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
