import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * EXP-20260913-humanizer-polish-skills closed 2026-10-24 (keep): digest.yml always exports
 * DIGEST_HUMANIZER_POLISH=1 for both OSS and Skills commands (no Pacific date guard).
 */
describe("digest.yml humanizer polish (kept after experiment close)", () => {
  it("always enables DIGEST_HUMANIZER_POLISH in the Run digest step", () => {
    const yml = fs.readFileSync(path.join(process.cwd(), ".github/workflows/digest.yml"), "utf8");
    const runDigest = yml.split("- name: Run digest (OSS + Skills)")[1]?.split("- name:")[0] ?? "";
    expect(runDigest).toContain("export DIGEST_HUMANIZER_POLISH=1");
    expect(runDigest).not.toMatch(/\[\[\s*!\s*"\$\{\{\s*steps\.gate\.outputs\.date\s*\}\}"\s*<\s*"2026-10-11"\s*\]\]/);
  });
});
