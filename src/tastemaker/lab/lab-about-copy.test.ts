import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prepareLabProseHtmlFromMarkdown } from "../../../scripts/lab/lab-format.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const REMOVED =
  "If you have questions or spot something that looks off, open an issue. We would rather fix a misleading chart than hide the methodology.";

describe("Lab about page copy", () => {
  it("does not include the removed open issue methodology sentence", () => {
    const md = fs.readFileSync(path.join(repoRoot, "briefings/lab/about.md"), "utf8");
    expect(md).not.toContain(REMOVED);
    expect(md).not.toContain("misleading chart");
    const html = prepareLabProseHtmlFromMarkdown(md);
    expect(html).not.toContain("misleading chart");
    expect(html).toContain("Transparency boundaries");
  });
});
