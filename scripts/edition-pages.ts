import fs from "node:fs/promises";
import path from "node:path";
import {
  EDITIONS,
  OSS_DISCOVER_TOPIC_CHIPS,
  type EditionDefinition,
  type EditionId,
} from "../src/tastemaker/editions.js";
import { renderSafeMarkdown } from "./safe-markdown.js";
import { briefingsDirForEdition } from "../src/tastemaker/editions.js";
import { normalizeLegacyNewMarkdown } from "../src/tastemaker/writers/new-badge.js";
import { loadAllExperiments, writeExperimentsData } from "./lab/aggregate-experiments.js";
import { writeTokenUsageData } from "./lab/aggregate-token-usage.js";
import { renderTokenUsagePage } from "./lab/render-token-usage.js";
import { renderLabDashboardHtml, writeLabPublicArtifacts } from "./lab/build-lab-public.js";
import {
  LAB_PROSE_ARTICLE_CLASS,
  buildIsoDatePt,
  formatLabLastUpdatedPt,
  prepareLabProseHtmlFromMarkdown,
  prepareLabWriteupHtmlFromMarkdown,
  sanitizeLabVisibleHtml,
} from "./lab/lab-format.js";
import { LAB_FOOTER_ABOUT_LABEL, labPublishFooterHtml } from "./lab/lab-dashboard-copy.js";
import {
  applyLabIntroVonRestorff,
  renderLabLoopAboutBlockHtml,
  renderLabLoopStripHtml,
} from "./lab/lab-loop-strip.js";
import {
  defaultLabLinkContext,
  ensureLabLinkSections,
  prepareLabPostArticleHtml,
  labLinkClickScript,
  type LabLinkContext,
  type LabLinkSection,
} from "./lab/lab-analytics.js";
import { renderToolsPageHtml } from "./lab/render-tools-page.js";
import { labAboutRedirectScript } from "./lab/lab-about-redirect.js";
import { collectDigestRepoAllowlist } from "../src/tastemaker/analytics/digest-allowlist.js";
import type { OutboundDestRegistry } from "../src/tastemaker/analytics/outbound-dest-manifest.js";
import {
  rewriteOutboundLinksInHtml,
  type OutboundRewriteContext,
} from "../src/tastemaker/analytics/rewrite-outbound-links.js";
import {
  articleJsonLd,
  briefMetaDescription,
  briefSocialDescription,
  briefSocialTitle,
  breadcrumbJsonLd,
  buildSeoHeadHtml,
  defaultOgImageUrl,
  feedAlternateLinksHtml,
  googleSiteVerificationMetaHtml,
  digestRepoItemListJsonLd,
  itemListJsonLd,
  websiteJsonLd,
  type BriefFeedEntry,
  type PageSeoOptions,
} from "./seo-helpers.js";
import {
  applyTemplate,
  buildSeoDescriptionFromTemplate,
  buildSeoTitleFromTemplate,
  formatSeoDateLabel,
  formatSeoDateShort,
  metaDescriptionFromLead,
  seoPage,
  topPickShortName,
  parseWeeklyReviewDateRange,
} from "./seo-copy.js";
import { briefOgImagePath, EDITION_TAGLINES, writeBriefOgPng } from "./generate-brief-og.js";
import {
  groupDatesByMonth,
  buildMonthCalendarCells,
  landingLayoutV2Enabled,
  loadTopRepoMetaMap,
} from "./index-layout-helpers.js";
import {
  loadLabBadgeLookup,
  loadLabWriteupPostIds,
} from "./lab/lab-tested-badge.js";
import { loadExperimentsFile } from "./lab/validate-experiments.js";
import {
  renderLabPostLongNameFixtureHeader,
  renderLabPostPageHeader,
  stripLabPostIntroParagraphFromArticleHtml,
  stripLeadingH1FromArticleHtml,
} from "./lab/lab-post-header.js";
import { listLabWriteupPostIds } from "./lab/lab-format.js";
import {
  renderDigestBriefArticle,
  splitDailyBriefMarkdown,
} from "../src/tastemaker/pages/brief-cards.js";
import type { Digest } from "../src/tastemaker/types.js";
import {
  archiveBackLinkLabel,
  daysArchiveIntroForEdition,
  daysArchiveMetaForEdition,
  DAYS_ARCHIVE_EMPTY,
  DAYS_ARCHIVE_PAGE_TITLE,
  DAYS_ARCHIVE_SECTION_HEADING,
  MONTHLY_INDEX_INTRO,
  MONTHLY_INDEX_META_DESCRIPTION,
  MONTHLY_INDEX_PAGE_TITLE,
  MONTHLY_INDEX_SECTION_HEADING,
  WEEKLY_INDEX_INTRO,
  WEEKLY_INDEX_META_DESCRIPTION,
  WEEKLY_INDEX_PAGE_TITLE,
  WEEKLY_INDEX_SECTION_HEADING,
} from "./index-archive-page-copy.js";
import {
  buildHomeIndexMainHtml,
  HOME_EDITION_TAGLINES,
  type HomeWrapUpArchive,
} from "./home-index-layout.js";
import { formatWeekReviewDateRange, loadWeekRangeLabels } from "./week-review-date-range.js";
import { isSiteGateExemptHtmlFile } from "./site-verification-pages.js";

const ARCHIVE_SECTION_HEADING_CLASS = "archive-sh";

export { landingLayoutV2Enabled } from "./index-layout-helpers.js";

export function escapeScriptString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

export function posthogAnalyticsEnabled(): boolean {
  return Boolean(process.env.POSTHOG_KEY?.trim());
}

async function listHtmlFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await listHtmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      if (isSiteGateExemptHtmlFile(full)) continue;
      results.push(full);
    }
  }
  return results;
}

/** Ensures every built HTML page includes PostHog when POSTHOG_KEY is set. */
export async function verifyPosthogInBuiltSite(siteDir: string): Promise<number> {
  if (!posthogAnalyticsEnabled()) {
    if (process.env.GITHUB_ACTIONS === "true") {
      throw new Error(
        "POSTHOG_KEY is required for GitHub Pages deploy: all HTML pages must ship with analytics.",
      );
    }
    console.warn("Warning: POSTHOG_KEY not set: built HTML has no PostHog snippet.");
    return 0;
  }

  const htmlFiles = await listHtmlFiles(siteDir);
  const missing: string[] = [];
  for (const file of htmlFiles) {
    const content = await fs.readFile(file, "utf8");
    if (!content.includes("posthog.init")) {
      missing.push(path.relative(siteDir, file));
    }
  }

  if (missing.length > 0) {
    const preview = missing.slice(0, 8).join(", ");
    const suffix = missing.length > 8 ? ` (+${missing.length - 8} more)` : "";
    throw new Error(`PostHog snippet missing from ${missing.length} page(s): ${preview}${suffix}`);
  }

  return htmlFiles.length;
}

export function posthogScriptHtml(): string {
  const key = process.env.POSTHOG_KEY?.trim();
  if (!key) return "";
  const host = (process.env.POSTHOG_HOST?.trim() || "https://us.i.posthog.com").replace(/\/$/, "");
  const safeKey = escapeScriptString(key);
  const safeHost = escapeScriptString(host);
  return `<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('${safeKey}', {
      api_host: '${safeHost}',
      autocapture: false,
      capture_pageview: true,
      disable_session_recording: true
    });
  </script>`;
}

export function labBadgeClickTrackingScript(): string {
  if (!posthogAnalyticsEnabled()) return "";
  return `<script>
(function () {
  document.addEventListener("click", function (event) {
    var targetEl = event.target;
    if (!targetEl || !targetEl.closest) return;
    var badge = targetEl.closest("a.lab-tested-badge");
    if (!badge) return;
    if (typeof posthog === "undefined" || !posthog.capture) return;
    var card = badge.closest(".digest-repo-card");
    if (!card) return;
    var repo = card.getAttribute("data-repo") || "";
    var list = card.getAttribute("data-section") || "";
    var rankRaw = card.getAttribute("data-position") || "";
    var rank = parseInt(rankRaw, 10);
    var expId = badge.getAttribute("data-lab-badge-exp") || "";
    var status = badge.getAttribute("data-lab-badge-status") || "";
    var sourceRepo = badge.getAttribute("data-lab-badge-source-repo") || "";
    if (!sourceRepo && repo) {
      sourceRepo = String(repo).trim().toLowerCase();
    }
    if (!repo || (list !== "oss" && list !== "skills") || !Number.isFinite(rank) || !expId) return;
    posthog.capture("lab_badge_click", {
      experiment_id: expId,
      exp_id: expId,
      repo: repo,
      source_repo: sourceRepo,
      status: status,
      list: list,
      rank: rank,
      surface: "pages",
      channel: "pages"
    }, { transport: "sendBeacon", send_instantly: true });
  }, true);
})();
</script>`;
}

export function digestRepoClickTrackingScript(): string {
  if (!posthogAnalyticsEnabled()) return "";
  return `<script>
(function () {
  function clickSource() {
    try {
      return new URLSearchParams(window.location.search).get("utm_source") === "email"
        ? "email"
        : "direct";
    } catch (e) {
      return "direct";
    }
  }

  function captureRepoClick(card, target) {
    if (typeof posthog === "undefined" || !posthog.capture) return;
    var repo = card.getAttribute("data-repo") || "";
    var section = card.getAttribute("data-section") || "";
    var positionRaw = card.getAttribute("data-position") || "";
    var position = parseInt(positionRaw, 10);
    var digestDate = card.getAttribute("data-digest-date") || "";
    if (!repo || (section !== "oss" && section !== "skills") || !Number.isFinite(position)) return;
    posthog.capture("repo_click", {
      repo: repo,
      section: section,
      channel: "pages",
      position: position,
      target: target,
      digest_date: digestDate,
      source: clickSource()
    }, { transport: "sendBeacon", send_instantly: true });
  }

  document.addEventListener("click", function (event) {
    var targetEl = event.target;
    if (!targetEl || !targetEl.closest) return;
    if (targetEl.closest("a.lab-tested-badge")) return;
    var card = targetEl.closest(".digest-repo-card");
    if (!card) return;
    var link = targetEl.closest("a[href]");
    if (!link || !card.contains(link)) return;
    if (link.closest(".digest-repo-card__body")) return;
    var href = link.getAttribute("href") || "";
    if (href.indexOf("/go/") >= 0 || href.indexOf("go/index.html") >= 0) return;
    var clickTarget = link.classList.contains("digest-repo-card__cta")
      ? "button"
      : link.classList.contains("digest-repo-card__title-link")
        ? "title"
        : null;
    if (!clickTarget) return;
    captureRepoClick(card, clickTarget);
  }, true);
})();
</script>`;
}

export function homepageIndexTrackingScript(editionId: "oss" | "skills"): string {
  if (!posthogAnalyticsEnabled()) return "";
  const edition = escapeScriptString(editionId);
  return `<script>
(function () {
  document.querySelectorAll("[data-index-cta]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      if (typeof posthog === "undefined" || !posthog.capture) return;
      var anchor = event.currentTarget;
      if (!anchor || anchor.tagName !== "A") return;
      var cta = anchor.getAttribute("data-index-cta") || "";
      if (!cta) return;
      var targetPath = "";
      try {
        if (anchor.href) targetPath = new URL(anchor.href, window.location.href).pathname;
      } catch (e) {}
      posthog.capture("homepage_index_click", {
        edition: "${edition}",
        cta: cta,
        target_path: targetPath
      });
    });
  });
})();
</script>`;
}

export interface SitePaths {
  css: string;
  home: string;
  subscribe: string;
  lab: string;
  brief: (date: string) => string;
  crossEdition?: { href: string; label: string };
  editionNav: EditionNav;
}

export interface EditionNav {
  ossHref: string;
  skillsHref: string;
  active?: "oss" | "skills";
}

function editionNavFor(siteSegment: string, depth: 0 | 1): EditionNav {
  const active: EditionNav["active"] = siteSegment === "skills" ? "skills" : "oss";

  if (depth === 0) {
    if (siteSegment === "skills") {
      return { ossHref: "../", skillsHref: "./", active };
    }
    return { ossHref: "./", skillsHref: "skills/", active };
  }

  if (siteSegment === "skills") {
    return { ossHref: "../../", skillsHref: "../", active };
  }
  return { ossHref: "../", skillsHref: "../skills/", active };
}

export type LabNavActive = "home" | "methodology" | "tools" | "experiments" | "tokens" | "posts";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function editionNavPill(
  href: string,
  label: string,
  isActive: boolean,
  escapeHtml: (t: string) => string,
  extraClass = "",
  trackAttr = "",
  homeIndexNav = false,
): string {
  const base = homeIndexNav
    ? "inline-flex min-h-8 shrink-0 snap-start items-center rounded-full border px-3.5 py-1 font-sans text-sm no-underline"
    : "inline-flex min-h-8 shrink-0 snap-start items-center rounded-full border px-3.5 py-1 font-sans text-sm no-underline transition";
  const active = homeIndexNav
    ? "home-index-tab--active"
    : "border-blue-800 bg-blue-50 font-semibold text-blue-900 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-200";
  const idle = homeIndexNav
    ? "home-index-tab--idle"
    : "border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-500 dark:hover:text-stone-100";
  return `<a href="${href}" class="${base} ${isActive ? active : idle}${extraClass ? ` ${extraClass}` : ""}"${trackAttr}${isActive ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`;
}

export function editionNavHtml(
  nav: EditionNav,
  escapeHtml: (t: string) => string,
  labAnalytics = false,
  options?: { desktopOnlyOnLab?: boolean; homeIndexNav?: boolean },
): string {
  const track = labAnalytics ? ' data-lab-section="nav"' : "";
  const indexCta = options?.homeIndexNav ? ' data-index-cta="cross_edition"' : "";
  const layout = options?.desktopOnlyOnLab
    ? "mt-4 hidden min-[640px]:flex flex-wrap gap-2"
    : options?.homeIndexNav
      ? "home-index-edition-nav tabs mt-4 flex flex-wrap gap-2"
      : "mt-4 flex flex-wrap gap-2";

  const homeIndexNav = options?.homeIndexNav === true;
  return `<nav aria-label="Tastemakers editions" class="${layout}">
      ${editionNavPill(nav.ossHref, "AI Tastemakers", nav.active === "oss", escapeHtml, "", `${track}${indexCta}`, homeIndexNav)}
      ${editionNavPill(nav.skillsHref, "Skill Tastemakers", nav.active === "skills", escapeHtml, "", `${track}${indexCta}`, homeIndexNav)}
    </nav>`;
}

