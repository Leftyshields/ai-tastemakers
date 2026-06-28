#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { findRepoRoot } from "./config.js";
import {
  experimentFilePath,
  listExperimentIds,
  loadExperiment,
  registerExperiment,
  saveExperiment,
} from "./experiments/load.js";
import { appendSnapshotToExperiment, parseSnapshotCsv } from "./experiments/snapshot.js";

function usage(): void {
  console.error(`Usage:
  npm run experiment -- list
  npm run experiment -- register <EXP-id>
  npm run experiment -- snapshot <EXP-id> --csv <path> [--period-start YYYY-MM-DD] [--period-end YYYY-MM-DD]
`);
}

function parseArgs(argv: string[]): {
  command?: string;
  id?: string;
  csvPath?: string;
  periodStart?: string;
  periodEnd?: string;
} {
  const args = argv.slice(2);
  const command = args[0];
  const out: ReturnType<typeof parseArgs> = { command };

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--csv" && args[i + 1]) {
      out.csvPath = args[++i];
    } else if (args[i] === "--period-start" && args[i + 1]) {
      out.periodStart = args[++i];
    } else if (args[i] === "--period-end" && args[i + 1]) {
      out.periodEnd = args[++i];
    } else if (!out.id && args[i]?.startsWith("EXP-")) {
      out.id = args[i];
    }
  }

  return out;
}

async function cmdList(rootDir: string): Promise<void> {
  const ids = await listExperimentIds(rootDir);
  if (ids.length === 0) {
    console.log("No experiments found.");
    return;
  }
  for (const id of ids) {
    const record = await loadExperiment(rootDir, id);
    console.log(`${record.id}\t${record.status}\t${record.edition}\t${record.hypothesis.slice(0, 60)}`);
  }
}

async function cmdRegister(rootDir: string, id: string): Promise<void> {
  const filePath = experimentFilePath(rootDir, id);
  try {
    await fs.access(filePath);
    throw new Error(`Experiment already exists: ${filePath}`);
  } catch (err) {
    if (err instanceof Error && err.message.includes("already exists")) {
      throw err;
    }
    const code =
      err && typeof err === "object" && "code" in err ? String((err as NodeJS.ErrnoException).code) : "";
    if (code !== "ENOENT") {
      throw err;
    }
  }
  const saved = await registerExperiment(rootDir, id);
  console.log(`Registered experiment: ${saved}`);
}

async function cmdSnapshot(
  rootDir: string,
  id: string,
  csvPath: string,
  periodStart?: string,
  periodEnd?: string,
): Promise<void> {
  const absCsv = path.isAbsolute(csvPath) ? csvPath : path.join(rootDir, csvPath);
  const csvContent = await fs.readFile(absCsv, "utf8");
  const record = await loadExperiment(rootDir, id);

  const period = {
    start: periodStart ?? record.baseline_window.start ?? "",
    end: periodEnd ?? record.baseline_window.end ?? "",
  };

  const snapshot = parseSnapshotCsv(csvContent, { period, source: absCsv });
  const updated = appendSnapshotToExperiment(record, snapshot);
  const saved = await saveExperiment(rootDir, updated);
  console.log(`Appended snapshot to ${saved} (${updated.snapshots.length} total)`);
}

async function main(): Promise<void> {
  const { command, id, csvPath, periodStart, periodEnd } = parseArgs(process.argv);
  if (!command) {
    usage();
    process.exit(1);
  }

  const rootDir = findRepoRoot();

  try {
    if (command === "list") {
      await cmdList(rootDir);
      return;
    }
    if (command === "register") {
      if (!id) throw new Error("register requires EXP-id");
      await cmdRegister(rootDir, id);
      return;
    }
    if (command === "snapshot") {
      if (!id || !csvPath) throw new Error("snapshot requires EXP-id and --csv path");
      await cmdSnapshot(rootDir, id, csvPath, periodStart, periodEnd);
      return;
    }
    usage();
    process.exit(1);
  } catch (err) {
    console.error("Experiment command failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
