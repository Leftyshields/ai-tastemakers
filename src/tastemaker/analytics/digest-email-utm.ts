/** PostHog attribution for daily digest email → GitHub Pages (measurement only). */
export const DAILY_DIGEST_UTM = {
  utm_source: "digest",
  utm_medium: "email",
  utm_campaign: "daily",
} as const;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

function hasAnyUtmParam(params: URLSearchParams): boolean {
  return UTM_KEYS.some((k) => params.has(k));
}

/** Append daily digest UTM params; preserve path, existing query, and hash; never double-append. */
export function appendDailyDigestUtmToUrl(href: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (hasAnyUtmParam(url.searchParams)) {
    return href;
  }
  url.searchParams.set("utm_source", DAILY_DIGEST_UTM.utm_source);
  url.searchParams.set("utm_medium", DAILY_DIGEST_UTM.utm_medium);
  url.searchParams.set("utm_campaign", DAILY_DIGEST_UTM.utm_campaign);
  return url.toString();
}

/** True when utm_source marks a daily digest email landing (legacy `email` or current `digest`). */
export function isDigestEmailUtmSource(raw: string | null | undefined): boolean {
  if (raw == null) return false;
  const v = raw.trim().toLowerCase();
  return v === "digest" || v === "email";
}

/** Inline helper for /go redirect page — keep in sync with appendDailyDigestUtmToUrl. */
export function appendDailyDigestUtmClientSource(): string {
  return `function appendDailyDigestUtm(href) {
  try {
    var url = new URL(href);
    if (url.searchParams.has("utm_source") || url.searchParams.has("utm_medium") || url.searchParams.has("utm_campaign")) {
      return href;
    }
    url.searchParams.set("utm_source", "digest");
    url.searchParams.set("utm_medium", "email");
    url.searchParams.set("utm_campaign", "daily");
    return url.toString();
  } catch (e) {
    return href;
  }
}`;
}
