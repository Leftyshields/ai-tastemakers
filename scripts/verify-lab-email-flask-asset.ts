import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { digestSiteUrlFromEnv } from "../src/tastemaker/config.js";
import { labBadgeEmailFlaskSrc } from "./lab/lab-tested-badge.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetRel = "site/assets/lab-flask-email.png";

async function main(): Promise<void> {
  const assetAbs = path.join(repoRoot, assetRel);
  if (!fs.existsSync(assetAbs)) {
    console.error(`missing ${assetRel} (Pages will not serve lab flask icon)`);
    process.exit(1);
  }

  const siteUrl = digestSiteUrlFromEnv();
  if (siteUrl.includes("example.com")) {
    console.error("digest site URL must not be example.com outside tests");
    process.exit(1);
  }

  const flaskUrl = labBadgeEmailFlaskSrc(siteUrl);
  let remoteOk = false;
  try {
    const res = await fetch(flaskUrl, { method: "HEAD", redirect: "follow" });
    remoteOk = res.ok;
  } catch {
    // Remote may 404 until Pages deploy; local asset is the gate.
  }

  if (remoteOk) {
    console.log(`verify: lab email flask asset ok (${flaskUrl})`);
  } else {
    console.log(
      `verify: lab email flask local asset ok (${assetRel}); remote HEAD pending deploy at ${flaskUrl}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
