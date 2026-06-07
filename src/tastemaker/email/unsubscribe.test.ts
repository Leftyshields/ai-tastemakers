import { describe, it, expect } from "vitest";
import { digestUnsubscribeUrl } from "./unsubscribe.js";

describe("digestUnsubscribeUrl", () => {
  it("builds unsubscribe page URL without trailing slash", () => {
    expect(digestUnsubscribeUrl("https://example.com/app/")).toBe(
      "https://example.com/app/unsubscribe.html",
    );
  });

  it("prefills normalized email when provided", () => {
    expect(digestUnsubscribeUrl("https://example.com/app", "  User@Example.COM ")).toBe(
      "https://example.com/app/unsubscribe.html?email=user%40example.com",
    );
  });
});
