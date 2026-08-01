import fs from "node:fs/promises";
import path from "node:path";

export interface BriefOgCardInput {
  date: string;
  editionName: string;
  repos: string[];
}

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

/** 1200×630 Open Graph card SVG for a daily brief. */
export function briefOgCardSvg(input: BriefOgCardInput): string {
  const dateLabel = formatBriefDate(input.date);
  const picks = input.repos.slice(0, 3).map((name) => name.split("/").pop() ?? name);
  const pickLines = picks.map((name, i) => {
    const y = 300 + i * 72;
    return `<text x="80" y="${y}" fill="#1c1917" font-family="system-ui, sans-serif" font-size="34" font-weight="600">${i + 1}. ${escapeXml(name)}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#dbeafe"/>
      <stop offset="100%" stop-color="#fffcf8"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="560" width="1200" height="70" fill="#1e40af" opacity="0.92"/>
  <text x="80" y="96" fill="#1c1917" font-family="system-ui, sans-serif" font-size="52" font-weight="700">Daily Brief</text>
  <text x="80" y="148" fill="#57534e" font-family="system-ui, sans-serif" font-size="28">${escapeXml(input.editionName)} · ${escapeXml(dateLabel)}</text>
  <text x="80" y="230" fill="#1e40af" font-family="system-ui, sans-serif" font-size="22" font-weight="600" letter-spacing="2">TOP PICKS</text>
  ${pickLines.join("\n  ")}
  <text x="80" y="604" fill="#ffffff" font-family="system-ui, sans-serif" font-size="22" font-weight="600">What it does · Why now · Build with it</text>
  <text x="920" y="604" fill="#bfdbfe" font-family="system-ui, sans-serif" font-size="20">leftyshields.github.io</text>
</svg>`;
}

export async function writeBriefOgPng(outPath: string, input: BriefOgCardInput): Promise<void> {
  const sharp = (await import("sharp")).default;
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await sharp(Buffer.from(briefOgCardSvg(input))).png().toFile(outPath);
}

export function defaultOgImagePath(siteSegment: string): string {
  return siteSegment ? `${siteSegment}/assets/og-card.png` : "assets/og-card.png";
}

export function briefOgImagePath(siteSegment: string, date: string): string {
  const prefix = siteSegment ? `${siteSegment}/` : "";
  return `${prefix}assets/og/briefings/${date}.png`;
}