export function editionSitePaths(siteSegment: string, depth: 0 | 1): SitePaths {
  const editionNav = editionNavFor(siteSegment, depth);

  if (depth === 0) {
    const assetPrefix = siteSegment ? "../" : "";
    return {
      css: `${assetPrefix}assets/style.css`,
      home: "./",
      subscribe: siteSegment ? "../subscribe.html" : "subscribe.html",
      lab: siteSegment ? "../lab/" : "lab/",
      brief: (date) => `briefings/${date}.html`,
      crossEdition: siteSegment
        ? { href: "../", label: "AI Tastemakers" }
        : { href: "skills/", label: "Skill Tastemakers" },
      editionNav,
    };
  }

  const assetPrefix = siteSegment ? "../../" : "../";
  return {
    css: `${assetPrefix}assets/style.css`,
    home: "../",
    subscribe: siteSegment ? "../../subscribe.html" : "../subscribe.html",
    lab: siteSegment ? "../../lab/" : "../lab/",
    brief: (date) => `${date}.html`,
    crossEdition: siteSegment
      ? { href: "../../", label: "AI Tastemakers" }
      : { href: "../skills/", label: "Skill Tastemakers" },
    editionNav,
  };
}

function labNavPill(
  href: string,
  label: string,
  isActive: boolean,
  escapeHtml: (t: string) => string,
  trackAttr = "",
): string {
  const base =
    "lab-nav-pill inline-flex min-h-8 shrink-0 snap-start items-center rounded-full border px-3.5 py-1 font-sans text-sm no-underline";
  const active = "lab-nav-pill--active font-semibold";
  const idle =
    "border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-500 dark:hover:text-stone-100";
  return `<a href="${href}" class="${base} ${isActive ? active : idle}"${trackAttr}${isActive ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`;
}

function labNavPillsHtml(
  active: LabNavActive,
  escapeHtml: (t: string) => string,
  depth: 0 | 1 | 2,
): string {
  const prefix = depth === 0 ? "" : "../";
  const labHomeHref = depth === 0 ? "./" : "../";
  const methodologyHref = depth === 0 ? "methodology.html" : "../methodology.html";
  const postsHref = depth === 0 ? "posts/" : depth === 1 ? "./" : "../posts/";

  const pill = (href: string, label: string, isActive: boolean) =>
    labNavPill(href, label, isActive, escapeHtml, ' data-lab-section="nav"');

  return [
    pill(labHomeHref, "Lab home", active === "home"),
    pill(methodologyHref, "Methodology", active === "methodology"),
    pill(`${prefix}tools.html`, "Evaluated", active === "tools"),
    pill(`${prefix}experiments.html`, "Experiments", active === "experiments"),
    pill(`${prefix}token-usage.html`, "Tokens", active === "tokens"),
    pill(postsHref, "Posts", active === "posts"),
  ].join("");
}

export function labNavHtml(
  active: LabNavActive,
  escapeHtml: (t: string) => string,
  depth: 0 | 1 | 2 = 0,
): string {
  return `<nav aria-label="Lab section" class="lab-nav lab-nav--section mb-8 hidden min-[640px]:flex flex-wrap gap-2">
      ${labNavPillsHtml(active, escapeHtml, depth)}
    </nav>`;
}

export function labMobileCombinedNavHtml(
  active: LabNavActive,
  editionNav: EditionNav,
  escapeHtml: (t: string) => string,
  depth: 0 | 1 | 2 = 0,
): string {
  const track = ' data-lab-section="nav"';
  return `<div class="lab-nav-scroll-wrap mt-4 min-[640px]:hidden">
    <nav aria-label="Lab and editions" class="lab-nav lab-nav--combined">
      ${labNavPillsHtml(active, escapeHtml, depth)}
      <span class="lab-nav__divider shrink-0" aria-hidden="true"></span>
      ${labNavPill(editionNav.ossHref, "AI Tastemakers", editionNav.active === "oss", escapeHtml, track)}
      ${labNavPill(editionNav.skillsHref, "Skill Tastemakers", editionNav.active === "skills", escapeHtml, track)}
    </nav>
  </div>`;
}

export function labNavScrollScript(): string {
  return `<script>(function(){try{var n=document.querySelector(".lab-nav--combined");if(!n)return;function sync(){var atEnd=n.scrollWidth-n.scrollLeft-n.clientWidth<4;n.setAttribute("data-scroll-end",atEnd?"true":"false");}sync();n.addEventListener("scroll",sync,{passive:true});window.addEventListener("resize",sync);var a=n.querySelector('[aria-current="page"]');if(a)a.scrollIntoView({inline:"center",block:"nearest"});sync();}catch(e){}})();</script>`;
}

export function labSitePaths(depth: 0 | 1 = 0): SitePaths {
  const up = depth === 0 ? ".." : "../..";
  const labRoot = depth === 0 ? "./" : "../";
  return {
    css: `${up}/assets/style.css`,
    home: `${up}/`,
    subscribe: `${up}/subscribe.html`,
    lab: labRoot,
    brief: (date) => `${up}/briefings/${date}.html`,
    editionNav: { ossHref: `${up}/`, skillsHref: `${up}/skills/` },
  };
}

interface ShadowRepoEntry {
  rank: number;
  full_name: string;
  html_url: string;
  brief_control?: string | null;
  brief_treatment?: string | null;
  usage_control?: { input_tokens: number; output_tokens: number };
  usage_treatment?: { input_tokens: number; output_tokens: number };
  enrichment_bundle_ref?: string;
  brief?: string | null;
  is_new?: boolean;
}

interface ShadowDigestPayload {
  run_id: string;
  date: string;
  edition: string;
  enrich_web_requested: boolean;
  narrate_ponytail_requested?: boolean;
  generated_at: string;
  ranking_mode: string;
  usage_summary?: {
    control?: { input_tokens: number; output_tokens: number; output_words: number };
    treatment?: { input_tokens: number; output_tokens: number; output_words: number };
  };
  repos: ShadowRepoEntry[];
}

function formatTokenUsage(usage?: { input_tokens: number; output_tokens: number }): string {
  if (!usage) return "";
  const total = usage.input_tokens + usage.output_tokens;
  return ` · ${total.toLocaleString()} tok (${usage.output_tokens.toLocaleString()} out)`;
}

function renderBriefMarkdown(brief: string | null | undefined): string {
  if (!brief?.trim()) {
    return '<p class="text-stone-500">-</p>';
  }
  return renderSafeMarkdown(brief);
}

function renderShadowRepoSection(
  repo: ShadowRepoEntry,
  escapeHtml: (t: string) => string,
  narratePonytailRequested?: boolean,
): string {
  const title = `<h3 class="mb-1 font-sans text-base font-semibold"><a href="${escapeHtml(repo.html_url)}" class="text-blue-800 no-underline hover:underline dark:text-blue-400">${escapeHtml(repo.full_name)}</a> <span class="font-normal text-stone-500">#${repo.rank}</span></h3>`;
  const prose =
    "prose prose-stone max-w-none dark:prose-invert prose-sm prose-a:text-blue-800 dark:prose-a:text-blue-400";

  const hasSideBySide =
    repo.brief_control != null ||
    repo.brief_treatment != null ||
    Boolean(repo.enrichment_bundle_ref);

  if (hasSideBySide) {
    const controlLabel = narratePonytailRequested
      ? "Control (default prompt)"
      : "Control (README only)";
    const treatmentLabel = narratePonytailRequested
      ? "Treatment (structured + ponytail)"
      : "Treatment (README + web/HN)";
    return `<section class="mb-10 border-b border-stone-200 pb-8 last:border-b-0 dark:border-stone-700">
      ${title}
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
          <h4 class="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-stone-500">${escapeHtml(controlLabel)}<span class="font-normal normal-case">${escapeHtml(formatTokenUsage(repo.usage_control))}</span></h4>
          <article class="brief-content ${prose}">${renderBriefMarkdown(repo.brief_control)}</article>
        </div>
        <div class="rounded-lg border border-blue-200 bg-blue-50/30 p-4 dark:border-blue-800 dark:bg-blue-950/20">
          <h4 class="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-300">${escapeHtml(treatmentLabel)}<span class="font-normal normal-case">${escapeHtml(formatTokenUsage(repo.usage_treatment))}</span></h4>
          <article class="brief-content ${prose}">${renderBriefMarkdown(repo.brief_treatment)}</article>
        </div>
      </div>
    </section>`;
  }

  return `<section class="mb-10 border-b border-stone-200 pb-8 last:border-b-0 dark:border-stone-700">
    ${title}
    <div class="mt-4 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
      <article class="brief-content ${prose}">${renderBriefMarkdown(repo.brief)}</article>
    </div>
  </section>`;
}

export function renderShadowCompareBody(
  shadow: ShadowDigestPayload,
  escapeHtml: (t: string) => string,
): string {
  const hasSideBySide = shadow.repos.some(
    (repo) =>
      repo.brief_control != null ||
      repo.brief_treatment != null ||
      Boolean(repo.enrichment_bundle_ref),
  );

  const notice =
    shadow.enrich_web_requested && !hasSideBySide
      ? `<p class="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">This run predates side-by-side shadow output: repos only have a single <code>brief</code> field. Re-run with <code>DIGEST_ENRICH_WEB=1</code> and <code>DIGEST_ENRICH_SHADOW=1</code>, then rebuild pages for control vs treatment columns.</p>`
      : "";

  const usageBanner =
    shadow.usage_summary?.control || shadow.usage_summary?.treatment
      ? `<p class="mb-6 rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm dark:border-stone-700 dark:bg-stone-900/60">
          <strong>Token usage:</strong>
          ${
            shadow.usage_summary.control
              ? ` control ${shadow.usage_summary.control.output_tokens.toLocaleString()} out / ${shadow.usage_summary.control.output_words.toLocaleString()} words`
              : ""
          }${
            shadow.usage_summary.treatment
              ? ` · treatment ${shadow.usage_summary.treatment.output_tokens.toLocaleString()} out / ${shadow.usage_summary.treatment.output_words.toLocaleString()} words`
              : ""
          }
          · <a href="../token-usage.html" class="text-blue-800 hover:underline dark:text-blue-400">Lab token dashboard</a>
        </p>`
      : "";

  const repos = shadow.repos
    .map((repo) => renderShadowRepoSection(repo, escapeHtml, shadow.narrate_ponytail_requested))
    .join("");

  return `${labNavHtml("experiments", escapeHtml, 2)}
    <p class="mb-2"><a href="../experiments.html" class="text-sm text-blue-800 hover:underline dark:text-blue-400">&larr; Experiments</a></p>
    <h2 class="font-mono text-lg font-bold">${escapeHtml(shadow.run_id)}</h2>
    <p class="text-sm text-stone-500 dark:text-stone-400">${escapeHtml(shadow.date)} · ${escapeHtml(shadow.edition)} · ${escapeHtml(shadow.ranking_mode)}</p>
    <p class="mt-2 text-sm"><a href="../shadow-rubric.html" class="text-blue-800 hover:underline dark:text-blue-400">Shadow rubric</a> · <a href="../token-usage.html" class="text-blue-800 hover:underline dark:text-blue-400">Token dashboard</a></p>
    ${usageBanner}
    ${notice}
    ${repos}`;
}

async function buildLabMarkdownPage(
  repoRoot: string,
  labSiteDir: string,
  markdownRelPath: string,
  htmlName: string,
  pageTitle: string,
  brand: { name: string; tagline: string },
  escapeHtml: (t: string) => string,
  labShell: { labLayout: true },
  navActive: "home" | "methodology" | "tools" | "experiments" | "tokens" | "posts" = "home",
  siteBaseUrl?: string,
  outboundRewrite?: OutboundRewriteContext,
): Promise<boolean> {
  const markdownPath = path.join(repoRoot, markdownRelPath);
  try {
    const markdown = await fs.readFile(markdownPath, "utf8");
    const markdownHasH1 = /^#\s+/m.test(markdown);
    let html = prepareLabProseHtmlFromMarkdown(markdown);
    if (htmlName === "methodology.html") {
      html = html.replace(
        /<p>LAB_LOOP_ABOUT_PLACEHOLDER<\/p>/,
        renderLabLoopAboutBlockHtml(escapeHtml),
      );
      html = `<h2 class="mb-6 font-sans text-lg font-bold tracking-tight">Methodology</h2>${html}`;
    }
    const body = `${labNavHtml(navActive, escapeHtml)}<article class="${LAB_PROSE_ARTICLE_CLASS}">${html}</article>${labPublishFooterHtml(escapeHtml)}`;
    const methodologyCopy = seoPage("lab_methodology");
    const seo =
      siteBaseUrl && htmlName === "methodology.html"
        ? {
            siteBaseUrl,
            canonicalPath: "lab/methodology.html",
            ogType: "website",
            ogImageUrl: defaultOgImageUrl(siteBaseUrl),
            jsonLd: websiteJsonLd(
              siteBaseUrl,
              methodologyCopy.h1 ?? "Methodology",
              methodologyCopy.description ?? pageTitle,
            ),
          }
        : undefined;
    const pageCopy =
      htmlName === "methodology.html" ? methodologyCopy : { title: pageTitle, description: pageTitle, h1: pageTitle };
    const genericDescription =
      htmlName === "methodology.html"
        ? methodologyCopy.description
        : metaDescriptionFromLead(pageTitle);
    const genericSeo =
      siteBaseUrl && htmlName !== "methodology.html"
        ? {
            siteBaseUrl,
            canonicalPath: `lab/${htmlName}`,
            ogType: "website",
            ogImageUrl: defaultOgImageUrl(siteBaseUrl),
          }
        : seo;
    await fs.writeFile(
      path.join(labSiteDir, htmlName),
      pageShell(
        (htmlName === "methodology.html" ? methodologyCopy.title : pageCopy.title) ?? pageTitle,
        body,
        labSitePaths(),
        brand,
        htmlName === "methodology.html" ? methodologyCopy.description : genericDescription,
        escapeHtml,
        {
          ...labShell,
          labNavActive: navActive,
          labFallbackSection: "about",
          seo: genericSeo,
          siteBaseUrl,
          documentH1:
            htmlName === "methodology.html"
              ? methodologyCopy.h1
              : markdownHasH1
                ? undefined
                : pageCopy.h1,
          documentH1Visible:
            htmlName === "methodology.html" || (!markdownHasH1 && htmlName !== "methodology.html"),
          outboundRewrite,
        },
      ),
    );
    return true;
  } catch {
    return false;
  }
}

