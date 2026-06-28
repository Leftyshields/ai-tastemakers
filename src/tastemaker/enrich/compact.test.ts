import { describe, it, expect } from "vitest";
import { compactEnrichment } from "./compact.js";

describe("compactEnrichment", () => {
  it("joins sources with headers", () => {
    const text = compactEnrichment(
      [
        { kind: "web", label: "Web", text: "Page content here." },
        { kind: "hn", label: "HN", text: "1. Show HN: demo" },
      ],
      1500,
    );
    expect(text).toContain("[Web]");
    expect(text).toContain("[HN]");
    expect(text).toContain("Page content here.");
  });

  it("truncates to maxChars", () => {
    const long = "x".repeat(2000);
    const text = compactEnrichment([{ kind: "web", label: "Web", text: long }], 100);
    expect(text.length).toBeLessThanOrEqual(110);
  });
});
