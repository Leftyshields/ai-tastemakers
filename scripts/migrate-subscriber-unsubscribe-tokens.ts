/**
 * One-time backfill: add unsubscribeToken to legacy tastemakers_subscribers docs.
 *
 * Usage:
 *   npm run subscribers:migrate-unsubscribe-tokens -- --dry-run
 *   npm run subscribers:migrate-unsubscribe-tokens -- --apply
 */

import { loadConfig } from "../src/tastemaker/config.js";
import {
  backfillUnsubscribeTokens,
  isFirebaseAdminConfigured,
} from "../src/tastemaker/subscribers/firestore.js";

function parseApplyFlag(argv: string[]): boolean {
  if (argv.includes("--apply")) return true;
  if (argv.includes("--dry-run")) return false;
  return false;
}

async function main(): Promise<void> {
  const apply = parseApplyFlag(process.argv.slice(2));
  const config = loadConfig();

  if (!isFirebaseAdminConfigured(config)) {
    console.error("Firebase Admin is not configured. Set FIREBASE_PROJECT_ID and credentials in .env");
    process.exit(1);
  }

  console.log(
    apply
      ? "Applying unsubscribeToken backfill to tastemakers_subscribers…"
      : "Dry run — no writes (pass --apply to update Firestore)",
  );

  const result = await backfillUnsubscribeTokens(config, { apply });

  console.log(`Scanned: ${result.scanned}`);
  console.log(`Already had token: ${result.alreadyHadToken}`);
  if (apply) {
    console.log(`Backfilled: ${result.backfilled}`);
  } else {
    console.log(`Would backfill: ${result.wouldBackfill}`);
  }

  if (!apply && result.wouldBackfill > 0) {
    console.log("\nRe-run with --apply after reviewing the count above.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
