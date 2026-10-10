import { describe, it, expect, vi } from "vitest";
import type { AppConfig } from "../types.js";
import type { CandidateRepo } from "../types.js";
import { discoverCandidates } from "./discover.js";
import { GitHubClient } from "./client.js";
import * as searchMod from "./search.js";
import * as extraMod from "./skills-extra-discovery.js";

function baseConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    githubToken: "token",
    anthropicApiKey: "key",
    anthropicModel: "claude-test",
    timezone: "UTC",
    topN: 10,
    minStars: 30,
    pushedWithinDays: 30,
    topics: ["claude-code"],
    searchPagesPerTopic: 2,
    blocklist: new Set(),
    maxStarsBootstrap: 25_000,
    softDedupBriefingCount: 5,
    softDedupPenalty: 0.5,
    readmeMaxChars: 4000,
    rootDir: "/repo",
    snapshotPath: "/repo/data/snapshots/skills-repos.jsonl",
    briefingsDir: "/repo/briefings/skills",
    digestSiteUrl: "https://example.com",
    editionId: "skills",
    editionName: "Skill Tastemakers",
    enrichWeb: false,
    enrichShadow: false,
    enrichMaxRepos: 3,
    enrichMaxChars: 1500,
    enrichWebProvider: "jina",
    enrichWebDeep: true,
    enrichReddit: true,
    qualityRubric: false,
    narrateStructuredContext: false,
    narratePonytail: false,
    skillsExtraDiscovery: true,
    humanizerPolish: false,
    enrichCompress: false,
    ...overrides,
  };
}

const repo = (full_name: string, topics: string[] = []): CandidateRepo => ({
  full_name,
  html_url: `https://github.com/${full_name}`,
  stars: 50_000,
  topics,
  description: null,
  pushed_at: "2026-09-01T00:00:00Z",
  language: "TypeScript",
  is_fork: false,
  is_archived: false,
});

describe("discoverCandidates", () => {
  it("merges topic and extra discovery for skills when enabled", async () => {
    const topicSpy = vi.spyOn(searchMod, "searchByTopics").mockResolvedValue({
      candidates: [repo("DietrichGebert/ponytail", ["claude-code"])],
      succeededTopics: ["claude-code"],
      failedTopics: [],
    });
    const extraSpy = vi.spyOn(extraMod, "searchSkillsExtraDiscovery").mockResolvedValue({
      candidates: [
        repo("mattpocock/skills"),
        repo("DietrichGebert/ponytail", ["agent-skills"]),
      ],
      succeededQueries: ["topic:skills", 'SKILL.md in:readme'],
      failedQueries: [],
    });

    const client = new GitHubClient("token");
    const result = await discoverCandidates(client, baseConfig());

    expect(result.candidates.map((c) => c.full_name).sort()).toEqual([
      "DietrichGebert/ponytail",
      "mattpocock/skills",
    ]);
    expect(result.skillsExtraDiscovery?.addedUnique).toBe(1);
    topicSpy.mockRestore();
    extraSpy.mockRestore();
  });

  it("skips extra discovery for OSS edition", async () => {
    const topicSpy = vi.spyOn(searchMod, "searchByTopics").mockResolvedValue({
      candidates: [repo("acme/oss")],
      succeededTopics: ["llm"],
      failedTopics: [],
    });
    const extraSpy = vi.spyOn(extraMod, "searchSkillsExtraDiscovery");

    const client = new GitHubClient("token");
    const result = await discoverCandidates(
      client,
      baseConfig({ editionId: "oss", skillsExtraDiscovery: false, topics: ["llm"] }),
    );

    expect(result.candidates).toHaveLength(1);
    expect(extraSpy).not.toHaveBeenCalled();
    topicSpy.mockRestore();
    extraSpy.mockRestore();
  });

  it("falls back to topic-only when extra discovery throws", async () => {
    vi.spyOn(searchMod, "searchByTopics").mockResolvedValue({
      candidates: [repo("only/topics")],
      succeededTopics: ["claude-code"],
      failedTopics: [],
    });
    vi.spyOn(extraMod, "searchSkillsExtraDiscovery").mockRejectedValue(
      new Error("GitHub API 403 rate limit"),
    );

    const client = new GitHubClient("token");
    const result = await discoverCandidates(client, baseConfig());

    expect(result.candidates).toHaveLength(1);
    expect(result.candidates[0].full_name).toBe("only/topics");
    expect(result.skillsExtraDiscovery?.addedUnique).toBe(0);
    vi.restoreAllMocks();
  });
});
