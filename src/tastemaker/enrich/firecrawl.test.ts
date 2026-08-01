import { describe, it, expect, vi } from "vitest";
import { fetchFirecrawlContext } from "./firecrawl.js";

describe("fetchFirecrawlContext", () => {
  it("returns markdown from Firecrawl v2 scrape on success", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: { markdown: "  Repo page summary  " },
      }),
    });

    const result = await fetchFirecrawlContext("https://github.com/acme/demo", {
      apiKey: "fc-test",
      fetchFn,
      maxChars: 500,
    });

    expect(result.text).toBe("Repo page summary");
    expect(fetchFn).toHaveBeenCalledWith(
      "https://api.firecrawl.dev/v2/scrape",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer fc-test",
        }),
      }),
    );
  });

  it("returns error when API key is missing", async () => {
    const result = await fetchFirecrawlContext("https://github.com/acme/demo", {});
    expect(result.text).toBe("");
    expect(result.error).toContain("FIRECRAWL_API_KEY");
  });

  it("returns error on HTTP failure", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: false,
      status: 402,
      json: async () => ({ error: "Payment required" }),
    });

    const result = await fetchFirecrawlContext("https://github.com/acme/demo", {
      apiKey: "fc-test",
      fetchFn,
    });

    expect(result.text).toBe("");
    expect(result.error).toContain("Payment required");
  });
});

describe("fetchFirecrawlDeepContext", () => {
  it("merges README and releases markdown", async () => {
    const fetchFn = vi.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body)) as { url: string };
      const label = body.url.includes("/releases") ? "Release notes v2" : "README body";
      return {
        ok: true,
        json: async () => ({ success: true, data: { markdown: label } }),
      };
    });

    const { fetchFirecrawlDeepContext } = await import("./firecrawl.js");
    const result = await fetchFirecrawlDeepContext(
      [
        "https://github.com/acme/demo",
        "https://github.com/acme/demo/releases",
        "https://github.com/acme/demo/discussions",
      ],
      { apiKey: "fc-test", fetchFn, maxChars: 2000 },
    );

    expect(result.text).toContain("[README]");
    expect(result.text).toContain("README body");
    expect(result.text).toContain("[Releases]");
    expect(result.text).toContain("Release notes v2");
  });
});
