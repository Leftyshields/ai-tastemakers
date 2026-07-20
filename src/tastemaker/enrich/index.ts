import fs from "node:fs/promises";
import path from "node:path";
import type { ScoredRepo } from "../types.js";
import { compactEnrichment } from "./compact.js";
import { fetchFirecrawlContext } from "./firecrawl.js";
import { fetchHnContext } from "./hn.js";
import type { EnrichmentBundle, ExternalEnrichOptions, WebEnrichProvider } from "./types.js";
import { fetchWebContext } from "./web.js";

export type { EnrichmentBundle, EnrichmentSource, ExternalEnrichOptions, WebEnrichProvider } from "./types.js";
export { compactEnrichment } from "./compact.js";
export { fetchFirecrawlContext } from "./firecrawl.js";
export { fetchHnContext } from "./hn.js";
export { fetchWebContext } from "./web.js";

function bundleFileName(fullName: string): string {
  return `${fullName.replace(/\//g, "-")}.json`;
}

export function enrichmentBundleRef(fullName: string): string {
  return bundleFileName(fullName);
}

export async function enrichRepoExternal(
  repo: ScoredRepo,
  options: Pick<
    ExternalEnrichOptions,
    "maxChars" | "timeoutMs" | "fetchFn" | "webProvider" | "firecrawlApiKey"
  >,
): Promise<EnrichmentBundle> {
  const perSourceMax = Math.max(400, Math.floor(options.maxChars / 2));
  const fetchOpts = {
    timeoutMs: options.timeoutMs,
    maxChars: perSourceMax,
    fetchFn: options.fetchFn,
  };
  const provider: WebEnrichProvider = options.webProvider ?? "jina";

  const webPromise =
    provider === "firecrawl"
      ? fetchFirecrawlContext(repo.html_url, {
          ...fetchOpts,
          apiKey: options.firecrawlApiKey,
        })
      : fetchWebContext(repo.html_url, fetchOpts);

  const [web, hn] = await Promise.all([webPromise, fetchHnContext(repo.full_name, fetchOpts)]);

  const sources = [];
  const errors: string[] = [];
  const webLabel = provider === "firecrawl" ? "Web (Firecrawl)" : "Web (Jina Reader)";

  if (web.text) {
    sources.push({ kind: "web" as const, label: webLabel, text: web.text });
  } else if (web.error) {
    errors.push(`web: ${web.error}`);
  }

  if (hn.text) {
    sources.push({ kind: "hn" as const, label: "Hacker News", text: hn.text });
  } else if (hn.error) {
    errors.push(`hn: ${hn.error}`);
  }

  return {
    full_name: repo.full_name,
    sources,
    combined_text: compactEnrichment(sources, options.maxChars),
    fetched_at: new Date().toISOString(),
    errors,
  };
}

export async function enrichExternalContext(
  repos: ScoredRepo[],
  options: ExternalEnrichOptions,
): Promise<Map<string, EnrichmentBundle>> {
  const results = new Map<string, EnrichmentBundle>();
  const targets = repos.slice(0, options.maxRepos);

  for (const repo of targets) {
    const bundle = await enrichRepoExternal(repo, options);
    results.set(repo.full_name, bundle);
  }

  return results;
}

export async function writeEnrichmentBundles(
  runDir: string,
  bundles: Map<string, EnrichmentBundle>,
): Promise<void> {
  await fs.mkdir(runDir, { recursive: true });
  for (const bundle of bundles.values()) {
    const outPath = path.join(runDir, bundleFileName(bundle.full_name));
    await fs.writeFile(outPath, `${JSON.stringify(bundle, null, 2)}\n`, "utf8");
  }
}

export function applyExternalContext(
  repos: ScoredRepo[],
  bundles: Map<string, EnrichmentBundle>,
): ScoredRepo[] {
  return repos.map((repo) => {
    const bundle = bundles.get(repo.full_name);
    if (!bundle?.combined_text) return repo;
    return { ...repo, external_context: bundle.combined_text };
  });
}
