import { describe, it, expect } from "vitest";
import {
  buildGenericOutboundGoUrl,
  findUntrackedExternalHrefs,
  rewriteOutboundLinksInHtml,
  rewriteOutboundLinksInPlainText,
} from "./rewrite-outbound-links.js";
import { verifyOutboundDestination, signOutboundDestination } from "./outbound-link-sign.js";

const site = "https://example.com/app";
const key = "test-signing-key";
const allowlist = { "acme/demo": "https://github.com/acme/demo" };

const ctx = {
  siteBaseUrl: site,
  signingKey: key,
  githubAllowlist: allowlist,
  channel: "pages" as const,
  surface: "test",
  section: "oss" as const,
  digestDate: "2026-08-16",
};

describe("rewriteOutboundLinksInHtml", () => {
  it("rewrites allowlisted GitHub and signed external links", () => {
    const html =
      '<p><a href="https://github.com/acme/demo">Demo</a> and <a href="https://docs.example.com/x">Docs</a></p>';
    const out = rewriteOutboundLinksInHtml(html, ctx);
    expect(out).toContain("/go/?");
    expect(out).not.toContain('href="https://github.com/acme/demo"');
    expect(out).not.toContain('href="https://docs.example.com/x"');
    expect(findUntrackedExternalHrefs(out, site)).toEqual([]);
  });

  it("leaves same-site and unsubscribe links alone", () => {
    const html =
      '<a href="../briefings/2026-08-16.html">Brief</a> <a href="https://example.com/app/unsubscribe.html?email=a">Unsub</a>';
    const out = rewriteOutboundLinksInHtml(html, ctx);
    expect(out).toContain("../briefings/2026-08-16.html");
    expect(out).toContain("unsubscribe.html");
  });
});

describe("outbound signing", () => {
  it("round-trips destination verification", () => {
    const dest = "https://herdr.dev/docs/agent-skill/";
    const sig = signOutboundDestination(dest, key);
    expect(verifyOutboundDestination(dest, sig, key)).toBe(true);
    expect(verifyOutboundDestination(dest, "bad", key)).toBe(false);
  });

  it("buildGenericOutboundGoUrl includes sig param", () => {
    const url = buildGenericOutboundGoUrl(site, "https://evil.example/path", ctx)!;
    expect(url).toContain("event=outbound_link_click");
    expect(url).toContain("sig=");
  });
});

describe("rewriteOutboundLinksInPlainText", () => {
  it("wraps bare URLs", () => {
    const text = "See https://github.com/acme/demo today.";
    const out = rewriteOutboundLinksInPlainText(text, ctx);
    expect(out).toContain("/go/?");
    expect(out).not.toContain("https://github.com/acme/demo");
  });
});
