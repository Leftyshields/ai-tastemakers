import { normalizeEmail } from "../subscribers/load.js";

/** Public unsubscribe page URL (optional email prefill for future per-recipient sends). */
export function digestUnsubscribeUrl(siteUrl: string, email?: string): string {
  const base = `${siteUrl.replace(/\/$/, "")}/unsubscribe.html`;
  if (!email?.trim()) return base;
  const normalized = normalizeEmail(email);
  return `${base}?email=${encodeURIComponent(normalized)}`;
}
