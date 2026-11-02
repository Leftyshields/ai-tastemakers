import { createRequire } from "node:module";
import type { App } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";
import type { AppConfig } from "../types.js";
import { normalizeEmail } from "./load.js";

const require = createRequire(import.meta.url);

type FirebaseAppModule = typeof import("firebase-admin/app");
type FirebaseFirestoreModule = typeof import("firebase-admin/firestore");

let firebaseAppModule: FirebaseAppModule | undefined;
let firebaseFirestoreModule: FirebaseFirestoreModule | undefined;

function loadFirebaseAppModule(): FirebaseAppModule {
  if (!firebaseAppModule) {
    firebaseAppModule = require("firebase-admin/app") as FirebaseAppModule;
  }
  return firebaseAppModule;
}

function loadFirebaseFirestoreModule(): FirebaseFirestoreModule {
  if (!firebaseFirestoreModule) {
    try {
      firebaseFirestoreModule = require("firebase-admin/firestore") as FirebaseFirestoreModule;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : String(err);
      throw new Error(
        `firebase-admin Firestore is unavailable (${message}). ` +
          "Install optional peer @google-cloud/firestore (npm installs it with firebase-admin by default).",
        { cause: err },
      );
    }
  }
  return firebaseFirestoreModule;
}

export const TASTEMAKERS_SUBSCRIBERS_COLLECTION = "tastemakers_subscribers";

export function subscriberDocId(email: string): string {
  return normalizeEmail(email);
}

export function isFirebaseAdminConfigured(config: AppConfig): boolean {
  if (config.firebaseServiceAccount) return true;
  return !!(
    config.firebaseProjectId &&
    config.firebaseClientEmail &&
    config.firebasePrivateKey
  );
}

function parsePrivateKey(raw: string): string {
  return raw.replace(/\\n/g, "\n");
}

function resolveCredential(config: AppConfig) {
  const { cert } = loadFirebaseAppModule();
  if (config.firebaseServiceAccount) {
    return cert(config.firebaseServiceAccount as Parameters<typeof cert>[0]);
  }
  return cert({
    projectId: config.firebaseProjectId!,
    clientEmail: config.firebaseClientEmail!,
    privateKey: parsePrivateKey(config.firebasePrivateKey!),
  });
}

let cachedApp: App | undefined;
let cachedDb: Firestore | undefined;

export function resetFirebaseAdminCache(): void {
  cachedApp = undefined;
  cachedDb = undefined;
}

export function getAdminFirestore(config: AppConfig): Firestore | null {
  if (!isFirebaseAdminConfigured(config)) return null;
  if (cachedDb) return cachedDb;

  const { getApps, initializeApp } = loadFirebaseAppModule();
  const { getFirestore } = loadFirebaseFirestoreModule();
  cachedApp =
    getApps().find((app) => app.name === "tastemakers") ??
    initializeApp(
      {
        credential: resolveCredential(config),
        projectId:
          config.firebaseProjectId ??
          config.firebaseServiceAccount?.project_id,
      },
      "tastemakers",
    );
  cachedDb = getFirestore(cachedApp);
  return cachedDb;
}

export interface FirestoreSubscriberRecord {
  email: string;
  unsubscribeToken?: string;
}

export async function readFirestoreSubscriberRecords(
  config: AppConfig,
): Promise<FirestoreSubscriberRecord[]> {
  try {
    const db = getAdminFirestore(config);
    if (!db) return [];

    const snapshot = await db.collection(TASTEMAKERS_SUBSCRIBERS_COLLECTION).get();
    const records: FirestoreSubscriberRecord[] = [];
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const email = data.email;
      if (typeof email !== "string") continue;
      const normalized = normalizeEmail(email);
      const token =
        typeof data.unsubscribeToken === "string" && data.unsubscribeToken.trim()
          ? data.unsubscribeToken.trim()
          : undefined;
      records.push({ email: normalized, unsubscribeToken: token });
    }
    return records.filter((entry) => entry.email);
  } catch (err) {
    if (isFirebaseAdminConfigured(config)) {
      const detail = err instanceof Error ? err.message : String(err);
      throw new Error(`Firestore subscriber read failed: ${detail}`, { cause: err });
    }
    console.warn("Firestore subscriber read failed; using file/env recipients only:", err);
    return [];
  }
}

export async function readFirestoreSubscribers(
  config: AppConfig,
): Promise<string[]> {
  const records = await readFirestoreSubscriberRecords(config);
  return records.map((entry) => entry.email);
}

export async function deleteFirestoreSubscriber(
  config: AppConfig,
  email: string,
): Promise<"removed" | "missing"> {
  const db = getAdminFirestore(config);
  if (!db) {
    throw new Error("Firebase Admin is not configured");
  }

  const normalized = normalizeEmail(email);
  const ref = db.collection(TASTEMAKERS_SUBSCRIBERS_COLLECTION).doc(subscriberDocId(normalized));
  const existing = await ref.get();
  if (!existing.exists) return "missing";

  await ref.delete();
  return "removed";
}

export function generateUnsubscribeToken(): string {
  return crypto.randomUUID();
}

export function hasValidUnsubscribeToken(value: unknown): boolean {
  return typeof value === "string" && value.trim().length >= 16;
}

export interface UnsubscribeTokenBackfillResult {
  scanned: number;
  alreadyHadToken: number;
  wouldBackfill: number;
  backfilled: number;
}

export async function backfillUnsubscribeTokens(
  config: AppConfig,
  options: { apply?: boolean } = {},
): Promise<UnsubscribeTokenBackfillResult> {
  const db = getAdminFirestore(config);
  if (!db) {
    throw new Error("Firebase Admin is not configured");
  }

  const snapshot = await db.collection(TASTEMAKERS_SUBSCRIBERS_COLLECTION).get();
  const result: UnsubscribeTokenBackfillResult = {
    scanned: 0,
    alreadyHadToken: 0,
    wouldBackfill: 0,
    backfilled: 0,
  };

  for (const docSnap of snapshot.docs) {
    result.scanned += 1;
    const data = docSnap.data();
    if (hasValidUnsubscribeToken(data.unsubscribeToken)) {
      result.alreadyHadToken += 1;
      continue;
    }

    result.wouldBackfill += 1;
    if (!options.apply) continue;

    await docSnap.ref.update({
      unsubscribeToken: generateUnsubscribeToken(),
    });
    result.backfilled += 1;
  }

  return result;
}

export async function writeFirestoreSubscriber(
  config: AppConfig,
  email: string,
): Promise<"added" | "exists"> {
  const db = getAdminFirestore(config);
  if (!db) {
    throw new Error("Firebase Admin is not configured");
  }

  const normalized = normalizeEmail(email);
  const ref = db.collection(TASTEMAKERS_SUBSCRIBERS_COLLECTION).doc(subscriberDocId(normalized));
  const existing = await ref.get();
  if (existing.exists) return "exists";

  await ref.set({
    email: normalized,
    subscribedAt: new Date(),
    source: "ai-tastemakers",
    unsubscribeToken: generateUnsubscribeToken(),
  });
  return "added";
}
