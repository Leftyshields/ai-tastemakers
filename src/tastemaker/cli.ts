#!/usr/bin/env node
import { loadConfig } from "./config.js";
import { runPipeline } from "./pipeline.js";

async function main(): Promise<void> {
  try {
    const config = loadConfig();
    const result = await runPipeline(config);
    console.log(`Briefing written:`);
    console.log(`  ${result.markdownPath}`);
    console.log(`  ${result.jsonPath}`);
    console.log(`  ${result.digest.repos.length} repos (${result.digest.ranking_mode})`);
  } catch (err) {
    console.error("Digest failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
