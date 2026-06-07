import path from "node:path";
import type { WeeklyConfig, WeeklyNarrative, WeeklyReview } from "../types.js";
import { aggregateWeek } from "./aggregate.js";
import { loadWeekDigests } from "./load.js";
import { parseWeekId, weekContaining, type WeekWindow } from "./week.js";
import { narrateWeekly } from "../narrate/weekly.js";
import { writeWeeklyReview } from "../writers/weekly.js";

export interface WeeklyPipelineResult {
  skipped: boolean;
  reason?: string;
  week_id?: string;
  briefingDir?: string;
  jsonPath?: string;
  markdownPath?: string;
  review?: WeeklyReview;
}

export interface WeeklyPipelineDeps {
  narrate?: (apiKey: string, model: string, aggregate: ReturnType<typeof aggregateWeek>) => Promise<WeeklyNarrative>;
  now?: Date;
}

function weeklyBriefingsDir(rootDir: string, weekId: string): string {
  return path.join(rootDir, "briefings", "weekly", weekId);
}

export async function runWeeklyPipeline(
  config: WeeklyConfig,
  options: { weekId?: string } = {},
  deps: WeeklyPipelineDeps = {},
): Promise<WeeklyPipelineResult> {
  const now = deps.now ?? new Date();
  let window: WeekWindow;
  if (options.weekId) {
    window = parseWeekId(options.weekId);
  } else {
    window = weekContaining(now, config.timezone);
  }

  const loaded = await loadWeekDigests(config.rootDir, window.dates);
  if (!loaded.complete) {
    const reason = loaded.skipReason ?? "Incomplete week";
    console.error(`Skipping weekly ${window.week_id}: ${reason}`);
    return { skipped: true, reason, week_id: window.week_id };
  }

  const aggregate = aggregateWeek(window, loaded.entries);
  const narrate = deps.narrate ?? narrateWeekly;

  console.error(`Synthesizing weekly ${window.week_id}…`);
  const narrative = await narrate(
    config.anthropicApiKey,
    config.anthropicModel,
    aggregate,
  );

  const review: WeeklyReview = {
    schema_version: 1,
    week_id: window.week_id,
    week_start: window.week_start,
    week_end: window.week_end,
    days_covered: loaded.days_covered,
    stats: aggregate.stats,
    narrative,
    generated_at: now.toISOString(),
  };

  const briefingDir = weeklyBriefingsDir(config.rootDir, window.week_id);
  console.error(`Writing weekly review to ${briefingDir}…`);
  const { jsonPath, markdownPath } = await writeWeeklyReview(briefingDir, review);

  return {
    skipped: false,
    week_id: window.week_id,
    briefingDir,
    jsonPath,
    markdownPath,
    review,
  };
}
