import fs from "node:fs";
import path from "node:path";
import type { LabExperimentEntry } from "./validate-experiments.js";
import { loadExperimentsFile } from "./validate-experiments.js";
import { pipelineRoleChipLabel, sanitizeVisibleCopy } from "./lab-format.js";
import type { LabLinkContext } from "./lab-analytics.js";
import { renderLabTrackedLink } from "./lab-analytics.js";
import { renderLabMoreButton } from "./lab-dashboard-copy.js";
interface ToolInventoryEntry {
  full_name: string;
  html_url: string;
  pipeline_roles: string[];
  first_seen: string;
}

interface ToolInventoryFile {
  generated_at?: string;
  entries: ToolInventoryEntry[];
}

export type DigestLearnedEvidence =
  | `experiments.json:${string}`
  | `tool-inventory.json:${string}`
  | `experiment-status.json:${string}`;

export interface DigestLearnedClaim {
  id: string;
  evidence: DigestLearnedEvidence[];
}

export interface DigestLearnedModel {
  introClaim: DigestLearnedClaim;
  adopted: DigestLearnedClaim[];
  queued: DigestLearnedClaim[];
  roleGrowth: DigestLearnedClaim | null;
}

const LAB_TOOLS_LINK_CLASS = "lab-tools-tracked-link";

export const EDITION_TOPIC_CHIP_CLASS =
  "lab-edition-topic-chip rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800";

export function renderEditionTopicChip(label: string, escapeHtml: (t: string) => string): string {
  return `<span class="${EDITION_TOPIC_CHIP_CLASS}">${escapeHtml(label)}</span>`;
}

function loadInventory(repoRoot: string): ToolInventoryFile {
  const raw = fs.readFileSync(path.join(repoRoot, "data", "tool-inventory.json"), "utf8");
  return JSON.parse(raw) as ToolInventoryFile;
}

function inventoryToolForSourceRepo(
  sourceRepo: string,
  inventory: ToolInventoryFile,
): ToolInventoryEntry | undefined {
  const needle = sourceRepo.toLowerCase();
  return inventory.entries.find((e) => {
    const name = e.full_name.toLowerCase();
    const short = e.full_name.split("/")[1]?.toLowerCase();
    return name.includes(needle) || short === needle;
  });
}

function monthLabel(isoMonth: string): string {
  const [y, m] = isoMonth.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[m! - 1]!} ${y}`;
}

function roleTagTotalsByMonth(inventory: ToolInventoryFile): { month: string; cumulativeTags: number }[] {
  const months = [...new Set(inventory.entries.map((e) => e.first_seen.slice(0, 7)))].sort();
  let cumulative = 0;
  return months.map((month) => {
    const added = inventory.entries
      .filter((e) => e.first_seen.slice(0, 7) === month)
      .reduce((sum, e) => sum + (e.pipeline_roles?.length ?? 0), 0);
    cumulative += added;
    return { month, cumulativeTags: cumulative };
  });
}

export function buildDigestLearnedModel(repoRoot: string): DigestLearnedModel {
  const { experiments } = loadExperimentsFile(repoRoot);
  const inventory = loadInventory(repoRoot);

  const shipped = experiments.filter((e) => e.status === "done" && e.verdict === "ship");
  const adopted: DigestLearnedClaim[] = shipped.map((exp) => {
    const evidence: DigestLearnedEvidence[] = [`experiments.json:${exp.id}`];
    if (exp.sourceRepo?.trim()) {
      const tool = inventoryToolForSourceRepo(exp.sourceRepo, inventory);
      if (tool) {
        evidence.push(`tool-inventory.json:full_name:${tool.full_name}`);
      }
    }
    if (exp.result_summary?.trim()) {
      evidence.push(`experiments.json:result_summary:${exp.id}`);
    }
    return { id: `adopted-${exp.id}`, evidence };
  });

  const queuedExps = experiments.filter((e) => e.status === "planned" && e.id !== "POLICY-DIGEST-UI-FREEZE");
  const queued: DigestLearnedClaim[] = queuedExps.map((exp) => {
    const evidence: DigestLearnedEvidence[] = [`experiments.json:${exp.id}`];
    if (exp.sourceRepo?.trim()) {
      const tool = inventoryToolForSourceRepo(exp.sourceRepo, inventory);
      if (tool) {
        evidence.push(`tool-inventory.json:full_name:${tool.full_name}`);
      }
    }
    return { id: `queued-${exp.id}`, evidence };
  });

  const roleSeries = roleTagTotalsByMonth(inventory);
  let roleGrowth: DigestLearnedClaim | null = null;
  if (roleSeries.length >= 2) {
    const first = roleSeries[0]!;
    const last = roleSeries[roleSeries.length - 1]!;
    if (last.cumulativeTags > first.cumulativeTags) {
      roleGrowth = {
        id: "role-tag-growth",
        evidence: [
          "tool-inventory.json:aggregate:pipeline_role_tags_by_first_seen_month",
          `tool-inventory.json:month:${first.month}`,
          `tool-inventory.json:month:${last.month}`,
        ],
      };
    }
  }

  const introClaim: DigestLearnedClaim = {
    id: "intro-scan",
    evidence: [
      "tool-inventory.json:generated_at",
      `experiments.json:count:ship:${shipped.length}`,
      `experiments.json:count:planned:${queuedExps.length}`,
    ],
  };

  return { introClaim, adopted, queued, roleGrowth };
}

function expHistoryHref(exp: LabExperimentEntry): string {
  if (exp.status === "done") return `index.html#lab-exp-${exp.id}`;
  if (exp.status === "running") return "index.html#lab-control-panel";
  return "index.html#lab-timeline";
}

