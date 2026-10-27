import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { writeSitemapFromSiteDir } from "./seo-helpers.js";

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
