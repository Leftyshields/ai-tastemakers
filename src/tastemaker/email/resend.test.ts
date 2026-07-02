import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Digest } from "../types.js";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

import { parseFromAddress, sendDigestEmail, sendOpsEmail } from "./resend.js";

const sampleDigest: Digest = {
  schema_version: 1,
  run_id: "test",
  generated_at: "2026-06-06T14:00:00.000Z",
  ranking_mode: "delta_7d",
  topic_queries: ["llm"],
  repos: [],
};

const baseConfig = {
  githubToken: "gh",
  anthropicApiKey: "key",
  anthropicModel: "claude",
  timezone: "UTC",
  topN: 10,
  minStars: 50,
  pushedWithinDays: 30,
  topics: [],
  searchPagesPerTopic: 1,
  blocklist: new Set<string>(),
  maxStarsBootstrap: 80000,
  softDedupBriefingCount: 3,
  softDedupPenalty: 0.8,
  readmeMaxChars: 1000,
  rootDir: "/tmp",
  snapshotPath: "/tmp/snap.jsonl",
  briefingsDir: "/tmp/briefings",
  digestSiteUrl: "https://example.com",
  editionId: "oss" as const,
  editionName: "AI Tastemakers",
  resendApiKey: "re_test",
  digestEmailFrom: "AI Tastemakers <digest@epiphoric.com>",
};

beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: "msg_123" }, error: null });
});

describe("parseFromAddress", () => {
  it("parses friendly from format", () => {
    expect(parseFromAddress("AI Tastemakers <digest@epiphoric.com>")).toBe(
      "digest@epiphoric.com",
    );
  });

  it("returns plain address unchanged", () => {
    expect(parseFromAddress("digest@epiphoric.com")).toBe("digest@epiphoric.com");
  });
});

describe("sendDigestEmail", () => {
  it("sends subscribers as BCC so the list is hidden", async () => {
    await sendDigestEmail(
      baseConfig,
      sampleDigest,
      "2026-06-10",
      ["alice@example.com", "bob@example.com"],
    );

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "AI Tastemakers <digest@epiphoric.com>",
        to: ["digest@epiphoric.com"],
        bcc: ["alice@example.com", "bob@example.com"],
      }),
    );
    expect(sendMock.mock.calls[0][0]).not.toHaveProperty("to", [
      "alice@example.com",
      "bob@example.com",
    ]);
  });
});

describe("sendOpsEmail", () => {
  it("sends to a single ops recipient", async () => {
    await sendOpsEmail(baseConfig, {
      to: "ops@example.com",
      subject: "Test alert",
      text: "Hello",
      html: "<p>Hello</p>",
    });

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "AI Tastemakers <digest@epiphoric.com>",
        to: ["ops@example.com"],
        subject: "Test alert",
        text: "Hello",
        html: "<p>Hello</p>",
      }),
    );
    expect(sendMock.mock.calls[0][0]).not.toHaveProperty("bcc");
  });
});
