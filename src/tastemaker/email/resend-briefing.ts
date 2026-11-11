import path from "node:path";
import { promises as fs } from "node:fs";
import type { AppConfig, WeeklyReview } from "../types.js";
import { readDigestJson } from "../writers/json.js";
import { refreshOutboundEmailDestManifest } from "../analytics/write-outbound-email-manifest.js";
import {
  assertDigestSendReady,
  sendDigestEmail,
  sendWeeklyDigestEmail,
} from "./resend.js";
import { assertIsoDateLabel, writeDailyDigestEmailSentMarker } from "./email-send-marker.js";
import { resolveDigestResendManualRunId } from "./resend-manual.js";
import { coerceWeeklyEmail, coerceWeeklyNarrative } from "../narrate/weekly.js";
import { isoWeekIdFromDateLabel, isSundayDateLabel } from "../weekly/week.js";

export async function resendDigestEmailForDate(
  config: AppConfig,
  dateLabel: string,
): Promise<{ id: string; recipientCount: number }> {
  if (config.editionId !== "oss") {
    throw new Error("Digest email is OSS edition only");
  }

  assertIsoDateLabel(dateLabel);
  const recipients = await assertDigestSendReady(config);
  const manualRunId = resolveDigestResendManualRunId();

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
      const sent = await sendWeeklyDigestEmail(config, review, recipients, { manualRunId });
      return { id: sent.id, recipientCount: recipients.length };
    } catch {
      // Weekly file missing — fall through to the daily top 10.
    }
  }

  const digestPath = path.join(config.briefingsDir, dateLabel, "digest.json");
  const digest = await readDigestJson(digestPath);
  await refreshOutboundEmailDestManifest(config.rootDir, config.digestSiteUrl, {
    pendingDigest: { digest, dateLabel, editionId: "oss" },
  });
  const sent = await sendDigestEmail(config, digest, dateLabel, recipients, { manualRunId });
  await writeDailyDigestEmailSentMarker(config.briefingsDir, dateLabel, recipients.length);
  return { id: sent.id, recipientCount: recipients.length };
}
