import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  isValidEmail,
  mergeRecipientEmails,
  normalizeEmail,
  readSubscribersFile,
  subscribersFilePath,
} from "../src/tastemaker/subscribers/load.js";

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

  const existing = await readSubscribersFile(ROOT);
  const merged = mergeRecipientEmails(existing, [normalized]);
  if (merged.length === existing.length) {
    console.log(`${normalized} is already subscribed`);
    return;
  }

  const filePath = subscribersFilePath(ROOT);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  console.log(`Added ${normalized} (${merged.length} subscriber(s) total)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
