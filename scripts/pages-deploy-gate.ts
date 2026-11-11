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

export type FetchClient = (
  url: string,
  init?: RequestInit,
) => Promise<{ status: number; headers: Headers; text: () => Promise<string> }>;

export function pagesMaxWaitMs(envValue: string | undefined): number {
  if (envValue === undefined || envValue === "") return 0;
  const n = Number.parseInt(envValue, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function gateFailureMessage(stage: VerifyStage, detail: string): string {
  return `GitHub Pages verification failed at stage ${stage}: ${detail}`;
}

export function gateTimeoutDetail(expectedSha: string): string {
  return `timed out waiting for live /build.json commit to match ${expectedSha} (CDN cache may lag up to max-age=600)`;
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

export function liveBuildJsonMismatchDetail(
  expectedSha: string,
  liveSha: string | null,
): string {
  if (!liveSha) {
    return `live /build.json missing or unreadable commit (expected ${expectedSha})`;
  }
  return `live /build.json commit ${liveSha} does not match expected ${expectedSha}`;
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

/** Gate: live /build.json commit must equal the workflow head SHA (retry for CDN). */
export async function pollDeployDoneGate(options: {
  expectedSha: string;
  maxWaitMs: number;
  siteUrl: string;
  fetchImpl: FetchClient;
  sleep: (ms: number) => Promise<void>;
  now?: () => number;
  pollIntervalMs?: number;
}): Promise<DeployDonePollResult> {
  const {
    expectedSha,
    maxWaitMs,
    siteUrl,
    fetchImpl,
    sleep,
    now = () => Date.now(),
    pollIntervalMs = 15_000,
  } = options;
  const base = siteUrl.replace(/\/+$/, "");
  const url = `${base}/build.json`;
  const started = now();
  let delayMs = pollIntervalMs;
  let lastReason = "live /build.json not yet available";

  while (true) {
    const fetchUrl = `${url}?t=${now()}`;
    try {
      const res = await fetchImpl(fetchUrl, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (res.status === 200) {
        const liveSha = parseBuildJsonCommit(await res.text());
        if (liveSha === expectedSha) {
          return { ok: true, deployedSha: liveSha, buildStatus: "live" };
        }
        lastReason = liveBuildJsonMismatchDetail(expectedSha, liveSha);
      } else {
        lastReason = `HTTP ${res.status} for ${fetchUrl}`;
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
