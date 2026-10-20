import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderSafeMarkdown } from "../../../scripts/safe-markdown.js";
import {
  applyLabExplainerHeadingAnchor,
  findLabProseInlineSpacingViolations,
  listLabWriteupPostIds,
  sanitizeLabVisibleHtml,
} from "../../../scripts/lab/lab-format.js";
import { findLabInternalHrefViolations } from "../../../scripts/verify-lab-internal-hrefs.js";
import { buildLabPublicFile, renderLabDashboardHtml } from "../../../scripts/lab/build-lab-public.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

describe("Lab prose spacing (UX26 UX27)", () => {
  it("sanitizeLabVisibleHtml keeps spaces beside inline tags", () => {
    const md = "- **[Tool inventory](tools.html)** repos that appeared";
    const html = sanitizeLabVisibleHtml(renderSafeMarkdown(md));
    expect(html).toContain("</strong> repos");
    expect(findLabProseInlineSpacingViolations(`<article class="lab-prose-capped">${html}</article>`)).toEqual([]);
  });

  it("UX28 explainer heading exposes how-to-read-an-experiment id", () => {
    const html = applyLabExplainerHeadingAnchor(
      sanitizeLabVisibleHtml(renderSafeMarkdown("## How to read an experiment\n\nBody.")),
    );
    expect(html).toContain('id="how-to-read-an-experiment"');
    expect(html).toContain("scroll-mt-20");
  });

  it("UX29 hides Write up links when post markdown is missing", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    const writeupIds = new Set(listLabWriteupPostIds(repoRoot));
    expect(writeupIds.has("EXP-20260701-landing-layout")).toBe(false);
    expect(html).not.toContain("posts/EXP-20260701-landing-layout.html");
    expect(html).not.toContain("posts/EXP-20260716-firecrawl-enrich-skills.html");
  });

  it("UX30 flags broken same page anchors", () => {
    const bad = findLabInternalHrefViolations(
      '<a href="#how-to-read-an-experiment">Full explainer</a>',
      "site/lab/index.html",
    );
    expect(bad.length).toBeGreaterThan(0);
    const ok = findLabInternalHrefViolations(
      '<h2 id="how-to-read-an-experiment">How to read</h2><a href="#how-to-read-an-experiment">Full explainer</a>',
      "site/lab/index.html",
    );
    expect(ok).toEqual([]);
  });

  it("rendered lab dashboard prose has no inline spacing violations", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const dash = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(dash).not.toContain("Right now (Aug 16, 2026)");
    const sample = sanitizeLabVisibleHtml(
      renderSafeMarkdown(
        "Everything in `/lab/` is safe. See `lab/experiments.json` for data.",
      ),
    );
    const wrapped = `<article class="lab-prose-capped">${sample}</article>`;
    expect(findLabProseInlineSpacingViolations(wrapped)).toEqual([]);
  });
});
