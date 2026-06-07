import { Resend } from "resend";
import type { AppConfig, Digest } from "../types.js";
import { digestEmailSubject, renderDigestEmailHtml } from "./html.js";

export function shouldSendDigestEmail(config: AppConfig): boolean {
  return !!(
    config.resendApiKey &&
    config.digestEmailFrom &&
    config.digestEmailTo.length > 0
  );
}

export function parseEmailList(raw?: string): string[] {
  if (!raw?.trim()) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function sendDigestEmail(
  config: AppConfig,
  digest: Digest,
  dateLabel: string,
): Promise<{ id: string }> {
  if (!shouldSendDigestEmail(config)) {
    throw new Error(
      "Email not configured: set RESEND_API_KEY, DIGEST_EMAIL_FROM, and DIGEST_EMAIL_TO",
    );
  }

  const resend = new Resend(config.resendApiKey!);
  const html = renderDigestEmailHtml(digest, dateLabel, config.digestSiteUrl);
  const subject = digestEmailSubject(dateLabel);

  const { data, error } = await resend.emails.send({
    from: config.digestEmailFrom!,
    to: config.digestEmailTo,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend API error: ${error.message}`);
  }
  if (!data?.id) {
    throw new Error("Resend API returned no message id");
  }

  return { id: data.id };
}
