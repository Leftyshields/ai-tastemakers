import { describe, it, expect } from "vitest";
import {
  renderDigestEmailHtml,
  renderDigestEmailText,
  renderBriefForEmail,
  renderBriefForPlainText,
  digestEmailSubject,
  digestEmailPreheader,
  rankingModeLabel,
} from "./html.js";
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

describe("renderBriefForEmail", () => {
  it("converts markdown bold to strong tags", () => {
    const html = renderBriefForEmail(
      "**What it does:** A neat tool.\n**Why now:** Timely.\n**Build with it:** Fork it.",
    );
    expect(html).toContain("<strong>What it does:</strong>");
    expect(html).toContain("<strong>Why now:</strong>");
    expect(html).toContain("<strong>Build with it:</strong>");
  });

  it("escapes HTML outside bold segments", () => {
    const html = renderBriefForEmail("Uses a <tool> for builders.");
    expect(html).toContain("Uses a &lt;tool&gt; for builders.");
    expect(html).not.toContain("<tool>");
  });

  it("escapes HTML inside bold segments", () => {
    const html = renderBriefForEmail("**What it does:** Uses a <tool> for builders.");
    expect(html).toContain("<strong>What it does:</strong>");
    expect(html).toContain("Uses a &lt;tool&gt; for builders.");
    expect(html).not.toContain("<tool>");
  });

  it("converts paragraph breaks to br tags", () => {
    const html = renderBriefForEmail(
      "**What it does:** First.\n\n**Why now:** Second.",
    );
    expect(html).toContain("<strong>What it does:</strong> First.<br><br>");
    expect(html).toContain("<strong>Why now:</strong> Second.");
  });
});

describe("renderDigestEmailHtml", () => {
  it("escapes HTML in brief text", () => {
    const html = renderDigestEmailHtml(sampleDigest, "2026-06-06", "https://example.com/app");
    expect(html).toContain("A neat &lt;tool&gt; for builders.");
    expect(html).not.toContain("<tool>");
  });

  it("renders bold labels in structured briefs", () => {
    const digest: Digest = {
      ...sampleDigest,
      repos: [
        {
          ...sampleDigest.repos[0],
          brief:
            "**What it does:** Demo.\n\n**Why now:** Hot.\n\n**Build with it:** Ship it.",
        },
      ],
    };
    const html = renderDigestEmailHtml(digest, "2026-06-07", "https://example.com/app");
    expect(html).toContain("<strong>What it does:</strong>");
    expect(html).toContain("<br><br>");
    expect(html).not.toContain("**What it does:**");
  });

  it("includes read online link", () => {
    const html = renderDigestEmailHtml(sampleDigest, "2026-06-06", "https://example.com/app");
    expect(html).toContain("https://example.com/app/briefings/2026-06-06.html");
  });

  it("uses human-readable ranking meta line", () => {
    const digest: Digest = {
      ...sampleDigest,
      ranking_mode: "bootstrap_since_first_seen",
    };
    const html = renderDigestEmailHtml(digest, "2026-06-07", "https://example.com/app");
    expect(html).toContain("ranked by recent momentum (bootstrap week)");
    expect(html).not.toContain("bootstrap_since_first_seen");
  });

  it("includes preheader and unsubscribe footer", () => {
    const html = renderDigestEmailHtml(sampleDigest, "2026-06-06", "https://example.com/app");
    expect(html).toContain("builder-focused briefs");
    expect(html).toContain("https://example.com/app/unsubscribe.html");
    expect(html).toContain("Unsubscribe");
    expect(html).not.toContain("Reply to any email");
  });

  it("limits topics shown per repo", () => {
    const digest: Digest = {
      ...sampleDigest,
      repos: [
        {
          ...sampleDigest.repos[0],
          topics: ["a", "b", "c", "d", "e", "f", "g", "h"],
        },
      ],
    };
    const html = renderDigestEmailHtml(digest, "2026-06-06", "https://example.com/app");
    expect(html).toContain("a, b, c, d, e…");
    expect(html).not.toContain(", f");
  });
});

describe("renderDigestEmailText", () => {
  it("renders plain-text multipart body", () => {
    const text = renderDigestEmailText(sampleDigest, "2026-06-06", "https://example.com/app");
    expect(text).toContain("ranked by 7-day star growth");
    expect(text).toContain("Read online:");
    expect(text).toContain("Unsubscribe: https://example.com/app/unsubscribe.html");
    expect(text).not.toContain("<strong>");
  });
});

describe("rankingModeLabel", () => {
  it("maps bootstrap modes to friendly copy", () => {
    expect(rankingModeLabel("bootstrap_since_first_seen")).toContain("recent momentum");
    expect(rankingModeLabel("delta_7d")).toContain("7-day star growth");
  });
});

describe("digestEmailPreheader", () => {
  it("mentions top repo when present", () => {
    expect(digestEmailPreheader(sampleDigest)).toContain("Led by acme/demo");
  });
});

describe("renderBriefForPlainText", () => {
  it("strips markdown bold markers", () => {
    expect(renderBriefForPlainText("**What it does:** Demo.")).toBe("What it does: Demo.");
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
