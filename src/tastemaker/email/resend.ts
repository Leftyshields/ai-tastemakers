import { createHash } from "node:crypto";
import { Resend } from "resend";
import type { AppConfig, Digest, WeeklyReview } from "../types.js";
import {
  resolveDigestRecipients,
  resolveDigestSubscriberRecords,
} from "../subscribers/load.js";
import type { FirestoreSubscriberRecord } from "../subscribers/firestore.js";
import {
  digestEmailSubject,
  renderDigestEmailHtml,
  renderDigestEmailText,
} from "./html.js";
import {
  renderWeeklyEmailHtml,
  renderWeeklyEmailText,
  weeklyEmailSubject,
} from "./weekly-html.js";
import { digestUnsubscribeUrl } from "./unsubscribe.js";
import { collectDigestRepoAllowlist } from "../analytics/digest-allowlist.js";
import { assertRenderedEmailAllowedByManifest } from "../analytics/outbound-email-manifest-guard.js";

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

function resolveSendRecords(
  recipients: string[] | undefined,
  records: FirestoreSubscriberRecord[],
): FirestoreSubscriberRecord[] {
  if (!recipients) return records;
  return recipients.map((email) => ({ email }));
}

export type DigestEmailSendOptions = {
  /** When set, appends `-manual-<id>` so workflow resends are not deduped against scheduled sends. */
  manualRunId?: string;
};

export function digestSendIdempotencyKey(
  kind: "daily-digest" | "weekly-digest",
  editionId: string,
  periodLabel: string,
  recipientEmail: string,
  manualRunId?: string,
): string {
  const emailHash = createHash("sha256")
    .update(recipientEmail.trim().toLowerCase())
    .digest("hex");
  let key = `${kind}/${editionId}/${periodLabel}/${emailHash}`;
  if (manualRunId) {
    key += `-manual-${manualRunId}`;
  }
  return key;
}

export async function sendDigestEmail(
  config: AppConfig,
  digest: Digest,
  dateLabel: string,
  recipients?: string[],
  sendOptions?: DigestEmailSendOptions,
): Promise<{ id: string }> {
  const records = resolveSendRecords(
    recipients,
    await resolveDigestSubscriberRecords(config),
  );
  if (!config.resendApiKey || !config.digestEmailFrom || records.length === 0) {
    throw new Error(
      "Email not configured: set RESEND_API_KEY, DIGEST_EMAIL_FROM, and add subscribers",
    );
  }

  const resend = new Resend(config.resendApiKey);
  const subject = digestEmailSubject(dateLabel);
  const githubAllowlist = await collectDigestRepoAllowlist(config.rootDir);
  let lastId = "";

  for (const record of records) {
    const unsubscribeUrl = digestUnsubscribeUrl(
      config.digestSiteUrl,
      record.email,
      record.unsubscribeToken,
    );
    const html = renderDigestEmailHtml(
      digest,
      dateLabel,
      config.digestSiteUrl,
      unsubscribeUrl,
      config.editionId,
      undefined,
      githubAllowlist,
    );
    const text = renderDigestEmailText(
      digest,
      dateLabel,
      config.digestSiteUrl,
      unsubscribeUrl,
      config.editionId,
      undefined,
      githubAllowlist,
    );
    await assertRenderedEmailAllowedByManifest(config.rootDir, html, text);
    const idempotencyKey = digestSendIdempotencyKey(
      "daily-digest",
      config.editionId,
      dateLabel,
      record.email,
      sendOptions?.manualRunId,
    );
    const { data, error } = await resend.emails.send(
      {
        from: config.digestEmailFrom,
        to: [record.email],
        subject,
        html,
        text,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
        },
      },
      { idempotencyKey },
    );

    if (error) {
      throw new Error(`Resend API error: ${error.message}`);
    }
    if (!data?.id) {
      throw new Error("Resend API returned no message id");
    }
    lastId = data.id;
  }

  return { id: lastId };
}

export async function sendWeeklyDigestEmail(
  config: AppConfig,
  review: WeeklyReview,
  recipients?: string[],
  sendOptions?: DigestEmailSendOptions,
): Promise<{ id: string }> {
  const records = resolveSendRecords(
    recipients,
    await resolveDigestSubscriberRecords(config),
  );
  if (!config.resendApiKey || !config.digestEmailFrom || records.length === 0) {
    throw new Error(
      "Email not configured: set RESEND_API_KEY, DIGEST_EMAIL_FROM, and add subscribers",
    );
  }

  const resend = new Resend(config.resendApiKey);
  const subject = weeklyEmailSubject(review);
  const githubAllowlist = await collectDigestRepoAllowlist(config.rootDir);
  let lastId = "";

  for (const record of records) {
    const unsubscribeUrl = digestUnsubscribeUrl(
      config.digestSiteUrl,
      record.email,
      record.unsubscribeToken,
    );
    const weeklyHtml = renderWeeklyEmailHtml(
      review,
      config.digestSiteUrl,
      unsubscribeUrl,
      githubAllowlist,
    );
    const weeklyText = renderWeeklyEmailText(
      review,
      config.digestSiteUrl,
      unsubscribeUrl,
      githubAllowlist,
    );
    await assertRenderedEmailAllowedByManifest(config.rootDir, weeklyHtml, weeklyText);
    const idempotencyKey = digestSendIdempotencyKey(
      "weekly-digest",
      config.editionId,
      review.week_id,
      record.email,
      sendOptions?.manualRunId,
    );
    const { data, error } = await resend.emails.send(
      {
        from: config.digestEmailFrom,
        to: [record.email],
        subject,
        html: weeklyHtml,
        text: weeklyText,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
        },
      },
      { idempotencyKey },
    );

    if (error) {
      throw new Error(`Resend API error: ${error.message}`);
    }
    if (!data?.id) {
      throw new Error("Resend API returned no message id");
    }
    lastId = data.id;
  }

  return { id: lastId };
}

export interface OpsEmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export function canSendOpsEmail(config: AppConfig, to?: string): boolean {
  const recipient = to?.trim() || config.experimentReminderTo?.trim();
  return Boolean(config.resendApiKey && config.digestEmailFrom && recipient);
}

export async function sendOpsEmail(
  config: AppConfig,
  payload: OpsEmailPayload,
): Promise<{ id: string }> {
  const to = payload.to.trim();
  if (!config.resendApiKey || !config.digestEmailFrom || !to) {
    throw new Error(
      "Email not configured: set RESEND_API_KEY, DIGEST_EMAIL_FROM, and recipient",
    );
  }

  const resend = new Resend(config.resendApiKey);
  const { data, error } = await resend.emails.send({
    from: config.digestEmailFrom,
    to: [to],
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });

  if (error) {
    throw new Error(`Resend API error: ${error.message}`);
  }
  if (!data?.id) {
    throw new Error("Resend API returned no message id");
  }

  return { id: data.id };
}
