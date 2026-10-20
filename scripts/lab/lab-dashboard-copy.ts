import type { LabExperimentSource, PublicHistoryItem } from "./lab-public-types.js";
import { sanitizeVisibleCopy } from "./lab-format.js";

const GITHUB_ISSUES_URL = "https://github.com/Leftyshields/ai-tastemakers/issues";

export { GITHUB_ISSUES_URL };

export function plainHypothesisSentence(raw: string | null | undefined): string {
  if (!raw?.trim()) return "";
  return sanitizeVisibleCopy(raw.trim());
}

/** One plain history result line from data only (UX34). */
export function historyResultLine(h: PublicHistoryItem): string {
  const summary = h.result_summary?.trim();
  if (!summary) return "";
  return sanitizeVisibleCopy(summary);
}

export function renderLabMoreButton(
  rowId: string,
  escapeHtml: (t: string) => string,
  label = "More",
): string {
  return `<button type="button" class="text-xs text-blue-800 dark:text-blue-400 lab-expand-toggle" data-target="${escapeHtml(rowId)}">${escapeHtml(label)}</button>`;
}

export function experimentTechnicalMoreHtml(
  exp: LabExperimentSource,
  escapeHtml: (t: string) => string,
): string {
  const lines: string[] = [];
  lines.push(`<p class="font-mono text-xs">${escapeHtml(exp.id)}</p>`);
  if (exp.experiment_key && exp.experiment_key !== exp.id) {
    lines.push(`<p class="text-xs">Key: <span class="font-mono">${escapeHtml(exp.experiment_key)}</span></p>`);
  }
  if (exp.posthog_flag) {
    lines.push(`<p class="text-xs">Flag: <span class="font-mono">${escapeHtml(exp.posthog_flag)}</span></p>`);
  }
  if (exp.note) {
    lines.push(`<p class="text-xs">${escapeHtml(sanitizeVisibleCopy(exp.note))}</p>`);
  }
  return lines.join("\n");
}

export function labPublishFooterHtml(escapeHtml: (t: string) => string): string {
  return `<p class="lab-publish-footer mt-10 border-t border-stone-200 pt-6 text-sm text-stone-600 dark:border-stone-700 dark:text-stone-400 font-sans">
    Everything here is safe to publish.
    <a href="about.html" class="text-blue-800 underline dark:text-blue-400">About the Lab</a>.
    <a href="${escapeHtml(GITHUB_ISSUES_URL)}" class="text-blue-800 underline dark:text-blue-400">Open an issue</a>.
  </p>`;
}
