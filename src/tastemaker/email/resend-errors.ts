import { createHash } from "node:crypto";

const RESEND_IDEMPOTENT_ALREADY_SENT = "invalid_idempotent_request";
const RESEND_IDEMPOTENT_CONCURRENT = "concurrent_idempotent_requests";

/** Resend API error `name` / `code` when present (structured errors only). */
export function resendStructuredErrorName(err: unknown): string | undefined {
  if (!err || typeof err !== "object") return undefined;
  const rec = err as Record<string, unknown>;
  if (typeof rec.name === "string" && rec.name.trim()) return rec.name.trim();
  if (typeof rec.code === "string" && rec.code.trim()) return rec.code.trim();
  return undefined;
}

/** Prior send with the same idempotency key already completed. */
export function isResendIdempotentAlreadySent(err: unknown): boolean {
  return resendStructuredErrorName(err) === RESEND_IDEMPOTENT_ALREADY_SENT;
}

/** Another in-flight request holds the same idempotency key — retry briefly, then fail. */
export function isResendConcurrentIdempotentRequest(err: unknown): boolean {
  return resendStructuredErrorName(err) === RESEND_IDEMPOTENT_CONCURRENT;
}

export function truncateResendFailureMessage(message: string, max = 200): string {
  const s = message.trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max)}…`;
}

export function sleepMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function recipientFailureLabel(index: number, email: string): string {
  const hash = createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 8);
  return `recipient_${index + 1}#${hash}`;
}

export const RESEND_CONCURRENT_IDEMPOTENT_BACKOFF_MS = [250, 500] as const;
