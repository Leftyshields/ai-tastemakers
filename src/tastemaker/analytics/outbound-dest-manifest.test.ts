import dns from "node:dns/promises";
import vm from "node:vm";
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  normalizeOutboundDest,
  outboundDestClientHelpersScript,
  parseOutboundDestUrl,
  resolveOutboundDestFromManifest,
  runClientNormalizeOutboundDest,
  OutboundDestRegistry,
} from "./outbound-dest-manifest.js";
import { resolveGoPageDestination } from "../../../scripts/digest-go-page.js";

function clientNormalizeViaVm(raw: string): string | null {
  const sandbox: { URL: typeof URL; result: string | null } = {
    URL,
    result: null,
  };
  vm.runInNewContext(
    `${outboundDestClientHelpersScript()}\nresult = normalizeOutboundDest(${JSON.stringify(raw)});`,
    sandbox,
  );
  return sandbox.result;
}

const PARITY_INPUTS = [
  "https://EXAMPLE.com/path/",
  "https://example.com:443/docs/",
  "https://example.com/foo%2Fbar",
  "https://xn--fiqs8s.xn--fiqz9s.xn--fiqs8s/wiki/%E7%99%BE%E7%A7%91",
  "https://example.com/path?q=1&x=2#ignored",
  "https://Example.COM:443/Trailing/?a=1",
];

describe("Node vs /go client normalizer parity", () => {
  it.each(PARITY_INPUTS)("matches for %s", (raw) => {
    const node = normalizeOutboundDest(raw);
    const viaFn = runClientNormalizeOutboundDest(raw);
    const viaVm = clientNormalizeViaVm(raw);
    expect(viaFn).toBe(node);
    expect(viaVm).toBe(node);
  });
});

describe("normalizeOutboundDest encoding", () => {
  it("does not decode %3F in path into a query delimiter before parsing", () => {
    const raw = "https://example.com/segment%3Fnotquery=1";
    const norm = normalizeOutboundDest(raw)!;
    expect(norm).toContain("/segment%3Fnotquery=1");
    expect(parseOutboundDestUrl(raw)!.pathname).toBe("/segment%3Fnotquery=1");
  });

  it("strips hash after parse without breaking encoded path", () => {
    const raw = "https://example.com/foo%23bar#frag";
    const norm = normalizeOutboundDest(raw)!;
    expect(norm).not.toContain("#");
    expect(norm).toContain("foo%23bar");
  });

  it("rejects bare http destinations (https-only on /go)", () => {
    expect(normalizeOutboundDest("http://example.com/x")).toBeNull();
    expect(runClientNormalizeOutboundDest("http://example.com/x")).toBeNull();
  });
});

describe("resolveGoPageDestination dest param decoding", () => {
  const home = "https://site.example/home/";
  const allowlist = {};

  it("uses URLSearchParams once so encoded query in URL stays intact", () => {
    const dest = "https://example.com/doc%3Fq=1";
    const registry = new OutboundDestRegistry();
    registry.register(dest);
    const hashes = new Set(registry.toSortedHashes());
    const query = `?event=outbound_link_click&dest=${encodeURIComponent(dest)}`;
    expect(resolveGoPageDestination(query, allowlist, home, hashes)).toBe(
      normalizeOutboundDest(dest),
    );
  });

  it("manifest hit with tricky encoded path via search params", () => {
    const dest = "https://example.com/a%2Fb?c=d";
    const registry = new OutboundDestRegistry();
    registry.register(dest);
    const hashes = new Set(registry.toSortedHashes());
    const resolved = resolveOutboundDestFromManifest(
      new URLSearchParams(`dest=${encodeURIComponent(dest)}`).get("dest")!,
      hashes,
    );
    expect(resolved).toBe(normalizeOutboundDest(dest));
  });
});

describe("OutboundDestRegistry http upgrade", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps manifest entry when HTTPS probe succeeds", async () => {
    const r = new OutboundDestRegistry();
    expect(r.register("http://example.com/path")).toBe(true);
    const fetchImpl = vi.fn(async () => new Response(null, { status: 200 })) as typeof fetch;
    vi.spyOn(dns, "lookup").mockResolvedValue([{ address: "93.184.216.34", family: 4 }] as never);
    await r.verifyHttpUpgrades({ fetchImpl });
    expect(r.hasRawDest("https://example.com/path")).toBe(true);
    expect(fetchImpl).toHaveBeenCalled();
  });

  it("drops unreachable http upgrade with a warning instead of failing the build", async () => {
    const r = new OutboundDestRegistry();
    r.register("http://example.com/dead");
    const warnings: string[] = [];
    const fetchImpl = vi.fn(async () => {
      throw new Error("connection refused");
    }) as typeof fetch;
    vi.spyOn(dns, "lookup").mockResolvedValue([{ address: "93.184.216.34", family: 4 }] as never);
    await expect(
      r.verifyHttpUpgrades({ warn: (m) => warnings.push(m), fetchImpl }),
    ).resolves.toBeUndefined();
    expect(r.hasRawDest("https://example.com/dead")).toBe(false);
    expect(warnings.some((w) => w.includes("HTTPS unreachable"))).toBe(true);
  });

  it("drops blocked probe targets (loopback) with a warning", async () => {
    const r = new OutboundDestRegistry();
    r.register("http://127.0.0.1/internal");
    const warnings: string[] = [];
    const fetchImpl = vi.fn() as typeof fetch;
    await r.verifyHttpUpgrades({ warn: (m) => warnings.push(m), fetchImpl });
    expect(r.hasRawDest("https://127.0.0.1/internal")).toBe(false);
    expect(warnings.some((w) => w.includes("blocked probe target"))).toBe(true);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
