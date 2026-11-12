#!/usr/bin/env node
/**
 * Verify today's OSS + Skills briefings exist and (optionally) Pages is live.
 * Exit 0 = OK, 1 = missing / broken. Used by digest-verify.yml.
 *
 * Pages check (VERIFY_PAGES_MAX_WAIT_MS, default 0 locally):
 * - deploy_done (gate): live /build.json commit equals expected main HEAD (retry for CDN).
 * - fresh_fetch (advisory): live /build.json vs gate commit; notice/warning only.
 * - assertions: HEAD today's briefing HTML (may read cached CDN content up to max-age=600).
 */
import fs from 'node:fs';
import { appendFileSync } from 'node:fs';
import path from 'node:path';

const TZ = process.env.TZ || 'America/Los_Angeles';
const siteUrl = (process.env.DIGEST_SITE_URL || 'https://leftyshields.github.io/ai-tastemakers').replace(
  /\/$/,
  '',
);
const skipPages = process.argv.includes('--skip-pages');
const pagesOnly = process.argv.includes('--pages-only');
const repoRoot = process.cwd();

function todayInTz() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function requiredFile(relPath) {
  const full = path.join(repoRoot, relPath);
  if (!fs.existsSync(full)) {
    return { ok: false, error: `Missing file: ${relPath}` };
  }
  const stat = fs.statSync(full);
  if (stat.size < 10) {
    return { ok: false, error: `Empty or too small: ${relPath}` };
  }
  return { ok: true, path: relPath };
}

import { execFileSync, spawnSync } from 'node:child_process';

const TSX_CLI = path.join(repoRoot, 'node_modules', 'tsx', 'dist', 'cli.mjs');

function expectedPagesSha() {
  if (process.env.EXPECTED_PAGES_SHA?.trim()) {
    return process.env.EXPECTED_PAGES_SHA.trim();
  }
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repoRoot, encoding: 'utf8' }).trim();
  } catch {
    return process.env.GITHUB_SHA?.trim() || '';
  }
}

/** deploy_done gate + fresh_fetch advisory + assertions (HEAD briefing; may hit CDN cache). */
function runPagesDeployVerify(date) {
  if (!fs.existsSync(TSX_CLI)) {
    return {
      ok: false,
      error:
        `Pages verify needs tsx (${TSX_CLI} missing). Run npm ci before verify-daily-digest Pages checks.`,
    };
  }
  const args = [
    TSX_CLI,
    'scripts/pages-deploy-verify.ts',
    '--stages',
    'deploy_done,fresh_fetch,assertions',
    '--date',
    date,
  ];
  const r = spawnSync(process.execPath, args, {
    cwd: repoRoot,
    env: {
      ...process.env,
      EXPECTED_PAGES_SHA: expectedPagesSha(),
    },
    encoding: 'utf8',
  });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status === 0) {
    return { ok: true };
  }
  if (r.error) {
    return {
      ok: false,
      error: `Pages verify subprocess failed (${r.error.code ?? 'error'}): ${r.error.message}`,
    };
  }
  const detail = (r.stderr || r.stdout || '').trim().split('\n').filter(Boolean).pop();
  return {
    ok: false,
    error: detail || 'Pages deploy verification failed (no output from scripts/pages-deploy-verify.ts)',
  };
}

function writeGithubOutputs(today, errors, briefingsOk, pagesOk) {
  const outFile = process.env.GITHUB_OUTPUT;
  if (!outFile) return;

  appendFileSync(outFile, `date=${today}\n`);
  appendFileSync(outFile, `briefings_ok=${briefingsOk ? 'true' : 'false'}\n`);
  appendFileSync(outFile, `pages_ok=${pagesOk ? 'true' : 'false'}\n`);
  appendFileSync(outFile, `pages_stale=${briefingsOk && !pagesOk ? 'true' : 'false'}\n`);
  appendFileSync(outFile, `briefings_missing=${!briefingsOk ? 'true' : 'false'}\n`);
  if (errors.length) {
    appendFileSync(outFile, `errors<<EOF\n${errors.join('\n')}\nEOF\n`);
  }
}

async function main() {
  const today = todayInTz();
  const errors = [];
  let briefingsOk = pagesOnly;

  if (!pagesOnly) {
    console.log(`Verifying daily digest for ${today} (${TZ})`);

    for (const rel of [
      `briefings/${today}/digest.json`,
      `briefings/${today}/daily_brief.md`,
      `briefings/skills/${today}/digest.json`,
      `briefings/skills/${today}/daily_brief.md`,
    ]) {
      const r = requiredFile(rel);
      if (!r.ok) errors.push(r.error);
      else console.log(`  OK ${r.path}`);
    }

    briefingsOk = errors.length === 0;
  } else {
    console.log(`Checking Pages only for ${today} (${TZ})`);
  }

  let pagesOk = skipPages;
  if (!skipPages) {
    const pages = runPagesDeployVerify(today);
    if (pages.ok) {
      pagesOk = true;
    } else {
      errors.push(pages.error);
      pagesOk = false;
    }
  }

  if (errors.length) {
    console.error('\nDaily digest verification FAILED:');
    for (const e of errors) console.error(`  - ${e}`);

    if (briefingsOk && !pagesOk) {
      console.error(
        '\nBriefings exist on main but GitHub Pages is stale — redeploy Pages (often a transient GitHub 500 after digest commit).',
      );
      console.error(
        `Actions: https://github.com/Leftyshields/ai-tastemakers/actions/workflows/pages.yml`,
      );
    } else {
      console.error(
        `\nDigest files use date label ${today} (${TZ}). If your local calendar day is ahead, the next brief publishes after ~06:17 ${TZ}.`,
      );
      console.error(`\nActions: https://github.com/Leftyshields/ai-tastemakers/actions/workflows/digest.yml`);
    }

    writeGithubOutputs(today, errors, briefingsOk, pagesOk);
    process.exit(1);
  }

  console.log('\nDaily digest verification passed.');
  writeGithubOutputs(today, [], briefingsOk, pagesOk);
}

main();
