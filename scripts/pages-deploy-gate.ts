/**
 * GitHub Pages deploy verification: deploy_done (gate), fresh_fetch (advisory), assertions.
 */

export const STAGE_DEPLOY_DONE = "deploy_done" as const;
export const STAGE_FRESH_FETCH = "fresh_fetch" as const;
export const STAGE_ASSERTIONS = "assertions" as const;

export type VerifyStage =
  | typeof STAGE_DEPLOY_DONE
  | typeof STAGE_FRESH_FETCH
  | typeof STAGE_ASSERTIONS;

export type PagesBuildLatest = {
  status?: string;
  commit?: string;
};

export type GitHubCompare = {
  status?: string;
  ahead_by?: number;
  behind_by?: number;
};

export type GitHubApiClient = {
  getPagesBuildLatest(): Promise<PagesBuildLatest>;
  compareCommits(base: string, head: string): Promise<GitHubCompare>;
};

export type FetchClient = (
  url: string,
  init?: RequestInit,
) => Promise<{ status: number; headers: Headers; text: () => Promise<string> }>;

export function pagesMaxWaitMs(envValue: string | undefined): number {
  if (envValue === undefined || envValue === "") return 0;
  const n = Number.parseInt(envValue, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function isPagesBuildSuccessStatus(status: string | undefined): boolean {
  if (!status) return false;
  const s = status.toLowerCase();
  return s === "built" || s === "success" || s === "deployed";
}

/** Deployed commit is identical to expected or a descendant on the default branch history. */
export function deployedCommitSatisfiesGate(
  deployedSha: string | undefined,
  expectedSha: string,
  compare: GitHubCompare | null,
): boolean {
  if (!deployedSha || !expectedSha) return false;
  if (deployedSha === expectedSha) return true;
  if (!compare) return false;
  const behind = compare.behind_by ?? 0;
  return behind === 0;
}

export function gateFailureMessage(stage: VerifyStage, detail: string): string {
  return `GitHub Pages verification failed at stage ${stage}: ${detail}`;
}

export function gateTimeoutDetail(expectedSha: string): string {
  return `timed out waiting for Pages API to report a successful build whose commit matches ${expectedSha} or is a descendant (compare API behind_by=0)`;
}

export function parseBuildJsonCommit(body: string): string | null {
  try {
    const parsed = JSON.parse(body) as { commit?: string };
    const commit = parsed.commit?.trim();
    return commit || null;
  } catch {
    return null;
  }
}

export function freshFetchMismatchMessage(
  expectedSha: string,
  liveSha: string | null,
): string {
  if (!liveSha) {
    return `live /build.json missing or unreadable commit (expected ${expectedSha})`;
  }
  return `live /build.json commit ${liveSha} does not match deployed gate commit ${expectedSha} (CDN cache may lag up to max-age=600)`;
}

export type DeployDonePollResult =
  | { ok: true; deployedSha: string; buildStatus: string }
  | { ok: false; reason: string; timedOut: boolean };

export async function pollDeployDoneGate(options: {
  expectedSha: string;
  maxWaitMs: number;
  api: GitHubApiClient;
  sleep: (ms: number) => Promise<void>;
  now?: () => number;
  pollIntervalMs?: number;
}): Promise<DeployDonePollResult> {
  const {
    expectedSha,
    maxWaitMs,
    api,
    sleep,
    now = () => Date.now(),
    pollIntervalMs = 15_000,
  } = options;
  const started = now();
  let attempt = 0;
  let delayMs = pollIntervalMs;
  let lastReason = "Pages build status not ready";

  while (true) {
    attempt += 1;
    try {
      const build = await api.getPagesBuildLatest();
      const buildStatus = build.status ?? "unknown";
      const deployedSha = build.commit?.trim();

      if (isPagesBuildSuccessStatus(buildStatus) && deployedSha) {
        let compare: GitHubCompare | null = null;
        if (deployedSha !== expectedSha) {
          compare = await api.compareCommits(expectedSha, deployedSha);
        }
        if (deployedCommitSatisfiesGate(deployedSha, expectedSha, compare)) {
          return { ok: true, deployedSha, buildStatus };
        }
        lastReason = `Pages build status=${buildStatus} commit=${deployedSha} is not ${expectedSha} or a descendant (compare behind_by=${compare?.behind_by ?? "n/a"})`;
      } else {
        lastReason = `Pages build status=${buildStatus}${deployedSha ? ` commit=${deployedSha}` : " (no commit on latest build)"}`;
      }
    } catch (e) {
      lastReason = e instanceof Error ? e.message : String(e);
    }

    const elapsed = now() - started;
    const remaining = maxWaitMs - elapsed;
    if (maxWaitMs <= 0 || remaining <= 0) {
      return {
        ok: false,
        reason: lastReason,
        timedOut: maxWaitMs > 0,
      };
    }

    const waitMs = Math.min(delayMs, remaining);
    await sleep(waitMs);
    delayMs = Math.min(Math.round(delayMs * 1.45), 90_000);
  }
}

export type FreshFetchAdvisoryResult = {
  ok: boolean;
  liveSha: string | null;
  etag: string | null;
  age: string | null;
  xCache: string | null;
  message: string;
};

export async function runFreshFetchAdvisory(options: {
  siteUrl: string;
  expectedSha: string;
  fetchImpl: FetchClient;
}): Promise<FreshFetchAdvisoryResult> {
  const base = options.siteUrl.replace(/\/+$/, "");
  const url = `${base}/build.json`;
  let etag: string | null = null;
  let age: string | null = null;
  let xCache: string | null = null;
  let liveSha: string | null = null;

  try {
    const res = await options.fetchImpl(url, {
      method: "GET",
      redirect: "follow",
      headers: { Accept: "application/json" },
    });
    etag = res.headers.get("etag");
    age = res.headers.get("age");
    xCache = res.headers.get("x-cache");
    if (res.status === 200) {
      liveSha = parseBuildJsonCommit(await res.text());
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      liveSha: null,
      etag,
      age,
      xCache,
      message: `fresh_fetch: fetch failed for ${url}: ${msg}`,
    };
  }

  const match = liveSha === options.expectedSha;
  const message = match
    ? `fresh_fetch: live /build.json commit matches ${options.expectedSha}`
    : `fresh_fetch: ${freshFetchMismatchMessage(options.expectedSha, liveSha)}`;

  return {
    ok: match,
    liveSha,
    etag,
    age,
    xCache,
    message,
  };
}

export function githubActionsLogLevel(
  advisoryOk: boolean,
): "notice" | "warning" {
  return advisoryOk ? "notice" : "warning";
}

export function formatGithubActionsLog(
  level: "notice" | "warning" | "error",
  message: string,
): string {
  return `::${level}::${message}`;
}

export function createGitHubApiClient(repo: string, token: string): GitHubApiClient {
  const apiBase = `https://api.github.com/repos/${repo}`;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  async function ghGet<T>(path: string): Promise<T> {
    const res = await fetch(`${apiBase}${path}`, { headers });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`GitHub API ${path} HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    return (await res.json()) as T;
  }

  return {
    async getPagesBuildLatest() {
      return ghGet<PagesBuildLatest>("/pages/builds/latest");
    },
    async compareCommits(base, head) {
      return ghGet<GitHubCompare>(`/compare/${base}...${head}`);
    },
  };
}
