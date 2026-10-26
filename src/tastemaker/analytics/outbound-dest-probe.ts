import { BlockList, isIP } from "node:net";
import dns from "node:dns/promises";

const BLOCKED_IPS = new BlockList();
BLOCKED_IPS.addSubnet("10.0.0.0", 8, "ipv4");
BLOCKED_IPS.addSubnet("172.16.0.0", 12, "ipv4");
BLOCKED_IPS.addSubnet("192.168.0.0", 16, "ipv4");
BLOCKED_IPS.addSubnet("127.0.0.0", 8, "ipv4");
BLOCKED_IPS.addSubnet("169.254.0.0", 16, "ipv4");
BLOCKED_IPS.addSubnet("0.0.0.0", 8, "ipv4");
BLOCKED_IPS.addSubnet("::1", 128, "ipv6");
BLOCKED_IPS.addSubnet("fc00::", 7, "ipv6");
BLOCKED_IPS.addSubnet("fe80::", 10, "ipv6");

const BLOCKED_PROBE_HOSTNAMES = new Set(["localhost", "metadata", "metadata.google.internal"]);

export class OutboundProbeBlockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OutboundProbeBlockedError";
  }
}

export function isBlockedProbeIpAddress(address: string): boolean {
  const kind = isIP(address);
  if (kind === 4) return BLOCKED_IPS.check(address, "ipv4");
  if (kind === 6) return BLOCKED_IPS.check(address, "ipv6");
  return true;
}

export type DnsLookupFn = typeof dns.lookup;

/** Validate URL and resolved addresses before any outbound manifest probe. */
export async function assertSafeOutboundProbeUrl(
  urlString: string,
  lookup: DnsLookupFn = dns.lookup.bind(dns),
): Promise<void> {
  let u: URL;
  try {
    u = new URL(urlString);
  } catch {
    throw new OutboundProbeBlockedError("invalid probe URL");
  }
  if (u.protocol !== "https:") {
    throw new OutboundProbeBlockedError("probe requires https URL");
  }
  const host = u.hostname.replace(/^\[/, "").replace(/\]$/, "").toLowerCase();
  if (BLOCKED_PROBE_HOSTNAMES.has(host) || host.endsWith(".localhost")) {
    throw new OutboundProbeBlockedError(`blocked hostname: ${host}`);
  }
  if (host === "169.254.169.254") {
    throw new OutboundProbeBlockedError("blocked cloud metadata host");
  }
  if (isIP(host)) {
    if (isBlockedProbeIpAddress(host)) {
      throw new OutboundProbeBlockedError(`blocked IP literal: ${host}`);
    }
    return;
  }
  const records = await lookup(host, { all: true, verbatim: true });
  if (!records.length) {
    throw new OutboundProbeBlockedError(`no DNS records for ${host}`);
  }
  for (const rec of records) {
    if (isBlockedProbeIpAddress(rec.address)) {
      throw new OutboundProbeBlockedError(
        `DNS for ${host} resolves to blocked address ${rec.address}`,
      );
    }
  }
}

export type ProbeReachability = "ok" | "unreachable" | "blocked";

const MAX_PROBE_REDIRECTS = 8;

export async function probeHttpsEndpointReachability(
  startUrl: string,
  fetchImpl: typeof fetch = fetch,
  lookup: DnsLookupFn = dns.lookup.bind(dns),
): Promise<ProbeReachability> {
  let current = startUrl;
  for (let hop = 0; hop <= MAX_PROBE_REDIRECTS; hop++) {
    try {
      await assertSafeOutboundProbeUrl(current, lookup);
    } catch (err) {
      if (err instanceof OutboundProbeBlockedError) return "blocked";
      return "blocked";
    }

    const request = async (method: "HEAD" | "GET"): Promise<Response> =>
      fetchImpl(current, {
        method,
        redirect: "manual",
        signal: AbortSignal.timeout(12_000),
        headers: method === "GET" ? { Range: "bytes=0-0" } : undefined,
      });

    let res: Response;
    try {
      res = await request("HEAD");
    } catch {
      try {
        res = await request("GET");
      } catch {
        return "unreachable";
      }
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location || hop === MAX_PROBE_REDIRECTS) return "unreachable";
      try {
        current = new URL(location, current).href;
      } catch {
        return "unreachable";
      }
      continue;
    }

    return res.status < 500 ? "ok" : "unreachable";
  }
  return "unreachable";
}
