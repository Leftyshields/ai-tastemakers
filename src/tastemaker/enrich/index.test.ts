import { describe, it, expect, vi } from "vitest";
import { enrichExternalContext, applyExternalContext } from "./index.js";
import type { ScoredRepo } from "../types.js";

const sampleRepo: ScoredRepo = {
  full_name: "acme/demo",
  html_url: "https://github.com/acme/demo",
  stars: 100,
  stars_gained_7d: 12,
  topics: ["llm"],
  language: "TS",
  description: "A demo tool",
  pushed_at: "2026-06-01T00:00:00Z",
  readme_excerpt: "README content",
  score: 12,
};

describe("enrichExternalContext", () => {
  it("merges web and hn snippets for top repos", async () => {
    const fetchFn = vi.fn(async (url: string) => {
      if (url.includes("jina.ai")) {
        return { ok: true, text: async () => "Web page text" };
      }
      return {
        ok: true,
        json: async () => ({
          hits: [{ title: "HN thread", points: 10, num_comments: 2 }],
        }),
      };
    });

    const bundles = await enrichExternalContext([sampleRepo], {
      maxRepos: 1,
      maxChars: 1500,
      fetchFn,
    });

    const bundle = bundles.get("acme/demo");
    expect(bundle?.combined_text).toContain("Web page text");
    expect(bundle?.combined_text).toContain("HN thread");
    expect(bundle?.sources).toHaveLength(2);
  });

  it("caps repos at maxRepos", async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: true, text: async () => "x" });
    const repos = [
      sampleRepo,
      { ...sampleRepo, full_name: "acme/two", html_url: "https://github.com/acme/two" },
    ];
    const bundles = await enrichExternalContext(repos, {
      maxRepos: 1,
      maxChars: 500,
      fetchFn,
    });
    expect(bundles.size).toBe(1);
    expect(bundles.has("acme/demo")).toBe(true);
  });
});

describe("applyExternalContext", () => {
  it("sets external_context from bundle combined_text", () => {
    const bundles = new Map([
      [
        "acme/demo",
        {
          full_name: "acme/demo",
          sources: [],
          combined_text: "External snippets",
          fetched_at: "2026-06-28T00:00:00Z",
          errors: [],
        },
      ],
    ]);
    const enriched = applyExternalContext([sampleRepo], bundles);
    expect(enriched[0].external_context).toBe("External snippets");
  });
});
