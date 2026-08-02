#!/usr/bin/env tsx
/**
 * Backfill token-usage.jsonl from published digest.json files when API telemetry
 * was not recorded (e.g. digest ran before token logging shipped).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { EDITIONS, briefingsDirForEdition, type EditionId } from "../../src/tastemaker/editions.js";
import { estimateNarrationCostUsd, charsPerInputToken } from "../../src/tastemaker/quality/cost.js";
import {
  appendTokenLog,
  countWords,
  readTokenLog,
  type TokenUsageLogEntry,
} from "../../src/tastemaker/quality/tokens.js";
import { readRubricLog } from "../../src/tastemaker/quality/log.js";
import { rubricSummaryFromEntry } from "../../src/tastemaker/quality/tokens.js";

const DEFAULT_MODEL = "claude-sonnet-4-6";
const OUTPUT_TOKENS_PER_WORD = 1.33;
const INPUT_TO_OUTPUT_RATIO = 5;
const ENRICH_CHARS_PER_REPO = 720;

interface DigestFile {
  run_id: string;
  generated_at: string;
  repos: Array<{ full_name: string; brief?: string | null }>;
}

async function listDigestDates(repoRoot: string, editionId: EditionId): Promise<string[]> {
  const briefingsDir = briefingsDirForEdition(repoRoot, EDITIONS[editionId]);
  let names: string[];
  try {
    names = await fs.readdir(briefingsDir);
  } catch {
    return [];
  }
  const dates: string[] = [];
  for (const name of names) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(name)) continue;
    try {
      await fs.access(path.join(briefingsDir, name, "digest.json"));
      dates.push(name);
    } catch {
      /* skip */
    }
  }
  return dates.sort();
}

function estimateEntryFromDigest(input: {
  digest: DigestFile;
  edition: EditionId;
  date: string;
  enrichWeb: boolean;
  experimentId?: string;
  rubric?: Awaited<ReturnType<typeof readRubricLog>>[number];
}): TokenUsageLogEntry {
  const per_repo = input.digest.repos.map((repo) => {
    const output_words = countWords(repo.brief);
    const output_tokens = Math.round(output_words * OUTPUT_TOKENS_PER_WORD);
    const output_chars = repo.brief?.length ?? 0;
    return {
      full_name: repo.full_name,
      input_tokens: Math.round(output_tokens * INPUT_TO_OUTPUT_RATIO),
      output_tokens,
      output_words,
      brief_chars: output_chars,
      prompt_chars: Math.round(output_tokens * INPUT_TO_OUTPUT_RATIO * 4.2),
      latency_ms: 0,
      enrich_chars: input.enrichWeb ? ENRICH_CHARS_PER_REPO : 0,
      readme_chars: 0,
    };
  });

  const input_tokens = per_repo.reduce((n, r) => n + r.input_tokens, 0);
  const output_tokens = per_repo.reduce((n, r) => n + r.output_tokens, 0);
  const output_words = per_repo.reduce((n, r) => n + r.output_words, 0);
  const prompt_chars = per_repo.reduce((n, r) => n + r.prompt_chars, 0);
  const enrich_chars_total = per_repo.reduce((n, r) => n + r.enrich_chars, 0);
  const repos_narrated = per_repo.length;

  return {
    logged_at: input.digest.generated_at,
    run_id: input.digest.run_id,
    edition: input.edition,
    date: input.date,
    model: DEFAULT_MODEL,
    variant: "single",
    shadow: false,
    experiment_id: input.experimentId,
    flags: {
      enrich_web: input.enrichWeb,
      structured_context: false,
      ponytail: false,
    },
    repos_narrated,
    repos_failed: per_repo.filter((r) => r.output_words === 0).length,
    input_tokens,
    output_tokens,
    output_words,
    prompt_chars,
    latency_ms_total: 0,
    latency_ms_avg: 0,
    enrich_chars_total,
    estimated_usd: estimateNarrationCostUsd(DEFAULT_MODEL, input_tokens, output_tokens),
    chars_per_input_token: charsPerInputToken(prompt_chars, input_tokens),
    metrics_source: "digest_estimate",
    rubric: input.rubric ? rubricSummaryFromEntry(input.rubric) : undefined,
    per_repo,
  };
}

export async function backfillTokenUsageFromDigests(
  repoRoot: string,
  options?: { since?: string; dryRun?: boolean },
): Promise<number> {
  const since = options?.since ?? "2026-08-02";
  const existing = await readTokenLog(repoRoot);
  const covered = new Set(
    existing
      .filter((e) => e.variant === "single" && e.metrics_source !== "digest_estimate")
      .map((e) => `${e.date}|${e.edition}`),
  );

  const rubricRows = await readRubricLog(repoRoot);
  const rubricByKey = new Map(rubricRows.map((r) => [`${r.date}|${r.edition}`, r]));

  let appended = 0;

  for (const editionId of Object.keys(EDITIONS) as EditionId[]) {
    const enrichWeb = editionId === "skills";
    for (const date of await listDigestDates(repoRoot, editionId)) {
      if (date < since) continue;
      const key = `${date}|${editionId}`;
      if (covered.has(key)) continue;

      const digestPath = path.join(
        briefingsDirForEdition(repoRoot, EDITIONS[editionId]),
        date,
        "digest.json",
      );
      const digest = JSON.parse(await fs.readFile(digestPath, "utf8")) as DigestFile;
      if (!digest.repos?.length) continue;

      const entry = estimateEntryFromDigest({
        digest,
        edition: editionId,
        date,
        enrichWeb,
        experimentId: editionId === "skills" && date >= "2026-08-02" ? "EXP-20260802-ponytail-narration-skills" : undefined,
        rubric: rubricByKey.get(key),
      });

      if (options?.dryRun) {
        console.log(`[dry-run] would append ${key}: ${entry.output_tokens} out tok, ${entry.output_words} words`);
      } else {
        await appendTokenLog(repoRoot, entry);
        console.log(`Backfilled ${key}: ${entry.output_tokens} out tok (${entry.repos_narrated} repos)`);
      }
      appended += 1;
    }
  }

  return appended;
}

async function main(): Promise<void> {
  const repoRoot = process.cwd();
  const dryRun = process.argv.includes("--dry-run");
  const sinceArg = process.argv.find((a) => a.startsWith("--since="));
  const since = sinceArg?.slice("--since=".length);

  const count = await backfillTokenUsageFromDigests(repoRoot, { since, dryRun });
  console.log(dryRun ? `Would backfill ${count} day(s).` : `Backfilled ${count} day(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
