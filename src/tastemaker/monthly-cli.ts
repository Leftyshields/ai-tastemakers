#!/usr/bin/env node
import { loadConfig } from "./config.js";
import { runMonthlyPipeline } from "./monthly/pipeline.js";
import { parseMonthArg } from "./monthly/month.js";
import type { MonthlyConfig } from "./types.js";

async function main(): Promise<void> {
  try {
    const base = loadConfig({ editionId: "oss" });
    const config: MonthlyConfig = {
      rootDir: base.rootDir,
      timezone: base.timezone,
      anthropicApiKey: base.anthropicApiKey,
      anthropicModel: base.anthropicModel,
    };

    const monthId = parseMonthArg(process.argv);
    const result = await runMonthlyPipeline(config, { monthId });

    if (result.skipped) {
      console.log(`Monthly skipped (${result.month_id ?? "unknown"}): ${result.reason}`);
      return;
    }

    console.log("Monthly review written:");
    console.log(`  ${result.markdownPath}`);
    console.log(`  ${result.jsonPath}`);
    console.log(`  Month ${result.month_id}`);
  } catch (err) {
    console.error("Monthly failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
