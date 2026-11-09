import { createHash } from "node:crypto";

/** Resend idempotency replay / in-flight duplicate (no new send). */
export function isResendIdempotentAlreadySent(err: unknown): boolean {
  const parts: string[] = [];
  if (err && typeof err === "object") {
    const rec = err as Record<string, unknown>;
    if (typeof rec.message === "string") parts.push(rec.message);
    if (typeof rec.name === "string") parts.push(rec.name);
    if (typeof rec.statusCode === "number") parts.push(String(rec.statusCode));
  }
  if (err instanceof Error) parts.push(err.message);
  const haystack = parts.join(" ").toLowerCase();
  return (
    haystack.includes("invalid_idempotent_request") ||
    haystack.includes("concurrent_idempotent") ||
    /\b409\b/.test(haystack)
  );
}

export function recipientFailureLabel(index: number, email: string): string {
  const hash = createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 8);
  return `recipient_${index + 1}#${hash}`;
}
