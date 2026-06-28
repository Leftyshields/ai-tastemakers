import { describe, it, expect, vi } from "vitest";
import { fetchHnContext } from "./hn.js";

describe("fetchHnContext", () => {
  it("formats HN search hits", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        hits: [
          { title: "Show HN: Demo", url: "https://news.ycombinator.com/item?id=1", points: 42, num_comments: 7 },
        ],
      }),
    });

    const result = await fetchHnContext("acme/demo", { fetchFn });
    expect(result.text).toContain("Show HN: Demo");
    expect(result.text).toContain("42 pts");
    expect(fetchFn).toHaveBeenCalledWith(
      expect.stringContaining("query=demo"),
      expect.any(Object),
    );
  });

  it("returns empty text when no hits", async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ hits: [] }) });
    const result = await fetchHnContext("acme/obscure", { fetchFn });
    expect(result.text).toBe("");
    expect(result.error).toBeUndefined();
  });
});
