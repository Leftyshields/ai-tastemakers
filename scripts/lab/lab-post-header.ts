import fs from "node:fs";
import path from "node:path";
import type { EditionId } from "../../src/tastemaker/editions.js";
import {
  parseLabBadgeFromListParam,
  parseLabBadgeFromRankParam,
} from "../../src/tastemaker/analytics/repo-click.js";
import { labStatusChipLabel } from "./lab-dashboard-ui.js";
import { sanitizeVisibleCopy } from "./lab-format.js";
import {
  buildLabBadgeLookup,
  labBadgeForRepo,
  renderLabTestedBadgePagesHtml,
  resolveLabBadgeHref,
  type LabBadgeInfo,
} from "./lab-tested-badge.js";
import {
  loadExperimentsFile,
  type LabExperimentEntry,
  type LabExperimentStatus,
  type LabVerdict,
} from "./validate-experiments.js";
import type { LabLinkContext } from "./lab-analytics.js";
import { renderLabTrackedLink } from "./lab-analytics.js";

/** Shared with digest pages: opening sentence on experiment detail posts. */
export const LAB_TESTED_BADGE_BLURB =
  "When a repo card says Lab tested, it means we tried an idea from that repo in Tastemakers Lab.";

export const LAB_POST_CAME_FROM_PREFIX = "You came here from the";
export const LAB_POST_CAME_FROM_AT_NUMBER = "at number";
export const LAB_POST_BACK_TO_LIST_LABEL = "Back to the daily list";

const LIST_LABEL: Record<EditionId, string> = {
  oss: "AI Tastemakers daily list",
  skills: "Skill Tastemakers daily list",
};

const LIST_INDEX_HREF: Record<EditionId, string> = {
  oss: "../../index.html",
  skills: "../../skills/index.html",
};

export { parseLabBadgeFromListParam, parseLabBadgeFromRankParam };

export function labBadgeAttributionQuery(fromList: EditionId, rank: number): string {
  return `from_list=${fromList}&from_rank=${rank}`;
}

/** Append validated attribution query to a lab badge href (query before hash). */
export function appendLabBadgeAttributionToHref(
  href: string,
  fromList: EditionId,
  rank: number,
): string {
  const q = labBadgeAttributionQuery(fromList, rank);
  const hashIdx = href.indexOf("#");
  if (hashIdx >= 0) {
    const path = href.slice(0, hashIdx);
    const hash = href.slice(hashIdx);
    const sep = path.includes("?") ? "&" : "?";
    return `${path}${sep}${q}${hash}`;
  }
  return href.includes("?") ? `${href}&${q}` : `${href}?${q}`;
}

export function resolveLabBadgeHrefForDigestCard(
  badge: LabBadgeInfo,
  labPrefix: string,
  writeupPostIds: readonly string[],
  section: EditionId,
  rank: number,
): string {
  const base = resolveLabBadgeHref(badge, labPrefix, writeupPostIds);
  return appendLabBadgeAttributionToHref(base, section, rank);
}

export function experimentStatusLabel(status: LabExperimentStatus): string {
  return labStatusChipLabel("experiment", status);
}

export function verdictDisplayLabel(verdict: LabVerdict): string {
  return labStatusChipLabel("verdict", verdict);
}

export function firstResultSectionSentence(markdown: string): string | null {
  const lines = markdown.split(/\r?\n/);
  let inSection = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (/^##\s+(Result|Outcome)\s*$/.test(line)) {
      inSection = true;
      continue;
    }
    if (inSection && /^##\s/.test(line)) break;
    if (!inSection || !line) continue;
    let cleaned = line.replace(/^[_*]+|[_*]+$/g, "").trim();
    cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, "$1");
    const sentence = cleaned.split(/(?<=[.!?])\s+/)[0]?.trim();
    if (!sentence) return null;
    return sanitizeVisibleCopy(sentence);
  }
  return null;
}

export type PostVerdictSource = "verdict" | "outcome" | "result_section" | "status_only";

