import type { EditionId } from "../editions.js";
import {
  buildEmailGoUrl,
  digestDateCompact,
  normalizeRepoParam,
  resolveAllowlistedGithubUrl,
} from "./repo-click.js";
import {
  isSafeExternalHttpUrl,
  normalizeOutboundDest,
  type OutboundDestRegistry,
} from "./outbound-dest-manifest.js";

export type OutboundLinkChannel = "pages" | "email";

export interface OutboundRewriteContext {
  siteBaseUrl: string;
  /** When set, every generic outbound dest is registered for the published manifest. */
  destRegistry?: OutboundDestRegistry;
  githubAllowlist: Record<string, string>;
  channel: OutboundLinkChannel;
  surface: string;
  section?: EditionId;
  digestDate?: string;
  /** Default list rank for GitHub links in this HTML chunk (e.g. repo card body). */
  defaultPosition?: number;
}

const GO_HREF_RE = /\/go\/(?:index\.html)?\?/i;

function decodeBasicEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function siteOrigin(siteBaseUrl: string): string {
  try {
    const u = new URL(siteBaseUrl.replace(/\/+$/, "") + "/");
    return u.origin;
  } catch {
    return "";
  }
}

function isSameSiteHref(href: string, siteBaseUrl: string): boolean {
  const decoded = decodeBasicEntities(href.trim());
  if (!decoded) return true;
  if (decoded.startsWith("#")) return true;
  if (/^(mailto:|tel:)/i.test(decoded)) return true;
  if (!/^https?:\/\//i.test(decoded)) {
    return true;
  }
  const origin = siteOrigin(siteBaseUrl);
  if (!origin) return false;
  try {
    const u = new URL(decoded);
    if (u.origin === origin) return true;
  } catch {
    return false;
  }
  return false;
}

function isUnsubscribeHref(href: string): boolean {
  const d = decodeBasicEntities(href).toLowerCase();
  return d.includes("unsubscribe.html");
}

export function isAlreadyTrackedGoHref(href: string): boolean {
  const d = decodeBasicEntities(href);
  return GO_HREF_RE.test(d) || /go\/index\.html\?/i.test(d);
}

function repoFromGithubUrl(href: string): string | null {
  try {
    const u = new URL(decodeBasicEntities(href));
    if (!u.hostname.endsWith("github.com")) return null;
    const parts = u.pathname.replace(/^\/+/, "").split("/");
    if (parts.length < 2) return null;
    const repo = `${parts[0]}/${parts[1]}`;
    return normalizeRepoParam(repo) ? repo : null;
  } catch {
    return null;
  }
}

function goBase(siteBaseUrl: string): string {
  return `${siteBaseUrl.replace(/\/+$/, "")}/go/?`;
}

export function buildPagesRepoGoUrl(
  siteBaseUrl: string,
  query: {
    repo: string;
    section: EditionId;
    position: number;
    target: "title" | "button" | "url" | "card";
    digestDate: string;
  },
): string {
  const base = goBase(siteBaseUrl);
  const d = digestDateCompact(query.digestDate);
  const params = new URLSearchParams({
    repo: query.repo,
    section: query.section,
    pos: String(query.position),
    target: query.target,
    d,
    channel: "pages",
  });
  return `${base}${params.toString()}`;
}

export function buildGenericOutboundGoUrl(
  siteBaseUrl: string,
  destination: string,
  ctx: Pick<OutboundRewriteContext, "destRegistry" | "channel" | "surface">,
): string | null {
  let normalizedDest = normalizeOutboundDest(destination);
  if (!normalizedDest && /^http:\/\//i.test(destination.trim())) {
    normalizedDest = normalizeOutboundDest(destination.trim().replace(/^http:/i, "https:"));
  }
  if (!normalizedDest) return null;
  ctx.destRegistry?.register(destination);
  const params = new URLSearchParams({
    event: "outbound_link_click",
    dest: normalizedDest,
    surface: ctx.surface,
    channel: ctx.channel,
  });
  return `${goBase(siteBaseUrl)}${params.toString()}`;
}

export function resolveTrackedHref(rawHref: string, ctx: OutboundRewriteContext): string | null {
  const href = decodeBasicEntities(rawHref.trim());
  if (!href || isUnsubscribeHref(href) || isSameSiteHref(href, ctx.siteBaseUrl)) {
    return null;
  }
  if (isAlreadyTrackedGoHref(href)) return null;

  const repo = repoFromGithubUrl(href);
  if (repo && resolveAllowlistedGithubUrl(repo, ctx.githubAllowlist)) {
    const section = ctx.section ?? "oss";
    const digestDate = ctx.digestDate ?? "1970-01-01";
    const position = ctx.defaultPosition ?? 0;
    if (ctx.channel === "email") {
      return buildEmailGoUrl(ctx.siteBaseUrl, {
        repo,
        section,
        position,
        target: "url",
        digestDate,
      });
    }
    return buildPagesRepoGoUrl(ctx.siteBaseUrl, {
      repo,
      section,
      position,
      target: "url",
      digestDate,
    });
  }

  return buildGenericOutboundGoUrl(ctx.siteBaseUrl, href, ctx);
}

const ANCHOR_HREF_RE = /<a\b([^>]*?)\shref=(["'])([^"']*)\2([^>]*)>/gi;

export function rewriteOutboundLinksInHtml(html: string, ctx: OutboundRewriteContext): string {
  return html.replace(ANCHOR_HREF_RE, (full, before: string, quote: string, href: string, after: string) => {
    const tracked = resolveTrackedHref(href, ctx);
    if (!tracked) return full;
    const safeHref = tracked
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<a${before} href=${quote}${safeHref}${quote}${after}>`;
  });
}

const PLAIN_URL_RE = /https?:\/\/[^\s<>"')\]]+/g;

export function rewriteOutboundLinksInPlainText(text: string, ctx: OutboundRewriteContext): string {
  return text.replace(PLAIN_URL_RE, (url) => {
    const trimmed = url.replace(/[.,;:!?)]+$/, "");
    const suffix = url.slice(trimmed.length);
    const tracked = resolveTrackedHref(trimmed, ctx);
    return tracked ? tracked + suffix : url;
  });
}

const OUTBOUND_DEST_FROM_GO_RE =
  /[?&]event=outbound_link_click(?:&|$)[^"']*[&?]dest=([^"&']+)/gi;

/** Collect raw destination URLs from rewritten /go outbound_link_click links. */
export function collectOutboundDestsFromTrackedContent(content: string): string[] {
  const dests: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = OUTBOUND_DEST_FROM_GO_RE.exec(content)) !== null) {
    const raw = m[1];
    if (!raw) continue;
    try {
      dests.push(decodeURIComponent(raw.replace(/&amp;/g, "&")));
    } catch {
      dests.push(raw);
    }
  }
  return dests;
}

/** Returns raw external http(s) hrefs that are not routed through /go. */
export function findUntrackedExternalHrefs(html: string, siteBaseUrl: string): string[] {
  const bad: string[] = [];
  const re = /\shref=(["'])([^"']+)\1/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const href = decodeBasicEntities(m[2]!);
    if (isUnsubscribeHref(href) || isSameSiteHref(href, siteBaseUrl)) continue;
    if (/^https?:\/\//i.test(href) && !isAlreadyTrackedGoHref(href)) {
      bad.push(href);
    }
  }
  return bad;
}
