import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertExperimentsValid,
  isLowercaseOwnerRepoSourceRef,
  loadExperimentsFile,
} from "../../../scripts/lab/validate-experiments.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("lab sourceRepo format", () => {
  it("accepts lowercase owner/repo only", () => {
    expect(isLowercaseOwnerRepoSourceRef("blader/humanizer")).toBe(true);
    expect(isLowercaseOwnerRepoSourceRef("firecrawl/firecrawl")).toBe(true);
    expect(isLowercaseOwnerRepoSourceRef("Humanizer")).toBe(false);
    expect(isLowercaseOwnerRepoSourceRef("Firecrawl")).toBe(false);
    expect(isLowercaseOwnerRepoSourceRef("DietrichGebert/ponytail")).toBe(false);
  });

  it("lab/experiments.json passes sourceRepo validation", () => {
    const issues = assertExperimentsValid(repoRoot);
    const sourceRepoIssues = issues.filter((i) => i.message.includes("sourceRepo"));
    expect(sourceRepoIssues).toEqual([]);
  });

  it("every set sourceRepo is lowercase owner/repo", () => {
    for (const exp of loadExperimentsFile(repoRoot).experiments) {
      const raw = exp.sourceRepo?.trim();
      if (!raw) continue;
      expect(isLowercaseOwnerRepoSourceRef(raw), exp.id).toBe(true);
    }
  });
});
