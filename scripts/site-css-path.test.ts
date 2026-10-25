import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { findBuiltStylesheet, readStylesheetHrefFromHtml } from "./site-css-path.js";

describe("site-css-path", () => {
  it("findBuiltStylesheet prefers single hashed bundle", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "css-path-"));
    fs.writeFileSync(path.join(dir, "style.deadbeef.css"), "body{}");
    expect(findBuiltStylesheet(dir)).toBe(path.join(dir, "style.deadbeef.css"));
  });

  it("readStylesheetHrefFromHtml returns relative hashed href", () => {
    const html = '<link rel="stylesheet" href="../assets/style.abcd1234.css">';
    expect(readStylesheetHrefFromHtml(html)).toBe("../assets/style.abcd1234.css");
  });
});
