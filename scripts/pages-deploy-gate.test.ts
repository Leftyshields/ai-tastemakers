import { describe, expect, it, vi } from "vitest";
import {
  STAGE_DEPLOY_DONE,
  deployedCommitSatisfiesGate,
  formatGithubActionsLog,
  freshFetchMismatchMessage,
  gateFailureMessage,
  gateTimeoutDetail,
  githubActionsLogLevel,
  isPagesBuildSuccessStatus,
  parseBuildJsonCommit,
  pollDeployDoneGate,
  runFreshFetchAdvisory,
} from "./pages-deploy-gate.js";

describe("isPagesBuildSuccessStatus", () => {
  it("accepts built and success statuses", () => {
    expect(isPagesBuildSuccessStatus("built")).toBe(true);
    expect(isPagesBuildSuccessStatus("success")).toBe(true);
    expect(isPagesBuildSuccessStatus("building")).toBe(false);
  });
});

describe("deployedCommitSatisfiesGate", () => {
  it("passes identical sha", () => {
    expect(deployedCommitSatisfiesGate("abc", "abc", null)).toBe(true);
  });

  it("passes descendant sha when compare behind_by is 0", () => {
    expect(
      deployedCommitSatisfiesGate("def", "abc", {
        ahead_by: 2,
        behind_by: 0,
        status: "ahead",
      }),
    ).toBe(true);
  });

  it("rejects ancestor sha when compare behind_by is positive", () => {
    expect(
      deployedCommitSatisfiesGate("abc", "def", {
        ahead_by: 0,
        behind_by: 1,
        status: "behind",
      }),
    ).toBe(false);
  });
});

describe("pollDeployDoneGate", () => {
  it("succeeds when latest build is built for expected commit", async () => {
    const api = {
      getPagesBuildLatest: vi.fn().mockResolvedValue({ status: "built", commit: "sha1" }),
      compareCommits: vi.fn(),
    };
    const result = await pollDeployDoneGate({
      expectedSha: "sha1",
      maxWaitMs: 0,
      api,
      sleep: vi.fn(),
      now: () => 0,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.deployedSha).toBe("sha1");
    }
  });

  it("times out naming deploy_done stage via gateFailureMessage", async () => {
    const api = {
      getPagesBuildLatest: vi
        .fn()
        .mockResolvedValue({ status: "building", commit: "sha1" }),
      compareCommits: vi.fn(),
    };
    const result = await pollDeployDoneGate({
      expectedSha: "sha1",
      maxWaitMs: 0,
      api,
      sleep: vi.fn(),
      now: () => 0,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.timedOut).toBe(false);
      const msg = gateFailureMessage(
        STAGE_DEPLOY_DONE,
        gateTimeoutDetail("sha1"),
      );
      expect(msg).toContain("deploy_done");
      expect(msg).toContain("sha1");
    }
  });

  it("passes when deployed commit is a descendant of expected", async () => {
    const api = {
      getPagesBuildLatest: vi
        .fn()
        .mockResolvedValue({ status: "built", commit: "child" }),
      compareCommits: vi.fn().mockResolvedValue({ ahead_by: 1, behind_by: 0 }),
    };
    const result = await pollDeployDoneGate({
      expectedSha: "parent",
      maxWaitMs: 0,
      api,
      sleep: vi.fn(),
      now: () => 0,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.deployedSha).toBe("child");
    }
    expect(api.compareCommits).toHaveBeenCalledWith("parent", "child");
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