function renderClaimAttrs(claim: DigestLearnedClaim, escapeHtml: (t: string) => string): string {
  return `data-lab-claim="${escapeHtml(claim.id)}" data-lab-evidence="${escapeHtml(claim.evidence.join(","))}"`;
}

export function renderDigestLearnedSectionHtml(
  repoRoot: string,
  ctx: LabLinkContext,
  escapeHtml: (t: string) => string,
): string {
  const model = buildDigestLearnedModel(repoRoot);
  const { experiments } = loadExperimentsFile(repoRoot);
  const inventory = loadInventory(repoRoot);
  const shipped = experiments.filter((e) => e.status === "done" && e.verdict === "ship");
  const queuedExps = experiments.filter((e) => e.status === "planned" && e.id !== "POLICY-DIGEST-UI-FREEZE");
  const roleSeries = roleTagTotalsByMonth(inventory);

  const linkOpts = {
    section: "tools" as const,
    className: LAB_TOOLS_LINK_CLASS,
  };

  const parts: string[] = [];
  parts.push(`<section class="lab-tools-section lab-tools-learned mb-8 font-sans" aria-labelledby="lab-learned-heading">
    <h3 id="lab-learned-heading" class="mb-3 text-base font-bold">What the digest has learned</h3>
    <p class="mb-4 text-sm text-stone-700 dark:text-stone-300" ${renderClaimAttrs(model.introClaim, escapeHtml)}>
      The daily briefings feed a tool inventory and Lab experiments. So far ${escapeHtml(String(shipped.length))} shipped habits are on the record and ${escapeHtml(String(queuedExps.length))} more are queued for the Lab calendar.
    </p>`);

  if (model.adopted.length > 0) {
    parts.push(`<h4 class="mb-2 text-sm font-semibold text-stone-900 dark:text-stone-100">Adopted into the digest</h4>
      <ul class="mb-4 list-disc space-y-2 pl-5 text-sm text-stone-700 dark:text-stone-300">`);
    for (const exp of shipped) {
      const claim = model.adopted.find((c) => c.id === `adopted-${exp.id}`)!;
      const expLink = renderLabTrackedLink(
        expHistoryHref(exp),
        sanitizeVisibleCopy(exp.label),
        ctx,
        { ...linkOpts, experimentId: exp.id },
        escapeHtml,
      );
      let toolPart = "";
      if (exp.sourceRepo?.trim()) {
        const tool = inventoryToolForSourceRepo(exp.sourceRepo, inventory);
        if (tool) {
          toolPart = ` from ${renderLabTrackedLink(
            tool.html_url,
            sanitizeVisibleCopy(exp.sourceRepo),
            ctx,
            { ...linkOpts, sourceRepo: tool.full_name },
            escapeHtml,
          )}`;
        }
      }
      const summary = exp.result_summary?.trim()
        ? ` ${escapeHtml(sanitizeVisibleCopy(exp.result_summary))}`
        : "";
      parts.push(
        `<li ${renderClaimAttrs(claim, escapeHtml)}><span class="font-medium text-stone-900 dark:text-stone-100">${expLink}</span>${toolPart}.${summary}</li>`,
      );
    }
    parts.push(`</ul>`);
  }

  if (model.queued.length > 0) {
    parts.push(`<h4 class="mb-2 text-sm font-semibold text-stone-900 dark:text-stone-100">Queued next</h4>
      <ul class="mb-4 list-disc space-y-2 pl-5 text-sm text-stone-700 dark:text-stone-300">`);
    for (const exp of queuedExps) {
      const claim = model.queued.find((c) => c.id === `queued-${exp.id}`)!;
      const expLink = renderLabTrackedLink(
        expHistoryHref(exp),
        sanitizeVisibleCopy(exp.label),
        ctx,
        { ...linkOpts, experimentId: exp.id },
        escapeHtml,
      );
      let toolPart = "";
      if (exp.sourceRepo?.trim()) {
        const tool = inventoryToolForSourceRepo(exp.sourceRepo, inventory);
        if (tool) {
          toolPart = ` inspired by ${renderLabTrackedLink(
            tool.html_url,
            sanitizeVisibleCopy(exp.sourceRepo),
            ctx,
            { ...linkOpts, sourceRepo: tool.full_name },
            escapeHtml,
          )}`;
        }
      }
      parts.push(`<li ${renderClaimAttrs(claim, escapeHtml)}>${expLink}${toolPart}.</li>`);
    }
    parts.push(`</ul>`);
  }

  if (model.roleGrowth && roleSeries.length >= 2) {
    const first = roleSeries[0]!;
    const last = roleSeries[roleSeries.length - 1]!;
    const topRoles = [...new Set(inventory.entries.flatMap((e) => e.pipeline_roles ?? []))].sort();
    const chips = topRoles
      .slice(0, 9)
      .map((r) => renderEditionTopicChip(pipelineRoleChipLabel(r), escapeHtml))
      .join(" ");
    parts.push(`<h4 class="mb-2 text-sm font-semibold text-stone-900 dark:text-stone-100">Pipeline roles in the inventory</h4>
      <p class="mb-2 text-sm text-stone-700 dark:text-stone-300" ${renderClaimAttrs(model.roleGrowth, escapeHtml)}>
        Tagged pipeline roles rose from ${escapeHtml(String(first.cumulativeTags))} in ${escapeHtml(monthLabel(first.month))} to ${escapeHtml(String(last.cumulativeTags))} in ${escapeHtml(monthLabel(last.month))} as newly featured tools picked up roles over time.
      </p>
      <div class="lab-tools-role-chips flex flex-wrap gap-1">${chips}</div>`);
  }

  const sourcesId = "learned-sources";
  parts.push(`<div class="mt-3 text-xs text-stone-600 dark:text-stone-400">
      ${renderLabMoreButton(sourcesId, escapeHtml, "More")}
      <div class="lab-expand-row lab-learned-source-panel" data-for="${sourcesId}" data-open="false">
        <p class="mt-2 font-mono text-xs">lab/experiments.json</p>
        <p class="font-mono text-xs">data/tool-inventory.json</p>
      </div>
    </div>`);

  parts.push(`</section>`);
  return parts.join("\n");
}

