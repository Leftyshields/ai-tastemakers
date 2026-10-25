import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LAB_TESTED_BADGE_BLURB,
  appendLabBadgeAttributionToHref,
  extractLabPostLeadParagraph,
  firstResultSectionSentence,
  renderLabPostPageHeader,
  resolvePostVerdictLine,
} from "../../../scripts/lab/lab-post-header.js";
import { defaultLabLinkContext } from "../../../scripts/lab/lab-analytics.js";
import { LAB_BADGE_DEST_REJECTED_SAMPLES } from "../analytics/lab-badge-dest-samples.js";
import {
  isAllowlistedLabBadgeDestDecoded,
  resolveAllowlistedLabBadgeDestPath,
} from "../analytics/repo-click.js";
import { loadExperimentsFile } from "../../../scripts/lab/validate-experiments.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("lab post header E1", () => {
  it("appends validated attribution query before hash", () => {
    const href = appendLabBadgeAttributionToHref(
      "../lab/posts/EXP-20260802-ponytail-narration-skills.html",
      "skills",
      3,
    );
    expect(href).toContain("from_list=skills");
    expect(href).toContain("from_rank=3");
  });

  it("renders design E1 panel with Back button, split chip, title, status, and lead", () => {
    const exp = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260716-firecrawl-enrich-skills",
    )!;
    const md = fs.readFileSync(
      path.join(repoRoot, "briefings/lab/posts/EXP-20260716-firecrawl-enrich-skills.md"),
      "utf8",
    );
    const html = renderLabPostPageHeader({
      experiment: exp,
      title: "Better source pages for Skills briefs",
      markdown: md,
      postHref: "EXP-20260716-firecrawl-enrich-skills.html",
      linkCtx: defaultLabLinkContext(1, { "firecrawl/firecrawl": "https://github.com/firecrawl/firecrawl" }, "2026-08-01"),
      writeupPostIds: [exp.id],
      repoRoot,
      escape: (t) => t,
    });
    expect(html).toContain('id="lab-post-back-btn"');
    expect(html).toContain("lab-post-split-chip__pill");
    expect(html).toContain("lab-post-split-chip__repo");
    expect(html).toContain("firecrawl/firecrawl");
    expect(html).toContain("<wbr>");
    expect(html).toContain('aria-current="page"');
    expect(html).not.toContain("Back to the daily list");
    expect(html).not.toContain("From the OSS top 10");
    expect(html).toContain("lab-post-panel__lead");
    expect(html).toMatch(/lab-post-split-chip__pill[\s\S]*Lab tested/);
    expect(html).toContain('<span class="lab-post-split-chip__pill');
    expect(html).toContain('<a href="');
  });

  it("extracts firecrawl lead from copy constants", () => {
    const md = fs.readFileSync(
      path.join(repoRoot, "briefings/lab/posts/EXP-20260716-firecrawl-enrich-skills.md"),
      "utf8",
    );
    const lead = extractLabPostLeadParagraph("EXP-20260716-firecrawl-enrich-skills", md);
    expect(lead).toContain("Aug 1, 2026");
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

  it("rejects malicious lab dest samples from SAMPLE_DESTS", () => {
    for (const dest of LAB_BADGE_DEST_REJECTED_SAMPLES) {
      expect(resolveAllowlistedLabBadgeDestPath(dest)).toBeNull();
      if (dest && dest.startsWith("/") && !dest.startsWith("//")) {
        expect(isAllowlistedLabBadgeDestDecoded(dest)).toBe(false);
      }
    }
  });

  it("uses Copywriter final badge blurb constant on digest only", () => {
    expect(LAB_TESTED_BADGE_BLURB).toBe(
      "Tastemakers doesn't just report on AI tools. It tests them. Every Lab tested badge marks a repo whose idea was put to work on these lists and measured in the open.",
    );
  });

  it("parses What happened section sentence from ponytail post", () => {
    const md = fs.readFileSync(
      path.join(repoRoot, "briefings/lab/posts/EXP-20260802-ponytail-narration-skills.md"),
      "utf8",
    );
    const sentence = firstResultSectionSentence(md);
    expect(sentence).toBeTruthy();
    expect(sentence!.toLowerCase()).toMatch(/before|2005|output/);
  });
});
