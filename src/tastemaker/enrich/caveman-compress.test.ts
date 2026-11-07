import { describe, it, expect, vi } from "vitest";
import {
  compressEnrichmentProse,
  compressEnrichmentText,
  compressEnrichmentBundle,
  compressEnrichmentBundles,
  applyEnrichCompressIfEnabled,
  validateCompressedEnrichment,
} from "./caveman-compress.js";
import type { EnrichmentBundle } from "./types.js";

/** Verbose Firecrawl + HN style bundle (marketing filler, nav, repeated hooks). */
export const VERBOSE_ENRICH_FIXTURE = `[Web (Firecrawl deep)]
Welcome to the future of developer productivity. Discover the seamless way to build AI agents.

Home | About | Docs | Pricing | Sign in | Subscribe to our newsletter

## acme/agent-kit v2.4.1 (2026-10-01)

Release highlights: \`npm install @acme/agent-kit\` adds MCP tools for Claude Code.

\`\`\`bash
git clone https://github.com/acme/agent-kit
cd agent-kit && npm run build
\`\`\`

Read more at https://github.com/acme/agent-kit/releases/tag/v2.4.1 — 1,240 stars this week.

We are excited to empower teams with cutting-edge, world-class automation.

Privacy Policy | Cookie settings | All rights reserved.

[Hacker News]
1. Show HN: agent-kit – MCP server for repo automation (https://news.ycombinator.com/item?id=991122) — 87 pts, 34 comments
2. Ask HN: best MCP patterns for 2026?

Welcome to the future of developer productivity. Discover the seamless way to build AI agents.`;

describe("compressEnrichmentProse", () => {
  it("is a no-op when flag path is off (empty input)", () => {
    expect(compressEnrichmentProse("")).toBe("");
    expect(compressEnrichmentText("")).toEqual({ text: "", fallback: false });
  });

  it("keeps facts, links, code, paths, names, numbers, and dates", () => {
    const compressed = compressEnrichmentProse(VERBOSE_ENRICH_FIXTURE);
    expect(compressed).toContain("https://github.com/acme/agent-kit");
    expect(compressed).toContain("https://github.com/acme/agent-kit/releases/tag/v2.4.1");
    expect(compressed).toContain("https://news.ycombinator.com/item?id=991122");
    expect(compressed).toContain("npm install @acme/agent-kit");
    expect(compressed).toContain("git clone https://github.com/acme/agent-kit");
    expect(compressed).toContain("acme/agent-kit");
    expect(compressed).toContain("v2.4.1");
    expect(compressed).toContain("2026-10-01");
    expect(compressed).toContain("87 pts");
    expect(compressed).toContain("Show HN:");
  });

  it("drops nav, marketing filler, and repetition on a realistic fixture", () => {
    const compressed = compressEnrichmentProse(VERBOSE_ENRICH_FIXTURE);
    expect(compressed.length).toBeLessThan(VERBOSE_ENRICH_FIXTURE.length * 0.72);
    expect(compressed).not.toMatch(/Privacy Policy/i);
    expect(compressed).not.toMatch(/Cookie settings/i);
    expect(compressed).not.toMatch(/Welcome to the future of developer productivity/);
    expect(compressed.split("Welcome to the future").length).toBe(1);
  });

  it("falls back when compression would drop a URL", () => {
    const original = "See https://example.com/a for details.";
    const broken = "See for details.";
    expect(validateCompressedEnrichment(original, broken)).toContain("url removed");
    const result = compressEnrichmentText(original);
    expect(result.fallback).toBe(false);
    expect(result.text).toContain("https://example.com/a");
  });

  it("falls back on thrown errors", () => {
    const spy = vi.spyOn(String.prototype, "trim").mockImplementation(function (this: string) {
      throw new Error("boom");
    });
    const result = compressEnrichmentText("keep https://x.test/1 and 42");
    expect(result.fallback).toBe(true);
    expect(result.text).toContain("https://x.test/1");
    spy.mockRestore();
  });
});

describe("compressEnrichmentBundle", () => {
  it("compresses combined bundle and reports char delta", () => {
    const bundle: EnrichmentBundle = {
      full_name: "acme/agent-kit",
      sources: [
        { kind: "web", label: "Web (Firecrawl deep)", text: VERBOSE_ENRICH_FIXTURE.split("\n\n[")[0]!.replace("[Web (Firecrawl deep)]\n", "") },
        {
          kind: "hn",
          label: "Hacker News",
          text: VERBOSE_ENRICH_FIXTURE.split("[Hacker News]\n")[1] ?? "",
        },
      ],
      combined_text: VERBOSE_ENRICH_FIXTURE,
      fetched_at: "2026-10-10T12:00:00.000Z",
      errors: [],
    };
    const { bundle: out, stats } = compressEnrichmentBundle(bundle, 2400);
    expect(stats.chars_after).toBeLessThan(stats.chars_before);
    expect(out.combined_text.length).toBe(stats.chars_after);
    expect(out.combined_text).toContain("Show HN:");
  });
});

describe("applyEnrichCompressIfEnabled", () => {
  it("returns bundles unchanged when flag is off", () => {
    const bundles = new Map<string, EnrichmentBundle>([
      [
        "acme/x",
        {
          full_name: "acme/x",
          sources: [],
          combined_text: VERBOSE_ENRICH_FIXTURE,
          fetched_at: "2026-10-10T12:00:00.000Z",
          errors: [],
        },
      ],
    ]);
    const { bundles: out, compress } = applyEnrichCompressIfEnabled(
      { enrichCompress: false, enrichMaxChars: 2400 },
      bundles,
    );
    expect(compress).toBeUndefined();
    expect(out.get("acme/x")?.combined_text).toBe(VERBOSE_ENRICH_FIXTURE);
  });

  it("compresses when flag is on", () => {
    const bundles = new Map<string, EnrichmentBundle>([
      [
        "acme/agent-kit",
        {
          full_name: "acme/agent-kit",
          sources: [{ kind: "web", label: "Web", text: VERBOSE_ENRICH_FIXTURE }],
          combined_text: VERBOSE_ENRICH_FIXTURE,
          fetched_at: "2026-10-10T12:00:00.000Z",
          errors: [],
        },
      ],
    ]);
    const { bundles: out, compress } = applyEnrichCompressIfEnabled(
      { enrichCompress: true, enrichMaxChars: 2400 },
      bundles,
    );
    expect(compress?.chars_after_total).toBeLessThan(compress!.chars_before_total);
    expect(out.get("acme/agent-kit")!.combined_text.length).toBeLessThan(VERBOSE_ENRICH_FIXTURE.length);
  });
});

describe("compressEnrichmentBundles", () => {
  it("aggregates stats across repos", () => {
    const bundles = new Map<string, EnrichmentBundle>([
      [
        "a/r",
        {
          full_name: "a/r",
          sources: [{ kind: "web", label: "Web", text: VERBOSE_ENRICH_FIXTURE }],
          combined_text: VERBOSE_ENRICH_FIXTURE,
          fetched_at: "2026-10-10T12:00:00.000Z",
          errors: [],
        },
      ],
    ]);
    const { result } = compressEnrichmentBundles(bundles, 2400);
    expect(result.bundles_compressed).toBe(1);
    expect(result.chars_after_total).toBeLessThan(result.chars_before_total);
  });
});
