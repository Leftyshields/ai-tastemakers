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

/** Domains Resend rejects (RFC 2606 placeholders and common test hosts). */
const NON_DELIVERABLE_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "localhost",
]);

export function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at >= 0 ? email.slice(at + 1) : "";
}

export function isDeliverableEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  if (!isValidEmail(normalized)) return false;
  return !NON_DELIVERABLE_DOMAINS.has(emailDomain(normalized));
}

export function filterDeliverableEmails(emails: string[]): string[] {
  const deliverable: string[] = [];
  for (const email of emails) {
    const normalized = normalizeEmail(email);
    if (isDeliverableEmail(normalized)) {
      deliverable.push(normalized);
    } else if (normalized) {
      console.warn(`Skipping non-deliverable digest recipient: ${normalized}`);
    }
  }
  return deliverable;
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
 * - Production (Firebase Admin configured): Firestore `tastemakers_subscribers` only.
 * - Local dev without Admin: `data/subscribers.json`.
 * Web subscribe/unsubscribe mutates Firestore; the JSON file is seed/bootstrap for local dev only.
 */
export async function resolveDigestRecipients(config: AppConfig): Promise<string[]> {
  const fromFirestore = await readFirestoreSubscribers(config);
  const fromFile = isFirebaseAdminConfigured(config)
    ? []
    : await readSubscribersFile(config.rootDir);
  return filterDeliverableEmails(mergeRecipientEmails(fromFirestore, fromFile));
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
