import { describe, it, expect } from "vitest";
import { mergeCandidates } from "./github/search.js";
import { computeDelta, resolveRankingMode, scoreForRanking } from "./snapshot/delta.js";
import { filterCandidates, excludeNegativeDelta, applyBootstrapMaxStars } from "./rank/filter.js";
import { applySoftDedupPenalty } from "./rank/score.js";
import { renderMarkdown } from "./writers/markdown.js";
import type { CandidateRepo, Digest } from "./types.js";

describe("mergeCandidates", () => {
  it("dedupes by full_name and merges topics", () => {
    const a: CandidateRepo = {
      full_name: "o/r",
      html_url: "https://github.com/o/r",
      stars: 100,
      topics: ["llm"],
      description: "a",
      pushed_at: "2026-06-01T00:00:00Z",
      language: "TS",
      is_fork: false,
      is_archived: false,
    };
    const b: CandidateRepo = { ...a, topics: ["mcp"], stars: 120 };
    const merged = mergeCandidates([[a], [b]]);
    expect(merged).toHaveLength(1);
    expect(merged[0].stars).toBe(120);
    expect(merged[0].topics.sort()).toEqual(["llm", "mcp"]);
  });
});

describe("computeDelta", () => {
  it("computes 7d delta when baseline exists", () => {
    const now = new Date("2026-06-08T12:00:00Z");
    const result = computeDelta(
      [
        { full_name: "o/r", stars: 100, observed_at: "2026-05-30T12:00:00Z" },
        { full_name: "o/r", stars: 150, observed_at: "2026-06-07T12:00:00Z" },
      ],
      200,
      now,
    );
    expect(result.has7dBaseline).toBe(true);
    expect(result.stars_gained_7d).toBe(100);
  });

  it("uses sinceFirstSeen when no 7d baseline", () => {
    const now = new Date("2026-06-03T12:00:00Z");
    const result = computeDelta(
      [{ full_name: "o/r", stars: 50, observed_at: "2026-06-01T12:00:00Z" }],
      80,
      now,
    );
    expect(result.has7dBaseline).toBe(false);
    expect(result.sinceFirstSeen).toBe(30);
  });
});

describe("resolveRankingMode", () => {
  it("prefers delta_7d when half have baseline", () => {
    const mode = resolveRankingMode(
      [
        { stars_gained_7d: 10, has7dBaseline: true, sinceFirstSeen: 10 },
        { stars_gained_7d: 5, has7dBaseline: true, sinceFirstSeen: 5 },
        { stars_gained_7d: 0, has7dBaseline: false, sinceFirstSeen: 0 },
      ],
      [100, 200, 50],
    );
    expect(mode).toBe("delta_7d");
  });

  it("falls back to bootstrap_total_stars", () => {
    const mode = resolveRankingMode(
      [{ stars_gained_7d: 0, has7dBaseline: false, sinceFirstSeen: 0 }],
      [500],
    );
    expect(mode).toBe("bootstrap_total_stars");
  });
});

describe("filterCandidates", () => {
  const base: CandidateRepo = {
    full_name: "o/r",
    html_url: "https://github.com/o/r",
    stars: 100,
    topics: [],
    description: null,
    pushed_at: "2026-06-01T00:00:00Z",
    language: null,
    is_fork: false,
    is_archived: false,
  };

  it("excludes blocklisted repos", () => {
    const blocklist = new Set(["o/r"]);
    expect(filterCandidates([base], { minStars: 50, blocklist, excludeArchived: true })).toHaveLength(0);
  });

  it("excludes repos above maxStars when set", () => {
    const big = { ...base, stars: 100_000 };
    expect(
      filterCandidates([big], { minStars: 50, blocklist: new Set(), excludeArchived: true, maxStars: 80_000 }),
    ).toHaveLength(0);
  });
});

describe("applyBootstrapMaxStars", () => {
  const base: CandidateRepo = {
    full_name: "o/r",
    html_url: "https://github.com/o/r",
    stars: 100_000,
    topics: [],
    description: null,
    pushed_at: "2026-06-01T00:00:00Z",
    language: null,
    is_fork: false,
    is_archived: false,
  };

  it("caps stars in bootstrap modes", () => {
    expect(applyBootstrapMaxStars([base], "bootstrap_total_stars", 80_000)).toHaveLength(0);
    expect(applyBootstrapMaxStars([base], "bootstrap_since_first_seen", 80_000)).toHaveLength(0);
  });

  it("does not cap in delta_7d mode", () => {
    expect(applyBootstrapMaxStars([base], "delta_7d", 80_000)).toHaveLength(1);
  });
});

describe("excludeNegativeDelta", () => {
  it("removes negative deltas in delta_7d mode", () => {
    const result = excludeNegativeDelta(
      [
        { full_name: "a", score: 10, stars_gained_7d: 10 },
        { full_name: "b", score: -5, stars_gained_7d: -5 },
      ],
      "delta_7d",
    );
    expect(result).toHaveLength(1);
    expect(result[0].full_name).toBe("a");
  });
});

describe("applySoftDedupPenalty", () => {
  it("reduces score for recently featured repos", () => {
    const scores = new Map([
      ["a", 100],
      ["b", 100],
    ]);
    const adjusted = applySoftDedupPenalty(scores, new Set(["a"]), 0.8);
    expect(adjusted.get("a")).toBe(80);
    expect(adjusted.get("b")).toBe(100);
  });
});

describe("renderMarkdown", () => {
  it("renders digest with bootstrap note", () => {
    const digest: Digest = {
      schema_version: 1,
      run_id: "test",
      generated_at: "2026-06-06T14:00:00.000Z",
      ranking_mode: "bootstrap_total_stars",
      topic_queries: ["llm"],
      repos: [
        {
          rank: 1,
          full_name: "o/r",
          html_url: "https://github.com/o/r",
          stars: 100,
          stars_gained_7d: 0,
          topics: ["llm"],
          language: "TS",
          brief: "A neat tool.",
          pushed_at: "2026-06-01T00:00:00Z",
        },
      ],
    };
    const md = renderMarkdown(digest, "2026-06-06");
    expect(md).toContain("AI Tastemakers");
    expect(md).toContain("Bootstrap ranking");
    expect(md).toContain("A neat tool.");
  });
});

describe("scoreForRanking", () => {
  it("uses total stars in bootstrap_total_stars mode", () => {
    const delta = { stars_gained_7d: 0, has7dBaseline: false, sinceFirstSeen: 0 };
    expect(scoreForRanking(delta, 500, "bootstrap_total_stars")).toBe(500);
  });
});
