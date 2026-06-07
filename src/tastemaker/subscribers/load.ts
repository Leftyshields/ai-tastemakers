import fs from "node:fs/promises";
import path from "node:path";
import type { AppConfig } from "../types.js";
import {
  isFirebaseAdminConfigured,
  readFirestoreSubscribers,
} from "./firestore.js";

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

/**
 * Resolve digest recipients.
 * - Production (Firebase Admin configured): Firestore subscribers + optional DIGEST_EMAIL_TO admin overrides.
 * - Local dev without Admin: data/subscribers.json + DIGEST_EMAIL_TO.
 * Web subscribe/unsubscribe only mutates Firestore, so the JSON file is seed/bootstrap only when Admin is available.
 */
export async function resolveDigestRecipients(config: AppConfig): Promise<string[]> {
  const fromFirestore = await readFirestoreSubscribers(config);
  const fromFile = isFirebaseAdminConfigured(config)
    ? []
    : await readSubscribersFile(config.rootDir);
  return mergeRecipientEmails(fromFirestore, fromFile, config.digestEmailTo);
}

export function subscribersFilePath(rootDir: string): string {
  return path.join(rootDir, SUBSCRIBERS_FILE);
}

export async function removeEmailFromSubscribersFile(
  rootDir: string,
  email: string,
): Promise<boolean> {
  const normalized = normalizeEmail(email);
  const existing = await readSubscribersFile(rootDir);
  const filtered = existing.filter((entry) => entry !== normalized);
  if (filtered.length === existing.length) return false;

  const filePath = subscribersFilePath(rootDir);
  await fs.writeFile(filePath, `${JSON.stringify(filtered, null, 2)}\n`, "utf8");
  return true;
}
