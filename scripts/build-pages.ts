import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BRIEFINGS_DIR = path.join(ROOT, "briefings");
const SITE_DIR = path.join(ROOT, "site");
const REPO_URL = "https://github.com/Leftyshields/ai-tastemakers";

marked.setOptions({ gfm: true, breaks: false });

function pageShell(title: string, body: string, description?: string): string {
  const meta = description
    ? `<meta name="description" content="${description.replace(/"/g, "&quot;")}">`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  ${meta}
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body class="min-h-screen bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,64,175,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]">
  <div class="mx-auto min-h-screen max-w-2xl border-stone-200 bg-[#fffcf8] px-5 py-8 dark:border-stone-800 dark:bg-stone-900 md:border-x md:px-8 md:py-12">
    <header class="mb-10 border-b border-stone-200 pb-6 dark:border-stone-800">
      <h1 class="font-sans text-2xl font-bold tracking-tight">
        <a href="/" class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400">AI Tastemakers</a>
      </h1>
      <p class="mt-1 font-sans text-sm text-stone-500 dark:text-stone-400">Daily intelligence on AI-derivative open source</p>
    </header>
    ${body}
    <footer class="mt-16 border-t border-stone-200 pt-6 text-center font-sans text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
      <a href="${REPO_URL}" class="text-blue-800 hover:underline dark:text-blue-400">Source on GitHub</a>
      <span aria-hidden="true"> · </span>Updated daily
      <span aria-hidden="true"> · </span>Automated pipeline
    </footer>
  </div>
</body>
</html>`;
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

async function listBriefingDates(): Promise<string[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(BRIEFINGS_DIR);
  } catch {
    return [];
  }
  return entries
    .filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e))
    .sort((a, b) => b.localeCompare(a));
}

async function buildBriefPage(date: string): Promise<void> {
  const mdPath = path.join(BRIEFINGS_DIR, date, "daily_brief.md");
  let markdown: string;
  try {
    markdown = await fs.readFile(mdPath, "utf8");
  } catch {
    return;
  }

  const html = marked.parse(markdown) as string;
  const body = `
    <a class="mb-6 inline-block font-sans text-sm text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="/">&larr; All briefings</a>
    <article class="brief-content prose prose-stone max-w-none prose-headings:font-sans prose-a:text-blue-800 dark:prose-invert dark:prose-a:text-blue-400">${html}</article>`;

  const outDir = path.join(SITE_DIR, "briefings");
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    path.join(outDir, `${date}.html`),
    pageShell(`Daily Brief — ${date} · AI Tastemakers`, body),
  );
}

async function buildIndex(dates: string[]): Promise<void> {
  const latest = dates[0];
  const heroActions = latest
    ? `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full bg-blue-800 px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-400" href="/briefings/${latest}.html">Read today&rsquo;s brief</a>
        <a class="font-sans text-sm font-medium text-stone-500 no-underline hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200" href="#archive">Browse archive &rarr;</a>
      </div>`
    : "";

  const items = dates
    .map(
      (d) =>
        `<li class="flex items-baseline justify-between gap-4 border-b border-stone-200 py-3.5 dark:border-stone-800">
          <a class="font-sans font-medium text-stone-900 no-underline hover:text-blue-800 dark:text-stone-100 dark:hover:text-blue-400" href="/briefings/${d}.html">
            <time datetime="${d}">${formatDisplayDate(d)}</time>
          </a>
        </li>`,
    )
    .join("\n");

  const body = `
    <section class="mb-12 border-b border-stone-200 pb-10 dark:border-stone-800">
      <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Daily digest &middot; GitHub momentum</p>
      <p class="mb-6 text-xl leading-snug md:text-[1.65rem] md:leading-snug">
        Every morning, AI Tastemakers surfaces the ten AI-derivative repos gaining the most momentum&mdash;not a static star leaderboard.
      </p>
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
      <h2 class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Archive</h2>
      <ul class="m-0 list-none p-0">${items || "<li class=\"py-3 font-sans text-sm text-stone-500\">No briefings yet.</li>"}</ul>
    </section>`;

  await fs.writeFile(
    path.join(SITE_DIR, "index.html"),
    pageShell(
      "AI Tastemakers",
      body,
      "Daily curated briefings on trending AI-derivative open source on GitHub — ranked by 7-day star momentum with Claude narratives.",
    ),
  );
}

async function main(): Promise<void> {
  await fs.mkdir(path.join(SITE_DIR, "assets"), { recursive: true });
  await fs.writeFile(path.join(SITE_DIR, ".nojekyll"), "");

  const dates = await listBriefingDates();
  await fs.mkdir(path.join(SITE_DIR, "briefings"), { recursive: true });

  for (const date of dates) {
    await buildBriefPage(date);
  }

  await buildIndex(dates);
  console.log(`Built ${dates.length} briefing page(s) → site/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
