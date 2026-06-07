import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";
import { marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadDotenv({ path: path.join(ROOT, ".env") });
const BRIEFINGS_DIR = path.join(ROOT, "briefings");
const SITE_DIR = path.join(ROOT, "site");
const REPO_URL = "https://github.com/Leftyshields/ai-tastemakers";

interface FirebaseWebConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
}

function loadFirebaseWebConfig(): FirebaseWebConfig | null {
  const apiKey = process.env.FIREBASE_API_KEY?.trim();
  const authDomain = process.env.FIREBASE_AUTH_DOMAIN?.trim();
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const appId = process.env.FIREBASE_APP_ID?.trim();
  if (!apiKey || !authDomain || !projectId || !appId) return null;
  return { apiKey, authDomain, projectId, appId };
}

marked.setOptions({ gfm: true, breaks: false });

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Path prefix for assets/links ("" at site root, "../" under briefings/). */
function sitePaths(depth: 0 | 1) {
  const p = depth === 0 ? "" : "../";
  return {
    css: `${p}assets/style.css`,
    home: depth === 0 ? "./" : "../",
    subscribe: depth === 0 ? "subscribe.html" : "../subscribe.html",
    brief: (date: string) => (depth === 0 ? `briefings/${date}.html` : `${date}.html`),
  };
}

function pageShell(
  title: string,
  body: string,
  depth: 0 | 1,
  description?: string,
): string {
  const paths = sitePaths(depth);
  const safeTitle = escapeHtml(title);
  const meta = description
    ? `<meta name="description" content="${escapeHtml(description)}">`
    : "";
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
        <a href="${paths.home}" class="text-inherit no-underline hover:text-blue-800 dark:hover:text-blue-400">AI Tastemakers</a>
      </h1>
      <p class="mt-1 font-sans text-sm text-stone-500 dark:text-stone-400">Daily intelligence on AI-derivative open source</p>
    </header>
    ${body}
    <footer class="mt-16 border-t border-stone-200 pt-6 text-center font-sans text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
      <a href="${paths.subscribe}" class="text-blue-800 hover:underline dark:text-blue-400">Subscribe</a>
      <span aria-hidden="true"> · </span>
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

  const paths = sitePaths(1);
  const html = marked.parse(markdown) as string;
  const body = `
    <a class="mb-6 inline-block font-sans text-sm text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; All briefings</a>
    <article class="brief-content prose prose-stone max-w-none prose-headings:font-sans prose-a:text-blue-800 dark:prose-invert dark:prose-a:text-blue-400">${html}</article>`;

  const outDir = path.join(SITE_DIR, "briefings");
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    path.join(outDir, `${date}.html`),
    pageShell(`Daily Brief — ${date} · AI Tastemakers`, body, 1),
  );
}

async function buildIndex(dates: string[]): Promise<void> {
  const paths = sitePaths(0);
  const latest = dates[0];
  const heroActions = latest
    ? `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full bg-blue-800 px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-400" href="${paths.brief(latest)}">Read today&rsquo;s brief</a>
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-800" href="${paths.subscribe}">Get daily email</a>
        <a class="font-sans text-sm font-medium text-stone-500 no-underline hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200" href="#archive">Browse archive &rarr;</a>
      </div>`
    : `<div class="flex flex-wrap items-center gap-3 md:gap-4">
        <a class="inline-block rounded-full border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-800" href="${paths.subscribe}">Get daily email</a>
      </div>`;

  const items = dates
    .map(
      (d) =>
        `<li class="flex items-baseline justify-between gap-4 border-b border-stone-200 py-3.5 dark:border-stone-800">
          <a class="font-sans font-medium text-stone-900 no-underline hover:text-blue-800 dark:text-stone-100 dark:hover:text-blue-400" href="${paths.brief(d)}">
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
      0,
      "Daily curated briefings on trending AI-derivative open source on GitHub — ranked by 7-day star momentum with Claude narratives.",
    ),
  );
}

function subscribeFormScript(firebase: FirebaseWebConfig | null): string {
  if (!firebase) {
    return `<script>
(function () {
  var form = document.getElementById("subscribe-form");
  var status = document.getElementById("subscribe-status");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "Online signup is not configured yet. Check back soon.";
    status.className = "mt-4 font-sans text-sm text-red-700 dark:text-red-400";
  });
})();
</script>`;
  }

  const configJson = JSON.stringify(firebase);
  return `<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = ${configJson};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("subscribe-form");
