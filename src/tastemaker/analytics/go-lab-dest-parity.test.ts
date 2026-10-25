import { describe, it, expect } from "vitest";
import { renderGoRedirectPage } from "../../../scripts/digest-go-page.js";
import { escapeScriptString } from "../../../scripts/edition-pages.js";
import { SAMPLE_DESTS } from "./lab-badge-dest-samples.js";
import {
  isAllowlistedLabBadgeDestDecoded,
  labBadgeDestGoInlineRegexSources,
  resolveAllowlistedLabBadgeDestPath,
} from "./repo-click.js";

function extractInlineIsAllowlistedLabDest(html: string): (raw: string) => string | null {
  const scriptMatch = html.match(/<script>\s*([\s\S]*?)<\/script>/i);
  if (!scriptMatch) throw new Error("renderGoRedirectPage: missing <script> block");
  const script = scriptMatch[1]!;
  const start = script.indexOf("var LAB_DEST_POST_RE");
  if (start < 0) throw new Error("renderGoRedirectPage: missing LAB_DEST_POST_RE in inline script");
  const fnMarker = "function isAllowlistedLabDest(raw) {";
  const fnStart = script.indexOf(fnMarker, start);
  if (fnStart < 0) throw new Error("renderGoRedirectPage: missing isAllowlistedLabDest in inline script");
  const openBrace = script.indexOf("{", fnStart);
  if (openBrace < 0) throw new Error("renderGoRedirectPage: malformed isAllowlistedLabDest");
  let depth = 0;
  let end = -1;
  for (let i = openBrace; i < script.length; i++) {
    const ch = script[i]!;
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end < 0) throw new Error("renderGoRedirectPage: unclosed isAllowlistedLabDest");
  const body = script.slice(start, end + 1);
  return new Function(`${body}; return isAllowlistedLabDest;`)() as (raw: string) => string | null;
}

let cachedInlineIsAllowlistedLabDest: ((raw: string) => string | null) | undefined;

function clientAllowlistedLabDestEncoded(raw: string | null | undefined): string | null {
  if (raw == null || !String(raw).trim()) return null;
  if (!cachedInlineIsAllowlistedLabDest) {
    const html = renderGoRedirectPage({ "acme/demo": "https://github.com/acme/demo" });
    cachedInlineIsAllowlistedLabDest = extractInlineIsAllowlistedLabDest(html);
  }
  return cachedInlineIsAllowlistedLabDest(String(raw).trim());
}

describe("/go lab badge dest allowlist parity", () => {
  it("resolveAllowlistedLabBadgeDestPath matches inline /go isAllowlistedLabDest for SAMPLE_DESTS", () => {
    for (const sample of SAMPLE_DESTS) {
      expect(resolveAllowlistedLabBadgeDestPath(sample)).toBe(clientAllowlistedLabDestEncoded(sample));
    }
  });

  it("rejected paths fail server isAllowlistedLabBadgeDestDecoded where applicable", () => {
    for (const sample of SAMPLE_DESTS) {
      if (!sample || !sample.startsWith("/") || sample.startsWith("//")) continue;
      if (resolveAllowlistedLabBadgeDestPath(sample) !== null) continue;
      expect(isAllowlistedLabBadgeDestDecoded(sample)).toBe(false);
    }
  });

  it("renderGoRedirectPage embeds regex sources from repo-click", () => {
    const re = labBadgeDestGoInlineRegexSources();
    const html = renderGoRedirectPage({ "acme/demo": "https://github.com/acme/demo" });
    expect(html).toContain(escapeScriptString(re.postPath));
    expect(html).toContain(escapeScriptString(re.indexPath));
    expect(html).toContain(escapeScriptString(re.indexHash));
    expect(html).toContain("function parseLabPostFromSearch(search)");
    expect(extractInlineIsAllowlistedLabDest(html)).toBeTypeOf("function");
  });
});
