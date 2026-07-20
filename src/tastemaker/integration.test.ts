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
      enrichWeb: false,
      enrichShadow: false,
      enrichWebProvider: "jina" as const,
      enrichMaxRepos: 3,
      enrichMaxChars: 1500,
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

  it("still writes briefing when digest email fails", async () => {
    config.resendApiKey = "re_test";
    config.digestEmailFrom = "Digest <digest@epiphoric.com>";
    await fs.mkdir(path.join(tmpDir, "data"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "data/subscribers.json"),
      JSON.stringify(["you@epiphoric.com"]),
    );

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
      sendEmail: vi.fn().mockRejectedValue(new Error("Resend API error: invalid bcc")),
    });

    await expect(fs.access(result.markdownPath)).resolves.toBeUndefined();
    await expect(fs.access(result.jsonPath)).resolves.toBeUndefined();
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

  it("writes shadow run instead of briefings when enrichShadow is set", async () => {
    const fixedNow = new Date("2026-06-06T14:00:00.000Z");
    const experimentId = "EXP-20260628-web-enrich-skills";

    await fs.mkdir(path.join(tmpDir, "data/experiments"), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "data/experiments/_template.json"),
      JSON.stringify({
        schema_version: 1,
        id: "EXP-YYYYMMDD-slug",
        hypothesis: "",
        change_summary: "",
        status: "draft",
        edition: "skills",
        baseline_window: { start: "", end: "" },
        treatment_window: { start: "", end: "" },
        change: { flags: {} },
        snapshots: [],
        shadow_runs: [],
        verdict: "",
        keep_change: null,
        notes: "",
      }),
      "utf-8",
    );
    await fs.writeFile(
      path.join(tmpDir, "data/experiments", `${experimentId}.json`),
      JSON.stringify({
        schema_version: 1,
        id: experimentId,
        hypothesis: "test",
        change_summary: "test",
        status: "draft",
        edition: "skills",
        baseline_window: { start: "2026-06-01", end: "2026-06-14" },
        treatment_window: { start: "2026-06-15", end: "2026-06-28" },
        change: { flags: {} },
        snapshots: [],
        shadow_runs: [],
        verdict: "",
        keep_change: null,
        notes: "",
      }),
      "utf-8",
    );

    config.enrichShadow = true;
    config.enrichWeb = true;
    config.experimentId = experimentId;

    const narrateMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Map([
          ["acme/one", "control one"],
          ["acme/two", "control two"],
        ]),
      )
      .mockResolvedValueOnce(
        new Map([
          ["acme/one", "treatment one"],
          ["acme/two", "treatment two"],
        ]),
      );

    const result = await runPipeline(config, {
      now: fixedNow,
      search: vi.fn().mockResolvedValue({
        candidates: mockCandidates,
        succeededTopics: config.topics,
        failedTopics: [],
      }),
      enrich: vi.fn(async (_c, candidates) => candidates),
      externalEnrich: vi.fn().mockResolvedValue(
        new Map([
          [
            "acme/one",
            {
              full_name: "acme/one",
              sources: [{ kind: "web", label: "Web", text: "snippet" }],
              combined_text: "snippet",
              fetched_at: "2026-06-06T14:00:00.000Z",
              errors: [],
            },
          ],
        ]),
      ),
      narrate: narrateMock,
    });

    expect(narrateMock).toHaveBeenCalledTimes(2);

    expect(result.jsonPath).toContain("data/experiments/runs");
    expect(result.jsonPath).toContain("shadow.json");
    expect(result.markdownPath).toBe("");

    const shadow = JSON.parse(await fs.readFile(result.jsonPath, "utf-8"));
    expect(shadow.run_id).toBe(result.digest.run_id);
    expect(shadow.enrich_web_requested).toBe(true);
    expect(shadow.repos).toHaveLength(2);
    expect(shadow.repos[0].brief_control).toBe("control one");
    expect(shadow.repos[0].brief_treatment).toBe("treatment one");
    expect(shadow.repos[0].enrichment_bundle_ref).toBe("acme-one.json");

    await expect(
      fs.access(path.join(path.dirname(result.jsonPath), "acme-one.json")),
    ).resolves.toBeUndefined();

    const briefingDateDir = path.join(config.briefingsDir, "2026-06-06");
    await expect(fs.access(briefingDateDir)).rejects.toThrow();

    const experiment = JSON.parse(
      await fs.readFile(path.join(tmpDir, "data/experiments", `${experimentId}.json`), "utf-8"),
    );
    expect(experiment.shadow_runs).toHaveLength(1);
    expect(experiment.shadow_runs[0].run_id).toBe(result.digest.run_id);
  });

  it("still writes shadow run when experiment registry is missing", async () => {
    config.enrichShadow = true;
    config.experimentId = "EXP-20260628-web-enrich-skills";

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

    expect(result.jsonPath).toContain("shadow.json");
    await expect(fs.access(result.jsonPath)).resolves.toBeUndefined();
  });

  it("narrates once when enrichWeb is on without shadow (production treatment)", async () => {
    config.enrichWeb = true;
    config.enrichShadow = false;

    const narrateMock = vi.fn().mockResolvedValue(
      new Map([
        ["acme/one", structuredBrief],
        ["acme/two", structuredBrief],
      ]),
    );

    await runPipeline(config, {
      now: new Date("2026-06-06T14:00:00.000Z"),
      search: vi.fn().mockResolvedValue({
        candidates: mockCandidates,
        succeededTopics: config.topics,
        failedTopics: [],
      }),
      enrich: vi.fn(async (_c, candidates) => candidates),
      externalEnrich: vi.fn().mockResolvedValue(
        new Map([
          [
            "acme/one",
            {
              full_name: "acme/one",
              sources: [],
              combined_text: "HN snippet",
              fetched_at: "2026-06-06T14:00:00.000Z",
              errors: [],
            },
          ],
        ]),
      ),
      narrate: narrateMock,
    });

    expect(narrateMock).toHaveBeenCalledTimes(1);
    const enrichedArg = narrateMock.mock.calls[0][2] as Array<{ external_context?: string }>;
    expect(enrichedArg[0].external_context).toBe("HN snippet");
  });
});
