import fs from "node:fs";
import path from "node:path";
import {
  isLowercaseOwnerRepoSourceRef,
  loadExperimentsFile,
  type LabExperimentEntry,
  type LabExperimentStatus,
} from "./validate-experiments.js";
import { listLabWriteupPostIds } from "./lab-format.js";
import type { EditionId } from "../../src/tastemaker/editions.js";
import { resolveLabBadgeHrefForDigestCard } from "./lab-post-header.js";

export type LabBadgeStatus = "done" | "running";

export interface LabBadgeInfo {
  id: string;
  title: string;
  status: LabBadgeStatus;
  /** Lowercase owner/repo key used for digest matching. */
  repoKey: string;
}

export function normalizeOwnerRepoKey(fullName: string): string {
  return fullName.trim().toLowerCase();
}

export function isOwnerRepoSourceRef(sourceRepo: string): boolean {
  return isLowercaseOwnerRepoSourceRef(sourceRepo);
}

function badgeStatus(status: LabExperimentStatus): LabBadgeStatus | null {
  if (status === "done" || status === "running") return status;
  return null;
}

/** Most recent experiment per sourceRepo (owner/repo, exact lowercase key). */
export function buildLabBadgeLookup(
  experiments: readonly LabExperimentEntry[],
): Map<string, LabBadgeInfo> {
  const grouped = new Map<string, LabExperimentEntry[]>();
  for (const exp of experiments) {
    const raw = exp.sourceRepo?.trim();
    if (!raw || !isOwnerRepoSourceRef(raw)) continue;
    const st = badgeStatus(exp.status);
    if (!st) continue;
    const key = normalizeOwnerRepoKey(raw);
    const list = grouped.get(key) ?? [];
    list.push(exp);
    grouped.set(key, list);
  }

  const out = new Map<string, LabBadgeInfo>();
  for (const [key, list] of grouped) {
    const picked = [...list].sort((a, b) => (b.start ?? "").localeCompare(a.start ?? ""))[0]!;
    const st = badgeStatus(picked.status)!;
    out.set(key, {
      id: picked.id,
      title: picked.label.trim(),
      status: st,
      repoKey: key,
    });
  }
  return out;
}

export function loadLabBadgeLookup(repoRoot: string): Map<string, LabBadgeInfo> {
  const file = loadExperimentsFile(repoRoot);
  return buildLabBadgeLookup(file.experiments);
}

export function labBadgeForRepo(
  lookup: ReadonlyMap<string, LabBadgeInfo>,
  fullName: string,
): LabBadgeInfo | null {
  return lookup.get(normalizeOwnerRepoKey(fullName)) ?? null;
}

export function resolveLabBadgeHref(
  badge: LabBadgeInfo,
  labPrefix: string,
  writeupPostIds: readonly string[],
): string {
  const base = labPrefix.endsWith("/") ? labPrefix : `${labPrefix}/`;
  if (writeupPostIds.includes(badge.id)) {
    return `${base}posts/${badge.id}.html`;
  }
  return `${base}index.html#lab-exp-${badge.id}`;
}

/** Absolute site path for email /go dest= (from origin, includes publish prefix). */
export function labBadgeSiteDestPath(
  siteUrl: string,
  badge: LabBadgeInfo,
  writeupPostIds: readonly string[],
): string {
  let pathname = "";
  try {
    pathname = new URL(siteUrl).pathname.replace(/\/+$/, "");
  } catch {
    pathname = "";
  }
  const rel = resolveLabBadgeHref(badge, "lab/", writeupPostIds);
  return `${pathname}/${rel}`.replace(/\/{2,}/g, "/");
}

export function loadLabWriteupPostIds(repoRoot: string): string[] {
  return listLabWriteupPostIds(repoRoot);
}

