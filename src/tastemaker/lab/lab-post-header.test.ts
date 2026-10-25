import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LAB_TESTED_BADGE_BLURB,
  appendLabBadgeAttributionToHref,
  countLabPostPanelLeadOccurrences,
  extractLabPostLeadParagraph,
  firstResultSectionSentence,
  labPostPanelLeadIsForbidden,
  labPostShowsLabTestedBadge,
  renderLabPostLongNameFixtureHeader,
  renderLabPostPageHeader,
  resolvePostVerdictLine,
  stripLabPostIntroParagraphFromArticleHtml,
  stripLabPostIntroStatusPrefix,
  stripLabPostLeadMarkdown,
} from "../../../scripts/lab/lab-post-header.js";
import {
  listLabWriteupPostIds,
  loadLabWriteupLeadsCatalog,
  prepareLabWriteupHtmlFromMarkdown,
  splitLabWriteupFrontMatter,
} from "../../../scripts/lab/lab-format.js";
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

  it("shows badge blurb only when the Lab tested pill renders (firecrawl yes, planned caveman no)", () => {
    const linkCtx = defaultLabLinkContext(1, { "firecrawl/firecrawl": "https://github.com/firecrawl/firecrawl" }, "2026-08-01");
    const firecrawl = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260716-firecrawl-enrich-skills",
    )!;
    const caveman = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260913-caveman-compress-skills",
    )!;
    const md = (id: string) =>
      fs.readFileSync(path.join(repoRoot, "briefings/lab/posts", `${id}.md`), "utf8");
    const render = (exp: (typeof firecrawl)) =>
      renderLabPostPageHeader({
        experiment: exp,
        title: exp.label,
        markdown: md(exp.id),
        postHref: `${exp.id}.html`,
        linkCtx,
        writeupPostIds: [exp.id],
        repoRoot,
        escape: (t) => t,
      });

    const doneHtml = render(firecrawl);
    expect(labPostShowsLabTestedBadge(firecrawl)).toBe(true);
    expect(doneHtml).toContain("digest-lab-badge-blurb");
    expect(doneHtml).toContain("lab-post-split-chip__pill");

    const plannedHtml = render(caveman);
    expect(labPostShowsLabTestedBadge(caveman)).toBe(false);
    expect(plannedHtml).not.toContain("digest-lab-badge-blurb");
    expect(plannedHtml).not.toContain("lab-post-split-chip__pill");
    expect(plannedHtml).toContain("lab-post-split-chip__repo");
  });

  it("omits badge blurb on done posts with no sourceRepo (web enrich)", () => {
    const exp = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260628-web-enrich-skills",
    )!;
    expect(exp.status).toBe("done");
    expect(exp.sourceRepo?.trim()).toBeFalsy();
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
    expect(labPostShowsLabTestedBadge(exp)).toBe(true);
    expect(html).not.toContain("digest-lab-badge-blurb");
    expect(html).not.toContain("lab-post-split-chip__pill");
  });

  it("omits split chip when experiment has no sourceRepo (rank bootstrap)", () => {
    const exp = loadExperimentsFile(repoRoot).experiments.find(
      (e) => e.id === "EXP-20260913-rank-bootstrap-skills",
    )!;
    expect(exp.sourceRepo?.trim()).toBeFalsy();
    const md = fs.readFileSync(
      path.join(repoRoot, "briefings/lab/posts/EXP-20260913-rank-bootstrap-skills.md"),
      "utf8",
    );
    const html = renderLabPostPageHeader({
      experiment: exp,
      title: "Smarter early ranking",
      markdown: md,
      postHref: `${exp.id}.html`,
      linkCtx: defaultLabLinkContext(1, {}, "2026-08-01"),
      writeupPostIds: [exp.id],
      repoRoot,
      escape: (t) => t,
    });
    expect(html).toContain('id="lab-post-back-btn"');
    expect(html).toContain("lab-post-panel__title");
    expect(html).not.toContain('class="lab-post-split-chip"');
    expect(html).not.toContain('class="lab-post-header__vdiv"');
    expect(html).not.toContain("digest-lab-badge-blurb");
    expect(html).toContain('class="lab-post-panel__lead"');
    const lead = extractLabPostLeadParagraph(exp.id, md);
    expect(lead).toBe(loadLabWriteupLeadsCatalog(repoRoot)[exp.id]);
    expect(lead).not.toBe("Queued, not started.");
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
