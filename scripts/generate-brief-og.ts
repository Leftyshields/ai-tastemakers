import fs from "node:fs/promises";
import path from "node:path";
import { OG } from "./og-theme.js";

export interface BriefOgCardInput {
  date: string;
  editionName: string;
  editionTagline?: string;
  repos: string[];
}

export const EDITION_TAGLINES: Record<string, string> = {
  oss: "Daily intelligence on AI-derivative open source — ranked by 7-day momentum.",
  skills: "Agent skills, Claude Code extensions, and MCP tools — ranked by momentum.",
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatBriefDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

function ogCardShell(inner: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="heroGlow" cx="50%" cy="0%" rx="80%" ry="70%">
      <stop offset="0%" stop-color="${OG.glow}"/>
      <stop offset="100%" stop-color="${OG.bgOuter}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${OG.bgOuter}"/>
  <ellipse cx="600" cy="0" rx="720" ry="260" fill="url(#heroGlow)"/>
  <rect x="48" y="36" width="1104" height="558" rx="4" fill="${OG.bgShell}" stroke="${OG.border}" stroke-width="1"/>
  ${inner}
</svg>`;
}

function siteHeaderBlock(editionName: string, tagline: string): string {
  return `
  <text x="88" y="88" fill="${OG.text}" font-family="${OG.fontSans}" font-size="34" font-weight="700">${escapeXml(editionName)}</text>
  <text x="88" y="124" fill="${OG.textMuted}" font-family="${OG.fontSans}" font-size="20">${escapeXml(tagline)}</text>
  <line x1="88" y1="148" x2="1112" y2="148" stroke="${OG.border}" stroke-width="1"/>`;
}

function footerBlock(): string {
  return `
  <rect x="48" y="548" width="1104" height="46" fill="${OG.footerBg}" stroke="${OG.footerBorder}" stroke-width="1"/>
  <text x="600" y="578" fill="${OG.textMuted}" font-family="${OG.fontSans}" font-size="18" text-anchor="middle">What it does · Why now · Build with it</text>`;
}

/** 1200×630 Open Graph card — dark theme matching GitHub Pages site. */
export function briefOgCardSvg(input: BriefOgCardInput): string {
  const dateLabel = formatBriefDate(input.date);
  const tagline =
    input.editionTagline ??
    "Daily intelligence on AI-derivative open source — ranked by 7-day momentum.";
  const picks = input.repos.slice(0, 3).map((name) => name.split("/").pop() ?? name);
  const pickLines = picks.map((name, i) => {
    const y = 318 + i * 58;
    return `<text x="88" y="${y}" fill="${OG.text}" font-family="${OG.fontSans}" font-size="28" font-weight="600">${i + 1}. ${escapeXml(name)}</text>`;
  });

  const inner = `
  ${siteHeaderBlock(input.editionName, tagline)}
  <text x="88" y="208" fill="${OG.text}" font-family="${OG.fontSerif}" font-size="44" font-weight="700">Daily Brief — ${escapeXml(dateLabel)}</text>
  ${pickLines.join("\n  ")}
  ${footerBlock()}`;

  return ogCardShell(inner);
}

/** Default site share card (homepage / fallback). */
export function defaultOgCardSvg(): string {
  const inner = `
  ${siteHeaderBlock("AI Tastemakers", "Daily intelligence on AI-derivative open source")}
  <text x="88" y="248" fill="${OG.text}" font-family="${OG.fontSerif}" font-size="44" font-weight="700">Curated daily briefings</text>
  <text x="88" y="300" fill="${OG.textMuted}" font-family="${OG.fontSans}" font-size="24" font-weight="600">What it does · Why now · Build with it</text>
  <text x="88" y="360" fill="${OG.textDim}" font-family="${OG.fontSans}" font-size="22">OSS + Skills editions · GitHub momentum ranking</text>
  ${footerBlock()}`;

  return ogCardShell(inner);
}

async function rasterizeSvg(svg: string, outPath: string): Promise<void> {
  const sharp = (await import("sharp")).default;
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(outPath);
}

export async function writeBriefOgPng(outPath: string, input: BriefOgCardInput): Promise<void> {
  await rasterizeSvg(briefOgCardSvg(input), outPath);
}

export async function writeDefaultOgPng(outPath: string): Promise<void> {
  await rasterizeSvg(defaultOgCardSvg(), outPath);
}

/** Site tab icon fill (Tailwind blue-800) — readable on light and dark browser chrome. */
export const FAVICON_BRAND_FILL = "#1e40af";

/** Brian BF1 mark: white spoon on full-bleed blue, amber four-point spark in the bowl. */
const BF1_SPOON_MARK = `<g transform="rotate(-40 256 256)"><ellipse cx="256" cy="150" rx="110" ry="135" fill="#ffffff"/><rect x="224" y="260" width="64" height="230" rx="32" fill="#ffffff"/></g>`;
const BF1_SPARK_PATH =
  "M256 62 C265.768 127.208 278.792 140.232 344 150 C278.792 159.768 265.768 172.792 256 238 C246.232 172.792 233.208 159.768 168 150 C233.208 140.232 246.232 127.208 256 62Z";

function bf1SparkMark(sparkScale: number): string {
  const inner =
    sparkScale === 1
      ? `<path d="${BF1_SPARK_PATH}" fill="#f59e0b"/>`
      : `<g transform="translate(256 150) scale(${sparkScale}) translate(-256 -150)"><path d="${BF1_SPARK_PATH}" fill="#f59e0b"/></g>`;
  return `<g transform="rotate(-40 256 256)">${inner}</g>`;
}

/** Vector scale for a readable (but oversized) 16px star; pixel spark targets ~this footprint. */
export const FAVICON16_SPARK_SCALE = 1.3;

const FAVICON16_AMBER = { r: 245, g: 158, b: 11 };

export interface SiteFaviconMarkOptions {
  /** Omit vector spark (16px ICO adds a pixel plus after rasterizing the spoon). */
  favicon16?: boolean;
  omitSpark?: boolean;
}

/** Square BF1 spoon mark for favicons (vector source for sharp rasterization). */
export function siteFaviconMarkSvg(options: SiteFaviconMarkOptions = {}): string {
  const includeSpark = !options.omitSpark && !options.favicon16;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${FAVICON_BRAND_FILL}"/>
  ${BF1_SPOON_MARK}
  ${includeSpark ? bf1SparkMark(1) : ""}
</svg>`;
}

function isFaviconWhitePixel(r: number, g: number, b: number): boolean {
  return r > 245 && g > 245 && b > 245;
}

function isFaviconAmberPixel(r: number, g: number, b: number): boolean {
  return r > 200 && g > 100 && g < 210 && b < 80;
}

/** Hand-placed plus spark on the 16×16 bowl raster (white ring, recognizable star). */
export function paintFavicon16PixelSpark(rgba: Buffer, width = 16, height = 16): void {
  let sumX = 0;
  let sumY = 0;
  let count = 0;
  for (let y = 3; y <= 7; y++) {
    for (let x = 3; x <= 9; x++) {
      const i = (y * width + x) * 4;
      if (isFaviconWhitePixel(rgba[i]!, rgba[i + 1]!, rgba[i + 2]!)) {
        sumX += x;
        sumY += y;
        count++;
      }
    }
  }
  if (count === 0) return;
  const cx = Math.round(sumX / count);
  const cy = Math.round(sumY / count);
  const plus: Array<[number, number]> = [
    [cx, cy],
    [cx - 1, cy],
    [cx + 1, cy],
    [cx, cy - 1],
    [cx, cy + 1],
  ];
  for (const [x, y] of plus) {
    if (x < 0 || y < 0 || x >= width || y >= height) continue;
    const i = (y * width + x) * 4;
    if (!isFaviconWhitePixel(rgba[i]!, rgba[i + 1]!, rgba[i + 2]!)) continue;
    rgba[i] = FAVICON16_AMBER.r;
    rgba[i + 1] = FAVICON16_AMBER.g;
    rgba[i + 2] = FAVICON16_AMBER.b;
    rgba[i + 3] = 255;
  }
}

/** Rasterize 16px favicon PNG with pixel-placed spark in the bowl. */
export async function rasterSiteFavicon16Png(): Promise<Buffer> {
  const sharp = (await import("sharp")).default;
  const { data, info } = await sharp(Buffer.from(siteFaviconMarkSvg({ omitSpark: true })))
    .resize(16, 16)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = Buffer.from(data);
  paintFavicon16PixelSpark(rgba, info.width, info.height);
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

/** Build a multi-size PNG-in-ICO file (16/32/48) without extra dependencies. */
export function encodePngIco(entries: Array<{ width: number; height: number; png: Buffer }>): Buffer {
  if (entries.length === 0) {
    throw new Error("encodePngIco requires at least one image");
  }
  const count = entries.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const directory: Buffer[] = [];
  const images: Buffer[] = [];
  for (const entry of entries) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(entry.width >= 256 ? 0 : entry.width, 0);
    dir.writeUInt8(entry.height >= 256 ? 0 : entry.height, 1);
    dir.writeUInt8(0, 2);
    dir.writeUInt8(0, 3);
    dir.writeUInt16LE(1, 4);
    dir.writeUInt16LE(32, 6);
    dir.writeUInt32LE(entry.png.length, 8);
    dir.writeUInt32LE(offset, 12);
    directory.push(dir);
    images.push(entry.png);
    offset += entry.png.length;
  }
  return Buffer.concat([header, ...directory, ...images]);
}

/** Rasterize BF1 spoon favicons at site publish root. */
export async function writeSiteFavicons(siteDir: string): Promise<void> {
  const sharp = (await import("sharp")).default;
  await fs.mkdir(siteDir, { recursive: true });
  const pngBySize = new Map<number, Buffer>();
  for (const size of [32, 48, 180]) {
    const png = await sharp(Buffer.from(siteFaviconMarkSvg()))
      .resize(size, size)
      .png()
      .toBuffer();
    pngBySize.set(size, png);
  }
  pngBySize.set(16, await rasterSiteFavicon16Png());
  await fs.writeFile(path.join(siteDir, "favicon-32.png"), pngBySize.get(32)!);
  await fs.writeFile(path.join(siteDir, "apple-touch-icon.png"), pngBySize.get(180)!);
  const ico = encodePngIco(
    [16, 32, 48].map((size) => ({
      width: size,
      height: size,
      png: pngBySize.get(size)!,
    })),
  );
  await fs.writeFile(path.join(siteDir, "favicon.ico"), ico);
}

export function defaultOgImagePath(_siteSegment = ""): string {
  return "assets/og-card.png";
}

export function briefOgImagePath(siteSegment: string, date: string): string {
  const prefix = siteSegment ? `${siteSegment}/` : "";
  return `${prefix}assets/og/briefings/${date}.png`;
}
