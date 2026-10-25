import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  displayFullNameForSourceRepo,
  resolveSourceRepoGithubLink,
} from "../../../scripts/lab/source-repo-display.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("source-repo-display", () => {
  it("matches inventory by exact lowercased full_name only", () => {
    expect(displayFullNameForSourceRepo("dietrichgebert/ponytail", repoRoot)).toBe(
      "DietrichGebert/ponytail",
    );
    expect(displayFullNameForSourceRepo("ponytail", repoRoot)).toBeNull();
    expect(displayFullNameForSourceRepo("firecrawl/firecrawl", repoRoot)).toBe(
      "firecrawl/firecrawl",
    );
  });

  it("falls back to sourceRepo when inventory has no exact match", () => {
    const unknown = "acme/not-in-inventory-xyz";
    const resolved = resolveSourceRepoGithubLink(unknown, repoRoot);
    expect(resolved.displayFullName).toBe(unknown);
    expect(resolved.githubUrl).toBe(`https://github.com/${unknown}`);
  });
});
