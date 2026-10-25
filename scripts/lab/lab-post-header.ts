import fs from "node:fs";
import path from "node:path";
import type { EditionId } from "../../src/tastemaker/editions.js";
import {
  appendLabPostFromToHref,
  labBadgeFromBriefSitePath,
  labPostFromClientParserSource,
} from "../../src/tastemaker/analytics/lab-post-from.js";
import { labStatusChipLabel } from "./lab-dashboard-ui.js";
import { sanitizeVisibleCopy, splitLabWriteupFrontMatter } from "./lab-format.js";
import {
  buildLabBadgeLookup,
  labBadgeForRepo,
  renderLabTestedBadgeSplitChipPillHtml,
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
import type { LabLinkContext, LabLinkTrackOptions } from "./lab-analytics.js";
import { labLinkDataAttrs, resolveLabToolHref } from "./lab-analytics.js";
import {
  LAB_POST_BACK_BUTTON_LABEL,
  LAB_POST_LEAD,
  LAB_POST_EXPERIMENT_PLAN_LINK_LABEL,
  LAB_POST_HEADER_FALLBACK_DISPLAY,
  LAB_POST_HEADER_FALLBACK_GITHUB_URL,
  LAB_POST_HEADER_FALLBACK_SOURCE_REPO,
  LAB_POST_PLANNED_CHIP_EXPLAINER,
  LAB_POST_LONG_REPO_FIXTURE_ID,
  LAB_POST_LONG_REPO_FIXTURE_SOURCE,
} from "./lab-post-header-copy.js";

/** Shared with digest pages: opening sentence on experiment detail posts. */
export const LAB_TESTED_BADGE_BLURB =
  "Tastemakers doesn't just report on AI tools. It tests them. Every Lab tested badge marks a repo whose idea was put to work on these lists and measured in the open.";

export { LAB_POST_BACK_BUTTON_LABEL } from "./lab-post-header-copy.js";

const LIST_INDEX_HREF: Record<EditionId, string> = {
  oss: "../../index.html",
  skills: "../../skills/index.html",
};

const BACK_ARROW_SVG = `<svg class="lab-post-back-btn__icon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>`;

const STATUS_CHECK_SVG = `<svg class="lab-post-panel__status-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5 9-10"/></svg>`;

export { appendLabPostFromToHref, labBadgeFromBriefSitePath };

export function resolveLabBadgeHrefForDigestCard(
  badge: LabBadgeInfo,
  labPrefix: string,
  writeupPostIds: readonly string[],
  section: EditionId,
  digestDate: string,
  fullName: string,
): string {
  const base = resolveLabBadgeHref(badge, labPrefix, writeupPostIds);
  const fromSitePath = labBadgeFromBriefSitePath(section, digestDate, fullName);
  return appendLabPostFromToHref(base, fromSitePath);
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

/** Remove markdown intro paragraph from article body (lead lives in the E1 panel). */
export function stripLabPostIntroParagraphFromArticleHtml(html: string): string {
  return html.replace(/^\s*<p\b[^>]*>[\s\S]*?<\/p>\s*/i, "");
}

function htmlTextContent(fragment: string): string {
  return fragment
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Count visible occurrences of panel lead copy in HTML (for duplicate-lead tests). */
export function countLabPostPanelLeadOccurrences(html: string): { lead: string | null; count: number } {
  const m = html.match(/class="lab-post-panel__lead"[^>]*>([^<]*)</);
  if (!m) return { lead: null, count: 0 };
  const lead = htmlTextContent(m[1] ?? "").trim();
  if (!lead) return { lead: null, count: 0 };
  const pageText = htmlTextContent(html);
  let count = 0;
  let idx = 0;
  while (true) {
    const at = pageText.indexOf(lead, idx);
    if (at < 0) break;
    count++;
    idx = at + lead.length;
  }
  return { lead, count };
}

export function renderDigestLabBadgeBlurbHtml(escape: (t: string) => string): string {
  return `<p class="digest-lab-badge-blurb lab-post-panel__badge-blurb mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">${escape(
    LAB_TESTED_BADGE_BLURB,
  )}</p>`;
}

/** Internal queue/rank copy must not appear in the reader-facing panel lead. */
export function labPostPanelLeadIsForbidden(text: string): boolean {
  if (/#\d/.test(text)) return true;
  if (/\bRANK-\d/i.test(text)) return true;
  if (/backlog/i.test(text)) return true;
  return false;
}

/** Lab tested pill on digest cards (done or running experiments only). */
export function labPostShowsLabTestedBadge(exp: LabExperimentEntry): boolean {
  return exp.status === "done" || exp.status === "running";
}

export type LabPostHeaderChipMode = "planned" | "run_no_source" | "run_with_source";

export function labPostHeaderChipMode(exp: LabExperimentEntry): LabPostHeaderChipMode {
  if (exp.status === "planned") return "planned";
  if (exp.sourceRepo?.trim()) return "run_with_source";
  return "run_no_source";
}

/** Lab tested pill (done-style) on run-with-source write-ups only. */
export function labPostSplitChipShowsLabTestedPill(exp: LabExperimentEntry): boolean {
  return labPostHeaderChipMode(exp) === "run_with_source";
}

/** In the Lab pill on planned write-ups. */
export function labPostSplitChipShowsInTheLabPill(exp: LabExperimentEntry): boolean {
  return labPostHeaderChipMode(exp) === "planned";
}

export function labPostHeaderChipRepoKey(exp: LabExperimentEntry): string {
  return exp.sourceRepo?.trim() || LAB_POST_HEADER_FALLBACK_SOURCE_REPO;
}

export function labPostHeaderUsesRepoFallback(exp: LabExperimentEntry): boolean {
  return labPostHeaderChipMode(exp) === "run_no_source";
}

export function labExperimentPlanAnchorId(experimentId: string): string {
  return `lab-exp-${experimentId}`;
}

/** Relative to `lab/posts/` → experiments dashboard plan anchor. */
export function labPostExperimentPlanHref(experimentId: string): string {
  return `../experiments.html#${labExperimentPlanAnchorId(experimentId)}`;
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

/** Strip markdown emphasis from lead source text (no literal asterisks in output). */
export function stripLabPostLeadMarkdown(text: string): string {
  let out = text.trim();
  for (let i = 0; i < 8; i++) {
    const prev = out;
    out = out.replace(/^[_*~`]+|[_*~`]+$/g, "").trim();
    out = out.replace(/\*\*([^*]+)\*\*/g, "$1");
    out = out.replace(/\*([^*]+)\*/g, "$1");
    out = out.replace(/__([^_]+)__/g, "$1");
    out = out.replace(/_([^_]+)_/g, "$1");
    if (out === prev) break;
  }
  return out.replace(/\*\*/g, "").replace(/\*/g, "").replace(/_/g, "").trim();
}

/** Remove bold date/status prefix from the first intro paragraph (reader-facing lead body). */
export function stripLabPostIntroStatusPrefix(text: string): string {
  let s = text.trim();
  if (/^Queued, not started\.\s*/i.test(s)) {
    return s.replace(/^Queued, not started\.\s*/i, "").trim();
  }
  const statusPrefix = s.match(/^(?:Closed|Shipped|Kept|Running|Active)\b[^.]*\.\s*/i);
  if (statusPrefix) {
    return s.slice(statusPrefix[0].length).trim();
  }
  return s;
}

function finalizeLabPostPanelLead(raw: string): string | null {
  const cleaned = sanitizeVisibleCopy(stripLabPostLeadMarkdown(raw.trim()));
  if (!cleaned || labPostPanelLeadIsForbidden(cleaned)) return null;
  return cleaned;
}

function collectLabPostIntroParagraphs(markdownBody: string): string[] {
  const lines = markdownBody.split(/\r?\n/);
  let pastH1 = false;
  const paragraphs: string[] = [];
  let buf: string[] = [];
  const flushParagraph = (): void => {
    if (buf.length > 0) {
      paragraphs.push(buf.join(" "));
      buf = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!pastH1) {
      if (/^#\s+/.test(line)) pastH1 = true;
      continue;
    }
    if (/^##\s/.test(line)) {
      flushParagraph();
      break;
    }
    if (!line) {
      flushParagraph();
      continue;
    }
    buf.push(line);
    if (line.endsWith(".") || line.endsWith("!") || line.endsWith("?")) {
      flushParagraph();
    }
  }
  flushParagraph();
  return paragraphs;
}

export function extractLabPostLeadParagraph(
  experimentId: string,
  markdown: string,
): string | null {
  const { frontMatter, body } = splitLabWriteupFrontMatter(markdown);
  const fmLead = frontMatter.lead?.trim();
  if (fmLead) {
    // Copywriter panel leads include date/status; do not strip status prefix (intro fallback only).
    return finalizeLabPostPanelLead(fmLead);
  }
  const override = LAB_POST_LEAD[experimentId]?.trim();
  if (override) {
    return finalizeLabPostPanelLead(override);
  }
  for (const para of collectLabPostIntroParagraphs(body)) {
    const text = stripLabPostIntroStatusPrefix(stripLabPostLeadMarkdown(para));
    if (!text) continue;
    const cleaned = finalizeLabPostPanelLead(text);
    if (cleaned) return cleaned;
  }
  return null;
}

export function renderDigestLabPlannedChipExplainerHtml(escape: (t: string) => string): string {
  const text = LAB_POST_PLANNED_CHIP_EXPLAINER.trim();
  if (!text) return "";
  return `<p class="lab-post-panel__planned-explainer mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">${escape(
    text,
  )}</p>`;
}

function renderLabPostSplitPlanLinkHtml(
  href: string,
  label: string,
  linkCtx: LabLinkContext,
  opts: LabLinkTrackOptions,
  escape: (t: string) => string,
): string {
  const resolved = resolveLabToolHref(href, linkCtx);
  return `<a href="${escape(resolved)}" class="lab-post-split-chip__repo lab-post-split-chip__plan" ${labLinkDataAttrs(opts)}>${escape(label)}</a>`;
}

function renderLabPostPlainRepoLinkHtml(
  githubUrl: string,
  displayFullName: string,
  linkCtx: LabLinkContext,
  opts: LabLinkTrackOptions,
  escape: (t: string) => string,
): string {
  const resolved = resolveLabToolHref(githubUrl, linkCtx);
  const slash = displayFullName.indexOf("/");
  const inner =
    slash >= 0
      ? `<span class="lab-post-split-chip__owner-line"><span class="lab-post-split-chip__owner">${escape(displayFullName.slice(0, slash))}</span>/</span><wbr><span class="lab-post-split-chip__name">${escape(displayFullName.slice(slash + 1))}</span>`
      : escape(displayFullName);
  return `<a href="${escape(resolved)}" class="lab-post-header__repo-link" ${labLinkDataAttrs(opts)}>${inner}</a>`;
}

function renderLabPostSplitRepoLinkHtml(
  githubUrl: string,
  displayFullName: string,
  linkCtx: LabLinkContext,
  opts: LabLinkTrackOptions,
  escape: (t: string) => string,
): string {
  const resolved = resolveLabToolHref(githubUrl, linkCtx);
  const slash = displayFullName.indexOf("/");
  const inner =
    slash >= 0
      ? `<span class="lab-post-split-chip__owner-line"><span class="lab-post-split-chip__owner">${escape(displayFullName.slice(0, slash))}</span>/</span><wbr><span class="lab-post-split-chip__name">${escape(displayFullName.slice(slash + 1))}</span>`
      : escape(displayFullName);
  return `<a href="${escape(resolved)}" class="lab-post-split-chip__repo" ${labLinkDataAttrs(opts)}>${inner}</a>`;
}

function renderLabPostStatusLineHtml(
  exp: LabExperimentEntry,
  markdown: string,
  escape: (t: string) => string,
): string {
  const statusLabel = sanitizeVisibleCopy(experimentStatusLabel(exp.status));
  let textInner: string;
  if (exp.verdict) {
    const verdictLabel = sanitizeVisibleCopy(verdictDisplayLabel(exp.verdict));
    textInner = `<b class="lab-post-panel__status-em">${escape(statusLabel)}</b>, ${escape(verdictLabel)}`;
  } else {
    textInner = escape(statusLabel);
  }
  const showCheck = exp.status === "done" && exp.verdict === "ship";
  const icon = showCheck ? STATUS_CHECK_SVG : "";
  return `<p class="lab-post-panel__status">${icon}<span class="lab-post-panel__status-text">${textInner}</span></p>`;
}

export function renderLabPostHeaderClientScripts(): string {
  const fromParser = labPostFromClientParserSource();
  return `<script>
${fromParser}
(function(){
  var btn = document.getElementById("lab-post-back-btn");
  if(btn){
    btn.addEventListener("click", function(e){
      e.preventDefault();
      function sameOriginReferrer(){
        try {
          if(!document.referrer) return false;
          return new URL(document.referrer).origin === window.location.origin;
        } catch (err) { return false; }
      }
      function dailyListHref(fromSitePath){
        if(fromSitePath && fromSitePath.indexOf("skills/") === 0){
          return ${JSON.stringify(LIST_INDEX_HREF.skills)};
        }
        return ${JSON.stringify(LIST_INDEX_HREF.oss)};
      }
      if(window.history.length > 1 && sameOriginReferrer()){
        window.history.back();
        return;
      }
      var fromSitePath = parseLabPostFromSearch(window.location.search);
      if(fromSitePath){
        window.location.assign(${JSON.stringify("../../")} + fromSitePath);
        return;
      }
      window.location.assign(dailyListHref(null));
    });
  }
  var hdr = document.querySelector(".lab-post-header__hdr");
  var btnEl = document.getElementById("lab-post-back-btn");
  var chip = document.querySelector(".lab-post-split-chip") || document.querySelector(".lab-post-header__repo-link");
  if(hdr && btnEl && chip){
    function syncWrap(){
      var wrapped = chip.offsetTop > btnEl.offsetTop + 2;
      hdr.classList.toggle("lab-post-header__hdr--wrapped", wrapped);
    }
    syncWrap();
    if(typeof ResizeObserver !== "undefined"){
      new ResizeObserver(syncWrap).observe(hdr);
    } else {
      window.addEventListener("resize", syncWrap);
    }
  }
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
  repoRoot: string;
  escape: (t: string) => string;
}

export function renderLabPostPageHeader(opts: LabPostHeaderOptions): string {
  const { experiment: exp, title, markdown, linkCtx, repoRoot, escape } = opts;
  const lead = extractLabPostLeadParagraph(exp.id, markdown);

  const parts: string[] = [];
  parts.push(`<header class="lab-post-header mb-6 font-sans">`);
  parts.push(`<section class="lab-post-panel">`);

  const chipMode = labPostHeaderChipMode(exp);
  const registryRepoKey = exp.sourceRepo?.trim();
  const chipRepoKey = labPostHeaderChipRepoKey(exp);
  const trackOpts =
    chipMode === "planned"
      ? { section: "posts" as const, experimentId: exp.id }
      : {
          section: "posts" as const,
          experimentId: exp.id,
          sourceRepo: chipRepoKey,
        };
  parts.push(`<div class="lab-post-header__hdr">`);
  parts.push(
    `<button type="button" id="lab-post-back-btn" class="lab-post-back-btn" data-lab-section="posts" data-lab-nav="back">${BACK_ARROW_SVG}<span class="lab-post-back-btn__text">${escape(LAB_POST_BACK_BUTTON_LABEL)}</span></button>`,
  );

  parts.push(`<span class="lab-post-header__vdiv" aria-hidden="true"></span>`);

  if (chipMode === "run_no_source") {
    parts.push(
      renderLabPostPlainRepoLinkHtml(
        LAB_POST_HEADER_FALLBACK_GITHUB_URL,
        LAB_POST_HEADER_FALLBACK_DISPLAY,
        linkCtx,
        trackOpts,
        escape,
      ),
    );
  } else {
    const badge: LabBadgeInfo = {
      id: exp.id,
      title: exp.label.trim(),
      status: chipMode === "planned" ? "running" : exp.status === "running" ? "running" : "done",
      repoKey: chipMode === "planned" ? exp.id : chipRepoKey,
    };
    parts.push(`<div class="lab-post-split-chip">`);
    if (labPostSplitChipShowsInTheLabPill(exp) || labPostSplitChipShowsLabTestedPill(exp)) {
      parts.push(renderLabTestedBadgeSplitChipPillHtml(badge, escape));
    }
    if (chipMode === "planned") {
      parts.push(
        renderLabPostSplitPlanLinkHtml(
          labPostExperimentPlanHref(exp.id),
          LAB_POST_EXPERIMENT_PLAN_LINK_LABEL,
          linkCtx,
          trackOpts,
          escape,
        ),
      );
    } else {
      const { displayFullName, githubUrl } = resolveSourceRepoGithubLink(registryRepoKey!, repoRoot);
      parts.push(
        renderLabPostSplitRepoLinkHtml(githubUrl, displayFullName, linkCtx, trackOpts, escape),
      );
    }
    parts.push(`</div>`);
  }

  parts.push(`</div>`);
  parts.push(
    `<h1 class="lab-post-panel__title">${escape(sanitizeVisibleCopy(title))}</h1>`,
    renderLabPostStatusLineHtml(exp, markdown, escape),
  );
  if (lead) {
    parts.push(`<p class="lab-post-panel__lead">${escape(lead)}</p>`);
  }
  if (labPostSplitChipShowsLabTestedPill(exp)) {
    parts.push(renderDigestLabBadgeBlurbHtml(escape));
  } else if (labPostSplitChipShowsInTheLabPill(exp)) {
    parts.push(renderDigestLabPlannedChipExplainerHtml(escape));
  }
  parts.push(`</section>`);
  parts.push(`</header>`, renderLabPostHeaderClientScripts());

  return parts.join("");
}

/** Stress-test header for long owner/repo names (verify screenshots only). */
export function renderLabPostLongNameFixtureHeader(
  linkCtx: LabLinkContext,
  repoRoot: string,
  escape: (t: string) => string,
): string {
  const exp = loadExperimentsFile(repoRoot).experiments.find(
    (e) => e.id === "EXP-20260716-firecrawl-enrich-skills",
  );
  if (!exp) throw new Error("missing Firecrawl experiment for long-repo fixture");
  const fixtureExp: LabExperimentEntry = {
    ...exp,
    id: LAB_POST_LONG_REPO_FIXTURE_ID,
    sourceRepo: LAB_POST_LONG_REPO_FIXTURE_SOURCE,
  };
  const md = fs.readFileSync(
    path.join(repoRoot, "briefings/lab/posts/EXP-20260716-firecrawl-enrich-skills.md"),
    "utf8",
  );
  return renderLabPostPageHeader({
    experiment: fixtureExp,
    title: "Better source pages for Skills briefs",
    markdown: md,
    postHref: "_fixture-e1-long-repo.html",
    linkCtx,
    writeupPostIds: [],
    repoRoot,
    escape,
  });
}

/** DOM order check for verify gate (marker class sequence). */
export const LAB_POST_HEADER_ORDER_MARKERS = [
  "lab-post-header",
  "lab-post-panel",
  "lab-post-header__hdr",
  "lab-post-back-btn",
  "lab-post-header__vdiv",
  "lab-post-split-chip",
  "lab-post-header__repo-link",
  "lab-post-split-chip__pill",
  "lab-post-split-chip__repo",
  "lab-post-panel__title",
  "lab-post-panel__status",
  "lab-post-panel__lead",
  "digest-lab-badge-blurb",
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
    if (cls === "lab-post-split-chip") return header.indexOf('class="lab-post-split-chip"');
    if (cls === "lab-post-header__repo-link") return header.indexOf('class="lab-post-header__repo-link"');
    if (cls === "lab-post-split-chip__pill") return header.indexOf("lab-post-split-chip__pill");
    if (cls === "lab-post-split-chip__repo") return header.indexOf("lab-post-split-chip__repo");
    return header.indexOf(cls);
  });
  if (positions[0]! < 0) {
    return [`${pageRel}: lab post header block incomplete`];
  }
  let lastPos = positions[0]!;
  for (let i = 1; i < LAB_POST_HEADER_ORDER_MARKERS.length; i++) {
    const cls = LAB_POST_HEADER_ORDER_MARKERS[i]!;
    const optional =
      cls === "lab-post-header__vdiv" ||
      cls === "lab-post-split-chip" ||
      cls === "lab-post-header__repo-link" ||
      cls === "lab-post-split-chip__pill" ||
      cls === "lab-post-split-chip__repo" ||
      cls === "lab-post-panel__lead" ||
      cls === "digest-lab-badge-blurb";
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
    "Back to the daily list",
    "Back to Lab",
    "lab-post-back-link",
    "From the OSS top 10",
    "From the Skills top 10",
    "from_rank=",
    "from_list=",
    "at number",
  ];
  for (const needle of forbidden) {
    if (header.includes(needle)) {
      return [`${pageRel}: header must not include forbidden copy ${needle}`];
    }
  }
  const hasLabTestedPill =
    header.includes("lab-post-split-chip__pill") &&
    header.includes('data-lab-badge-status="done"');
  const hasBlurb = header.includes("digest-lab-badge-blurb");
  if (hasLabTestedPill !== hasBlurb) {
    return [
      `${pageRel}: Lab tested badge blurb must ${hasLabTestedPill ? "be present" : "be absent"} (labTestedPill=${hasLabTestedPill}, blurb=${hasBlurb})`,
    ];
  }
  if (!header.includes('id="lab-post-back-btn"')) {
    return [`${pageRel}: missing Back button`];
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
