import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadConfig } from "../src/tastemaker/config.js";
import {
  isValidEmail,
  mergeRecipientEmails,
  normalizeEmail,
  readSubscribersFile,
  subscribersFilePath,
} from "../src/tastemaker/subscribers/load.js";
import {
  isFirebaseAdminConfigured,
  writeFirestoreSubscriber,
} from "../src/tastemaker/subscribers/firestore.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main(): Promise<void> {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npm run subscribers:add -- <email>");
    process.exit(1);
  }

  const normalized = normalizeEmail(email);
  if (!isValidEmail(normalized)) {
    console.error(`Invalid email: ${email}`);
    process.exit(1);
  }

  const config = loadConfig();
  const addedVia: string[] = [];

  if (isFirebaseAdminConfigured(config)) {
    const result = await writeFirestoreSubscriber(config, normalized);
    addedVia.push(result === "added" ? "Firestore" : "Firestore (already exists)");
  } else {
    const existing = await readSubscribersFile(ROOT);
    const merged = mergeRecipientEmails(existing, [normalized]);
    if (merged.length > existing.length) {
      const filePath = subscribersFilePath(ROOT);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
      addedVia.push("subscribers.json");
    }
    console.warn(
      "Firestore skipped — set Firebase Admin in .env for production subscribe/unsubscribe automation.",
    );
  }

  if (addedVia.length === 0) {
    console.log(`${normalized} is already subscribed`);
    return;
  }

  console.log(`${normalized} added via ${addedVia.join(" + ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
