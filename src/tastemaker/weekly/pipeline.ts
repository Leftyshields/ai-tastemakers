import path from "node:path";
import type { AppConfig, WeeklyConfig, WeeklyEmailCopy, WeeklyNarrative, WeeklyReview } from "../types.js";
import { aggregateWeek } from "./aggregate.js";
import { loadWeekDigests } from "./load.js";
import { parseWeekId, weekContaining, type WeekWindow } from "./week.js";
import { formatActiveLabNotes, narrateWeekly, narrateWeeklyEmail } from "../narrate/weekly.js";
import { writeWeeklyReview } from "../writers/weekly.js";
import { sendWeeklyDigestEmail, shouldSendDigestEmail } from "../email/resend.js";
import { resolveDigestRecipients } from "../subscribers/load.js";

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
  narrateEmail?: (
    apiKey: string,
    model: string,
    aggregate: ReturnType<typeof aggregateWeek>,
    labNotes: string,
  ) => Promise<WeeklyEmailCopy>;
  now?: Date;
  emailConfig?: AppConfig;
  sendEmail?: typeof sendWeeklyDigestEmail;
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
  const narrateEmail = deps.narrateEmail ?? narrateWeeklyEmail;

  console.error(`Synthesizing weekly ${window.week_id}…`);
  const narrative = await narrate(
    config.anthropicApiKey,
    config.anthropicModel,
    aggregate,
  );

  console.error(`Writing Sunday email copy for ${window.week_id}…`);
  const labNotes = await formatActiveLabNotes(config.rootDir);
  const email = await narrateEmail(
    config.anthropicApiKey,
    config.anthropicModel,
    aggregate,
    labNotes,
  );

  const review: WeeklyReview = {
    schema_version: 1,
    week_id: window.week_id,
    week_start: window.week_start,
    week_end: window.week_end,
    days_covered: loaded.days_covered,
    stats: aggregate.stats,
    narrative,
    email,
    generated_at: now.toISOString(),
  };

  const briefingDir = weeklyBriefingsDir(config.rootDir, window.week_id);
  console.error(`Writing weekly review to ${briefingDir}…`);
  const { jsonPath, markdownPath } = await writeWeeklyReview(briefingDir, review);

  const emailConfig = deps.emailConfig;
  if (emailConfig && (await shouldSendDigestEmail(emailConfig))) {
    const sendEmail = deps.sendEmail ?? sendWeeklyDigestEmail;
    const recipients = await resolveDigestRecipients(emailConfig);
    console.error(`Sending weekly digest email to ${recipients.length} recipient(s)…`);
    try {
      const sent = await sendEmail(emailConfig, review, recipients);
      console.error(`Weekly email sent (id: ${sent.id})`);
    } catch (err) {
      console.warn(
        "Warning: weekly email failed; review was still written:",
        err instanceof Error ? err.message : err,
      );
    }
  }

  return {
    skipped: false,
    week_id: window.week_id,
    briefingDir,
    jsonPath,
    markdownPath,
    review,
  };
}
