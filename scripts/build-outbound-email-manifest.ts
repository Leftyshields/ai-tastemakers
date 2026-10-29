import path from "node:path";
import { fileURLToPath } from "node:url";
import { refreshOutboundEmailDestManifest } from "../src/tastemaker/analytics/write-outbound-email-manifest.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main(): Promise<void> {
  const siteBaseUrl =
    process.env.DIGEST_SITE_URL?.trim() || "https://leftyshields.github.io/ai-tastemakers";
  const manifestPath = await refreshOutboundEmailDestManifest(ROOT, siteBaseUrl);
  console.log(`Wrote ${path.relative(ROOT, manifestPath)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
