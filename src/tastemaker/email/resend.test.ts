import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Digest } from "../types.js";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

import { parseFromAddress, sendDigestEmail, sendOpsEmail, sendWeeklyDigestEmail } from "./resend.js";

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

describe("sendWeeklyDigestEmail", () => {
  it("sends the week-in-review with subscribers as BCC", async () => {
    const review = {
      schema_version: 1 as const,
      week_id: "2026-W33",
      week_start: "2026-08-10",
      week_end: "2026-08-16",
      days_covered: { oss: 7, skills: 7 },
      stats: {
        unique_repos: { oss: 1, skills: 1 },
        total_stars_gained: { oss: 1, skills: 1 },
        top_topics: { oss: [], skills: [] },
        repeat_repos: { oss: [], skills: [] },
        cross_edition_overlap: [],
        ranking_modes: ["delta_7d" as const],
        standouts: { oss: [], skills: [] },
      },
      narrative: { executive: "Strategy.", generalist: "Stack.", statistician: "Counts." },
      email: {
        verdict: "This week the interesting work was making agents cheaper to run, and making them remember.",
        body: "Monday a memory hub jumped. Stars measure attention, not spend.",
      },
      generated_at: "2026-08-16T12:00:00.000Z",
    };

    await sendWeeklyDigestEmail(baseConfig, review, ["alice@example.com"]);

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "This week the interesting work was making agents cheaper to run, and making them remember.",
        bcc: ["alice@example.com"],
      }),
    );
    expect(sendMock.mock.calls[0][0].html).toContain("The Sunday wrap-up");
    expect(sendMock.mock.calls[0][0].html).not.toContain("The tell");
    expect(sendMock.mock.calls[0][0].html).not.toContain("For executives");
  });
});
