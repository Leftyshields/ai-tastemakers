import { describe, it, expect } from "vitest";
import {
  findLabPostFirstPersonSentences,
  isUsGeographicProperNoun,
  labPostVisiblePlainText,
  stripLabPostHtmlForFirstPersonScan,
} from "../../../scripts/lab/lab-format.js";

describe("lab post first-person gate", () => {
  it("flags we, our, and us in visible prose", () => {
    const html = `<main><article><p>We ship changes often. Readers trust our notes. Contact us anytime.</p></article></main>`;
    const hits = findLabPostFirstPersonSentences(html);
    expect(hits).toHaveLength(3);
    expect(hits.some((s) => /\bWe\b/i.test(s))).toBe(true);
    expect(hits.some((s) => /\bour\b/i.test(s))).toBe(true);
    expect(hits.some((s) => /\bus\b/i.test(s))).toBe(true);
  });

  it("ignores shared chrome outside main", () => {
    const html = `<header><p>How we pick repos globally.</p></header><main><p>The post body is neutral.</p></main>`;
    expect(findLabPostFirstPersonSentences(html)).toEqual([]);
  });

  it("excludes blockquote, q, code, pre, and HTML comments", () => {
    const html = `<main>
      <!-- we hide in comments -->
      <article>
        <blockquote><p>We quoted someone.</p></blockquote>
        <q>our prior art</q>
        <code>we debug</code>
        <pre>our logs</pre>
        <p>Only this line counts: we keep it.</p>
      </article></main>`;
    const plain = labPostVisiblePlainText(html);
    expect(plain).not.toMatch(/\bquoted\b/i);
    expect(plain).not.toMatch(/\bprior art\b/i);
    expect(plain).not.toMatch(/\bdebug\b/i);
    expect(plain).not.toMatch(/\blogs\b/i);
    const hits = findLabPostFirstPersonSentences(html);
    expect(hits).toEqual(["Only this line counts: we keep it."]);
  });

  it("does not treat US East as first-person us", () => {
    expect(isUsGeographicProperNoun("Deploy in US East first.", 10)).toBe(true);
    const html = `<main><p>Deploy in US East before we roll out.</p></main>`;
    const hits = findLabPostFirstPersonSentences(html);
    expect(hits).toEqual(["Deploy in US East before we roll out."]);
    expect(hits[0]).not.toMatch(/\bUS\b.*\bour\b/);
  });

  it("stripLabPostHtmlForFirstPersonScan removes nested excluded tags", () => {
    const html = `<blockquote><code>we nested</code></blockquote><p>ok</p>`;
    const stripped = stripLabPostHtmlForFirstPersonScan(html);
    expect(stripped).not.toContain("nested");
    expect(stripped).toContain("ok");
  });
});
