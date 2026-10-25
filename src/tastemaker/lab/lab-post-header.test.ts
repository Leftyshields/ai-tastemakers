import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LAB_TESTED_BADGE_BLURB,
  appendLabPostFromToHref,
  countLabPostPanelLeadOccurrences,
  extractLabPostLeadParagraph,
  firstResultSectionSentence,
  labPostPanelLeadIsForbidden,
  labPostShowsLabTestedBadge,
  labExperimentPlanAnchorId,
  labPostExperimentPlanHref,
  labPostHeaderChipMode,
  labPostHeaderChipRepoKey,
  labPostHeaderUsesRepoFallback,
  labPostSplitChipShowsInTheLabPill,
  labPostSplitChipShowsLabTestedPill,
  renderLabPostLongNameFixtureHeader,
  renderLabPostPageHeader,
  resolvePostVerdictLine,
  stripLabPostIntroParagraphFromArticleHtml,
  stripLabPostIntroStatusPrefix,
  stripLabPostLeadMarkdown,
} from "../../../scripts/lab/lab-post-header.js";
import {
  LAB_POST_EXPERIMENT_PLAN_LINK_LABEL,
  LAB_POST_PLANNED_CHIP_EXPLAINER,
} from "../../../scripts/lab/lab-post-header-copy.js";
import {
  listLabWriteupPostIds,
  loadLabWriteupLeadsCatalog,
  prepareLabWriteupHtmlFromMarkdown,
  splitLabWriteupFrontMatter,
} from "../../../scripts/lab/lab-format.js";
import { defaultLabLinkContext } from "../../../scripts/lab/lab-analytics.js";
import { findInternalHrefViolations } from "../../../scripts/verify-lab-internal-hrefs.js";
import { LAB_BADGE_DEST_REJECTED_SAMPLES } from "../analytics/lab-badge-dest-samples.js";
import {
  isAllowlistedLabBadgeDestDecoded,
  resolveAllowlistedLabBadgeDestPath,
} from "../analytics/repo-click.js";
import { loadExperimentsFile } from "../../../scripts/lab/validate-experiments.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("lab post header E1", () => {
  it("appends validated from brief query before hash", () => {
    const href = appendLabPostFromToHref(
      "../lab/posts/EXP-20260802-ponytail-narration-skills.html",
      "skills/briefings/2026-08-22.html#repo-ponytail",
    );
    expect(href).toContain("from=skills%2Fbriefings%2F2026-08-22.html%23repo-ponytail");
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

  it("post lead front matter matches briefings/lab/lab-leads.md", () => {
    const catalog = loadLabWriteupLeadsCatalog(repoRoot);
    for (const id of listLabWriteupPostIds(repoRoot).filter((postId) => postId.startsWith("EXP-"))) {
      expect(catalog[id], `${id} missing from lab-leads.md`).toBeTruthy();
      const md = fs.readFileSync(path.join(repoRoot, "briefings/lab/posts", `${id}.md`), "utf8");
      const { frontMatter } = splitLabWriteupFrontMatter(md);
      expect(frontMatter.lead, `${id} lead front matter`).toBe(catalog[id]);
    }
  });

  it("extracts firecrawl lead from front matter (Copywriter rewrite, not legacy override)", () => {
    const catalog = loadLabWriteupLeadsCatalog(repoRoot);
    const id = "EXP-20260716-firecrawl-enrich-skills";
    const md = fs.readFileSync(path.join(repoRoot, "briefings/lab/posts", `${id}.md`), "utf8");
    const lead = extractLabPostLeadParagraph(id, md);
    expect(lead).toBe(catalog[id]);
    expect(lead).toContain("Firecrawl");
    expect(lead!.toLowerCase()).not.toContain("we switched");
    expect(lead!.toLowerCase()).not.toMatch(/\b(we|our|us)\b/);
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

  it("uses Copywriter final planned chip strings verbatim", () => {
    expect(LAB_POST_EXPERIMENT_PLAN_LINK_LABEL).toBe("See the experiment plan");
    expect(LAB_POST_PLANNED_CHIP_EXPLAINER).toBe(
      "This experiment is in the Lab and hasn't run yet. Results land here once it does.",
    );
  });

  it("run-with-source posts show Lab tested pill, repo link, and badge blurb (firecrawl)", () => {
    const linkCtx = defaultLabLinkContext(1, { "firecrawl/firecrawl": "https://github.com/firecrawl/firecrawl" }, "2026-08-01");
    const firecrawl = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260716-firecrawl-enrich-skills",
    )!;
    expect(labPostHeaderChipMode(firecrawl)).toBe("run_with_source");
    const md = fs.readFileSync(
      path.join(repoRoot, "briefings/lab/posts/EXP-20260716-firecrawl-enrich-skills.md"),
      "utf8",
    );
    const html = renderLabPostPageHeader({
      experiment: firecrawl,
      title: firecrawl.label,
      markdown: md,
      postHref: `${firecrawl.id}.html`,
      linkCtx,
      writeupPostIds: [firecrawl.id],
      repoRoot,
      escape: (t) => t,
    });
    expect(html).toContain("digest-lab-badge-blurb");
    expect(html).toMatch(/lab-post-split-chip__pill[\s\S]*Lab tested/);
    expect(html).toContain("firecrawl/firecrawl");
    expect(html).not.toContain(LAB_POST_EXPERIMENT_PLAN_LINK_LABEL);
  });

  it("planned posts show In the Lab pill and experiment plan link, not a repo (caveman)", () => {
    const linkCtx = defaultLabLinkContext(1, {}, "2026-08-01");
    const caveman = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260913-caveman-compress-skills",
    )!;
    expect(labPostHeaderChipMode(caveman)).toBe("planned");
    expect(caveman.sourceRepo?.trim()).toBeTruthy();
    const md = fs.readFileSync(
      path.join(repoRoot, "briefings/lab/posts/EXP-20260913-caveman-compress-skills.md"),
      "utf8",
    );
    const html = renderLabPostPageHeader({
      experiment: caveman,
      title: caveman.label,
      markdown: md,
      postHref: `${caveman.id}.html`,
      linkCtx,
      writeupPostIds: [caveman.id],
      repoRoot,
      escape: (t) => t,
    });
    expect(html).toMatch(/lab-post-split-chip__pill[\s\S]*In the Lab/);
    expect(html).toContain(LAB_POST_EXPERIMENT_PLAN_LINK_LABEL);
    expect(html).toContain(labPostExperimentPlanHref(caveman.id));
    expect(html).not.toContain("digest-lab-badge-blurb");
    expect(html).toContain("lab-post-panel__planned-explainer");
    expect(html).toContain(LAB_POST_PLANNED_CHIP_EXPLAINER);
    expect(html).not.toContain("github.com");
    expect(html).not.toContain("juliusbrussee/caveman");
  });

  it("run-without-source posts show plain ai-tastemakers repo link only (web enrich)", () => {
    const exp = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260628-web-enrich-skills",
    )!;
    expect(labPostHeaderChipMode(exp)).toBe("run_no_source");
    const md = fs.readFileSync(
      path.join(repoRoot, "briefings/lab/posts/EXP-20260628-web-enrich-skills.md"),
      "utf8",
    );
    const html = renderLabPostPageHeader({
      experiment: exp,
      title: "Richer Skills briefs",
      markdown: md,
      postHref: `${exp.id}.html`,
      linkCtx: defaultLabLinkContext(1, {}, "2026-08-01"),
      writeupPostIds: [exp.id],
      repoRoot,
      escape: (t) => t,
    });
    expect(html).toContain('class="lab-post-header__repo-link"');
    expect(html).not.toContain('class="lab-post-split-chip"');
    expect(html).not.toContain("lab-post-split-chip__pill");
    expect(html).toContain("Leftyshields/ai-tastemakers");
    expect(html).toContain("https://github.com/Leftyshields/ai-tastemakers");
    expect(html).not.toContain("digest-lab-badge-blurb");
  });

  it("all eight EXP write-ups render a header chip (split chip or repo link)", () => {
    const linkCtx = defaultLabLinkContext(1, {}, "2026-08-01");
    const expIds = listLabWriteupPostIds(repoRoot).filter((id) => id.startsWith("EXP-"));
    expect(expIds).toHaveLength(8);
    for (const id of expIds) {
      const exp = loadExperimentsFile(repoRoot).experiments.find((e) => e.id === id);
      expect(exp, id).toBeTruthy();
      const mode = labPostHeaderChipMode(exp!);
      const md = fs.readFileSync(path.join(repoRoot, "briefings/lab/posts", `${id}.md`), "utf8");
      const titleMatch = md.match(/^#\s+(.+)$/m);
      const title = titleMatch?.[1]?.trim() ?? exp!.label;
      const html = renderLabPostPageHeader({
        experiment: exp!,
        title,
        markdown: md,
        postHref: `${id}.html`,
        linkCtx,
        writeupPostIds: expIds,
        repoRoot,
        escape: (t) => t,
      });
      if (mode === "run_no_source") {
        expect(html, id).toContain("lab-post-header__repo-link");
      } else {
        expect(html, id).toContain('class="lab-post-split-chip"');
        expect(html, id).toContain("lab-post-split-chip__pill");
      }
      if (mode === "planned") {
        expect(html, id).toMatch(/In the Lab/);
        expect(html, id).toContain(`#${labExperimentPlanAnchorId(id)}`);
        expect(html, id).not.toMatch(/github\.com/i);
      } else if (mode === "run_with_source") {
        expect(html, id).toMatch(/Lab tested/);
        expect(html, id).toContain("digest-lab-badge-blurb");
      }
    }
  });

  it("planned post plan links resolve to experiments.html anchors when site is built", () => {
    for (const id of [
      "EXP-20260913-caveman-compress-skills",
      "EXP-20260913-whynow-memory-skills",
      "EXP-20260913-rank-bootstrap-skills",
    ]) {
      const postPath = path.join(repoRoot, "site/lab/posts", `${id}.html`);
      if (!fs.existsSync(postPath)) continue;
      const violations = findInternalHrefViolations(fs.readFileSync(postPath, "utf8"), postPath);
      expect(violations, id).toEqual([]);
    }
  });

  it("experiments dashboard JS exposes stable lab-exp plan anchors", () => {
    const js = fs.readFileSync(path.join(repoRoot, "scripts/lab/experiments.js"), "utf8");
    expect(js).toContain('return "lab-exp-" + expId');
    for (const id of [
      "EXP-20260913-caveman-compress-skills",
      "EXP-20260913-whynow-memory-skills",
      "EXP-20260913-rank-bootstrap-skills",
    ]) {
      expect(js).toContain(`planAnchorId(exp.id)`);
      expect(labExperimentPlanAnchorId(id)).toBe(`lab-exp-${id}`);
    }
  });

  it("panel lead never shows queue rank or backlog labels", () => {
    const linkCtx = defaultLabLinkContext(1, {}, "2026-08-01");
    for (const id of listLabWriteupPostIds(repoRoot)) {
      const exp = loadExperimentsFile(repoRoot).experiments.find((e) => e.id === id);
      if (!exp) continue;
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
      const panel = html.match(/<section class="lab-post-panel">[\s\S]*?<\/section>/i)?.[0] ?? "";
      const leadMatch = panel.match(/class="lab-post-panel__lead"[^>]*>([^<]+)</);
      if (leadMatch?.[1]) {
        const lead = leadMatch[1];
        expect(lead, `${id} lead`).not.toMatch(/#\d/);
        expect(lead, `${id} lead`).not.toMatch(/\bRANK-\d/i);
        expect(lead, `${id} lead`).not.toMatch(/backlog/i);
        expect(labPostPanelLeadIsForbidden(lead), `${id} lead`).toBe(false);
      }
    }
  });

  it("stripLabPostLeadMarkdown removes literal asterisks", () => {
    expect(stripLabPostLeadMarkdown("_**Shipped Aug 1, 2026.** Body._")).toBe("Shipped Aug 1, 2026. Body.");
    expect(stripLabPostLeadMarkdown("no **bold** here")).toBe("no bold here");
  });

  it("stripLabPostIntroStatusPrefix keeps full intro body for panel lead fallback", () => {
    expect(
      stripLabPostIntroStatusPrefix("Shipped Aug 1, 2026. This experiment swapped the tool to Firecrawl."),
    ).toBe("This experiment swapped the tool to Firecrawl.");
    expect(stripLabPostIntroStatusPrefix("Queued, not started.")).toBe("");
  });

  it("panel leads avoid first person and em dashes", () => {
    for (const id of listLabWriteupPostIds(repoRoot)) {
      const md = fs.readFileSync(path.join(repoRoot, "briefings/lab/posts", `${id}.md`), "utf8");
      const lead = extractLabPostLeadParagraph(id, md);
      if (!lead) continue;
      expect(lead, `${id} lead`).not.toMatch(/\b(we|our|us)\b/i);
      expect(lead, `${id} lead`).not.toMatch(/\u2014|\u2013/);
    }
  });

  it("long-repo fixture lead has no markdown artifacts", () => {
    const html = renderLabPostLongNameFixtureHeader(
      defaultLabLinkContext(1, {}, "2026-08-01"),
      repoRoot,
      (t) => t,
    );
    expect(html).not.toContain("**");
    expect(html).toContain("lab-post-panel__lead");
    expect(html).toContain("Firecrawl");
    expect(html).toContain("lab-post-panel__badge-blurb");
  });

  it("panel lead appears once in full post HTML (no duplicate body intro)", () => {
    const linkCtx = defaultLabLinkContext(1, {}, "2026-08-01");
    for (const id of listLabWriteupPostIds(repoRoot)) {
      const exp = loadExperimentsFile(repoRoot).experiments.find((e) => e.id === id);
      if (!exp) continue;
      const leadCandidate = extractLabPostLeadParagraph(
        id,
        fs.readFileSync(path.join(repoRoot, "briefings/lab/posts", `${id}.md`), "utf8"),
      );
      if (!leadCandidate) continue;
      const mdPath = path.join(repoRoot, "briefings/lab/posts", `${id}.md`);
      const md = fs.readFileSync(mdPath, "utf8");
      const titleMatch = md.match(/^#\s+(.+)$/m);
      const title = titleMatch?.[1]?.trim() ?? exp.label;
      let article = prepareLabWriteupHtmlFromMarkdown(md).replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "");
      article = stripLabPostIntroParagraphFromArticleHtml(article);
      const header = renderLabPostPageHeader({
        experiment: exp,
        title,
        markdown: md,
        postHref: `${id}.html`,
        linkCtx,
        writeupPostIds: [id],
        repoRoot,
        escape: (t) => t,
      });
      const full = `${header}<article>${article}</article>`;
      const { lead, count } = countLabPostPanelLeadOccurrences(full);
      if (lead) {
        expect(count, `${id}: duplicate panel lead`).toBe(1);
      }
    }
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
