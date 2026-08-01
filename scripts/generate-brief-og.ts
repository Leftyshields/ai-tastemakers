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

export function defaultOgImagePath(_siteSegment = ""): string {
  return "assets/og-card.png";
}

export function briefOgImagePath(siteSegment: string, date: string): string {
  const prefix = siteSegment ? `${siteSegment}/` : "";
  return `${prefix}assets/og/briefings/${date}.png`;
}
