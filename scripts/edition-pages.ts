import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import {
  EDITIONS,
  type EditionDefinition,
} from "../src/tastemaker/editions.js";
import { briefingsDirForEdition } from "../src/tastemaker/editions.js";
import { normalizeLegacyNewMarkdown } from "../src/tastemaker/writers/new-badge.js";
import { writeExperimentsData } from "./lab/aggregate-experiments.js";

marked.setOptions({ gfm: true, breaks: false });

function escapeScriptString(value: string): string {
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
        "POSTHOG_KEY is required for GitHub Pages deploy — all HTML pages must ship with analytics.",
      );
    }
    console.warn("Warning: POSTHOG_KEY not set — built HTML has no PostHog snippet.");
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

export function briefOutboundTrackingScript(editionId: string, pageDate: string): string {
  if (!posthogAnalyticsEnabled()) return "";
  const edition = escapeScriptString(editionId);
  const pageDateSafe = escapeScriptString(pageDate);
  return `<script>
(function () {
  function repoFromHref(href) {
    try {
      var u = new URL(href);
      if (u.hostname !== "github.com") return "";
      var parts = u.pathname.replace(/^\\/+/, "").split("/");
      if (parts.length < 2) return "";
      return parts[0] + "/" + parts[1];
    } catch (e) {
      return "";
    }
  }

  function rankForAnchor(anchor) {
    var block = anchor.closest("p") || anchor;
    var el = block;
    while (el && el.closest && el.closest(".brief-content")) {
      var prev = el.previousElementSibling;
      while (prev) {
        if (prev.tagName === "H2" || prev.tagName === "H3") {
          var m = prev.textContent.match(/^\\s*(\\d+)\\./);
          if (m) return m[1];
        }
        prev = prev.previousElementSibling;
      }
      el = el.parentElement;
    }
    return "";
  }

  document.querySelectorAll(".brief-content a[href]").forEach(function (anchor) {
    anchor.addEventListener("click", function () {
      if (typeof posthog === "undefined" || !posthog.capture) return;
      var repo = repoFromHref(anchor.href);
      if (!repo) return;
      posthog.capture("outbound_repo_click", {
        edition: "${edition}",
        repo: repo,
        rank: rankForAnchor(anchor),
        page_date: "${pageDateSafe}"
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

export function editionNavHtml(
  nav: EditionNav,
  escapeHtml: (t: string) => string,
): string {
  const pill = (href: string, label: string, isActive: boolean) => {
    const base =
      "inline-block rounded-full border px-3.5 py-1 font-sans text-sm no-underline transition";
    const active =
      "border-blue-800 bg-blue-50 font-semibold text-blue-900 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-200";
    const idle =
      "border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-500 dark:hover:text-stone-100";
    return `<a href="${href}" class="${base} ${isActive ? active : idle}"${isActive ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`;
  };

  return `<nav aria-label="Tastemakers editions" class="mt-4 flex flex-wrap gap-2">
      ${pill(nav.ossHref, "AI Tastemakers", nav.active === "oss")}
      ${pill(nav.skillsHref, "Skill Tastemakers", nav.active === "skills")}
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

export function labNavHtml(
  active: "home" | "tools" | "experiments" | "posts",
  escapeHtml: (t: string) => string,
  depth: 0 | 1 = 0,
): string {
  const pill = (href: string, label: string, isActive: boolean) => {
    const base =
      "inline-block rounded-full border px-3.5 py-1 font-sans text-sm no-underline transition";
    const activeCls =
      "border-blue-800 bg-blue-50 font-semibold text-blue-900 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-200";
    const idle =
      "border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-500 dark:hover:text-stone-100";
    return `<a href="${href}" class="${base} ${isActive ? activeCls : idle}"${isActive ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`;
  };

  const prefix = depth === 0 ? "" : "../";
  const postsHref = depth === 0 ? "posts/" : "./";

  return `<nav aria-label="Lab section" class="mb-8 flex flex-wrap gap-2">
      ${pill(`${prefix}${depth === 0 ? "./" : ""}`, "Lab home", active === "home")}
      ${pill(`${prefix}tools.html`, "Tools", active === "tools")}
      ${pill(`${prefix}experiments.html`, "Experiments", active === "experiments")}
      ${pill(postsHref, "Posts", active === "posts")}
    </nav>`;
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
  enrichment_bundle_ref?: string;
  brief?: string | null;
  is_new?: boolean;
}

interface ShadowDigestPayload {
  run_id: string;
  date: string;
  edition: string;
  enrich_web_requested: boolean;
  generated_at: string;
  ranking_mode: string;
  repos: ShadowRepoEntry[];
}

function renderBriefMarkdown(brief: string | null | undefined): string {
  if (!brief?.trim()) {
    return '<p class="text-stone-500">—</p>';
  }
  return marked.parse(brief) as string;
}

function renderShadowRepoSection(
  repo: ShadowRepoEntry,
  escapeHtml: (t: string) => string,
): string {
  const title = `<h3 class="mb-1 font-sans text-base font-semibold"><a href="${escapeHtml(repo.html_url)}" class="text-blue-800 no-underline hover:underline dark:text-blue-400">${escapeHtml(repo.full_name)}</a> <span class="font-normal text-stone-500">#${repo.rank}</span></h3>`;
  const prose =
    "prose prose-stone max-w-none dark:prose-invert prose-sm prose-a:text-blue-800 dark:prose-a:text-blue-400";

  const hasSideBySide =
    repo.brief_control != null ||
    repo.brief_treatment != null ||
    Boolean(repo.enrichment_bundle_ref);

  if (hasSideBySide) {
    return `<section class="mb-10 border-b border-stone-200 pb-8 last:border-b-0 dark:border-stone-700">
      ${title}
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
          <h4 class="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-stone-500">Control (README only)</h4>
          <article class="brief-content ${prose}">${renderBriefMarkdown(repo.brief_control)}</article>
        </div>
        <div class="rounded-lg border border-blue-200 bg-blue-50/30 p-4 dark:border-blue-800 dark:bg-blue-950/20">
          <h4 class="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-300">Treatment (README + web/HN)</h4>
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
      ? `<p class="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">This run predates side-by-side shadow output — repos only have a single <code>brief</code> field. Re-run with <code>DIGEST_ENRICH_WEB=1</code> and <code>DIGEST_ENRICH_SHADOW=1</code>, then rebuild pages for control vs treatment columns.</p>`
      : "";

  const repos = shadow.repos.map((repo) => renderShadowRepoSection(repo, escapeHtml)).join("");

  return `${labNavHtml("experiments", escapeHtml, 1)}
    <p class="mb-2"><a href="../experiments.html" class="text-sm text-blue-800 hover:underline dark:text-blue-400">&larr; Experiments</a></p>
    <h2 class="font-mono text-lg font-bold">${escapeHtml(shadow.run_id)}</h2>
    <p class="text-sm text-stone-500 dark:text-stone-400">${escapeHtml(shadow.date)} · ${escapeHtml(shadow.edition)} · ${escapeHtml(shadow.ranking_mode)}</p>
    <p class="mt-2 text-sm"><a href="../shadow-rubric.html" class="text-blue-800 hover:underline dark:text-blue-400">Shadow rubric</a></p>
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
  navActive: "home" | "tools" | "experiments" | "posts" = "home",
): Promise<boolean> {
  const markdownPath = path.join(repoRoot, markdownRelPath);
  try {
    const markdown = await fs.readFile(markdownPath, "utf8");
    const html = marked.parse(markdown) as string;
    const body = `${labNavHtml(navActive, escapeHtml)}<article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400 prose-headings:font-sans">${html}</article>`;
    await fs.writeFile(
      path.join(labSiteDir, htmlName),
      pageShell(pageTitle, body, labSitePaths(), brand, undefined, escapeHtml, labShell),
    );
    return true;
  } catch {
    return false;
  }
}

async function buildShadowPages(
  repoRoot: string,
  labSiteDir: string,
  brand: { name: string; tagline: string },
  escapeHtml: (t: string) => string,
  labShell: { labLayout: true },
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
      const body = renderShadowCompareBody(shadow, escapeHtml);
      await fs.writeFile(
        path.join(shadowSiteDir, `${runId}.html`),
        pageShell(
          `Shadow ${runId.slice(0, 8)} · Lab`,
          body,
          labSitePaths(1),
          brand,
          "Side-by-side control vs treatment blurbs from a digest pipeline shadow run.",
          escapeHtml,
          labShell,
        ),
      );
      count++;
    } catch {
      // skip missing or invalid shadow runs
    }
  }

  return count;
}

export function pageShell(
  title: string,
  body: string,
  paths: SitePaths,
  brand: { name: string; tagline: string },
  description?: string,
  escapeHtml: (t: string) => string = (t) => t,
  options?: { labLayout?: boolean },
): string {
  const safeTitle = escapeHtml(title);
  const meta = description
    ? `<meta name="description" content="${escapeHtml(description)}">`
    : "";
  const cross = paths.crossEdition
    ? `<span aria-hidden="true"> · </span><a href="${paths.crossEdition.href}" class="text-blue-800 hover:underline dark:text-blue-400">${escapeHtml(paths.crossEdition.label)}</a>`
    : "";
  const nav = editionNavHtml(paths.editionNav, escapeHtml);
  const labLayout = options?.labLayout === true;
  const shellClass = labLayout
    ? "mx-auto max-w-2xl border-stone-200 bg-[#fffcf8] px-5 py-8 dark:border-stone-800 dark:bg-stone-900 md:border-x md:px-8 md:py-12"
    : "mx-auto min-h-screen max-w-2xl border-stone-200 bg-[#fffcf8] px-5 py-8 dark:border-stone-800 dark:bg-stone-900 md:border-x md:px-8 md:py-12";
  const mainHtml = labLayout ? `<main class="lab-main">${body}</main>` : body;
  const footerMt = labLayout ? "mt-10" : "mt-16";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle}</title>
  ${meta}
  <link rel="stylesheet" href="${paths.css}">
  ${posthogScriptHtml()}
</head>
<body class="min-h-screen bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,64,175,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]">
  <div class="${shellClass}">
    <header class="mb-8 border-b border-stone-200 pb-6 dark:border-stone-800">
      <h1 class="font-sans text-2xl font-bold tracking-tight">
        <a href="${paths.home}" class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400">${escapeHtml(brand.name)}</a>
      </h1>
      <p class="mt-1 font-sans text-sm text-stone-500 dark:text-stone-400">${escapeHtml(brand.tagline)}</p>
      ${nav}
    </header>
    ${mainHtml}
    <footer class="${footerMt} border-t border-stone-200 pt-6 text-center font-sans text-xs leading-relaxed text-stone-500 dark:border-stone-800 dark:text-stone-400">
      <a href="${paths.subscribe}" class="text-blue-800 hover:underline dark:text-blue-400">Subscribe</a>${cross}
      <span aria-hidden="true"> · </span>
      <a href="${paths.lab}" class="text-blue-800 hover:underline dark:text-blue-400">Lab — how we measure improvements</a>
      <span aria-hidden="true"> · </span>
      <a href="https://github.com/Leftyshields/ai-tastemakers" class="text-blue-800 hover:underline dark:text-blue-400">Source on GitHub</a>
      <span aria-hidden="true"> · </span>Updated daily
      <span aria-hidden="true"> · </span>Automated pipeline
    </footer>
  </div>
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

  return {
    weeks,
    months,
    weeklyLatest,
    monthlyLatest,
    weeklyGeneratedAt,
    monthlyGeneratedAt,
    weekHref,
    monthHref,
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
  return `
    <section id="monthly-archive" class="mb-12 scroll-mt-8 border-t border-stone-200 pt-10 dark:border-stone-800">
      <h2 class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Monthly rollups</h2>
      <p class="mb-4 text-sm text-stone-600 dark:text-stone-400">Fourth-Sunday synthesis across weekly reviews &mdash; month-level themes and builder takeaways.</p>
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

function formatWeekLabel(weekId: string): string {
  return weekId.replace("-W", " · Week ");
}

function weeklyArchiveSection(
  weeks: string[],
  weekHref: (weekId: string) => string,
): string {
  if (weeks.length === 0) return "";
  const items = weeks
    .map(
      (w) =>
        `<li class="border-b border-stone-200 py-3.5 dark:border-stone-800">
          <a class="font-sans font-medium text-stone-900 no-underline hover:text-blue-800 dark:text-stone-100 dark:hover:text-blue-400" href="${weekHref(w)}">
            ${formatWeekLabel(w)}
          </a>
        </li>`,
    )
    .join("\n");
  return `
    <section id="weekly-archive" class="mb-12 scroll-mt-8 border-t border-stone-200 pt-10 dark:border-stone-800">
      <h2 class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Weekly reviews</h2>
      <p class="mb-4 text-sm text-stone-600 dark:text-stone-400">Sunday synthesis across AI Tastemakers and Skill Tastemakers &mdash; themes, stats, and builder takeaways.</p>
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
      <p class="mb-3 text-xl leading-snug md:text-[1.65rem] md:leading-snug">Every morning, AI Tastemakers surfaces the ten AI-derivative repos gaining the most momentum&mdash;not a static star leaderboard.</p>
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
        <li><strong class="text-stone-900 dark:text-stone-100">Discover</strong> &mdash; Search GitHub across AI topics (<code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">llm</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">ai-agent</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">mcp</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">claude</code>, and more).</li>
        <li><strong class="text-stone-900 dark:text-stone-100">Rank</strong> &mdash; Score by 7-day star delta; bootstrap mode until a week of snapshots accumulates.</li>
        <li><strong class="text-stone-900 dark:text-stone-100">Narrate</strong> &mdash; Enrich the top 10 and generate concise briefs with Claude.</li>
        <li><strong class="text-stone-900 dark:text-stone-100">Publish</strong> &mdash; A daily GitHub Action commits the briefing and updates this site.</li>
      </ol>
    </section>

    <section id="archive" class="mb-4 scroll-mt-8">
      <h2 class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Daily archive</h2>
      <ul class="m-0 list-none p-0">${items || "<li class=\"py-3 font-sans text-sm text-stone-500\">No briefings yet.</li>"}</ul>
    </section>
    ${wrapUp ? weeklyArchiveSection(wrapUp.weeks, wrapUp.weekHref) : ""}
    ${wrapUp ? monthlyArchiveSection(wrapUp.months, wrapUp.monthHref) : ""}
    ${siblingEditionPromo(paths, "skills")}`;
}

function siblingEditionPromo(paths: SitePaths, sibling: "oss" | "skills"): string {
  if (sibling === "skills") {
    return `
    <section class="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-700 dark:bg-stone-950/40">
      <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Also from Tastemakers</p>
      <h2 class="mb-2 font-sans text-lg font-semibold"><a class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400" href="${paths.editionNav.skillsHref}">Skill Tastemakers</a></h2>
      <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Daily top ten AI agent skills — Claude Code plugins, research skills, and installable capabilities ranked by GitHub momentum.</p>
      <a class="font-sans text-sm font-medium text-blue-800 no-underline hover:underline dark:text-blue-400" href="${paths.editionNav.skillsHref}">Browse skills digest &rarr;</a>
    </section>`;
  }

  return `
    <section class="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-700 dark:bg-stone-950/40">
      <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Also from Tastemakers</p>
      <h2 class="mb-2 font-sans text-lg font-semibold"><a class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400" href="${paths.editionNav.ossHref}">AI Tastemakers</a></h2>
      <p class="mb-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">Daily top ten AI-derivative open source repos — agents, MCP servers, LLM tooling, ranked by 7-day star growth.</p>
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
    ? `<p class="mb-0 text-sm text-stone-500 dark:text-stone-400">Inspired by the agent-skill wave led by repos like <a class="text-blue-800 hover:underline dark:text-blue-400" href="${edition.inspiration.url}">${edition.inspiration.label}</a> — installable skills for Claude Code, Cursor, Codex, and 50+ Agent Skills hosts.</p>`
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
      <p class="mb-3">We scan GitHub for <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">ai-skill</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">claude-code</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">ai-prompts</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">cursor</code>, and related topics — then rank by 7-day star momentum with Claude briefs.</p>
    </section>
    <section id="archive" class="mb-4 scroll-mt-8">
      <h2 class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Daily archive</h2>
      <ul class="m-0 list-none p-0">${items || "<li class=\"py-3 text-sm text-stone-500\">No briefings yet. Run <code>npm run digest:skills</code> locally or wait for the daily workflow.</li>"}</ul>
    </section>
    ${wrapUp ? weeklyArchiveSection(wrapUp.weeks, wrapUp.weekHref) : ""}
    ${wrapUp ? monthlyArchiveSection(wrapUp.months, wrapUp.monthHref) : ""}
    ${siblingEditionPromo(paths, "oss")}`;
}

function monthlyPagePaths(): SitePaths {
  return {
    css: "../assets/style.css",
    home: "../",
    subscribe: "../subscribe.html",
    brief: () => "../",
    editionNav: { ossHref: "../", skillsHref: "../skills/", active: undefined },
  };
}

export async function buildMonthlySite(
  repoRoot: string,
  siteDir: string,
  escapeHtml: (t: string) => string,
): Promise<number> {
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
    const html = marked.parse(markdown) as string;
    const body = `
      <nav class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm">
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; AI Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.editionNav.skillsHref}">Skill Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}#monthly-archive">All monthly rollups</a>
      </nav>
      <article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400">${html}</article>`;
    await fs.writeFile(
      path.join(outDir, `${monthId}.html`),
      pageShell(
        `Monthly Rollup — ${monthId}`,
        body,
        paths,
        brand,
        "Monthly editorial synthesis across weekly Tastemakers reviews.",
        escapeHtml,
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
    brief: () => "../",
    editionNav: { ossHref: "../", skillsHref: "../skills/", active: undefined },
  };
}

export async function buildWeeklySite(
  repoRoot: string,
  siteDir: string,
  escapeHtml: (t: string) => string,
): Promise<number> {
  const weeks = await listWeeklyReviewWeeks(repoRoot);
  const outDir = path.join(siteDir, "weekly");
  await fs.mkdir(outDir, { recursive: true });

  const brand = {
    name: "Tastemakers Weekly",
    tagline: "Weekly synthesis of AI Tastemakers and Skill Tastemakers",
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
    const html = marked.parse(markdown) as string;
    const body = `
      <nav class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm">
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; AI Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.editionNav.skillsHref}">Skill Tastemakers</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}#weekly-archive">All weekly reviews</a>
      </nav>
      <article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400">${html}</article>`;
    await fs.writeFile(
      path.join(outDir, `${weekId}.html`),
      pageShell(
        `Weekly Review — ${weekId}`,
        body,
        paths,
        brand,
        "Weekly editorial synthesis across AI and Skills tastemaker digests.",
        escapeHtml,
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
): Promise<number> {
  const briefingsDir = briefingsDirForEdition(repoRoot, edition);
  const dates = await listBriefingDates(briefingsDir);
  const siteRoot = edition.siteSegment
    ? path.join(siteDir, edition.siteSegment)
    : siteDir;
  const briefOutDir = path.join(siteRoot, "briefings");
  await fs.mkdir(briefOutDir, { recursive: true });

  const brand = { name: edition.name, tagline: edition.tagline };

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
    const html = marked.parse(markdown) as string;
    const siblingHref =
      edition.id === "skills" ? paths.editionNav.ossHref : paths.editionNav.skillsHref;
    const siblingLabel = edition.id === "skills" ? "AI Tastemakers" : "Skill Tastemakers";
    const body = `
      <nav class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm">
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; All briefings</a>
        <span class="text-stone-300 dark:text-stone-600" aria-hidden="true">|</span>
        <a class="text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${siblingHref}">${siblingLabel} &rarr;</a>
      </nav>
      <article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400">${html}</article>
      ${briefOutboundTrackingScript(edition.id, date)}`;
    await fs.writeFile(
      path.join(briefOutDir, `${date}.html`),
      pageShell(`Daily Brief — ${date} · ${edition.name}`, body, paths, brand, undefined, escapeHtml),
    );
  }

  const wrapUp = await buildWrapUpArchive(repoRoot, edition.siteSegment);

  const indexPaths = editionSitePaths(edition.siteSegment, 0);
  const indexBody =
    edition.id === "skills"
      ? skillsIndexBody(indexPaths, dates, edition, dates[0], wrapUp)
      : ossIndexBody(indexPaths, dates, dates[0], wrapUp);

  const indexDescription =
    edition.id === "skills"
      ? "Daily top AI agent skills on GitHub — Claude Code plugins and research skills ranked by momentum."
      : "Daily curated briefings on trending AI-derivative open source on GitHub.";

  await fs.writeFile(
    path.join(siteRoot, "index.html"),
    pageShell(edition.name, indexBody, indexPaths, brand, indexDescription, escapeHtml),
  );

  return dates.length;
}

export async function buildLabSite(
  repoRoot: string,
  siteDir: string,
  escapeHtml: (t: string) => string,
): Promise<number> {
  const labSiteDir = path.join(siteDir, "lab");
  await fs.mkdir(labSiteDir, { recursive: true });
  const paths = labSitePaths();
  const brand = {
    name: "Tastemakers Lab",
    tagline:
      "Public notes on how we pick repos, test pipeline changes, and measure what readers engage with.",
  };

  const labShell = { labLayout: true as const };

  const labIndexMd = path.join(repoRoot, "briefings", "lab", "index.md");
  let indexBody = `${labNavHtml("home", escapeHtml)}`;
  try {
    const markdown = await fs.readFile(labIndexMd, "utf8");
    const html = marked.parse(markdown) as string;
    indexBody += `<article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400 prose-headings:font-sans">${html}</article>`;
  } catch {
    indexBody += `<section class="prose prose-stone max-w-none dark:prose-invert prose-headings:font-sans">
      <p>Run <code>npm run build:pages</code> after adding <code>briefings/lab/index.md</code>.</p>
    </section>`;
  }

  const labIndexDescription =
    "How AI Tastemakers measures site engagement, runs digest pipeline experiments, and publishes results openly.";

  await fs.writeFile(
    path.join(labSiteDir, "index.html"),
    pageShell("Lab · Tastemakers", indexBody, paths, brand, labIndexDescription, escapeHtml, labShell),
  );

  const inventoryMd = path.join(repoRoot, "briefings", "lab", "tool-inventory.md");
  let toolsBody = `${labNavHtml("tools", escapeHtml)}`;
  try {
    const markdown = await fs.readFile(inventoryMd, "utf8");
    const html = marked.parse(markdown) as string;
    toolsBody += `<article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400 prose-headings:font-sans prose-table:text-sm">${html}</article>`;
  } catch {
    toolsBody += `<p class="font-sans text-sm text-stone-600 dark:text-stone-400">Run <code>npm run inventory:tools</code> to generate the inventory.</p>`;
  }

  await fs.writeFile(
    path.join(labSiteDir, "tools.html"),
    pageShell("Tool inventory · Lab", toolsBody, paths, brand, undefined, escapeHtml, labShell),
  );

  const experimentsBody = `
    ${labNavHtml("experiments", escapeHtml)}
    <div id="experiments-root" class="font-sans text-sm">
      <div id="experiments-table-wrap" class="space-y-3"></div>
      <div id="experiment-detail" class="hidden">
        <button type="button" id="detail-back" class="mb-6 text-sm text-blue-800 hover:underline dark:text-blue-400">&larr; All experiments</button>
        <h2 id="detail-title" class="mb-4 font-mono text-lg font-bold"></h2>
        <div id="detail-body" class="prose prose-stone max-w-none dark:prose-invert prose-sm prose-headings:font-sans"></div>
        <button type="button" id="export-markdown" class="mt-6 rounded-full border border-blue-800 px-4 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-200 dark:hover:bg-blue-950/40">Export markdown</button>
      </div>
    </div>
    <script src="experiments.js"></script>`;

  await writeExperimentsData(repoRoot, labSiteDir);
  await fs.copyFile(
    path.join(repoRoot, "scripts", "lab", "experiments.js"),
    path.join(labSiteDir, "experiments.js"),
  );

  await fs.writeFile(
    path.join(labSiteDir, "experiments.html"),
    pageShell("Experiments · Lab", experimentsBody, paths, brand, undefined, escapeHtml, labShell),
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
  );

  const shadowCount = await buildShadowPages(repoRoot, labSiteDir, brand, escapeHtml, labShell);

  await fs.mkdir(path.join(labSiteDir, "posts"), { recursive: true });
  const postsDir = path.join(repoRoot, "briefings", "lab", "posts");
  let postsBody = `${labNavHtml("posts", escapeHtml, 1)}`;
  try {
    const postFiles = (await fs.readdir(postsDir))
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
      .sort();
    if (postFiles.length === 0) {
      postsBody += `<p class="font-sans text-sm leading-relaxed text-stone-600 dark:text-stone-400">Dogfood write-ups will appear here after the first experiment cycle.</p>`;
    } else {
      postsBody += `<ul class="font-sans text-sm">${postFiles.map((f) => `<li><a href="${f.replace(/\.md$/, ".html")}" class="text-blue-800 hover:underline dark:text-blue-400">${escapeHtml(f.replace(/\.md$/, ""))}</a></li>`).join("")}</ul>`;

      for (const file of postFiles) {
        const markdown = await fs.readFile(path.join(postsDir, file), "utf8");
        const html = marked.parse(markdown) as string;
        const slug = file.replace(/\.md$/, "");
        const postBody = `${labNavHtml("posts", escapeHtml, 1)}<article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400 prose-headings:font-sans">${html}</article>`;
        await fs.writeFile(
          path.join(labSiteDir, "posts", `${slug}.html`),
          pageShell(`${slug} · Lab`, postBody, labSitePaths(1), brand, undefined, escapeHtml, labShell),
        );
      }
    }
  } catch {
    postsBody += `<p class="font-sans text-sm leading-relaxed text-stone-600 dark:text-stone-400">Dogfood write-ups will appear here after the first experiment cycle.</p>`;
  }
  await fs.writeFile(
    path.join(labSiteDir, "posts", "index.html"),
    pageShell("Posts · Lab", postsBody, labSitePaths(1), brand, undefined, escapeHtml, labShell),
  );

  return 4 + shadowCount + 1;
}

export function allEditions(): EditionDefinition[] {
  return [EDITIONS.oss, EDITIONS.skills];
}
