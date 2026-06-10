#!/usr/bin/env node
/**
 * Verify today's OSS + Skills briefings exist and (optionally) Pages is live.
 * Exit 0 = OK, 1 = missing / broken. Used by digest-verify.yml.
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

async function checkPages(date) {
  const url = `${siteUrl}/briefings/${date}.html`;
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (res.status === 200) return { ok: true, url };
    return { ok: false, error: `Pages returned HTTP ${res.status} for ${url}` };
  } catch (e) {
    return { ok: false, error: `Pages check failed for ${url}: ${e.message}` };
  }
}

async function main() {
  const today = todayInTz();
  const errors = [];

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

  if (!skipPages) {
    const pages = await checkPages(today);
    if (pages.ok) console.log(`  OK Pages ${pages.url}`);
    else errors.push(pages.error);
  }

  if (errors.length) {
    console.error('\nDaily digest verification FAILED:');
    for (const e of errors) console.error(`  - ${e}`);
    console.error(`\nActions: https://github.com/Leftyshields/ai-tastemakers/actions/workflows/digest.yml`);

    const outFile = process.env.GITHUB_OUTPUT;
    if (outFile) {
      appendFileSync(outFile, `date=${today}\n`);
      appendFileSync(outFile, `errors<<EOF\n${errors.join('\n')}\nEOF\n`);
    }

    process.exit(1);
  }

  console.log('\nDaily digest verification passed.');
}

main();
