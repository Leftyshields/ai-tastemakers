import type { AppConfig } from "../types.js";
import { resolveDigestRecipients } from "../subscribers/load.js";

/** True when Resend credentials are present (production CI and manual resend). */
export function isDigestEmailConfigured(config: AppConfig): boolean {
  return Boolean(config.resendApiKey?.trim() && config.digestEmailFrom?.trim());
}

/**
 * On a send-intended run (email env configured), require at least one deliverable recipient.
 * Firestore read errors propagate from resolveDigestRecipients (no silent fallback).
 */
export async function assertDigestSendReady(config: AppConfig): Promise<string[]> {
  if (!isDigestEmailConfigured(config)) {
    return [];
  }
  const recipients = await resolveDigestRecipients(config);
  if (recipients.length === 0) {
    throw new Error(
      "Digest email send aborted: zero deliverable recipients. " +
        "When RESEND_API_KEY and DIGEST_EMAIL_FROM are set, Firestore tastemakers_subscribers must be readable and non-empty.",
    );
  }
  return recipients;
}
