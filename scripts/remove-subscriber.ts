import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadConfig } from "../src/tastemaker/config.js";
import {
  isValidEmail,
  normalizeEmail,
  removeEmailFromSubscribersFile,
} from "../src/tastemaker/subscribers/load.js";
import {
  deleteFirestoreSubscriber,
  isFirebaseAdminConfigured,
} from "../src/tastemaker/subscribers/firestore.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main(): Promise<void> {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npm run subscribers:remove -- <email>");
    process.exit(1);
  }

  const normalized = normalizeEmail(email);
  if (!isValidEmail(normalized)) {
    console.error(`Invalid email: ${email}`);
    process.exit(1);
  }

  const config = loadConfig();
  const removedVia: string[] = [];

  if (isFirebaseAdminConfigured(config)) {
    const result = await deleteFirestoreSubscriber(config, normalized);
    removedVia.push(
      result === "removed" ? "Firestore" : "Firestore (not on list)",
    );
  } else {
    console.warn(
      "Firestore skipped — set Firebase Admin credentials in .env to remove Firestore subscribers.",
    );
  }

  const removedFromFile = await removeEmailFromSubscribersFile(ROOT, normalized);
  if (removedFromFile) {
    removedVia.push("subscribers.json");
  }

  if (removedVia.length === 0) {
    console.log(`${normalized} was not found in Firestore or subscribers.json`);
    return;
  }

  console.log(`${normalized} removed via ${removedVia.join(" + ")}`);
  console.log(
    "Note: addresses in DIGEST_EMAIL_TO env are not removed by this script.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
