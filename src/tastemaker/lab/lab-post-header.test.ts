import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LAB_TESTED_BADGE_BLURB,
  appendLabBadgeAttributionToHref,
  firstResultSectionSentence,
  resolvePostVerdictLine,
} from "../../../scripts/lab/lab-post-header.js";
import { LAB_BADGE_DEST_REJECTED_SAMPLES } from "../analytics/lab-badge-dest-samples.js";
import {
  isAllowlistedLabBadgeDestDecoded,
  resolveAllowlistedLabBadgeDestPath,
} from "../analytics/repo-click.js";
import { loadExperimentsFile } from "../../../scripts/lab/validate-experiments.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("lab post header UX47", () => {
  it("appends validated attribution query before hash", () => {
    const href = appendLabBadgeAttributionToHref(
      "../lab/posts/EXP-20260802-ponytail-narration-skills.html",
      "skills",
      3,
    );
    expect(href).toContain("from_list=skills");
    expect(href).toContain("from_rank=3");
    const withHash = appendLabBadgeAttributionToHref(
      "../lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills",
      "oss",
      1,
    );
    expect(withHash).toMatch(/index\.html\?from_list=oss&from_rank=1#lab-exp-/);
  });

  it("allowlists lab dest paths with attribution query", () => {
    const dest =
      "/ai-tastemakers/lab/posts/EXP-20260716-firecrawl-enrich-skills.html?from_list=skills&from_rank=2";
    expect(isAllowlistedLabBadgeDestDecoded(dest)).toBe(true);
    expect(resolveAllowlistedLabBadgeDestPath(dest)).toBeTruthy();
  });

  it("rejects malicious lab dest samples from SAMPLE_DESTS", () => {
    for (const dest of LAB_BADGE_DEST_REJECTED_SAMPLES) {
      expect(resolveAllowlistedLabBadgeDestPath(dest)).toBeNull();
      if (dest && dest.startsWith("/") && !dest.startsWith("//")) {
        expect(isAllowlistedLabBadgeDestDecoded(dest)).toBe(false);
      }
    }
  });

  it("resolves verdict from experiments.json for ponytail", () => {
    const exp = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260802-ponytail-narration-skills",
    )!;
    const md = "# Title\n\n## Outcome\n\nWe kept both flags on.\n";
    const resolved = resolvePostVerdictLine(exp, md);
    expect(resolved.source).toBe("verdict");
    expect(resolved.line).toContain("Done");
    expect(resolved.line).toContain("Shipped");
  });

  it("extracts first Outcome sentence when verdict missing", () => {
    const exp = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260802-ponytail-narration-skills",
    )!;
    const md = "## Outcome\n\nWe shipped Firecrawl. Later steps build on this.\n";
    const resolved = resolvePostVerdictLine(
      { ...exp, verdict: null, result_summary: null },
      md,
    );
    expect(resolved.source).toBe("result_section");
    expect(resolved.line).toContain("We shipped Firecrawl.");
  });

  it("uses Copywriter final badge blurb constant", () => {
    expect(LAB_TESTED_BADGE_BLURB).toBe(
      "When a repo card says Lab tested, it means we tried an idea from that repo in Tastemakers Lab.",
    );
    expect(LAB_TESTED_BADGE_BLURB).not.toMatch(/[\u2013\u2014]/);
  });

  it("parses Outcome section sentence from ponytail post", () => {
    const md = fs.readFileSync(
      path.join(repoRoot, "briefings/lab/posts/EXP-20260802-ponytail-narration-skills.md"),
      "utf8",
    );
    const sentence = firstResultSectionSentence(md);
    expect(sentence).toBeTruthy();
    expect(sentence!.toLowerCase()).toMatch(/kept|ship/);
  });
});
