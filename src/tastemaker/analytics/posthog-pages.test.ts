import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  posthogAnalyticsEnabled,
  posthogScriptHtml,
  digestRepoClickTrackingScript,
} from "../../../scripts/edition-pages.js";

describe("PostHog page analytics", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
    delete process.env.POSTHOG_KEY;
    delete process.env.POSTHOG_HOST;
  });

  afterEach(() => {
    process.env = env;
  });

  it("posthogAnalyticsEnabled is false without POSTHOG_KEY", () => {
    expect(posthogAnalyticsEnabled()).toBe(false);
    expect(posthogScriptHtml()).toBe("");
    expect(digestRepoClickTrackingScript()).toBe("");
  });

  it("posthogScriptHtml injects init with key and default host", () => {
    process.env.POSTHOG_KEY = "phc_test_key";
    const html = posthogScriptHtml();
    expect(html).toContain("phc_test_key");
    expect(html).toContain("https://us.i.posthog.com");
    expect(html).toContain("autocapture: false");
    expect(html).toContain("capture_pageview: true");
  });

  it("posthogScriptHtml uses POSTHOG_HOST when set", () => {
    process.env.POSTHOG_KEY = "phc_test_key";
    process.env.POSTHOG_HOST = "https://eu.i.posthog.com/";
    const html = posthogScriptHtml();
    expect(html).toContain("https://eu.i.posthog.com");
  });

  it("digestRepoClickTrackingScript captures repo_click on cards", () => {
    process.env.POSTHOG_KEY = "phc_test_key";
    const html = digestRepoClickTrackingScript();
    expect(html).toContain('posthog.capture("repo_click"');
    expect(html).toContain('channel: "pages"');
    expect(html).toContain("utm_source");
  });
});

describe("verifyPosthogInBuiltSite", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("passes when every HTML file contains posthog.init", async () => {
    const { verifyPosthogInBuiltSite } = await import("../../../scripts/edition-pages.js");
    const { mkdtemp, writeFile, mkdir, rm } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const { tmpdir } = await import("node:os");

    process.env.POSTHOG_KEY = "phc_test";
    const dir = await mkdtemp(join(tmpdir(), "posthog-verify-"));
    await mkdir(join(dir, "briefings"), { recursive: true });
    await writeFile(join(dir, "index.html"), "<html><script>posthog.init('x')</script></html>");
    await writeFile(
      join(dir, "briefings", "2026-06-07.html"),
      "<html><script>posthog.init('x')</script></html>",
    );

    const count = await verifyPosthogInBuiltSite(dir);
    expect(count).toBe(2);
    await rm(dir, { recursive: true, force: true });
  });

  it("throws when any HTML file is missing posthog.init", async () => {
    const { verifyPosthogInBuiltSite } = await import("../../../scripts/edition-pages.js");
    const { mkdtemp, writeFile, rm } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const { tmpdir } = await import("node:os");

    process.env.POSTHOG_KEY = "phc_test";
    const dir = await mkdtemp(join(tmpdir(), "posthog-verify-"));
    await writeFile(join(dir, "ok.html"), "<html>posthog.init</html>");
    await writeFile(join(dir, "bad.html"), "<html>no analytics</html>");

    await expect(verifyPosthogInBuiltSite(dir)).rejects.toThrow(/missing from 1 page/);
    await rm(dir, { recursive: true, force: true });
  });
});
