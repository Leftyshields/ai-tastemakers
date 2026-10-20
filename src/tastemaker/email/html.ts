import type { EditionId } from "../editions.js";
import type { Digest, RankingMode } from "../types.js";
import {
  buildEmailGoUrl,
  buildFullDigestPagesUrl,
  buildLabBadgeEmailGoUrl,
} from "../analytics/repo-click.js";
import { newRepoEmailBadge, newRepoPlainLabel } from "../writers/new-badge.js";
import { digestUnsubscribeUrl } from "./unsubscribe.js";
import {
  labBadgeForRepo,
  loadLabBadgeLookup,
  loadLabWriteupPostIds,
  renderLabTestedBadgeEmailPillCellHtml,
  renderLabTestedBadgeEmailHtml,
  renderLabTestedBadgePlainSuffix,
  resolveLabBadgeHref,
  labBadgeSiteDestPath,
  type LabBadgeInfo,
} from "../../../scripts/lab/lab-tested-badge.js";

const EMAIL_TOPIC_LIMIT = 5;
const BRAND_LINK = "#1e40af";
const BRAND_BUTTON = "#1e40af";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Subscriber-facing label for ranking_mode (not internal slug). */
export function rankingModeLabel(mode: RankingMode): string {
  switch (mode) {
    case "delta_7d":
      return "ranked by 7-day star growth";
    case "bootstrap_since_first_seen":
      return "ranked by recent momentum (bootstrap week)";
    case "bootstrap_total_stars":
      return "ranked by total stars (bootstrap week)";
    default:
      return "ranked by GitHub momentum";
  }
}

export function digestEmailPreheader(digest: Digest): string {
  const top = digest.repos[0]?.full_name;
  const lead = top ? `Led by ${top}. ` : "";
  return `${lead}Top ${digest.repos.length} AI-derivative repos gaining GitHub momentum — with builder-focused briefs.`;
}

/** Converts markdown bold (`**text**`) to `<strong>`, then escapes remaining HTML. */
export function renderBriefForEmail(brief: string): string {
  const parts: string[] = [];
  const re = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(brief)) !== null) {
    parts.push(escapeHtml(brief.slice(lastIndex, match.index)));
    parts.push(`<strong>${escapeHtml(match[1])}</strong>`);
    lastIndex = match.index + match[0].length;
  }
  parts.push(escapeHtml(brief.slice(lastIndex)));
  return parts
    .join("")
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");
}

/** Plain-text brief: keep labels, strip markdown bold markers. */
export function renderBriefForPlainText(brief: string): string {
  return brief.replace(/\*\*([^*]+)\*\*/g, "$1");
}

function formatStars(repo: Digest["repos"][0], mode: Digest["ranking_mode"]): string {
  if (mode === "bootstrap_total_stars") {
    return `★ ${repo.stars.toLocaleString()} total`;
  }
  return `★ ${repo.stars.toLocaleString()} (+${repo.stars_gained_7d} this week)`;
}

function formatTopics(topics: string[]): string {
  if (topics.length === 0) return "—";
  const shown = topics.slice(0, EMAIL_TOPIC_LIMIT);
  const suffix = topics.length > EMAIL_TOPIC_LIMIT ? "…" : "";
  return shown.join(", ") + suffix;
}

function bootstrapNoteHtml(): string {
  return `<p style="margin:0 0 20px;padding:12px 14px;background:#fef3c7;border-left:4px solid #d97706;font-family:system-ui,sans-serif;font-size:14px;color:#78350f;">
        Rankings use recent momentum while 7-day star history matures. They&rsquo;ll sharpen after a week of daily snapshots.
      </p>`;
}

function bootstrapNotePlain(): string {
  return "Note: Rankings use recent momentum while 7-day star history matures. They'll sharpen after a week of daily snapshots.\n\n";
}