/** Every badged experiment must resolve to a built post or a lab home history anchor. */
export function findBadgedExperimentDestinationViolations(
  repoRoot: string,
  siteRoot: string,
): string[] {
  const writeups = new Set(loadLabWriteupPostIds(repoRoot));
  const indexPath = path.join(siteRoot, "lab", "index.html");
  if (!fs.existsSync(indexPath)) {
    return ["missing site/lab/index.html (run npm run build:pages first)"];
  }
  const indexHtml = fs.readFileSync(indexPath, "utf8");
  const violations: string[] = [];
  const seen = new Set<string>();
  for (const badge of loadLabBadgeLookup(repoRoot).values()) {
    if (seen.has(badge.id)) continue;
    seen.add(badge.id);
    const hasPost = writeups.has(badge.id);
    const hasAnchor = indexHtml.includes(`id="lab-exp-${badge.id}"`);
    if (!hasPost && !hasAnchor) {
      violations.push(
        `${badge.id}: badged experiment has neither write up post nor lab-exp anchor on index`,
      );
    }
  }
  return violations;
}

const FLASK_SVG = `<svg class="lab-tested-badge__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 3h6v7l4 9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2l4-9V3z"/><path d="M9 3h6"/><path d="M7 14h10"/></svg>`;

/** Temporary gate fixture: Running badge beside Done Ponytail. */
export const LAB_BADGE_RUNNING_FIXTURE_REPO = "PlaceholderOrg/humanizer-polish-skills";
export const LAB_BADGE_RUNNING_FIXTURE_EXP_ID = "EXP-20260913-humanizer-polish-skills";

function badgeVisibleLabel(status: LabBadgeStatus): string {
  return status === "running" ? "In the Lab" : "Lab tested";
}

function badgeAriaLabel(_status: LabBadgeStatus, title: string): string {
  return `Tested in the Lab. Read the ${title} experiment`;
}

export function renderLabTestedBadgePagesHtml(
  badge: LabBadgeInfo,
  href: string,
  escape: (t: string) => string,
): string {
  const label = badgeVisibleLabel(badge.status);
  const mod = badge.status === "running" ? "lab-tested-badge--running" : "lab-tested-badge--done";
  const aria = escape(badgeAriaLabel(badge.status, badge.title));
  return `<a href="${escape(href)}" class="digest-repo-card__lab-badge lab-tested-badge lab-tested-badge--action ${mod}" aria-label="${aria}" data-lab-badge-exp="${escape(badge.id)}" data-lab-badge-status="${badge.status}" data-lab-badge-source-repo="${escape(badge.repoKey)}">${FLASK_SVG}<span class="lab-tested-badge__text">${escape(label)}</span></a>`;
}

/** Non-interactive Lab tested chip on experiment write-up pages (digest badges stay links). */
export function renderLabTestedBadgePostHeaderChipHtml(
  badge: LabBadgeInfo,
  escape: (t: string) => string,
): string {
  const label = badgeVisibleLabel(badge.status);
  const mod = badge.status === "running" ? "lab-tested-badge--running" : "lab-tested-badge--done";
  const aria = escape(badgeAriaLabel(badge.status, badge.title));
  return `<span class="lab-tested-badge lab-tested-badge--post ${mod}" role="status" aria-label="${aria}" aria-current="page" data-lab-badge-exp="${escape(badge.id)}" data-lab-badge-status="${badge.status}" data-lab-badge-source-repo="${escape(badge.repoKey)}">${FLASK_SVG}<span class="lab-tested-badge__text">${escape(label)}</span></span>`;
}

export function labBadgeEmailFlaskSrc(siteUrl: string): string {
  const trimmed = siteUrl.replace(/\/+$/, "");
  return `${trimmed}/assets/lab-flask-email.png`;
}

/** Status pill beside View on GitHub in digest email (not a primary action). */
export function renderLabTestedBadgeEmailPillHtml(
  badge: LabBadgeInfo,
  href: string,
  siteUrl: string,
  escape: (t: string) => string,
): string {
  const label = badgeVisibleLabel(badge.status);
  const isRunning = badge.status === "running";
  const border = isRunning ? "#1e40af" : "#d6d3d1";
  const color = isRunning ? "#1e40af" : "#44403c";
  const bg = isRunning ? "transparent" : "#f5f5f4";
  const img = escape(labBadgeEmailFlaskSrc(siteUrl));
  return `<a href="${escape(href)}" style="display:inline-block;padding:2px 10px;border:1px solid ${border};border-radius:9999px;background-color:${bg};color:${color};font-family:system-ui,sans-serif;font-size:12px;font-weight:600;line-height:20px;text-decoration:none;vertical-align:middle;white-space:nowrap;"><img src="${img}" alt="" width="12" height="12" style="display:inline-block;vertical-align:middle;margin-right:4px;border:0;" />${escape(label)}</a>`;
}

