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
<body>
  <div class="wrap">
    <header class="site-header">
      <h1 class="site-title"><a href="/">AI Tastemakers</a></h1>
      <p class="site-tagline">Daily intelligence on AI-derivative open source</p>
    </header>
    ${body}
    <footer class="site-footer">
      <a href="${REPO_URL}">Source on GitHub</a> · Updated daily · Automated pipeline
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
    <a class="back-link" href="/">← All briefings</a>
    <article class="brief-content">${html}</article>`;

  const outDir = path.join(SITE_DIR, "briefings");
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    path.join(outDir, `${date}.html`),
    pageShell(`Daily Brief — ${date} · AI Tastemakers`, body),
  );
}

async function buildIndex(dates: string[]): Promise<void> {
  const latest = dates[0];
  const latestLink = latest
    ? `<a class="cta-button" href="/briefings/${latest}.html">Read today&rsquo;s brief</a>`
    : "";

  const items = dates
    .map(
      (d) =>
        `<li><a href="/briefings/${d}.html">${formatDisplayDate(d)}</a> <span class="date">${d}</span></li>`,
    )
    .join("\n");

  const body = `
    <section class="intro">
      <p class="intro-lede">
        Every morning, AI Tastemakers scans GitHub for open-source projects riding the
        AI wave&mdash;agents, MCP servers, LLM tooling, and everything builders are
        shipping on top of foundation models&mdash;then surfaces the ten gaining the
        most momentum.
      </p>
      <p>
        This isn&rsquo;t a star-count leaderboard of LangChain and Transformers.
        The pipeline filters for recently active repos, excludes well-known giants,
        and ranks by <strong>stars gained in the last seven days</strong> so you see
        what&rsquo;s moving now, not what was popular three years ago.
      </p>
      <p>
        Each pick gets a short narrative brief: what the project does, why it matters
        this week, and what a builder could do with it. Written by Claude from README
        context and live GitHub metadata.
      </p>
      ${latestLink}
    </section>

    <section class="how-it-works">
      <h2 class="section-heading">How it works</h2>
      <ol class="steps-list">
        <li><strong>Discover</strong> &mdash; Search GitHub across AI topics (<code>llm</code>, <code>ai-agent</code>, <code>mcp</code>, <code>claude</code>, and more).</li>
        <li><strong>Rank</strong> &mdash; Score by 7-day star delta; bootstrap mode uses recent activity until a week of snapshots accumulates.</li>
        <li><strong>Narrate</strong> &mdash; Enrich the top 10 and generate concise briefs with Claude.</li>
        <li><strong>Publish</strong> &mdash; A daily GitHub Action commits the briefing and updates this site automatically.</li>
      </ol>
    </section>

    <section class="archive-section">
      <h2 class="section-heading">Archive</h2>
      <ul class="archive-list">${items || "<li>No briefings yet.</li>"}</ul>
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