async function writeLabAboutRedirectPage(
  labSiteDir: string,
  paths: SitePaths,
  brand: { name: string; tagline: string },
  escapeHtml: (t: string) => string,
  labShell: { labLayout: true },
  siteBaseUrl?: string,
  outboundRewrite?: OutboundRewriteContext,
): Promise<void> {
  const body = `${labNavHtml("methodology", escapeHtml)}<p class="font-sans text-sm text-stone-700 dark:text-stone-300">This page moved to <a href="methodology.html" class="text-blue-800 underline dark:text-blue-400" data-lab-section="about">Methodology</a>.</p>${labAboutRedirectScript()}${labPublishFooterHtml(escapeHtml)}`;
  await fs.writeFile(
    path.join(labSiteDir, "about.html"),
    pageShell("About · Tastemakers", body, paths, brand, undefined, escapeHtml, {
      ...labShell,
      labNavActive: "methodology",
      labFallbackSection: "about",
      metaRefresh: "methodology.html",
      siteBaseUrl: undefined,
      documentH1: "About",
      documentH1Visible: true,
      seo: siteBaseUrl
        ? {
            siteBaseUrl,
            canonicalPath: "lab/about.html",
            noindex: true,
          }
        : undefined,
      outboundRewrite,
    }),
  );
}

export function renderLabHomeIntroBlock(
  articleHtml: string,
  loopStripHtml: string,
  asOfIsoDate: string,
  escapeHtml: (t: string) => string,
): string {
  return `<div class="lab-intro mb-8 font-sans">
      <article class="${LAB_PROSE_ARTICLE_CLASS}">${articleHtml}</article>
      ${loopStripHtml}
      ${renderLabExperimentsHowLink(escapeHtml)}
      <p class="lab-last-updated">Last updated ${escapeHtml(formatLabLastUpdatedPt(asOfIsoDate))}</p>
    </div>`;
}

async function buildShadowPages(
  repoRoot: string,
  labSiteDir: string,
  brand: { name: string; tagline: string },
  escapeHtml: (t: string) => string,
  labShell: { labLayout: true },
  siteBaseUrl?: string,
  outboundRewrite: OutboundRewriteContext,
): Promise<number> {
  const runsDir = path.join(repoRoot, "data", "experiments", "runs");
  const shadowSiteDir = path.join(labSiteDir, "shadow");
  await fs.mkdir(shadowSiteDir, { recursive: true });

  let count = 0;
  let entries: string[] = [];
  try {
    entries = await fs.readdir(runsDir);
  } catch {
    return 0;
  }

  for (const runId of entries) {
    if (runId.startsWith(".") || runId === "README.md") continue;
    const shadowPath = path.join(runsDir, runId, "shadow.json");
    try {
      const raw = await fs.readFile(shadowPath, "utf8");
      const shadow = JSON.parse(raw) as ShadowDigestPayload;
      const body = rewriteOutboundLinksInHtml(renderShadowCompareBody(shadow, escapeHtml), {
        ...outboundRewrite,
        surface: "shadow",
      });
      await fs.writeFile(
        path.join(shadowSiteDir, `${runId}.html`),
        pageShell(
          `Shadow ${runId.slice(0, 8)} · Lab`,
          body,
          labSitePaths(1),
          brand,
          "Side-by-side control vs treatment blurbs from a digest pipeline shadow run.",
          escapeHtml,
          {
            ...labShell,
            labNavActive: "experiments",
            labNavDepth: 2,
            siteBaseUrl,
            documentH1: `Shadow run ${runId.slice(0, 8)}`,
            documentH1Visible: true,
            outboundRewrite: { ...outboundRewrite, surface: "shadow" },
            seo: siteBaseUrl
              ? {
                  siteBaseUrl,
                  canonicalPath: `lab/shadow/${runId}.html`,
                  noindex: true,
                  ogType: "website",
                  ogImageUrl: defaultOgImageUrl(siteBaseUrl),
                }
              : undefined,
          },
        ),
      );
      count++;
    } catch {
      // skip missing or invalid shadow runs
    }
  }

  return count;
}

export function labHomeFooterHref(paths: SitePaths): string {
  const base = paths.lab.endsWith("/") ? paths.lab : `${paths.lab}/`;
  return `${base}index.html`;
}

export function labMethodologyFooterHref(paths: SitePaths): string {
  const base = paths.lab.endsWith("/") ? paths.lab : `${paths.lab}/`;
  return `${base}methodology.html`;
}

export function renderLabExperimentsHowLink(escapeHtml: (t: string) => string): string {
  return `<p class="lab-experiments-how mt-2 text-sm text-stone-600 dark:text-stone-400"><a href="methodology.html" class="underline decoration-stone-400 hover:text-blue-800 dark:text-stone-400 dark:decoration-stone-500 dark:hover:text-blue-400" data-lab-section="about">${escapeHtml("How experiments work")}</a></p>`;
}

/** @deprecated Use labHomeFooterHref */
export function labAboutFooterHref(paths: SitePaths): string {
  return labHomeFooterHref(paths);
}

export function footerLinkRowHtml(
  paths: SitePaths,
  escapeHtml: (t: string) => string,
  options?: { homeIndex?: boolean },
): string {
  const link = (href: string, label: string) =>
    `<a href="${href}" class="site-footer__link" data-lab-section="footer">${escapeHtml(label)}</a>`;

  const items = options?.homeIndex
    ? [
        link(paths.subscribe, "Subscribe"),
        link(paths.editionNav.ossHref, "AI Tastemakers"),
        link(paths.editionNav.skillsHref, "Skill Tastemakers"),
        link(labHomeFooterHref(paths), LAB_FOOTER_ABOUT_LABEL),
        link(labMethodologyFooterHref(paths), "Methodology"),
        link("https://github.com/Leftyshields/ai-tastemakers", "Source on GitHub"),
      ]
    : [
        link(paths.subscribe, "Subscribe"),
        paths.crossEdition
          ? link(paths.crossEdition.href, paths.crossEdition.label)
          : "",
        link(labHomeFooterHref(paths), LAB_FOOTER_ABOUT_LABEL),
        link(labMethodologyFooterHref(paths), "Methodology"),
        link("https://github.com/Leftyshields/ai-tastemakers", "Source on GitHub"),
      ].filter(Boolean);

  return items.join('<span class="site-footer__sep" aria-hidden="true">&middot;</span>');
}

/** Sync in head before CSS so Tailwind dark: tokens apply on first paint (UX22). */
export const colorSchemeHeadScript = `<script>(function(){try{var m=window.matchMedia("(prefers-color-scheme: dark)");if(m.matches)document.documentElement.classList.add("dark");}catch(e){}})();</script>`;