/** Sibling table cell for digest email button row (transparent, 8px left gap). */
export function renderLabTestedBadgeEmailPillCellHtml(
  badge: LabBadgeInfo,
  href: string,
  siteUrl: string,
  escape: (t: string) => string,
): string {
  const pill = renderLabTestedBadgeEmailPillHtml(badge, href, siteUrl, escape);
  return `<td style="padding:0 0 0 8px;vertical-align:middle;background-color:transparent;">${pill}</td>`;
}

/** @deprecated Use renderLabTestedBadgeEmailPillHtml */
export function renderLabTestedBadgeEmailButtonHtml(
  badge: LabBadgeInfo,
  href: string,
  escape: (t: string) => string,
): string {
  return renderLabTestedBadgeEmailPillHtml(badge, href, "https://example.com", escape);
}

/** Muted inline chip when email layout has no GitHub button row. */
export function renderLabTestedBadgeEmailHtml(
  badge: LabBadgeInfo,
  href: string,
  escape: (t: string) => string,
): string {
  const label = badgeVisibleLabel(badge.status);
  const style =
    "display:inline-block;margin-left:6px;padding:2px 8px;border-radius:9999px;border:1px solid #d6d3d1;background:#f5f5f4;color:#57534e;font-family:system-ui,-apple-system,sans-serif;font-size:12px;font-weight:600;line-height:16px;text-decoration:none;vertical-align:middle;white-space:nowrap;";
  return `<a href="${escape(href)}" style="${style}">${escape(label)}</a>`;
}

export function renderLabTestedBadgePlainSuffix(badge: LabBadgeInfo): string {
  return ` (${badgeVisibleLabel(badge.status)})`;
}

/** Scan built HTML for lab-tested badges and validate against experiments + href rules. */
export function findLabTestedBadgeViolations(
  html: string,
  pageAbsPath: string,
  repoRoot: string,
  resolveHref: (badge: LabBadgeInfo, fromPageAbs: string) => string | null,
): string[] {
  const violations: string[] = [];
  const pageRel = path.relative(repoRoot, pageAbsPath);
  const lookupById = new Map<string, LabBadgeInfo>();
  for (const b of loadLabBadgeLookup(repoRoot).values()) lookupById.set(b.id, b);

  for (const m of html.matchAll(/<a\b[^>]*\blab-tested-badge\b[^>]*>([\s\S]*?)<\/a>/gi)) {
    const badgeStart = m.index ?? 0;
    const block = m[0] ?? "";
    const inner = m[1] ?? "";
    const expId = /data-lab-badge-exp="([^"]+)"/.exec(block)?.[1];
    const status = /data-lab-badge-status="(done|running)"/.exec(block)?.[1] as
      | LabBadgeStatus
      | undefined;
    const href = /href="([^"]+)"/.exec(block)?.[1]?.replace(/&amp;/g, "&");
    const textOnly = inner.replace(/<[^>]+>/g, "").trim();

    if (!expId) {
      violations.push(`${pageRel}: badge missing experiment id`);
      continue;
    }
    const badge = lookupById.get(expId);
    if (!badge) {
      violations.push(`${pageRel}: unknown experiment id on badge ${expId}`);
      continue;
    }
    if (!status || badge.status !== status) {
      violations.push(`${pageRel}: badge status mismatch for ${expId}`);
    }
    if (textOnly.includes("-")) {
      violations.push(`${pageRel}: badge copy contains dash for ${expId}`);
    }
    const cardCtx = digestCardAttributionBeforeIndex(html, badgeStart);
    const expectedHref =
      cardCtx != null
        ? resolveLabBadgeHrefForDigestCard(
            badge,
            labPrefixFromBriefingPage(pageAbsPath, siteRootFromRepo(repoRoot)),
            loadLabWriteupPostIds(repoRoot),
            cardCtx.section,
            cardCtx.rank,
          )
        : resolveHref(badge, pageAbsPath);
    if (!expectedHref || !href || href !== expectedHref) {
      violations.push(`${pageRel}: badge href mismatch for ${expId}`);
    }
  }
  return violations;
}

