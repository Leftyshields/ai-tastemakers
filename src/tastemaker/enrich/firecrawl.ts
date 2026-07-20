const DEFAULT_TIMEOUT_MS = 8000;
const FIRECRAWL_SCRAPE_URL = "https://api.firecrawl.dev/v2/scrape";

export interface FirecrawlFetchOptions {
  timeoutMs?: number;
  maxChars?: number;
  apiKey?: string;
  fetchFn?: typeof fetch;
}

interface FirecrawlScrapeResponse {
  success?: boolean;
  data?: {
    markdown?: string;
  };
  error?: string;
}

export async function fetchFirecrawlContext(
  pageUrl: string,
  options: FirecrawlFetchOptions = {},
): Promise<{ text: string; error?: string }> {
  const apiKey = options.apiKey?.trim();
  if (!apiKey) {
    return { text: "", error: "FIRECRAWL_API_KEY is not set" };
  }

  const fetchFn = options.fetchFn ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxChars = options.maxChars ?? 4000;

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

    const body = (await res.json()) as FirecrawlScrapeResponse;
    if (!res.ok) {
      const msg = body.error ?? `Firecrawl HTTP ${res.status}`;
      return { text: "", error: msg };
    }
    if (!body.success) {
      return { text: "", error: body.error ?? "Firecrawl scrape failed" };
    }

    const markdown = body.data?.markdown?.trim() ?? "";
    if (!markdown) {
      return { text: "", error: "Firecrawl returned empty markdown" };
    }

    return { text: markdown.slice(0, maxChars) };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { text: "", error: msg };
  } finally {
    clearTimeout(timer);
  }
}
