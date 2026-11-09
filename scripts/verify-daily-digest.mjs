#!/usr/bin/env node
/**
 * Verify today's OSS + Skills briefings exist and (optionally) Pages is live.
 * Exit 0 = OK, 1 = missing / broken. Used by digest-verify.yml.
 *
 * Pages check (VERIFY_PAGES_MAX_WAIT_MS, default 0 locally):
 * - deploy_done (gate): Pages API latest build success for expected main SHA or descendant.
 * - fresh_fetch (advisory): live /build.json vs deployed SHA; notice/warning only.
 * - assertions: HEAD today's briefing HTML (may read cached CDN content up to max-age=600).
 */
import fs from 'node:fs';
import { appendFileSync } from 'node:fs';
import path from 'node:path';
import {
  emailSentMarkerEnforced,
  isSundayDateLabel,
} from './digest-email-marker-policy.mjs';

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

function emailSentMarkerPath(dateLabel) {
  return path.join(repoRoot, 'briefings', dateLabel, 'email_sent.json');
}

function verifyEmailSentMarker(dateLabel) {
  if (!emailSentMarkerEnforced(dateLabel)) {
    if (isSundayDateLabel(dateLabel)) {
      return { ok: true, required: false, reason: 'sunday' };
    }
    return { ok: true, required: false, reason: 'grandfathered' };
  }
  const markerPath = emailSentMarkerPath(dateLabel);
  if (!fs.existsSync(markerPath)) {
    return {
      ok: false,
      required: true,
      error: `Missing daily digest email marker: briefings/${dateLabel}/email_sent.json (briefing may exist without a successful Resend send)`,
    };
  }
  try {
    const raw = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
    if (
      raw?.schema_version === 1 &&
      raw?.date_label === dateLabel &&
      raw?.edition_id === 'oss' &&
      typeof raw?.sent_at === 'string' &&
      typeof raw?.recipient_count === 'number' &&
      raw.recipient_count > 0
    ) {
      return { ok: true, required: true, path: `briefings/${dateLabel}/email_sent.json` };
    }
    return {
      ok: false,
      required: true,
      error: `Invalid email send marker: briefings/${dateLabel}/email_sent.json`,
    };
  } catch {
    return {
      ok: false,
      required: true,
      error: `Unreadable email send marker: briefings/${dateLabel}/email_sent.json`,
    };
  }
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

const TSX = path.join(repoRoot, 'node_modules', '.bin', 'tsx');

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
  const args = [
    'scripts/pages-deploy-verify.ts',
    '--stages',
    'deploy_done,fresh_fetch,assertions',
    '--date',
    date,
  ];
  const r = spawnSync(TSX, args, {
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
  const detail = (r.stderr || r.stdout || 'pages deploy verify failed').trim().split('\n').pop();
  return { ok: false, error: detail || 'Pages deploy verification failed' };
}

function writeGithubOutputs(today, errors, briefingsOk, pagesOk, emailOk, emailRequired) {
  const outFile = process.env.GITHUB_OUTPUT;
  if (!outFile) return;

  appendFileSync(outFile, `date=${today}\n`);
  appendFileSync(outFile, `briefings_ok=${briefingsOk ? 'true' : 'false'}\n`);
  appendFileSync(outFile, `pages_ok=${pagesOk ? 'true' : 'false'}\n`);
  appendFileSync(outFile, `email_ok=${emailOk ? 'true' : 'false'}\n`);
  appendFileSync(outFile, `email_required=${emailRequired ? 'true' : 'false'}\n`);
  appendFileSync(outFile, `pages_stale=${briefingsOk && !pagesOk ? 'true' : 'false'}\n`);
  appendFileSync(
    outFile,
    `email_missing=${briefingsOk && emailRequired && !emailOk ? 'true' : 'false'}\n`,
  );
  appendFileSync(outFile, `briefings_missing=${!briefingsOk ? 'true' : 'false'}\n`);
  if (errors.length) {
    appendFileSync(outFile, `errors<<EOF\n${errors.join('\n')}\nEOF\n`);
  }
}

async function main() {
  const today = process.env.VERIFY_DIGEST_DATE?.trim() || todayInTz();
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

  let emailOk = pagesOnly;
  let emailRequired = false;
  if (!pagesOnly && briefingsOk) {
    const emailCheck = verifyEmailSentMarker(today);
    emailRequired = emailCheck.required;
    if (emailCheck.required) {
      if (emailCheck.ok) {
        emailOk = true;
        console.log(`  OK ${emailCheck.path}`);
      } else {
        emailOk = false;
        errors.push(emailCheck.error);
      }
    } else if (emailCheck.reason === 'sunday') {
      emailOk = true;
      console.log('  OK (Sunday — daily top-10 email not expected)');
    } else {
      emailOk = true;
      console.log('  OK (email marker not required before enforcement date)');
    }
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

    if (briefingsOk && emailRequired && !emailOk) {
      console.error(
        '\nBriefings exist on main but email_sent.json is missing (send may not have completed or marker was not committed). Automatic recovery uses date-based Resend idempotency per recipient (no run-id suffix); duplicates are unlikely but not impossible if Resend rejects a key.',
      );
      console.error(
        `Actions: https://github.com/Leftyshields/ai-tastemakers/actions/workflows/digest.yml`,
      );
    } else if (briefingsOk && !pagesOk) {
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

    writeGithubOutputs(today, errors, briefingsOk, pagesOk, emailOk, emailRequired);
    process.exit(1);
  }

  console.log('\nDaily digest verification passed.');
  writeGithubOutputs(today, [], briefingsOk, pagesOk, emailOk, emailRequired);
}

main();
