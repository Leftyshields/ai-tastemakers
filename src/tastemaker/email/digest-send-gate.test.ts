import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AppConfig } from "../types.js";
import {
  assertDigestSendReady,
  isDigestEmailConfigured,
} from "./digest-send-gate.js";

vi.mock("../subscribers/load.js", () => ({
  resolveDigestRecipients: vi.fn(),
}));

import { resolveDigestRecipients } from "../subscribers/load.js";

const base: AppConfig = {
  githubToken: "x",
  anthropicApiKey: "y",
  anthropicModel: "claude-test",
  timezone: "UTC",
  topN: 10,
  minStars: 50,
  pushedWithinDays: 30,
  topics: [],
  searchPagesPerTopic: 1,
  blocklist: new Set(),
  maxStarsBootstrap: 80000,
  softDedupBriefingCount: 3,
  softDedupPenalty: 0.8,
  readmeMaxChars: 1000,
  rootDir: "/tmp",
  snapshotPath: "/tmp/snap.jsonl",
  briefingsDir: "/tmp/briefings",
  digestSiteUrl: "https://example.com",
  editionId: "oss",
  editionName: "AI Tastemakers",
  enrichWeb: false,
  enrichShadow: false,
  enrichMaxRepos: 3,
  enrichMaxChars: 1500,
  enrichWebProvider: "jina" as const,
  enrichWebDeep: true,
  enrichReddit: true,
  qualityRubric: false,
  narrateStructuredContext: false,
  narratePonytail: false,
  skillsExtraDiscovery: false,
};

beforeEach(() => {
  vi.mocked(resolveDigestRecipients).mockReset();
});

describe("isDigestEmailConfigured", () => {
  it("returns false when Resend env is incomplete", () => {
    expect(isDigestEmailConfigured(base)).toBe(false);
    expect(
      isDigestEmailConfigured({ ...base, resendApiKey: "re_test", digestEmailFrom: "" }),
    ).toBe(false);
  });

  it("returns true when API key and from address are set", () => {
    expect(
      isDigestEmailConfigured({
        ...base,
        resendApiKey: "re_test",
        digestEmailFrom: "Digest <digest@example.com>",
      }),
    ).toBe(true);
  });
});

describe("assertDigestSendReady", () => {
  it("returns empty when email is not configured", async () => {
    await expect(assertDigestSendReady(base)).resolves.toEqual([]);
    expect(resolveDigestRecipients).not.toHaveBeenCalled();
  });

  it("returns recipients on a send-intended run", async () => {
    vi.mocked(resolveDigestRecipients).mockResolvedValue(["you@epiphoric.com"]);
    const configured = {
      ...base,
      resendApiKey: "re_test",
      digestEmailFrom: "Digest <digest@example.com>",
    };
    await expect(assertDigestSendReady(configured)).resolves.toEqual(["you@epiphoric.com"]);
  });

  it("throws when send-intended but zero recipients", async () => {
    vi.mocked(resolveDigestRecipients).mockResolvedValue([]);
    const configured = {
      ...base,
      resendApiKey: "re_test",
      digestEmailFrom: "Digest <digest@example.com>",
    };
    await expect(assertDigestSendReady(configured)).rejects.toThrow(/zero deliverable recipients/);
  });

  it("propagates Firestore read failures", async () => {
    vi.mocked(resolveDigestRecipients).mockRejectedValue(
      new Error("Firestore subscriber read failed: Cannot find module '@google-cloud/firestore'"),
    );
    const configured = {
      ...base,
      resendApiKey: "re_test",
      digestEmailFrom: "Digest <digest@example.com>",
    };
    await expect(assertDigestSendReady(configured)).rejects.toThrow(/Firestore subscriber read failed/);
  });
});