export function resolvePostVerdictLine(
  exp: LabExperimentEntry,
  markdown: string,
): { line: string; source: PostVerdictSource; verdictLabel: string | null } {
  const statusPart = sanitizeVisibleCopy(experimentStatusLabel(exp.status));
  if (exp.verdict) {
    const verdictLabel = sanitizeVisibleCopy(verdictDisplayLabel(exp.verdict));
    return {
      line: `${statusPart} · ${verdictLabel}`,
      source: "verdict",
      verdictLabel,
    };
  }
  const outcomeRaw = (exp as { outcome?: string | null }).outcome?.trim();
  if (outcomeRaw) {
    const sentence = sanitizeVisibleCopy(outcomeRaw.split(/(?<=[.!?])\s+/)[0] ?? outcomeRaw);
    return { line: `${statusPart} · ${sentence}`, source: "outcome", verdictLabel: sentence };
  }
  const fromMd = firstResultSectionSentence(markdown);
  if (fromMd) {
    return { line: `${statusPart} · ${fromMd}`, source: "result_section", verdictLabel: fromMd };
  }
  return { line: statusPart, source: "status_only", verdictLabel: null };
}

export function stripLeadingH1FromArticleHtml(html: string): string {
  return html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "");
}

export function renderDigestLabBadgeBlurbHtml(escape: (t: string) => string): string {
  return `<p class="digest-lab-badge-blurb mb-6 font-sans text-sm leading-relaxed text-stone-600 dark:text-stone-400">${escape(
    LAB_TESTED_BADGE_BLURB,
  )}</p>`;
}

export function digestBriefHasLabBadges(
  repos: ReadonlyArray<{ rank: number; full_name: string }>,
  experiments: readonly LabExperimentEntry[],
): boolean {
  const lookup = buildLabBadgeLookup(experiments);
  return repos.some((r) => r.rank <= 10 && labBadgeForRepo(lookup, r.full_name) != null);
}

export function renderLabPostCameFromScript(): string {
  return `<script>
(function(){
  var el = document.getElementById("lab-post-came-from");
  if(!el) return;
  var params = new URLSearchParams(window.location.search);
  var list = params.get("from_list");
  var rankRaw = params.get("from_rank");
  if(list !== "oss" && list !== "skills") return;
  var rank = parseInt(rankRaw || "", 10);
  if(!Number.isFinite(rank) || rank < 1 || rank > 10) return;
  var listLabel = list === "skills" ? ${JSON.stringify(LIST_LABEL.skills)} : ${JSON.stringify(LIST_LABEL.oss)};
  var listHref = list === "skills" ? ${JSON.stringify(LIST_INDEX_HREF.skills)} : ${JSON.stringify(LIST_INDEX_HREF.oss)};
  var prefix = ${JSON.stringify(LAB_POST_CAME_FROM_PREFIX)};
  var atNumber = ${JSON.stringify(LAB_POST_CAME_FROM_AT_NUMBER)};
  var backLabel = ${JSON.stringify(LAB_POST_BACK_TO_LIST_LABEL)};
  el.innerHTML = prefix + " <a href=\\"" + listHref + "\\" class=\\"text-blue-800 underline dark:text-blue-400\\" data-lab-section=\\"posts\\">" + listLabel + "</a> " + atNumber + " " + rank + ". <a href=\\"" + listHref + "\\" class=\\"text-blue-800 underline dark:text-blue-400\\" data-lab-section=\\"posts\\">" + backLabel + "</a>";
  el.classList.remove("hidden");
})();
</script>`;
}

export interface LabPostHeaderOptions {
  experiment: LabExperimentEntry;
  title: string;
  markdown: string;
  postHref: string;
  linkCtx: LabLinkContext;
  writeupPostIds: readonly string[];
  escape: (t: string) => string;
}

