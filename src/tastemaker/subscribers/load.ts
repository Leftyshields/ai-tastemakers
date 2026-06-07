import fs from "node:fs/promises";
import path from "node:path";
import type { AppConfig } from "../types.js";

const SUBSCRIBERS_FILE = "data/subscribers.json";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function mergeRecipientEmails(...lists: string[][]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of lists) {
    for (const email of list) {
      const normalized = normalizeEmail(email);
      if (normalized && !seen.has(normalized)) {
        seen.add(normalized);
        out.push(normalized);
      }
    }
  }
  return out;
}

export async function readSubscribersFile(rootDir: string): Promise<string[]> {
  const filePath = path.join(rootDir, SUBSCRIBERS_FILE);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry): entry is string => typeof entry === "string")
      .map(normalizeEmail)
      .filter(Boolean);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function resolveDigestRecipients(config: AppConfig): Promise<string[]> {
  const fromFile = await readSubscribersFile(config.rootDir);
  return mergeRecipientEmails(fromFile, config.digestEmailTo);
}

export function subscribersFilePath(rootDir: string): string {
  return path.join(rootDir, SUBSCRIBERS_FILE);
}
