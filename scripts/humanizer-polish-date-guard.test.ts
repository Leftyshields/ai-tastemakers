import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

/**
 * Same condition as .github/workflows/digest.yml "Run digest" step (humanizer date guard).
 * ISO dates (YYYY-MM-DD) compare lexicographically in bash [[ < ]].
 */
function humanizerPolishEnabledForPacificDate(date: string): boolean {
  const out = execFileSync(
    "bash",
    [
      "-c",
      `d="$1"; if [[ ! "$d" < "2026-10-11" ]]; then echo on; else echo off; fi`,
      "humanizer-polish-date-guard",
      date,
    ],
    { encoding: "utf8" },
  ).trim();
  return out === "on";
}

describe("digest.yml humanizer polish date guard (bash)", () => {
  it("keeps polish off on 2026-10-10 (baseline last day)", () => {
    expect(humanizerPolishEnabledForPacificDate("2026-10-10")).toBe(false);
  });

  it("turns polish on from 2026-10-11 (treatment start)", () => {
    expect(humanizerPolishEnabledForPacificDate("2026-10-11")).toBe(true);
  });

  it("keeps polish on after treatment start", () => {
    expect(humanizerPolishEnabledForPacificDate("2026-10-12")).toBe(true);
  });

  it("rejects invalid bash >= guard (regression)", () => {
    const broken = execFileSync(
      "bash",
      [
        "-c",
        `d="2026-10-11"; if [ "$d" \\>= "2026-10-11" ]; then echo on; else echo off; fi 2>/dev/null || echo off`,
        "broken-guard",
      ],
      { encoding: "utf8" },
    ).trim();
    expect(broken).toBe("off");
  });
});
