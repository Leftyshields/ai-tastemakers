import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import {
  EDITIONS,
  type EditionDefinition,
} from "../src/tastemaker/editions.js";
import { briefingsDirForEdition } from "../src/tastemaker/editions.js";

marked.setOptions({ gfm: true, breaks: false });

export interface SitePaths {
  css: string;
  home: string;
  subscribe: string;
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
    brief: (date) => `${date}.html`,
    crossEdition: siteSegment
      ? { href: "../../", label: "AI Tastemakers" }
      : { href: "../skills/", label: "Skill Tastemakers" },
    editionNav,
  };
}

export function pageShell(
  title: string,
  body: string,
  paths: SitePaths,
  brand: { name: string; tagline: string },
  description?: string,
  escapeHtml: (t: string) => string = (t) => t,
): string {
  const safeTitle = escapeHtml(title);
  const meta = description
    ? `<meta name="description" content="${escapeHtml(description)}">`
    : "";
  const cross = paths.crossEdition
    ? `<span aria-hidden="true"> · </span><a href="${paths.crossEdition.href}" class="text-blue-800 hover:underline dark:text-blue-400">${escapeHtml(paths.crossEdition.label)}</a>`
    : "";
  const nav = editionNavHtml(paths.editionNav, escapeHtml);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle}</title>
  ${meta}
  <link rel="stylesheet" href="${paths.css}">
</head>
<body class="min-h-screen bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,64,175,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]">
  <div class="mx-auto min-h-screen max-w-2xl border-stone-200 bg-[#fffcf8] px-5 py-8 dark:border-stone-800 dark:bg-stone-900 md:border-x md:px-8 md:py-12">
    <header class="mb-10 border-b border-stone-200 pb-6 dark:border-stone-800">
      <h1 class="font-sans text-2xl font-bold tracking-tight">
        <a href="${paths.home}" class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400">${escapeHtml(brand.name)}</a>
      </h1>
      <p class="mt-1 font-sans text-sm text-stone-500 dark:text-stone-400">${escapeHtml(brand.tagline)}</p>
      ${nav}
    </header>
    ${body}
    <footer class="mt-16 border-t border-stone-200 pt-6 text-center font-sans text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
      <a href="${paths.subscribe}" class="text-blue-800 hover:underline dark:text-blue-400">Subscribe</a>${cross}
      <span aria-hidden="true"> · </span>
      <a href="https://github.com/Leftyshields/ai-tastemakers" class="text-blue-800 hover:underline dark:text-blue-400">Source on GitHub</a>
      <span aria-hidden="true"> · </span>Updated daily
    </footer>
  </div>
</body>
</html>`;
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

function ossIndexBody(paths: SitePaths, dates: string[], latest?: string): string {
  const heroActions = latest
    ? `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full bg-blue-800 px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500" href="${paths.brief(latest)}">Read today&rsquo;s brief</a>
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100" href="${paths.crossEdition!.href}">Skill Tastemakers &rarr;</a>
        <a class="font-sans text-sm font-medium text-stone-500 no-underline hover:text-stone-800 dark:text-stone-400" href="#archive">Browse archive &rarr;</a>
      </div>`
    : `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100" href="${paths.crossEdition!.href}">Skill Tastemakers &rarr;</a>
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
      <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Daily digest · GitHub momentum</p>
      <p class="mb-6 text-xl leading-snug md:text-[1.65rem]">Every morning, AI Tastemakers surfaces the ten AI-derivative repos gaining the most momentum&mdash;not a static star leaderboard.</p>
      ${heroActions}
    </section>
    <section class="mb-12 text-base leading-relaxed text-stone-600 dark:text-stone-400">
      <p class="mb-3">We scan GitHub for agents, MCP servers, LLM tooling, and everything builders ship on top of foundation models. Ranked by <strong class="text-stone-800 dark:text-stone-200">stars gained in the last seven days</strong>.</p>
      <p class="mb-0">Each pick gets a short Claude narrative brief.</p>
    </section>
    <section id="archive" class="mb-4 scroll-mt-8">
      <h2 class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Archive</h2>
      <ul class="m-0 list-none p-0">${items || "<li class=\"py-3 text-sm text-stone-500\">No briefings yet.</li>"}</ul>
    </section>
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
): string {
  const inspiration = edition.inspiration
    ? `<p class="mb-0 text-sm text-stone-500 dark:text-stone-400">Inspired by the agent-skill wave led by repos like <a class="text-blue-800 hover:underline dark:text-blue-400" href="${edition.inspiration.url}">${edition.inspiration.label}</a> — installable skills for Claude Code, Cursor, Codex, and 50+ Agent Skills hosts.</p>`
    : "";

  const heroActions = latest
    ? `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full bg-blue-800 px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:bg-blue-600" href="${paths.brief(latest)}">Read today&rsquo;s brief</a>
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
      <p class="mb-4 text-xl leading-snug md:text-[1.65rem]">Daily top ten <strong>AI agent skills</strong> — research plugins, Claude Code skills, and installable capabilities ranked by star growth.</p>
      ${inspiration}
      <div class="mt-6">${heroActions}</div>
    </section>
    <section class="mb-12 text-base leading-relaxed text-stone-600 dark:text-stone-400">
      <p class="mb-3">We scan GitHub for <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">ai-skill</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">claude-code</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">ai-prompts</code>, <code class="rounded bg-stone-200 px-1.5 py-0.5 text-xs dark:bg-stone-800">cursor</code>, and related topics — then rank by 7-day star momentum with Claude briefs.</p>
    </section>
    <section id="archive" class="mb-4 scroll-mt-8">
      <h2 class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Archive</h2>
      <ul class="m-0 list-none p-0">${items || "<li class=\"py-3 text-sm text-stone-500\">No briefings yet. Run <code>npm run digest:skills</code> locally or wait for the daily workflow.</li>"}</ul>
    </section>
    ${siblingEditionPromo(paths, "oss")}`;
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
      <article class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400">${html}</article>`;
    await fs.writeFile(
      path.join(briefOutDir, `${date}.html`),
      pageShell(`Daily Brief — ${date} · ${edition.name}`, body, paths, brand, undefined, escapeHtml),
    );
  }

  const indexPaths = editionSitePaths(edition.siteSegment, 0);
  const indexBody =
    edition.id === "skills"
      ? skillsIndexBody(indexPaths, dates, edition, dates[0])
      : ossIndexBody(indexPaths, dates, dates[0]);

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

export function allEditions(): EditionDefinition[] {
  return [EDITIONS.oss, EDITIONS.skills];
}
