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
  it("appends cache buster when siteUrl already has query params", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      headers: new Headers(),
      text: async () => JSON.stringify({ commit: "sha1" }),
    });
    await pollDeployDoneGate({
      expectedSha: "sha1",
      maxWaitMs: 0,
      siteUrl: "https://example.com/site?foo=bar",
      fetchImpl,
      sleep: vi.fn(),
      now: () => 42,
    });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://example.com/site/build.json?foo=bar&t=42",
      expect.objectContaining({ cache: "no-store" }),
    );
  });

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
      "https://example.com/site/build.json?t=0",
      expect.objectContaining({ method: "GET", cache: "no-store" }),
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

  it("times out when live commit stays stale until maxWaitMs elapses", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      headers: new Headers(),
      text: async () => JSON.stringify({ commit: "other" }),
    });
    let nowMs = 0;
    const sleep = vi.fn(async (ms: number) => {
      nowMs += ms;
    });
    const result = await pollDeployDoneGate({
      expectedSha: "sha1",
      maxWaitMs: 1000,
      siteUrl: "https://example.com/site",
      fetchImpl,
      sleep,
      now: () => nowMs,
      pollIntervalMs: 500,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.timedOut).toBe(true);
      expect(result.reason).toBe(liveBuildJsonMismatchDetail("sha1", "other"));
      const msg = gateFailureMessage(STAGE_DEPLOY_DONE, gateTimeoutDetail("sha1"));
      expect(msg).toContain("deploy_done");
      expect(msg).toContain("sha1");
      expect(msg).toContain("build.json");
    }
    expect(sleep).toHaveBeenCalled();
  });

  it("fails closed on fetch network error without waiting", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("ECONNRESET"));
    const sleep = vi.fn();
    const result = await pollDeployDoneGate({
      expectedSha: "sha1",
      maxWaitMs: 0,
      siteUrl: "https://example.com/site",
      fetchImpl,
      sleep,
      now: () => 0,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("ECONNRESET");
      expect(result.timedOut).toBe(false);
    }
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });

  it("fails closed on non-200 response without waiting", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 503,
      headers: new Headers(),
      text: async () => "unavailable",
    });
    const sleep = vi.fn();
    const result = await pollDeployDoneGate({
      expectedSha: "sha1",
      maxWaitMs: 0,
      siteUrl: "https://example.com/site",
      fetchImpl,
      sleep,
      now: () => 0,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe(
        "HTTP 503 for https://example.com/site/build.json?t=0",
      );
      expect(result.timedOut).toBe(false);
    }
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });

  it("fails closed on invalid JSON in build.json without waiting", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      status: 200,
      headers: new Headers(),
      text: async () => "not-json",
    });
    const sleep = vi.fn();
    const result = await pollDeployDoneGate({
      expectedSha: "sha1",
      maxWaitMs: 0,
      siteUrl: "https://example.com/site",
      fetchImpl,
      sleep,
      now: () => 0,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe(liveBuildJsonMismatchDetail("sha1", null));
      expect(result.timedOut).toBe(false);
    }
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });

  it("does not set timedOut when maxWaitMs is zero (immediate fail, not a poll timeout)", async () => {
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
      expect(result.timedOut).toBe(false);
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
      now: () => 99,
    });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://example.com/site/build.json?t=99",
      expect.objectContaining({ cache: "no-store" }),
    );
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
