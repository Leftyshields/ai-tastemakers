import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Same condition as .github/workflows/digest.yml "Run digest" step (Caveman date guard).
 * ISO dates (YYYY-MM-DD) compare lexicographically in bash [[ < ]].
 */
function enrichCompressEnabledForPacificDate(date: string): boolean {
  const out = execFileSync(
    "bash",
    [
      "-c",
      `d="$1"; if [[ ! "$d" < "2026-11-08" ]]; then echo on; else echo off; fi`,
      "caveman-compress-date-guard",
      date,
    ],
    { encoding: "utf8" },
  ).trim();
  return out === "on";
}

describe("digest.yml caveman compress date guard (bash)", () => {
  it("keeps compression off on 2026-11-07 (baseline last day)", () => {
    expect(enrichCompressEnabledForPacificDate("2026-11-07")).toBe(false);
  });

  it("turns compression on from 2026-11-08 (treatment start)", () => {
    expect(enrichCompressEnabledForPacificDate("2026-11-08")).toBe(true);
  });

  it("keeps compression on after treatment start", () => {
    expect(enrichCompressEnabledForPacificDate("2026-11-09")).toBe(true);
  });

  it("documents the date guard in the Run digest step (not always-on)", () => {
    const yml = fs.readFileSync(path.join(process.cwd(), ".github/workflows/digest.yml"), "utf8");
    const runDigest = yml.split("- name: Run digest (OSS + Skills)")[1]?.split("- name:")[0] ?? "";
    expect(runDigest).toMatch(/\[\[\s*!\s*"\$\{\{\s*steps\.gate\.outputs\.date\s*\}\}"\s*<\s*"2026-11-08"\s*\]\]/);
    expect(runDigest).toContain("export DIGEST_ENRICH_COMPRESS=1");
    expect(runDigest).not.toMatch(/^          export DIGEST_ENRICH_COMPRESS=1\s*$/m);
  });
});
