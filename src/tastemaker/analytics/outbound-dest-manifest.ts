import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";

const UNSAFE_SCHEME =
  /^(javascript:|data:|vbscript:)/i;

/** Parse outbound dest without decoding the full string (preserves %3F / %23 in paths). */
export function parseOutboundDestUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed || UNSAFE_SCHEME.test(trimmed)) return null;
  let u: URL;
  try {
    u = new URL(trimmed);
  } catch {
    return null;
  }
  if (u.protocol !== "https:") return null;
  if (!u.hostname || u.username || u.password) return null;
  return u;
}

/** True for https URLs, or http URLs that would upgrade to a valid https form at manifest build. */
export function isSafeExternalHttpUrl(raw: string): boolean {
  if (normalizeOutboundDest(raw) !== null) return true;
  const trimmed = raw.trim();
  if (!/^http:\/\//i.test(trimmed)) return false;
  return normalizeOutboundDest(trimmed.replace(/^http:/i, "https:")) !== null;
}

function httpsUpgradeCandidate(raw: string): string | null {
  const trimmed = raw.trim();
  if (!/^http:\/\//i.test(trimmed)) return null;
  return trimmed.replace(/^http:/i, "https:");
}

/** Canonical https form for manifest lookup (must match /go client script). */
export function normalizeOutboundDest(raw: string): string | null {
  const u = parseOutboundDestUrl(raw);
  if (!u) return null;
  try {
    u.username = "";
    u.password = "";
    u.hash = "";
    u.hostname = u.hostname.toLowerCase();
    if (u.port === "443") u.port = "";
    let path = u.pathname;
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    u.pathname = path;
    return u.href;
  } catch {
    return null;
  }
}

export function outboundDestHash(normalizedDest: string): string {
  return createHash("sha256").update(normalizedDest, "utf8").digest("hex");
}

export interface OutboundDestManifestFile {
  schema_version: 1;
  generated_at: string;
  dest_hashes: string[];
}

async function httpsEndpointReachable(normalizedHttpsUrl: string): Promise<boolean> {
  const tryRequest = async (method: "HEAD" | "GET"): Promise<boolean> => {
    const res = await fetch(normalizedHttpsUrl, {
      method,
      redirect: "follow",
      signal: AbortSignal.timeout(12_000),
      headers: method === "GET" ? { Range: "bytes=0-0" } : undefined,
    });
    return res.status < 500;
  };
  try {
    if (await tryRequest("HEAD")) return true;
  } catch {
    /* fall through */
  }
  try {
    return await tryRequest("GET");
  } catch {
    return false;
  }
}

export class OutboundDestRegistry {
  private readonly hashes = new Set<string>();
  /** Normalized https URLs upgraded from http:// inputs during this build. */
  private readonly httpUpgradedNormalized = new Set<string>();

  register(rawDest: string): boolean {
    const trimmed = rawDest.trim();
    const upgraded = httpsUpgradeCandidate(trimmed);
    const normalized = normalizeOutboundDest(upgraded ?? trimmed);
    if (!normalized) return false;
    if (upgraded) this.httpUpgradedNormalized.add(normalized);
    this.hashes.add(outboundDestHash(normalized));
    return true;
  }

  registerNormalized(normalizedDest: string): void {
    this.hashes.add(outboundDestHash(normalizedDest));
  }

  merge(other: OutboundDestRegistry): void {
    for (const h of other.hashes) this.hashes.add(h);
    for (const u of other.httpUpgradedNormalized) this.httpUpgradedNormalized.add(u);
  }

  hasHash(hash: string): boolean {
    return this.hashes.has(hash);
  }

  hasRawDest(rawDest: string): boolean {
    const normalized = normalizeOutboundDest(rawDest);
    if (!normalized) return false;
    return this.hashes.has(outboundDestHash(normalized));
  }

  /** Fail the build when an http:// link was upgraded but the host does not speak HTTPS. */
  async verifyHttpUpgrades(): Promise<void> {
    const failed: string[] = [];
    for (const normalized of this.httpUpgradedNormalized) {
      if (!(await httpsEndpointReachable(normalized))) {
        failed.push(normalized);
      }
    }
    if (failed.length === 0) return;
    throw new Error(
      `Outbound manifest: http→https upgrade failed (host does not respond over HTTPS):\n${failed.map((u) => `  - ${u}`).join("\n")}`,
    );
  }

  toSortedHashes(): string[] {
    return [...this.hashes].sort();
  }

  toManifestFile(generatedAt = new Date().toISOString()): OutboundDestManifestFile {
    return {
      schema_version: 1,
      generated_at: generatedAt,
      dest_hashes: this.toSortedHashes(),
    };
  }

  static fromManifestFile(data: OutboundDestManifestFile): OutboundDestRegistry {
    const r = new OutboundDestRegistry();
    for (const h of data.dest_hashes ?? []) {
      if (typeof h === "string" && /^[a-f0-9]{64}$/i.test(h)) r.hashes.add(h.toLowerCase());
    }
    return r;
  }
}

export async function loadOutboundDestRegistryFromFile(
  manifestPath: string,
): Promise<OutboundDestRegistry | null> {
  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    const data = JSON.parse(raw) as OutboundDestManifestFile;
    if (data.schema_version !== 1) return null;
    return OutboundDestRegistry.fromManifestFile(data);
  } catch {
    return null;
  }
}

export async function writeOutboundDestManifest(
  manifestPath: string,
  registry: OutboundDestRegistry,
): Promise<void> {
  const body = `${JSON.stringify(registry.toManifestFile(), null, 2)}\n`;
  await fs.writeFile(manifestPath, body, "utf8");
}

export function resolveOutboundDestFromManifest(
  rawDest: string,
  manifestHashes: ReadonlySet<string>,
): string | null {
  const normalized = normalizeOutboundDest(rawDest);
  if (!normalized) return null;
  const hash = outboundDestHash(normalized);
  return manifestHashes.has(hash) ? normalized : null;
}

/** Inline JS: normalize dest + SHA-256 hex (must stay in sync with normalizeOutboundDest). */
export function outboundDestClientHelpersScript(): string {
  return `
  function isSafeExternalUrl(raw) {
    if (!raw) return false;
    raw = String(raw).trim();
    var lower = raw.toLowerCase();
    if (lower.indexOf("javascript:") === 0 || lower.indexOf("data:") === 0 || lower.indexOf("vbscript:") === 0) return false;
    var u;
    try { u = new URL(raw); } catch (e) { return false; }
    if (u.protocol !== "https:") return false;
    if (!u.hostname || u.username || u.password) return false;
    return true;
  }

  function normalizeOutboundDest(raw) {
    if (!isSafeExternalUrl(raw)) return null;
    try {
      var u = new URL(String(raw).trim());
      u.username = "";
      u.password = "";
      u.hash = "";
      u.hostname = u.hostname.toLowerCase();
      if (u.port === "443") u.port = "";
      var path = u.pathname;
      if (path.length > 1 && path.charAt(path.length - 1) === "/") {
        path = path.slice(0, -1);
      }
      u.pathname = path;
      return u.href;
    } catch (e) { return null; }
  }

  function sha256Hex(str) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(function (buf) {
      return Array.from(new Uint8Array(buf)).map(function (b) {
        return b.toString(16).padStart(2, "0");
      }).join("");
    });
  }

  function resolveManifestOutbound(raw, hashMap) {
    var norm = normalizeOutboundDest(raw);
    if (!norm) return Promise.resolve(null);
    return sha256Hex(norm).then(function (h) {
      return hashMap[h] ? norm : null;
    });
  }
`;
}

/** Run the inline /go normalizer in Node for parity tests. */
export function runClientNormalizeOutboundDest(raw: string): string | null {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = new Function(
    "URL",
    "raw",
    `${outboundDestClientHelpersScript()}\nreturn normalizeOutboundDest(raw);`,
  ) as (URL: typeof globalThis.URL, raw: string) => string | null;
  return fn(URL, raw);
}