function siteRootFromRepo(repoRoot: string): string {
  return path.join(repoRoot, "site");
}

export function digestCardAttributionBeforeIndex(
  html: string,
  badgeIndex: number,
): { section: EditionId; rank: number } | null {
  const prefix = html.slice(Math.max(0, badgeIndex - 6000), badgeIndex);
  const re =
    /data-section="(oss|skills)"[^>]*data-position="(\d+)"|data-position="(\d+)"[^>]*data-section="(oss|skills)"/g;
  let last: { section: EditionId; rank: number } | null = null;
  for (const match of prefix.matchAll(re)) {
    if (match[1] && match[2]) {
      last = { section: match[1] as EditionId, rank: Number.parseInt(match[2], 10) };
    } else if (match[3] && match[4]) {
      last = { section: match[4] as EditionId, rank: Number.parseInt(match[3], 10) };
    }
  }
  if (!last || !Number.isFinite(last.rank)) return null;
  return last;
}

export function ponytailDoneFixturePresent(html: string): boolean {
  return (
    html.includes("DietrichGebert/ponytail") &&
    html.includes("lab-tested-badge") &&
    html.includes("data-lab-badge-exp=\"EXP-20260802-ponytail-narration-skills\"")
  );
}

export function runningBadgeFixtureMarkupValid(html: string): boolean {
  return (
    html.includes(`data-lab-badge-exp="${LAB_BADGE_RUNNING_FIXTURE_EXP_ID}"`) &&
    html.includes("lab-tested-badge--running") &&
    html.includes("In the Lab") &&
    html.includes("digest-repo-card__actions")
  );
}

/** Build HTML snippet for verify gate Running fixture (not shipped on site). */
export function renderRunningBadgeFixtureCard(
  repoRoot: string,
  escapeHtml: (t: string) => string,
  renderCard: (
    repo: {
      rank: number;
      full_name: string;
      html_url: string;
      stars: number;
      stars_gained_7d: number;
      topics: string[];
      language: string;
      brief: string;
      pushed_at: string;
    },
    ctx: { lookup: Map<string, LabBadgeInfo>; labPrefix: string; writeupPostIds: string[] },
  ) => string,
): string {
  const exp = loadExperimentsFile(repoRoot).experiments.find(
    (e) => e.id === LAB_BADGE_RUNNING_FIXTURE_EXP_ID,
  );
  if (!exp) {
    throw new Error("missing Humanizer experiment for Running fixture");
  }
  const lookup = loadLabBadgeLookup(repoRoot);
  lookup.set(normalizeOwnerRepoKey(LAB_BADGE_RUNNING_FIXTURE_REPO), {
    id: exp.id,
    title: exp.label.trim(),
    status: "running",
    repoKey: normalizeOwnerRepoKey(LAB_BADGE_RUNNING_FIXTURE_REPO),
  });
  return renderCard(
    {
      rank: 2,
      full_name: LAB_BADGE_RUNNING_FIXTURE_REPO,
      html_url: "https://github.com/PlaceholderOrg/humanizer-polish-skills",
      stars: 1,
      stars_gained_7d: 1,
      topics: [],
      language: "TS",
      brief: "Fixture",
      pushed_at: "2026-10-19",
    },
    { lookup, labPrefix: "../lab/", writeupPostIds: [] },
  );
}

export function labPrefixFromBriefingPage(pageAbsPath: string, siteRoot: string): string {
  const rel = path.relative(siteRoot, path.dirname(pageAbsPath));
  const depth = rel.split(path.sep).filter(Boolean).length;
  return `${ "../".repeat(depth) }lab/`.replace(/\/+/g, "/");
}

export function resolveBadgeHrefForBuiltPage(
  badge: LabBadgeInfo,
  pageAbsPath: string,
  repoRoot: string,
  siteRoot: string,
): string {
  const writeups = loadLabWriteupPostIds(repoRoot);
  const prefix = labPrefixFromBriefingPage(pageAbsPath, siteRoot);
  return resolveLabBadgeHref(badge, prefix, writeups);
}
