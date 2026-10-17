import { describe, it, expect } from "vitest";
import { renderGoRedirectPage, resolveGoPageDestination } from "./digest-go-page.js";

describe("renderGoRedirectPage", () => {
  it("includes a single capture guard and Continue to GitHub fallback", () => {
    const html = renderGoRedirectPage({ "acme/demo": "https://github.com/acme/demo" });
    expect(html).toContain("Continue to GitHub");
    expect(html).toContain("if (captured) return");
    expect(html).toContain('posthog.capture("repo_click"');
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
});
