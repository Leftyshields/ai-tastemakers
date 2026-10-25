import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LAB_TESTED_BADGE_BLURB,
  appendLabBadgeAttributionToHref,
  extractLabPostLeadParagraph,
  firstResultSectionSentence,
  renderLabPostLongNameFixtureHeader,
  renderLabPostPageHeader,
  resolvePostVerdictLine,
  stripLabPostLeadMarkdown,
} from "../../../scripts/lab/lab-post-header.js";
import { listLabWriteupPostIds } from "../../../scripts/lab/lab-format.js";
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
    expect(html).toContain("lab-post-split-chip__owner-line");
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

  it("stripLabPostLeadMarkdown removes literal asterisks", () => {
    expect(stripLabPostLeadMarkdown("_**Shipped Aug 1, 2026.** Body._")).toBe("Shipped Aug 1, 2026. Body.");
    expect(stripLabPostLeadMarkdown("no **bold** here")).toBe("no bold here");
  });

  it("long-repo fixture lead has no markdown artifacts", () => {
    const html = renderLabPostLongNameFixtureHeader(
      defaultLabLinkContext(1, {}, "2026-08-01"),
      repoRoot,
      (t) => t,
    );
    expect(html).not.toContain("**");
    expect(html).toContain("lab-post-panel__lead");
    expect(html).toContain("Aug 1, 2026");
    expect(html).not.toContain("Shipped Aug 1, 2026.");
  });

  it("rendered post headers never contain literal ** in lead HTML", () => {
    const linkCtx = defaultLabLinkContext(1, {}, "2026-08-01");
    for (const id of listLabWriteupPostIds(repoRoot)) {
      const exp = loadExperimentsFile(repoRoot).experiments.find((e) => e.id === id);
      if (!exp?.sourceRepo) continue;
      const mdPath = path.join(repoRoot, "briefings/lab/posts", `${id}.md`);
      const md = fs.readFileSync(mdPath, "utf8");
      const titleMatch = md.match(/^#\s+(.+)$/m);
      const title = titleMatch?.[1]?.trim() ?? exp.label;
      const html = renderLabPostPageHeader({
        experiment: exp,
        title,
        markdown: md,
        postHref: `${id}.html`,
        linkCtx,
        writeupPostIds: [id],
        repoRoot,
        escape: (t) => t,
      });
      expect(html, id).not.toMatch(/\*\*/);
      const leadMatch = html.match(/class="lab-post-panel__lead"[^>]*>([^<]+)</);
      if (leadMatch) {
        expect(leadMatch[1], `${id} lead`).not.toContain("*");
      }
    }
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
