import fs from "node:fs";
import path from "node:path";
import {
  loadExperimentsFile,
  type LabExperimentEntry,
  type LabExperimentStatus,
} from "./validate-experiments.js";
import { listLabWriteupPostIds } from "./lab-format.js";

export type LabBadgeStatus = "done" | "running";

export interface LabBadgeInfo {
  id: string;
  title: string;
  status: LabBadgeStatus;
  /** Lowercase owner/repo key used for digest matching. */
  repoKey: string;
}

const OWNER_REPO_RE = /^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/;

export function normalizeOwnerRepoKey(fullName: string): string {
  return fullName.trim().toLowerCase();
}

export function isOwnerRepoSourceRef(sourceRepo: string): boolean {
  return OWNER_REPO_RE.test(sourceRepo.trim());
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
  if (badge.status === "done") {
    return `${base}index.html#lab-exp-${badge.id}`;
  }
  return `${base}index.html#${badge.id}`;
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

const FLASK_SVG = `<svg class="lab-tested-badge__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 3h6v7l4 9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2l4-9V3z"/><path d="M9 3h6"/><path d="M7 14h10"/></svg>`;

/** Temporary gate fixture: Running badge beside Done Ponytail. */
export const LAB_BADGE_RUNNING_FIXTURE_REPO = "PlaceholderOrg/humanizer-polish-skills";
export const LAB_BADGE_RUNNING_FIXTURE_EXP_ID = "EXP-20260913-humanizer-polish-skills";

function badgeVisibleLabel(status: LabBadgeStatus): string {
  return status === "running" ? "In the Lab" : "Lab tested";
}

function badgeAriaLabel(status: LabBadgeStatus, title: string): string {
  return status === "running" ? `In the Lab: ${title}` : `Lab tested: ${title}`;
}

export function renderLabTestedBadgePagesHtml(
  badge: LabBadgeInfo,
  href: string,
  escape: (t: string) => string,
): string {
  const label = badgeVisibleLabel(badge.status);
  const mod = badge.status === "running" ? "lab-tested-badge--running" : "lab-tested-badge--done";
  const aria = escape(badgeAriaLabel(badge.status, badge.title));
  const titleAttr = escape(badge.title);
  return `<a href="${escape(href)}" class="digest-repo-card__lab-badge lab-tested-badge lab-tested-badge--action ${mod}" aria-label="${aria}" title="${titleAttr}" data-lab-badge-exp="${escape(badge.id)}" data-lab-badge-status="${badge.status}">${FLASK_SVG}<span class="lab-tested-badge__text">${escape(label)}</span></a>`;
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
  return `<a href="${escape(href)}" style="display:inline-block;margin-left:8px;padding:2px 10px;border:1px solid ${border};border-radius:9999px;background-color:${bg};color:${color};font-family:system-ui,sans-serif;font-size:12px;font-weight:600;line-height:20px;text-decoration:none;vertical-align:middle;white-space:nowrap;"><img src="${img}" alt="" width="12" height="12" style="display:inline-block;vertical-align:middle;margin-right:4px;border:0;" />${escape(label)}</a>`;
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
    const expectedHref = resolveHref(badge, pageAbsPath);
    if (!expectedHref || !href || href !== expectedHref) {
      violations.push(`${pageRel}: badge href mismatch for ${expId}`);
    }
  }
  return violations;
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
