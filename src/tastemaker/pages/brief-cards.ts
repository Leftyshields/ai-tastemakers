import type { EditionId } from "../editions.js";
import type { Digest, DigestRepo, RankingMode } from "../types.js";
import { newRepoMarkdownSuffix } from "../writers/new-badge.js";
import { renderSafeMarkdown } from "../../../scripts/safe-markdown.js";
import {
  labBadgeForRepo,
  renderLabTestedBadgePagesHtml,
  resolveLabBadgeHref,
  type LabBadgeInfo,
} from "../../../scripts/lab/lab-tested-badge.js";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function splitDailyBriefMarkdown(markdown: string): { headerMarkdown: string; bodyMarkdown: string } {
  const match = /\n##\s+\d+\.\s+/m.exec(markdown);
  if (!match || match.index == null) {
    return { headerMarkdown: markdown.trim(), bodyMarkdown: "" };
  }
  return {
    headerMarkdown: markdown.slice(0, match.index).trim(),
    bodyMarkdown: markdown.slice(match.index).trim(),
  };
}

function formatStars(repo: DigestRepo, mode: RankingMode): string {
  if (mode === "bootstrap_total_stars") {
    return `★ ${repo.stars.toLocaleString()} total`;
  }
  return `★ ${repo.stars.toLocaleString()} (+${repo.stars_gained_7d} this week)`;
}

function formatTopics(topics: string[]): string {
  if (topics.length === 0) return "—";
  const limit = 5;
  const shown = topics.slice(0, limit);
  const suffix = topics.length > limit ? "…" : "";
  return shown.join(", ") + suffix;
}

function formatMeta(repo: DigestRepo, mode: RankingMode): string {
  const language = repo.language?.trim();
  const langPart = language ? ` · ${language}` : "";
  return `${formatStars(repo, mode)}${langPart} · ${formatTopics(repo.topics)}`;
}

function newBadgeHtml(isNew?: boolean): string {
  if (!isNew) return "";
  return `<span class="new-repo-badge">New</span>`;
}

export interface DigestRepoCardBadgeContext {
  lookup: ReadonlyMap<string, LabBadgeInfo>;
  labPrefix: string;
  writeupPostIds: readonly string[];
}

export function renderDigestRepoCard(
  repo: DigestRepo,
  section: EditionId,
  digestDate: string,
  rankingMode: RankingMode,
  escape: (t: string) => string = escapeHtml,
  badgeContext?: DigestRepoCardBadgeContext,
): string {
  const githubUrl = escape(repo.html_url);
  const meta = escape(formatMeta(repo, rankingMode));
  const briefHtml = repo.brief
    ? `<div class="digest-repo-card__body brief-content prose prose-stone max-w-none dark:prose-invert prose-sm prose-a:text-blue-800 dark:prose-a:text-blue-400">${renderSafeMarkdown(repo.brief)}</div>`
    : `<p class="digest-repo-card__body mb-0 text-stone-500">—</p>`;
  const ariaLabel = escape(`View ${repo.full_name} on GitHub`);

  let labBadgeHtml = "";
  if (badgeContext && repo.rank <= 10) {
    const badge = labBadgeForRepo(badgeContext.lookup, repo.full_name);
    if (badge) {
      const href = resolveLabBadgeHref(badge, badgeContext.labPrefix, badgeContext.writeupPostIds);
      labBadgeHtml = renderLabTestedBadgePagesHtml(badge, href, escape);
    }
  }

  const actionsRow = labBadgeHtml
    ? `<div class="digest-repo-card__actions flex flex-wrap items-center gap-2">${`<a href="${githubUrl}" class="digest-repo-card__cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-800 px-4 py-2.5 font-sans text-sm font-semibold text-white no-underline transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500" target="_blank" rel="noopener" aria-label="${ariaLabel}">View on GitHub <span class="digest-repo-card__cta-icon ml-1.5" aria-hidden="true">↗</span></a>`}${labBadgeHtml}</div>`
    : `<a href="${githubUrl}" class="digest-repo-card__cta inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-800 px-4 py-2.5 font-sans text-sm font-semibold text-white no-underline transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500" target="_blank" rel="noopener" aria-label="${ariaLabel}">View on GitHub <span class="digest-repo-card__cta-icon ml-1.5" aria-hidden="true">↗</span></a>`;

  return `<article class="digest-repo-card group relative mb-8 cursor-pointer rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-blue-600" data-repo="${escape(repo.full_name)}" data-section="${section}" data-position="${repo.rank}" data-digest-date="${escape(digestDate)}">
  <h2 class="digest-repo-card__heading mb-2 scroll-mt-20 font-sans text-lg font-semibold tracking-tight">
    <span class="mr-1 text-stone-500">${repo.rank}.</span>
    <a href="${githubUrl}" class="digest-repo-card__title-link text-blue-800 no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-400" target="_blank" rel="noopener">${escape(repo.full_name)}</a>${newBadgeHtml(repo.is_new)}
  </h2>
  <p class="digest-repo-card__meta mb-3 font-sans text-sm text-stone-500 dark:text-stone-400">${meta}</p>
  ${briefHtml}
  <footer class="digest-repo-card__footer relative z-[1] mt-4">
    ${actionsRow}
  </footer>
</article>`;
}

export function renderDigestBriefArticle(
  digest: Digest,
  digestDate: string,
  section: EditionId,
  headerMarkdown: string,
  escape: (t: string) => string = escapeHtml,
  badgeContext?: DigestRepoCardBadgeContext,
): string {
  const headerHtml = headerMarkdown
    ? `<div class="brief-content prose prose-stone max-w-none dark:prose-invert prose-a:text-blue-800 dark:prose-a:text-blue-400 prose-headings:font-sans">${renderSafeMarkdown(headerMarkdown)}</div>`
    : "";
  const cards = digest.repos
    .map((repo) =>
      renderDigestRepoCard(repo, section, digestDate, digest.ranking_mode, escape, badgeContext),
    )
    .join("\n");
  return `${headerHtml}\n<div class="digest-repo-list mt-8">${cards}</div>`;
}

/** Preserve legacy NEW span markup when splitting markdown headers. */
export function stripRepoSectionsFromMarkdown(markdown: string): string {
  const { headerMarkdown } = splitDailyBriefMarkdown(markdown);
  return headerMarkdown;
}

export function legacyNewSuffixInHeading(): string {
  return newRepoMarkdownSuffix(true);
}
