import fs from "node:fs/promises";
import path from "node:path";
import type { ScoredRepo } from "../types.js";
import { compactEnrichment } from "./compact.js";
import { fetchHnContext } from "./hn.js";
import type { EnrichmentBundle, ExternalEnrichOptions } from "./types.js";
import { fetchFirecrawlContext } from "./firecrawl.js";
import { fetchWebContext } from "./web.js";

export type { EnrichmentBundle, EnrichmentSource, ExternalEnrichOptions } from "./types.js";
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

async function fetchWebSnippet(
  pageUrl: string,
  options: Pick<ExternalEnrichOptions, "maxChars" | "timeoutMs" | "fetchFn" | "webProvider" | "firecrawlApiKey">,
): Promise<{ text: string; error?: string; label: string }> {
  const fetchOpts = {
    timeoutMs: options.timeoutMs,
    maxChars: options.maxChars,
    fetchFn: options.fetchFn,
  };

  if (options.webProvider === "firecrawl") {
    const result = await fetchFirecrawlContext(pageUrl, {
      ...fetchOpts,
      apiKey: options.firecrawlApiKey ?? "",
    });
    return { ...result, label: "Web (Firecrawl)" };
  }

  const result = await fetchWebContext(pageUrl, fetchOpts);
  return { ...result, label: "Web (Jina Reader)" };
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
    webProvider: options.webProvider,
    firecrawlApiKey: options.firecrawlApiKey,
  };

  const [web, hn] = await Promise.all([
    fetchWebSnippet(repo.html_url, fetchOpts),
    fetchHnContext(repo.full_name, fetchOpts),
  ]);

  const sources = [];
  const errors: string[] = [];

  if (web.text) {
    sources.push({ kind: "web" as const, label: web.label, text: web.text });
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
    const bundle = await enrichRepoExternal(repo, {
      maxChars: options.maxChars,
      timeoutMs: options.timeoutMs,
      fetchFn: options.fetchFn,
      webProvider: options.webProvider,
      firecrawlApiKey: options.firecrawlApiKey,
    });
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
