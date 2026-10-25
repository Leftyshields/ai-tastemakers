import { describe, it, expect } from "vitest";
import { newRepoHtmlBadge } from "../src/tastemaker/writers/new-badge.js";
import { renderSafeMarkdown, sanitizeHtml } from "./safe-markdown.js";

describe("renderSafeMarkdown", () => {
  it("renders ordinary markdown", () => {
    const html = renderSafeMarkdown("**What it does:** A CLI.");
    expect(html).toContain("<strong>What it does:</strong>");
    expect(html).toContain("A CLI.");
  });

  it("keeps the New-repo badge HTML used in daily briefs", () => {
    const html = renderSafeMarkdown(`## 1. acme/demo ${newRepoHtmlBadge(true)}`);
    expect(html).toContain('class="new-repo-badge"');
    expect(html).toContain("New");
    expect(html).toContain("<h2>");
  });

  it("drops raw script tags from a brief", () => {
    const html = renderSafeMarkdown(
      '**Build with it:** Try this. <script>alert(1)</script>',
    );
    expect(html).not.toContain("<script");
    expect(html).not.toContain("alert(1)");
    expect(html).toContain("Try this.");
  });

  it("drops javascript: links", () => {
    const html = renderSafeMarkdown("[click](javascript:alert(1))");
    expect(html).not.toContain("javascript:");
    expect(html).toContain("click");
  });

  it("keeps sibling lab post hrefs", () => {
    const html = renderSafeMarkdown("[prior](EXP-20260628-web-enrich-skills.html)");
    expect(html).toContain('href="EXP-20260628-web-enrich-skills.html"');
  });

  it("keeps parent-relative briefing hrefs from lab posts", () => {
    const html = renderSafeMarkdown(
      "[Aug 17, 2026](../../skills/briefings/2026-08-17.html)",
    );
    expect(html).toContain('href="../../skills/briefings/2026-08-17.html"');
  });
});

describe("sanitizeHtml", () => {
  it("strips event handlers and unsafe src", () => {
    const html = sanitizeHtml('<img src="x" onerror="alert(1)" /><p onclick="evil()">ok</p>');
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("onclick");
    expect(html).not.toContain('src="x"');
    expect(html).toContain("<p>ok</p>");
  });

  it("keeps https links and rejects data URLs", () => {
    const html = sanitizeHtml(
      '<a href="https://github.com/acme/demo">ok</a><a href="data:text/html,hi">no</a>',
    );
    expect(html).toContain('href="https://github.com/acme/demo"');
    expect(html).not.toContain("data:");
  });

  it("strips dangerous style payloads", () => {
    const html = sanitizeHtml('<span style="background:url(javascript:alert(1))">x</span>');
    expect(html).not.toContain("javascript");
    expect(html).toContain("<span>x</span>");
  });

  it("rejects protocol-relative and backslash-open href tricks", () => {
    const evilProtocol = sanitizeHtml('<a href="//evil.com/lab/posts/x.html">x</a>');
    expect(evilProtocol).not.toContain('href="//evil.com');
    expect(evilProtocol).toContain(">x</a>");

    const evilBackslash = sanitizeHtml('<a href="/\\evil.com/lab/posts/x.html">y</a>');
    expect(evilBackslash).not.toContain('href="/\\evil.com');
    expect(evilBackslash).toContain(">y</a>");
  });
});
