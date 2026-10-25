/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from "vitest";
import { renderLabPostHeaderClientScripts } from "../../../scripts/lab/lab-post-header.js";

function mountAndClick(search: string, ossHref: string, skillsHref: string): string | undefined {
  document.body.innerHTML = `<header class="lab-post-header"><div class="lab-post-header__hdr"><button type="button" id="lab-post-back-btn" class="lab-post-back-btn" data-lab-section="posts">Back</button><span class="lab-post-header__vdiv"></span><div class="lab-post-split-chip"></div></div></header>`;
  const code = renderLabPostHeaderClientScripts(ossHref, skillsHref)
    .replace(/^<script>\s*/i, "")
    .replace(/<\/script>\s*$/i, "");
  // eslint-disable-next-line no-eval
  eval(code);
  let navigated: string | undefined;
  const base = `https://example.com/lab/posts/x.html${search}`;
  const loc = {
    search,
    assign(v: string) {
      navigated = v;
    },
  };
  Object.defineProperty(loc, "href", {
    configurable: true,
    get: () => base,
    set(v: string) {
      navigated = v;
    },
  });
  Object.defineProperty(window, "location", { configurable: true, value: loc });
  Object.defineProperty(window.history, "length", { configurable: true, value: 1 });
  document.getElementById("lab-post-back-btn")!.click();
  return navigated;
}

describe("renderLabPostHeaderClientScripts (jsdom)", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("navigates to validated skills digest when from_list=skills", () => {
    expect(
      mountAndClick("?from_list=skills&from_rank=2", "../briefings/2026-08-01.html", "../../skills/index.html"),
    ).toBe("../../skills/index.html");
  });

  it("ignores hostile params and falls back to lab home", () => {
    expect(
      mountAndClick("?from_list=evil&from_rank=9", "../briefings/2026-08-01.html", "../../skills/index.html"),
    ).toBe("../index.html");
  });
});
