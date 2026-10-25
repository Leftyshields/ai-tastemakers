import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderSafeMarkdown } from "../../../scripts/safe-markdown.js";
import {
  buildIsoDatePt,
  findLabPostBacktickViolations,
  findLabPostUnrenderedTableViolations,
  findLabProseBacktickViolations,
  findLabProseInlineSpacingViolations,
  listLabWriteupPostIds,
  normalizeLabWriteupMarkdown,
  prepareLabProseHtmlFromMarkdown,
  repairGfmTableDelimiterRows,
  sanitizeLabVisibleHtml,
} from "../../../scripts/lab/lab-format.js";
import { buildLabPublicFile, renderLabDashboardHtml } from "../../../scripts/lab/build-lab-public.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

describe("Lab UX26 UX28 UX29", () => {
  it("sanitizeLabVisibleHtml keeps spaces beside inline tags", () => {
    const md = "- **[Tool inventory](tools.html)** repos that appeared";
    const html = sanitizeLabVisibleHtml(renderSafeMarkdown(md));
    expect(html).toContain("</strong> repos");
    expect(findLabProseInlineSpacingViolations(`<article class="lab-prose-capped">${html}</article>`)).toEqual([]);
  });

  it("UX28 dashboard omits How to read this summary above control panel", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).not.toContain("How to read this.");
    expect(html).not.toContain("Full explainer");
    expect(html).not.toContain("lab-how-to-read");
  });

  it("UX29 hides Write up links when post markdown is missing", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const writeupIds = new Set(listLabWriteupPostIds(repoRoot));
    expect(writeupIds.has("EXP-20260701-landing-layout")).toBe(false);
    expect(html).not.toContain("posts/EXP-20260701-landing-layout.html");
    expect(html).toContain("posts/EXP-20260716-firecrawl-enrich-skills.html");
  });

  it("UX35 index intro is short and links About in nav", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const dash = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(dash).not.toContain("What this is");
    expect(dash).not.toContain("Right now (Aug 16, 2026)");
  });

  it("UX26 UX35 inline backticks become code elements without literal backticks", () => {
    const sample = prepareLabProseHtmlFromMarkdown(
      "Everything in `/lab/` is safe. See `lab/experiments.public.json` for data.",
    );
    expect(sample).toContain("<code");
    expect(sample).not.toContain("`");
    const wrapped = `<article class="lab-prose-capped">${sample}</article>`;
    expect(findLabProseInlineSpacingViolations(wrapped)).toEqual([]);
    expect(findLabProseBacktickViolations(wrapped)).toEqual([]);
  });

  it("UX43 detects literal backticks inside stacked table cells", () => {
    const bad = `<article class="lab-prose-capped"><div class="lab-post-table-wrap"><table class="lab-post-table"><tbody><tr><td data-label="We want">Better briefs</td><td data-label="What good looks like">see \`repo_click\` here</td></tr></tbody></table></div></article>`;
    expect(findLabPostBacktickViolations(bad, "site/lab/posts/x.html")).toHaveLength(1);
    expect(findLabPostBacktickViolations(bad, "site/lab/posts/x.html")[0]).toContain("table cell");

    const md = `| We want | What "good" looks like |
| --- | --- |
| Better briefs | \`repo_click\` with \`section=skills\` |`;
    const html = prepareLabProseHtmlFromMarkdown(md);
    const wrapped = `<article class="lab-prose-capped">${html}</article>`;
    expect(findLabPostBacktickViolations(wrapped, "site/lab/posts/x.html")).toEqual([]);
    expect(html).toContain('data-label="What &quot;good&quot; looks like"');
    expect(html).toContain('<span class="lab-post-code');
    expect(html).not.toMatch(/<td[^>]*>[^<]*`/);
  });

  it("UX43 write-up tables wrap and inline code renders without backticks", () => {
    const md = `| Signal | Meaning |
| --- | --- |
| Traffic | \`repo_click\` with \`section=skills\` |`;
    const html = prepareLabProseHtmlFromMarkdown(md);
    expect(html).toContain("lab-post-table-wrap");
    expect(html).toContain("lab-post-code");
    expect(html).toContain("repo_click");
    expect(html).not.toContain("`");
    expect(html).toContain('data-label="Signal"');
  });

  it("Firecrawl post v3 plain English copy (no env flag names)", () => {
    const mdPath = path.join(repoRoot, "briefings/lab/posts/EXP-20260716-firecrawl-enrich-skills.md");
    const md = fs.readFileSync(mdPath, "utf8");
    expect(md).toContain("Better source pages for Skills briefs");
    expect(md).not.toMatch(/DIGEST_ENRICH/);
    expect(md).not.toContain("FIRECRAWL_API_KEY");
    expect(md).not.toContain("## Operator notes");
    expect(md).toContain("seven day momentum");
    const html = prepareLabProseHtmlFromMarkdown(md);
    expect(html).not.toMatch(/DIGEST_ENRICH/);
    expect(html).not.toContain("FIRECRAWL_API_KEY");
    expect(html).toContain("Sign of success");
    expect(html).not.toContain("Operator notes");
  });

  it("UX43 Firecrawl post article matches built HTML backtick rules", () => {
    const mdPath = path.join(repoRoot, "briefings/lab/posts/EXP-20260716-firecrawl-enrich-skills.md");
    const md = fs.readFileSync(mdPath, "utf8");
    const article = `<article class="brief-content lab-prose-capped prose">${prepareLabProseHtmlFromMarkdown(md)}</article>`;
    const rel = "site/lab/posts/EXP-20260716-firecrawl-enrich-skills.html";
    expect(findLabPostBacktickViolations(article, rel)).toEqual([]);
    expect(article).toContain("lab-post-table-wrap");
    expect(article).not.toContain('data-label="What &amp;quot;');

    const builtPath = path.join(repoRoot, rel);
    if (fs.existsSync(builtPath)) {
      const page = fs.readFileSync(builtPath, "utf8");
      expect(findLabPostBacktickViolations(page, rel)).toEqual([]);
    }
  });

  it("UX43 repairs GFM delimiter rows with space-only cells so marked emits tables", () => {
    const broken = `| Phase | Window | Outcome |
|-------|-------------|         |
| Baseline | a | b |`;
    const repaired = repairGfmTableDelimiterRows(broken);
    expect(repaired).toContain("| --- |");
    const html = prepareLabProseHtmlFromMarkdown(broken);
    expect(html).toContain("lab-post-table-wrap");
    expect(html).toContain("<table");
    expect(findLabPostUnrenderedTableViolations(`<article class="lab-prose-capped">${html}</article>`, "test")).toEqual([]);
  });

  it("UX43 web enrich write up What happened table renders (not a pipe paragraph)", () => {
    const mdPath = path.join(repoRoot, "briefings/lab/posts/EXP-20260628-web-enrich-skills.md");
    const md = fs.readFileSync(mdPath, "utf8");
    const section = md.split("## What happened")[1]?.split("### Metrics")[0] ?? "";
    const html = prepareLabProseHtmlFromMarkdown(section);
    expect(html).toContain("lab-post-table-wrap");
    expect(html).not.toMatch(/<p>\|\s*Period/);
    expect(findLabPostUnrenderedTableViolations(`<article class="lab-prose-capped">${html}</article>`, "test")).toEqual([]);
  });

  it("UX46 normalizes write up dates and about approximations", () => {
    const md = "_**Kept (2026-08-29).** Cut ~18% with hook on 2026-08-17._";
    const out = normalizeLabWriteupMarkdown(md);
    expect(out).toContain("Kept on Aug 29, 2026");
    expect(out).toContain("about 18%");
    expect(out).toContain("Aug 17, 2026");
    expect(out).not.toMatch(/~\s*\d/);
    expect(out).not.toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it("UX37 buildIsoDatePt uses America/Los_Angeles calendar date", () => {
    expect(buildIsoDatePt(new Date("2026-10-20T06:59:59.000Z"))).toBe("2026-10-19");
    expect(buildIsoDatePt(new Date("2026-10-20T07:00:00.000Z"))).toBe("2026-10-20");
  });
});
