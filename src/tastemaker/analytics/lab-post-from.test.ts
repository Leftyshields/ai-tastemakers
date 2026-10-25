import { describe, it, expect } from "vitest";
import {
  appendLabPostFromToHref,
  digestRepoCardDomId,
  labBadgeFromBriefSitePath,
  parseLabPostFromSearch,
  parseLabPostFromSitePath,
} from "./lab-post-from.js";

describe("lab-post-from validation", () => {
  it("builds stable card ids and brief from paths", () => {
    expect(digestRepoCardDomId("DietrichGebert/ponytail")).toBe("repo-ponytail");
    expect(labBadgeFromBriefSitePath("oss", "2026-10-25", "DietrichGebert/ponytail")).toBe(
      "briefings/2026-10-25.html#repo-ponytail",
    );
    expect(labBadgeFromBriefSitePath("skills", "2026-08-05", "blader/humanizer")).toBe(
      "skills/briefings/2026-08-05.html#repo-humanizer",
    );
  });

  it("accepts valid from site paths", () => {
    expect(parseLabPostFromSitePath("briefings/2026-10-25.html#repo-ponytail")).toBe(
      "briefings/2026-10-25.html#repo-ponytail",
    );
    expect(parseLabPostFromSearch("?from=briefings%2F2026-10-25.html%23repo-ponytail")).toBe(
      "briefings/2026-10-25.html#repo-ponytail",
    );
  });

  it("rejects open redirects and malformed from values", () => {
    const hostile = [
      "//evil.com/briefings/2026-10-25.html",
      "https://evil.com/briefings/2026-10-25.html",
      "/briefings/2026-10-25.html",
      "briefings/../index.html",
      "briefings/2026-10-25.html#repo-UPPER",
      "javascript:alert(1)",
      "",
    ];
    for (const raw of hostile) {
      expect(parseLabPostFromSitePath(raw), raw).toBeNull();
    }
    expect(parseLabPostFromSearch("?from=briefings%2F2026-10-25.html&from=evil")).toBeNull();
    expect(parseLabPostFromSearch("?from_list=oss&from_rank=1")).toBeNull();
  });

  it("appends from query before lab index hash", () => {
    const href = appendLabPostFromToHref(
      "../lab/index.html#lab-exp-EXP-20260802-ponytail-narration-skills",
      "briefings/2026-10-25.html#repo-ponytail",
    );
    expect(href).toContain("from=briefings%2F2026-10-25.html%23repo-ponytail");
    expect(href).toMatch(/index\.html\?from=[^#]+#lab-exp-/);
  });
});
