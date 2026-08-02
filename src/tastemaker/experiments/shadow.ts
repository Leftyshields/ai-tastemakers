import fs from "node:fs/promises";
import path from "node:path";
import type { DigestRepo } from "../types.js";
import type { TokenUsage } from "../quality/tokens.js";
import { sumTokenUsage } from "../quality/tokens.js";
import type { NarrationResult } from "../narrate/claude.js";

export interface ShadowRepoEntry {
  rank: number;
  full_name: string;
  html_url: string;
  /** README-only blurb (control). Present when enrich_web_requested. */
  brief_control?: string | null;
  /** README + external context blurb (treatment). Present when enrich_web_requested. */
  brief_treatment?: string | null;
  usage_control?: TokenUsage;
  usage_treatment?: TokenUsage;
  /** Relative bundle filename under the run dir, e.g. owner-repo.json */
  enrichment_bundle_ref?: string;
  /** Legacy single blurb when enrich_web_requested is false. */
  brief?: string | null;
  is_new?: boolean;
}

export interface TokenUsageSummary {
  input_tokens: number;
  output_tokens: number;
  output_words: number;
}

export interface ShadowDigestPayload {
  run_id: string;
  date: string;
  edition: string;
  enrich_web_requested: boolean;
  /** When true, brief_control uses default narration and brief_treatment uses ponytail/structured flags. */
  narrate_ponytail_requested?: boolean;
  generated_at: string;
  ranking_mode: string;
  usage_summary?: {
    control?: TokenUsageSummary;
    treatment?: TokenUsageSummary;
  };
  repos: ShadowRepoEntry[];
}

export function shadowRunDir(rootDir: string, runId: string): string {
  return path.join(rootDir, "data", "experiments", "runs", runId);
}

export interface WriteShadowDigestInput {
  run_id: string;
  generated_at: string;
  ranking_mode: string;
  enrich_web_requested: boolean;
  narrate_ponytail_requested?: boolean;
  usage_summary?: ShadowDigestPayload["usage_summary"];
  repos: ShadowRepoEntry[];
}

export async function writeShadowDigest(
  rootDir: string,
  input: WriteShadowDigestInput,
  dateLabel: string,
  editionId: string,
): Promise<string> {
  const runDir = shadowRunDir(rootDir, input.run_id);
  await fs.mkdir(runDir, { recursive: true });

  const payload: ShadowDigestPayload = {
    run_id: input.run_id,
    date: dateLabel,
    edition: editionId,
    enrich_web_requested: input.enrich_web_requested,
    narrate_ponytail_requested: input.narrate_ponytail_requested,
    generated_at: input.generated_at,
    ranking_mode: input.ranking_mode,
    usage_summary: input.usage_summary,
    repos: input.repos,
  };

  const outPath = path.join(runDir, "shadow.json");
  await fs.writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return outPath;
}

function usageFromResults(results: Map<string, NarrationResult>): Map<string, TokenUsage | undefined> {
  const map = new Map<string, TokenUsage | undefined>();
  for (const [name, result] of results) {
    map.set(name, result.usage);
  }
  return map;
}

function summarizeVariant(
  results: Map<string, NarrationResult>,
): TokenUsageSummary {
  const usages = [...results.values()].map((r) => r.usage);
  const totals = sumTokenUsage(usages);
  let output_words = 0;
  for (const r of results.values()) {
    if (r.brief?.trim()) {
      output_words += r.brief.trim().split(/\s+/).length;
    }
  }
  return {
    input_tokens: totals.input_tokens,
    output_tokens: totals.output_tokens,
    output_words,
  };
}

export function shadowUsageSummary(
  controlResults: Map<string, NarrationResult>,
  treatmentResults: Map<string, NarrationResult>,
  hasControl: boolean,
): ShadowDigestPayload["usage_summary"] | undefined {
  if (!hasControl && treatmentResults.size === 0) return undefined;
  const summary: NonNullable<ShadowDigestPayload["usage_summary"]> = {};
  if (hasControl && controlResults.size > 0) {
    summary.control = summarizeVariant(controlResults);
  }
  if (treatmentResults.size > 0) {
    summary.treatment = summarizeVariant(treatmentResults);
  }
  return summary;
}

export function shadowReposFromDigest(
  repos: DigestRepo[],
  enrichWebRequested: boolean,
  controlBriefs: Map<string, string | null>,
  treatmentBriefs: Map<string, string | null>,
  bundleRefs: Map<string, string>,
  controlResults?: Map<string, NarrationResult>,
  treatmentResults?: Map<string, NarrationResult>,
): ShadowRepoEntry[] {
  const controlUsage = controlResults ? usageFromResults(controlResults) : undefined;
  const treatmentUsage = treatmentResults ? usageFromResults(treatmentResults) : undefined;

  return repos.map((r) => {
    const base = {
      rank: r.rank,
      full_name: r.full_name,
      html_url: r.html_url,
      is_new: r.is_new,
    };

    if (!enrichWebRequested) {
      return {
        ...base,
        brief: treatmentBriefs.get(r.full_name) ?? r.brief,
        usage_treatment: treatmentUsage?.get(r.full_name),
      };
    }

    return {
      ...base,
      brief_control: controlBriefs.get(r.full_name) ?? null,
      brief_treatment: treatmentBriefs.get(r.full_name) ?? null,
      usage_control: controlUsage?.get(r.full_name),
      usage_treatment: treatmentUsage?.get(r.full_name),
      enrichment_bundle_ref: bundleRefs.get(r.full_name),
    };
  });
}
