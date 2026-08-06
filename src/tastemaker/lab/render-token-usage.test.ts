import { describe, it, expect } from "vitest";
import {
  computeHeadlineStats,
  experimentGoalSentence,
  renderTokenUsagePage,
} from "../../../scripts/lab/render-token-usage.js";
import type { TokenUsageDataFile } from "../../../scripts/lab/aggregate-token-usage.js";
import type { ExperimentRecord } from "../experiments/types.js";

const ponytailExperiment: ExperimentRecord = {
  schema_version: 1,
  id: "EXP-20260802-ponytail-narration-skills",
  hypothesis: "Structured context plus ponytail constraints reduce output tokens.",
  change_summary: "Enable structured context and ponytail on Skills narration.",
  status: "baseline",
  edition: "skills",
  baseline_window: { start: "2026-08-02", end: "2026-08-15" },
  treatment_window: { start: "2026-08-16", end: "2026-08-29" },
  change: { flags: { DIGEST_ENRICH_WEB: "1" } },
  snapshots: [],
  shadow_runs: [],
  verdict: "",
  keep_change: null,
  notes: "",
};

describe("render-token-usage", () => {
  it("experimentGoalSentence explains ponytail baseline in plain language", () => {
    const goal = experimentGoalSentence([ponytailExperiment]);
    expect(goal).toContain("10% cheaper");
    expect(goal).not.toContain("DIGEST_");
  });

  it("computeHeadlineStats reports cost trend and quality", () => {
    const data: TokenUsageDataFile = {
      schema_version: 1,
      generated_at: "2026-08-05T12:00:00.000Z",
      entries: 2,
      daily: [
        {
          date: "2026-08-05",
          edition: "skills",
          runs: 1,
          input_tokens: 1000,
          output_tokens: 500,
          total_tokens: 1500,
          output_words: 400,
          avg_output_tokens_per_repo: 50,
          prompt_chars: 3000,
          avg_latency_ms: 900,
          enrich_chars: 100,
          estimated_usd: 0.08,
          rubric_pass_count: 1,
          rubric_runs: 1,
          shadow_runs: 0,
        },
        {
          date: "2026-08-04",
          edition: "skills",
          runs: 1,
          input_tokens: 1000,
          output_tokens: 600,
          total_tokens: 1600,
          output_words: 450,
          avg_output_tokens_per_repo: 60,
          prompt_chars: 3100,
          avg_latency_ms: 950,
          enrich_chars: 100,
          estimated_usd: 0.1,
          rubric_pass_count: 1,
          rubric_runs: 1,
          shadow_runs: 0,
        },
      ],
      by_experiment: [],
      shadow_comparisons: [],
      recent: [
        {
          logged_at: "2026-08-05T12:00:00.000Z",
          run_id: "run-a",
          edition: "skills",
          date: "2026-08-05",
          model: "claude-sonnet-4-6",
          variant: "single",
          shadow: false,
          flags: { enrich_web: true, structured_context: false, ponytail: false },
          repos_narrated: 10,
          repos_failed: 0,
          input_tokens: 1000,
          output_tokens: 500,
          output_words: 400,
          prompt_chars: 3000,
          latency_ms_total: 9000,
          latency_ms_avg: 900,
          enrich_chars_total: 100,
          estimated_usd: 0.08,
          rubric: {
            full_name: "org/repo",
            pass: true,
            why_now: 4,
            specificity: 5,
            build_with_it: 4,
            accuracy: 4,
          },
          per_repo: [],
        },
        {
          logged_at: "2026-08-04T12:00:00.000Z",
          run_id: "run-b",
          edition: "skills",
          date: "2026-08-04",
          model: "claude-sonnet-4-6",
          variant: "single",
          shadow: false,
          flags: { enrich_web: true, structured_context: false, ponytail: false },
          repos_narrated: 10,
          repos_failed: 0,
          input_tokens: 1000,
          output_tokens: 600,
          output_words: 450,
          prompt_chars: 3100,
          latency_ms_total: 9500,
          latency_ms_avg: 950,
          enrich_chars_total: 100,
          estimated_usd: 0.1,
          per_repo: [],
        },
      ],
    };

    const stats = computeHeadlineStats(data);
    expect(stats.hasData).toBe(true);
    expect(stats.latestCostUsd).toBe(0.08);
    expect(stats.costTrendLabel).toContain("Down");
    expect(stats.qualityLabel).toContain("holding");
  });

  it("computeHeadlineStats falls back to daily rows when recent is empty", () => {
    const stats = computeHeadlineStats({
      schema_version: 1,
      generated_at: "2026-08-05T12:00:00.000Z",
      entries: 1,
      daily: [
        {
          date: "2026-08-05",
          edition: "skills",
          runs: 1,
          input_tokens: 1000,
          output_tokens: 500,
          total_tokens: 1500,
          output_words: 400,
          avg_output_tokens_per_repo: 50,
          prompt_chars: 3000,
          avg_latency_ms: 900,
          enrich_chars: 100,
          estimated_usd: 0.0867,
          rubric_pass_count: 1,
          rubric_runs: 1,
          shadow_runs: 0,
        },
      ],
      by_experiment: [],
      shadow_comparisons: [],
      recent: [],
    });
    expect(stats.hasData).toBe(true);
    expect(stats.latestCostUsd).toBe(0.0867);
  });

  it("renderTokenUsagePage shows empty-state copy when no entries", () => {
    const html = renderTokenUsagePage(
      {
        schema_version: 1,
        generated_at: "2026-08-05T12:00:00.000Z",
        entries: 0,
        daily: [],
        by_experiment: [],
        shadow_comparisons: [],
        recent: [],
      },
      [],
      (t) => t,
    );
    expect(html).toContain("No runs logged yet");
    expect(html).toContain("Technical reference");
    expect(html).not.toContain("token-usage-root");
  });

  it("renderTokenUsagePage includes headline cards when data exists", () => {
    const html = renderTokenUsagePage(
      {
        schema_version: 1,
        generated_at: "2026-08-05T12:00:00.000Z",
        entries: 1,
        daily: [
          {
            date: "2026-08-05",
            edition: "skills",
            runs: 1,
            input_tokens: 1000,
            output_tokens: 500,
            total_tokens: 1500,
            output_words: 400,
            avg_output_tokens_per_repo: 50,
            prompt_chars: 3000,
            avg_latency_ms: 900,
            enrich_chars: 100,
            estimated_usd: 0.0867,
            rubric_pass_count: 1,
            rubric_runs: 1,
            shadow_runs: 0,
          },
        ],
        by_experiment: [],
        shadow_comparisons: [],
        recent: [
          {
            logged_at: "2026-08-05T12:00:00.000Z",
            run_id: "run-a",
            edition: "skills",
            date: "2026-08-05",
            model: "claude-sonnet-4-6",
            variant: "single",
            shadow: false,
            flags: { enrich_web: true, structured_context: false, ponytail: false },
            repos_narrated: 10,
            repos_failed: 0,
            input_tokens: 1000,
            output_tokens: 500,
            output_words: 400,
            prompt_chars: 3000,
            latency_ms_total: 9000,
            latency_ms_avg: 900,
            enrich_chars_total: 100,
            estimated_usd: 0.0867,
            per_repo: [],
          },
        ],
      },
      [ponytailExperiment],
      (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    );
    expect(html).toContain("Results at a glance");
    expect(html).toContain("Latest cost per digest");
    expect(html).toContain("What we are testing right now");
    expect(html).toContain("$0.09");
  });
});
