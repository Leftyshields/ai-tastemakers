import fs from "node:fs";
import path from "node:path";

const HASHED_STYLE_RE = /^style\.[a-f0-9]{8,64}\.css$/;

/** Resolved path to the built Tailwind bundle under site/assets (hashed or legacy). */
export function findBuiltStylesheet(siteAssetsDir: string): string {
  if (!fs.existsSync(siteAssetsDir)) {
    throw new Error(`missing site assets dir: ${siteAssetsDir}`);
  }
  const hashed = fs
    .readdirSync(siteAssetsDir)
    .filter((name) => HASHED_STYLE_RE.test(name))
    .sort();
  if (hashed.length === 1) {
    return path.join(siteAssetsDir, hashed[0]!);
  }
  if (hashed.length > 1) {
    throw new Error(`ambiguous hashed stylesheets in ${siteAssetsDir}: ${hashed.join(", ")}`);
  }
  const plain = path.join(siteAssetsDir, "style.css");
  if (fs.existsSync(plain)) return plain;
  throw new Error(`no built stylesheet in ${siteAssetsDir}`);
}

/** Stylesheet href as emitted in generated HTML (relative, includes hash when stamped). */
export function readStylesheetHrefFromHtml(html: string): string | null {
  const m = html.match(/<link rel="stylesheet" href="([^"]+)">/);
  return m?.[1] ?? null;
}
