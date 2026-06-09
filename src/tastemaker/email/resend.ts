import { Resend } from "resend";
import type { AppConfig, Digest } from "../types.js";
import { resolveDigestRecipients } from "../subscribers/load.js";
import {
  digestEmailSubject,
  renderDigestEmailHtml,
  renderDigestEmailText,
} from "./html.js";
import { digestUnsubscribeUrl } from "./unsubscribe.js";

export async function shouldSendDigestEmail(config: AppConfig): Promise<boolean> {
  if (!config.resendApiKey || !config.digestEmailFrom) return false;
  const recipients = await resolveDigestRecipients(config);
  return recipients.length > 0;
}

export function parseEmailList(raw?: string): string[] {
  if (!raw?.trim()) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

/** Extract bare address from `Name <addr@domain>` or plain `addr@domain`. */
export function parseFromAddress(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return (match ? match[1] : from).trim();
}

export async function sendDigestEmail(
  config: AppConfig,
  digest: Digest,
  dateLabel: string,
  recipients?: string[],
): Promise<{ id: string }> {
  const to = recipients ?? (await resolveDigestRecipients(config));
  if (!config.resendApiKey || !config.digestEmailFrom || to.length === 0) {
    throw new Error(
      "Email not configured: set RESEND_API_KEY, DIGEST_EMAIL_FROM, and add subscribers",
    );
  }

  const resend = new Resend(config.resendApiKey);
  const html = renderDigestEmailHtml(digest, dateLabel, config.digestSiteUrl);
  const text = renderDigestEmailText(digest, dateLabel, config.digestSiteUrl);
  const subject = digestEmailSubject(dateLabel);

  const unsubscribeUrl = digestUnsubscribeUrl(config.digestSiteUrl);
  // BCC hides the subscriber list; Resend requires at least one `to` address.
  const { data, error } = await resend.emails.send({
    from: config.digestEmailFrom,
    to: [parseFromAddress(config.digestEmailFrom)],
    bcc: to,
    subject,
    html,
    text,
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
    },
  });

  if (error) {
    throw new Error(`Resend API error: ${error.message}`);
  }
  if (!data?.id) {
    throw new Error("Resend API returned no message id");
  }

  return { id: data.id };
}
