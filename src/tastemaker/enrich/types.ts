export interface EnrichmentSource {
  kind: "web" | "hn" | "reddit";
  label: string;
  text: string;
}

export interface EnrichmentBundle {
  full_name: string;
  sources: EnrichmentSource[];
  combined_text: string;
  fetched_at: string;
  errors: string[];
}

export type WebEnrichProvider = "jina" | "firecrawl";

export interface ExternalEnrichOptions {
  maxRepos: number;
  maxChars: number;
  timeoutMs?: number;
  fetchFn?: typeof fetch;
  webProvider?: WebEnrichProvider;
  firecrawlApiKey?: string;
  /** When true with Firecrawl, also scrape /releases and /discussions. */
  webDeep?: boolean;
  /** When true, search Reddit for recent posts mentioning the repo. */
  enrichReddit?: boolean;
}
