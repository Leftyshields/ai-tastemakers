import type { AppConfig } from "./types.js";
import { formatDateInTimezone } from "./config.js";
import { listExperimentIds, loadExperiment } from "./experiments/load.js";
import type { ExperimentRecord } from "./experiments/types.js";
import { canSendOpsEmail, sendOpsEmail } from "./email/resend.js";

export type ExperimentMilestoneType =
  | "baseline_start"
  | "baseline_end"
  | "treatment_start"
  | "treatment_end";

export interface ExperimentMilestoneMatch {
  experimentId: string;
  record: ExperimentRecord;
  milestoneType: ExperimentMilestoneType;
  date: string;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

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

function isSiteBuildFlag(flag: string): boolean {
  return flag.startsWith("SITE_");
}

export function buildChecklist(
  milestoneType: ExperimentMilestoneType,
  record: ExperimentRecord,
): string[] {
  const lines: string[] = [];
  const flags = Object.entries(record.change.flags ?? {}).filter(
    ([, value]) => value !== undefined && value !== "",
  );

  switch (milestoneType) {
    case "baseline_start":
      lines.push("Confirm experiment is in baseline (control configuration).");
      lines.push("Keep treatment flags off in GitHub Actions until treatment start.");
      lines.push("Monitor PostHog during the baseline window.");
      break;
    case "baseline_end":
      lines.push("Export PostHog metrics for the baseline window.");
      lines.push(
        `Import snapshot: npm run experiment -- snapshot ${record.id} --csv path/to/posthog-export.csv`,
      );
      lines.push("When starting treatment, set status to active in experiment JSON if appropriate.");
      break;
    case "treatment_start":
      for (const [flag, value] of flags) {
        if (isSiteBuildFlag(flag)) {
          lines.push(`Set ${flag}=${value} in Pages build env (pages.yml or build step).`);
        } else {
          lines.push(`Set ${flag}=${value} in digest.yml env for Daily Digest workflow.`);
        }
      }
      if (flags.length === 0) {
        lines.push("Enable treatment configuration per change_summary and notes.");
      }
      lines.push("Redeploy GitHub Pages if site build flags changed.");
      lines.push("Confirm treatment window dates in experiment JSON.");
      break;
    case "treatment_end":
      lines.push("Export PostHog metrics for the treatment window.");
      lines.push(
        `Import snapshot: npm run experiment -- snapshot ${record.id} --csv path/to/posthog-export.csv`,
      );
      lines.push("Record verdict and keep_change in experiment JSON.");
      lines.push("Set status to complete; disable treatment flags if not keeping the change.");
      break;
  }

  return lines;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSectionText(match: ExperimentMilestoneMatch, siteUrl: string): string {
  const { record, milestoneType, date } = match;
  const labUrl = `${siteUrl.replace(/\/$/, "")}/lab/experiments.html`;
  const checklist = buildChecklist(milestoneType, record);
  const lines = [
    `Experiment: ${record.id}`,
    `Status: ${record.status}`,
    `Edition: ${record.edition}`,
    `Milestone: ${MILESTONE_LABELS[milestoneType]} (${date} PT)`,
    `Change: ${record.change_summary}`,
    "",
    "Checklist:",
    ...checklist.map((item) => `- ${item}`),
    "",
    `Lab dashboard: ${labUrl}`,
  ];
  if (record.notes?.trim()) {
    lines.push("", `Notes: ${record.notes.trim()}`);
  }
  return lines.join("\n");
}

function renderSectionHtml(match: ExperimentMilestoneMatch, siteUrl: string): string {
  const { record, milestoneType, date } = match;
  const labUrl = `${siteUrl.replace(/\/$/, "")}/lab/experiments.html`;
  const checklist = buildChecklist(milestoneType, record);
  const items = checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  let html = [
    `<p><strong>Experiment:</strong> ${escapeHtml(record.id)}</p>`,
    `<p><strong>Status:</strong> ${escapeHtml(record.status)} | <strong>Edition:</strong> ${escapeHtml(record.edition)}</p>`,
    `<p><strong>Milestone:</strong> ${escapeHtml(MILESTONE_LABELS[milestoneType])} (${escapeHtml(date)} PT)</p>`,
    `<p>${escapeHtml(record.change_summary)}</p>`,
    `<p><strong>Checklist:</strong></p><ul>${items}</ul>`,
    `<p><a href="${escapeHtml(labUrl)}">Lab dashboard</a></p>`,
  ].join("\n");
  if (record.notes?.trim()) {
    html += `\n<p><strong>Notes:</strong> ${escapeHtml(record.notes.trim())}</p>`;
  }
  return html;
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
    `Runbook: ${RUNBOOK_URL}`,
  ].join("\n");

  const sectionHtml = matches.map((m) => renderSectionHtml(m, siteUrl));
  const html = [
    `<p>AI Tastemakers Lab — experiment lifecycle reminder for ${escapeHtml(date)} (America/Los_Angeles).</p>`,
    ...sectionHtml.flatMap((section, index) =>
      index === 0 ? [section] : ["<hr />", section],
    ),
    `<p><a href="${escapeHtml(RUNBOOK_URL)}">Runbook</a></p>`,
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
