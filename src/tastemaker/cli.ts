#!/usr/bin/env node
import { resolveEditionId } from "./editions.js";
import { loadConfig } from "./config.js";
import { runPipeline } from "./pipeline.js";

function parseEditionArg(): string | undefined {
  const idx = process.argv.indexOf("--edition");
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return undefined;
}

async function main(): Promise<void> {
  try {
    const editionId = resolveEditionId(parseEditionArg());
    const config = loadConfig({ editionId });
    const result = await runPipeline(config);
    console.log(`Briefing written (${config.editionName}):`);
    console.log(`  ${result.markdownPath}`);
    console.log(`  ${result.jsonPath}`);
    console.log(`  ${result.digest.repos.length} repos (${result.digest.ranking_mode})`);
  } catch (err) {
    console.error("Digest failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
