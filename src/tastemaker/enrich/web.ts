const DEFAULT_TIMEOUT_MS = 8000;

export interface WebFetchOptions {
  timeoutMs?: number;
  maxChars?: number;
  fetchFn?: typeof fetch;
}

export async function fetchWebContext(
  pageUrl: string,
  options: WebFetchOptions = {},
): Promise<{ text: string; error?: string }> {
  const fetchFn = options.fetchFn ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxChars = options.maxChars ?? 4000;
  const readerUrl = `https://r.jina.ai/${pageUrl}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetchFn(readerUrl, {
      signal: controller.signal,
      headers: { Accept: "text/plain" },
    });
    if (!res.ok) {
      return { text: "", error: `Jina Reader HTTP ${res.status}` };
    }
    const raw = await res.text();
    const text = raw.trim().slice(0, maxChars);
    return { text };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { text: "", error: msg };
  } finally {
    clearTimeout(timer);
  }
}
