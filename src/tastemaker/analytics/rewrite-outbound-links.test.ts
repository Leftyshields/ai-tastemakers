import { describe, it, expect } from "vitest";
import {
  buildGenericOutboundGoUrl,
  findUntrackedExternalHrefs,
  rewriteOutboundLinksInHtml,
  rewriteOutboundLinksInPlainText,
} from "./rewrite-outbound-links.js";
import { OutboundDestRegistry } from "./outbound-dest-manifest.js";

const site = "https://example.com/app";
const allowlist = { "acme/demo": "https://github.com/acme/demo" };

function ctx(registry?: OutboundDestRegistry) {
  return {
    siteBaseUrl: site,
    destRegistry: registry,
    githubAllowlist: allowlist,
    channel: "pages" as const,
    surface: "test",
    section: "oss" as const,
    digestDate: "2026-08-16",
  };
}

describe("rewriteOutboundLinksInHtml", () => {
  it("rewrites allowlisted GitHub and manifest-tracked external links", () => {
    const registry = new OutboundDestRegistry();
    const html =
      '<p><a href="https://github.com/acme/demo">Demo</a> and <a href="https://docs.example.com/x">Docs</a></p>';
    const out = rewriteOutboundLinksInHtml(html, ctx(registry));
    expect(out).toContain("/go/?");
    expect(out).not.toContain('href="https://github.com/acme/demo"');
    expect(out).not.toContain('href="https://docs.example.com/x"');
    expect(out).not.toContain("sig=");
    expect(findUntrackedExternalHrefs(out, site)).toEqual([]);
    expect(registry.hasRawDest("https://docs.example.com/x")).toBe(true);
  });

  it("leaves same-site and unsubscribe links alone", () => {
    const html =
      '<a href="../briefings/2026-08-16.html">Brief</a> <a href="https://example.com/app/unsubscribe.html?email=a">Unsub</a>';
    const out = rewriteOutboundLinksInHtml(html, ctx());
    expect(out).toContain("../briefings/2026-08-16.html");
    expect(out).toContain("unsubscribe.html");
  });
});

describe("buildGenericOutboundGoUrl", () => {
  it("includes dest param without signature", () => {
    const registry = new OutboundDestRegistry();
    const url = buildGenericOutboundGoUrl(site, "https://evil.example/path", ctx(registry))!;
    expect(url).toContain("event=outbound_link_click");
    expect(url).toContain("dest=");
    expect(url).not.toContain("sig=");
  });
});

describe("rewriteOutboundLinksInPlainText", () => {
  it("wraps bare URLs", () => {
    const out = rewriteOutboundLinksInPlainText("See https://github.com/acme/demo today.", ctx());
    expect(out).toContain("/go/?");
    expect(out).not.toContain("https://github.com/acme/demo");
  });
});
