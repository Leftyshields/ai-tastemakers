/** Markdown suffix for repos not featured in recent prior briefings. */
export function newRepoMarkdownSuffix(isNew?: boolean): string {
  return isNew ? " · **NEW**" : "";
}

/** Plain label for email text multipart. */
export function newRepoPlainLabel(isNew?: boolean): string {
  return isNew ? " [NEW]" : "";
}

/** Inline HTML badge for digest email. */
export function newRepoEmailBadge(isNew?: boolean): string {
  if (!isNew) return "";
  return `<span style="margin-left:8px;padding:2px 8px;border-radius:9999px;background:#dcfce7;color:#166534;font-family:system-ui,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;vertical-align:middle;">New</span>`;
}
