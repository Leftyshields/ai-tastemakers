import fs from "node:fs/promises";
import path from "node:path";
import type { EditionId } from "../src/tastemaker/editions.js";
import type { Digest, DigestRepo, RankingMode } from "../src/tastemaker/types.js";
import type { LabExperimentEntry } from "./lab/validate-experiments.js";
import {
  labBadgeForRepo,
  type LabBadgeInfo,
} from "./lab/lab-tested-badge.js";
import { loadExperimentsFile } from "./lab/validate-experiments.js";
export interface HomeIndexPaths {
  brief: (date: string) => string;
  subscribe: string;
  lab: string;
  editionNav: { ossHref: string; skillsHref: string };
}

export interface HomeWrapUpArchive {
  weeklyLatest?: string;
  weekHref: (weekId: string) => string;
}

/** Agent hosts and tools matched in brief copy (longest phrases first). */
export const WORKS_WITH_TOOL_PHRASES = [
  "Claude Code",
  "Gemini CLI",
  "Grok Build",
  "GitHub Copilot",
  "Windsurf",
  "Codex",
  "Cursor",
  "Copilot",
  "Claude",
] as const;

export const HOME_EDITION_TAGLINES: Record<EditionId, string> = {
  oss: "New open source AI projects, picked daily",
  skills: "New AI agent skills, picked daily",
};

export const HOME_HERO_HEADLINES: Record<EditionId, string> = {
  oss: "The 10 open source AI projects taking off right now",
  skills: "The AI agent skills taking off right now",
};

export const HOME_HERO_SUBLINES: Record<EditionId, string> = {
  oss:
    "Every morning, AI Tastemakers picks the 10 open source AI projects gaining the most GitHub stars this week, so fast risers beat old favorites. Each pick gets a short brief on what it does and why it matters now. Built for builders deciding what to try next.",
  skills:
    "Every morning, Skill Tastemakers picks the agent skills gaining the most GitHub stars this week. Skills are add-ons that teach tools like Claude Code, Cursor, or Codex something new. Each pick gets a short brief and one thing a builder can try today.",
};

const METHOD_DETAILS: Record<EditionId, string> = {
  oss:
    "Each morning, Tastemakers checks GitHub for open source AI projects, like tools, agents and frameworks, that are built on top of AI models rather than being the models themselves. It ranks them by new stars over the last 7 days, picks the top 10, and writes a short brief for each one. The whole thing runs on its own and publishes here daily.",
  skills:
    "Each morning, Skill Tastemakers checks GitHub for skills and add-ons for AI agents. It ranks them by new stars over the last 7 days, skips most of the picks you already saw recently so the list stays fresh, and writes a short brief for each one. The whole thing runs on its own and publishes here daily. Some projects show up on both lists, because each list asks a different question.",
};

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Tools explicitly named in brief text (max 3 shown plus +N more). */
export function extractWorksWithTools(briefText: string): string[] {
  if (!briefText.trim()) return [];
  let scratch = briefText;
  const found: string[] = [];
  for (const tool of WORKS_WITH_TOOL_PHRASES) {
    const re = new RegExp(escapeRegExp(tool), "i");
    if (re.test(scratch)) {
      found.push(tool);
      scratch = scratch.replace(re, " ");
    }
  }
  return found;
}

export function formatWorksWithLine(tools: string[]): {
  title: string;
  display: string;
  empty: boolean;
} {
  if (tools.length === 0) {
    return { title: "", display: "", empty: true };
  }
  const title = tools.join(", ");
  const shown = tools.slice(0, 3);
  const extra = tools.length - shown.length;
  const display =
    extra > 0
      ? `${shown.join(", ")} +${extra} more`
      : shown.join(", ");
  return { title, display, empty: false };
}

export function countLabDoneExperiments(experiments: readonly LabExperimentEntry[]): number {
  return experiments.filter((e) => e.status === "done").length;
}

