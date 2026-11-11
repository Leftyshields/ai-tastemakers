import { describe, it, expect } from "vitest";
import {
  isResendIdempotentAlreadySent,
  isResendConcurrentIdempotentRequest,
  recipientFailureLabel,
  truncateResendFailureMessage,
} from "./resend-errors.js";

describe("isResendIdempotentAlreadySent", () => {
  it("is true only for structured invalid_idempotent_request", () => {
    expect(isResendIdempotentAlreadySent({ name: "invalid_idempotent_request" })).toBe(true);
    expect(isResendIdempotentAlreadySent({ code: "invalid_idempotent_request" })).toBe(true);
    expect(isResendIdempotentAlreadySent({ message: "invalid_idempotent_request" })).toBe(false);
    expect(isResendIdempotentAlreadySent(new Error("HTTP 409 conflict"))).toBe(false);
    expect(isResendIdempotentAlreadySent({ name: "concurrent_idempotent_requests" })).toBe(false);
  });
});

describe("isResendConcurrentIdempotentRequest", () => {
  it("is true only for structured concurrent_idempotent_requests", () => {
    expect(isResendConcurrentIdempotentRequest({ name: "concurrent_idempotent_requests" })).toBe(
      true,
    );
    expect(isResendConcurrentIdempotentRequest({ message: "concurrent_idempotent_requests" })).toBe(
      false,
    );
  });
});

describe("truncateResendFailureMessage", () => {
  it("truncates long messages", () => {
    const long = "x".repeat(250);
    expect(truncateResendFailureMessage(long)).toHaveLength(201);
  });
});

describe("recipientFailureLabel", () => {
  it("does not include the email address", () => {
    const label = recipientFailureLabel(0, "secret@example.com");
    expect(label).toMatch(/^recipient_1#/);
    expect(label).not.toContain("@");
  });
});
