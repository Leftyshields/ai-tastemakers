import { loadConfig } from "../src/tastemaker/config.js";
import { readSubscribersFile } from "../src/tastemaker/subscribers/load.js";
import {
  isFirebaseAdminConfigured,
  writeFirestoreSubscriber,
} from "../src/tastemaker/subscribers/firestore.js";

async function main(): Promise<void> {
  const config = loadConfig();
  if (!isFirebaseAdminConfigured(config)) {
    console.error("Firebase Admin is not configured. Set FIREBASE_PROJECT_ID and credentials.");
    process.exit(1);
  }

  const emails = await readSubscribersFile(config.rootDir);
  if (emails.length === 0) {
    console.log("No emails in data/subscribers.json to seed.");
    return;
  }

  let added = 0;
  let exists = 0;
  for (const email of emails) {
    const result = await writeFirestoreSubscriber(config, email);
    if (result === "added") added++;
    else exists++;
  }

  console.log(`Seeded Firestore: ${added} added, ${exists} already existed (${emails.length} total in file)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
