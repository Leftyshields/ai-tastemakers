import type { EditionId } from "../editions.js";

/** Site-relative brief path + optional card anchor, e.g. briefings/2026-10-25.html#repo-ponytail */
export const LAB_POST_FROM_SITE_PATH_RE =
  /^(?:skills\/)?briefings\/\d{4}-\d{2}-\d{2}\.html#repo-[a-z0-9-]+$/;

export function digestBriefSitePath(section: EditionId, digestDate: string): string {
  const prefix = section === "skills" ? "skills/" : "";
  return `${prefix}briefings/${digestDate}.html`;
}

/** Stable DOM id for digest repo cards (`repo-<repo-name-slug>`). */
export function digestRepoCardDomId(fullName: string): string {
  const repoName = fullName.includes("/") ? fullName.split("/").pop()! : fullName;
  const slug = repoName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `repo-${slug || "unknown"}`;
}

export function labBadgeFromBriefSitePath(
  section: EditionId,
  digestDate: string,
  fullName: string,
): string {
  return `${digestBriefSitePath(section, digestDate)}#${digestRepoCardDomId(fullName)}`;
}

export function parseLabPostFromSitePath(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  let decoded = String(raw);
  if (decoded !== decoded.trim()) return null;
  decoded = decoded.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return null;
  }
  if (decoded !== decoded.trim()) return null;
  decoded = decoded.trim();
  if (!decoded || decoded.startsWith("/")) return null;
  if (decoded.includes("://") || decoded.startsWith("//") || decoded.includes("\\") || decoded.includes("..")) {
    return null;
  }
  const lower = decoded.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:")) return null;
  if (!LAB_POST_FROM_SITE_PATH_RE.test(decoded)) return null;
  return decoded;
}

/** Parses `?from=` only; rejects duplicate keys, untrimmed keys, and extra params. */
export function parseLabPostFromSearch(search: string): string | null {
  if (!search.startsWith("?")) return null;
  const q = search.slice(1);
  if (q === "") return null;

  let fromRaw: string | undefined;

  for (const part of q.split("&")) {
    if (part === "") continue;
    const eqIdx = part.indexOf("=");
    const rawKey = eqIdx >= 0 ? part.slice(0, eqIdx) : part;
    let key: string;
    try {
      key = decodeURIComponent(rawKey.replace(/\+/g, " "));
    } catch {
      return null;
    }
    if (key !== key.trim()) return null;
    if (key !== "from") return null;

    const rawVal = eqIdx >= 0 ? part.slice(eqIdx + 1) : "";
    let val: string;
    try {
      val = decodeURIComponent(rawVal.replace(/\+/g, " "));
    } catch {
      return null;
    }
    if (fromRaw !== undefined) return null;
    fromRaw = val;
  }

  return parseLabPostFromSitePath(fromRaw ?? null);
}

export function isValidLabPostFromSearch(search: string): boolean {
  if (!search) return true;
  return parseLabPostFromSearch(search) !== null;
}

/** Inline parser for static HTML (/go and lab post pages). Keep in sync with TS parser. */
export function labPostFromClientParserSource(): string {
  return `function parseLabPostFromSearch(search) {
  if (!search || search.charAt(0) !== "?") return null;
  var q = search.slice(1);
  if (!q) return null;
  var fromRaw;
  var parts = q.split("&");
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (!part) continue;
    var eqIdx = part.indexOf("=");
    var rawKey = eqIdx >= 0 ? part.slice(0, eqIdx) : part;
    var key;
    try { key = decodeURIComponent(rawKey.replace(/\\+/g, " ")); } catch (e) { return null; }
    if (key !== key.trim()) return null;
    if (key !== "from") return null;
    var rawVal = eqIdx >= 0 ? part.slice(eqIdx + 1) : "";
    var val;
    try { val = decodeURIComponent(rawVal.replace(/\\+/g, " ")); } catch (e) { return null; }
    if (fromRaw !== undefined) return null;
    fromRaw = val;
  }
  return parseLabPostFromSitePath(fromRaw != null ? String(fromRaw) : null);
}
function parseLabPostFromSitePath(raw) {
  if (raw == null) return null;
  var decoded = String(raw);
  if (decoded !== decoded.trim()) return null;
  decoded = decoded.trim();
  try { decoded = decodeURIComponent(decoded); } catch (e) { return null; }
  if (decoded !== decoded.trim()) return null;
  decoded = decoded.trim();
  if (!decoded || decoded.charAt(0) === "/") return null;
  if (decoded.indexOf("://") >= 0 || decoded.indexOf("//") === 0 || decoded.indexOf("\\\\") >= 0 || decoded.indexOf("..") >= 0) return null;
  var lower = decoded.toLowerCase();
  if (lower.indexOf("javascript:") === 0 || lower.indexOf("data:") === 0) return null;
  if (!/^(?:skills\\/)?briefings\\/\\d{4}-\\d{2}-\\d{2}\\.html#repo-[a-z0-9-]+$/.test(decoded)) return null;
  return decoded;
}`;
}

/** Append validated brief `from` query to a lab badge href (query before hash). */
export function appendLabPostFromToHref(href: string, fromSitePath: string): string {
  const encoded = encodeURIComponent(fromSitePath);
  const q = `from=${encoded}`;
  const hashIdx = href.indexOf("#");
  if (hashIdx >= 0) {
    const path = href.slice(0, hashIdx);
    const hash = href.slice(hashIdx);
    const sep = path.includes("?") ? "&" : "?";
    return `${path}${sep}${q}${hash}`;
  }
  return href.includes("?") ? `${href}&${q}` : `${href}?${q}`;
}