const emailInput = document.getElementById("subscribe-email");
const submitBtn = document.getElementById("subscribe-submit");
const status = document.getElementById("subscribe-status");

function setStatus(message, kind) {
  status.textContent = message;
  status.className = "mt-4 font-sans text-sm " + (kind === "error"
    ? "text-red-700 dark:text-red-400"
    : kind === "success"
      ? "text-green-800 dark:text-green-400"
      : "text-stone-500 dark:text-stone-400");
}

function subscriberDocId(email) {
  return email.trim().toLowerCase();
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = (emailInput.value || "").trim();
  if (!email || !email.includes("@")) {
    setStatus("Enter a valid email address.", "error");
    return;
  }

  submitBtn.disabled = true;
  setStatus("Subscribing…", "info");

  try {
    const normalized = subscriberDocId(email);
    await setDoc(doc(db, "tastemakers_subscribers", normalized), {
      email: normalized,
      subscribedAt: serverTimestamp(),
      source: "ai-tastemakers",
    }, { merge: false });
    emailInput.value = "";
    setStatus("You are subscribed. The next digest will land in your inbox.", "success");
  } catch (err) {
    const code = err && err.code ? String(err.code) : "";
    if (code === "permission-denied") {
      setStatus("You are already subscribed.", "success");
    } else {
      setStatus("Something went wrong. Please try again.", "error");
    }
  } finally {
    submitBtn.disabled = false;
  }
});
</script>`;
}

async function buildSubscribePage(): Promise<void> {
  const paths = sitePaths(0);
  const firebase = loadFirebaseWebConfig();
  const configNote = firebase
    ? ""
    : `<p class="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 font-sans text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">Firebase signup is not configured for this build. Set FIREBASE_* env vars when running build:pages.</p>`;

  const body = `
    <a class="mb-6 inline-block font-sans text-sm text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; Home</a>

    <section class="mb-8">
      <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Daily email</p>
      <h2 class="mb-4 font-sans text-2xl font-bold tracking-tight">Subscribe to AI Tastemakers</h2>
      <p class="mb-0 text-base leading-relaxed text-stone-600 dark:text-stone-400">
        One email each morning with the top ten AI-derivative repos gaining momentum on GitHub&mdash;ranked by 7-day star growth, with a short Claude-written brief for each pick.
      </p>
    </section>

    ${configNote}

    <form id="subscribe-form" class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-950/50" novalidate>
      <label for="subscribe-email" class="mb-2 block font-sans text-sm font-medium text-stone-800 dark:text-stone-200">Email address</label>
      <div class="flex flex-col gap-3 sm:flex-row">
        <input
          id="subscribe-email"
          name="email"
          type="email"
          autocomplete="email"
          required
          placeholder="you@example.com"
          class="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-900 outline-none ring-blue-800/30 focus:border-blue-800 focus:ring-2 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-blue-500"
        />
        <button
          id="subscribe-submit"
          type="submit"
          class="rounded-lg bg-blue-800 px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Subscribe
        </button>
      </div>
      <p id="subscribe-status" class="mt-4 font-sans text-sm text-stone-500 dark:text-stone-400" aria-live="polite"></p>
      <p class="mt-4 mb-0 font-sans text-xs leading-relaxed text-stone-500 dark:text-stone-400">
        No spam. One digest per day. Unsubscribe anytime by replying to any email.
      </p>
    </form>

    ${subscribeFormScript(firebase)}`;

  await fs.writeFile(
    path.join(SITE_DIR, "subscribe.html"),
    pageShell(
      "Subscribe · AI Tastemakers",
      body,
      0,
      "Get the AI Tastemakers daily digest by email — top trending AI open source repos with Claude briefs.",
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
  await buildSubscribePage();
  console.log(`Built ${dates.length} briefing page(s) + subscribe → site/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
