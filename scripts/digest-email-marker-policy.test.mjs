import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EMAIL_SENT_MARKER_ENFORCE_FROM,
  emailSentMarkerEnforced,
} from "./digest-email-marker-policy.mjs";

describe("emailSentMarkerEnforced", () => {
  it("grandfathers editions before enforcement", () => {
    assert.equal(emailSentMarkerEnforced("2026-11-09"), false);
  });

  it("requires marker from enforcement date on weekdays", () => {
    assert.equal(emailSentMarkerEnforced(EMAIL_SENT_MARKER_ENFORCE_FROM), true);
    assert.equal(emailSentMarkerEnforced("2026-11-11"), true);
  });

  it("skips Sundays even after enforcement", () => {
    assert.equal(emailSentMarkerEnforced("2026-11-08"), false);
  });
});
