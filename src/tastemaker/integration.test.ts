import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import type { AppConfig, CandidateRepo } from "./types.js";
import { runPipeline } from "./pipeline.js";

const mockCandidates: CandidateRepo[] = [
  {
    full_name: "acme/one",
    html_url: "https://github.com/acme/one",
    stars: 100,
    topics: ["llm"],
    description: "First project",
    pushed_at: "2026-06-01T00:00:00Z",
    language: "TypeScript",
    is_fork: false,
    is_archived: false,
    readme_excerpt: "Does AI things.",
  },
  {
    full_name: "acme/two",
    html_url: "https://github.com/acme/two",
    stars: 80,
    topics: ["mcp"],
    description: "Second project",
    pushed_at: "2026-06-02T00:00:00Z",
    language: "Python",
    is_fork: false,
    is_archived: false,
  },
];

describe("runPipeline integration", () => {
  let tmpDir: string;
  let config: AppConfig;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "tastemaker-"));
    config = {
      githubToken: "test-token",
      anthropicApiKey: "test-key",
      anthropicModel: "claude-test",
      timezone: "UTC",
      topN: 2,
      minStars: 50,
      pushedWithinDays: 30,
      topics: ["llm", "mcp", "ai-agent", "openai", "claude", "langchain", "ai-tools"],
      searchPagesPerTopic: 1,
      blocklist: new Set(["langchain-ai/langchain"]),
      maxStarsBootstrap: 80000,
      softDedupBriefingCount: 3,
      softDedupPenalty: 0.8,
      readmeMaxChars: 1000,
      rootDir: tmpDir,
      snapshotPath: path.join(tmpDir, "data/snapshots/repos.jsonl"),
      briefingsDir: path.join(tmpDir, "briefings"),
      digestEmailTo: [],
      digestSiteUrl: "https://example.com",
      editionId: "oss",
      editionName: "AI Tastemakers",
    };
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("writes markdown and json with mocked external services", async () => {
    const fixedNow = new Date("2026-06-06T14:00:00.000Z");

    const result = await runPipeline(config, {
      now: fixedNow,
      search: vi.fn().mockResolvedValue({
        candidates: mockCandidates,
        succeededTopics: config.topics,
        failedTopics: [],
      }),
      enrich: vi.fn(async (_c, candidates) => candidates),
      narrate: vi.fn().mockResolvedValue(
        new Map([
          ["acme/one", "Brief one."],
          ["acme/two", "Brief two."],
        ]),
      ),
    });

    expect(result.digest.repos).toHaveLength(2);
    expect(result.digest.repos[0].brief).toBe("Brief one.");

    const md = await fs.readFile(result.markdownPath, "utf-8");
    expect(md).toContain("acme/one");
    expect(md).toContain("Brief one.");

    const json = JSON.parse(await fs.readFile(result.jsonPath, "utf-8"));
    expect(json.schema_version).toBe(1);

    const snapshots = await fs.readFile(config.snapshotPath, "utf-8");
    expect(snapshots).toContain("acme/one");
  });
});
