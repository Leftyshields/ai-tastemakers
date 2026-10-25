import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderSafeMarkdown } from "../../../scripts/safe-markdown.js";
import {
  buildIsoDatePt,
  findLabProseBacktickViolations,
  findLabProseInlineSpacingViolations,
  listLabWriteupPostIds,
  normalizeLabWriteupMarkdown,
  prepareLabProseHtmlFromMarkdown,
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

  it("UX43 write-up tables wrap and env vars render as code without backticks", () => {
    const md = `| Flag | Meaning |
| --- | --- |
| Web | \`DIGEST_ENRICH_WEB=1\` default |`;
    const html = prepareLabProseHtmlFromMarkdown(md);
    expect(html).toContain("lab-post-table-wrap");
    expect(html).toContain("<code");
    expect(html).toContain("DIGEST_ENRICH_WEB=1");
    expect(html).not.toContain("`");
    expect(html).toContain('data-label="Flag"');
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
