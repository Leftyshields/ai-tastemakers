import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("lab post back roundtrip (playwright)", () => {
  it("brief card → Lab badge → Back restores brief URL and scroll", () => {
    const brief = path.join(repoRoot, "site/briefings/2026-10-25.html");
    if (!fs.existsSync(brief)) {
      return;
    }
    execSync("npx tsx scripts/verify-lab-post-back-roundtrip.ts", {
      cwd: repoRoot,
      stdio: "inherit",
    });
    expect(fs.existsSync("/opt/cursor/artifacts/screenshots/lab-back-roundtrip-03-brief-restored.png")).toBe(
      true,
    );
  });
});
