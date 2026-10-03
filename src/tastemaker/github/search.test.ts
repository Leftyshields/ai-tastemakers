import { describe, it, expect } from "vitest";
import { buildRepositorySearchQuery } from "./search.js";

describe("buildRepositorySearchQuery", () => {
  it("combines inner query with star and pushed filters", () => {
    expect(buildRepositorySearchQuery("topic:claude-code", 30, "2026-09-01")).toBe(
      "topic:claude-code stars:>=30 pushed:>2026-09-01",
    );
  });

  it("preserves readme and text qualifiers", () => {
    expect(
      buildRepositorySearchQuery('SKILL.md in:readme', 30, "2026-09-01"),
    ).toBe("SKILL.md in:readme stars:>=30 pushed:>2026-09-01");
  });
});
