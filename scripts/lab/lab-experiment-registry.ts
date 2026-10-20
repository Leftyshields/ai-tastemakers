import type { LabExperimentsPublicFile, LabExperimentSource } from "./lab-public-types.js";
import { sanitizeVisibleCopy } from "./lab-format.js";
import {
  experimentTechnicalMoreHtml,
  historyResultLine,
  renderLabMoreButton,
} from "./lab-dashboard-copy.js";
import { renderLabStatusChip } from "./lab-dashboard-ui.js";
import type { PublicHistoryItem } from "./lab-public-types.js";

/** One visible metric line from experiments.json success fields and optional end snapshot only. */
export function formatExperimentMetricHeadline(exp: LabExperimentSource): string {
  const label = sanitizeVisibleCopy(exp.success.metric.metric_label);
  const target = exp.success.metric.target;
  const snap = exp.posthog_snapshot_at_end;
  const delta = snap?.metric_delta;
  if (delta != null && Number.isFinite(Number(delta))) {
    return `${label}: ${delta} vs ${target} target`;
  }
  const baseline = exp.success.metric.baseline;
  if (baseline != null && Number.isFinite(Number(baseline))) {
    return `${label}: baseline ${baseline}, target ${target}`;
  }
  return `${label}: target ${target}`;
}

function sortExperimentsForRegistry(experiments: LabExperimentSource[]): LabExperimentSource[] {
  const rank = (s: LabExperimentSource["status"]) =>
    s === "running" ? 0 : s === "done" ? 1 : 2;
  return [...experiments].sort((a, b) => {
    const dr = rank(a.status) - rank(b.status);
    if (dr !== 0) return dr;
    if (a.status === "done" && b.status === "done") {
      return (b.end ?? "").localeCompare(a.end ?? "");
    }
    if (a.status === "planned" && b.status === "planned") {
      return (a.start ?? "").localeCompare(b.start ?? "");
    }
    return a.label.localeCompare(b.label);
  });
}

function historyRowFor(exp: LabExperimentSource, pub: LabExperimentsPublicFile): PublicHistoryItem | undefined {
  return pub.history.find((h) => h.id === exp.id);
}

function renderWriteUpLink(
  experimentId: string,
  writeupPostIds: readonly string[],
  escapeHtml: (t: string) => string,
): string {
  if (!writeupPostIds.includes(experimentId)) return "";
  return `<a class="text-sm text-blue-800 underline dark:text-blue-400" href="posts/${escapeHtml(experimentId)}.html" data-lab-section="experiments" data-lab-experiment-id="${escapeHtml(experimentId)}">Write up</a>`;
}

export function renderExperimentRegistrySectionHtml(
  pub: LabExperimentsPublicFile,
  escapeHtml: (t: string) => string,
): string {
  const items = sortExperimentsForRegistry(pub.experiments);
  const cards = items
    .map((exp) => {
      const moreId = escapeHtml(`registry-${exp.id}`);
      const hist = historyRowFor(exp, pub);
      const resultLine = hist ? historyResultLine(hist) : "";
      const metricLine = escapeHtml(formatExperimentMetricHeadline(exp));
      const verdictChip =
        exp.verdict != null ? renderLabStatusChip("verdict", exp.verdict, escapeHtml) : "";
      const statusChip = renderLabStatusChip("experiment", exp.status, escapeHtml);
      const writeUp = renderWriteUpLink(exp.id, pub.writeup_post_ids, escapeHtml);
      const resultSummaryBlock = resultLine
        ? `<p class="mt-2 text-sm text-stone-700 dark:text-stone-300">${escapeHtml(resultLine)}</p>`
        : "";

      return `<li id="lab-exp-${escapeHtml(exp.id)}" class="lab-exp-registry-card rounded-lg border border-stone-200 p-4 dark:border-stone-700">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100">${escapeHtml(sanitizeVisibleCopy(exp.label))}</h3>
          ${statusChip}
          ${verdictChip}
        </div>
        <p class="lab-exp-registry-metric mt-2 text-sm font-medium text-stone-800 dark:text-stone-200">${metricLine}</p>
        ${resultSummaryBlock}
        <div class="mt-3 flex flex-wrap items-center gap-3">
          ${writeUp}
          ${renderLabMoreButton(moreId, escapeHtml)}
        </div>
        <div class="lab-more-panel mt-2 text-xs text-stone-600 dark:text-stone-400" data-for="${moreId}" data-open="false">
          ${experimentTechnicalMoreHtml(exp, escapeHtml)}
        </div>
      </li>`;
    })
    .join("\n");

  return `<section id="lab-experiment-registry" class="lab-dashboard-section mb-10 font-sans" aria-labelledby="lab-experiment-registry-heading">
    <h2 id="lab-experiment-registry-heading" class="mb-3 text-lg font-bold tracking-tight">Experiments and results</h2>
    <ul class="lab-exp-registry list-none space-y-3 p-0">${cards}</ul>
  </section>`;
}