export function pageShell(
  title: string,
  body: string,
  paths: SitePaths,
  brand: { name: string; tagline: string },
  description?: string,
  escapeHtml: (t: string) => string = escapeHtml,
  options?: {
    labLayout?: boolean;
    labNavActive?: LabNavActive;
    labNavDepth?: 0 | 1 | 2;
    wideIndex?: boolean;
    homeIndexEdition?: EditionId;
    seo?: PageSeoOptions;
    siteBaseUrl?: string;
    documentH1?: string;
    documentH1Visible?: boolean;
    labFallbackSection?: LabLinkSection;
    labPostShell?: boolean;
    metaRefresh?: string;
    outboundRewrite?: OutboundRewriteContext;
  },
): string {
  const safeTitle = escapeHtml(title);
  const headMeta = buildSeoHeadHtml(title, description, escapeHtml, options?.seo);
  const siteBase = options?.siteBaseUrl ?? options?.seo?.siteBaseUrl;
  const feedAlternates = siteBase ? feedAlternateLinksHtml(siteBase, escapeHtml) : "";
  const gscMeta = googleSiteVerificationMetaHtml(escapeHtml);
  const refreshMeta = options?.metaRefresh
    ? `<meta http-equiv="refresh" content="0;url=${escapeHtml(options.metaRefresh)}">`
    : "";
  const labLayout = options?.labLayout === true;
  const homeIndexEdition = options?.homeIndexEdition;
  const nav = editionNavHtml(paths.editionNav, escapeHtml, labLayout, {
    desktopOnlyOnLab: labLayout,
    homeIndexNav: Boolean(homeIndexEdition),
  });
  const mobileLabNav =
    labLayout && options?.labNavActive
      ? labMobileCombinedNavHtml(
          options.labNavActive,
          paths.editionNav,
          escapeHtml,
          options.labNavDepth ?? 0,
        )
      : "";
  const maxWidth = options?.wideIndex === true ? "max-w-6xl" : "max-w-2xl";
  const labPostShell = options?.labPostShell === true;
  const homeShell = homeIndexEdition ? " home-index-shell" : "";
  const shellClass = labLayout
    ? `mx-auto max-w-2xl border-stone-200 px-5 py-8 text-stone-900 dark:border-stone-700 dark:text-stone-200 md:max-w-[64rem] md:border-x md:px-8 md:py-12${labPostShell ? " lab-post-shell bg-stone-100 dark:bg-[#0c0a09]" : " bg-[#fffcf8] dark:bg-stone-900"}`
    : `mx-auto min-h-screen ${maxWidth} border-stone-200 bg-[#fffcf8] px-5 py-8 text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 md:border-x md:px-8 md:py-12${homeShell}`;
  const brandTagline = homeIndexEdition
    ? HOME_EDITION_TAGLINES[homeIndexEdition]
    : brand.tagline;
  const homeTitleLink = homeIndexEdition
    ? ` data-index-cta="home"`
    : labLayout
      ? ' data-lab-section="nav"'
      : "";
  const labFallback = options?.labFallbackSection ?? "about";
  let processedBody = body;
  if (options?.outboundRewrite) {
    processedBody = rewriteOutboundLinksInHtml(processedBody, options.outboundRewrite);
  }
  const labBody = labLayout ? ensureLabLinkSections(processedBody, labFallback) : processedBody;
  const h1Class = options?.documentH1Visible ? "font-sans text-2xl font-bold tracking-tight mb-6" : "sr-only";
  const documentH1 = options?.documentH1
    ? `<h1 class="${h1Class}">${escapeHtml(options.documentH1)}</h1>`
    : "";
  const mainHtml = labLayout
    ? `<main class="lab-main">${documentH1}${labBody}</main>`
    : `${documentH1}${labBody}`;
  const footerMt = labLayout ? "mt-10" : "mt-16";
  let footerLinks = footerLinkRowHtml(paths, escapeHtml, {
    homeIndex: Boolean(homeIndexEdition),
  });
  if (options?.outboundRewrite) {
    footerLinks = rewriteOutboundLinksInHtml(footerLinks, {
      ...options.outboundRewrite,
      surface: "site_footer",
    });
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  ${colorSchemeHeadScript}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle}</title>
  ${refreshMeta}
  ${gscMeta}
  ${feedAlternates}
  ${headMeta}
  <link rel="stylesheet" href="${paths.css}">
  ${posthogScriptHtml()}
</head>
<body class="min-h-screen bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-200 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,64,175,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]">
  <div class="${shellClass}">
    <header class="mb-8 border-b border-stone-200 pb-6 dark:border-stone-700">
      <div class="site-brand m-0 font-sans text-2xl font-bold tracking-tight">
        <a href="${paths.home}" class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400"${homeTitleLink}${!homeIndexEdition && labLayout ? ' data-lab-section="nav"' : ""}>${escapeHtml(brand.name)}</a>
      </div>
      <p class="mt-1 font-sans text-sm text-stone-500 dark:text-stone-400">${escapeHtml(brandTagline)}</p>
      ${nav}
      ${mobileLabNav}
    </header>
    ${mainHtml}
    <footer class="site-footer ${footerMt}">
      <nav aria-label="Site footer" class="site-footer__links">${footerLinks}</nav>
      <p class="site-footer__meta">${homeIndexEdition ? "Updated every morning" : "Updated daily &middot; Automated pipeline"}</p>
    </footer>
  </div>
  ${labLayout ? `${labLinkClickScript()}${labNavScrollScript()}` : ""}
</body>
</html>`;
}

export async function listWeeklyReviewWeeks(repoRoot: string): Promise<string[]> {
  const weeklyDir = path.join(repoRoot, "briefings", "weekly");
  let entries: string[];
  try {
    entries = await fs.readdir(weeklyDir);
  } catch {
    return [];
  }
  return entries
    .filter((e) => /^\d{4}-W\d{2}$/.test(e))
    .sort((a, b) => b.localeCompare(a));
}

export async function listMonthlyReviewMonths(repoRoot: string): Promise<string[]> {
  const monthlyDir = path.join(repoRoot, "briefings", "monthly");
  let entries: string[];
  try {
    entries = await fs.readdir(monthlyDir);
  } catch {
    return [];
  }
  return entries
    .filter((e) => /^\d{4}-\d{2}$/.test(e))
    .sort((a, b) => b.localeCompare(a));
}

async function readGeneratedAt(jsonPath: string): Promise<string | undefined> {
  try {
    const raw = await fs.readFile(jsonPath, "utf8");
    const parsed = JSON.parse(raw) as { generated_at?: string };
    return parsed.generated_at;
  } catch {
    return undefined;
  }
}

export interface WrapUpArchive {
  weeks: string[];
  months: string[];
  weeklyLatest?: string;
  monthlyLatest?: string;
  weeklyGeneratedAt?: string;
  monthlyGeneratedAt?: string;
  weekLabels: Map<string, string>;
  weekHref: (weekId: string) => string;
  monthHref: (monthId: string) => string;
}

export async function buildWrapUpArchive(
  repoRoot: string,
  siteSegment?: string,
): Promise<WrapUpArchive | undefined> {
  const weeks = await listWeeklyReviewWeeks(repoRoot);
  const months = await listMonthlyReviewMonths(repoRoot);
  if (weeks.length === 0 && months.length === 0) return undefined;

  const weeklyLatest = weeks[0];
  const monthlyLatest = months[0];
  const weeklyGeneratedAt = weeklyLatest
    ? await readGeneratedAt(
        path.join(repoRoot, "briefings", "weekly", weeklyLatest, "weekly_review.json"),
      )
    : undefined;
  const monthlyGeneratedAt = monthlyLatest
    ? await readGeneratedAt(
        path.join(repoRoot, "briefings", "monthly", monthlyLatest, "monthly_review.json"),
      )
    : undefined;

  const weekHref = (weekId: string) =>
    siteSegment ? `../weekly/${weekId}.html` : `weekly/${weekId}.html`;
  const monthHref = (monthId: string) =>
    siteSegment ? `../monthly/${monthId}.html` : `monthly/${monthId}.html`;
  const weekLabels = weeks.length > 0 ? await loadWeekRangeLabels(repoRoot, weeks) : new Map();

  return {
    weeks,
    months,
    weeklyLatest,
    monthlyLatest,
    weeklyGeneratedAt,
    monthlyGeneratedAt,
    weekLabels,
    weekHref,
    monthHref,
  };
}

function archiveIndexMainWrap(inner: string): string {
  return `<div class="home-index-main">${inner}</div>`;
}

function homeWrapUpFromArchive(wrap?: WrapUpArchive): HomeWrapUpArchive | undefined {
  if (!wrap) return undefined;
  return {
    weeklyLatest: wrap.weeklyLatest,
    weekHref: wrap.weekHref,
    weekRangeLabel: wrap.weeklyLatest ? wrap.weekLabels.get(wrap.weeklyLatest) : undefined,
  };
}

function formatMonthLabel(monthId: string): string {
  const [y, m] = monthId.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

function wrapUpCtaHtml(wrap?: WrapUpArchive): string {
  if (!wrap) return "";

  const weeklyTime = wrap.weeklyGeneratedAt ?? "";
  const monthlyTime = wrap.monthlyGeneratedAt ?? "";
  const pill =
    "inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-800";

  if (
    wrap.monthlyLatest &&
    monthlyTime &&
    (monthlyTime >= weeklyTime || !wrap.weeklyLatest)
  ) {
    return `<a class="${pill}" href="${wrap.monthHref(wrap.monthlyLatest)}">This month&rsquo;s rollup</a>`;
  }
  if (wrap.weeklyLatest) {
    return `<a class="${pill}" href="${wrap.weekHref(wrap.weeklyLatest)}">This week&rsquo;s wrap-up</a>`;
  }
  return "";
}

function monthlyArchiveSection(
  months: string[],
  monthHref: (monthId: string) => string,
  options?: { archiveIndex?: boolean },
): string {
  if (months.length === 0) return "";
  const items = months
    .map(
      (m) =>
        `<li class="border-b border-stone-200 py-3.5 dark:border-stone-800">
          <a class="font-sans font-medium text-stone-900 no-underline hover:text-blue-800 dark:text-stone-100 dark:hover:text-blue-400" href="${monthHref(m)}">
            ${formatMonthLabel(m)}
          </a>
        </li>`,
    )
    .join("\n");
  const h2Class = options?.archiveIndex
    ? ARCHIVE_SECTION_HEADING_CLASS
    : "mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400";
  const sectionClass = options?.archiveIndex
    ? "sec scroll-mt-8"
    : "mb-12 scroll-mt-8 border-t border-stone-200 pt-10 dark:border-stone-800";
  return `
    <section id="monthly-archive" class="${sectionClass}">
      <h2 class="${h2Class} mb-4">${MONTHLY_INDEX_SECTION_HEADING}</h2>
      <p class="mb-4 text-sm text-stone-600 dark:text-stone-400">${MONTHLY_INDEX_INTRO}</p>
      <ul class="m-0 list-none p-0">${items}</ul>
    </section>`;
}

export async function listBriefingDates(briefingsDir: string): Promise<string[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(briefingsDir);
  } catch {
    return [];
  }
  return entries
    .filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e))
    .sort((a, b) => b.localeCompare(a));
}

function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function weeklyArchiveSection(
  weeks: string[],
  weekHref: (weekId: string) => string,
  weekLabels: Map<string, string>,
  options?: { archiveIndex?: boolean },
): string {
  if (weeks.length === 0) return "";
  const items = weeks
    .map((w) => {
      const label = weekLabels.get(w);
      if (!label) {
        throw new Error(`missing week range label for ${w}`);
      }
      return `<li class="border-b border-stone-200 py-3.5 dark:border-stone-800">
          <a class="font-sans font-medium text-stone-900 no-underline hover:text-blue-800 dark:text-stone-100 dark:hover:text-blue-400" href="${weekHref(w)}">
            ${label}
          </a>
        </li>`;
    })
    .join("\n");
  const h2Class = options?.archiveIndex
    ? ARCHIVE_SECTION_HEADING_CLASS
    : "mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400";
  const sectionClass = options?.archiveIndex
    ? "sec scroll-mt-8"
    : "mb-12 scroll-mt-8 border-t border-stone-200 pt-10 dark:border-stone-800";
  return `
    <section id="weekly-archive" class="${sectionClass}">
      <h2 class="${h2Class} mb-4">${WEEKLY_INDEX_SECTION_HEADING}</h2>
      <p class="mb-4 text-sm text-stone-600 dark:text-stone-400">${WEEKLY_INDEX_INTRO}</p>
      <ul class="m-0 list-none p-0">${items}</ul>
    </section>`;
}

function ossIndexBody(
  paths: SitePaths,
  dates: string[],
  latest?: string,
  wrapUp?: WrapUpArchive,
): string {
  const weeklyCta = wrapUpCtaHtml(wrapUp);

  const heroActions = latest
    ? `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full bg-blue-800 px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500" href="${paths.brief(latest)}">Read today&rsquo;s brief</a>
        ${weeklyCta}
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-800" href="${paths.subscribe}">Get daily email</a>
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-800" href="${paths.editionNav.skillsHref}">Skill Tastemakers &rarr;</a>
        <a class="font-sans text-sm font-medium text-stone-500 no-underline hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200" href="#archive">Browse archive &rarr;</a>
      </div>`
    : `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100" href="${paths.subscribe}">Get daily email</a>
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100" href="${paths.editionNav.skillsHref}">Skill Tastemakers &rarr;</a>
      </div>`;

  const items = dates
    .map(
      (d) =>
        `<li class="border-b border-stone-200 py-3.5 dark:border-stone-800">
          <a class="font-sans font-medium text-stone-900 no-underline hover:text-blue-800 dark:text-stone-100 dark:hover:text-blue-400" href="${paths.brief(d)}">
            <time datetime="${d}">${formatDisplayDate(d)}</time>
          </a>
        </li>`,
    )
    .join("\n");

  return `
    <section class="mb-12 border-b border-stone-200 pb-10 dark:border-stone-800">
      <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Daily digest &middot; GitHub momentum</p>
      <p class="mb-3 text-xl leading-snug md:text-[1.65rem] md:leading-snug">Every morning, AI Tastemakers surfaces the 10 open-source AI repos gaining the most momentum&mdash;moving past static star leaderboards to track real velocity.</p>
      <p class="mb-6 text-base leading-relaxed text-stone-600 dark:text-stone-400">Tools, agents, and frameworks built on top of foundation models &ndash; not foundation model news.</p>
      ${heroActions}
    </section>

    <section class="mb-12 text-base leading-relaxed text-stone-600 dark:text-stone-400">
      <p class="mb-3">
        We scan GitHub for agents, MCP servers, LLM tooling, and everything builders ship on top of foundation models.
        The pipeline filters for recently active repos, excludes well-known giants, and ranks by
        <strong class="font-semibold text-stone-800 dark:text-stone-200">stars gained in the last seven days</strong>.
      </p>
      <p class="mb-0">
        Each pick gets a short narrative brief&mdash;what it does, why it matters this week, and what a builder could do with it.
        Written by Claude from README context and live GitHub metadata.
      </p>
    </section>

    <section class="mb-12 border-t border-stone-200 pt-10 dark:border-stone-800">
      <h2 class="mb-5 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">How it works</h2>
      <ol class="space-y-3 pl-5 font-sans text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        ${ossDiscoverStepHtml()}
        <li><strong class="text-stone-900 dark:text-stone-100">Rank</strong> &mdash; Score by 7-day star delta; bootstrap mode until a week of snapshots accumulates.</li>
        <li><strong class="text-stone-900 dark:text-stone-100">Narrate</strong> &mdash; Enrich the top 10 and generate concise briefs with Claude.</li>
        <li><strong class="text-stone-900 dark:text-stone-100">Publish</strong> &mdash; A daily GitHub Action commits the briefing and updates this site.</li>
      </ol>
    </section>

    <section id="archive" class="mb-4 scroll-mt-8">
      <h2 class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Daily archive</h2>
      <ul class="m-0 list-none p-0">${items || "<li class=\"py-3 font-sans text-sm text-stone-500\">No briefings yet.</li>"}</ul>
    </section>
    ${wrapUp ? weeklyArchiveSection(wrapUp.weeks, wrapUp.weekHref, wrapUp.weekLabels) : ""}
    ${wrapUp ? monthlyArchiveSection(wrapUp.months, wrapUp.monthHref) : ""}
    ${siblingEditionPromo(paths, "skills")}`;
}

function siblingEditionPromo(paths: SitePaths, sibling: "oss" | "skills"): string {
  if (sibling === "skills") {
    return `
    <section class="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-700 dark:bg-stone-950/40">
      <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Also from Tastemakers</p>
      <h2 class="mb-2 font-sans text-lg font-semibold"><a class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400" href="${paths.editionNav.skillsHref}">Skill Tastemakers</a></h2>
      <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Daily top ten AI agent skills: Claude Code plugins, research skills, and installable capabilities ranked by GitHub momentum.</p>
      <a class="font-sans text-sm font-medium text-blue-800 no-underline hover:underline dark:text-blue-400" href="${paths.editionNav.skillsHref}">Browse skills digest &rarr;</a>
    </section>`;
  }

  return `
    <section class="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-700 dark:bg-stone-950/40">
      <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Also from Tastemakers</p>
      <h2 class="mb-2 font-sans text-lg font-semibold"><a class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400" href="${paths.editionNav.ossHref}">AI Tastemakers</a></h2>
      <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Daily top ten AI-derivative open source repos: agents, MCP servers, LLM tooling, ranked by 7-day star growth.</p>
      <a class="font-sans text-sm font-medium text-blue-800 no-underline hover:underline dark:text-blue-400" href="${paths.editionNav.ossHref}">Browse OSS digest &rarr;</a>
    </section>`;
}

function skillsIndexBody(
  paths: SitePaths,
  dates: string[],
  edition: EditionDefinition,
  latest?: string,
  wrapUp?: WrapUpArchive,
): string {
  const inspiration = edition.inspiration
    ? `<p class="mb-0 text-sm text-stone-500 dark:text-stone-400">Inspired by the agent-skill wave led by repos like <a class="text-blue-800 hover:underline dark:text-blue-400" href="${edition.inspiration.url}">${edition.inspiration.label}</a>, installable skills for Claude Code, Cursor, Codex, and 50+ Agent Skills hosts.</p>`
    : "";

  const weeklyCta = wrapUpCtaHtml(wrapUp);

  const heroActions = latest
    ? `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full bg-blue-800 px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:bg-blue-600" href="${paths.brief(latest)}">Read today&rsquo;s brief</a>
        ${weeklyCta}
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100" href="${paths.editionNav.ossHref}">AI Tastemakers &rarr;</a>
        <a class="font-sans text-sm font-medium text-stone-500 no-underline hover:text-stone-800 dark:text-stone-400" href="#archive">Archive &rarr;</a>
      </div>`
    : `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100" href="${paths.editionNav.ossHref}">AI Tastemakers &rarr;</a>
      </div>`;

  const items = dates
    .map(
      (d) =>
        `<li class="border-b border-stone-200 py-3.5 dark:border-stone-800">
          <a class="font-sans font-medium no-underline hover:text-blue-800 dark:hover:text-blue-400" href="${paths.brief(d)}">
            <time datetime="${d}">${formatDisplayDate(d)}</time>
          </a>
        </li>`,
    )
    .join("\n");

  return `
    <section class="mb-12 border-b border-stone-200 pb-10 dark:border-stone-800">
      <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Agent skills · GitHub momentum</p>
      <p class="mb-4 text-xl leading-snug md:text-[1.65rem]">Reusable agent instruction artifacts &mdash; prompt skills, Claude Code extensions, and capabilities you drop into your AI agents to unlock new powers. Overlaps with AI Tastemakers are intentional; the lens is different.</p>
      ${inspiration}
      <div class="mt-6">${heroActions}</div>
    </section>
    <section class="mb-12 text-base leading-relaxed text-stone-600 dark:text-stone-400">
      <p class="mb-3">We scan GitHub for <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">ai-skill</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">claude-code</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">ai-prompts</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">cursor</code>, and related topics, then rank by 7-day star momentum with Claude briefs.</p>
    </section>
    <section id="archive" class="mb-4 scroll-mt-8">
      <h2 class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Daily archive</h2>
      <ul class="m-0 list-none p-0">${items || "<li class=\"py-3 text-sm text-stone-500\">No briefings yet. Run <code>npm run digest:skills</code> locally or wait for the daily workflow.</li>"}</ul>
    </section>
    ${wrapUp ? weeklyArchiveSection(wrapUp.weeks, wrapUp.weekHref, wrapUp.weekLabels) : ""}
    ${wrapUp ? monthlyArchiveSection(wrapUp.months, wrapUp.monthHref) : ""}
    ${siblingEditionPromo(paths, "oss")}`;
}

const PRIMARY_CTA_CLASS =
  "inline-block rounded-full bg-blue-800 px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500";

const SECONDARY_OUTLINE_CLASS =
  "inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-800";

const SECONDARY_TEXT_LINK_CLASS =
  "font-sans text-sm font-medium text-stone-600 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400";

function primaryCtaButton(href: string, label: string): string {
  return `<a class="${PRIMARY_CTA_CLASS}" href="${href}" data-index-cta="today_brief">${label}</a>`;
}

function secondaryOutlineButton(href: string, label: string, cta: string): string {
  return `<a class="${SECONDARY_OUTLINE_CLASS}" href="${href}" data-index-cta="${cta}">${label}</a>`;
}

function secondaryTextLink(href: string, label: string, cta: string): string {
  return `<a class="${SECONDARY_TEXT_LINK_CLASS}" href="${href}" data-index-cta="${cta}">${label}</a>`;
}

const CONTENT_CARD_CLASS =
  "scroll-mt-8 rounded-xl border border-stone-200 bg-stone-50/80 dark:border-stone-700 dark:bg-stone-950/50";

function contentCard(
  sectionId: string | undefined,
  title: string,
  bodyHtml: string,
  paddingClass: string,
  escapeHtml: (t: string) => string,
  options?: { archiveHeading?: boolean },
): string {
  const idAttr = sectionId ? ` id="${sectionId}"` : "";
  const h2Class = options?.archiveHeading
    ? `${ARCHIVE_SECTION_HEADING_CLASS} mb-4`
    : "mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400";
  return `
    <section${idAttr} class="content-card ${CONTENT_CARD_CLASS} ${paddingClass}">
      <h2 class="${h2Class}">${escapeHtml(title)}</h2>
      ${bodyHtml}
    </section>`;
}

function sidebarCard(
  sectionId: string | undefined,
  title: string,
  bodyHtml: string,
  escapeHtml: (t: string) => string,
): string {
  return contentCard(sectionId, title, bodyHtml, "p-5", escapeHtml);
}

function mainBlockCard(
  sectionId: string | undefined,
  title: string,
  bodyHtml: string,
  escapeHtml: (t: string) => string,
  options?: { archiveHeading?: boolean },
): string {
  return contentCard(sectionId, title, bodyHtml, "p-6", escapeHtml, options);
}

function wrapUpSecondaryCtaHtml(wrap?: WrapUpArchive): string {
  if (!wrap) return "";

  const weeklyTime = wrap.weeklyGeneratedAt ?? "";
  const monthlyTime = wrap.monthlyGeneratedAt ?? "";

  if (
    wrap.monthlyLatest &&
    monthlyTime &&
    (monthlyTime >= weeklyTime || !wrap.weeklyLatest)
  ) {
    return secondaryOutlineButton(
      wrap.monthHref(wrap.monthlyLatest),
      "This month&rsquo;s rollup",
      "rollup",
    );
  }
  if (wrap.weeklyLatest) {
    return secondaryOutlineButton(
      wrap.weekHref(wrap.weeklyLatest),
      "This week&rsquo;s wrap-up",
      "rollup",
    );
  }
  return "";
}

const TOPIC_CHIP_CLASS = "rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800";

function topicChipHtml(topic: string): string {
  return `<code class="${TOPIC_CHIP_CLASS}">${topic}</code>`;
}

function ossDiscoverStepHtml(): string {
  const chips = OSS_DISCOVER_TOPIC_CHIPS.map(topicChipHtml).join(", ");
  return `<li><strong class="text-stone-900 dark:text-stone-100">Discover</strong> &mdash; Search GitHub across AI topics (${chips}, and more).</li>`;
}

function howItWorksMainBlockHtml(): string {
  const body = `
      <ol class="m-0 space-y-3 pl-5 font-sans text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        ${ossDiscoverStepHtml()}
        <li><strong class="text-stone-900 dark:text-stone-100">Rank</strong> &mdash; Score by 7-day star delta; bootstrap mode until a week of snapshots accumulates.</li>
        <li><strong class="text-stone-900 dark:text-stone-100">Narrate</strong> &mdash; Enrich the top 10 and generate concise briefs with Claude.</li>
        <li><strong class="text-stone-900 dark:text-stone-100">Publish</strong> &mdash; A daily GitHub Action commits the briefing and updates this site.</li>
      </ol>`;
  return mainBlockCard(undefined, "How it works", body, escapeHtml);
}

function skillsAboutMainBlockHtml(): string {
  const body = `
      <p class="m-0 text-sm leading-relaxed text-stone-600 dark:text-stone-400">We scan GitHub for <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">ai-skill</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">claude-code</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">ai-prompts</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">cursor</code>, and related topics &mdash; then rank by 7-day star momentum with Claude briefs.</p>`;
  return mainBlockCard(undefined, "About this digest", body, escapeHtml);
}

function weeklyListItems(
  weeks: string[],
  weekHref: (weekId: string) => string,
  weekLabels: Map<string, string>,
): string {
  return weeks
    .map((w) => {
      const label = weekLabels.get(w);
      if (!label) {
        throw new Error(`missing week range label for ${w}`);
      }
      return `<li class="border-b border-stone-200 py-2.5 last:border-0 dark:border-stone-800">
          <a class="font-sans text-sm font-medium text-stone-900 no-underline hover:text-blue-800 dark:text-stone-100 dark:hover:text-blue-400" href="${weekHref(w)}" data-index-cta="weekly">
            ${label}
          </a>
        </li>`;
    })
    .join("\n");
}

function monthlyListItems(months: string[], monthHref: (monthId: string) => string): string {
  return months
    .map(
      (m) =>
        `<li class="border-b border-stone-200 py-2.5 last:border-0 dark:border-stone-800">
          <a class="font-sans text-sm font-medium text-stone-900 no-underline hover:text-blue-800 dark:text-stone-100 dark:hover:text-blue-400" href="${monthHref(m)}" data-index-cta="monthly">
            ${formatMonthLabel(m)}
          </a>
        </li>`,
    )
    .join("\n");
}

function weeklyMainBlock(wrap: WrapUpArchive): string {
  if (wrap.weeks.length === 0) return "";
  const body = `
      <p class="mb-3 text-sm text-stone-600 dark:text-stone-400">${WEEKLY_INDEX_INTRO}</p>
      <ul class="m-0 list-none p-0">${weeklyListItems(wrap.weeks, wrap.weekHref, wrap.weekLabels)}</ul>`;
  return mainBlockCard("weekly-archive", WEEKLY_INDEX_SECTION_HEADING, body, escapeHtml);
}

function monthlyMainBlock(wrap: WrapUpArchive): string {
  if (wrap.months.length === 0) return "";
  const body = `
      <p class="mb-3 text-sm text-stone-600 dark:text-stone-400">${MONTHLY_INDEX_INTRO}</p>
      <ul class="m-0 list-none p-0">${monthlyListItems(wrap.months, wrap.monthHref)}</ul>`;
  return mainBlockCard("monthly-archive", "Monthly rollups", body, escapeHtml);
}

function siblingEditionPromoSidebar(
  paths: SitePaths,
  sibling: "oss" | "skills",
  escapeHtml: (t: string) => string,
): string {
  if (sibling === "skills") {
    const body = `
      <h3 class="mb-2 font-sans text-base font-semibold"><a class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400" href="${paths.editionNav.skillsHref}" data-index-cta="cross_edition">Skill Tastemakers</a></h3>
      <p class="mb-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Daily top ten AI agent skills: Claude Code plugins, research skills, and installable capabilities ranked by GitHub momentum.</p>
      <a class="font-sans text-sm font-medium text-blue-800 no-underline hover:underline dark:text-blue-400" href="${paths.editionNav.skillsHref}" data-index-cta="cross_edition">Browse skills digest &rarr;</a>`;
    return sidebarCard(undefined, "Also from Tastemakers", body, escapeHtml);
  }

  const body = `
      <h3 class="mb-2 font-sans text-base font-semibold"><a class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400" href="${paths.editionNav.ossHref}" data-index-cta="cross_edition">AI Tastemakers</a></h3>
      <p class="mb-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Daily top ten AI-derivative open source repos: agents, MCP servers, LLM tooling, ranked by 7-day star growth.</p>
      <a class="font-sans text-sm font-medium text-blue-800 no-underline hover:underline dark:text-blue-400" href="${paths.editionNav.ossHref}" data-index-cta="cross_edition">Browse OSS digest &rarr;</a>`;
  return sidebarCard(undefined, "Also from Tastemakers", body, escapeHtml);
}

function indexLayoutGrid(mainHtml: string, sidebarHtml: string): string {
  return `
    <div class="lg:grid lg:grid-cols-[minmax(0,13fr)_minmax(0,7fr)] lg:items-start lg:gap-10">
      <div class="min-w-0">${mainHtml}</div>
      <aside class="mt-10 lg:mt-0" aria-label="Cross-edition discovery">${sidebarHtml}</aside>
    </div>`;
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function archiveMonthTileHtml(
  monthKey: string,
  label: string,
  monthDates: string[],
  paths: SitePaths,
  metaByDate: Map<string, { shortName: string; fullName: string }>,
  escapeHtml: (t: string) => string,
): string {
  const [year, month] = monthKey.split("-").map(Number);
  const briefingSet = new Set(monthDates);
  const cells = buildMonthCalendarCells(year, month, briefingSet);

  const cellHtml = cells.map((cell) => {
    if (cell.day === null) {
      return `<span class="archive-day archive-day--pad" aria-hidden="true"></span>`;
    }
    if (cell.isoDate) {
      const meta = metaByDate.get(cell.isoDate);
      const titleAttr = meta ? ` title="${escapeHtml(meta.fullName)}"` : "";
      const ariaLabel = escapeHtml(`Brief for ${formatDisplayDate(cell.isoDate)}`);
      return `<a class="archive-day archive-day--filled" href="${paths.brief(cell.isoDate)}" data-index-cta="archive_date" aria-label="${ariaLabel}"${titleAttr}><time datetime="${cell.isoDate}">${cell.day}</time></a>`;
    }
    return `<span class="archive-day archive-day--empty" aria-hidden="true">${cell.day}</span>`;
  });

  const weekdayHeader = WEEKDAY_LABELS.map(
    (d) =>
      `<span class="archive-day archive-day--label text-center font-sans text-[9px] font-medium uppercase text-stone-400 dark:text-stone-500">${d}</span>`,
  ).join("\n");

  return `
    <div class="rounded-lg border border-stone-200 bg-white/60 p-3 dark:border-stone-700 dark:bg-stone-900/40">
      <h3 class="mb-2 font-sans text-sm font-semibold text-stone-800 dark:text-stone-200">${escapeHtml(label)}<span class="ml-1.5 text-xs font-normal text-stone-500 dark:text-stone-400">(${monthDates.length})</span></h3>
      <div class="grid grid-cols-7 gap-0.5" aria-label="${escapeHtml(`${label} briefing calendar`)}">${weekdayHeader}
${cellHtml.join("\n")}</div>
    </div>`;
}

async function archiveMonthGridHtml(
  dates: string[],
  paths: SitePaths,
  briefingsDir: string,
  emptyMessage: string,
  escapeHtml: (t: string) => string,
  sectionTitle = "Daily archive",
): Promise<string> {
  if (dates.length === 0) {
    return mainBlockCard(
      "archive",
      sectionTitle,
      `<p class="m-0 font-sans text-sm text-stone-500 dark:text-stone-400">${escapeHtml(emptyMessage)}</p>`,
      escapeHtml,
      { archiveHeading: true },
    );
  }

  const metaByDate = await loadTopRepoMetaMap(briefingsDir, dates);
  const groups = groupDatesByMonth(dates);
  const tiles = groups.map((g) =>
    archiveMonthTileHtml(g.monthKey, g.label, g.dates, paths, metaByDate, escapeHtml),
  );

  const body = `<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">${tiles.join("\n")}</div>`;
  return mainBlockCard("archive", sectionTitle, body, escapeHtml, { archiveHeading: true });
}

