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
    const pages = await checkPages(today);
    if (pages.ok) {
      console.log(`  OK Pages ${pages.url}`);
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
