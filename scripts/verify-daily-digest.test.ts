import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIGEST_VERIFY_WORKFLOW = path.join(
  ROOT,
  ".github",
  "workflows",
  "digest-verify.yml",
);

/**
 * Daily Digest Verify must install devDependencies (tsx) before spawning pages-deploy-verify.ts.
 * Without npm ci, spawn fails in milliseconds with no verifier output (Nov 2026 false stale alerts).
 */
function digestVerifyInstallsDepsBeforePagesCheck(content: string): boolean {
  const lines = content.split("\n");
  let sawSetupNode = false;
  let sawNpmCi = false;
  for (const line of lines) {
    if (line.includes("setup-node")) {
      sawSetupNode = true;
    }
    if (/\bnpm ci\b/.test(line)) {
      sawNpmCi = true;
    }
  }
  if (!content.includes("verify-daily-digest.mjs")) {
    return true;
  }
  const needsPages = /verify-daily-digest\.mjs(?!.*--skip-pages)/.test(content);
  if (!needsPages) {
    return true;
  }
  return sawSetupNode && sawNpmCi;
}

describe("verify-daily-digest", () => {
  it("digest-verify workflow runs npm ci before Pages verification", () => {
    const yml = fs.readFileSync(DIGEST_VERIFY_WORKFLOW, "utf8");
    const lines = yml.split("\n");
    let sawSetupNode = false;
    let sawNpmCi = false;
    for (const line of lines) {
      if (line.includes("setup-node")) {
        sawSetupNode = true;
      }
      if (/\bnpm ci\b/.test(line)) {
        sawNpmCi = true;
      }
      if (
        line.includes("verify-daily-digest.mjs") &&
        !line.includes("--skip-pages")
      ) {
        expect(
          sawNpmCi,
          "npm ci must appear before verify-daily-digest steps that check Pages",
        ).toBe(true);
        expect(
          sawSetupNode,
          "setup-node must appear before verify-daily-digest steps that check Pages",
        ).toBe(true);
      }
    }
    expect(digestVerifyInstallsDepsBeforePagesCheck(yml)).toBe(true);
  });

  it("reports missing tsx instead of a silent generic pages verify failure", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "digest-verify-no-deps-"));
    const scriptSrc = path.join(ROOT, "scripts", "verify-daily-digest.mjs");
    fs.mkdirSync(path.join(tmp, "scripts"), { recursive: true });
    fs.copyFileSync(scriptSrc, path.join(tmp, "scripts", "verify-daily-digest.mjs"));
    const r = spawnSync(
      process.execPath,
      ["scripts/verify-daily-digest.mjs", "--pages-only"],
      {
        cwd: tmp,
        env: { ...process.env, TZ: "America/Los_Angeles" },
        encoding: "utf8",
      },
    );
    expect(r.status).not.toBe(0);
    const combined = `${r.stdout}\n${r.stderr}`;
    expect(combined).not.toMatch(/^pages deploy verify failed$/m);
    expect(combined).toMatch(/npm ci|tsx/i);
  });
});
