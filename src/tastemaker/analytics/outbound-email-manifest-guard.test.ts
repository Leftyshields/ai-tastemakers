import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import {
  OUTBOUND_DEST_MANIFEST_SITE_REL,
  assertRenderedEmailAllowedByManifest,
} from "./outbound-email-manifest-guard.js";

describe("assertRenderedEmailAllowedByManifest", () => {
  let tmpDir: string;

  afterEach(async () => {
    if (tmpDir) await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("throws when the deployed manifest file is missing", async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "outbound-guard-"));
    const html =
      '<a href="https://example.com/go/?event=outbound_link_click&dest=https%3A%2F%2Fexample.com%2Fx">link</a>';

    await expect(assertRenderedEmailAllowedByManifest(tmpDir, html)).rejects.toThrow(
      `Missing ${OUTBOUND_DEST_MANIFEST_SITE_REL}`,
    );
  });
});
