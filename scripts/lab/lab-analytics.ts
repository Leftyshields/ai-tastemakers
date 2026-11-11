import { digestDateCompact, normalizeRepoParam } from "../../src/tastemaker/analytics/repo-click.js";

export type LabLinkSection =
  | "hero"
  | "loop"
  | "timeline"
  | "backlog"
  | "history"
  | "about"
  | "tools"
  | "footer"
  | "nav"
  | "posts"
  | "tokens"
  | "experiments";

export interface LabLinkTrackOptions {
  section: LabLinkSection;
  experimentId?: string | null;
  sourceRepo?: string | null;
  className?: string;
  extraAttrs?: string;
}

export interface LabLinkContext {
  goPrefix: string;
  allowlist: Record<string, string>;
  labDigestCompact: string;
}

export function defaultLabLinkContext(depth: 0 | 1 = 0, allowlist: Record<string, string>, asOfIso: string): LabLinkContext {
  const goPrefix = depth === 0 ? "../go/index.html?" : "../../go/index.html?";
  return { goPrefix, allowlist, labDigestCompact: digestDateCompact(asOfIso) };
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function repoFromGithubHref(href: string): string | null {
  try {
    const u = new URL(href, "https://example.com");
    if (!u.hostname.endsWith("github.com")) return null;
    const parts = u.pathname.replace(/^\/+/, "").split("/");
    if (parts.length < 2) return null;
    return `${parts[0]}/${parts[1]}`;
  } catch {
    return null;
  }
}

/** Lab write up article: track links and route allowlisted GitHub URLs through /go. */
export function prepareLabPostArticleHtml(html: string, ctx: LabLinkContext): string {
  const withLinks = html.replace(/<a\b([^>]*)>/gi, (full, attrs: string) => {
    const hrefMatch = /\shref="([^"]+)"/i.exec(attrs);
    if (!hrefMatch) return full;
    const href = hrefMatch[1]!;
    const resolved = resolveLabToolHref(href, ctx);
    let newAttrs = attrs.replace(/\shref="[^"]+"/i, ` href="${escapeHtmlAttr(resolved)}"`);
    if (!/data-lab-section=/.test(newAttrs)) {
      newAttrs = ` data-lab-section="posts"${newAttrs}`;
    }
    return `<a${newAttrs}>`;
  });
  return ensureLabLinkSections(withLinks, "posts");
}

export function resolveLabToolHref(href: string, ctx: LabLinkContext): string {
  const repo = repoFromGithubHref(href);
  if (!repo) return href;
  const canonical = ctx.allowlist[repo];
  if (!canonical || canonical !== `https://github.com/${repo}`) return href;
  const params = new URLSearchParams({
    repo,
    section: "skills",
    pos: "0",
    target: "url",
    d: ctx.labDigestCompact,
  });
  return `${ctx.goPrefix}${params.toString()}`;
}

export function isExternalLabHref(href: string): boolean {
  const h = href.trim();
  return /^(https?:|mailto:|tel:)/i.test(h);
}

export function labLinkDataAttrs(opts: LabLinkTrackOptions): string {
  const parts = [`data-lab-section="${opts.section}"`];
  if (opts.experimentId?.trim()) {
    parts.push(`data-lab-experiment-id="${opts.experimentId.trim()}"`);
  }
  if (opts.sourceRepo?.trim()) {
    parts.push(`data-lab-source-repo="${opts.sourceRepo.trim()}"`);
  }
  return parts.join(" ");
}

export function renderLabTrackedLink(
  href: string,
  label: string,
  ctx: LabLinkContext,
  opts: LabLinkTrackOptions,
  escapeHtml: (t: string) => string,
): string {
  const resolved = resolveLabToolHref(href, ctx);
  const cls = opts.className ? ` class="${opts.className}"` : "";
  const extra = opts.extraAttrs ? ` ${opts.extraAttrs}` : "";
  return `<a href="${escapeHtml(resolved)}"${cls} ${labLinkDataAttrs(opts)}${extra}>${escapeHtml(label)}</a>`;
}

export function labLinkClickScript(): string {
  return `<script>
(function(){
  function pagePath(){ try { return window.location.pathname || ""; } catch(e){ return ""; } }
  function linkText(el){ return (el.textContent || "").replace(/\\s+/g," ").trim().slice(0,120); }
  document.addEventListener("click", function(ev){
    var t = ev.target;
    if(!t || !t.closest) return;
    var a = t.closest("a[href][data-lab-section]");
    var btn = !a ? t.closest("button[data-lab-section]") : null;
    var el = a || btn;
    if(!el) return;
    if(typeof posthog === "undefined" || !posthog.capture) return;
    var href = a ? (a.getAttribute("href") || "") : "";
    var external = href ? /^(https?:|mailto:|tel:)/i.test(href) : false;
    var props = {
      page: pagePath(),
      section: el.getAttribute("data-lab-section") || "",
      link_text: linkText(el),
      href: href,
      is_external: external
    };
    var nav = el.getAttribute("data-lab-nav");
    if(nav) props.nav = nav;
    var expId = el.getAttribute("data-lab-experiment-id");
    if(expId) props.experiment_id = expId;
    var src = el.getAttribute("data-lab-source-repo");
    if(src) props.source_repo = src;
    posthog.capture("lab_link_click", props, { transport: "sendBeacon", send_instantly: true });
  }, true);
})();
</script>`;
}

/** Assign a fallback section to any anchor missing data-lab-section (lab pages only). */
export function ensureLabLinkSections(html: string, fallback: LabLinkSection): string {
  return html.replace(/<a\b([^>]*?)>/gi, (full, attrs: string) => {
    if (/data-lab-section\s*=/.test(attrs)) return full;
    return `<a${attrs} data-lab-section="${fallback}">`;
  });
}

export function findLabAnalyticsViolations(html: string, relPath: string): string[] {
  const violations: string[] = [];
  if (!html.includes("posthog.init")) {
    violations.push(`${relPath}: missing PostHog snippet (posthog.init)`);
  }
  if (!html.includes("lab_link_click")) {
    violations.push(`${relPath}: missing lab link click script`);
  }
  const anchorRe = /<a\b[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = anchorRe.exec(html)) !== null) {
    const tag = m[0];
    if (!/\shref=/.test(tag)) continue;
    if (/data-lab-section=/.test(tag)) continue;
    violations.push(`${relPath}: anchor missing data-lab-section …${tag.slice(0, 80)}…`);
  }
  return violations;
}

export function normalizeRepoParamSafe(raw: string): string | null {
  return normalizeRepoParam(raw);
}
