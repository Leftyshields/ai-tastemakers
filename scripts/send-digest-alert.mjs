#!/usr/bin/env node
/**
 * Send ops alert when daily digest verification fails (Resend + GitHub issue).
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const today =
  process.env.VERIFY_DIGEST_DATE ||
  new Intl.DateTimeFormat('en-CA', {
    timeZone: process.env.TZ || 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

const errors =
  process.env.VERIFY_DIGEST_ERRORS ||
  'Daily digest verification failed. See workflow logs.';

const briefingsOk = process.env.VERIFY_DIGEST_BRIEFINGS_OK === 'true';
const pagesOk = process.env.VERIFY_DIGEST_PAGES_OK === 'true';
const emailOk = process.env.VERIFY_DIGEST_EMAIL_OK !== 'false';
const emailRequired = process.env.VERIFY_DIGEST_EMAIL_REQUIRED === 'true';
const pagesStale = briefingsOk && !pagesOk;
const emailMissing = briefingsOk && emailRequired && !emailOk;
const alertKind = process.env.DIGEST_ALERT_KIND?.trim() || 'verify';
const digestJobFailed = alertKind === 'digest_job_failed';
const markerPushFailed = alertKind === 'marker_push_failed';

const resendKey = process.env.RESEND_API_KEY?.trim();
const from = process.env.DIGEST_EMAIL_FROM?.trim();
const to = process.env.DIGEST_ALERT_TO?.trim();

const repo = process.env.GITHUB_REPOSITORY || 'Leftyshields/ai-tastemakers';
const runUrl = process.env.GITHUB_RUN_ID
  ? `${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}`
  : `https://github.com/${repo}/actions/workflows/digest-verify.yml`;

const subject = markerPushFailed
  ? `🚨 AI Tastemakers — digest email marker push failed (${today})`
  : digestJobFailed
  ? `🚨 AI Tastemakers — Daily Digest job failed (${today})`
  : emailMissing
    ? `🚨 AI Tastemakers — digest email not sent (${today})`
    : pagesStale
      ? `🚨 AI Tastemakers — Pages stale after digest (${today})`
      : `🚨 AI Tastemakers — daily digest missing (${today})`;

const actionLines = markerPushFailed
  ? [
      'Resend likely succeeded; fix git push / rebase for email_sent.json on main.',
      `Workflow: ${runUrl}`,
    ]
  : digestJobFailed
  ? [
      `Inspect failed run: ${runUrl}`,
      `Evening backstop may auto-resend if briefings exist but email_sent.json is missing.`,
    ]
  : emailMissing
    ? [
        `Resend from stored briefing: https://github.com/${repo}/actions/workflows/digest.yml (workflow_dispatch, check resend_email)`,
        `Briefings for ${today} already exist — do not regenerate content unless files are wrong.`,
      ]
    : pagesStale
      ? [
          `Redeploy Pages: https://github.com/${repo}/actions/workflows/pages.yml`,
          `Digest already committed for ${today} — re-running digest is not required unless briefing files are also missing.`,
        ]
      : [`Re-run digest: https://github.com/${repo}/actions/workflows/digest.yml`];

const text = [
  `Daily digest verification failed for ${today}.`,
  '',
  errors,
  '',
  ...actionLines,
  `Verify workflow: ${runUrl}`,
  '',
  markerPushFailed
    ? 'Checks: Resend send succeeded; committing public email_sent.json (sent_at + recipient_count only) failed.'
    : digestJobFailed
    ? 'Checks: Daily Digest workflow exited with failure before confirming email send.'
    : emailMissing
      ? 'Checks: OSS + Skills briefing files on main (OK), email_sent.json marker (missing).'
      : pagesStale
        ? 'Checks: OSS + Skills briefing files on main (OK), GitHub Pages brief URL (missing/stale).'
        : 'Checks: OSS + Skills briefing files on main, GitHub Pages brief URL.',
].join('\n');

async function sendEmail() {
  if (!resendKey || !from || !to) {
    console.warn(
      'Alert email skipped — set secrets RESEND_API_KEY, DIGEST_EMAIL_FROM, DIGEST_ALERT_TO',
    );
    return false;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`Resend alert failed (${res.status}): ${body}`);
    return false;
  }

  console.log(`Alert email sent to ${to}`);
  return true;
}

function openGitHubIssue() {
  if (!process.env.GITHUB_TOKEN && !process.env.GH_TOKEN) {
    console.warn('GitHub issue skipped — no token');
    return;
  }

  const title = markerPushFailed
    ? `Digest email marker push failed — ${today}`
    : digestJobFailed
    ? `Daily Digest job failed — ${today}`
    : emailMissing
      ? `Daily digest email not sent — ${today}`
      : `Daily digest missing — ${today}`;
  const bodyFile = path.join(os.tmpdir(), `digest-alert-${today}.md`);
  fs.writeFileSync(bodyFile, text, 'utf8');

  try {
    const existing = execSync(
      `gh issue list --repo ${repo} --state open --search "${title}" --json number --jq 'length'`,
      { encoding: 'utf8' },
    ).trim();

    if (existing !== '0') {
      console.log(`Open issue already exists for ${today}`);
      return;
    }

    try {
      execSync(
        `gh label ensure digest-alert --repo ${repo} --color B60205 --description "Daily digest verification failed"`,
        { stdio: 'ignore' },
      );
    } catch {
      /* label may already exist or gh version lacks ensure */
    }

    execSync(
      `gh issue create --repo ${repo} --title "${title}" --label "digest-alert" --body-file "${bodyFile}"`,
      { stdio: 'inherit' },
    );
    console.log('GitHub issue created');
  } catch (e) {
    console.warn('GitHub issue create failed:', e.message);
    try {
      execSync(
        `gh issue create --repo ${repo} --title "${title}" --body-file "${bodyFile}"`,
        { stdio: 'inherit' },
      );
    } catch {
      /* best effort */
    }
  }
}

await sendEmail();
openGitHubIssue();
