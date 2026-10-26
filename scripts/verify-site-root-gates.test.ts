import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { runH1Gate, runUntrackedLinkGate } from "./site-root-gates.js";
import { runSitemapGate } from "./verify-site-sitemap-gate.js";
import {
  GOOGLE_SITE_VERIFICATION_HTML,
  GOOGLE_SITE_VERIFICATION_LINE,
} from "./site-verification-pages.js";

describe("site root gates exempt Google Search Console verification HTML", () => {
  it("sitemap gate rejects verification URLs in sitemap.xml", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sitemap-gate-"));
    const rel = GOOGLE_SITE_VERIFICATION_HTML;
    fs.writeFileSync(path.join(tmp, rel), `${GOOGLE_SITE_VERIFICATION_LINE}\n`);
    fs.writeFileSync(
      path.join(tmp, "sitemap.xml"),
      `<?xml version="1.0"?><urlset><url><loc>https://example.com/${rel}</loc></url></urlset>`,
    );
    expect(runSitemapGate(tmp)).toEqual([`sitemap gate: ${rel} must not appear in sitemap.xml`]);
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("h1 gate skips verification HTML without an h1", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "h1-gate-"));
    fs.writeFileSync(path.join(tmp, GOOGLE_SITE_VERIFICATION_HTML), `${GOOGLE_SITE_VERIFICATION_LINE}\n`);
    expect(runH1Gate(tmp)).toEqual([]);
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("untracked-link gate skips verification HTML with no inbound links", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "untracked-gate-"));
    fs.writeFileSync(path.join(tmp, GOOGLE_SITE_VERIFICATION_HTML), `${GOOGLE_SITE_VERIFICATION_LINE}\n`);
    expect(runUntrackedLinkGate(tmp)).toEqual([]);
    fs.rmSync(tmp, { recursive: true, force: true });
  });
});
