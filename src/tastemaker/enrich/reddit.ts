const REDDIT_SEARCH = "https://www.reddit.com/search.json";
const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_USER_AGENT = "ai-tastemakers-digest/1.0 (context enrichment)";

export interface RedditFetchOptions {
  timeoutMs?: number;
  maxChars?: number;
  maxPosts?: number;
  fetchFn?: typeof fetch;
  userAgent?: string;
}

interface RedditChild {
  data?: {
    title?: string;
    subreddit?: string;
    score?: number;
    num_comments?: number;
    created_utc?: number;
    permalink?: string;
    selftext?: string;
  };
}

interface RedditSearchResponse {
  data?: {
    children?: RedditChild[];
  };
}

function repoSearchTerms(fullName: string): string[] {
  const [owner, repo] = fullName.split("/");
  const terms = new Set<string>();
  if (repo) terms.add(repo);
  if (owner && repo) terms.add(`${owner}/${repo}`);
  if (repo) terms.add(`${repo} github`);
  return [...terms];
}

export async function fetchRedditContext(
  repoFullName: string,
  options: RedditFetchOptions = {},
): Promise<{ text: string; error?: string }> {
  const fetchFn = options.fetchFn ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxChars = options.maxChars ?? 1200;
  const maxPosts = options.maxPosts ?? 4;
  const userAgent = options.userAgent ?? DEFAULT_USER_AGENT;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const query = encodeURIComponent(repoSearchTerms(repoFullName)[0] ?? repoFullName);
    const url = `${REDDIT_SEARCH}?q=${query}&sort=new&limit=${maxPosts}&restrict_sr=false`;

    const res = await fetchFn(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": userAgent,
      },
    });

    if (!res.ok) {
      return { text: "", error: `Reddit HTTP ${res.status}` };
    }

    const payload = (await res.json()) as RedditSearchResponse;
    const children = payload.data?.children ?? [];
    if (children.length === 0) {
      return { text: "" };
    }

    const lines: string[] = [];
    for (const [i, child] of children.entries()) {
      const d = child.data;
      if (!d?.title?.trim()) continue;
      const sub = d.subreddit ? `r/${d.subreddit}` : "reddit";
      const score = d.score ?? 0;
      const comments = d.num_comments ?? 0;
      const snippet = d.selftext?.trim().slice(0, 120);
      const line = `${i + 1}. [${sub}] ${d.title.trim()} (${score} pts, ${comments} comments)`;
      lines.push(snippet ? `${line}\n   ${snippet}${snippet.length >= 120 ? "…" : ""}` : line);
    }

    if (lines.length === 0) {
      return { text: "" };
    }

    return { text: lines.join("\n").slice(0, maxChars) };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { text: "", error: msg };
  } finally {
    clearTimeout(timer);
  }
}
