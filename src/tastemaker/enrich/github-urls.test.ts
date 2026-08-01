import { describe, it, expect } from "vitest";
import { githubEnrichUrls } from "./github-urls.js";

describe("githubEnrichUrls", () => {
  it("includes README, releases, and discussions paths", () => {
    expect(githubEnrichUrls("https://github.com/acme/demo")).toEqual([
      "https://github.com/acme/demo",
      "https://github.com/acme/demo/releases",
      "https://github.com/acme/demo/discussions",
    ]);
  });
});
