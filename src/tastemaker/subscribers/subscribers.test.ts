import { describe, it, expect } from "vitest";
import {
  mergeRecipientEmails,
  isValidEmail,
  normalizeEmail,
} from "./load.js";

describe("mergeRecipientEmails", () => {
  it("dedupes and lowercases", () => {
    expect(
      mergeRecipientEmails(
        ["A@X.com", "b@y.com"],
        ["a@x.com", "c@z.com"],
      ),
    ).toEqual(["a@x.com", "b@y.com", "c@z.com"]);
  });

  it("skips blank entries", () => {
    expect(mergeRecipientEmails(["  ", "a@x.com"])).toEqual(["a@x.com"]);
  });
});

describe("isValidEmail", () => {
  it("accepts simple addresses", () => {
    expect(isValidEmail("you@example.com")).toBe(true);
  });

  it("rejects invalid addresses", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
  });
});

describe("normalizeEmail", () => {
  it("trims and lowercases", () => {
    expect(normalizeEmail("  You@Example.COM ")).toBe("you@example.com");
  });
});
