import type { Digest } from "../types.js";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatStars(repo: Digest["repos"][0], mode: Digest["ranking_mode"]): string {
  if (mode === "bootstrap_total_stars") {
    return `★ ${repo.stars.toLocaleString()} total`;
  }
  return `★ ${repo.stars.toLocaleString()} (+${repo.stars_gained_7d} this week)`;
}

export function renderDigestEmailHtml(
  digest: Digest,
  dateLabel: string,
  siteUrl: string,
): string {
  const bootstrapNote =
    digest.ranking_mode === "delta_7d"
      ? ""
      : `<p style="margin:0 0 20px;padding:12px 14px;background:#fef3c7;border-left:4px solid #d97706;font-family:system-ui,sans-serif;font-size:14px;color:#78350f;">
        Bootstrap ranking (${escapeHtml(digest.ranking_mode)}): 7-day star history is still maturing.
      </p>`;

  const repoBlocks = digest.repos
    .map((repo) => {
      const brief = repo.brief
        ? escapeHtml(repo.brief)
        : "<em>_[brief unavailable]_</em>";
      const topics =
        repo.topics.length > 0
          ? escapeHtml(repo.topics.slice(0, 8).join(", "))
          : "—";

      return `<div style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #e7e5e4;">
        <h2 style="margin:0 0 6px;font-family:system-ui,sans-serif;font-size:18px;font-weight:600;color:#1c1917;">
          ${repo.rank}. <a href="${escapeHtml(repo.html_url)}" style="color:#1e40af;text-decoration:none;">${escapeHtml(repo.full_name)}</a>
        </h2>
        <p style="margin:0 0 10px;font-family:system-ui,sans-serif;font-size:13px;color:#78716c;">
          ${formatStars(repo, digest.ranking_mode)} · ${topics}
        </p>
        <p style="margin:0;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#292524;">${brief}</p>
      </div>`;
    })
    .join("\n");

  const briefUrl = `${siteUrl.replace(/\/$/, "")}/briefings/${dateLabel}.html`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fafaf9;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;font-family:Georgia,serif;color:#1c1917;">
    <p style="margin:0 0 8px;font-family:system-ui,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#78716c;">
      AI Tastemakers
    </p>
    <h1 style="margin:0 0 8px;font-family:system-ui,sans-serif;font-size:24px;font-weight:700;line-height:1.2;">
      Daily Brief — ${escapeHtml(dateLabel)}
    </h1>
    <p style="margin:0 0 24px;font-family:system-ui,sans-serif;font-size:13px;color:#78716c;">
      ${digest.repos.length} repos · ${escapeHtml(digest.ranking_mode)}
    </p>
    ${bootstrapNote}
    ${repoBlocks}
    <p style="margin:32px 0 0;font-family:system-ui,sans-serif;font-size:14px;text-align:center;">
      <a href="${escapeHtml(briefUrl)}" style="color:#1e40af;font-weight:600;">Read online</a>
      · <a href="${escapeHtml(siteUrl)}" style="color:#78716c;">Archive</a>
    </p>
    <p style="margin:16px 0 0;font-family:system-ui,sans-serif;font-size:11px;color:#a8a29e;text-align:center;">
      Automated daily digest · GitHub momentum
    </p>
  </div>
</body>
</html>`;
}

export function digestEmailSubject(dateLabel: string): string {
  return `AI Tastemakers — Daily Brief — ${dateLabel}`;
}
