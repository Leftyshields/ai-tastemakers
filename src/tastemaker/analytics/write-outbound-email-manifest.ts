import path from "node:path";
import { promises as fs } from "node:fs";
import type { Digest } from "../types.js";
import { collectDigestRepoAllowlist } from "./digest-allowlist.js";
import {
  OutboundDestRegistry,
  writeOutboundDestManifest,
} from "./outbound-dest-manifest.js";
import { OUTBOUND_DEST_MANIFEST_SITE_REL } from "./outbound-email-manifest-guard.js";
import {
  registerDestsFromOutboundGoHtml,
  registerEmailOutboundDestsForManifest,
} from "./register-email-outbound-dests.js";
import { renderDigestEmailHtml } from "../email/html.js";
import { collectOutboundDestsFromTrackedContent } from "./rewrite-outbound-links.js";

async function listHtmlFiles(dir: string, out: string[] = []): Promise<string[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const abs = path.join(dir, name);
    const st = await fs.stat(abs);
    if (st.isDirectory()) await listHtmlFiles(abs, out);
    else if (name.endsWith(".html")) out.push(abs);
  }
  return out;
}

function registerDestsFromRenderedEmailContent(
  registry: OutboundDestRegistry,
  ...contents: string[]
): void {
  for (const dest of contents.flatMap((c) => collectOutboundDestsFromTrackedContent(c))) {
    registry.register(dest);
  }
}

/** Build `site/assets/outbound-link-dests.json` for digest email send and /go allowlist. */
export async function refreshOutboundEmailDestManifest(
  repoRoot: string,
  siteBaseUrl: string,
  options?: {
    /** When sending a digest that was just written, ensure its outbound dests are registered. */
    pendingDigest?: { digest: Digest; dateLabel: string; editionId?: "oss" | "skills" };
  },
): Promise<string> {
  const allowlist = await collectDigestRepoAllowlist(repoRoot);
  if (options?.pendingDigest) {
    for (const repo of options.pendingDigest.digest.repos) {
      allowlist[repo.full_name] = repo.html_url;
    }
  }
  const destRegistry = new OutboundDestRegistry();

  const siteDir = path.join(repoRoot, "site");
  for (const htmlPath of await listHtmlFiles(siteDir)) {
    const html = await fs.readFile(htmlPath, "utf8");
    registerDestsFromOutboundGoHtml(html, destRegistry);
  }

  await registerEmailOutboundDestsForManifest(destRegistry, repoRoot, siteBaseUrl, allowlist);

  if (options?.pendingDigest) {
    const { digest, dateLabel, editionId = "oss" } = options.pendingDigest;
    const html = renderDigestEmailHtml(
      digest,
      dateLabel,
      siteBaseUrl,
      undefined,
      editionId,
      undefined,
      allowlist,
      destRegistry,
    );
    registerDestsFromRenderedEmailContent(destRegistry, html);
  }

  await destRegistry.verifyHttpUpgrades();

  const manifestPath = path.join(repoRoot, OUTBOUND_DEST_MANIFEST_SITE_REL);
  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await writeOutboundDestManifest(manifestPath, destRegistry);
  return manifestPath;
}
