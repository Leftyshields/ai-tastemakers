import { describe, it, expect, vi, afterEach } from "vitest";
import {
  SKILLS_EXTRA_TOPICS,
  SKILLS_TEXT_SEARCH_TERMS,
  SKILLS_EXTRA_DISCOVERY_BUDGET,
  isGitHubSearchRateLimitError,
  searchSkillsExtraDiscovery,
} from "./skills-extra-discovery.js";
import { GitHubClient } from "./client.js";
import * as searchMod from "./search.js";

describe("skills extra discovery constants", () => {
  it("includes broadened skill-related topics", () => {
    expect(SKILLS_EXTRA_TOPICS).toContain("claude-code-plugin");
    expect(SKILLS_EXTRA_TOPICS).toContain("agent-skills");
    expect(SKILLS_EXTRA_TOPICS).toContain("skills");
  });

  it("documents a modest per-run search budget", () => {
    expect(SKILLS_EXTRA_DISCOVERY_BUDGET.maxSearchRequests).toBe(
      SKILLS_EXTRA_TOPICS.length * SKILLS_EXTRA_DISCOVERY_BUDGET.extraTopicPages +
        SKILLS_TEXT_SEARCH_TERMS.length * SKILLS_EXTRA_DISCOVERY_BUDGET.textSearchPages,
    );
    expect(SKILLS_EXTRA_DISCOVERY_BUDGET.maxSearchRequests).toBeLessThanOrEqual(12);
  });
});

describe("isGitHubSearchRateLimitError", () => {
  it("detects 403 and rate limit messages", () => {
    expect(isGitHubSearchRateLimitError(new Error("GitHub API 403"))).toBe(true);
    expect(isGitHubSearchRateLimitError(new Error("secondary rate limit"))).toBe(true);
    expect(isGitHubSearchRateLimitError(new Error("GitHub API 500"))).toBe(false);
  });
});

describe("searchSkillsExtraDiscovery", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("continues when one query fails and merges successful pages", async () => {
    const paginate = vi.spyOn(searchMod, "paginateRepositorySearch");
    paginate.mockImplementation(async (_client, innerQuery) => {
      if (innerQuery.includes("topic:skills")) {
        return {
          items: [
            {
              full_name: "mattpocock/skills",
              html_url: "https://github.com/mattpocock/skills",
              stars: 40_000,
              topics: [],
              description: null,
              pushed_at: "2026-09-01T00:00:00Z",
              language: null,
              is_fork: false,
              is_archived: false,
            },
          ],
          failed: false,
        };
      }
      if (innerQuery.includes("SKILL.md")) {
        return { items: [], failed: true };
      }
      return { items: [], failed: false };
    });

    const client = new GitHubClient("token");
    const result = await searchSkillsExtraDiscovery(client, 30, "2026-09-01", {
      extraTopicPages: 1,
      textSearchPages: 1,
    });

    expect(result.candidates.some((c) => c.full_name === "mattpocock/skills")).toBe(true);
    expect(result.failedQueries.length).toBeGreaterThan(0);
    expect(result.succeededQueries.length).toBeGreaterThan(0);
  });
});
