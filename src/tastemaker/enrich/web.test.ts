import { describe, it, expect, vi } from "vitest";
import { fetchWebContext } from "./web.js";

describe("fetchWebContext", () => {
  it("returns text from Jina Reader on success", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "  Project README summary  ",
    });

    const result = await fetchWebContext("https://github.com/acme/demo", {
      fetchFn,
      maxChars: 500,
    });

    expect(result.text).toBe("Project README summary");
    expect(fetchFn).toHaveBeenCalledWith(
      "https://r.jina.ai/https://github.com/acme/demo",
      expect.objectContaining({ headers: { Accept: "text/plain" } }),
    );
  });

  it("returns error on HTTP failure", async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    const result = await fetchWebContext("https://github.com/acme/demo", { fetchFn });
    expect(result.text).toBe("");
    expect(result.error).toContain("503");
  });

  it("returns error on timeout", async () => {
    const fetchFn = vi.fn().mockImplementation((_url, init) => {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
    });

    const result = await fetchWebContext("https://github.com/acme/demo", {
      fetchFn,
      timeoutMs: 5,
    });
    expect(result.text).toBe("");
    expect(result.error).toBeTruthy();
  });
});
