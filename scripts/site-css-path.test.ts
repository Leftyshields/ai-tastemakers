import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { findBuiltStylesheet, readStylesheetHrefFromHtml } from "./site-css-path.js";

test("findBuiltStylesheet prefers single hashed bundle", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "css-path-"));
  fs.writeFileSync(path.join(dir, "style.deadbeef.css"), "body{}");
  assert.equal(findBuiltStylesheet(dir), path.join(dir, "style.deadbeef.css"));
});

test("readStylesheetHrefFromHtml returns relative hashed href", () => {
  const html = '<link rel="stylesheet" href="../assets/style.abcd1234.css">';
  assert.equal(readStylesheetHrefFromHtml(html), "../assets/style.abcd1234.css");
});
