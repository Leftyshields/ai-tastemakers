const HN_SEARCH = "https://hn.algolia.com/api/v1/search";
const DEFAULT_TIMEOUT_MS = 8000;

export interface HnFetchOptions {
  timeoutMs?: number;
  maxChars?: number;
  maxHits?: number;
  fetchFn?: typeof fetch;
}

interface HnHit {
  title?: string;
  url?: string;
  points?: number;
  num_comments?: number;
}

interface HnSearchResponse {
  hits?: HnHit[];
}

export async function fetchHnContext(
  repoFullName: string,
  options: HnFetchOptions = {},
): Promise<{ text: string; error?: string }> {
  const fetchFn = options.fetchFn ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxChars = options.maxChars ?? 2000;
  const maxHits = options.maxHits ?? 3;
  const query = encodeURIComponent(repoFullName.split("/").pop() ?? repoFullName);
  const url = `${HN_SEARCH}?query=${query}&tags=story&hitsPerPage=${maxHits}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetchFn(url, { signal: controller.signal });
    if (!res.ok) {
      return { text: "", error: `HN Algolia HTTP ${res.status}` };
    }
    const data = (await res.json()) as HnSearchResponse;
    const hits = data.hits ?? [];
    if (hits.length === 0) {
      return { text: "" };
    }

    const lines = hits.map((hit, i) => {
      const title = hit.title?.trim() || "Untitled";
      const link = hit.url?.trim() || "";
      const score = hit.points ?? 0;
      const comments = hit.num_comments ?? 0;
      return `${i + 1}. ${title} (${score} pts, ${comments} comments)${link ? `\n   ${link}` : ""}`;
    });

    return { text: lines.join("\n").slice(0, maxChars) };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { text: "", error: msg };
  } finally {
    clearTimeout(timer);
  }
}
