import { describe, it, expect } from "vitest";
import { renderGoRedirectPage, resolveGoPageDestination } from "./digest-go-page.js";

describe("renderGoRedirectPage", () => {
  it("includes a single capture guard and Continue to GitHub fallback", () => {
    const html = renderGoRedirectPage({ "acme/demo": "https://github.com/acme/demo" });
    expect(html).toContain("Continue to GitHub");
    expect(html).toContain("if (captured) return");
    expect(html).toContain('captureOnce("repo_click"');
    expect(html).toContain('captureOnce("lab_badge_click"');
    expect(html).toContain('eventName === "lab_badge_click"');
    expect(html).toContain("<noscript>");
  });
});

describe("resolveGoPageDestination", () => {
  const allowlist = { "acme/demo": "https://github.com/acme/demo" };

  it("rejects non github repo params", () => {
    expect(
      resolveGoPageDestination("?repo=javascript:alert(1)", allowlist, "https://example.com/"),
    ).toBe("https://example.com/");
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

  it("rejects open redirect lab dest paths", () => {
    expect(
      resolveGoPageDestination(
        "?event=lab_badge_click&dest=https://evil.com/phish",
        allowlist,
        "https://example.com/",
      ),
    ).toBe("https://example.com/");
  });
});
