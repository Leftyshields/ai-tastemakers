import type { Digest, RankingMode } from "../types.js";
import { newRepoEmailBadge, newRepoPlainLabel } from "../writers/new-badge.js";
import { digestUnsubscribeUrl } from "./unsubscribe.js";

const EMAIL_TOPIC_LIMIT = 5;

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

export function renderDigestEmailHtml(
  digest: Digest,
  dateLabel: string,
  siteUrl: string,
): string {
  const bootstrapNote = digest.ranking_mode === "delta_7d" ? "" : bootstrapNoteHtml();
  const preheader = escapeHtml(digestEmailPreheader(digest));
  const metaLine = `${digest.repos.length} repos · ${rankingModeLabel(digest.ranking_mode)}`;

  const repoBlocks = digest.repos
    .map((repo) => {
      const brief = repo.brief
        ? renderBriefForEmail(repo.brief)
        : "<em>_[brief unavailable]_</em>";
      const topics = escapeHtml(formatTopics(repo.topics));

      return `<div style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #e7e5e4;">
        <h2 style="margin:0 0 6px;font-family:system-ui,sans-serif;font-size:18px;font-weight:600;color:#1c1917;">
          ${repo.rank}. <a href="${escapeHtml(repo.html_url)}" style="color:#1e40af;text-decoration:none;">${escapeHtml(repo.full_name)}</a>${newRepoEmailBadge(repo.is_new)}
        </h2>
        <p style="margin:0 0 10px;font-family:system-ui,sans-serif;font-size:13px;color:#78716c;">
          ${formatStars(repo, digest.ranking_mode)} · ${topics}
        </p>
        <p style="margin:0;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#292524;">${brief}</p>
      </div>`;
    })
    .join("\n");

  const briefUrl = `${siteUrl.replace(/\/$/, "")}/briefings/${dateLabel}.html`;
  const unsubscribeUrl = digestUnsubscribeUrl(siteUrl);

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
      <a href="${escapeHtml(briefUrl)}" style="color:#1e40af;font-weight:600;">Read online</a>
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
): string {
  const lines: string[] = [
    `AI TASTEMAKERS — Daily Brief — ${dateLabel}`,
    `${digest.repos.length} repos · ${rankingModeLabel(digest.ranking_mode)}`,
    "",
  ];

  if (digest.ranking_mode !== "delta_7d") {
    lines.push(bootstrapNotePlain().trimEnd(), "");
  }

  for (const repo of digest.repos) {
    const brief = repo.brief
      ? renderBriefForPlainText(repo.brief)
      : "[brief unavailable]";
    const topics = formatTopics(repo.topics);
    lines.push(
      `${repo.rank}. ${repo.full_name}${newRepoPlainLabel(repo.is_new)}`,
      repo.html_url,
      `${formatStars(repo, digest.ranking_mode)} · ${topics}`,
      brief,
      "",
    );
  }

  const briefUrl = `${siteUrl.replace(/\/$/, "")}/briefings/${dateLabel}.html`;
  const unsubscribeUrl = digestUnsubscribeUrl(siteUrl);
  lines.push(
    `Read online: ${briefUrl}`,
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
