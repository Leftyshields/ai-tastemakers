import { describe, it, expect } from "vitest";
import {
  aggregateTokenUsage,
  joinRubricToEntries,
  dedupeTokenEntries,
  renderTokenUsageDashboardHtml,
} from "../../../scripts/lab/aggregate-token-usage.js";
import type { TokenUsageLogEntry } from "../../src/tastemaker/quality/tokens.js";

const escapeHtml = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

describe("aggregate-token-usage", () => {
  it("aggregates extended daily and shadow comparisons", () => {
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
        prompt_chars: 42000,
        latency_ms_total: 9000,
        latency_ms_avg: 900,
        enrich_chars_total: 7200,
        estimated_usd: 0.06,
        chars_per_input_token: 4.2,
        rubric: {
          full_name: "o/r",
          pass: true,
          why_now: 5,
          specificity: 4,
          build_with_it: 4,
          accuracy: 4,
        },
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
        flags: { enrich_web: true, structured_context: false, ponytail: false },
        repos_narrated: 10,
        repos_failed: 0,
        input_tokens: 11000,
        output_tokens: 2200,
        output_words: 900,
        prompt_chars: 40000,
        latency_ms_total: 8000,
        latency_ms_avg: 800,
        enrich_chars_total: 7200,
        estimated_usd: 0.066,
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
        flags: { enrich_web: true, structured_context: true, ponytail: true },
        repos_narrated: 10,
        repos_failed: 0,
        input_tokens: 10500,
        output_tokens: 1800,
        output_words: 700,
        prompt_chars: 45000,
        latency_ms_total: 7500,
        latency_ms_avg: 750,
        enrich_chars_total: 7200,
        estimated_usd: 0.0585,
        per_repo: [],
      },
    ];

    const data = aggregateTokenUsage(entries);
    expect(data.daily[0].prompt_chars).toBe(42000);
    expect(data.daily[0].enrich_chars).toBe(7200);
    expect(data.daily[0].rubric_pass_count).toBe(1);
    expect(data.shadow_comparisons[0].control_prompt_chars).toBe(40000);
    expect(data.shadow_comparisons[0].treatment_prompt_chars).toBe(45000);
    expect(data.shadow_comparisons[0].output_token_delta).toBe(-400);
  });

  it("joinRubricToEntries attaches rubric by date and edition", () => {
    const joined = joinRubricToEntries(
      [
        {
          logged_at: "2026-08-02T12:00:00.000Z",
          run_id: "run-a",
          edition: "skills",
          date: "2026-08-02",
          model: "claude-sonnet-4-6",
          variant: "single",
          shadow: false,
          flags: { enrich_web: true, structured_context: false, ponytail: false },
          repos_narrated: 1,
          repos_failed: 0,
          input_tokens: 100,
          output_tokens: 20,
          output_words: 10,
          prompt_chars: 400,
          latency_ms_total: 500,
          latency_ms_avg: 500,
          enrich_chars_total: 100,
          estimated_usd: 0.001,
          per_repo: [],
        },
      ],
      [
        {
          scored_at: "2026-08-02T12:00:01.000Z",
          edition: "skills",
          date: "2026-08-02",
          full_name: "o/r",
          pass: true,
          scores: {
            accuracy: 4,
            specificity: 4,
            why_now: 5,
            build_with_it: 4,
            noise: 4,
            comment: "",
          },
        },
      ],
    );
    expect(joined[0].rubric?.why_now).toBe(5);
  });

  it("dedupeTokenEntries prefers api logs over digest estimates", () => {
    const api: TokenUsageLogEntry = {
      logged_at: "2026-08-03T12:00:00.000Z",
      run_id: "live",
      edition: "skills",
      date: "2026-08-02",
      model: "claude-sonnet-4-6",
      variant: "single",
      shadow: false,
      metrics_source: "api",
      flags: { enrich_web: true, structured_context: false, ponytail: false },
      repos_narrated: 10,
      repos_failed: 0,
      input_tokens: 9000,
      output_tokens: 1800,
      output_words: 700,
      prompt_chars: 38000,
      latency_ms_total: 8000,
      latency_ms_avg: 800,
      enrich_chars_total: 7200,
      estimated_usd: 0.05,
      per_repo: [],
    };
    const estimate: TokenUsageLogEntry = {
      ...api,
      logged_at: "2026-08-02T12:00:00.000Z",
      run_id: "backfill",
      metrics_source: "digest_estimate",
      output_tokens: 1500,
    };
    const deduped = dedupeTokenEntries([estimate, api]);
    expect(deduped.filter((e) => e.variant === "single")).toHaveLength(1);
    expect(deduped.find((e) => e.variant === "single")?.output_tokens).toBe(1800);
  });

  it("renderTokenUsageDashboardHtml includes daily table rows", () => {
    const data = aggregateTokenUsage([
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
        prompt_chars: 42000,
        latency_ms_total: 9000,
        latency_ms_avg: 900,
        enrich_chars_total: 7200,
        estimated_usd: 0.06,
        per_repo: [],
      },
    ]);
    const html = renderTokenUsageDashboardHtml(
      { schema_version: 1, generated_at: "2026-08-02T20:00:00.000Z", ...data },
      escapeHtml,
    );
    expect(html).toContain("Daily statistics");
    expect(html).toContain("2026-08-02");
    expect(html).toContain("2,000");
  });
});