function ossHeroActionsV2(paths: SitePaths, latest: string | undefined, wrapUp?: WrapUpArchive): string {
  if (!latest) {
    return `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        ${secondaryOutlineButton(paths.subscribe, "Get daily email", "subscribe")}
        ${secondaryTextLink(paths.editionNav.skillsHref, "Skill Tastemakers &rarr;", "cross_edition")}
      </div>`;
  }
  return `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        ${primaryCtaButton(paths.brief(latest), "Read today&rsquo;s brief")}
        ${wrapUpSecondaryCtaHtml(wrapUp)}
        ${secondaryOutlineButton(paths.subscribe, "Get daily email", "subscribe")}
        ${secondaryTextLink(paths.editionNav.skillsHref, "Skill Tastemakers &rarr;", "cross_edition")}
      </div>`;
}

function skillsHeroActionsV2(
  paths: SitePaths,
  latest: string | undefined,
  wrapUp?: WrapUpArchive,
): string {
  if (!latest) {
    return `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        ${secondaryTextLink(paths.editionNav.ossHref, "AI Tastemakers &rarr;", "cross_edition")}
      </div>`;
  }
  return `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        ${primaryCtaButton(paths.brief(latest), "Read today&rsquo;s brief")}
        ${wrapUpSecondaryCtaHtml(wrapUp)}
        ${secondaryTextLink(paths.editionNav.ossHref, "AI Tastemakers &rarr;", "cross_edition")}
      </div>`;
}

