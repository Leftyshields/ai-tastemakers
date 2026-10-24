import { compactEnrichment } from "./compact.js";
import type { EnrichmentBundle, EnrichmentSource } from "./types.js";

const URL_PATTERN = /https?:\/\/[^\s)\]>]+/gi;
const CODE_FENCE_PATTERN = /```[\s\S]*?```/g;
const INLINE_CODE_PATTERN = /`[^`\n]+`/g;

const BOILERPLATE_LINE =
  /^\s*(\[?\s*[x\s]?\]\s*)?(home|about(\s+us)?|contact(\s+us)?|pricing|features|blog|documentation|sign\s*in|log\s*in|login|sign\s*up|register|subscribe|newsletter|cookie(s)?|privacy(\s+policy)?|terms(\s+of\s+service)?|all rights reserved|copyright|skip to content|table of contents|share on|follow us|toggle navigation|\bmenu\b|search\.\.\.|back to top)\s*$/i;

const MARKETING_OPENER =
  /^(welcome to|discover the|unlock the|we are (pleased|excited)|revolutionary|cutting-edge|best-in-class|seamless(ly)?|world-class|game-changing|empower(ing)?|transform(ing)? your|leading provider)/i;

function uniqueUrls(text: string): string[] {
  return [...new Set((text.match(URL_PATTERN) ?? []).map((u) => u.replace(/[.,;]+$/, "")))];
}

function numericTokens(text: string): string[] {
  const matches = text.match(/\d[\d,]*(?:\.\d+)?/g) ?? [];
  return [...new Set(matches.map((n) => n.replace(/,/g, "")))].filter((n) => n.length >= 2);
}

function normalizeForDedupe(line: string): string {
  return line.trim().replace(/\s+/g, " ").toLowerCase();
}

function isFactDenseLine(line: string): boolean {
  const t = line.trim();
  if (!t) return false;
  if (URL_PATTERN.test(t)) return true;
  if (INLINE_CODE_PATTERN.test(t) || /```/.test(t)) return true;
  if (/\$\s+\w+|npm (install|run|i)\b|pnpm |yarn |git clone|curl |wget |docker |kubectl /.test(t)) {
    return true;
  }
  if (/(^|[\s(`])(\/[\w./-]{2,})/.test(t) && t.length < 220) return true;
  if (/\b[\w.-]+\/[\w.-]+\b/.test(t) && (/\d|release|v\d|stars|pts|HN:/i.test(t) || t.length < 120)) {
    return true;
  }
  if (/\b20\d{2}-\d{2}-\d{2}\b/.test(t)) return true;
  if (/\bv?\d+\.\d+(?:\.\d+)?(?:-[a-z0-9.]+)?\b/i.test(t)) return true;
  if (/Show HN:|Ask HN:|Hacker News|\b\d+\s+pts\b|\b\d+\s+comments\b/i.test(t)) return true;
  if (/^#{1,4}\s+\S/.test(t)) return true;
  if (/^\*\*[^*]+\*\*:?/.test(t)) return true;
  if (/\d[\d,.]*(?:%|k|K|M|GB|ms|stars)?/.test(t) && t.length < 280) return true;
  return false;
}

function shouldDropLine(line: string): boolean {
  const t = line.trim();
  if (!t) return true;
  if (t.length <= 2) return true;
  if (BOILERPLATE_LINE.test(t)) return true;
  if (/privacy policy|cookie settings|all rights reserved|newsletter signup/i.test(t)) {
    return true;
  }
  if ((t.match(/\|/g)?.length ?? 0) >= 2 && !isFactDenseLine(t)) return true;
  if (MARKETING_OPENER.test(t) && !isFactDenseLine(t)) return true;
  if (t.length > 220 && !isFactDenseLine(t)) return true;
  return false;
}

type PlaceholderBlock = { token: string; content: string };

function extractProtectedBlocks(text: string): { body: string; blocks: PlaceholderBlock[] } {
  const blocks: PlaceholderBlock[] = [];
  let body = text;
  let idx = 0;
  body = body.replace(CODE_FENCE_PATTERN, (match) => {
    const token = `\u0000CODE${idx++}\u0000`;
    blocks.push({ token, content: match });
    return token;
  });
  return { body, blocks };
}

function restoreProtectedBlocks(text: string, blocks: PlaceholderBlock[]): string {
  let out = text;
  for (const { token, content } of blocks) {
    out = out.replace(token, content);
  }
  return out;
}

/** Deterministic Caveman-style compression for one enrichment snippet. */
export function compressEnrichmentProse(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const { body, blocks } = extractProtectedBlocks(trimmed);
  const seen = new Set<string>();
  const kept: string[] = [];

  for (const rawLine of body.split("\n")) {
    const line = rawLine.trimEnd();
    if (shouldDropLine(line)) continue;
    if (!isFactDenseLine(line) && line.length > 140) continue;

    const key = normalizeForDedupe(line);
    if (seen.has(key)) continue;
    seen.add(key);
    kept.push(line.trim());
  }

  let joined = kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  joined = restoreProtectedBlocks(joined, blocks);
  return joined;
}

/** Returns an error when compressed text must be rejected; null when acceptable. */
export function validateCompressedEnrichment(original: string, compressed: string): string | null {
  const orig = original.trim();
  const comp = compressed.trim();
  if (!orig) return null;
  if (!comp) return "empty after compression";

  for (const url of uniqueUrls(orig)) {
    if (!comp.includes(url)) return `url removed: ${url}`;
  }

  for (const num of numericTokens(orig)) {
    if (!comp.replace(/,/g, "").includes(num)) {
      return `number removed: ${num}`;
    }
  }

  if (orig.length > 120 && comp.length < Math.min(40, orig.length * 0.08)) {
    return "compressed too aggressively";
  }

  if (comp.length > orig.length * 1.05) {
    return "compressed longer than original";
  }

  return null;
}

export interface CompressEnrichmentTextResult {
  text: string;
  /** True when original text was kept due to validation or error. */
  fallback: boolean;
  reason?: string;
}

export function compressEnrichmentText(original: string): CompressEnrichmentTextResult {
  try {
    const compressed = compressEnrichmentProse(original);
    const err = validateCompressedEnrichment(original, compressed);
    if (err) {
      return { text: original, fallback: true, reason: err };
    }
    return { text: compressed, fallback: false };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { text: original, fallback: true, reason: msg };
  }
}

export interface EnrichCompressRepoStats {
  full_name: string;
  chars_before: number;
  chars_after: number;
  fallback: boolean;
  reason?: string;
}

export interface EnrichCompressBatchResult {
  per_repo: EnrichCompressRepoStats[];
  bundles_compressed: number;
  fallbacks: number;
  chars_before_total: number;
  chars_after_total: number;
}

function compressSource(source: EnrichmentSource): { source: EnrichmentSource; fallback: boolean; reason?: string } {
  const result = compressEnrichmentText(source.text);
  return {
    source: { ...source, text: result.text },
    fallback: result.fallback,
    reason: result.reason,
  };
}

export function compressEnrichmentBundle(
  bundle: EnrichmentBundle,
  maxChars: number,
): { bundle: EnrichmentBundle; stats: EnrichCompressRepoStats } {
  const chars_before = bundle.combined_text.length;
  let anyFallback = false;
  let fallbackReason: string | undefined;

  const sources: EnrichmentSource[] = [];
  for (const source of bundle.sources) {
    const { source: next, fallback, reason } = compressSource(source);
    sources.push(next);
    if (fallback) {
      anyFallback = true;
      fallbackReason = reason;
    }
  }

  let combined_text = compactEnrichment(sources, maxChars);
  const bundleErr = validateCompressedEnrichment(bundle.combined_text, combined_text);
  if (bundleErr) {
    anyFallback = true;
    fallbackReason = bundleErr;
    combined_text = bundle.combined_text;
  }

  const chars_after = combined_text.length;
  return {
    bundle: { ...bundle, sources, combined_text },
    stats: {
      full_name: bundle.full_name,
      chars_before,
      chars_after,
      fallback: anyFallback,
      reason: fallbackReason,
    },
  };
}

export function compressEnrichmentBundles(
  bundles: Map<string, EnrichmentBundle>,
  maxChars: number,
): { bundles: Map<string, EnrichmentBundle>; result: EnrichCompressBatchResult } {
  const next = new Map<string, EnrichmentBundle>();
  const per_repo: EnrichCompressRepoStats[] = [];
  let fallbacks = 0;
  let chars_before_total = 0;
  let chars_after_total = 0;

  for (const [name, bundle] of bundles) {
    let stats: EnrichCompressRepoStats;
    try {
      const compressed = compressEnrichmentBundle(bundle, maxChars);
      next.set(name, compressed.bundle);
      stats = compressed.stats;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`Enrich compress failed for ${name}: ${msg}; using original bundle`);
      next.set(name, bundle);
      stats = {
        full_name: name,
        chars_before: bundle.combined_text.length,
        chars_after: bundle.combined_text.length,
        fallback: true,
        reason: msg,
      };
    }
    if (stats.fallback) {
      fallbacks += 1;
      console.warn(
        `Enrich compress fallback for ${stats.full_name}${stats.reason ? `: ${stats.reason}` : ""}`,
      );
    }
    per_repo.push(stats);
    chars_before_total += stats.chars_before;
    chars_after_total += stats.chars_after;
  }

  return {
    bundles: next,
    result: {
      per_repo,
      bundles_compressed: bundles.size,
      fallbacks,
      chars_before_total,
      chars_after_total,
    },
  };
}

export interface EnrichCompressConfig {
  enrichCompress: boolean;
  enrichMaxChars: number;
}

export function applyEnrichCompressIfEnabled(
  config: EnrichCompressConfig,
  bundles: Map<string, EnrichmentBundle>,
): { bundles: Map<string, EnrichmentBundle>; compress?: EnrichCompressBatchResult } {
  if (!config.enrichCompress || bundles.size === 0) {
    return { bundles };
  }
  const { bundles: compressed, result } = compressEnrichmentBundles(bundles, config.enrichMaxChars);
  console.error(
    `Enrich compress: ${result.chars_before_total} → ${result.chars_after_total} chars (${result.fallbacks} fallback(s))`,
  );
  return { bundles: compressed, compress: result };
}
