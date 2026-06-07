import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import type { AppConfig } from "../types.js";
import { normalizeEmail } from "./load.js";

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

export async function readFirestoreSubscribers(
  config: AppConfig,
): Promise<string[]> {
  try {
    const db = getAdminFirestore(config);
    if (!db) return [];

    const snapshot = await db.collection(TASTEMAKERS_SUBSCRIBERS_COLLECTION).get();
    const emails: string[] = [];
    for (const doc of snapshot.docs) {
      const email = doc.data().email;
      if (typeof email === "string") {
        emails.push(normalizeEmail(email));
      }
    }
    return emails.filter(Boolean);
  } catch (err) {
    console.warn("Firestore subscriber read failed; using file/env recipients only:", err);
    return [];
  }
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
  });
  return "added";
}
