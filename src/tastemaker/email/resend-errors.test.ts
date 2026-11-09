import { describe, it, expect } from "vitest";
import { isResendIdempotentAlreadySent, recipientFailureLabel } from "./resend-errors.js";

describe("isResendIdempotentAlreadySent", () => {
  it("detects invalid_idempotent_request and 409", () => {
    expect(isResendIdempotentAlreadySent({ message: "invalid_idempotent_request" })).toBe(true);
    expect(isResendIdempotentAlreadySent(new Error("HTTP 409 conflict"))).toBe(true);
    expect(isResendIdempotentAlreadySent(new Error("rate limit"))).toBe(false);
  });
});

describe("recipientFailureLabel", () => {
  it("does not include the email address", () => {
    const label = recipientFailureLabel(0, "secret@example.com");
    expect(label).toMatch(/^recipient_1#/);
    expect(label).not.toContain("@");
  });
});
