import type { AppConfig } from "./types.js";
import { formatDateInTimezone } from "./config.js";
import { listExperimentIds, loadExperiment } from "./experiments/load.js";
import type { ExperimentRecord } from "./experiments/types.js";
import { canSendOpsEmail, sendOpsEmail } from "./email/resend.js";
import { buildMilestoneInstructions } from "./experiment-reminder-content.js";
import type { ExperimentMilestoneType } from "./experiment-reminder-content.js";

export type { ExperimentMilestoneType } from "./experiment-reminder-content.js";

export interface ExperimentMilestoneMatch {
  experimentId: string;
  record: ExperimentRecord;
  milestoneType: ExperimentMilestoneType;
  date: string;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const PLAYBOOK_URL =
  "https://github.com/Leftyshields/ai-tastemakers/blob/main/docs/EXPERIMENT_LIFECYCLE_PLAYBOOK.md";

const RUNBOOK_URL =
  "https://github.com/Leftyshields/ai-tastemakers/blob/main/docs/DEV_RUNBOOK.md#experiment-lifecycle-reminders";

const MILESTONE_LABELS: Record<ExperimentMilestoneType, string> = {
  baseline_start: "Baseline window starts",
  baseline_end: "Baseline window ends",
  treatment_start: "Treatment window starts",
  treatment_end: "Treatment window ends",
};

export function formatTodayPt(timezone: string): string {
  return formatDateInTimezone(new Date(), timezone);
}

function isValidDate(value: string): boolean {
  return DATE_RE.test(value);
}

export function findMilestonesForDate(
  record: ExperimentRecord,
  date: string,
): ExperimentMilestoneMatch[] {
  if (record.status === "complete") return [];

  const candidates: Array<[ExperimentMilestoneType, string | undefined]> = [
    ["baseline_start", record.baseline_window?.start],
    ["baseline_end", record.baseline_window?.end],
    ["treatment_start", record.treatment_window?.start],
    ["treatment_end", record.treatment_window?.end],
  ];

  const matches: ExperimentMilestoneMatch[] = [];
  for (const [milestoneType, windowDate] of candidates) {
    const trimmed = windowDate?.trim();
    if (!trimmed || !isValidDate(trimmed) || trimmed !== date) continue;
    matches.push({
      experimentId: record.id,
      record,
      milestoneType,
      date,
    });
  }
  return matches;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isSectionHeading(line: string): boolean {
  const headings = new Set([
    "WHAT THIS MEANS",
    "STEPS",
    "POSTHOG EXPORT (step by step)",
    "IMPORT SNAPSHOT",
    "PUBLISH TO LAB DASHBOARD",
    "OPTIONAL BEFORE TREATMENT (web-enrich quality check)",
    "NEXT MILESTONE",
    "RECORD VERDICT",
    "IF NOT KEEPING THE CHANGE",
  ]);
  return headings.has(line);
}

function renderSectionText(match: ExperimentMilestoneMatch, siteUrl: string): string {
  const { record, milestoneType, date } = match;
  const labUrl = `${siteUrl.replace(/\/$/, "")}/lab/experiments.html`;
  const instructions = buildMilestoneInstructions(milestoneType, record);
  const lines = [
    `Experiment: ${record.id}`,
    `Status: ${record.status}`,
    `Edition: ${record.edition}`,
    `Milestone: ${MILESTONE_LABELS[milestoneType]} (${date} PT)`,
    `Change: ${record.change_summary}`,
    "",
    ...instructions,
    "",
    `Lab dashboard: ${labUrl}`,
  ];
  if (record.notes?.trim()) {
    lines.push("", `Experiment notes: ${record.notes.trim()}`);
  }
  return lines.join("\n");
}

function renderSectionHtml(match: ExperimentMilestoneMatch, siteUrl: string): string {
  const { record, milestoneType, date } = match;
  const labUrl = `${siteUrl.replace(/\/$/, "")}/lab/experiments.html`;
  const instructions = buildMilestoneInstructions(milestoneType, record);
  const htmlParts: string[] = [
    `<p><strong>Experiment:</strong> ${escapeHtml(record.id)}</p>`,
    `<p><strong>Status:</strong> ${escapeHtml(record.status)} | <strong>Edition:</strong> ${escapeHtml(record.edition)}</p>`,
    `<p><strong>Milestone:</strong> ${escapeHtml(MILESTONE_LABELS[milestoneType])} (${escapeHtml(date)} PT)</p>`,
    `<p>${escapeHtml(record.change_summary)}</p>`,
  ];

  let inPre = false;
  const preLines: string[] = [];

  const flushPre = (): void => {
    if (preLines.length > 0) {
      htmlParts.push(
        `<pre style="font-family:monospace;font-size:13px;white-space:pre-wrap">${escapeHtml(preLines.join("\n"))}</pre>`,
      );
      preLines.length = 0;
    }
    inPre = false;
  };

  for (const line of instructions) {
    if (!line.trim()) {
      flushPre();
      continue;
    }
    if (isSectionHeading(line)) {
      flushPre();
      htmlParts.push(`<p><strong>${escapeHtml(line)}</strong></p>`);
      continue;
    }
    if (
      line.startsWith("npm run") ||
      line.startsWith("git ") ||
      line.startsWith("EXPERIMENT_") ||
      line.startsWith("type,") ||
      line.startsWith("pageview,") ||
      line.startsWith("outbound_") ||
      line.startsWith("   ") ||
      line.endsWith("\\")
    ) {
      inPre = true;
      preLines.push(line);
      continue;
    }
    if (inPre) {
      flushPre();
    }
    htmlParts.push(`<p>${escapeHtml(line)}</p>`);
  }
  flushPre();

  htmlParts.push(`<p><a href="${escapeHtml(labUrl)}">Lab dashboard</a></p>`);
  if (record.notes?.trim()) {
    htmlParts.push(
      `<p><strong>Experiment notes:</strong> ${escapeHtml(record.notes.trim())}</p>`,
    );
  }
  return htmlParts.join("\n");
}

export function renderReminderEmail(
  matches: ExperimentMilestoneMatch[],
  date: string,
  siteUrl: string,
): { subject: string; text: string; html: string } {
  if (matches.length === 0) {
    throw new Error("renderReminderEmail requires at least one milestone match");
  }

  const count = matches.length;
  const subject = `Lab reminder — ${count} experiment milestone${count === 1 ? "" : "s"} (${date} PT)`;

  const sectionTexts = matches.map((m) => renderSectionText(m, siteUrl));
  const text = [
    `AI Tastemakers Lab — experiment lifecycle reminder for ${date} (America/Los_Angeles).`,
    "",
    ...sectionTexts.flatMap((section, index) =>
      index === 0 ? [section] : ["---", section],
    ),
    "",
    "---",
    `Playbook (step-by-step): ${PLAYBOOK_URL}`,
    `Runbook: ${RUNBOOK_URL}`,
  ].join("\n");

  const sectionHtml = matches.map((m) => renderSectionHtml(m, siteUrl));
  const html = [
    `<p>AI Tastemakers Lab — experiment lifecycle reminder for ${escapeHtml(date)} (America/Los_Angeles).</p>`,
    ...sectionHtml.flatMap((section, index) =>
      index === 0 ? [section] : ["<hr />", section],
    ),
    `<p><a href="${escapeHtml(RUNBOOK_URL)}">Runbook</a> · <a href="${escapeHtml(PLAYBOOK_URL)}">Full playbook</a></p>`,
  ].join("\n");

  return { subject, text, html };
}

export interface RunExperimentRemindersOptions {
  date?: string;
  dryRun?: boolean;
}

export interface RunExperimentRemindersResult {
  date: string;
  matchCount: number;
  sent: boolean;
  emailId?: string;
  skippedReason?: string;
}

export async function collectMilestonesForDate(
  rootDir: string,
  date: string,
): Promise<ExperimentMilestoneMatch[]> {
  const ids = await listExperimentIds(rootDir);
  const all: ExperimentMilestoneMatch[] = [];

  for (const id of ids) {
    try {
      const record = await loadExperiment(rootDir, id);
      all.push(...findMilestonesForDate(record, date));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`Skipping experiment ${id}: ${message}`);
    }
  }

  all.sort((a, b) => {
    const byId = a.experimentId.localeCompare(b.experimentId);
    if (byId !== 0) return byId;
    return a.milestoneType.localeCompare(b.milestoneType);
  });

  return all;
}

export async function runExperimentReminders(
  config: AppConfig,
  options: RunExperimentRemindersOptions = {},
): Promise<RunExperimentRemindersResult> {
  const date = options.date?.trim() || formatTodayPt(config.timezone);
  if (!isValidDate(date)) {
    throw new Error(`Invalid date: ${date} (expected YYYY-MM-DD)`);
  }

  const matches = await collectMilestonesForDate(config.rootDir, date);
  if (matches.length === 0) {
    return { date, matchCount: 0, sent: false, skippedReason: "no_matches" };
  }

  const email = renderReminderEmail(matches, date, config.digestSiteUrl);

  if (options.dryRun) {
    console.log(`Subject: ${email.subject}`);
    console.log("");
    console.log(email.text);
    return { date, matchCount: matches.length, sent: false };
  }

  const to = config.experimentReminderTo?.trim();
  if (!canSendOpsEmail(config, to)) {
    console.warn(
      "Experiment reminder email skipped — set RESEND_API_KEY, DIGEST_EMAIL_FROM, EXPERIMENT_REMINDER_TO",
    );
    return {
      date,
      matchCount: matches.length,
      sent: false,
      skippedReason: "email_not_configured",
    };
  }

  const { id } = await sendOpsEmail(config, {
    to: to!,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  console.log(
    `Experiment reminder sent for ${date} (${matches.length} milestone(s)) to ${to} (id: ${id})`,
  );
  return { date, matchCount: matches.length, sent: true, emailId: id };
}
