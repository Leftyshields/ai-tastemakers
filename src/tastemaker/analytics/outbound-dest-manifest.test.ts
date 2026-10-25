import vm from "node:vm";
import { describe, it, expect } from "vitest";
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
  it("registers https hash from http input (verified at build via verifyHttpUpgrades)", async () => {
    const r = new OutboundDestRegistry();
    expect(r.register("http://example.com/path")).toBe(true);
    expect(r.hasRawDest("https://example.com/path")).toBe(true);
    await expect(r.verifyHttpUpgrades()).resolves.toBeUndefined();
  });
});