function emailGoLink(
  siteUrl: string,
  section: EditionId,
  digestDate: string,
  repo: Digest["repos"][0],
  target: "title" | "button" | "url",
): string {
  return buildEmailGoUrl(siteUrl, {
    repo: repo.full_name,
    section,
    position: repo.rank,
    target,
    digestDate,
  });
}

function labBadgeEmailContext(badgeLookup?: ReadonlyMap<string, LabBadgeInfo>): {
  lookup: ReadonlyMap<string, LabBadgeInfo>;
  writeupPostIds: string[];
} {
  const lookup = badgeLookup ?? loadLabBadgeLookup(process.cwd());
  const writeupPostIds = loadLabWriteupPostIds(process.cwd());
  return { lookup, writeupPostIds };
}

export function renderDigestEmailHtml(
  digest: Digest,
  dateLabel: string,
  siteUrl: string,
  unsubscribeUrlOverride?: string,
  section: EditionId = "oss",
  badgeLookup?: ReadonlyMap<string, LabBadgeInfo>,
): string {
  const bootstrapNote = digest.ranking_mode === "delta_7d" ? "" : bootstrapNoteHtml();
  const preheader = escapeHtml(digestEmailPreheader(digest));
  const metaLine = `${digest.repos.length} repos · ${rankingModeLabel(digest.ranking_mode)}`;

  const badgeCtx = labBadgeEmailContext(badgeLookup);

  const repoBlocks = digest.repos
    .map((repo) => {
      const brief = repo.brief
        ? renderBriefForEmail(repo.brief)
        : "<em>_[brief unavailable]_</em>";
      const topics = escapeHtml(formatTopics(repo.topics));
      const titleHref = escapeHtml(emailGoLink(siteUrl, section, dateLabel, repo, "title"));
      const buttonHref = escapeHtml(emailGoLink(siteUrl, section, dateLabel, repo, "button"));
      const showGithubButton = true;
      let labBadgeTitleChip = "";
      let labBadgePillCell = "";
      if (repo.rank <= 10) {
        const match = labBadgeForRepo(badgeCtx.lookup, repo.full_name);
        if (match) {
          const badgeHref = buildLabBadgeEmailGoUrl(siteUrl, {
            repo: repo.full_name,
            section,
            rank: repo.rank,
            expId: match.id,
            status: match.status,
            digestDate: dateLabel,
            destPath: labBadgeSiteDestPath(siteUrl, match, badgeCtx.writeupPostIds),
          });
          if (showGithubButton) {
            labBadgePillCell = renderLabTestedBadgeEmailPillCellHtml(
              match,
              badgeHref,
              siteUrl,
              escapeHtml,
            );
          } else {
            labBadgeTitleChip = renderLabTestedBadgeEmailHtml(match, badgeHref, escapeHtml);
          }
        }
      }

      const buttonRow = showGithubButton
        ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0;">
          <tr>
            <td bgcolor="${BRAND_BUTTON}" style="background-color:${BRAND_BUTTON};border-radius:6px;vertical-align:middle;">
              <a href="${buttonHref}" style="display:inline-block;padding:10px 16px;color:#ffffff;font-family:system-ui,sans-serif;font-size:14px;font-weight:600;text-decoration:none;vertical-align:middle;">View on GitHub</a>
            </td>${labBadgePillCell}
          </tr>
        </table>`
        : "";

      return `<div style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #e7e5e4;">
        <h2 style="margin:0 0 6px;font-family:system-ui,sans-serif;font-size:18px;font-weight:600;color:#1c1917;">
          ${repo.rank}. <a href="${titleHref}" style="color:${BRAND_LINK};font-weight:700;text-decoration:underline;">${escapeHtml(repo.full_name)}</a>${labBadgeTitleChip}${newRepoEmailBadge(repo.is_new)}
        </h2>
        <p style="margin:0 0 10px;font-family:system-ui,sans-serif;font-size:13px;color:#78716c;">
          ${formatStars(repo, digest.ranking_mode)} · ${topics}
        </p>
        <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#292524;">${brief}</p>
        ${buttonRow}
      </div>`;
    })
    .join("\n");

  const fullDigestUrl = escapeHtml(buildFullDigestPagesUrl(siteUrl, dateLabel, section));
  const unsubscribeUrl = unsubscribeUrlOverride ?? digestUnsubscribeUrl(siteUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fafaf9;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${preheader}
  </div>
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;font-family:Georgia,serif;color:#1c1917;">
    <p style="margin:0 0 8px;font-family:system-ui,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#78716c;">
      AI Tastemakers
    </p>
    <h1 style="margin:0 0 8px;font-family:system-ui,sans-serif;font-size:24px;font-weight:700;line-height:1.2;">
      Daily Brief — ${escapeHtml(dateLabel)}
    </h1>
    <p style="margin:0 0 24px;font-family:system-ui,sans-serif;font-size:13px;color:#78716c;">
      ${escapeHtml(metaLine)}
    </p>
    ${bootstrapNote}
    ${repoBlocks}
    <p style="margin:32px 0 0;font-family:system-ui,sans-serif;font-size:14px;text-align:center;">
      <a href="${fullDigestUrl}" style="color:${BRAND_LINK};font-weight:600;text-decoration:underline;">Open the full digest</a>
      · <a href="${escapeHtml(siteUrl)}" style="color:#78716c;">Archive</a>
    </p>
    <p style="margin:16px 0 0;font-family:system-ui,sans-serif;font-size:11px;color:#a8a29e;text-align:center;">
      One digest per day · <a href="${escapeHtml(unsubscribeUrl)}" style="color:#78716c;">Unsubscribe</a>
    </p>
    <p style="margin:8px 0 0;font-family:system-ui,sans-serif;font-size:11px;color:#a8a29e;text-align:center;">
      Automated daily digest · GitHub momentum
    </p>
  </div>
</body>
</html>`;
}

export function renderDigestEmailText(
  digest: Digest,
  dateLabel: string,
  siteUrl: string,
  unsubscribeUrlOverride?: string,
  section: EditionId = "oss",
  badgeLookup?: ReadonlyMap<string, LabBadgeInfo>,
): string {
  const lines: string[] = [
    `AI TASTEMAKERS — Daily Brief — ${dateLabel}`,
    `${digest.repos.length} repos · ${rankingModeLabel(digest.ranking_mode)}`,
    "",
  ];

  if (digest.ranking_mode !== "delta_7d") {
    lines.push(bootstrapNotePlain().trimEnd(), "");
  }

  const badgeCtx = labBadgeEmailContext(badgeLookup);

  for (const repo of digest.repos) {
    const brief = repo.brief
      ? renderBriefForPlainText(repo.brief)
      : "[brief unavailable]";
    const topics = formatTopics(repo.topics);
    let labSuffix = "";
    if (repo.rank <= 10) {
      const match = labBadgeForRepo(badgeCtx.lookup, repo.full_name);
      if (match) labSuffix = renderLabTestedBadgePlainSuffix(match);
    }
    lines.push(
      `${repo.rank}. ${repo.full_name}${labSuffix}${newRepoPlainLabel(repo.is_new)}`,
      `${repo.full_name}  ${repo.html_url}`,
      `${formatStars(repo, digest.ranking_mode)} · ${topics}`,
      brief,
      "",
    );
  }

  const fullDigestUrl = buildFullDigestPagesUrl(siteUrl, dateLabel, section);
  const unsubscribeUrl = unsubscribeUrlOverride ?? digestUnsubscribeUrl(siteUrl);
  lines.push(
    `Open the full digest: ${fullDigestUrl}`,
    `Archive: ${siteUrl}`,
    `Unsubscribe: ${unsubscribeUrl}`,
    "",
    "One digest per day.",
  );

  return lines.join("\n");
}

export function digestEmailSubject(dateLabel: string): string {
  return `AI Tastemakers — Daily Brief — ${dateLabel}`;
}
