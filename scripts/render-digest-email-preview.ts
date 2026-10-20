/**
 * Render digest email HTML to a local file for visual QA (not shipped to site/).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { digestSiteUrlFromEnv } from "../src/tastemaker/config.js";
import { renderDigestEmailHtml } from "../src/tastemaker/email/html.js";
import type { Digest } from "../src/tastemaker/types.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadDigestFromJson(absPath: string): Digest {
  return JSON.parse(fs.readFileSync(absPath, "utf8")) as Digest;
}

function defaultDigestPath(): string {
  const candidates = [
    path.join(repoRoot, "briefings", "2026-10-19", "digest.json"),
    path.join(repoRoot, "briefings", "skills", "2026-10-19", "digest.json"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("no digest.json found; pass path to digest JSON as first argument");
}

function main(): void {
  const digestPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultDigestPath();
  const digest = loadDigestFromJson(digestPath);
  const dateLabel = path.basename(path.dirname(digestPath));
  const section = digestPath.includes(`${path.sep}skills${path.sep}`) ? "skills" : "oss";
  const siteUrl = digestSiteUrlFromEnv();
  const html = renderDigestEmailHtml(digest, dateLabel, siteUrl, undefined, section);

  const outDir = path.join(repoRoot, ".cache", "digest-email");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `digest-email-${section}-${dateLabel}.html`);
  fs.writeFileSync(outFile, html, "utf8");
  console.log(`Wrote ${path.relative(repoRoot, outFile)}`);
}

const isMain =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) main();
