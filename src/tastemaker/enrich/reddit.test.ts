import { describe, it, expect, vi } from "vitest";
import { fetchRedditContext } from "./reddit.js";

describe("fetchRedditContext", () => {
  it("formats recent Reddit posts for a repo search", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          children: [
            {
              data: {
                title: "Anyone using acme/demo with Claude Code?",
                subreddit: "ClaudeAI",
                score: 42,
                num_comments: 8,
                selftext: "Works great for batch exports",
              },
            },
          ],
        },
      }),
    });

    const result = await fetchRedditContext("acme/demo", { fetchFn });
    expect(result.text).toContain("r/ClaudeAI");
    expect(result.text).toContain("Anyone using acme/demo");
    expect(fetchFn).toHaveBeenCalledWith(
      expect.stringContaining("reddit.com/search.json"),
      expect.objectContaining({
        headers: expect.objectContaining({ "User-Agent": expect.any(String) }),
      }),
    );
  });

  it("returns empty text when no posts found", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { children: [] } }),
    });
    const result = await fetchRedditContext("acme/obscure", { fetchFn });
    expect(result.text).toBe("");
  });
});
