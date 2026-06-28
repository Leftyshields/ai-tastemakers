import { config as loadDotenv } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AppConfig } from "./types.js";
import {
  briefingsDirForEdition,
  getEdition,
  resolveEditionId,
  blocklistForEdition,
  snapshotPathForEdition,
  type EditionId,
} from "./editions.js";

export function findRepoRoot(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, "../..");
}

function parseEnvInt(name: string, fallback: string): number {
  const raw = process.env[name]?.trim() || fallback;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0) {
    throw new Error(`${name} must be a non-negative integer (got "${raw}")`);
  }
  return n;
}

function parseEnvBool(name: string, fallback = false): boolean {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  return raw === "1" || raw.toLowerCase() === "true";
}

function parseEnvFloat(name: string, fallback: string, min: number, max: number): number {
  const raw = process.env[name]?.trim() || fallback;
  const n = parseFloat(raw);
  if (!Number.isFinite(n) || n < min || n > max) {
    throw new Error(`${name} must be between ${min} and ${max} (got "${raw}")`);
  }
  return n;
}

function parseServiceAccount(raw?: string): Record<string, unknown> | undefined {
  if (!raw?.trim()) return undefined;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error("FIREBASE_SERVICE_ACCOUNT must be valid JSON");
  }
}

function loadEnvFiles(rootDir: string): void {
  loadDotenv({ path: path.join(rootDir, ".env") });
  loadDotenv({
    path: path.resolve(rootDir, "../epiphoric/.env.production"),
    override: false,
  });
}

export function loadConfig(options?: { editionId?: EditionId; rootDir?: string }): AppConfig {
  const rootDir = options?.rootDir ?? findRepoRoot();
  loadEnvFiles(rootDir);

  const edition = getEdition(resolveEditionId(options?.editionId));

  const githubToken = process.env.GITHUB_TOKEN?.trim();
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY?.trim();

  if (!githubToken) {
    throw new Error("GITHUB_TOKEN is required");
  }
  if (!anthropicApiKey) {
    throw new Error("ANTHROPIC_API_KEY is required");
  }

  return {
    githubToken,
    anthropicApiKey,
    anthropicModel: process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-4-6",
    timezone: process.env.TZ?.trim() || "America/Los_Angeles",
    topN: parseEnvInt("DIGEST_TOP_N", "10"),
    minStars: parseEnvInt(
      edition.id === "skills" ? "DIGEST_SKILLS_MIN_STARS" : "DIGEST_MIN_STARS",
      String(edition.minStarsDefault),
    ),
    pushedWithinDays: parseEnvInt("DIGEST_PUSHED_WITHIN_DAYS", "30"),
    topics: edition.topics,
    searchPagesPerTopic: 2,
    blocklist: blocklistForEdition(edition),
    maxStarsBootstrap: parseEnvInt(
      edition.id === "skills"
        ? "DIGEST_SKILLS_MAX_STARS_BOOTSTRAP"
        : "DIGEST_MAX_STARS_BOOTSTRAP",
      String(edition.maxStarsBootstrapDefault),
    ),
    softDedupBriefingCount: parseEnvInt("DIGEST_SOFT_DEDUP_BRIEFINGS", "5"),
    softDedupPenalty: parseEnvFloat("DIGEST_SOFT_DEDUP_PENALTY", "0.5", 0.01, 1),
    readmeMaxChars: 4000,
    rootDir,
    snapshotPath: snapshotPathForEdition(rootDir, edition),
    briefingsDir: briefingsDirForEdition(rootDir, edition),
    editionId: edition.id,
    editionName: edition.name,
    resendApiKey: process.env.RESEND_API_KEY?.trim() || undefined,
    digestEmailFrom: process.env.DIGEST_EMAIL_FROM?.trim() || undefined,
    digestSiteUrl:
      process.env.DIGEST_SITE_URL?.trim() ||
      "https://leftyshields.github.io/ai-tastemakers",
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID?.trim() || undefined,
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL?.trim() || undefined,
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY?.trim() || undefined,
    firebaseServiceAccount: parseServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT),
    enrichWeb: parseEnvBool("DIGEST_ENRICH_WEB"),
    enrichShadow: parseEnvBool("DIGEST_ENRICH_SHADOW"),
    enrichMaxRepos: parseEnvInt("DIGEST_ENRICH_MAX_REPOS", "3"),
    enrichMaxChars: parseEnvInt("DIGEST_ENRICH_MAX_CHARS", "1500"),
    experimentId: (() => {
      const id = process.env.EXPERIMENT_ID?.trim();
      if (!id) return undefined;
      if (!/^EXP-[0-9]{8}-[a-z0-9-]+$/.test(id)) {
        throw new Error(`EXPERIMENT_ID must match EXP-YYYYMMDD-slug (got "${id}")`);
      }
      return id;
    })(),
  };
}

export function formatDateInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function pushedAfterIso(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}
