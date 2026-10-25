import fs from "node:fs";
import path from "node:path";
import type { EditionId } from "../../src/tastemaker/editions.js";
import {
  labBadgeAttributionClientParserSource,
  parseLabBadgeFromListParam,
  parseLabBadgeFromRankParam,
} from "../../src/tastemaker/analytics/repo-click.js";
import { labStatusChipLabel } from "./lab-dashboard-ui.js";
import { sanitizeVisibleCopy } from "./lab-format.js";
import {
  buildLabBadgeLookup,
  labBadgeForRepo,
  renderLabTestedBadgePostHeaderChipHtml,
  resolveLabBadgeHref,
  type LabBadgeInfo,
} from "./lab-tested-badge.js";
import { resolveSourceRepoGithubLink } from "./source-repo-display.js";
import {
  loadExperimentsFile,
  type LabExperimentEntry,
  type LabExperimentStatus,
  type LabVerdict,
} from "./validate-experiments.js";
import type { LabLinkContext } from "./lab-analytics.js";
import { renderLabTrackedLink } from "./lab-analytics.js";
import {
  LAB_POST_BACK_TO_LIST_LABEL,
  LAB_POST_CARD_LABEL_OSS,
  LAB_POST_CARD_LABEL_SKILLS,
  labPostRepoDescription,
} from "./lab-post-header-copy.js";

/** Shared with digest pages: opening sentence on experiment detail posts. */
export const LAB_TESTED_BADGE_BLURB =
  "Tastemakers doesn't just report on AI tools. It tests them. Every Lab tested badge marks a repo whose idea was put to work on these lists and measured in the open.";

export { LAB_POST_BACK_TO_LIST_LABEL } from "./lab-post-header-copy.js";

const LIST_INDEX_HREF: Record<EditionId, string> = {
  oss: "../../index.html",
  skills: "../../skills/index.html",
};

