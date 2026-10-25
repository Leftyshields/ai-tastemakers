import type { EditionId } from "../editions.js";

export const LAB_BADGE_FROM_RANK_PARAM_RE = /^(?:[1-9]|10)$/;

export function parseLabBadgeFromListParam(raw: string | null | undefined): EditionId | null {
  if (raw == null) return null;
  const s = String(raw);
  if (s !== s.trim()) return null;
  const v = s.trim().toLowerCase();
  if (v === "oss" || v === "skills") return v;
  return null;
}

export function parseLabBadgeFromRankParam(raw: string | null | undefined): number | null {
  if (raw == null) return null;
  const s = String(raw);
  if (s !== s.trim()) return null;
  const trimmed = s.trim();
  if (!LAB_BADGE_FROM_RANK_PARAM_RE.test(trimmed)) return null;
  return Number.parseInt(trimmed, 10);
}

/** Parses `?from_list=&from_rank=`; rejects duplicate keys, untrimmed keys, and extra params. */
export function parseLabBadgeAttributionSearch(
  search: string,
): { list: EditionId; rank: number } | null {
  if (!search.startsWith("?")) return null;
  const q = search.slice(1);
  if (q === "") return null;

  const seen = new Set<string>();
  let fromListRaw: string | undefined;
  let fromRankRaw: string | undefined;

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
    if (key !== "from_list" && key !== "from_rank") return null;
    if (seen.has(key)) return null;
    seen.add(key);

    const rawVal = eqIdx >= 0 ? part.slice(eqIdx + 1) : "";
    let val: string;
    try {
      val = decodeURIComponent(rawVal.replace(/\+/g, " "));
    } catch {
      return null;
    }
    if (key === "from_list") fromListRaw = val;
    else fromRankRaw = val;
  }

  const list = parseLabBadgeFromListParam(fromListRaw ?? null);
  const rank = parseLabBadgeFromRankParam(fromRankRaw ?? null);
  if (!list || rank == null) return null;
  return { list, rank };
}

export function isValidLabBadgeAttributionSearch(search: string): boolean {
  if (!search) return true;
  return parseLabBadgeAttributionSearch(search) !== null;
}

/** Inline `parseLabBadgeAttribution` for static HTML (/go and lab post pages). Keep in sync with TS parser. */
export function labBadgeAttributionClientParserSource(): string {
  return `function parseLabBadgeAttribution(search) {
  if (!search || search.charAt(0) !== "?") return null;
  var q = search.slice(1);
  if (!q) return null;
  var seen = {};
  var fromListRaw, fromRankRaw;
  var parts = q.split("&");
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (!part) continue;
    var eqIdx = part.indexOf("=");
    var rawKey = eqIdx >= 0 ? part.slice(0, eqIdx) : part;
    var key;
    try { key = decodeURIComponent(rawKey.replace(/\\+/g, " ")); } catch (e) { return null; }
    if (key !== key.trim()) return null;
    if (key !== "from_list" && key !== "from_rank") return null;
    if (seen[key]) return null;
    seen[key] = true;
    var rawVal = eqIdx >= 0 ? part.slice(eqIdx + 1) : "";
    var val;
    try { val = decodeURIComponent(rawVal.replace(/\\+/g, " ")); } catch (e) { return null; }
    if (key === "from_list") fromListRaw = val;
    else fromRankRaw = val;
  }
  var listRaw = fromListRaw != null ? String(fromListRaw) : "";
  if (listRaw !== listRaw.trim()) return null;
  var list = listRaw.trim().toLowerCase();
  if (list !== "oss" && list !== "skills") return null;
  var rankRaw = fromRankRaw != null ? String(fromRankRaw) : "";
  if (rankRaw !== rankRaw.trim()) return null;
  var rankStr = rankRaw.trim();
  if (!/^(?:[1-9]|10)$/.test(rankStr)) return null;
  return { list: list, rank: parseInt(rankStr, 10) };
}`;
}
