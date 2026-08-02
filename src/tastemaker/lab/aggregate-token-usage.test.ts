import { describe, it, expect } from "vitest";
import { aggregateTokenUsage } from "../../../scripts/lab/aggregate-token-usage.js";
import type { TokenUsageLogEntry } from "../../src/tastemaker/quality/tokens.js";

describe("aggregate-token-usage", () => {
  it("aggregates daily production runs and shadow comparisons", () => {
    const entries: TokenUsageLogEntry[] = [
      {
        logged_at: "2026-08-02T12:00:00.000Z",
        run_id: "run-a",
        edition: "skills",
        date: "2026-08-02",
        model: "claude-sonnet-4-6",
        variant: "single",
        shadow: false,
        flags: { enrich_web: true, structured_context: false, ponytail: false },
        repos_narrated: 10,
        repos_failed: 0,
        input_tokens: 10000,
        output_tokens: 2000,
        output_words: 800,
        per_repo: [],
      },
      {
        logged_at: "2026-08-02T12:01:00.000Z",
        run_id: "run-b",
        edition: "skills",
        date: "2026-08-02",
        model: "claude-sonnet-4-6",
        variant: "control",
        shadow: true,
        experiment_id: "EXP-test",
        flags: { enrich_web: true, structured_context: false, ponytail: false },
        repos_narrated: 10,
        repos_failed: 0,
        input_tokens: 11000,
        output_tokens: 2200,
        output_words: 900,
        per_repo: [],
      },
      {
        logged_at: "2026-08-02T12:01:30.000Z",
        run_id: "run-b",
        edition: "skills",
        date: "2026-08-02",
        model: "claude-sonnet-4-6",
        variant: "treatment",
        shadow: true,
        experiment_id: "EXP-test",
        flags: { enrich_web: true, structured_context: true, ponytail: true },
        repos_narrated: 10,
        repos_failed: 0,
        input_tokens: 10500,
        output_tokens: 1800,
        output_words: 700,
        per_repo: [],
      },
    ];

    const data = aggregateTokenUsage(entries);
    expect(data.daily).toHaveLength(1);
    expect(data.daily[0].output_tokens).toBe(2000);
    expect(data.shadow_comparisons).toHaveLength(1);
    expect(data.shadow_comparisons[0].output_token_delta).toBe(-400);
    expect(data.shadow_comparisons[0].output_token_delta_pct).toBeCloseTo(-18.2, 0);
  });
});
