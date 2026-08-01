const FIRECRAWL_SCRAPE_URL = "https://api.firecrawl.dev/v1/scrape";
const DEFAULT_TIMEOUT_MS = 8000;

export interface FirecrawlFetchOptions {
  apiKey: string;
  timeoutMs?: number;
  maxChars?: number;
  fetchFn?: typeof fetch;
}

export async function fetchFirecrawlContext(
  pageUrl: string,
  options: FirecrawlFetchOptions,
): Promise<{ text: string; error?: string }> {
  const fetchFn = options.fetchFn ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxChars = options.maxChars ?? 4000;
  const apiKey = options.apiKey.trim();
  if (!apiKey) {
    return { text: "", error: "FIRECRAWL_API_KEY is required when DIGEST_ENRICH_WEB_PROVIDER=firecrawl" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetchFn(FIRECRAWL_SCRAPE_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: pageUrl,
        formats: ["markdown"],
        onlyMainContent: true,
      }),
    });

    if (!res.ok) {
      return { text: "", error: `Firecrawl HTTP ${res.status}` };
    }

    const payload = (await res.json()) as {
      success?: boolean;
      data?: { markdown?: string };
      error?: string;
    };

    if (!payload.success) {
      return { text: "", error: payload.error ?? "Firecrawl scrape failed" };
    }

    const text = (payload.data?.markdown ?? "").trim().slice(0, maxChars);
    if (!text) {
      return { text: "", error: "Firecrawl returned empty markdown" };
    }

    return { text };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { text: "", error: msg };
  } finally {
    clearTimeout(timer);
  }
}
