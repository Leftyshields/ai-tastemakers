import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";

/** External https/http URL safe to redirect when listed in the manifest. */
export function isSafeExternalHttpUrl(raw: string): boolean {
  let href = raw.trim();
  if (!href) return false;
  try {
    href = decodeURIComponent(href);
  } catch {
    return false;
  }
  const lower = href.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
    return false;
  }
  let u: URL;
  try {
    u = new URL(href);
  } catch {
    return false;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return false;
  if (!u.hostname) return false;
  if (u.username || u.password) return false;
  return true;
}

/** Canonical form for manifest lookup (must match /go client script). */
export function normalizeOutboundDest(raw: string): string | null {
  if (!isSafeExternalHttpUrl(raw)) return null;
  try {
    let href = raw.trim();
    try {
      href = decodeURIComponent(href);
    } catch {
      return null;
    }
    const u = new URL(href);
    u.username = "";
    u.password = "";
    u.hash = "";
    u.hostname = u.hostname.toLowerCase();
    if (u.protocol === "https:" && u.port === "443") u.port = "";
    if (u.protocol === "http:" && u.port === "80") u.port = "";
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

export class OutboundDestRegistry {
  private readonly hashes = new Set<string>();

  register(rawDest: string): boolean {
    const normalized = normalizeOutboundDest(rawDest);
    if (!normalized) return false;
    this.hashes.add(outboundDestHash(normalized));
    return true;
  }

  registerNormalized(normalizedDest: string): void {
    this.hashes.add(outboundDestHash(normalizedDest));
  }

  merge(other: OutboundDestRegistry): void {
    for (const h of other.hashes) this.hashes.add(h);
  }

  hasHash(hash: string): boolean {
    return this.hashes.has(hash);
  }

  hasRawDest(rawDest: string): boolean {
    const normalized = normalizeOutboundDest(rawDest);
    if (!normalized) return false;
    return this.hashes.has(outboundDestHash(normalized));
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
    try { raw = decodeURIComponent(String(raw).trim()); } catch (e) { return false; }
    var lower = String(raw).toLowerCase();
    if (lower.indexOf("javascript:") === 0 || lower.indexOf("data:") === 0 || lower.indexOf("vbscript:") === 0) return false;
    var u;
    try { u = new URL(raw); } catch (e) { return false; }
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    if (!u.hostname || u.username || u.password) return false;
    return true;
  }

  function normalizeOutboundDest(raw) {
    if (!isSafeExternalUrl(raw)) return null;
    try {
      raw = decodeURIComponent(String(raw).trim());
      var u = new URL(raw);
      u.username = "";
      u.password = "";
      u.hash = "";
      u.hostname = u.hostname.toLowerCase();
      if (u.protocol === "https:" && u.port === "443") u.port = "";
      if (u.protocol === "http:" && u.port === "80") u.port = "";
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
