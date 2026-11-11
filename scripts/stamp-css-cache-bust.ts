/**
 * After Tailwind writes site/assets/style.css, copy to a content-hashed filename
 * and rewrite all site HTML stylesheet links so deploys cannot pair new markup
 * with a cached pre-build bundle at assets/style.css.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(repoRoot, "site");
const assetsDir = path.join(siteDir, "assets");
const plainCss = path.join(assetsDir, "style.css");

function walkHtmlFiles(dir: string, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) walkHtmlFiles(abs, out);
    else if (name.endsWith(".html")) out.push(abs);
  }
  return out;
}

function main(): void {
  if (!fs.existsSync(plainCss)) {
    console.error("stamp-css-cache-bust: missing site/assets/style.css (run tailwind first)");
    process.exit(1);
  }

  const content = fs.readFileSync(plainCss);
  const hash = crypto.createHash("sha256").update(content).digest("hex").slice(0, 12);
  const hashedName = `style.${hash}.css`;
  const hashedPath = path.join(assetsDir, hashedName);

  for (const name of fs.readdirSync(assetsDir)) {
    if (/^style\.[a-f0-9]+\.css$/.test(name) && name !== hashedName) {
      fs.unlinkSync(path.join(assetsDir, name));
    }
  }

  fs.writeFileSync(hashedPath, content);
  fs.unlinkSync(plainCss);

  const linkNeedle = "assets/style.css";
  const linkReplacement = `assets/${hashedName}`;
  let touched = 0;
  for (const htmlPath of walkHtmlFiles(siteDir)) {
    const raw = fs.readFileSync(htmlPath, "utf8");
    if (!raw.includes(linkNeedle)) continue;
    const next = raw.split(linkNeedle).join(linkReplacement);
    if (next !== raw) {
      fs.writeFileSync(htmlPath, next, "utf8");
      touched += 1;
    }
  }

  fs.writeFileSync(
    path.join(assetsDir, "style.css.json"),
    `${JSON.stringify({ hash, file: hashedName, bytes: content.length }, null, 2)}\n`,
    "utf8",
  );

  console.log(`stamp-css-cache-bust: ${hashedName} (${content.length} bytes), ${touched} HTML file(s) updated`);
}

main();