async function ossIndexBodyV2(
  paths: SitePaths,
  dates: string[],
  briefingsDir: string,
  escapeHtml: (t: string) => string,
  latest: string | undefined,
  wrapUp: WrapUpArchive | undefined,
  repoRoot: string,
  badgeLookup: ReadonlyMap<string, import("./lab/lab-tested-badge.js").LabBadgeInfo>,
): Promise<string> {
  void dates;
  const main = await buildHomeIndexMainHtml({
    edition: "oss",
    paths,
    latestDate: latest,
    briefingsDir,
    badgeLookup,
    wrapUp: homeWrapUpFromArchive(wrapUp),
    escapeHtml,
    repoRoot,
  });
  return `${main}${homepageIndexTrackingScript("oss")}`;
}

async function skillsIndexBodyV2(
  paths: SitePaths,
  dates: string[],
  briefingsDir: string,
  escapeHtml: (t: string) => string,
  latest: string | undefined,
  wrapUp: WrapUpArchive | undefined,
  repoRoot: string,
  badgeLookup: ReadonlyMap<string, import("./lab/lab-tested-badge.js").LabBadgeInfo>,
): Promise<string> {
  void dates;
  const main = await buildHomeIndexMainHtml({
    edition: "skills",
    paths,
    latestDate: latest,
    briefingsDir,
    badgeLookup,
    wrapUp: homeWrapUpFromArchive(wrapUp),
    escapeHtml,
    repoRoot,
  });
  return `${main}${homepageIndexTrackingScript("skills")}`;
}

function briefingsArchivePaths(siteSegment: string): SitePaths {
  if (siteSegment === "skills") {
    return {
      css: "../../assets/style.css",
      home: "../",
      subscribe: "../../subscribe.html",
      lab: "../../lab/",
      brief: (date) => `${date}.html`,
      editionNav: editionNavFor("skills", 1),
    };
  }
  return {
    css: "../assets/style.css",
    home: "../",
    subscribe: "../subscribe.html",
    lab: "../lab/",
    brief: (date) => `${date}.html`,
    editionNav: editionNavFor("", 1),
  };
}

function archiveIndexBackNav(homeHref: string, editionId: EditionId, escapeHtml: (t: string) => string): string {
  const label = archiveBackLinkLabel(editionId);
  return `<nav class="mb-6 font-sans text-sm">
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${homeHref}">&larr; ${escapeHtml(label)}</a>
      </nav>`;
}

async function buildBriefingsArchiveIndexPage(
  edition: EditionDefinition,
  siteRoot: string,
  briefingsDir: string,
  dates: string[],
  escapeHtml: (t: string) => string,
  siteBaseUrl?: string,
  outboundRewrite?: OutboundRewriteContext,
): Promise<void> {
  const paths = briefingsArchivePaths(edition.siteSegment);
  const brand = { name: edition.name, tagline: HOME_EDITION_TAGLINES[edition.id] };
  const archiveGrid = await archiveMonthGridHtml(
    dates,
    paths,
    briefingsDir,
    DAYS_ARCHIVE_EMPTY,
    escapeHtml,
    DAYS_ARCHIVE_SECTION_HEADING,
  );
  const earliestDate = dates.length > 0 ? dates[dates.length - 1] : undefined;
  const introText = daysArchiveIntroForEdition(edition.id, earliestDate);
  const intro = `<p class="mb-6 max-w-[40rem] text-base leading-relaxed text-stone-600 dark:text-stone-400">${escapeHtml(introText)}</p>`;
  const body = `${archiveIndexBackNav(paths.home, edition.id, escapeHtml)}
      ${archiveIndexMainWrap(`${intro}${archiveGrid}`)}`;
  await fs.writeFile(
    path.join(siteRoot, "briefings", "index.html"),
    pageShell(
      DAYS_ARCHIVE_PAGE_TITLE[edition.id],
      body,
      paths,
      brand,
      daysArchiveMetaForEdition(edition.id),
      escapeHtml,
      {
        wideIndex: true,
        homeIndexEdition: edition.id,
        siteBaseUrl,
        documentH1: DAYS_ARCHIVE_SECTION_HEADING,
        documentH1Visible: true,
        seo: siteBaseUrl
          ? {
              siteBaseUrl,
              canonicalPath: edition.siteSegment
                ? `${edition.siteSegment}/briefings/index.html`
                : "briefings/index.html",
              ogType: "website",
              ogImageUrl: defaultOgImageUrl(siteBaseUrl, edition.siteSegment),
            }
          : undefined,
        outboundRewrite,
      },
    ),
  );
}

function monthlyPagePaths(): SitePaths {
  return {
    css: "../assets/style.css",
    home: "../",
    subscribe: "../subscribe.html",
    lab: "../lab/",
    brief: () => "../",
    editionNav: { ossHref: "../", skillsHref: "../skills/", active: undefined },
  };
}

export async function buildMonthlySite(
  repoRoot: string,
  siteDir: string,
  escapeHtml: (t: string) => string,
  siteBaseUrl = "https://leftyshields.github.io/ai-tastemakers",
  destRegistry?: OutboundDestRegistry,
): Promise<number> {
  const githubAllowlist = await collectDigestRepoAllowlist(repoRoot);
  const outboundMonthly: OutboundRewriteContext = {
    siteBaseUrl,
    destRegistry,
    githubAllowlist,
    channel: "pages",
    surface: "monthly_page",
  };
  const months = await listMonthlyReviewMonths(repoRoot);
  const outDir = path.join(siteDir, "monthly");
  await fs.mkdir(outDir, { recursive: true });

  const brand = {
    name: "Tastemakers Monthly",
    tagline: "Monthly rollup of AI Tastemakers and Skill Tastemakers",
  };
  const paths = monthlyPagePaths();

  for (const monthId of months) {
    const mdPath = path.join(repoRoot, "briefings", "monthly", monthId, "monthly_review.md");
    let markdown: string;
    try {
      markdown = await fs.readFile(mdPath, "utf8");
    } catch {
      continue;
    }
    const html = rewriteOutboundLinksInHtml(renderSafeMarkdown(markdown), outboundMonthly);
    const body = `
      <nav class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm">
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; AI Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.editionNav.skillsHref}">Skill Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}monthly/index.html">All monthly rollups</a>
      </nav>
      <article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400">${html}</article>`;
    const monthlyCopy = seoPage("monthly_rollup");
    const monthlyDescription = monthlyCopy.descriptionTemplate
      ? buildSeoDescriptionFromTemplate(monthlyCopy.descriptionTemplate, { monthId })
      : monthlyCopy.description;
    await fs.writeFile(
      path.join(outDir, `${monthId}.html`),
      pageShell(
        applyTemplate(
          monthlyCopy.titleTemplate ?? `Monthly Rollup: {monthId} | Tastemakers`,
          { monthId },
        ),
        body,
        paths,
        brand,
        monthlyDescription,
        escapeHtml,
        {
          siteBaseUrl,
          seo: siteBaseUrl
            ? {
                siteBaseUrl,
                canonicalPath: `monthly/${monthId}.html`,
                ogType: "article",
                ogImageUrl: defaultOgImageUrl(siteBaseUrl),
              }
            : undefined,
          outboundRewrite: outboundMonthly,
        },
      ),
    );
  }

  if (months.length > 0) {
    const useV2 = landingLayoutV2Enabled();
    const indexBrand = useV2
      ? { name: "AI Tastemakers", tagline: HOME_EDITION_TAGLINES.oss }
      : brand;
    const indexBody = useV2
      ? `${archiveIndexBackNav(paths.home, "oss", escapeHtml)}
      ${archiveIndexMainWrap(monthlyArchiveSection(months, (m) => `${m}.html`, { archiveIndex: true }))}`
      : `
      <nav class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm">
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; AI Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.editionNav.skillsHref}">Skill Tastemakers</a>
      </nav>
      ${monthlyArchiveSection(months, (m) => `${m}.html`)}`;
    await fs.writeFile(
      path.join(outDir, "index.html"),
      pageShell(
        useV2 ? MONTHLY_INDEX_PAGE_TITLE : "Monthly rollups",
        indexBody,
        paths,
        indexBrand,
        useV2 ? MONTHLY_INDEX_META_DESCRIPTION : "Monthly editorial synthesis across weekly Tastemakers reviews.",
        escapeHtml,
        useV2
          ? {
              wideIndex: true,
              homeIndexEdition: "oss",
              siteBaseUrl,
              documentH1: MONTHLY_INDEX_PAGE_TITLE,
              documentH1Visible: true,
              seo: siteBaseUrl
                ? {
                    siteBaseUrl,
                    canonicalPath: "monthly/",
                    ogType: "website",
                    ogImageUrl: defaultOgImageUrl(siteBaseUrl),
                  }
                : undefined,
              outboundRewrite: { ...outboundMonthly, surface: "monthly_index" },
            }
          : {
              wideIndex: true,
              outboundRewrite: { ...outboundMonthly, surface: "monthly_index" },
            },
      ),
    );
  }

  return months.length;
}

function weeklyPagePaths(): SitePaths {
  return {
    css: "../assets/style.css",
    home: "../",
    subscribe: "../subscribe.html",
    lab: "../lab/",
    brief: () => "../",
    editionNav: { ossHref: "../", skillsHref: "../skills/", active: undefined },
  };
}

export async function buildWeeklySite(
  repoRoot: string,
  siteDir: string,
  escapeHtml: (t: string) => string,
  siteBaseUrl = "https://leftyshields.github.io/ai-tastemakers",
  destRegistry?: OutboundDestRegistry,
): Promise<number> {
  const githubAllowlist = await collectDigestRepoAllowlist(repoRoot);
  const outboundWeekly: OutboundRewriteContext = {
    siteBaseUrl,
    destRegistry,
    githubAllowlist,
    channel: "pages",
    surface: "weekly_page",
  };
  const weeks = await listWeeklyReviewWeeks(repoRoot);
  const outDir = path.join(siteDir, "weekly");
  await fs.mkdir(outDir, { recursive: true });

  const brand = {
    name: "Tastemakers Weekly",
    tagline: "Strategy, then the stack, then the numbers for one week of AI open source.",
  };
  const paths = weeklyPagePaths();

  for (const weekId of weeks) {
    const mdPath = path.join(repoRoot, "briefings", "weekly", weekId, "weekly_review.md");
    let markdown: string;
    try {
      markdown = await fs.readFile(mdPath, "utf8");
    } catch {
      continue;
    }
    const html = rewriteOutboundLinksInHtml(renderSafeMarkdown(markdown), outboundWeekly);
    const body = `
      <nav class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm">
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; AI Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.editionNav.skillsHref}">Skill Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}weekly/index.html">All weekly reviews</a>
      </nav>
      <article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400">${html}</article>`;
    const weeklyCopy = seoPage("weekly_review");
    const site = weeklyCopy.siteName ?? "AI Tastemakers";
    let rangeLabel = weekId;
    let startLabel = weekId;
    let endLabel = weekId;
    let year = weekId.slice(0, 4);
    try {
      const weekJsonRaw = await fs.readFile(
        path.join(repoRoot, "briefings", "weekly", weekId, "weekly_review.json"),
        "utf8",
      );
      const weekJson = JSON.parse(weekJsonRaw) as { week_start?: string; week_end?: string };
      if (weekJson.week_start && weekJson.week_end) {
        rangeLabel = formatWeekReviewDateRange(weekJson.week_start, weekJson.week_end);
        startLabel = formatSeoDateShort(weekJson.week_start);
        endLabel = formatSeoDateShort(weekJson.week_end);
        year = weekJson.week_end.slice(0, 4);
      }
    } catch {
      const range = parseWeeklyReviewDateRange(markdown);
      if (range) {
        rangeLabel = formatWeekReviewDateRange(range.start, range.end);
        startLabel = formatSeoDateShort(range.start);
        endLabel = formatSeoDateShort(range.end);
        year = String(range.year);
      }
    }
    const weeklyVars: Record<string, string> = {
      Site: site,
      weekId,
      startLabel,
      endLabel,
      year,
    };
    const weeklyTitle = weeklyCopy.titleTemplate
      ? buildSeoTitleFromTemplate(weeklyCopy.titleTemplate, weeklyVars, ["startLabel", "endLabel"])
      : `Weekly Review: ${rangeLabel}`;
    const weeklyDescription = weeklyCopy.descriptionTemplate
      ? buildSeoDescriptionFromTemplate(weeklyCopy.descriptionTemplate, weeklyVars, [
          "startLabel",
          "endLabel",
        ])
      : weeklyCopy.description;
    await fs.writeFile(
      path.join(outDir, `${weekId}.html`),
      pageShell(weeklyTitle, body, paths, brand, weeklyDescription, escapeHtml, {
        siteBaseUrl,
        seo: siteBaseUrl
          ? {
              siteBaseUrl,
              canonicalPath: `weekly/${weekId}.html`,
              ogType: "article",
              ogImageUrl: defaultOgImageUrl(siteBaseUrl),
            }
          : undefined,
        outboundRewrite: outboundWeekly,
      }),
    );
  }

  if (weeks.length > 0) {
    const useV2 = landingLayoutV2Enabled();
    const weekLabels = await loadWeekRangeLabels(repoRoot, weeks);
    const indexBrand = useV2
      ? { name: "AI Tastemakers", tagline: HOME_EDITION_TAGLINES.oss }
      : brand;
    const indexBody = useV2
      ? `${archiveIndexBackNav(paths.home, "oss", escapeHtml)}
      ${archiveIndexMainWrap(weeklyArchiveSection(weeks, (w) => `${w}.html`, weekLabels, { archiveIndex: true }))}`
      : `
      <nav class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm">
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; AI Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.editionNav.skillsHref}">Skill Tastemakers</a>
      </nav>
      ${weeklyArchiveSection(weeks, (w) => `${w}.html`, weekLabels)}`;
    await fs.writeFile(
      path.join(outDir, "index.html"),
      pageShell(
        useV2 ? WEEKLY_INDEX_PAGE_TITLE : "Weekly reviews",
        indexBody,
        paths,
        indexBrand,
        useV2 ? WEEKLY_INDEX_META_DESCRIPTION : "Sunday synthesis across AI Tastemakers and Skill Tastemakers.",
        escapeHtml,
        useV2
          ? {
              wideIndex: true,
              homeIndexEdition: "oss",
              siteBaseUrl,
              documentH1: WEEKLY_INDEX_PAGE_TITLE,
              documentH1Visible: true,
              seo: siteBaseUrl
                ? {
                    siteBaseUrl,
                    canonicalPath: "weekly/",
                    ogType: "website",
                    ogImageUrl: defaultOgImageUrl(siteBaseUrl),
                  }
                : undefined,
              outboundRewrite: { ...outboundWeekly, surface: "weekly_index" },
            }
          : {
              wideIndex: true,
              outboundRewrite: { ...outboundWeekly, surface: "weekly_index" },
            },
      ),
    );
  }

  return weeks.length;
}

