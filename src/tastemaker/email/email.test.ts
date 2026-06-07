import { describe, it, expect } from "vitest";
import { renderDigestEmailHtml, digestEmailSubject } from "./html.js";
import { shouldSendDigestEmail, parseEmailList } from "./resend.js";
import type { AppConfig, Digest } from "../types.js";

const sampleDigest: Digest = {
  schema_version: 1,
  run_id: "test",
  generated_at: "2026-06-06T14:00:00.000Z",
  ranking_mode: "delta_7d",
  topic_queries: ["llm"],
  repos: [
    {
      rank: 1,
      full_name: "acme/demo",
      html_url: "https://github.com/acme/demo",
      stars: 100,
      stars_gained_7d: 12,
      topics: ["llm", "mcp"],
      language: "TS",
      brief: "A neat <tool> for builders.",
      pushed_at: "2026-06-01T00:00:00Z",
    },
  ],
};

describe("renderDigestEmailHtml", () => {
  it("escapes HTML in brief text", () => {
    const html = renderDigestEmailHtml(sampleDigest, "2026-06-06", "https://example.com/app");
    expect(html).toContain("A neat &lt;tool&gt; for builders.");
    expect(html).not.toContain("<tool>");
  });

  it("includes read online link", () => {
    const html = renderDigestEmailHtml(sampleDigest, "2026-06-06", "https://example.com/app");
    expect(html).toContain("https://example.com/app/briefings/2026-06-06.html");
  });
});

describe("digestEmailSubject", () => {
  it("includes date label", () => {
    expect(digestEmailSubject("2026-06-06")).toContain("2026-06-06");
  });
});

describe("shouldSendDigestEmail", () => {
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
    digestEmailTo: [],
    digestSiteUrl: "https://example.com",
    editionId: "oss",
    editionName: "AI Tastemakers",
  };

  it("returns false when email env incomplete", async () => {
    await expect(shouldSendDigestEmail(base)).resolves.toBe(false);
  });

  it("returns true when fully configured", async () => {
    await expect(
      shouldSendDigestEmail({
        ...base,
        resendApiKey: "re_test",
        digestEmailFrom: "Digest <digest@example.com>",
        digestEmailTo: ["you@example.com"],
      }),
    ).resolves.toBe(true);
  });
});

describe("parseEmailList", () => {
  it("splits comma-separated addresses", () => {
    expect(parseEmailList("a@x.com, b@y.com")).toEqual(["a@x.com", "b@y.com"]);
  });

  it("returns empty for blank", () => {
    expect(parseEmailList("  ")).toEqual([]);
  });
});
