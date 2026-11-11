import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  GOOGLE_SITE_VERIFICATION_HTML,
  GOOGLE_SITE_VERIFICATION_LINE,
  isSiteGateExemptHtmlFile,
} from "./site-verification-pages.js";

describe("isSiteGateExemptHtmlFile", () => {
  it("exempts only the exact verification file with the exact line", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "gsc-exempt-"));
    const okPath = path.join(tmp, GOOGLE_SITE_VERIFICATION_HTML);
    fs.writeFileSync(okPath, `${GOOGLE_SITE_VERIFICATION_LINE}\n`);
    expect(isSiteGateExemptHtmlFile(okPath)).toBe(true);
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("does not exempt a different google<hex>.html basename", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "gsc-exempt-"));
    const other = path.join(tmp, "googleaaaaaaaaaaaaaaaa.html");
    fs.writeFileSync(other, `${GOOGLE_SITE_VERIFICATION_LINE}\n`);
    expect(isSiteGateExemptHtmlFile(other)).toBe(false);
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("does not exempt the exact basename when content is wrong", () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "gsc-exempt-"));
    const pathWrong = path.join(tmp, GOOGLE_SITE_VERIFICATION_HTML);
    fs.writeFileSync(pathWrong, "google-site-verification: wrong\n");
    expect(isSiteGateExemptHtmlFile(pathWrong)).toBe(false);
    fs.rmSync(tmp, { recursive: true, force: true });
  });
});
