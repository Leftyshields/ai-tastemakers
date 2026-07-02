#!/usr/bin/env node
import { loadConfig } from "./config.js";
import { runExperimentReminders } from "./experiment-reminders.js";

function parseFlag(name: string): boolean {
  return process.argv.includes(name);
}

function parseDateArg(): string | undefined {
  const idx = process.argv.indexOf("--date");
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return undefined;
}

async function main(): Promise<void> {
  try {
    const config = loadConfig({ editionId: "oss", requirePipelineSecrets: false });
    const result = await runExperimentReminders(config, {
      date: parseDateArg(),
      dryRun: parseFlag("--dry-run"),
    });

    if (result.matchCount === 0) {
      console.log(`No experiment reminders for ${result.date}`);
    } else if (result.skippedReason === "email_not_configured") {
      console.error(
        `Experiment reminders matched ${result.matchCount} milestone(s) for ${result.date} but email is not configured`,
      );
      process.exit(1);
    }
  } catch (err) {
    console.error("Experiment reminders failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
