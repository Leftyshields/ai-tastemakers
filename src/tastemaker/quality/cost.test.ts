import { describe, it, expect } from "vitest";
import { charsPerInputToken, estimateNarrationCostUsd } from "./cost.js";

describe("quality/cost", () => {
  it("estimateNarrationCostUsd uses model rates", () => {
    const usd = estimateNarrationCostUsd("claude-sonnet-4-6", 1_000_000, 100_000);
    expect(usd).toBe(3 + 1.5);
  });

  it("charsPerInputToken divides prompt chars by input tokens", () => {
    expect(charsPerInputToken(4000, 1000)).toBe(4);
    expect(charsPerInputToken(0, 100)).toBeUndefined();
  });
});
