import path from "node:path";
import type { AppConfig } from "../types.js";
import { readDigestJson } from "../writers/json.js";
import { resolveDigestRecipients } from "../subscribers/load.js";
import { sendDigestEmail, shouldSendDigestEmail } from "./resend.js";

export async function resendDigestEmailForDate(
  config: AppConfig,
  dateLabel: string,
): Promise<{ id: string; recipientCount: number }> {
  if (config.editionId !== "oss") {
    throw new Error("Digest email is OSS edition only");
  }

  const digestPath = path.join(config.briefingsDir, dateLabel, "digest.json");
  const digest = await readDigestJson(digestPath);

  if (!(await shouldSendDigestEmail(config))) {
    throw new Error(
      "Email not configured: set RESEND_API_KEY, DIGEST_EMAIL_FROM, and add subscribers",
    );
  }

  const recipients = await resolveDigestRecipients(config);
  const sent = await sendDigestEmail(config, digest, dateLabel, recipients);
  return { id: sent.id, recipientCount: recipients.length };
}
