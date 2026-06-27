import path from "node:path";
import type { MonthlyConfig, MonthlyNarrative, MonthlyReview } from "../types.js";
import { aggregateMonth } from "./aggregate.js";
import { loadMonthWeeklyReviews } from "./load.js";
import {
  fourthSundayOfMonth,
  monthBounds,
  monthIdFromDateLabel,
} from "./month.js";
import { narrateMonthly } from "../narrate/monthly.js";
import { writeMonthlyReview } from "../writers/monthly.js";
import { dateLabelInTimezone, weekContaining } from "../weekly/week.js";

export interface MonthlyPipelineResult {
  skipped: boolean;
  reason?: string;
  month_id?: string;
  briefingDir?: string;
  jsonPath?: string;
  markdownPath?: string;
  review?: MonthlyReview;
}

export interface MonthlyPipelineDeps {
  narrate?: (
    apiKey: string,
    model: string,
    aggregate: ReturnType<typeof aggregateMonth>,
  ) => Promise<MonthlyNarrative>;
  now?: Date;
}

function monthlyBriefingsDir(rootDir: string, monthId: string): string {
  return path.join(rootDir, "briefings", "monthly", monthId);
}

function parsePacificDateLabel(label: string): Date {
  const [y, m, d] = label.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

function rollupExcludeWeekStart(monthId: string, timezone: string): string {
  const fourth = fourthSundayOfMonth(monthId);
  if (!fourth) {
    return monthBounds(monthId).month_end;
  }
  const window = weekContaining(parsePacificDateLabel(fourth), timezone);
  return window.week_start;
}

export async function runMonthlyPipeline(
  config: MonthlyConfig,
  options: { monthId?: string } = {},
  deps: MonthlyPipelineDeps = {},
): Promise<MonthlyPipelineResult> {
  const now = deps.now ?? new Date();
  const monthId =
    options.monthId ?? monthIdFromDateLabel(dateLabelInTimezone(now, config.timezone));

  const rollupWeekStart = rollupExcludeWeekStart(monthId, config.timezone);
  const loaded = await loadMonthWeeklyReviews(config.rootDir, monthId, {
    excludeOnOrAfterWeekStart: rollupWeekStart,
  });

  if (!loaded.complete) {
    const reason = loaded.skipReason ?? "Incomplete month";
    console.error(`Skipping monthly ${monthId}: ${reason}`);
    return { skipped: true, reason, month_id: monthId };
  }

  const aggregate = aggregateMonth(monthId, loaded.sources);
  const narrate = deps.narrate ?? narrateMonthly;

  console.error(`Synthesizing monthly ${monthId}…`);
  const narrative = await narrate(
    config.anthropicApiKey,
    config.anthropicModel,
    aggregate,
  );

  const { month_start, month_end } = monthBounds(monthId);
  const review: MonthlyReview = {
    schema_version: 1,
    month_id: monthId,
    month_start,
    month_end,
    source_week_ids: aggregate.stats.source_week_ids,
    month_stats: aggregate.stats,
    narrative,
    generated_at: now.toISOString(),
  };

  const briefingDir = monthlyBriefingsDir(config.rootDir, monthId);
  console.error(`Writing monthly review to ${briefingDir}…`);
  const { jsonPath, markdownPath } = await writeMonthlyReview(briefingDir, review);

  return {
    skipped: false,
    month_id: monthId,
    briefingDir,
    jsonPath,
    markdownPath,
    review,
  };
}
