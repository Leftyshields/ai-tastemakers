import { describe, it, expect } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

describe("digest send runtime dependencies", () => {
  it("resolves @google-cloud/firestore for firebase-admin Firestore", () => {
    expect(() => require("@google-cloud/firestore")).not.toThrow();
  });
});
