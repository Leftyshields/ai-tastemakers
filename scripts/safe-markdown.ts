import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "a",
  "ul",
  "ol",
  "li",
  "code",
  "pre",
  "blockquote",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "span",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "img",
]);

const VOID_TAGS = new Set(["br", "hr", "img"]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title"]),
  img: new Set(["src", "alt", "title"]),
  span: new Set(["class", "style"]),
  code: new Set(["class"]),
  pre: new Set(["class"]),
  th: new Set(["align"]),
  td: new Set(["align"]),
};

const DANGEROUS_BLOCKS =
  /<(script|style|iframe|object|embed|svg|math|form)\b[^>]*>[\s\S]*?<\/\1>/gi;

const DANGEROUS_VOIDS = /<\/?(script|style|iframe|object|embed|svg|math|form|link|meta|base|input|button|textarea|video|audio)\b[^>]*>/gi;

function decodeBasicEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*58;|&#x0*3a;/gi, ":")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCharCode(parseInt(n, 16)));
}

function isSafeUrl(raw: string): boolean {
  const href = decodeBasicEntities(raw).trim();
  if (!href) return false;
  if (/^(javascript|data|vbscript):/i.test(href)) return false;
  return /^(https?:\/\/|mailto:|\/|#|\.\/)/i.test(href);
}

function isSafeStyle(raw: string): boolean {
  return !/url\s*\(|expression|behavior|javascript|@import|-moz-binding/i.test(
    decodeBasicEntities(raw),
  );
}

function isSafeClass(raw: string): boolean {
  return /^[a-zA-Z0-9 _:-]+$/.test(raw);
}

function sanitizeAttrs(tag: string, rawAttrs: string): string {
  const allowed = ALLOWED_ATTRS[tag];
  if (!allowed || !rawAttrs.trim()) return "";

  const parts: string[] = [];
  const attrRe = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match: RegExpExecArray | null;
  while ((match = attrRe.exec(rawAttrs)) !== null) {
    const name = match[1].toLowerCase();
    if (name.startsWith("on")) continue;
    if (!allowed.has(name)) continue;
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    if ((name === "href" || name === "src") && !isSafeUrl(value)) continue;
    if (name === "style" && !isSafeStyle(value)) continue;
    if (name === "class" && !isSafeClass(value)) continue;
    parts.push(`${name}="${value.replace(/"/g, "&quot;")}"`);
  }
  return parts.length ? ` ${parts.join(" ")}` : "";
}

/** Allowlist sanitizer for markdown-generated HTML on GitHub Pages. */
export function sanitizeHtml(html: string): string {
  let out = html.replace(/<!--[\s\S]*?-->/g, "");
  out = out.replace(DANGEROUS_BLOCKS, "");
  out = out.replace(DANGEROUS_VOIDS, "");
  return out.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)\/?>/g, (full, name: string, attrs: string) => {
    const tag = name.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (full.startsWith("</")) return `</${tag}>`;
    const safeAttrs = sanitizeAttrs(tag, attrs);
    return VOID_TAGS.has(tag) ? `<${tag}${safeAttrs} />` : `<${tag}${safeAttrs}>`;
  });
}

export function renderSafeMarkdown(markdown: string): string {
  return sanitizeHtml(marked.parse(markdown) as string);
}
