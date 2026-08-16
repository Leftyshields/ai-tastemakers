import path from "node:path";
import { promises as fs } from "node:fs";
import type { AppConfig, WeeklyReview } from "../types.js";
import { readDigestJson } from "../writers/json.js";
import { resolveDigestRecipients } from "../subscribers/load.js";
import { sendDigestEmail, sendWeeklyDigestEmail, shouldSendDigestEmail } from "./resend.js";
import { coerceWeeklyEmail, coerceWeeklyNarrative } from "../narrate/weekly.js";
import { isoWeekIdFromDateLabel, isSundayDateLabel } from "../weekly/week.js";

export async function resendDigestEmailForDate(
  config: AppConfig,
  dateLabel: string,
): Promise<{ id: string; recipientCount: number }> {
  if (config.editionId !== "oss") {
    throw new Error("Digest email is OSS edition only");
  }

  if (!(await shouldSendDigestEmail(config))) {
    throw new Error(
      "Email not configured: set RESEND_API_KEY, DIGEST_EMAIL_FROM, and add subscribers",
    );
  }

  const recipients = await resolveDigestRecipients(config);

  if (isSundayDateLabel(dateLabel)) {
    const weekId = isoWeekIdFromDateLabel(dateLabel);
    const weeklyPath = path.join(
      config.rootDir,
      "briefings",
      "weekly",
      weekId,
      "weekly_review.json",
    );
    try {
      const raw = JSON.parse(await fs.readFile(weeklyPath, "utf8")) as WeeklyReview;
      const review: WeeklyReview = {
        ...raw,
        narrative: coerceWeeklyNarrative(raw.narrative),
        email: coerceWeeklyEmail(raw.email),
      };
      const sent = await sendWeeklyDigestEmail(config, review, recipients);
      return { id: sent.id, recipientCount: recipients.length };
    } catch {
      // Weekly file missing — fall through to the daily top 10.
    }
  }

  const digestPath = path.join(config.briefingsDir, dateLabel, "digest.json");
  const digest = await readDigestJson(digestPath);
  const sent = await sendDigestEmail(config, digest, dateLabel, recipients);
  return { id: sent.id, recipientCount: recipients.length };
}
