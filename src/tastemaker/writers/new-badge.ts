/** Shared NEW pill for digest email + static site (markdown allows inline HTML). */

const NEW_BADGE_LABEL = "New";

/** Inline styles for email clients that strip classes. */
const NEW_BADGE_INLINE_STYLE =
  "display:inline-block;margin-left:0.5rem;padding:0.125rem 0.5rem;border-radius:9999px;border:1px solid #a7f3d0;background:#ecfdf5;color:#047857;font-family:system-ui,-apple-system,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;line-height:1.2;text-transform:uppercase;vertical-align:middle;white-space:nowrap;";

/** HTML badge — class for Tailwind site; inline style for email + markdown fallback. */
export function newRepoHtmlBadge(isNew?: boolean): string {
  if (!isNew) return "";
  return `<span class="new-repo-badge" style="${NEW_BADGE_INLINE_STYLE}">${NEW_BADGE_LABEL}</span>`;
}

/** Markdown heading suffix (rendered inside ## titles on GitHub Pages). */
export function newRepoMarkdownSuffix(isNew?: boolean): string {
  return isNew ? ` ${newRepoHtmlBadge(true)}` : "";
}

/** Legacy markdown suffix before pill HTML (still in committed briefings). */
export function normalizeLegacyNewMarkdown(markdown: string): string {
  return markdown.replace(/ · \*\*NEW\*\*/g, newRepoMarkdownSuffix(true));
}

/** Plain label for email text multipart. */
export function newRepoPlainLabel(isNew?: boolean): string {
  return isNew ? " [NEW]" : "";
}

/** @deprecated Use newRepoHtmlBadge — kept as alias for email template imports. */
export function newRepoEmailBadge(isNew?: boolean): string {
  return newRepoHtmlBadge(isNew);
}
