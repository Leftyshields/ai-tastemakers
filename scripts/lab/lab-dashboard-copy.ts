import type { LabExperimentSource, PublicHistoryItem } from "./lab-public-types.js";
import type { LabExperimentEntry } from "./validate-experiments.js";
import { sanitizeVisibleCopy } from "./lab-format.js";

const GITHUB_ISSUES_URL = "https://github.com/Leftyshields/ai-tastemakers/issues";

export { GITHUB_ISSUES_URL };

/** Site-wide footer link to Lab home (round 7 label). */
export const LAB_FOOTER_ABOUT_LABEL = "Tastemaker Lab";

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

/** Collapsed expand rows; only one lab-expand-row open at a time (UX43). */
export function renderLabExpandRowScript(): string {
  return `<script>
document.querySelectorAll('.lab-expand-toggle').forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    var id = btn.getAttribute('data-target');
    if(!id) return;
    var row = document.querySelector('.lab-expand-row[data-for="'+id+'"]');
    if(!row) return;
    var open = row.getAttribute('data-open') === 'true';
    if(!open){
      document.querySelectorAll('.lab-expand-row[data-open="true"]').forEach(function(other){
        other.setAttribute('data-open','false');
      });
      document.querySelectorAll('.lab-expand-toggle').forEach(function(otherBtn){
        if(otherBtn.getAttribute('data-target') !== id) otherBtn.textContent = 'More';
      });
    }
    row.setAttribute('data-open', open ? 'false' : 'true');
    btn.textContent = open ? 'More' : 'Less';
  });
});
</script>`;
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

export type LabExperimentOrigin = Pick<
  LabExperimentEntry,
  "source" | "sourceRepo" | "sourceUrl"
>;

/** UX40 muted From project line when sourceRepo is set. */
export function renderFromProjectLine(
  exp: LabExperimentOrigin,
  escapeHtml: (t: string) => string,
  section: "hero" | "timeline" | "history" = "hero",
): string {
  const name = exp.sourceRepo?.trim();
  if (!name) return "";
  const label = sanitizeVisibleCopy(name);
  const url = exp.sourceUrl?.trim();
  if (url) {
    return `<p class="lab-from-project mt-1 text-xs text-stone-500 dark:text-stone-400">From <a href="${escapeHtml(url)}" class="text-blue-800 hover:underline dark:text-blue-400" data-lab-section="${section}" data-lab-source-repo="${escapeHtml(name)}">${escapeHtml(label)}</a></p>`;
  }
  return `<p class="lab-from-project mt-1 text-xs text-stone-500 dark:text-stone-400">From ${escapeHtml(label)}</p>`;
}

/** UX41 neutral origin chip (no brand orange). */
export function renderLabSourceOriginChip(
  source: NonNullable<LabExperimentEntry["source"]>,
  escapeHtml: (t: string) => string,
): string {
  const label =
    source === "auto" ? sanitizeVisibleCopy("Proposed by pipeline") : sanitizeVisibleCopy("Picked by hand");
  return `<span class="inline-flex shrink-0 items-center rounded-full bg-stone-200 px-2.5 py-0.5 text-xs font-medium leading-none text-stone-800 dark:bg-stone-700 dark:text-stone-200">${escapeHtml(label)}</span>`;
}

export function countExperimentsWithSource(experiments: LabExperimentEntry[]): number {
  return experiments.filter((e) => e.source === "auto" || e.source === "hand").length;
}

export function labPublishFooterHtml(escapeHtml: (t: string) => string): string {
  return `<p class="lab-publish-footer mt-10 border-t border-stone-200 pt-6 text-sm text-stone-600 dark:border-stone-700 dark:text-stone-400 font-sans">
    Everything here is safe to publish.
    <a href="index.html" class="text-blue-800 underline dark:text-blue-400" data-lab-section="footer">${escapeHtml(LAB_FOOTER_ABOUT_LABEL)}</a>.
    <a href="${escapeHtml(GITHUB_ISSUES_URL)}" class="text-blue-800 underline dark:text-blue-400" data-lab-section="footer">Open an issue</a>.
  </p>`;
}
