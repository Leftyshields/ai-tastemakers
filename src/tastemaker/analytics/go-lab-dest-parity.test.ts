import { describe, it, expect } from "vitest";
import { renderGoRedirectPage } from "../../../scripts/digest-go-page.js";
import { escapeScriptString } from "../../../scripts/edition-pages.js";
import {
  isAllowlistedLabBadgeDestDecoded,
  labBadgeDestGoInlineRegexSources,
  resolveAllowlistedLabBadgeDestPath,
} from "./repo-click.js";

/** Mirrors inline /go isAllowlistedLabDest (client) using exported regex sources. */
function clientAllowlistedLabDestEncoded(raw: string | null | undefined): string | null {
  if (raw == null || !String(raw).trim()) return null;
  let path = String(raw).trim();
  try {
    path = decodeURIComponent(path);
  } catch {
    return null;
  }
  if (!isAllowlistedLabBadgeDestDecoded(path)) return null;
  return encodeURIComponent(path);
}

const SAMPLE_DESTS = [
  "/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
  "/ai-tastemakers/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
  "/lab/posts/EXP-20260716-firecrawl-enrich-skills.html?from_list=skills&from_rank=2",
  "/ai-tastemakers/lab/index.html?from_list=oss&from_rank=1#lab-exp-EXP-20260913-humanizer-polish-skills",
  "/lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills",
  "/ai-tastemakers/lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills",
  "/lab/posts/EXP-20260716-firecrawl-enrich-skills.html?from_list=bad&from_rank=2",
  "https://evil.com/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
  "/lab/posts/not-an-exp-id.html",
  "/lab/index.html#evil",
  "",
];

describe("/go lab badge dest allowlist parity", () => {
  it("resolveAllowlistedLabBadgeDestPath matches client validator", () => {
    for (const sample of SAMPLE_DESTS) {
      expect(resolveAllowlistedLabBadgeDestPath(sample)).toBe(clientAllowlistedLabDestEncoded(sample));
    }
  });

  it("renderGoRedirectPage embeds regex sources from repo-click", () => {
    const re = labBadgeDestGoInlineRegexSources();
    const html = renderGoRedirectPage({ "acme/demo": "https://github.com/acme/demo" });
    expect(html).toContain(escapeScriptString(re.postPath));
    expect(html).toContain(escapeScriptString(re.indexPath));
    expect(html).toContain(escapeScriptString(re.indexHash));
  });
});
