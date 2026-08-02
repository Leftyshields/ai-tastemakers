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

  it("buildTokenLogEntry summarizes narration results", () => {
    const results = new Map<string, NarrationResult>([
      ["acme/one", { brief: "Hello world", usage: { input_tokens: 1000, output_tokens: 120 } }],
      ["acme/two", { brief: null }],
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
    });
    expect(entry.output_tokens).toBe(120);
    expect(entry.output_words).toBe(2);
    expect(entry.repos_failed).toBe(1);
    expect(entry.per_repo[0].full_name).toBe("acme/one");
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
      results: new Map([["o/r", { brief: "Brief text here.", usage: { input_tokens: 500, output_tokens: 80 } }]]),
    });
    await appendTokenLog(tmpDir, entry);
    const rows = await readTokenLog(tmpDir);
    expect(rows).toHaveLength(1);
    expect(rows[0].run_id).toBe("run-2");
  });
});
