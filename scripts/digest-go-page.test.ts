import { describe, it, expect } from "vitest";
import { renderGoRedirectPage, resolveGoPageDestination } from "./digest-go-page.js";
import {
  OutboundDestRegistry,
  outboundDestHash,
  normalizeOutboundDest,
} from "../src/tastemaker/analytics/outbound-dest-manifest.js";

describe("renderGoRedirectPage", () => {
  it("includes a single capture guard and Continue to GitHub fallback", () => {
    const html = renderGoRedirectPage({ "acme/demo": "https://github.com/acme/demo" });
    expect(html).toContain("Continue to GitHub");
    expect(html).toContain("if (captured) return");
    expect(html).toContain('captureOnce("repo_click"');
    expect(html).toContain('captureOnce("lab_badge_click"');
    expect(html).toContain('eventName === "lab_badge_click"');
    expect(html).toContain("<noscript>");
    expect(html).toContain('name="robots" content="noindex, nofollow"');
    expect(html).toContain('rel="canonical"');
  });
});

describe("resolveGoPageDestination", () => {
  const allowlist = { "acme/demo": "https://github.com/acme/demo" };
  const home = "https://example.com/";

  function manifestWith(...dests: string[]): Set<string> {
    const r = new OutboundDestRegistry();
    for (const d of dests) r.register(d);
    return new Set(r.toSortedHashes());
  }

  it("rejects non github repo params", () => {
    expect(resolveGoPageDestination("?repo=javascript:alert(1)", allowlist, home)).toBe(home);
  });

  it("resolves lab badge dest to lab post on site origin", () => {
    const dest = "/ai-tastemakers/lab/posts/EXP-20260716-firecrawl-enrich-skills.html";
    expect(
      resolveGoPageDestination(
        `?event=lab_badge_click&dest=${encodeURIComponent(dest)}`,
        allowlist,
        "https://example.com/home/",
      ),
    ).toBe(`https://example.com${dest}`);
  });

  it("resolves lab badge dest with from_list attribution query", () => {
    const dest =
      "/ai-tastemakers/lab/posts/EXP-20260716-firecrawl-enrich-skills.html?from_list=oss&from_rank=4";
    expect(
      resolveGoPageDestination(
        `?event=lab_badge_click&dest=${encodeURIComponent(dest)}`,
        allowlist,
        "https://example.com/home/",
      ),
    ).toBe(`https://example.com${dest}`);
  });

  it("rejects open redirect lab dest paths", () => {
    expect(
      resolveGoPageDestination(
        "?event=lab_badge_click&dest=https://evil.com/phish",
        allowlist,
        home,
      ),
    ).toBe(home);
  });

  it("redirects when dest hash is in manifest (manifest hit)", () => {
    const dest = "https://docs.example.com/guide";
    const manifest = manifestWith(dest);
    expect(
      resolveGoPageDestination(
        `?event=outbound_link_click&dest=${encodeURIComponent(dest)}`,
        allowlist,
        home,
        manifest,
      ),
    ).toBe(normalizeOutboundDest(dest));
  });

  it("rejects forged dest not in manifest", () => {
    const manifest = manifestWith("https://docs.example.com/guide");
    expect(
      resolveGoPageDestination(
        "?event=outbound_link_click&dest=https://evil.com/phish",
        allowlist,
        home,
        manifest,
      ),
    ).toBe(home);
  });

  it("rejects tampered dest (listed URL with path changed)", () => {
    const allowed = "https://docs.example.com/guide";
    const manifest = manifestWith(allowed);
    const tampered = "https://docs.example.com/guide/evil";
    expect(
      resolveGoPageDestination(
        `?event=outbound_link_click&dest=${encodeURIComponent(tampered)}`,
        allowlist,
        home,
        manifest,
      ),
    ).toBe(home);
    expect(outboundDestHash(normalizeOutboundDest(allowed)!)).not.toBe(
      outboundDestHash(normalizeOutboundDest(tampered)!),
    );
  });
});

describe("renderGoRedirectPage outbound", () => {
  it("includes outbound_link_click capture and manifest lookup", () => {
    const html = renderGoRedirectPage({}, "/", "https://leftyshields.github.io/ai-tastemakers", [
      "abc123",
    ]);
    expect(html).toContain("outbound_link_click");
    expect(html).toContain("resolveManifestOutbound");
    expect(html).toContain("MANIFEST_HASHES");
  });
});
