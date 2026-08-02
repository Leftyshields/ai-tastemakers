import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import {
  buildTokenLogEntry,
  countWords,
  sumTokenUsage,
  appendTokenLog,
  readTokenLog,
} from "./tokens.js";
import type { NarrationResult } from "../narrate/claude.js";

describe("quality/tokens", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "tokens-"));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("countWords handles empty and multi-word strings", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("one two three")).toBe(3);
  });

  it("sumTokenUsage aggregates usage objects", () => {
    expect(
      sumTokenUsage([
        { input_tokens: 100, output_tokens: 50 },
        { input_tokens: 200, output_tokens: 30 },
        undefined,
      ]),
    ).toEqual({ input_tokens: 300, output_tokens: 80 });
  });

  it("buildTokenLogEntry summarizes extended narration metrics", () => {
    const results = new Map<string, NarrationResult>([
      [
        "acme/one",
        {
          brief: "Hello world",
          usage: { input_tokens: 1000, output_tokens: 120 },
          prompt_chars: 4200,
          latency_ms: 900,
        },
      ],
      ["acme/two", { brief: null, prompt_chars: 3800, latency_ms: 700 }],
    ]);
    const entry = buildTokenLogEntry({
      run_id: "run-1",
      edition: "skills",
      date: "2026-08-02",
      model: "claude-sonnet-4-6",
      variant: "treatment",
      shadow: true,
      flags: { enrich_web: true, structured_context: true, ponytail: true },
      results,
      enrich_chars: new Map([["acme/one", 2400], ["acme/two", 0]]),
      readme_chars: new Map([["acme/one", 1800], ["acme/two", 1500]]),
      rubric: {
        scored_at: "2026-08-02T12:00:00.000Z",
        edition: "skills",
        date: "2026-08-02",
        full_name: "acme/one",
        pass: true,
        scores: {
          accuracy: 4,
          specificity: 4,
          why_now: 5,
          build_with_it: 4,
          noise: 4,
          comment: "ok",
        },
      },
    });
    expect(entry.output_tokens).toBe(120);
    expect(entry.prompt_chars).toBe(8000);
    expect(entry.enrich_chars_total).toBe(2400);
    expect(entry.latency_ms_avg).toBe(800);
    expect(entry.estimated_usd).toBeGreaterThan(0);
    expect(entry.chars_per_input_token).toBe(8);
    expect(entry.rubric?.why_now).toBe(5);
    expect(entry.per_repo[0].enrich_chars).toBe(2400);
  });

  it("appendTokenLog and readTokenLog round-trip", async () => {
    const entry = buildTokenLogEntry({
      run_id: "run-2",
      edition: "oss",
      date: "2026-08-02",
      model: "claude-sonnet-4-6",
      variant: "single",
      shadow: false,
      flags: { enrich_web: false, structured_context: false, ponytail: false },
      results: new Map([
        [
          "o/r",
          {
            brief: "Brief text here.",
            usage: { input_tokens: 500, output_tokens: 80 },
            prompt_chars: 2100,
            latency_ms: 600,
          },
        ],
      ]),
    });
    await appendTokenLog(tmpDir, entry);
    const rows = await readTokenLog(tmpDir);
    expect(rows).toHaveLength(1);
    expect(rows[0].run_id).toBe("run-2");
    expect(rows[0].prompt_chars).toBe(2100);
  });
});
