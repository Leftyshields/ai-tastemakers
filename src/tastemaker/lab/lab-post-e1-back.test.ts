/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderLabPostHeaderClientScripts } from "../../../scripts/lab/lab-post-header.js";

function mountAndClick(opts: {
  search: string;
  historyLength?: number;
  referrer?: string;
}): string | "back" | undefined {
  document.body.innerHTML = `<header class="lab-post-header"><div class="lab-post-header__hdr"><button type="button" id="lab-post-back-btn" class="lab-post-back-btn" data-lab-section="posts">Back</button><span class="lab-post-header__vdiv"></span><div class="lab-post-split-chip"></div></div></header>`;
  const code = renderLabPostHeaderClientScripts()
    .replace(/^<script>\s*/i, "")
    .replace(/<\/script>\s*$/i, "");
  // eslint-disable-next-line no-eval
  eval(code);
  let navigated: string | "back" | undefined;
  const back = vi.spyOn(window.history, "back").mockImplementation(() => {
    navigated = "back";
  });
  Object.defineProperty(document, "referrer", {
    configurable: true,
    value: opts.referrer ?? "",
  });
  Object.defineProperty(window.history, "length", {
    configurable: true,
    value: opts.historyLength ?? 1,
  });
  const base = `https://example.com/lab/posts/x.html${opts.search}`;
  const loc = {
    search: opts.search,
    origin: "https://example.com",
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
  document.getElementById("lab-post-back-btn")!.click();
  back.mockRestore();
  return navigated;
}

describe("renderLabPostHeaderClientScripts (jsdom)", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("uses history.back when same-origin referrer and history length > 1", () => {
    expect(
      mountAndClick({
        search: "",
        historyLength: 3,
        referrer: "https://example.com/briefings/2026-10-25.html",
      }),
    ).toBe("back");
  });

  it("navigates to validated brief from param when history back is unavailable", () => {
    expect(
      mountAndClick({
        search: "?from=briefings%2F2026-10-25.html%23repo-ponytail",
        historyLength: 1,
      }),
    ).toBe("../../briefings/2026-10-25.html#repo-ponytail");
  });

  it("falls back to daily list when params are hostile", () => {
    expect(mountAndClick({ search: "?from=//evil.com/briefings/2026-10-25.html" })).toBe(
      "../../index.html",
    );
    expect(mountAndClick({ search: "?from_list=skills&from_rank=2" })).toBe("../../index.html");
  });
});
