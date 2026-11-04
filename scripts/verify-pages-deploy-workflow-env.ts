#!/usr/bin/env node
/**
 * CI guard: workflow steps that invoke pages-deploy-verify must expose GITHUB_TOKEN.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const WORKFLOWS_DIR = path.join(ROOT, ".github", "workflows");

export const TOKEN_IN_ENV =
  /GITHUB_TOKEN:\s*\$\{\{\s*(secrets\.GITHUB_TOKEN|github\.token)\s*\}\}/;

/** Split a job body into step blocks (6-space indent steps in our workflows). */
export function splitStepBlocks(jobBody: string): string[] {
  const lines = jobBody.split("\n");
  const blocks: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (/^      - (name|uses):/.test(lines[i] ?? "")) {
      const start = i;
      i += 1;
      while (
        i < lines.length &&
        !/^      - (name|uses):/.test(lines[i] ?? "") &&
        !/^    [a-zA-Z0-9_-]+:/.test(lines[i] ?? "")
      ) {
        i += 1;
      }
      blocks.push(lines.slice(start, i).join("\n"));
      continue;
    }
    i += 1;
  }
  return blocks;
}

export function jobHasGithubToken(jobBody: string): boolean {
  const envIdx = jobBody.search(/^    env:\s*$/m);
  if (envIdx === -1) return false;
  const afterEnv = jobBody.slice(envIdx);
  const stepsIdx = afterEnv.search(/^    steps:\s*$/m);
  const envSection = stepsIdx === -1 ? afterEnv : afterEnv.slice(0, stepsIdx);
  return TOKEN_IN_ENV.test(envSection);
}

export function parseJobs(content: string): { name: string; body: string }[] {
  const jobs: { name: string; body: string }[] = [];
  const re = /^  ([a-zA-Z0-9_-]+):\s*\n/gm;
  let match: RegExpExecArray | null;
  const starts: { name: string; index: number }[] = [];
  while ((match = re.exec(content)) !== null) {
    if (match[1] === "jobs") continue;
    const before = content.slice(0, match.index);
    if (!before.endsWith("jobs:\n") && !/\n  [a-zA-Z0-9_-]+:\n/.test(before)) {
      continue;
    }
    starts.push({ name: match[1], index: match.index });
  }
  for (let i = 0; i < starts.length; i += 1) {
    const start = starts[i]!;
    const end = starts[i + 1]?.index ?? content.length;
    const body = content.slice(start.index, end);
    if (body.includes("\n    runs-on:") || body.includes("\n    steps:")) {
      jobs.push({ name: start.name, body });
    }
  }
  return jobs;
}

export function stepNeedsPagesToken(stepBlock: string): boolean {
  if (stepBlock.includes("pages-deploy-verify.ts")) return true;
  if (!stepBlock.includes("verify-daily-digest.mjs")) return false;
  if (/--skip-pages/.test(stepBlock) && !/--pages-only/.test(stepBlock)) {
    return false;
  }
  return true;
}

export function stepExposesGithubToken(stepBlock: string): boolean {
  return TOKEN_IN_ENV.test(stepBlock);
}

export function auditWorkflowContent(
  relPath: string,
  content: string,
): string[] {
  const errors: string[] = [];
  for (const job of parseJobs(content)) {
    const jobToken = jobHasGithubToken(job.body);
    for (const step of splitStepBlocks(job.body)) {
      if (!stepNeedsPagesToken(step)) continue;
      if (!stepExposesGithubToken(step) && !jobToken) {
        const nameMatch = step.match(/- name: (.+)/);
        const stepName = nameMatch?.[1] ?? "(unnamed step)";
        errors.push(
          `${relPath} job ${job.name} step "${stepName}": missing GITHUB_TOKEN in step or job env`,
        );
      }
    }
  }
  return errors;
}

function listWorkflowFiles(): string[] {
  return fs
    .readdirSync(WORKFLOWS_DIR)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"))
    .map((f) => path.join(WORKFLOWS_DIR, f));
}

function main(): void {
  const errors: string[] = [];
  for (const file of listWorkflowFiles()) {
    const rel = path.relative(ROOT, file);
    errors.push(...auditWorkflowContent(rel, fs.readFileSync(file, "utf8")));
  }

  if (errors.length) {
    console.error("verify-pages-deploy-workflow-env failed:");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log("verify-pages-deploy-workflow-env: ok");
}

const isMain =
  process.argv[1] != null &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
  main();
}
