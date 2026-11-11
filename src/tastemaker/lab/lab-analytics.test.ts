import { describe, it, expect } from "vitest";
import {
  defaultLabLinkContext,
  findLabAnalyticsViolations,
  labLinkClickScript,
  prepareLabPostArticleHtml,
  resolveLabToolHref,
} from "../../../scripts/lab/lab-analytics.js";

describe("Lab UX42 analytics", () => {
  it("routes allowlisted GitHub URLs through go", () => {
    const ctx = defaultLabLinkContext(0, { "octo/repo": "https://github.com/octo/repo" }, "2026-10-19");
    expect(resolveLabToolHref("https://github.com/octo/repo", ctx)).toContain("../go/index.html?");
    expect(resolveLabToolHref("https://example.com/x", ctx)).toBe("https://example.com/x");
  });

  it("lab link script mentions lab_link_click event", () => {
    expect(labLinkClickScript()).toContain("lab_link_click");
  });

  it("lab link script tracks Back button clicks", () => {
    expect(labLinkClickScript()).toContain("button[data-lab-section]");
  });

  it("tags lab post body links and routes GitHub through go", () => {
    const ctx = defaultLabLinkContext(1, { "firecrawl/firecrawl": "https://github.com/firecrawl/firecrawl" }, "2026-08-01");
    const html = prepareLabPostArticleHtml(
      '<p><a href="https://github.com/firecrawl/firecrawl">Firecrawl</a> and <a href="EXP-20260628-web-enrich-skills.html" data-lab-section="posts">prior</a></p>',
      ctx,
    );
    expect(html).toContain("../../go/index.html?");
    expect(html).toContain("firecrawl%2Ffirecrawl");
    expect(html.match(/data-lab-section="posts"/g)?.length).toBe(2);
  });

  it("escapes resolved href values in lab post link rewrite", () => {
    const ctx = defaultLabLinkContext(0, { "acme/demo": "https://github.com/acme/demo" }, "2026-08-01");
    const html = prepareLabPostArticleHtml(
      '<p><a href="https://github.com/acme/demo">x</a></p>',
      ctx,
    );
    expect(html).toMatch(/href="[^"]*"/);
    expect(html).not.toContain('href="../go/index.html?repo=acme/demo"');
    expect(html).toContain("&amp;");
  });

  it("detects missing PostHog and tracking attrs", () => {
    const bad = '<html><body><a href="x">y</a></body></html>';
    expect(findLabAnalyticsViolations(bad, "site/lab/x.html").length).toBeGreaterThan(0);
    const ok = `<html>${labLinkClickScript()}<body><a href="x" data-lab-section="tools">y</a><script>posthog.init('k')</script></body></html>`;
    expect(findLabAnalyticsViolations(ok, "site/lab/x.html")).toEqual([]);
  });
});
