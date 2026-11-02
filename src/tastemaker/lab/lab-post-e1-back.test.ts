/**
 * @vitest-environment node
 *
 * Uses a minimal DOM shim instead of Vitest's jsdom environment so we do not
 * load jsdom 30 (and its undici dependency) during the test run.
 */
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { renderLabPostHeaderClientScripts } from "../../../scripts/lab/lab-post-header.js";

type ClickableElement = {
  addEventListener(type: string, listener: () => void): void;
  click(): void;
  offsetTop: number;
};

function installMinimalDom(): void {
  const clickListeners: Array<() => void> = [];
  const button: ClickableElement = {
    addEventListener(type, listener) {
      if (type === "click") clickListeners.push(listener);
    },
    click() {
      for (const listener of clickListeners) listener();
    },
    offsetTop: 0,
  };
  const hdr = {
    classList: {
      toggle() {
        /* layout sync not under test */
      },
    },
  };
  const chip = { offsetTop: 0 };

  const documentShim = {
    body: { innerHTML: "" as string },
    getElementById(id: string) {
      return id === "lab-post-back-btn" ? button : null;
    },
    querySelector(selector: string) {
      if (selector === ".lab-post-header__hdr") return hdr;
      if (selector === ".lab-post-split-chip" || selector === ".lab-post-header__repo-link") {
        return chip;
      }
      return null;
    },
  };

  const windowShim: Record<string, unknown> = {
    document: documentShim,
    location: {
      search: "",
      href: "https://example.com/lab/posts/x.html",
      assign() {
        /* set in mountAndClick */
      },
    },
    history: {
      length: 1,
      back() {
        /* not used in these cases */
      },
    },
    addEventListener() {
      /* resize fallback not under test */
    },
  };

  Object.assign(globalThis, {
    document: documentShim,
    window: windowShim,
    ResizeObserver: undefined,
  });
}

function mountAndClick(search: string, ossHref: string, skillsHref: string): string | undefined {
  installMinimalDom();
  const documentShim = globalThis.document as typeof globalThis.document & {
    body: { innerHTML: string };
  };
  documentShim.body.innerHTML = `<header class="lab-post-header"><div class="lab-post-header__hdr"><button type="button" id="lab-post-back-btn" class="lab-post-back-btn" data-lab-section="posts">Back</button><span class="lab-post-header__vdiv"></span><div class="lab-post-split-chip"></div></div></header>`;
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
  const windowShim = globalThis.window as Window & { location: typeof loc; history: { length: number } };
  Object.defineProperty(windowShim, "location", { configurable: true, value: loc });
  Object.defineProperty(windowShim.history, "length", { configurable: true, value: 1 });
  documentShim.getElementById("lab-post-back-btn")!.click();
  return navigated;
}

describe("renderLabPostHeaderClientScripts (jsdom)", () => {
  beforeEach(() => {
    installMinimalDom();
    (globalThis.document as { body: { innerHTML: string } }).body.innerHTML = "";
  });

  afterEach(() => {
    delete (globalThis as { document?: unknown }).document;
    delete (globalThis as { window?: unknown }).window;
    delete (globalThis as { ResizeObserver?: unknown }).ResizeObserver;
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

  it("rejects malicious or malformed attribution (same cases as former came-from gate)", () => {
    const ossHref = "../briefings/2026-08-01.html";
    const skillsHref = "../../skills/index.html";
    const hostile = [
      "?from_list=%22%3E%3Cscript%3Ealert(1)&from_rank=2",
      "?from_list=skills&from_rank=3abc",
      "?from_list=skills&from_rank=0",
      "?from_list=skills&from_rank=11",
      "?from_list=skills&from_rank=1%0d%0a",
      "?from_list=skills&from_list=oss&from_rank=2",
    ];
    for (const search of hostile) {
      expect(mountAndClick(search, ossHref, skillsHref), search).toBe("../index.html");
    }
  });
});
