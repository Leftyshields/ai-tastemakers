import { describe, it, expect } from "vitest";
import { renderGoRedirectPage } from "../../../scripts/digest-go-page.js";
import { escapeScriptString } from "../../../scripts/edition-pages.js";
import {
  LAB_BADGE_DEST_ALLOWED_SAMPLES,
  LAB_BADGE_DEST_REJECTED_SAMPLES,
  SAMPLE_DESTS,
} from "./lab-badge-dest-samples.js";
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

describe("/go lab badge dest allowlist parity", () => {
  it("SAMPLE_DESTS includes allowed and rejected cases", () => {
    expect(SAMPLE_DESTS.length).toBe(
      LAB_BADGE_DEST_ALLOWED_SAMPLES.length + LAB_BADGE_DEST_REJECTED_SAMPLES.length,
    );
  });

  it("resolveAllowlistedLabBadgeDestPath matches client validator for allowed dests", () => {
    for (const sample of LAB_BADGE_DEST_ALLOWED_SAMPLES) {
      expect(resolveAllowlistedLabBadgeDestPath(sample)).toBe(clientAllowlistedLabDestEncoded(sample));
    }
  });

  it("rejects malicious SAMPLE_DESTS on server and client", () => {
    for (const sample of LAB_BADGE_DEST_REJECTED_SAMPLES) {
      expect(resolveAllowlistedLabBadgeDestPath(sample)).toBeNull();
      expect(clientAllowlistedLabDestEncoded(sample)).toBeNull();
      if (sample && sample.startsWith("/") && !sample.startsWith("//")) {
        expect(isAllowlistedLabBadgeDestDecoded(sample)).toBe(false);
      }
    }
  });

  it("renderGoRedirectPage embeds regex sources from repo-click", () => {
    const re = labBadgeDestGoInlineRegexSources();
    const html = renderGoRedirectPage({ "acme/demo": "https://github.com/acme/demo" });
    expect(html).toContain(escapeScriptString(re.postPath));
    expect(html).toContain(escapeScriptString(re.indexPath));
    expect(html).toContain(escapeScriptString(re.indexHash));
    expect(html).toContain("function parseLabBadgeAttribution(search)");
  });
});
