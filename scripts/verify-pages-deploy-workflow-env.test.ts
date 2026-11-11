import { execFileSync } from "node:child_process";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { auditWorkflowContent } from "./verify-pages-deploy-workflow-env.js";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const TSX = path.join(ROOT, "node_modules", ".bin", "tsx");
const SCRIPT = path.join(ROOT, "scripts", "verify-pages-deploy-workflow-env.ts");

describe("verify-pages-deploy-workflow-env", () => {
  it("passes on current repository workflows", () => {
    execFileSync(TSX, [SCRIPT], { cwd: ROOT, encoding: "utf8", stdio: "pipe" });
  });

  it("allows pages-deploy-verify step without GITHUB_TOKEN", () => {
    const yml = `jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - name: Verify Pages deploy
        env:
          EXPECTED_PAGES_SHA: \${{ github.sha }}
        run: tsx scripts/pages-deploy-verify.ts
`;
    expect(auditWorkflowContent("pages.yml", yml)).toEqual([]);
  });

  it("rejects job-level GITHUB_TOKEN without step env", () => {
    const yml = `jobs:
  verify:
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
    steps:
      - name: Verify today's briefings and Pages
        run: node scripts/verify-daily-digest.mjs
`;
    const errors = auditWorkflowContent("job-only.yml", yml);
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("step env");
  });

  it("accepts step-level GITHUB_TOKEN for verify-daily-digest", () => {
    const yml = `jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - name: Verify today's briefings and Pages
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: node scripts/verify-daily-digest.mjs
`;
    expect(auditWorkflowContent("ok.yml", yml)).toEqual([]);
  });
});
