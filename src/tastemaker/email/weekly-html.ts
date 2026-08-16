import type { WeeklyEmailCopy, WeeklyReview } from "../types.js";
import { rankingModeLabel, renderBriefForEmail, renderBriefForPlainText } from "./html.js";
import { digestUnsubscribeUrl } from "./unsubscribe.js";

export const SUNDAY_EMAIL_DEK =
  "The Sunday wrap-up: one opinionated read on what actually moved this week. The ranked top 10 still posts daily on the site, linked below.";

const GITHUB_MD_LINK_SOURCE = /\[([^\]]+)\]\((https:\/\/github\.com\/[^)\s]+)\)/;

function githubMdLinkRe(): RegExp {
  return new RegExp(GITHUB_MD_LINK_SOURCE.source, "g");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Markdown links to github.com plus **bold**. Other HTML is escaped. */
export function renderWeeklyMarkup(text: string): string {
  const chunks: string[] = [];
  const re = githubMdLinkRe();
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    chunks.push(renderBriefForEmail(text.slice(last, match.index)));
    chunks.push(
      `<a href="${escapeHtml(match[2])}" style="color:#1e40af;font-weight:600;">${escapeHtml(match[1])}</a>`,
    );
    last = match.index + match[0].length;
  }
  chunks.push(renderBriefForEmail(text.slice(last)));
  return chunks.join("");
}

export function renderWeeklyPlainText(text: string): string {
  return renderBriefForPlainText(text.replace(githubMdLinkRe(), "$1 ($2)"));
}

function siteRoot(siteUrl: string): string {
  return siteUrl.replace(/\/$/, "");
}

export function weeklyOnlineUrl(siteUrl: string, weekId: string): string {
  return `${siteRoot(siteUrl)}/weekly/${weekId}.html`;
}

export function ossTop10Url(siteUrl: string, dateLabel: string): string {
  return `${siteRoot(siteUrl)}/briefings/${dateLabel}.html`;
}

export function skillsTop10Url(siteUrl: string, dateLabel: string): string {
  return `${siteRoot(siteUrl)}/skills/briefings/${dateLabel}.html`;
}

export function resolveWeeklyEmail(review: WeeklyReview): WeeklyEmailCopy {
  if (review.email?.verdict?.trim()) {
    return {
      verdict: review.email.verdict,
      body: review.email.body?.trim() || "",
    };
  }
  return {
    verdict: review.narrative.executive.split(/(?<=\.)\s/)[0]?.trim() || `Week ${review.week_id} in review.`,
    body: review.narrative.generalist,
  };
}

export function weeklyEmailSubject(review: WeeklyReview): string {
  return resolveWeeklyEmail(review).verdict.replace(/\s+/g, " ").trim();
}

export function weeklyEmailPreheader(_review: WeeklyReview): string {
  return SUNDAY_EMAIL_DEK;
}

function rankingMethodLabel(review: WeeklyReview): string {
  const modes = [...new Set(review.stats.ranking_modes)];
  if (modes.length === 0 || modes.every((m) => m === "delta_7d")) {
    return "7-day star growth";
  }
  return modes.map(rankingModeLabel).join("; ");
}

function bodyParagraphsHtml(text: string): string {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) =>
        `<p style="margin:0 0 14px;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#292524;">${renderWeeklyMarkup(p)}</p>`,
    )
    .join("\n");
}

function rankedListLinksHtml(ossUrl: string, skillsUrl: string): string {
  return `<p style="margin:0 0 24px;font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;">
      <a href="${escapeHtml(ossUrl)}" style="color:#1e40af;font-weight:600;">AI Tastemakers</a>
      ·
      <a href="${escapeHtml(skillsUrl)}" style="color:#1e40af;font-weight:600;">Skill Tastemakers</a>
    </p>`;
}

export function renderWeeklyEmailHtml(review: WeeklyReview, siteUrl: string): string {
  const copy = resolveWeeklyEmail(review);
  const preheader = escapeHtml(weeklyEmailPreheader(review));
  const weekUrl = weeklyOnlineUrl(siteUrl, review.week_id);
  const ossUrl = ossTop10Url(siteUrl, review.week_end);
  const skillsUrl = skillsTop10Url(siteUrl, review.week_end);
  const unsubscribeUrl = digestUnsubscribeUrl(siteUrl);
  const both = review.stats.cross_edition_overlap.length;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fafaf9;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${preheader}
  </div>
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;font-family:Georgia,serif;color:#1c1917;">
    <p style="margin:0 0 8px;font-family:system-ui,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#78716c;">
      AI Tastemakers · ${escapeHtml(review.week_id)}
    </p>
    <h1 style="margin:0 0 12px;font-family:system-ui,sans-serif;font-size:22px;font-weight:700;line-height:1.3;">
      ${escapeHtml(copy.verdict)}
    </h1>
    <p style="margin:0 0 16px;font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#57534e;">
      ${escapeHtml(SUNDAY_EMAIL_DEK)}
    </p>
    ${rankedListLinksHtml(ossUrl, skillsUrl)}
    ${copy.body ? bodyParagraphsHtml(copy.body) : ""}
    <div style="margin:28px 0 0;padding:14px 16px;background:#f5f5f4;font-family:system-ui,sans-serif;font-size:13px;line-height:1.55;color:#44403c;">
      <p style="margin:0 0 8px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;font-size:11px;color:#78716c;">Receipts</p>
      <p style="margin:0;">AI Tastemakers: ${review.stats.unique_repos.oss} unique repos<br>
      Skill Tastemakers: ${review.stats.unique_repos.skills} unique repos<br>
      Both lists: ${both}<br>
      Ranked by ${escapeHtml(rankingMethodLabel(review))}</p>
      <p style="margin:10px 0 0;">
        <a href="${escapeHtml(weekUrl)}" style="color:#1e40af;font-weight:600;">Full week on the site</a>
      </p>
    </div>
    <p style="margin:16px 0 0;font-family:system-ui,sans-serif;font-size:11px;color:#a8a29e;text-align:center;">
      Sundays are the week in review · weekdays are the daily top 10 · <a href="${escapeHtml(unsubscribeUrl)}" style="color:#78716c;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>`;
}

export function renderWeeklyEmailText(review: WeeklyReview, siteUrl: string): string {
  const copy = resolveWeeklyEmail(review);
  const ossUrl = ossTop10Url(siteUrl, review.week_end);
  const skillsUrl = skillsTop10Url(siteUrl, review.week_end);
  const both = review.stats.cross_edition_overlap.length;
  const lines: string[] = [
    copy.verdict,
    "",
    SUNDAY_EMAIL_DEK,
    "",
    `AI Tastemakers: ${ossUrl}`,
    `Skill Tastemakers: ${skillsUrl}`,
    "",
  ];
  if (copy.body) lines.push(renderWeeklyPlainText(copy.body), "");
  lines.push(
    "RECEIPTS",
    `AI Tastemakers: ${review.stats.unique_repos.oss} unique repos`,
    `Skill Tastemakers: ${review.stats.unique_repos.skills} unique repos`,
    `Both lists: ${both}`,
    `Ranked by ${rankingMethodLabel(review)}`,
    `Full week on the site: ${weeklyOnlineUrl(siteUrl, review.week_id)}`,
    `Unsubscribe: ${digestUnsubscribeUrl(siteUrl)}`,
  );
  return lines.join("\n");
}
