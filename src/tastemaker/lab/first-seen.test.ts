import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  computeFirstSeen,
  formatFirstSeenClause,
} from "../../../scripts/lab/first-seen.js";
import { buildLabPublicFile } from "../../../scripts/lab/build-lab-public.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("computeFirstSeen", () => {
  it("finds firecrawl on OSS Jun 14, 2026", () => {
    const seen = computeFirstSeen(repoRoot, "firecrawl/firecrawl");
    expect(seen).toEqual({
      date: "2026-06-14",
      list: "OSS",
      fullName: "firecrawl/firecrawl",
    });
  });

  it("finds ponytail on Skills Jun 13, 2026 with digest casing", () => {
    const seen = computeFirstSeen(repoRoot, "dietrichgebert/ponytail");
    expect(seen).toEqual({
      date: "2026-06-13",
      list: "Skills",
      fullName: "DietrichGebert/ponytail",
    });
  });

  it("finds humanizer on Skills Aug 5, 2026", () => {
    const seen = computeFirstSeen(repoRoot, "blader/humanizer");
    expect(seen).toEqual({
      date: "2026-08-05",
      list: "Skills",
      fullName: "blader/humanizer",
    });
  });

  it("returns null when repo never ranked", () => {
    expect(computeFirstSeen(repoRoot, "no/such-repo-ever")).toBeNull();
  });
});

describe("formatFirstSeenClause", () => {
  it("formats clause with trailing comma when firstSeen exists", () => {
    const clause = formatFirstSeenClause("Ponytail", {
      date: "2026-06-13",
      list: "Skills",
      fullName: "DietrichGebert/ponytail",
    });
    expect(clause).toBe("Ponytail, which first appeared on the Skills list on Jun 13, 2026,");
  });

  it("returns name only when firstSeen is null", () => {
    expect(formatFirstSeenClause("Mystery", null)).toBe("Mystery");
  });
});

describe("buildLabPublicFile firstSeen", () => {
  it("attaches firstSeen on experiments with sourceRepo", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const firecrawl = pub.experiments.find((e) => e.id === "EXP-20260716-firecrawl-enrich-skills");
    expect(firecrawl?.firstSeen).toEqual({
      date: "2026-06-14",
      list: "OSS",
      fullName: "firecrawl/firecrawl",
    });
    const exp = pub.experiments.find((e) => e.id === "EXP-20260802-ponytail-narration-skills");
    expect(exp?.firstSeen?.fullName).toBe("DietrichGebert/ponytail");
    expect(JSON.stringify(pub.experiments)).not.toMatch(/"rank"/);
  });
});
