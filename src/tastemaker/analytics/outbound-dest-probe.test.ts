import dns from "node:dns/promises";
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  assertSafeOutboundProbeUrl,
  isBlockedProbeIpAddress,
  probeHttpsEndpointReachability,
} from "./outbound-dest-probe.js";

describe("isBlockedProbeIpAddress", () => {
  it("blocks private, loopback, link-local, and metadata ranges", () => {
    expect(isBlockedProbeIpAddress("10.0.0.1")).toBe(true);
    expect(isBlockedProbeIpAddress("172.16.0.1")).toBe(true);
    expect(isBlockedProbeIpAddress("192.168.1.1")).toBe(true);
    expect(isBlockedProbeIpAddress("127.0.0.1")).toBe(true);
    expect(isBlockedProbeIpAddress("169.254.169.254")).toBe(true);
    expect(isBlockedProbeIpAddress("::1")).toBe(true);
    expect(isBlockedProbeIpAddress("fc00::1")).toBe(true);
    expect(isBlockedProbeIpAddress("fd12::1")).toBe(true);
  });

  it("allows public addresses", () => {
    expect(isBlockedProbeIpAddress("8.8.8.8")).toBe(false);
    expect(isBlockedProbeIpAddress("2001:4860:4860::8888")).toBe(false);
  });
});

describe("assertSafeOutboundProbeUrl", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks literal loopback before any fetch", async () => {
    await expect(assertSafeOutboundProbeUrl("https://127.0.0.1/x")).rejects.toThrow(
      /blocked IP literal/,
    );
  });

  it("blocks after DNS resolves to a private address", async () => {
    vi.spyOn(dns, "lookup").mockResolvedValue([{ address: "10.0.0.55", family: 4 }] as never);
    await expect(assertSafeOutboundProbeUrl("https://innocent.example/path")).rejects.toThrow(
      /blocked address 10.0.0.55/,
    );
  });
});

describe("probeHttpsEndpointReachability", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks redirect targets in private space", async () => {
    const fetchImpl = vi.fn(async (url: string) => {
      if (url.startsWith("https://public.example/")) {
        return new Response(null, {
          status: 302,
          headers: { Location: "https://192.168.0.50/secret" },
        });
      }
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.spyOn(dns, "lookup").mockResolvedValue([{ address: "8.8.8.8", family: 4 }] as never);

    const result = await probeHttpsEndpointReachability(
      "https://public.example/start",
      fetchImpl as typeof fetch,
    );
    expect(result).toBe("blocked");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
