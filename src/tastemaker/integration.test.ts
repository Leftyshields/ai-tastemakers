import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import type { AppConfig, CandidateRepo, Digest } from "./types.js";
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
      digestSiteUrl: "https://example.com",
      editionId: "oss",
      editionName: "AI Tastemakers",
    };
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  const structuredBrief =
    "**What it does:** First project.\n\n**Why now:** Timely pick.\n\n**Build with it:** Fork and ship.";

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
          ["acme/one", structuredBrief],
          ["acme/two", structuredBrief],
        ]),
      ),
    });

    expect(result.digest.repos).toHaveLength(2);
    expect(result.digest.repos[0].brief).toBe(structuredBrief);

    const md = await fs.readFile(result.markdownPath, "utf-8");
    expect(md).toContain("acme/one");
    expect(md).toContain("**What it does:**");
    expect(md).toContain("**Why now:**");
    expect(md).toContain("**Build with it:**");

    const json = JSON.parse(await fs.readFile(result.jsonPath, "utf-8"));
    expect(json.schema_version).toBe(1);

    const snapshots = await fs.readFile(config.snapshotPath, "utf-8");
    expect(snapshots).toContain("acme/one");
  });

  it("keeps discovery star counts in digest when enrich returns different values", async () => {
    const fixedNow = new Date("2026-06-06T14:00:00.000Z");

    const result = await runPipeline(config, {
      now: fixedNow,
      search: vi.fn().mockResolvedValue({
        candidates: mockCandidates,
        succeededTopics: config.topics,
        failedTopics: [],
      }),
      enrich: vi.fn(async (_c, candidates) =>
        candidates.map((c) => ({ ...c, stars: c.stars + 1, readme_excerpt: "Fresh README" })),
      ),
      narrate: vi.fn().mockResolvedValue(
        new Map([
          ["acme/one", structuredBrief],
          ["acme/two", structuredBrief],
        ]),
      ),
    });

    expect(result.digest.repos[0].stars).toBe(100);
    expect(result.digest.repos[1].stars).toBe(80);

    const snapshots = (await fs.readFile(config.snapshotPath, "utf-8"))
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as { full_name: string; stars: number });
    const oneSnap = snapshots.find((s) => s.full_name === "acme/one");
    expect(oneSnap?.stars).toBe(100);
    expect(result.digest.repos[0].stars).toBe(oneSnap?.stars);
  });

  it("does not soft-dedup repos from the briefing date being regenerated", async () => {
    const fixedNow = new Date("2026-06-06T14:00:00.000Z");
    const dateDir = path.join(config.briefingsDir, "2026-06-06");
    await fs.mkdir(dateDir, { recursive: true });
    const prior: Digest = {
      schema_version: 1,
      run_id: "prior",
      generated_at: "2026-06-06T10:00:00.000Z",
      ranking_mode: "bootstrap_total_stars",
      topic_queries: ["llm"],
      repos: [
        {
          rank: 1,
          full_name: "acme/one",
          html_url: "https://github.com/acme/one",
          stars: 100,
          stars_gained_7d: 0,
          topics: ["llm"],
          language: "TS",
          brief: "Old brief",
          pushed_at: "2026-06-01T00:00:00Z",
        },
      ],
    };
    await fs.writeFile(path.join(dateDir, "digest.json"), JSON.stringify(prior), "utf-8");

    config.softDedupPenalty = 0.5;

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
          ["acme/one", structuredBrief],
          ["acme/two", structuredBrief],
        ]),
      ),
    });

    expect(result.digest.repos[0].full_name).toBe("acme/one");
    expect(result.digest.repos[1].full_name).toBe("acme/two");
  });

  async function writePriorDigest(date: string, repos: string[]): Promise<void> {
    const dateDir = path.join(config.briefingsDir, date);
    await fs.mkdir(dateDir, { recursive: true });
    const digest: Digest = {
      schema_version: 1,
      run_id: `prior-${date}`,
      generated_at: `${date}T10:00:00.000Z`,
      ranking_mode: "bootstrap_total_stars",
      topic_queries: ["llm"],
      repos: repos.map((full_name, i) => ({
        rank: i + 1,
        full_name,
        html_url: `https://github.com/${full_name}`,
        stars: 100,
        stars_gained_7d: 10,
        topics: ["llm"],
        language: "TS",
        brief: "Old brief",
        pushed_at: "2026-06-01T00:00:00Z",
      })),
    };
    await fs.writeFile(path.join(dateDir, "digest.json"), JSON.stringify(digest), "utf-8");
  }

  it("marks is_new false when repo was featured outside the soft-dedup window", async () => {
    await writePriorDigest("2026-06-01", ["acme/one"]);
    await writePriorDigest("2026-06-02", ["acme/other-a"]);
    await writePriorDigest("2026-06-03", ["acme/other-b"]);
    await writePriorDigest("2026-06-04", ["acme/other-c"]);
    await writePriorDigest("2026-06-05", ["acme/other-d"]);

    const result = await runPipeline(config, {
      now: new Date("2026-06-06T14:00:00.000Z"),
      search: vi.fn().mockResolvedValue({
        candidates: mockCandidates,
        succeededTopics: config.topics,
        failedTopics: [],
      }),
      enrich: vi.fn(async (_c, candidates) => candidates),
      narrate: vi.fn().mockResolvedValue(
        new Map([
          ["acme/one", structuredBrief],
          ["acme/two", structuredBrief],
        ]),
      ),
    });

    const one = result.digest.repos.find((r) => r.full_name === "acme/one");
    const two = result.digest.repos.find((r) => r.full_name === "acme/two");
    expect(one?.is_new).toBe(false);
    expect(two?.is_new).toBe(true);
  });
});
