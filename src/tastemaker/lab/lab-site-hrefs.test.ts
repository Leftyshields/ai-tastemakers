import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findInternalHrefViolations } from "../../../scripts/verify-lab-internal-hrefs.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("site internal hrefs (UX30 link checker)", () => {
  it("resolves footer Methodology link from main site pages", () => {
    const page = path.join(repoRoot, "site/subscribe.html");
    if (!fs.existsSync(page)) return;
    const html = fs.readFileSync(page, "utf8");
    expect(html).toContain("lab/methodology.html");
    expect(findInternalHrefViolations(html, page)).toEqual([]);
  });

  it("resolves Lab home experiments link to methodology.html", () => {
    const page = path.join(repoRoot, "site/lab/index.html");
    if (!fs.existsSync(page)) return;
    const html = fs.readFileSync(page, "utf8");
    expect(html).toContain("How we run experiments");
    expect(findInternalHrefViolations(html, page)).toEqual([]);
  });
});
