#!/usr/bin/env node
import { loadConfig } from "./config.js";
import { runWeeklyPipeline } from "./weekly/pipeline.js";
import { parseWeekArg } from "./weekly/week.js";
import type { WeeklyConfig } from "./types.js";

async function main(): Promise<void> {
  try {
    const base = loadConfig({ editionId: "oss" });
    const config: WeeklyConfig = {
      rootDir: base.rootDir,
      timezone: base.timezone,
      anthropicApiKey: base.anthropicApiKey,
      anthropicModel: base.anthropicModel,
    };

    const weekId = parseWeekArg(process.argv);
    const result = await runWeeklyPipeline(config, { weekId });

    if (result.skipped) {
      console.log(`Weekly skipped (${result.week_id ?? "unknown"}): ${result.reason}`);
      return;
    }

    console.log("Weekly review written:");
    console.log(`  ${result.markdownPath}`);
    console.log(`  ${result.jsonPath}`);
    console.log(`  Week ${result.week_id}`);
  } catch (err) {
    console.error("Weekly failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
