import { createHmac, timingSafeEqual } from "node:crypto";

/** HMAC-SHA256 of destination URL, base64url (no padding). */
export function signOutboundDestination(destination: string, signingKey: string): string {
  if (!signingKey) return "";
  return createHmac("sha256", signingKey).update(destination, "utf8").digest("base64url");
}

export function verifyOutboundDestination(
  destination: string,
  signature: string,
  signingKey: string,
): boolean {
  if (!signingKey || !signature) return false;
  const expected = signOutboundDestination(destination, signingKey);
  try {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** External https/http URL safe to redirect after signature check. */
export function isSafeExternalHttpUrl(raw: string): boolean {
  let href = raw.trim();
  if (!href) return false;
  try {
    href = decodeURIComponent(href);
  } catch {
    return false;
  }
  const lower = href.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
    return false;
  }
  let u: URL;
  try {
    u = new URL(href);
  } catch {
    return false;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return false;
  if (!u.hostname) return false;
  if (u.username || u.password) return false;
  return true;
}