export function isoWeekDateRangeLabel(weekId: string): string | null {
  const m = /^(\d{4})-W(\d{2})$/.exec(weekId.trim());
  if (!m) return null;
  const year = Number(m[1]);
  const week = Number(m[2]);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const day = jan4.getUTCDay() || 7;
  const mondayWeek1 = new Date(jan4);
  mondayWeek1.setUTCDate(jan4.getUTCDate() - day + 1);
  const monday = new Date(mondayWeek1);
  monday.setUTCDate(mondayWeek1.getUTCDate() + (week - 1) * 7);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const monthFmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const monMonth = monthFmt(monday);
  const sunMonth = monthFmt(sunday);
  if (monMonth === sunMonth) {
    return `${monMonth} ${monday.getUTCDate()} to ${sunday.getUTCDate()}`;
  }
  return `${monMonth} ${monday.getUTCDate()} to ${sunMonth} ${sunday.getUTCDate()}`;
}

export function formatHomePickDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function stripMarkdownInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Home copy gate: no em dashes in visible homepage text. */
export function sanitizeHomeVisibleText(text: string): string {
  return text
    .replace(/\u2014/g, ", ")
    .replace(/—/g, ", ")
    .replace(/\s+,/g, ",")
    .replace(/,\s+/g, ", ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function briefSummaryForPick(brief: string | null | undefined, maxLen = 200): string {
  if (!brief?.trim()) return "";
  const blocks = brief.split(/\n\n+/);
  let first = stripMarkdownInline(blocks[0] ?? brief);
  first = first.replace(/^What it does:\s*/i, "");
  first = sanitizeHomeVisibleText(first);
  if (first.length <= maxLen) return first;
  const cut = first.slice(0, maxLen - 1).replace(/\s+\S*$/, "");
  return `${cut}…`;
}

function formatPickStars(repo: DigestRepo, mode: RankingMode): string {
  if (mode === "bootstrap_total_stars") {
    return `★ ${repo.stars.toLocaleString()} total`;
  }
  return `+${repo.stars_gained_7d.toLocaleString()} stars in 7 days`;
}

function repoNameHtml(fullName: string, escapeHtml: (t: string) => string): string {
  const slash = fullName.indexOf("/");
  if (slash === -1) {
    return `<span class="nw">${escapeHtml(fullName)}</span>`;
  }
  const owner = fullName.slice(0, slash + 1);
  const repo = fullName.slice(slash + 1);
  return `<span class="nw">${escapeHtml(owner)}</span><wbr><span class="nw">${escapeHtml(repo)}</span>`;
}

function worksWithHtml(
  tools: string[],
  escapeHtml: (t: string) => string,
): string {
  const { title, display, empty } = formatWorksWithLine(tools);
  if (empty) {
    return `<span class="wwl" aria-hidden="true"></span>`;
  }
  return `<span class="wwl muted" title="Works with ${escapeHtml(title)}"><span aria-hidden="true">🧰</span> <span class="wwk">Works with</span> <span class="wwt">${escapeHtml(display)}</span></span>`;
}

function pickCardHtml(
  repo: DigestRepo,
  rank: number,
  briefHref: string,
  digest: Digest,
  badgeLookup: ReadonlyMap<string, LabBadgeInfo>,
  escapeHtml: (t: string) => string,
): string {
  const liClassAttr = rank > 3 ? ' class="d"' : "";
  const labBadge = labBadgeForRepo(badgeLookup, repo.full_name);
  const labLabel = labBadge
    ? `<span class="labl">Lab tested</span>`
    : "";
  const tools = extractWorksWithTools(repo.brief ?? "");
  const summary = escapeHtml(briefSummaryForPick(repo.brief));
  return `<li${liClassAttr}><a class="card" href="${escapeHtml(briefHref)}" data-index-cta="today_pick" data-rank="${rank}"><span class="rk">#${rank}${labLabel}</span><span class="rn">${repoNameHtml(repo.full_name, escapeHtml)}</span><span class="st">${escapeHtml(formatPickStars(repo, digest.ranking_mode))}</span>${worksWithHtml(tools, escapeHtml)}<p class="sum muted">${summary}</p></a></li>`;
}

export async function loadDigestForDate(
  briefingsDir: string,
  date: string,
): Promise<Digest | null> {
  try {
    const raw = await fs.readFile(path.join(briefingsDir, date, "digest.json"), "utf8");
    return JSON.parse(raw) as Digest;
  } catch {
    return null;
  }
}

function rowLink(
  href: string,
  cta: string,
  label: string,
  escapeHtml: (t: string) => string,
): string {
  return `<a href="${escapeHtml(href)}" class="tl" data-index-cta="${escapeHtml(cta)}">${escapeHtml(label)} &rarr;</a>`;
}

function archiveLinksHtml(edition: EditionId): string {
  const daysHref = "briefings/index.html";
  const weeklyHref = edition === "skills" ? "../weekly/index.html" : "weekly/index.html";
  const monthlyHref = edition === "skills" ? "../monthly/index.html" : "monthly/index.html";
  const link = (href: string, cta: string, label: string) =>
    `<a href="${href}" class="tl" data-index-cta="${cta}">${label}</a>`;
  return `<div class="arch">${link(daysHref, "archive_days", "Days")}${link(weeklyHref, "weekly_index", "Weekly reviews")}${link(monthlyHref, "monthly_index", "Monthly rollups")}</div>`;
}

function labRowBody(edition: EditionId, doneCount: number): string {
  if (edition === "skills") {
    return "Ponytail and Humanizer are two of the skills tested in the open here, results and all.";
  }
  const n = doneCount;
  const testWord = n === 1 ? "test" : "tests";
  return `Tastemakers doesn't just report on AI tools. It tests them, with ${n} ${testWord} done so far.`;
}

function weeklyRowBody(edition: EditionId, weekId: string | undefined): string {
  const range = weekId ? isoWeekDateRangeLabel(weekId) : null;
  const label = range ?? "This week";
  if (edition === "skills") {
    return `${label}: the week's standout agent skills and one thing worth trying from each.`;
  }
  return `${label}: the week's biggest open source AI projects and what builders can take from them.`;
}

function archiveRowBody(edition: EditionId): string {
  if (edition === "skills") {
    return "Every daily skills list, weekly review, and monthly rollup since June, all in one place.";
  }
  return "Every daily list, weekly review, and monthly rollup since June, all in one place.";
}

function crossEditionRow(edition: EditionId, paths: HomeIndexPaths): { body: string; href: string; label: string } {
  if (edition === "skills") {
    return {
      body: "AI Tastemakers tracks the open source AI projects taking off right now, updated every morning.",
      href: paths.editionNav.ossHref,
      label: "See the AI list",
    };
  }
  return {
    body: "Skill Tastemakers picks the add-ons that teach AI agents new tricks, fresh every morning.",
    href: paths.editionNav.skillsHref,
    label: "See the Skills list",
  };
}

function methodRowBody(edition: EditionId): string {
  if (edition === "skills") {
    return "Skills are ranked by new GitHub stars in the last 7 days, with recent repeats pushed down.";
  }
  return "Picks are ranked by new GitHub stars in the last 7 days, so fast risers win.";
}

function homeRowsHtml(
  edition: EditionId,
  paths: HomeIndexPaths,
  wrapUp: HomeWrapUpArchive | undefined,
  doneCount: number,
  escapeHtml: (t: string) => string,
): string {
  const weekId = wrapUp?.weeklyLatest;
  const weekHref = weekId && wrapUp ? wrapUp.weekHref(weekId) : "#";
  const cross = crossEditionRow(edition, paths);
  const rows: Array<{ emoji: string; label: string; body: string; action: string }> = [
    {
      emoji: "🧪",
      label: "The Lab",
      body: labRowBody(edition, doneCount),
      action: rowLink(paths.lab, "lab_line", "See the tests", escapeHtml),
    },
    {
      emoji: "📅",
      label: "This week",
      body: weeklyRowBody(edition, weekId),
      action: weekId ? rowLink(weekHref, "weekly", "Read the review", escapeHtml) : "",
    },
    {
      emoji: "🗃️",
      label: "Archive",
      body: archiveRowBody(edition),
      action: archiveLinksHtml(edition),
    },
    {
      emoji: "👯",
      label: "Also from Tastemakers",
      body: cross.body,
      action: rowLink(cross.href, "cross_edition", cross.label, escapeHtml),
    },
    {
      emoji: "🧭",
      label: "Method",
      body: methodRowBody(edition),
      action: `<details><summary>How picks are chosen</summary><p class="muted">${escapeHtml(METHOD_DETAILS[edition])}</p></details>`,
    },
  ];

  const parts = rows
    .map((row) => {
      const dt = `<span class="em" aria-hidden="true">${row.emoji}</span> ${escapeHtml(row.label)}`;
      return `<div class="row"><dt>${dt}</dt><dd><p>${escapeHtml(row.body)}</p>${row.action}</dd></div>`;
    })
    .join("");

  return `<section class="sec" aria-label="More from Tastemakers"><dl class="rows">${parts}</dl></section>`;
}

export function homeHashRedirectScript(edition: EditionId): string {
  const archiveTarget =
    edition === "skills" ? "briefings/index.html" : "briefings/index.html";
  return `<script>
(function () {
  var map = {
    "#archive": "${archiveTarget}",
    "#weekly-archive": ${edition === "skills" ? '"../weekly/index.html"' : '"weekly/index.html"'},
    "#monthly-archive": ${edition === "skills" ? '"../monthly/index.html"' : '"monthly/index.html"'}
  };
  var hash = window.location.hash;
  if (map[hash]) {
    window.location.replace(map[hash]);
  }
})();
</script>`;
}

export async function buildHomeIndexMainHtml(options: {
  edition: EditionId;
  paths: HomeIndexPaths;
  latestDate?: string;
  briefingsDir: string;
  badgeLookup: ReadonlyMap<string, LabBadgeInfo>;
  wrapUp?: HomeWrapUpArchive;
  escapeHtml: (t: string) => string;
  repoRoot: string;
}): Promise<string> {
  const {
    edition,
    paths,
    latestDate,
    briefingsDir,
    badgeLookup,
    wrapUp,
    escapeHtml,
    repoRoot,
  } = options;

  const experiments = loadExperimentsFile(repoRoot).experiments;
  const doneCount = countLabDoneExperiments(experiments);

  const hero = `<section class="hero sec"><h1>${escapeHtml(HOME_HERO_HEADLINES[edition])}</h1><p class="muted">${escapeHtml(HOME_HERO_SUBLINES[edition])}</p>
<div class="ctas">${latestDate ? `<a href="${paths.brief(latestDate)}" class="btn btn-p" data-index-cta="today_brief">Read today&rsquo;s picks</a>` : ""}${edition === "oss" || edition === "skills" ? `<a href="${paths.subscribe}" class="btn btn-s" data-index-cta="subscribe">Get the daily email</a>` : ""}</div></section>`;

  let picksSection = "";
  if (latestDate) {
    const digest = await loadDigestForDate(briefingsDir, latestDate);
    if (digest?.repos?.length) {
      const top = digest.repos.filter((r) => r.rank >= 1 && r.rank <= 5).sort((a, b) => a.rank - b.rank);
      const cards = top
        .map((repo) =>
          pickCardHtml(repo, repo.rank, paths.brief(latestDate), digest, badgeLookup, escapeHtml),
        )
        .join("");
      picksSection = `<section class="sec" aria-labelledby="pk"><h2 class="h" id="pk">${escapeHtml(formatHomePickDate(latestDate))}</h2><ol class="picks">${cards}</ol><a href="${paths.brief(latestDate)}" class="more" data-index-cta="see_all">See all 10 &rarr;</a></section>`;
    }
  }

  const rows = homeRowsHtml(edition, paths, wrapUp, doneCount, escapeHtml);

  return `<div class="home-index-main">${hero}${picksSection}${rows}${homeHashRedirectScript(edition)}</div>`;
}
