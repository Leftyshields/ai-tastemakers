import { config as loadDotenv } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AppConfig } from "./types.js";

const DEFAULT_TOPICS = [
  "llm",
  "ai-agent",
  "mcp",
  "openai",
  "claude",
  "langchain",
  "ai-tools",
];

const DEFAULT_BLOCKLIST = [
  "langchain-ai/langchain",
  "langchain-ai/langgraph",
  "Significant-Gravitas/AutoGPT",
  "ollama/ollama",
  "openai/openai-python",
  "huggingface/transformers",
  "n8n-io/n8n",
  "open-webui/open-webui",
  "Snailclimb/JavaGuide",
];

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

function parseEmailList(raw?: string): string[] {
  if (!raw?.trim()) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
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

export function loadConfig(rootDir = findRepoRoot()): AppConfig {
  loadEnvFiles(rootDir);

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
    minStars: parseEnvInt("DIGEST_MIN_STARS", "50"),
    pushedWithinDays: parseEnvInt("DIGEST_PUSHED_WITHIN_DAYS", "30"),
    topics: DEFAULT_TOPICS,
    searchPagesPerTopic: 2,
    blocklist: new Set(DEFAULT_BLOCKLIST),
    maxStarsBootstrap: parseEnvInt("DIGEST_MAX_STARS_BOOTSTRAP", "80000"),
    softDedupBriefingCount: 3,
    softDedupPenalty: 0.8,
    readmeMaxChars: 4000,
    rootDir,
    snapshotPath: path.join(rootDir, "data/snapshots/repos.jsonl"),
    briefingsDir: path.join(rootDir, "briefings"),
    resendApiKey: process.env.RESEND_API_KEY?.trim() || undefined,
    digestEmailFrom: process.env.DIGEST_EMAIL_FROM?.trim() || undefined,
    digestEmailTo: parseEmailList(process.env.DIGEST_EMAIL_TO),
    digestSiteUrl:
      process.env.DIGEST_SITE_URL?.trim() ||
      "https://leftyshields.github.io/ai-tastemakers",
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID?.trim() || undefined,
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL?.trim() || undefined,
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY?.trim() || undefined,
    firebaseServiceAccount: parseServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT),
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
