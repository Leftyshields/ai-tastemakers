#!/usr/bin/env node
/**
 * CLI for Pages deploy verification stages (used by pages.yml and digest verify).
 */
import {
  STAGE_ASSERTIONS,
  STAGE_DEPLOY_DONE,
  STAGE_FRESH_FETCH,
  formatGithubActionsLog,
  gateFailureMessage,
  gateTimeoutDetail,
  githubActionsLogLevel,
  pagesMaxWaitMs,
  pollDeployDoneGate,
  runFreshFetchAdvisory,
} from "./pages-deploy-gate.js";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseStages(argv: string[]): Set<string> {
  const idx = argv.indexOf("--stages");
  if (idx === -1) {
    return new Set([STAGE_DEPLOY_DONE, STAGE_FRESH_FETCH, STAGE_ASSERTIONS]);
  }
  const raw = argv[idx + 1] ?? "";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

function hasFlag(argv: string[], flag: string): boolean {
  return argv.includes(flag);
}

async function runAssertions(date: string | undefined, siteUrl: string): Promise<boolean> {
  if (!date) {
    console.log(`${STAGE_ASSERTIONS}: skipped (no --date)`);
    return true;
  }
  const url = `${siteUrl.replace(/\/+$/, "")}/briefings/${date}.html`;
  console.log(
    `${STAGE_ASSERTIONS}: HEAD ${url} (may read cached CDN content; see fresh_fetch advisory)`,
  );
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.status === 200) {
      console.log(`  OK ${url}`);
      return true;
    }
    console.error(`  HTTP ${res.status} for ${url}`);
    return false;
  } catch (e) {
    console.error(`  ${e instanceof Error ? e.message : String(e)}`);
    return false;
  }
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const stages = parseStages(argv);
  const deployPagesSucceeded = !hasFlag(argv, "--deploy-pages-failed");
  const expectedSha =
    process.env.EXPECTED_PAGES_SHA?.trim() ||
    process.env.GITHUB_SHA?.trim() ||
    "";
  const siteUrl =
    process.env.DIGEST_SITE_URL?.trim() ||
    process.env.PAGES_SITE_URL?.trim() ||
    "https://leftyshields.github.io/ai-tastemakers";
  const maxWaitMs = pagesMaxWaitMs(process.env.VERIFY_PAGES_MAX_WAIT_MS);

  let date: string | undefined;
  const dateIdx = argv.indexOf("--date");
  if (dateIdx !== -1) {
    date = argv[dateIdx + 1];
  }

  let gateDeployedSha = expectedSha;

  const fetchImpl = async (url: string, init?: RequestInit) => {
    const res = await fetch(url, init);
    return {
      status: res.status,
      headers: res.headers,
      text: () => res.text(),
    };
  };

  if (stages.has(STAGE_DEPLOY_DONE)) {
    if (!deployPagesSucceeded) {
      const msg = gateFailureMessage(
        STAGE_DEPLOY_DONE,
        "actions/deploy-pages did not succeed in the deploy job",
      );
      console.error(msg);
      process.exit(1);
    }
    if (!expectedSha) {
      const msg = gateFailureMessage(
        STAGE_DEPLOY_DONE,
        "missing EXPECTED_PAGES_SHA or GITHUB_SHA",
      );
      console.error(msg);
      process.exit(1);
    }

    const poll = await pollDeployDoneGate({
      expectedSha,
      maxWaitMs,
      siteUrl,
      fetchImpl,
      sleep,
    });

    if (!poll.ok) {
      const detail = poll.timedOut
        ? gateTimeoutDetail(expectedSha)
        : poll.reason;
      console.error(gateFailureMessage(STAGE_DEPLOY_DONE, detail));
      process.exit(1);
    }

    gateDeployedSha = poll.deployedSha;
    console.log(
      `${STAGE_DEPLOY_DONE}: OK live /build.json commit=${poll.deployedSha}`,
    );
  }

  if (stages.has(STAGE_FRESH_FETCH)) {
    const advisory = await runFreshFetchAdvisory({
      siteUrl,
      expectedSha: gateDeployedSha,
      fetchImpl,
    });
    const headerBits = [
      advisory.etag != null ? `ETag=${advisory.etag}` : null,
      advisory.age != null ? `Age=${advisory.age}` : null,
      advisory.xCache != null ? `X-Cache=${advisory.xCache}` : null,
    ]
      .filter(Boolean)
      .join("; ");
    const fullMessage = headerBits
      ? `${advisory.message}; ${headerBits}`
      : advisory.message;
    const level = githubActionsLogLevel(advisory.ok);
    console.log(formatGithubActionsLog(level, fullMessage));
  }

  if (stages.has(STAGE_ASSERTIONS)) {
    const ok = await runAssertions(date, siteUrl);
    if (!ok) {
      console.error(
        gateFailureMessage(
          STAGE_ASSERTIONS,
          `content check failed for date=${date ?? "unknown"}`,
        ),
      );
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
