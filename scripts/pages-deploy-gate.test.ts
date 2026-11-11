import { describe, expect, it, vi } from "vitest";
import {
  STAGE_DEPLOY_DONE,
  formatGithubActionsLog,
  freshFetchMismatchMessage,
  gateFailureMessage,
  gateTimeoutDetail,
  githubActionsLogLevel,
  liveBuildJsonMismatchDetail,
  parseBuildJsonCommit,
  pollDeployDoneGate,
  runFreshFetchAdvisory,
} from "./pages-deploy-gate.js";

describe("pollDeployDoneGate", () => {
  it("passes when live /build.json commit matches expected head SHA", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      headers: new Headers(),
      text: async () => JSON.stringify({ commit: "sha1" }),
    });
    const result = await pollDeployDoneGate({
      expectedSha: "sha1",
      maxWaitMs: 0,
      siteUrl: "https://example.com/site",
      fetchImpl,
      sleep: vi.fn(),
      now: () => 0,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.deployedSha).toBe("sha1");
    }
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://example.com/site/build.json",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("fails when live /build.json commit is stale", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      headers: new Headers(),
      text: async () => JSON.stringify({ commit: "older-sha" }),
    });
    const result = await pollDeployDoneGate({
      expectedSha: "head-sha",
      maxWaitMs: 0,
      siteUrl: "https://example.com/site",
      fetchImpl,
      sleep: vi.fn(),
      now: () => 0,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe(
        liveBuildJsonMismatchDetail("head-sha", "older-sha"),
      );
      expect(result.timedOut).toBe(false);
    }
  });

  it("times out naming deploy_done stage via gateFailureMessage", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      headers: new Headers(),
      text: async () => JSON.stringify({ commit: "other" }),
    });
    const result = await pollDeployDoneGate({
      expectedSha: "sha1",
      maxWaitMs: 0,
      siteUrl: "https://example.com/site",
      fetchImpl,
      sleep: vi.fn(),
      now: () => 0,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      const msg = gateFailureMessage(STAGE_DEPLOY_DONE, gateTimeoutDetail("sha1"));
      expect(msg).toContain("deploy_done");
      expect(msg).toContain("sha1");
      expect(msg).toContain("build.json");
    }
  });

  it("retries until live commit matches within maxWaitMs", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce({
        status: 200,
        headers: new Headers(),
        text: async () => JSON.stringify({ commit: "stale" }),
      })
      .mockResolvedValueOnce({
        status: 200,
        headers: new Headers(),
        text: async () => JSON.stringify({ commit: "target" }),
      });
    let nowMs = 0;
    const sleep = vi.fn(async (ms: number) => {
      nowMs += ms;
    });
    const result = await pollDeployDoneGate({
      expectedSha: "target",
      maxWaitMs: 60_000,
      siteUrl: "https://example.com/site",
      fetchImpl,
      sleep,
      now: () => nowMs,
      pollIntervalMs: 1000,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.deployedSha).toBe("target");
    }
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledTimes(1);
  });
});

describe("runFreshFetchAdvisory", () => {
  it("reports mismatch without throwing (caller logs warning only)", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      headers: new Headers({
        etag: '"x"',
        age: "120",
        "x-cache": "HIT",
      }),
      text: async () => JSON.stringify({ commit: "stale" }),
    });
    const result = await runFreshFetchAdvisory({
      siteUrl: "https://example.com/site",
      expectedSha: "fresh",
      fetchImpl,
    });
    expect(result.ok).toBe(false);
    expect(result.message).toContain(freshFetchMismatchMessage("fresh", "stale"));
    expect(githubActionsLogLevel(result.ok)).toBe("warning");
    expect(formatGithubActionsLog("warning", result.message)).toBe(
      `::warning::${result.message}`,
    );
  });

  it("parseBuildJsonCommit reads commit field", () => {
    expect(parseBuildJsonCommit('{"commit":"abc"}\n')).toBe("abc");
    expect(parseBuildJsonCommit("not-json")).toBe(null);
  });
});