export function renderLabPostPageHeader(opts: LabPostHeaderOptions): string {
  const { experiment: exp, title, markdown, postHref, linkCtx, escape } = opts;
  const parts: string[] = [];
  parts.push(
    `<header class="lab-post-header mb-6 font-sans">`,
    `<h1 class="mb-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">${escape(
      sanitizeVisibleCopy(title),
    )}</h1>`,
  );

  const repoKey = exp.sourceRepo?.trim();
  if (repoKey) {
    const githubUrl = `https://github.com/${repoKey}`;
    parts.push(
      `<p class="lab-post-header__repo mb-3 text-sm text-stone-600 dark:text-stone-400">${renderLabTrackedLink(
        githubUrl,
        repoKey,
        linkCtx,
        { section: "posts", experimentId: exp.id, sourceRepo: repoKey },
        escape,
      )}</p>`,
    );
  }

  const lookup = buildLabBadgeLookup([exp]);
  const badge =
    labBadgeForRepo(lookup, repoKey ?? "") ??
    ({
      id: exp.id,
      title: exp.label.trim(),
      status: exp.status === "running" ? "running" : "done",
      repoKey: repoKey ?? exp.id,
    } as LabBadgeInfo);
  if (repoKey) {
    badge.repoKey = repoKey;
  }
  const badgeStatus = exp.status === "running" ? "running" : exp.status === "done" ? "done" : null;
  if (badgeStatus) {
    badge.status = badgeStatus;
    parts.push(
      `<div class="lab-post-header__badge mb-3">${renderLabTestedBadgePagesHtml(
        badge,
        postHref,
        escape,
      )}</div>`,
    );
  }

  const verdict = resolvePostVerdictLine(exp, markdown);
  parts.push(
    `<p class="lab-post-header__status mb-3 text-sm text-stone-700 dark:text-stone-300">${escape(
      verdict.line,
    )}</p>`,
  );

  parts.push(
    `<p id="lab-post-came-from" class="lab-post-header__came-from hidden mb-3 text-sm text-stone-600 dark:text-stone-400"></p>`,
    `<p class="lab-post-header__blurb mb-0 text-sm leading-relaxed text-stone-700 dark:text-stone-300">${escape(
      LAB_TESTED_BADGE_BLURB,
    )}</p>`,
    `</header>`,
    renderLabPostCameFromScript(),
  );

  return parts.join("");
}

/** DOM order check for verify gate (marker class sequence). */
export const LAB_POST_HEADER_ORDER_MARKERS = [
  "lab-post-header",
  "lab-post-header__repo",
  "lab-post-header__badge",
  "lab-post-header__status",
  "lab-post-header__came-from",
  "lab-post-header__blurb",
] as const;

export function findLabPostHeaderOrderViolations(html: string, pageRel: string): string[] {
  if (!html.includes("lab-post-header")) {
    if (pageRel.includes("EXP-")) {
      return [`${pageRel}: missing lab post header`];
    }
    return [];
  }
  const header = html.match(/<header class="lab-post-header[\s\S]*?<\/header>/i)?.[0] ?? "";
  const positions = LAB_POST_HEADER_ORDER_MARKERS.map((cls) => {
    if (cls === "lab-post-header") return header.indexOf('class="lab-post-header');
    return header.indexOf(cls);
  });
  if (positions[0]! < 0) {
    return [`${pageRel}: lab post header block incomplete`];
  }
  let lastPos = positions[0]!;
  for (let i = 1; i < LAB_POST_HEADER_ORDER_MARKERS.length; i++) {
    const cls = LAB_POST_HEADER_ORDER_MARKERS[i]!;
    const optional = cls === "lab-post-header__repo" || cls === "lab-post-header__badge";
    if (positions[i]! < 0) {
      if (optional) continue;
      return [`${pageRel}: missing ${cls}`];
    }
    if (positions[i]! < lastPos) {
      return [`${pageRel}: header order wrong at ${cls}`];
    }
    lastPos = positions[i]!;
  }
  const blurbIdx = html.indexOf(LAB_TESTED_BADGE_BLURB.replace(/&/g, "&amp;"));
  const articleIdx = html.search(/<article\b[^>]*lab-prose-capped/i);
  if (blurbIdx < 0 || articleIdx < 0 || blurbIdx > articleIdx) {
    return [`${pageRel}: badge blurb must precede article body`];
  }
  return [];
}

export function listExperimentPostsMissingVerdictSource(
  repoRoot: string,
): Array<{ id: string; source: PostVerdictSource }> {
  const file = loadExperimentsFile(repoRoot);
  const out: Array<{ id: string; source: PostVerdictSource }> = [];
  for (const exp of file.experiments) {
    const mdPath = path.join(repoRoot, "briefings/lab/posts", `${exp.id}.md`);
    if (!fs.existsSync(mdPath)) continue;
    const md = fs.readFileSync(mdPath, "utf8");
    const { source } = resolvePostVerdictLine(exp, md);
    out.push({ id: exp.id, source });
  }
  return out;
}
