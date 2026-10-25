/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from "vitest";
import { renderLabPostCameFromScript } from "../../../scripts/lab/lab-post-header.js";

function runCameFromScript(search: string): HTMLElement {
  document.body.innerHTML = '<p id="lab-post-came-from" class="hidden"></p>';
  const wrapped = renderLabPostCameFromScript();
  const code = wrapped.replace(/^<script>\s*/i, "").replace(/<\/script>\s*$/i, "");
  window.history.replaceState({}, "", `/lab/posts/EXP-20260802-ponytail-narration-skills.html${search}`);
  // eslint-disable-next-line no-eval
  eval(code);
  const el = document.getElementById("lab-post-came-from");
  if (!el) throw new Error("missing #lab-post-came-from");
  return el;
}

describe("renderLabPostCameFromScript (jsdom)", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders came-from line for valid attribution params", () => {
    const el = runCameFromScript("?from_list=skills&from_rank=1");
    expect(el.classList.contains("hidden")).toBe(false);
    expect(el.textContent).toContain("You came here from the");
    expect(el.textContent).toContain("Skill Tastemakers daily list");
    expect(el.textContent).toContain("at number 1");
    expect(el.textContent).toContain("Back to the daily list");
    expect(el.querySelectorAll("a").length).toBe(2);
    expect(el.innerHTML).not.toMatch(/<script/i);
  });

  it("leaves came-from hidden for hostile location.search", () => {
    const hostile = [
      "?from_list=evil&from_rank=1",
      "?from_list=%22%3E%3Cscript%3Ealert(1)&from_rank=2",
      "?from_list=skills&from_rank=3abc",
      "?from_list=skills&from_rank=0",
      "?from_list=skills&from_rank=11",
      "?from_list=skills&from_rank=1%0d%0a",
      "?from_list=skills&from_list=oss&from_rank=2",
      "?from_list=skills",
      "?from_rank=2",
      "",
    ];
    for (const search of hostile) {
      const el = runCameFromScript(search);
      expect(el.classList.contains("hidden"), search).toBe(true);
      expect(el.textContent?.trim(), search).toBe("");
      expect(el.querySelector("script"), search).toBeNull();
    }
  });
});
