import { normalizeEmail } from "../subscribers/load.js";

/** Public unsubscribe page URL (email + token prefill from digest links). */
export function digestUnsubscribeUrl(
  siteUrl: string,
  email?: string,
  token?: string,
): string {
  const base = `${siteUrl.replace(/\/$/, "")}/unsubscribe.html`;
  if (!email?.trim()) return base;
  const normalized = normalizeEmail(email);
  const params = new URLSearchParams({ email: normalized });
  if (token?.trim()) {
    params.set("token", token.trim());
  }
  return `${base}?${params.toString()}`;
}
