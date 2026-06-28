export interface EnrichmentSource {
  kind: "web" | "hn";
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

export interface ExternalEnrichOptions {
  maxRepos: number;
  maxChars: number;
  timeoutMs?: number;
  fetchFn?: typeof fetch;
}