export async function buildEditionSite(
  repoRoot: string,
  siteDir: string,
  edition: EditionDefinition,
  escapeHtml: (t: string) => string,
  siteBaseUrl?: string,
  destRegistry?: OutboundDestRegistry,
): Promise<number> {
  const briefingsDir = briefingsDirForEdition(repoRoot, edition);
  const badgeLookup = loadLabBadgeLookup(repoRoot);
  const writeupPostIds = loadLabWriteupPostIds(repoRoot);
  const labPrefix = edition.id === "skills" ? "../../lab/" : "../lab/";
  const badgeContext = { lookup: badgeLookup, labPrefix, writeupPostIds };
  const labExperiments = loadExperimentsFile(repoRoot).experiments;
  const dates = await listBriefingDates(briefingsDir);
  const siteRoot = edition.siteSegment
    ? path.join(siteDir, edition.siteSegment)
    : siteDir;
  const briefOutDir = path.join(siteRoot, "briefings");
  await fs.mkdir(briefOutDir, { recursive: true });

  const brand = { name: edition.name, tagline: edition.tagline };
  const githubAllowlist = await collectDigestRepoAllowlist(repoRoot);
  const pagesSiteBase =
    siteBaseUrl?.trim() || "https://leftyshields.github.io/ai-tastemakers";
  const outboundPagesBase: OutboundRewriteContext = {
    siteBaseUrl: pagesSiteBase,
    destRegistry,
    githubAllowlist,
    channel: "pages",
    surface: "daily_brief",
    section: edition.id,
  };

  for (const date of dates) {
    const mdPath = path.join(briefingsDir, date, "daily_brief.md");
    let markdown: string;
    try {
      markdown = await fs.readFile(mdPath, "utf8");
    } catch {
      continue;
    }
    markdown = normalizeLegacyNewMarkdown(markdown);
    const paths = editionSitePaths(edition.siteSegment, 1);
    let html = renderSafeMarkdown(markdown);
    try {
      const digestRaw = await fs.readFile(path.join(briefingsDir, date, "digest.json"), "utf8");
      const digest = JSON.parse(digestRaw) as Digest;
      const { headerMarkdown } = splitDailyBriefMarkdown(markdown);
      html = renderDigestBriefArticle(
        digest,
        date,
        edition.id,
        headerMarkdown,
        escapeHtml,
        badgeContext,
        labExperiments,
        { ...outboundPagesBase, digestDate: date },
      );
    } catch {
      /* fall back to markdown-only body */
    }
    const siblingHref =
      edition.id === "skills" ? paths.editionNav.ossHref : paths.editionNav.skillsHref;
    const siblingLabel = edition.id === "skills" ? "AI Tastemakers" : "Skill Tastemakers";
    const canonicalPath = edition.siteSegment
      ? `${edition.siteSegment}/briefings/${date}.html`
      : `briefings/${date}.html`;

    const briefCopy = seoPage(edition.id === "skills" ? "brief_skills" : "brief_oss");
    const siteName = edition.id === "skills" ? "Skill Tastemakers" : "AI Tastemakers";
    const dateLabel = formatSeoDateLabel(date);
    let topPick = "the top pick";
    let description: string | undefined = briefCopy.descriptionTemplate
      ? buildSeoDescriptionFromTemplate(briefCopy.descriptionTemplate, { dateLabel, topPick })
      : undefined;
    let pageTitle = briefCopy.titleTemplate
      ? buildSeoTitleFromTemplate(briefCopy.titleTemplate, { Site: siteName, dateLabel })
      : `Daily Brief: ${dateLabel}`;
    let seo: PageSeoOptions | undefined;
    if (siteBaseUrl) {
      try {
        const digestRaw = await fs.readFile(path.join(briefingsDir, date, "digest.json"), "utf8");
        const digest = JSON.parse(digestRaw) as {
          repos: Array<{ full_name: string; brief?: string | null }>;
          generated_at?: string;
        };
        if (digest.repos[0]?.full_name) {
          topPick = topPickShortName(digest.repos[0].full_name);
        }
        if (briefCopy.descriptionTemplate) {
          description = buildSeoDescriptionFromTemplate(briefCopy.descriptionTemplate, {
            dateLabel,
            topPick,
          });
        }
        const socialTitle = briefSocialTitle(date);
        if (briefCopy.titleTemplate) {
          pageTitle = buildSeoTitleFromTemplate(briefCopy.titleTemplate, {
            Site: siteName,
            dateLabel,
          });
        }
        const ogImageRel = briefOgImagePath(edition.siteSegment, date);
        const ogImageAbs = `${siteBaseUrl.replace(/\/+$/, "")}/${ogImageRel}`;
        const ogOutPath = path.join(
          siteRoot,
          "assets",
          "og",
          "briefings",
          `${date}.png`,
        );
        await writeBriefOgPng(ogOutPath, {
          date,
          editionName: edition.name,
          editionTagline: EDITION_TAGLINES[edition.id],
          repos: digest.repos.map((r) => r.full_name),
        });
        const homePath = edition.siteSegment ? `${edition.siteSegment}/` : "";
        const homeName = edition.id === "skills" ? "Skill Tastemakers" : "AI Tastemakers";
        const repoFullNames = digest.repos.map((r) => r.full_name).filter(Boolean);
        const digestListName =
          edition.id === "skills"
            ? `Claude skills and agent skills · ${dateLabel}`
            : `Trending open source AI projects · ${dateLabel}`;
        seo = {
          siteBaseUrl,
          canonicalPath,
          ogType: "article",
          ogTitle: socialTitle,
          ogImageUrl: ogImageAbs,
          ogImageAlt: `Top repo picks · ${date}`,
          jsonLd: [
            articleJsonLd(
              siteBaseUrl,
              canonicalPath,
              pageTitle,
              description ?? "",
              `${date}T08:00:00-07:00`,
              ogImageAbs,
            ),
            breadcrumbJsonLd(siteBaseUrl, [
              { name: homeName, path: homePath },
              { name: socialTitle, path: canonicalPath },
            ]),
            digestRepoItemListJsonLd(repoFullNames, digestListName),
          ],
        };
      } catch {
        seo = {
          siteBaseUrl,
          canonicalPath,
          ogType: "article",
          ogImageUrl: defaultOgImageUrl(siteBaseUrl, edition.siteSegment),
        };
      }
    }

    const body = `
      <nav class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm">
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; All briefings</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${siblingHref}">${siblingLabel} &rarr;</a>
      </nav>
      ${html}
      ${digestRepoClickTrackingScript()}
      ${labBadgeClickTrackingScript()}`;
    await fs.writeFile(
      path.join(briefOutDir, `${date}.html`),
      pageShell(pageTitle, body, paths, brand, description, escapeHtml, {
        seo,
        outboundRewrite: { ...outboundPagesBase, digestDate: date },
      }),
    );
  }

  const wrapUp = await buildWrapUpArchive(repoRoot, edition.siteSegment);

  const indexPaths = editionSitePaths(edition.siteSegment, 0);
  const useV2 = landingLayoutV2Enabled();
  const indexBody = useV2
    ? edition.id === "skills"
      ? await skillsIndexBodyV2(
          indexPaths,
          dates,
          briefingsDir,
          escapeHtml,
          dates[0],
          wrapUp,
          repoRoot,
          badgeLookup,
        )
      : await ossIndexBodyV2(
          indexPaths,
          dates,
          briefingsDir,
          escapeHtml,
          dates[0],
          wrapUp,
          repoRoot,
          badgeLookup,
        )
    : edition.id === "skills"
      ? skillsIndexBody(indexPaths, dates, edition, dates[0], wrapUp)
      : ossIndexBody(indexPaths, dates, dates[0], wrapUp);

  const homeCopy = seoPage(edition.id === "skills" ? "home_skills" : "home_oss");
  const indexCanonical = edition.siteSegment ? `${edition.siteSegment}/` : "";
  const recentBriefPaths = dates
    .slice(0, 10)
    .map((d) =>
      edition.siteSegment ? `${edition.siteSegment}/briefings/${d}.html` : `briefings/${d}.html`,
    );
  await fs.writeFile(
    path.join(siteRoot, "index.html"),
    pageShell(homeCopy.title ?? edition.name, indexBody, indexPaths, brand, homeCopy.description, escapeHtml, {
      wideIndex: useV2,
      homeIndexEdition: useV2 ? edition.id : undefined,
      documentH1: useV2 ? undefined : homeCopy.h1 ?? edition.name,
      documentH1Visible: !useV2,
      siteBaseUrl,
      seo: siteBaseUrl
        ? {
            siteBaseUrl,
            canonicalPath: indexCanonical,
            ogType: "website",
            ogImageUrl: defaultOgImageUrl(siteBaseUrl, edition.siteSegment),
            ogImageAlt: `${edition.name}. Daily curated AI repos`,
            jsonLd: [
              websiteJsonLd(
                siteBaseUrl,
                homeCopy.h1 ?? edition.name,
                homeCopy.description ?? edition.tagline,
              ),
              itemListJsonLd(
                siteBaseUrl,
                `${homeCopy.h1 ?? edition.name} recent daily briefs`,
                recentBriefPaths,
              ),
            ],
          }
        : undefined,
      outboundRewrite: { ...outboundPagesBase, surface: "index" },
    }),
  );

  if (useV2) {
    await buildBriefingsArchiveIndexPage(
      edition,
      siteRoot,
      briefingsDir,
      dates,
      escapeHtml,
      siteBaseUrl,
      {
        ...outboundPagesBase,
        surface: "briefings_archive_index",
      },
    );
  }

  return dates.length;
}

export async function collectBriefFeedEntries(
  repoRoot: string,
  edition: EditionDefinition,
  limit = 60,
): Promise<BriefFeedEntry[]> {
  const briefingsDir = briefingsDirForEdition(repoRoot, edition);
  const dates = (await listBriefingDates(briefingsDir)).slice(0, limit);
  const entries: BriefFeedEntry[] = [];
  for (const date of dates) {
    const canonicalPath = edition.siteSegment
      ? `${edition.siteSegment}/briefings/${date}.html`
      : `briefings/${date}.html`;
    let summary = applyTemplate(
      seoPage(edition.id === "skills" ? "brief_skills" : "brief_oss").descriptionFallback ?? "",
      { date },
    );
    let updatedIso: string | undefined;
    try {
      const digestRaw = await fs.readFile(path.join(briefingsDir, date, "digest.json"), "utf8");
      const digest = JSON.parse(digestRaw) as {
        repos: Array<{ brief?: string | null }>;
        generated_at?: string;
      };
      summary = briefSocialDescription(digest.repos);
      if (digest.generated_at) updatedIso = digest.generated_at;
    } catch {
      /* markdown-only day */
    }
    entries.push({
      date,
      title: applyTemplate(
        seoPage(edition.id === "skills" ? "brief_skills" : "brief_oss").titleTemplate ??
          `Daily Brief: {dateLabel}`,
        { date, dateLabel: formatSeoDateLabel(date) },
      ),
      summary,
      canonicalPath,
      updatedIso,
    });
  }
  return entries;
}

