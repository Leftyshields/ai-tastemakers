import path from "node:path";
import { promises as fs } from "node:fs";
import {
  loadOutboundDestRegistryFromFile,
  type OutboundDestRegistry,
} from "./outbound-dest-manifest.js";
import { collectOutboundDestsFromTrackedContent } from "./rewrite-outbound-links.js";

export const OUTBOUND_DEST_MANIFEST_SITE_REL = "site/assets/outbound-link-dests.json";

export async function loadDeployedOutboundDestRegistry(
  repoRoot: string,
): Promise<OutboundDestRegistry | null> {
  const manifestPath = path.join(repoRoot, OUTBOUND_DEST_MANIFEST_SITE_REL);
  return loadOutboundDestRegistryFromFile(manifestPath);
}

export function assertOutboundDestsInRegistry(
  dests: string[],
  registry: OutboundDestRegistry,
): void {
  const missing: string[] = [];
  for (const dest of dests) {
    if (!registry.hasRawDest(dest)) missing.push(dest);
  }
  if (missing.length === 0) return;
  throw new Error(
    `Outbound email link(s) are not in ${OUTBOUND_DEST_MANIFEST_SITE_REL}. ` +
      `Run npm run build:pages and deploy GitHub Pages before sending email. ` +
      `Missing: ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? ` (+${missing.length - 5} more)` : ""}`,
  );
}

export async function assertRenderedEmailAllowedByManifest(
  repoRoot: string,
  ...contents: string[]
): Promise<void> {
  const registry = await loadDeployedOutboundDestRegistry(repoRoot);
  if (!registry) {
    throw new Error(
      `Missing ${OUTBOUND_DEST_MANIFEST_SITE_REL}. Run npm run build:pages and deploy GitHub Pages before sending email.`,
    );
  }
  const dests = contents.flatMap((c) => collectOutboundDestsFromTrackedContent(c));
  assertOutboundDestsInRegistry(dests, registry);
}
