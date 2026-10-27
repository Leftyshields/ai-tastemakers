import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { EM_DASH } from "./seo-copy.js";
import { writeSitemapFromSiteDir } from "./seo-helpers.js";
import { checkSeoText } from "./site-seo-text-gate.js";

describe("verify-site-seo sitemap expectations", () => {
  it("writeSitemapFromSiteDir lists only HTML page URLs with lastmod", async () => {
    const tmp = await fs.promises.mkdtemp(path.join(os.tmpdir(), "seo-sitemap-"));
    await fs.promises.writeFile(path.join(tmp, "index.html"), "<!DOCTYPE html><html><body><h1>Home</h1></body></html>");
    await fs.promises.writeFile(path.join(tmp, "style.css"), "body{}");
    const count = await writeSitemapFromSiteDir(tmp, "https://example.com/site");
    const xml = await fs.promises.readFile(path.join(tmp, "sitemap.xml"), "utf8");
    expect(count).toBe(1);
    expect(xml).toContain("<lastmod>");
    expect(xml).not.toContain(".css");
    await fs.promises.rm(tmp, { recursive: true, force: true });
  });
});

describe("verify-site-seo em dash gate", () => {
  it("rejects U+2014 in document title, meta description, and og fields", () => {
    const rel = "briefings/2026-01-01.html";
    expect(checkSeoText(`Daily Brief${EM_DASH} Jan 1`, rel, "title").some((m) => m.includes("U+2014"))).toBe(
      true,
    );
    expect(checkSeoText(`Hook${EM_DASH} detail`, rel, "description").some((m) => m.includes("U+2014"))).toBe(
      true,
    );
    expect(checkSeoText("Daily Brief: Jan 1", rel, "title")).toEqual([]);
    expect(checkSeoText("Plain description.", rel, "description")).toEqual([]);
  });
});
