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

async function scrapeOneUrl(
  pageUrl: string,
  options: FirecrawlFetchOptions,
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

export async function fetchFirecrawlContext(
  pageUrl: string,
  options: FirecrawlFetchOptions = {},
): Promise<{ text: string; error?: string }> {
  return scrapeOneUrl(pageUrl, options);
}

function urlSectionLabel(pageUrl: string): string {
  if (pageUrl.includes("/releases")) return "Releases";
  if (pageUrl.includes("/discussions")) return "Discussions";
  return "README";
}

/** Scrape README + releases + discussions; skips empty/error pages silently. */
export async function fetchFirecrawlDeepContext(
  pageUrls: string[],
  options: FirecrawlFetchOptions = {},
): Promise<{ text: string; error?: string }> {
  const maxChars = options.maxChars ?? 4000;
  const perUrl = Math.max(280, Math.floor(maxChars / Math.max(1, pageUrls.length)));
  const chunks: string[] = [];
  const errors: string[] = [];

  for (const url of pageUrls) {
    const result = await scrapeOneUrl(url, { ...options, maxChars: perUrl });
    if (result.text) {
      chunks.push(`[${urlSectionLabel(url)}]\n${result.text}`);
    } else if (result.error && !result.error.includes("empty markdown")) {
      errors.push(`${urlSectionLabel(url)}: ${result.error}`);
    }
  }

  if (chunks.length === 0) {
    return { text: "", error: errors[0] ?? "Firecrawl returned no content" };
  }

  return { text: chunks.join("\n\n").slice(0, maxChars) };
}
