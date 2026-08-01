import { describe, it, expect, vi } from "vitest";
import { fetchFirecrawlContext } from "./firecrawl.js";

describe("fetchFirecrawlContext", () => {
  it("returns markdown from Firecrawl on success", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: { markdown: "  Firecrawl page summary  " },
      }),
    });

    const result = await fetchFirecrawlContext("https://github.com/acme/demo", {
      apiKey: "fc-test",
      fetchFn,
      maxChars: 500,
    });

    expect(result.text).toBe("Firecrawl page summary");
    expect(fetchFn).toHaveBeenCalledWith(
      "https://api.firecrawl.dev/v1/scrape",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer fc-test",
        }),
      }),
    );
  });

  it("returns error when API key is missing", async () => {
    const result = await fetchFirecrawlContext("https://github.com/acme/demo", {
      apiKey: "",
    });
    expect(result.text).toBe("");
    expect(result.error).toContain("FIRECRAWL_API_KEY");
  });

  it("returns error on HTTP failure", async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false, status: 401 });
    const result = await fetchFirecrawlContext("https://github.com/acme/demo", {
      apiKey: "fc-test",
      fetchFn,
    });
    expect(result.error).toContain("401");
  });
});
