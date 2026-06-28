import fs from "node:fs/promises";
import path from "node:path";
import type { DigestRepo } from "../types.js";

export interface ShadowRepoEntry {
  rank: number;
  full_name: string;
  html_url: string;
  /** README-only blurb (control). Present when enrich_web_requested. */
  brief_control?: string | null;
  /** README + external context blurb (treatment). Present when enrich_web_requested. */
  brief_treatment?: string | null;
  /** Relative bundle filename under the run dir, e.g. owner-repo.json */
  enrichment_bundle_ref?: string;
  /** Legacy single blurb when enrich_web_requested is false. */
  brief?: string | null;
  is_new?: boolean;
}

export interface ShadowDigestPayload {
  run_id: string;
  date: string;
  edition: string;
  enrich_web_requested: boolean;
  generated_at: string;
  ranking_mode: string;
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
    generated_at: input.generated_at,
    ranking_mode: input.ranking_mode,
    repos: input.repos,
  };

  const outPath = path.join(runDir, "shadow.json");
  await fs.writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return outPath;
}

export function shadowReposFromDigest(
  repos: DigestRepo[],
  enrichWebRequested: boolean,
  controlBriefs: Map<string, string | null>,
  treatmentBriefs: Map<string, string | null>,
  bundleRefs: Map<string, string>,
): ShadowRepoEntry[] {
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
      };
    }

    return {
      ...base,
      brief_control: controlBriefs.get(r.full_name) ?? null,
      brief_treatment: treatmentBriefs.get(r.full_name) ?? null,
      enrichment_bundle_ref: bundleRefs.get(r.full_name),
    };
  });
}
