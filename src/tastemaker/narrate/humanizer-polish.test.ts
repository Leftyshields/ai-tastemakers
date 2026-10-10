import { describe, it, expect, vi, beforeEach } from "vitest";

const mockCreate = vi.fn();

vi.mock("@anthropic-ai/sdk", () => {
  class MockAnthropic {
    messages = { create: mockCreate };
    constructor(_opts: unknown) {}
  }
  return { default: MockAnthropic };
});

import {
  validatePolishedBrief,
  applyHumanizerPolishToBriefs,
  buildHumanizerPolishPrompt,
  humanizerPolishBriefs,
  itemsFromReposAndBriefs,
  runHumanizerPolishIfEnabled,
} from "./humanizer-polish.js";
import type { ScoredRepo } from "../types.js";

const sampleBrief = [
  "**What it does:** acme/demo is a CLI for batch exports.",
  "**Why now:** A thread on HN discussed it this week at https://news.ycombinator.com/item?id=12345.",
  "**Build with it:** Run `demo export` against a CSV folder.",
].join("\n\n");

describe("validatePolishedBrief", () => {
  it("accepts polish that preserves facts, links, and repo name", () => {
    const polished = [
      "**What it does:** acme/demo is a small command-line tool that batch-exports CSV files for builders who hate manual copy-paste.",
      "**Why now:** HN picked it up this week: https://news.ycombinator.com/item?id=12345.",
      "**Build with it:** Try `demo export` on one folder before scaling up.",
    ].join("\n\n");
    expect(
      validatePolishedBrief(sampleBrief, polished, {
        full_name: "acme/demo",
        html_url: "https://github.com/acme/demo",
      }),
    ).toBeNull();
  });

  it("rejects polish that drops a URL", () => {
    const polished = sampleBrief.replace("https://news.ycombinator.com/item?id=12345", "HN");
    expect(
      validatePolishedBrief(sampleBrief, polished, {
        full_name: "acme/demo",
        html_url: "https://github.com/acme/demo",
      }),
    ).toMatch(/url removed/);
  });

  it("rejects polish that removes the repository name when it was present", () => {
    const polished = sampleBrief.replace(/acme\/demo/g, "this tool");
    expect(
      validatePolishedBrief(sampleBrief, polished, {
        full_name: "acme/demo",
        html_url: "https://github.com/acme/demo",
      }),
    ).toMatch(/repository name removed/);
  });

  it("rejects polish that drops numeric facts", () => {
    const withNumber = sampleBrief.replace(
      "this week",
      "this week after crossing 420 stars",
    );
    const polished = withNumber.replace("420", "many");
    expect(
      validatePolishedBrief(withNumber, polished, {
        full_name: "acme/demo",
        html_url: "https://github.com/acme/demo",
      }),
    ).toMatch(/number removed/);
  });
});

describe("applyHumanizerPolishToBriefs", () => {
  it("falls back per repo when validation fails", () => {
    const items = [
      {
        full_name: "acme/good",
        html_url: "https://github.com/acme/good",
        brief: sampleBrief.replace("acme/demo", "acme/good"),
      },
      {
        full_name: "acme/bad",
        html_url: "https://github.com/acme/bad",
        brief: sampleBrief.replace("acme/demo", "acme/bad"),
      },
    ];
    const polished = new Map([
      [items[0].full_name, items[0].brief.replace("CLI", "command-line tool")],
      [items[1].full_name, "**What it does:** vague hype only."],
    ]);
    const { briefs, validation_fallbacks } = applyHumanizerPolishToBriefs(items, polished);
    expect(briefs.get("acme/good")).toContain("command-line tool");
    expect(briefs.get("acme/bad")).toContain("acme/bad");
    expect(validation_fallbacks.some((f) => f.startsWith("acme/bad:"))).toBe(true);
  });
});

describe("buildHumanizerPolishPrompt", () => {
  it("includes all repos in the user payload", () => {
    const prompt = buildHumanizerPolishPrompt([
      { full_name: "a/one", html_url: "https://github.com/a/one", brief: sampleBrief },
    ]);
    expect(prompt).toContain("a/one");
    expect(prompt).toContain('"repos"');
  });
});

describe("itemsFromReposAndBriefs", () => {
  it("skips repos without a usable brief", () => {
    const repo: ScoredRepo = {
      full_name: "a/r",
      html_url: "https://github.com/a/r",
      stars: 1,
      stars_gained_7d: 0,
      topics: [],
      language: null,
      description: null,
      pushed_at: "2026-06-01",
      score: 1,
    };
    const items = itemsFromReposAndBriefs(
      [repo],
      new Map([
        ["a/r", null],
        ["b/r", sampleBrief],
      ]),
    );
    expect(items).toHaveLength(0);
  });
});

describe("runHumanizerPolishIfEnabled", () => {
  const repo: ScoredRepo = {
    full_name: "acme/demo",
    html_url: "https://github.com/acme/demo",
    stars: 10,
    stars_gained_7d: 1,
    topics: [],
    language: null,
    description: null,
    pushed_at: "2026-06-01",
    score: 1,
  };

  it("is a no-op when humanizerPolish is false", async () => {
    const briefs = new Map([["acme/demo", sampleBrief]]);
    const { briefs: out, polish } = await runHumanizerPolishIfEnabled(
      { humanizerPolish: false, anthropicApiKey: "sk", anthropicModel: "claude-sonnet-4-6" },
      [repo],
      briefs,
    );
    expect(polish).toBeUndefined();
    expect(out).toBe(briefs);
    expect(mockCreate).not.toHaveBeenCalled();
  });
});

describe("humanizerPolishBriefs", () => {
  beforeEach(() => {
    mockCreate.mockReset();
  });

  it("returns originals when flag would be off (empty items)", async () => {
    const result = await humanizerPolishBriefs("sk-test", "claude-sonnet-4-6", []);
    expect(result.batch_failed).toBe(false);
    expect(result.briefs.size).toBe(0);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("falls back on API failure", async () => {
    mockCreate.mockRejectedValue(new Error("network down"));
    const items = [
      {
        full_name: "acme/demo",
        html_url: "https://github.com/acme/demo",
        brief: sampleBrief,
      },
    ];
    const result = await humanizerPolishBriefs("sk-test", "claude-sonnet-4-6", items);
    expect(result.batch_failed).toBe(true);
    expect(result.briefs.get("acme/demo")).toContain("acme/demo");
  });

  it("calls polish and applies validated output", async () => {
    const polished = sampleBrief.replace(
      "CLI for batch exports",
      "command-line batch export tool",
    );
    mockCreate.mockResolvedValue({
      content: [{ type: "text", text: JSON.stringify({ repos: [{ full_name: "acme/demo", brief: polished }] }) }],
      usage: { input_tokens: 5000, output_tokens: 800 },
    });

    const items = [
      {
        full_name: "acme/demo",
        html_url: "https://github.com/acme/demo",
        brief: sampleBrief,
      },
    ];
    const result = await humanizerPolishBriefs("sk-test", "claude-sonnet-4-6", items);
    expect(mockCreate).toHaveBeenCalled();
    expect(result.batch_failed).toBe(false);
    expect(result.usage?.input_tokens).toBe(5000);
    expect(result.briefs.get("acme/demo")).toContain("command-line batch export");
  });
});