function markdownH1(markdown: string, fallback: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

export async function buildLabSite(
  repoRoot: string,
  siteDir: string,
  escapeHtml: (t: string) => string,
  asOfIsoDate: string = buildIsoDatePt(),
  siteBaseUrl?: string,
  destRegistry?: OutboundDestRegistry,
): Promise<number> {
  const labSiteDir = path.join(siteDir, "lab");
  await fs.mkdir(labSiteDir, { recursive: true });
  const paths = labSitePaths();
  const brand = {
    name: "Tastemakers Lab",
    tagline:
      "Public notes on how repos get picked, how pipeline changes get tested, and what readers actually engage with.",
  };

  const labShell = { labLayout: true as const, labFallbackSection: "about" as LabLinkSection };
  const allowlist = await collectDigestRepoAllowlist(repoRoot);
  const labSiteBase =
    siteBaseUrl?.trim() || "https://leftyshields.github.io/ai-tastemakers";
  const labOutbound: OutboundRewriteContext = {
    siteBaseUrl: labSiteBase,
    destRegistry,
    githubAllowlist: allowlist,
    channel: "pages",
    surface: "lab",
  };
  const linkCtx = defaultLabLinkContext(0, allowlist, asOfIsoDate);
  const labExperiments = loadExperimentsFile(repoRoot).experiments;
  const writeupPostIds = listLabWriteupPostIds(repoRoot);

  const labPublic = writeLabPublicArtifacts(repoRoot, labSiteDir);
  const dashboardHtml = renderLabDashboardHtml(labPublic, escapeHtml, { asOfIsoDate });

  const labIndexMd = path.join(repoRoot, "briefings", "lab", "index.md");
  let introBlock = "";
  try {
    const markdown = await fs.readFile(labIndexMd, "utf8");
    const html = applyLabIntroVonRestorff(prepareLabProseHtmlFromMarkdown(markdown));
    introBlock = renderLabHomeIntroBlock(
      html,
      renderLabLoopStripHtml("lab-home", escapeHtml, { linkCtx }),
      asOfIsoDate,
      escapeHtml,
    );
  } catch {
    introBlock = `<p class="mb-8 font-sans text-sm text-stone-600 dark:text-stone-400">Run <code>npm run build:pages</code> after adding <code>briefings/lab/index.md</code>.</p>`;
  }
  const indexBody = `${labNavHtml("home", escapeHtml)}
    ${introBlock}
    ${dashboardHtml}
    ${labPublishFooterHtml(escapeHtml)}`;

  await buildLabMarkdownPage(
    repoRoot,
    labSiteDir,
    path.join("briefings", "lab", "about.md"),
    "methodology.html",
    "Methodology · Tastemakers",
    brand,
    escapeHtml,
    labShell,
    "methodology",
    siteBaseUrl,
    labOutbound,
  );

  await writeLabAboutRedirectPage(labSiteDir, paths, brand, escapeHtml, labShell, siteBaseUrl, labOutbound);
  const labIndexCopy = seoPage("lab_index");
  const labIndexSeo: PageSeoOptions | undefined = siteBaseUrl
    ? {
        siteBaseUrl,
        canonicalPath: "lab/",
        ogType: "website",
        ogImageUrl: defaultOgImageUrl(siteBaseUrl),
        jsonLd: websiteJsonLd(
          siteBaseUrl,
          labIndexCopy.h1 ?? "Tastemakers Lab",
          labIndexCopy.description ?? labIndexCopy.title ?? "Lab",
        ),
      }
    : undefined;

  await fs.writeFile(
    path.join(labSiteDir, "index.html"),
    pageShell(
      labIndexCopy.title ?? "Lab · Tastemakers",
      indexBody,
      paths,
      brand,
      labIndexCopy.description,
      escapeHtml,
      {
        ...labShell,
        labNavActive: "home",
        labFallbackSection: "hero",
        seo: labIndexSeo,
        siteBaseUrl,
        documentH1: labIndexCopy.h1,
        documentH1Visible: true,
        outboundRewrite: labOutbound,
      },
    ),
  );

  const toolsBody = `${labNavHtml("tools", escapeHtml)}${renderToolsPageHtml(repoRoot, linkCtx, escapeHtml)}${labPublishFooterHtml(escapeHtml)}`;

  const labToolsCopy = seoPage("lab_tools");
  await fs.writeFile(
    path.join(labSiteDir, "tools.html"),
    pageShell(
      labToolsCopy.title ?? "Evaluated tools · Lab",
      toolsBody,
      paths,
      brand,
      labToolsCopy.description,
      escapeHtml,
      {
        ...labShell,
        labNavActive: "tools",
        labFallbackSection: "tools",
        siteBaseUrl,
        documentH1: labToolsCopy.h1,
        documentH1Visible: true,
        seo: siteBaseUrl
          ? {
              siteBaseUrl,
              canonicalPath: "lab/tools.html",
              ogType: "website",
              ogImageUrl: defaultOgImageUrl(siteBaseUrl),
            }
          : undefined,
      outboundRewrite: labOutbound,
      },
    ),
  );

  await writeExperimentsData(repoRoot, labSiteDir);
  const expDataRaw = await fs.readFile(path.join(labSiteDir, "experiments-data.json"), "utf8");
  const expData = JSON.parse(expDataRaw) as { experiments?: Array<{ id: string }> };
  const experimentPlanAnchorsHtml = (expData.experiments ?? [])
    .map((e) => `<span id="lab-exp-${escapeHtml(e.id)}"></span>`)
    .join("");

  const experimentsBody = `
    ${labNavHtml("experiments", escapeHtml)}
    <header class="lab-lede">
      <h2>Testing right now</h2>
      <p>Each experiment changes one thing at a time: how daily briefs are written, how the homepage is laid out, or which repos make the list. Every post says whether the change stayed. This page is the public record, not a live split test dashboard.</p>
      <p><strong>Before</strong> is the site as it was. <strong>After</strong> is the site with the change turned on. Pages rebuild once a day, so these are calendar windows, not random assignment tests.</p>
    </header>
    <div id="experiments-root" class="font-sans text-sm">
      <div id="experiments-table-wrap" class="space-y-3"></div>
      <div id="experiment-detail" class="hidden">
        <button type="button" id="detail-back" class="mb-6 text-sm text-blue-800 hover:underline dark:text-blue-400">&larr; All experiments</button>
        <h2 id="detail-title" class="mb-4 font-sans text-lg font-bold tracking-tight"></h2>
        <div id="detail-body" class="prose prose-stone max-w-none dark:prose-invert prose-sm prose-headings:font-sans"></div>
        <button type="button" id="export-markdown">Download this write up</button>
      </div>
    </div>
    <div hidden aria-hidden="true">${experimentPlanAnchorsHtml}</div>
    <noscript><p class="experiment-muted">Turn on JavaScript to browse the experiment cards. Records also live in the GitHub repo under <code>data/experiments/</code>.</p></noscript>
    <script src="experiments.js"></script>`;
  await fs.copyFile(
    path.join(repoRoot, "scripts", "lab", "experiments.js"),
    path.join(labSiteDir, "experiments.js"),
  );

  const labExperimentsCopy = seoPage("lab_experiments");
  await fs.writeFile(
    path.join(labSiteDir, "experiments.html"),
    pageShell(
      labExperimentsCopy.title ?? "Experiments · Lab",
      experimentsBody,
      paths,
      brand,
      labExperimentsCopy.description,
      escapeHtml,
      {
        ...labShell,
        labNavActive: "experiments",
        siteBaseUrl,
        documentH1: labExperimentsCopy.h1,
        documentH1Visible: true,
        seo: siteBaseUrl
          ? {
              siteBaseUrl,
              canonicalPath: "lab/experiments.html",
              ogType: "website",
              ogImageUrl: defaultOgImageUrl(siteBaseUrl),
            }
          : undefined,
        outboundRewrite: labOutbound,
      },
    ),
  );

  await writeTokenUsageData(repoRoot, labSiteDir);
  const tokenDataRaw = await fs.readFile(path.join(labSiteDir, "token-usage-data.json"), "utf8");
  const tokenData = JSON.parse(tokenDataRaw) as import("./lab/aggregate-token-usage.js").TokenUsageDataFile;
  const experiments = await loadAllExperiments(repoRoot);
  const tokenBody = `${labNavHtml("tokens", escapeHtml)}${renderTokenUsagePage(tokenData, experiments, escapeHtml)}`;

  const labTokensCopy = seoPage("lab_tokens");
  await fs.writeFile(
    path.join(labSiteDir, "token-usage.html"),
    pageShell(
      labTokensCopy.title ?? "Narration cost & quality · Lab",
      tokenBody,
      paths,
      brand,
      labTokensCopy.description,
      escapeHtml,
      {
        ...labShell,
        labNavActive: "tokens",
        siteBaseUrl,
        documentH1: labTokensCopy.h1,
        documentH1Visible: true,
        seo: siteBaseUrl
          ? {
              siteBaseUrl,
              canonicalPath: "lab/token-usage.html",
              ogType: "website",
              ogImageUrl: defaultOgImageUrl(siteBaseUrl),
            }
          : undefined,
        outboundRewrite: labOutbound,
      },
    ),
  );

  await buildLabMarkdownPage(
    repoRoot,
    labSiteDir,
    path.join("briefings", "lab", "shadow-rubric.md"),
    "shadow-rubric.html",
    "Shadow rubric · Lab",
    brand,
    escapeHtml,
    labShell,
    "experiments",
    siteBaseUrl,
    labOutbound,
  );

  const shadowCount = await buildShadowPages(
    repoRoot,
    labSiteDir,
    brand,
    escapeHtml,
    labShell,
    siteBaseUrl,
    labOutbound,
  );

  await fs.mkdir(path.join(labSiteDir, "posts"), { recursive: true });
  const postsDir = path.join(repoRoot, "briefings", "lab", "posts");
  let postsBody = `${labNavHtml("posts", escapeHtml, 1)}`;
  try {
    const postFiles = (await fs.readdir(postsDir))
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
      .sort();
    if (postFiles.length === 0) {
      postsBody += `<p class="font-sans text-sm leading-relaxed text-stone-600 dark:text-stone-400">Write-ups appear here after we finish an experiment or try a tool from the digest.</p>`;
    } else {
      const listings: string[] = [];
      const postLinkCtx = defaultLabLinkContext(1, allowlist, asOfIsoDate);
      for (const file of postFiles) {
        const markdown = await fs.readFile(path.join(postsDir, file), "utf8");
        let html = prepareLabWriteupHtmlFromMarkdown(markdown);
        html = prepareLabPostArticleHtml(html, postLinkCtx);
        html = rewriteOutboundLinksInHtml(html, labOutbound);
        html = stripLeadingH1FromArticleHtml(html);
        const slug = file.replace(/\.md$/, "");
        const title = markdownH1(markdown, slug);
        listings.push(
          `<li class="mb-2"><a href="${slug}.html" class="text-blue-800 hover:underline dark:text-blue-400">${escapeHtml(title)}</a></li>`,
        );
        const exp = labExperiments.find((e) => e.id === slug);
        if (exp) {
          html = stripLabPostIntroParagraphFromArticleHtml(html);
        }
        const headerBlock = exp
          ? renderLabPostPageHeader({
              experiment: exp,
              title,
              markdown,
              postHref: `${slug}.html`,
              linkCtx: postLinkCtx,
              writeupPostIds,
              repoRoot,
              escape: escapeHtml,
            })
          : `<header class="lab-post-header mb-6 font-sans"><h1 class="mb-0 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">${escapeHtml(title)}</h1></header>`;
        const postBody = `${labNavHtml("posts", escapeHtml, 1)}${headerBlock}<article class="${LAB_PROSE_ARTICLE_CLASS}">${html}</article>`;
        const labPostCopy = seoPage("lab_post");
        const postVars = { title, postTitle: title };
        const leadLine =
          markdown
            .split(/\n/)
            .map((line) => line.trim())
            .find((line) => line && !line.startsWith("#")) ?? title;
        const postDescription = labPostCopy.descriptionTemplate
          ? buildSeoDescriptionFromTemplate(labPostCopy.descriptionTemplate, postVars, ["postTitle", "title"])
          : metaDescriptionFromLead(leadLine);
        const postTitle = labPostCopy.titleTemplate
          ? buildSeoTitleFromTemplate(labPostCopy.titleTemplate, postVars, ["postTitle", "title"])
          : `${title} · Lab`;
        await fs.writeFile(
          path.join(labSiteDir, "posts", `${slug}.html`),
          pageShell(postTitle, postBody, labSitePaths(1), brand, postDescription, escapeHtml, {
            ...labShell,
            labNavActive: "posts",
            labNavDepth: 1,
            labFallbackSection: "posts",
            outboundRewrite: labOutbound,
            labPostShell: true,
            siteBaseUrl,
            seo: siteBaseUrl
              ? {
                  siteBaseUrl,
                  canonicalPath: `lab/posts/${slug}.html`,
                  ogType: "article",
                  ogImageUrl: defaultOgImageUrl(siteBaseUrl),
                  jsonLd: [
                    articleJsonLd(
                      siteBaseUrl,
                      `lab/posts/${slug}.html`,
                      title,
                      postDescription,
                      `${asOfIsoDate}T12:00:00Z`,
                      defaultOgImageUrl(siteBaseUrl),
                    ),
                    breadcrumbJsonLd(siteBaseUrl, [
                      { name: "Tastemakers Lab", path: "lab/" },
                      { name: "Posts", path: "lab/posts/" },
                      { name: title, path: `lab/posts/${slug}.html` },
                    ]),
                  ],
                }
              : undefined,
          }),
        );
      }
      const fixtureHeader = renderLabPostLongNameFixtureHeader(postLinkCtx, repoRoot, escapeHtml);
      const fixtureBody = `${labNavHtml("posts", escapeHtml, 1)}${fixtureHeader}<article class="${LAB_PROSE_ARTICLE_CLASS}"><p>Long repo name header fixture for verify screenshots.</p></article>`;
      await fs.writeFile(
        path.join(labSiteDir, "posts", "_fixture-e1-long-repo.html"),
        pageShell(
          "Long repo header fixture · Lab",
          fixtureBody,
          labSitePaths(1),
          brand,
          "Internal layout fixture for lab post header screenshots.",
          escapeHtml,
          {
            ...labShell,
            labNavActive: "posts",
            labNavDepth: 1,
            labFallbackSection: "posts",
            labPostShell: true,
            siteBaseUrl,
            outboundRewrite: labOutbound,
            seo: siteBaseUrl
              ? {
                  siteBaseUrl,
                  canonicalPath: "lab/posts/_fixture-e1-long-repo.html",
                  noindex: true,
                  ogType: "website",
                  ogImageUrl: defaultOgImageUrl(siteBaseUrl),
                }
              : undefined,
          },
        ),
      );
      postsBody += `<ul class="font-sans text-sm leading-relaxed">${listings.join("")}</ul>`;
    }
  } catch {
    postsBody += `<p class="font-sans text-sm leading-relaxed text-stone-600 dark:text-stone-400">Write-ups appear here after we finish an experiment or try a tool from the digest.</p>`;
  }
  const labPostsIndexCopy = seoPage("lab_posts_index");
  await fs.writeFile(
    path.join(labSiteDir, "posts", "index.html"),
    pageShell(
      labPostsIndexCopy.title ?? "Posts · Lab",
      postsBody,
      labSitePaths(1),
      brand,
      labPostsIndexCopy.description,
      escapeHtml,
      {
        ...labShell,
        labNavActive: "posts",
        labNavDepth: 1,
        siteBaseUrl,
        documentH1: labPostsIndexCopy.h1,
        documentH1Visible: true,
        siteBaseUrl,
        seo: siteBaseUrl
          ? {
              siteBaseUrl,
              canonicalPath: "lab/posts/",
              ogType: "website",
              ogImageUrl: defaultOgImageUrl(siteBaseUrl),
            }
          : undefined,
      outboundRewrite: labOutbound,
      },
    ),
  );

  return 5 + shadowCount + 1;
}

export function allEditions(): EditionDefinition[] {
  return [EDITIONS.oss, EDITIONS.skills];
}
