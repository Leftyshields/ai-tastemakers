import fs from "node:fs";
import path from "node:path";
import type { LabExperimentEntry } from "./validate-experiments.js";
import { loadExperimentsFile } from "./validate-experiments.js";
import { sanitizeVisibleCopy } from "./lab-format.js";
import { renderLabLoopStripHtml } from "./lab-loop-strip.js";
import {
  type LabLinkContext,
  renderLabTrackedLink,
  type LabLinkSection,
} from "./lab-analytics.js";
import {
  experimentTechnicalMoreHtml,
  renderLabExpandRowScript,
  renderLabMoreButton,
} from "./lab-dashboard-copy.js";
import { renderDigestLearnedSectionHtml, renderEditionTopicChip } from "./digest-learned.js";

const LAB_TOOLS_LINK_CLASS = "lab-tools-tracked-link";

export interface ToolInventoryEntry {
  full_name: string;
  html_url: string;
  pipeline_roles: string[];
  appearance_count: number;
  first_seen: string;
  last_seen: string;
  recommendation?: string;
  notes?: string;
}

export interface ToolInventoryFile {
  entries: ToolInventoryEntry[];
}

export type QueueStatus = "Testing" | "Queued" | "Adopted" | "Passed";

function loadInventory(repoRoot: string): ToolInventoryFile {
  const raw = fs.readFileSync(path.join(repoRoot, "data", "tool-inventory.json"), "utf8");
  return JSON.parse(raw) as ToolInventoryFile;
}

function roleLabel(role: string): string {
  return sanitizeVisibleCopy(role.replace(/_/g, " "));
}

function toolDisplayName(fullName: string): string {
  const slash = fullName.indexOf("/");
  if (slash < 0) return sanitizeVisibleCopy(fullName);
  return sanitizeVisibleCopy(fullName.slice(slash + 1));
}

function experimentForTool(fullName: string, experiments: LabExperimentEntry[]): LabExperimentEntry | undefined {
  return experiments.find((e) => {
    if (e.sourceRepo && fullName.toLowerCase().includes(e.sourceRepo.toLowerCase())) return true;
    const short = fullName.split("/")[1]?.toLowerCase();
    if (short && e.sourceRepo?.toLowerCase() === short) return true;
    if (e.note?.includes(fullName)) return true;
    return false;
  });
}

function queueStatus(entry: ToolInventoryEntry, exp: LabExperimentEntry | undefined): QueueStatus {
  if (exp?.status === "running") return "Testing";
  if (exp?.status === "planned") return "Queued";
  if (entry.recommendation === "adopted" || exp?.status === "done") return "Adopted";
  if (entry.recommendation === "queued") return "Queued";
  return "Passed";
}

function statusChip(status: QueueStatus, escapeHtml: (t: string) => string): string {
  const base =
    "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold leading-none";
  const cls =
    status === "Testing"
      ? `${base} bg-blue-700 text-white dark:bg-blue-600`
      : status === "Queued"
        ? `${base} border border-stone-400 bg-transparent text-stone-800 dark:border-blue-400 dark:text-stone-200`
        : status === "Adopted"
          ? `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100`
          : `${base} bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-200`;
  return `<span class="${cls}">${escapeHtml(status)}</span>`;
}

function queueRows(
  inventory: ToolInventoryFile,
  experiments: LabExperimentEntry[],
  ctx: LabLinkContext,
  escapeHtml: (t: string) => string,
): ToolInventoryEntry[] {
  return inventory.entries
    .filter(
      (e) =>
        e.recommendation === "adopted" ||
        e.recommendation === "queued" ||
        e.recommendation === "watch" ||
        experimentForTool(e.full_name, experiments) != null,
    )
    .sort((a, b) => a.full_name.localeCompare(b.full_name));
}

function formatFeaturedDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m! - 1]!} ${d}, ${y}`;
}

export function renderToolsPageHtml(
  repoRoot: string,
  ctx: LabLinkContext,
  escapeHtml: (t: string) => string,
): string {
  const inventory = loadInventory(repoRoot);
  const { experiments } = loadExperimentsFile(repoRoot);
  const section: LabLinkSection = "tools";

  const parts: string[] = [];
  parts.push(renderLabLoopStripHtml("about", escapeHtml, { activeStep: 2, linkCtx: ctx }));
  parts.push(`<header class="lab-tools-lede mb-6 font-sans">
    <h2 class="text-lg font-bold tracking-tight">Evaluated tools</h2>
    <p class="mt-2 text-sm text-stone-700 dark:text-stone-300">Tools we've featured, and how they scored as candidates to improve our pipeline.</p>
  </header>`);

  parts.push(renderDigestLearnedSectionHtml(repoRoot, ctx, escapeHtml));

  const queue = queueRows(inventory, experiments, ctx, escapeHtml);
  parts.push(`<section class="lab-tools-section mb-8 font-sans" aria-labelledby="lab-queue-heading">
    <h3 id="lab-queue-heading" class="mb-3 text-base font-bold">Lab queue</h3>
    <div class="lab-table-wrap"><table class="lab-table lab-backlog-table lab-tools-queue border border-stone-200 text-sm dark:border-stone-700">
      <thead class="bg-stone-50 dark:bg-stone-900"><tr>
        <th>Tool</th><th>Role</th><th>Status</th><th>Linked experiment</th>
      </tr></thead><tbody>`);

  for (const entry of queue) {
    const exp = experimentForTool(entry.full_name, experiments);
    const status = queueStatus(entry, exp);
    const roleChips = entry.pipeline_roles
      .slice(0, 2)
      .map((r) => renderEditionTopicChip(roleLabel(r), escapeHtml))
      .join("");
    const rowId = escapeHtml(`tool-${entry.full_name.replace(/\//g, "-")}`);
    const toolLink = renderLabTrackedLink(
      entry.html_url,
      toolDisplayName(entry.full_name),
      ctx,
      { section, sourceRepo: entry.full_name, className: LAB_TOOLS_LINK_CLASS },
      escapeHtml,
    );
    const expHref = exp
      ? exp.status === "done"
        ? `index.html#lab-exp-${exp.id}`
        : exp.status === "running"
          ? "index.html#lab-control-panel"
          : "index.html#lab-timeline"
      : "";
    const expLink = exp
      ? renderLabTrackedLink(
          expHref,
          sanitizeVisibleCopy(exp.label),
          ctx,
          { section, experimentId: exp.id, className: LAB_TOOLS_LINK_CLASS },
          escapeHtml,
        )
      : "";
    const moreBtn = renderLabMoreButton(rowId, escapeHtml);
    const linkedCell = `<td class="lab-tools-linked-cell"><div class="lab-tools-linked-inner">${
      expLink ? `<span class="lab-tools-exp-link">${expLink}</span>` : `<span class="lab-tools-exp-link"></span>`
    }${moreBtn}</div></td>`;
    const expandBits: string[] = [];
    if (entry.notes?.trim()) {
      expandBits.push(`<p>${escapeHtml(sanitizeVisibleCopy(entry.notes))}</p>`);
    }
    if (exp) {
      expandBits.push(experimentTechnicalMoreHtml(exp, escapeHtml));
    }
    parts.push(`<tr class="lab-data-row">
      <td>${toolLink}</td>
      <td><div class="lab-tools-role-chips">${roleChips}</div></td>
      <td>${statusChip(status, escapeHtml)}</td>
      ${linkedCell}
    </tr>
    <tr class="lab-expand-row" data-for="${rowId}" data-open="false"><td colspan="4" class="text-xs text-stone-600 dark:text-stone-400">
      ${expandBits.join("\n")}
    </td></tr>`);
  }
  parts.push(`</tbody></table></div></section>`);

  const top = [...inventory.entries].sort((a, b) => b.appearance_count - a.appearance_count);
  const top10 = top.slice(0, 10);
  const showAll = top.length > 10;
  parts.push(`<section class="lab-tools-section mb-8 font-sans lab-tools-top" data-show-all="false" aria-labelledby="lab-top-heading">
    <h3 id="lab-top-heading" class="mb-3 text-base font-bold">Top candidates</h3>
    <div class="lab-table-wrap"><table class="lab-table lab-history-table lab-tools-top-candidates border border-stone-200 text-sm dark:border-stone-700">
      <thead class="bg-stone-50 dark:bg-stone-900"><tr>
        <th>Tool</th><th class="lab-tools-col-role">Role</th><th class="lab-num">Appearances</th><th class="lab-tools-last-desktop">Last featured</th>
      </tr></thead><tbody>`);

  top.forEach((entry, index) => {
    const hidden = index >= 10 ? " lab-tools-row-hidden" : "";
    const chips = entry.pipeline_roles
      .slice(0, 3)
      .map((r) => renderEditionTopicChip(roleLabel(r), escapeHtml))
      .join("");
    const lastFeatured = escapeHtml(formatFeaturedDate(entry.last_seen));
    const toolLink = renderLabTrackedLink(
      entry.html_url,
      toolDisplayName(entry.full_name),
      ctx,
      { section, sourceRepo: entry.full_name, className: LAB_TOOLS_LINK_CLASS },
      escapeHtml,
    );
    parts.push(`<tr class="lab-data-row${hidden}">
      <td class="lab-tools-tool-cell">${toolLink}<div class="lab-tools-last-mobile">Last featured ${lastFeatured}</div></td>
      <td class="lab-tools-col-role"><div class="lab-tools-role-chips">${chips}</div></td>
      <td class="lab-num">${escapeHtml(String(entry.appearance_count))}</td>
      <td class="lab-tools-last-desktop">${lastFeatured}</td>
    </tr>`);
  });
  parts.push(`</tbody></table></div>
    ${showAll ? `<button type="button" class="lab-tools-show-all mt-3 text-sm text-blue-800 underline dark:text-blue-400" data-lab-tools-toggle aria-pressed="false">Show all</button>` : ""}
  </section>`);

  const byRole = new Map<string, ToolInventoryEntry[]>();
  for (const entry of inventory.entries) {
    for (const role of entry.pipeline_roles) {
      const list = byRole.get(role) ?? [];
      list.push(entry);
      byRole.set(role, list);
    }
  }
  const roles = [...byRole.keys()].sort();
  parts.push(`<section class="lab-tools-section mb-8 font-sans" aria-labelledby="lab-roles-heading">
    <h3 id="lab-roles-heading" class="mb-3 text-base font-bold">Role matrix</h3>`);
  for (const role of roles) {
    const list = byRole.get(role) ?? [];
    list.sort((a, b) => b.appearance_count - a.appearance_count);
    const summary = `${list.length} tools · ${list.reduce((s, e) => s + e.appearance_count, 0)} appearances`;
    const items = list
      .slice(0, 12)
      .map(
        (e) =>
          `<li>${renderLabTrackedLink(e.html_url, toolDisplayName(e.full_name), ctx, { section, sourceRepo: e.full_name, className: LAB_TOOLS_LINK_CLASS }, escapeHtml)} (${escapeHtml(String(e.appearance_count))})</li>`,
      )
      .join("");
    parts.push(`<details class="lab-tools-role mb-2 rounded-lg border border-stone-200 dark:border-stone-700">
      <summary class="cursor-pointer px-3 py-2 text-sm font-semibold">${escapeHtml(roleLabel(role))} · ${escapeHtml(sanitizeVisibleCopy(summary))}</summary>
      <ul class="list-disc px-6 pb-3 text-sm text-stone-700 dark:text-stone-300">${items}</ul>
    </details>`);
  }
  parts.push(`</section>`);

  parts.push(renderLabExpandRowScript());
  parts.push(`<script>
document.querySelectorAll('[data-lab-tools-toggle]').forEach(function(btn){
  btn.addEventListener('click', function(){
    var sec = document.querySelector('.lab-tools-top');
    if(!sec) return;
    var open = sec.getAttribute('data-show-all') === 'true';
    sec.setAttribute('data-show-all', open ? 'false' : 'true');
    btn.setAttribute('aria-pressed', open ? 'false' : 'true');
    btn.textContent = open ? 'Show all' : 'Show less';
  });
});
</script>`);

  return parts.join("\n");
}
