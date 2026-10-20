import { describe, it, expect } from "vitest";
import {
  defaultLabLinkContext,
  findLabAnalyticsViolations,
  labLinkClickScript,
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

  it("detects missing PostHog and tracking attrs", () => {
    const bad = '<html><body><a href="x">y</a></body></html>';
    expect(findLabAnalyticsViolations(bad, "site/lab/x.html").length).toBeGreaterThan(0);
    const ok = `<html>${labLinkClickScript()}<body><a href="x" data-lab-section="tools">y</a><script>posthog.init('k')</script></body></html>`;
    expect(findLabAnalyticsViolations(ok, "site/lab/x.html")).toEqual([]);
  });
});