/** Validates that every rendered claim id maps to evidence keys present in repo data. */
export function verifyDigestLearnedClaims(html: string, repoRoot: string): string[] {
  const errors: string[] = [];
  const model = buildDigestLearnedModel(repoRoot);
  const allClaims = [model.introClaim, ...model.adopted, ...model.queued, ...(model.roleGrowth ? [model.roleGrowth] : [])];
  const claimById = new Map(allClaims.map((c) => [c.id, c]));

  const attrRe = /data-lab-claim="([^"]+)"\s+data-lab-evidence="([^"]+)"/g;
  let match: RegExpExecArray | null;
  const seen = new Set<string>();
  while ((match = attrRe.exec(html)) !== null) {
    const id = match[1]!;
    const evidenceRaw = match[2]!;
    seen.add(id);
    const claim = claimById.get(id);
    if (!claim) {
      errors.push(`Unknown claim id in HTML: ${id}`);
      continue;
    }
    const rendered = evidenceRaw.split(",").sort().join(",");
    const expected = [...claim.evidence].sort().join(",");
    if (rendered !== expected) {
      errors.push(`Evidence mismatch for ${id}`);
    }
  }

  for (const claim of allClaims) {
    if (!seen.has(claim.id)) {
      errors.push(`Missing rendered claim: ${claim.id}`);
    }
  }

  const { experiments } = loadExperimentsFile(repoRoot);
  const inventory = loadInventory(repoRoot);
  for (const claim of allClaims) {
    for (const ev of claim.evidence) {
      if (ev.startsWith("experiments.json:")) {
        const rest = ev.slice("experiments.json:".length);
        if (rest.startsWith("count:")) continue;
        if (rest.startsWith("result_summary:")) {
          const id = rest.slice("result_summary:".length);
          if (!experiments.find((e) => e.id === id)?.result_summary?.trim()) {
            errors.push(`No result_summary for ${id}`);
          }
          continue;
        }
        if (!experiments.find((e) => e.id === rest)) {
          errors.push(`Unknown experiment id in evidence: ${rest}`);
        }
      } else if (ev.startsWith("tool-inventory.json:full_name:")) {
        const full = ev.slice("tool-inventory.json:full_name:".length);
        if (!inventory.entries.find((e) => e.full_name === full)) {
          errors.push(`Unknown inventory repo: ${full}`);
        }
      } else if (ev === "tool-inventory.json:generated_at") {
        if (!inventory.generated_at) errors.push("tool-inventory missing generated_at");
      } else if (ev.startsWith("tool-inventory.json:month:")) {
        const month = ev.slice("tool-inventory.json:month:".length);
        if (!inventory.entries.some((e) => e.first_seen.startsWith(month))) {
          errors.push(`No inventory first_seen month ${month}`);
        }
      }
    }
  }

  return errors;
}