const LAB_POST_CARD_LABEL: Record<EditionId, string> = {
  oss: LAB_POST_CARD_LABEL_OSS,
  skills: LAB_POST_CARD_LABEL_SKILLS,
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
    if (/^##\s+(Result|Outcome|What happened)\s*$/.test(line)) {
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

export function editionFromSourceUrl(sourceUrl: string | null | undefined): EditionId {
  const src = sourceUrl?.trim() ?? "";
  return src.includes("/skills/") ? "skills" : "oss";
}

/** Digest page href relative to lab/posts/ (featured-day anchor when known). */
export function resolveLabPostDigestBackHref(
  exp: LabExperimentEntry,
  list: EditionId,
): string {
  const src = exp.sourceUrl?.trim() ?? "";
  const srcIsSkills = src.includes("/skills/");
  if (list === "skills") {
    if (srcIsSkills && src) return src;
    return LIST_INDEX_HREF.skills;
  }
  if (src && !srcIsSkills) return src;
  return LIST_INDEX_HREF.oss;
}

export function renderLabPostBackToListScript(
  defaultHref: string,
  ossHref: string,
  skillsHref: string,
): string {
  const attributionParser = labBadgeAttributionClientParserSource();
  return `<script>
${attributionParser}
(function(){
  var link = document.getElementById("lab-post-back-to-list-link");
  if(!link) return;
  var att = parseLabBadgeAttribution(window.location.search);
  if(att){
    link.href = att.list === "skills" ? ${JSON.stringify(skillsHref)} : ${JSON.stringify(ossHref)};
  }
})();
</script>`;
}

const LAB_POST_REPO_LINK_CLASS =
  "lab-post-card__repo-link text-blue-800 no-underline hover:underline dark:text-blue-400";

function renderLabPostStatusLineHtml(
  exp: LabExperimentEntry,
  markdown: string,
  escape: (t: string) => string,
): string {
  const verdict = resolvePostVerdictLine(exp, markdown);
  const showCheck = exp.status === "done" && exp.verdict === "ship";
  const check = showCheck
    ? `<span class="lab-post-card__status-check mr-1 text-emerald-600 dark:text-emerald-400" aria-hidden="true">✓</span>`
    : "";
  return `<p class="lab-post-card__status mb-0 text-sm text-stone-600 dark:text-stone-400">${check}<span class="lab-post-card__status-text">${escape(
    verdict.line,
  )}</span></p>`;
}

export interface LabPostHeaderOptions {
  experiment: LabExperimentEntry;
  title: string;
  markdown: string;
  postHref: string;
  linkCtx: LabLinkContext;
  writeupPostIds: readonly string[];
  repoRoot: string;
  escape: (t: string) => string;
}

export function renderLabPostPageHeader(opts: LabPostHeaderOptions): string {
  const { experiment: exp, title, markdown, linkCtx, repoRoot, escape } = opts;
  const cardEdition = editionFromSourceUrl(exp.sourceUrl);
  const cardLabel = LAB_POST_CARD_LABEL[cardEdition];
  const defaultBackHref = resolveLabPostDigestBackHref(exp, cardEdition);
  const ossBackHref = resolveLabPostDigestBackHref(exp, "oss");
  const skillsBackHref = resolveLabPostDigestBackHref(exp, "skills");

  const parts: string[] = [];
  parts.push(`<header class="lab-post-header mb-6 font-sans">`);

  const repoKey = exp.sourceRepo?.trim();
  if (repoKey) {
    parts.push(
      `<p class="lab-post-header__label mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">${escape(
        cardLabel,
      )}</p>`,
    );
  }

  parts.push(`<article class="lab-post-card mb-4 rounded-xl border border-stone-200 bg-stone-100/80 p-5 dark:border-stone-700 dark:bg-stone-900/60">`);

  if (repoKey) {
    const { displayFullName, githubUrl } = resolveSourceRepoGithubLink(repoKey, repoRoot);
    parts.push(
      `<h2 class="lab-post-card__repo mb-2 font-sans text-lg font-semibold tracking-tight">${renderLabTrackedLink(
        githubUrl,
        displayFullName,
        linkCtx,
        {
          section: "posts",
          experimentId: exp.id,
          sourceRepo: repoKey,
          className: LAB_POST_REPO_LINK_CLASS,
        },
        escape,
      )}</h2>`,
    );
    const description = labPostRepoDescription(repoKey);
    if (description) {
      parts.push(
        `<p class="lab-post-card__description mb-3 font-sans text-sm text-stone-600 dark:text-stone-400 max-[479px]:hidden">${escape(
          description,
        )}</p>`,
      );
    }

    const lookup = buildLabBadgeLookup([exp]);
    const badge =
      labBadgeForRepo(lookup, repoKey) ??
      ({
        id: exp.id,
        title: exp.label.trim(),
        status: exp.status === "running" ? "running" : "done",
        repoKey,
      } as LabBadgeInfo);
    badge.repoKey = repoKey;
    const badgeStatus =
      exp.status === "running" ? "running" : exp.status === "done" ? "done" : null;
    if (badgeStatus) {
      badge.status = badgeStatus;
      parts.push(
        `<div class="lab-post-card__badge mb-4">${renderLabTestedBadgePostHeaderChipHtml(
          badge,
          escape,
        )}</div>`,
      );
    }
  }

  parts.push(
    `<h1 class="lab-post-card__title mb-2 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">${escape(
      sanitizeVisibleCopy(title),
    )}</h1>`,
    renderLabPostStatusLineHtml(exp, markdown, escape),
    `</article>`,
    `<p class="lab-post-header__back mb-0 font-sans text-sm"><a id="lab-post-back-to-list-link" href="${escape(
      defaultBackHref,
    )}" class="lab-post-back-link inline-flex min-h-11 items-center py-2 text-blue-800 underline dark:text-blue-400" data-lab-section="posts">${escape(
      LAB_POST_BACK_TO_LIST_LABEL,
    )}</a></p>`,
    `</header>`,
    renderLabPostBackToListScript(defaultBackHref, ossBackHref, skillsBackHref),
  );

  return parts.join("");
}

/** DOM order check for verify gate (marker class sequence). */
export const LAB_POST_HEADER_ORDER_MARKERS = [
  "lab-post-header",
  "lab-post-header__label",
  "lab-post-card",
  "lab-post-card__repo",
  "lab-post-card__description",
  "lab-post-card__badge",
  "lab-post-card__title",
  "lab-post-card__status",
  "lab-post-header__back",
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
    const optional =
      cls === "lab-post-header__label" ||
      cls === "lab-post-card__repo" ||
      cls === "lab-post-card__description" ||
      cls === "lab-post-card__badge";
    if (positions[i]! < 0) {
      if (optional) continue;
      return [`${pageRel}: missing ${cls}`];
    }
    if (positions[i]! < lastPos) {
      return [`${pageRel}: header order wrong at ${cls}`];
    }
    lastPos = positions[i]!;
  }
  const forbidden = [
    "lab-post-came-from",
    "You clicked this",
    "You came here from the",
    "from_rank=",
    "at number",
    LAB_TESTED_BADGE_BLURB.replace(/&/g, "&amp;"),
  ];
  for (const needle of forbidden) {
    if (header.includes(needle)) {
      return [`${pageRel}: header must not include ${needle}`];
    }
  }
  if (!header.includes(LAB_POST_BACK_TO_LIST_LABEL.replace(/&/g, "&amp;"))) {
    return [`${pageRel}: missing back to daily list link`];
  }
  const proseIdx = html.search(/<article\b[^>]*lab-prose-capped/i);
  const headerIdx = html.indexOf('class="lab-post-header');
  if (proseIdx < 0 || headerIdx < 0 || headerIdx > proseIdx) {
    return [`${pageRel}: lab post header must precede article body`];
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
