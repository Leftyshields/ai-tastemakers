import { describe, expect, it } from "vitest";
import { classifyCapabilityTags, pipelineRolesFromTags } from "./classify.js";

describe("classifyCapabilityTags", () => {
  it("tags headroom-style compression repos", () => {
    const tags = classifyCapabilityTags(
      ["compression", "mcp", "llm"],
      "Headroom compresses context 60–95% before it reaches the model.",
    );
    expect(tags).toContain("compression");
    expect(tags).toContain("mcp");
  });

  it("tags last30days-style search repos", () => {
    const tags = classifyCapabilityTags(
      ["web-search", "reddit", "hackernews"],
      "Parallel search across Reddit, X, and HN with engagement-weighted synthesis.",
    );
    expect(tags).toContain("search");
  });

  it("maps tags to pipeline roles", () => {
    const roles = pipelineRolesFromTags(["search", "compression"]);
    expect(roles).toContain("context-enrichment");
    expect(roles).toContain("compaction");
  });

  it("does not tag generic research mentions as search", () => {
    const tags = classifyCapabilityTags([], "A research paper on transformer architectures.");
    expect(tags).not.toContain("search");
  });
});
