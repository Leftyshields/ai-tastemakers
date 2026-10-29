import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import { OUTBOUND_DEST_MANIFEST_SITE_REL } from "./outbound-email-manifest-guard.js";
import { refreshOutboundEmailDestManifest } from "./write-outbound-email-manifest.js";

describe("refreshOutboundEmailDestManifest", () => {
  let tmpDir: string;

  afterEach(async () => {
    if (tmpDir) await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("writes the outbound dest manifest under site/assets", async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "outbound-manifest-"));
    const manifestPath = await refreshOutboundEmailDestManifest(tmpDir, "https://example.com", {
      pendingDigest: {
        dateLabel: "2026-08-16",
        editionId: "oss",
        digest: {
          schema_version: 1,
          ranking_mode: "delta_7d",
          repos: [
            {
              rank: 1,
              full_name: "acme/demo",
              html_url: "https://github.com/acme/demo",
              stars: 10,
              stars_gained_7d: 1,
              topics: ["llm"],
              brief: "See [docs](https://example.com/docs).",
            },
          ],
        },
      },
    });

    expect(manifestPath).toBe(path.join(tmpDir, OUTBOUND_DEST_MANIFEST_SITE_REL));
    const raw = JSON.parse(await fs.readFile(manifestPath, "utf8")) as {
      schema_version: number;
      dest_hashes: string[];
    };
    expect(raw.schema_version).toBe(1);
    expect(Array.isArray(raw.dest_hashes)).toBe(true);
    expect(await fs.stat(manifestPath)).toBeTruthy();
  });
});
