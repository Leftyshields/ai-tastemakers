import { describe, it, expect } from "vitest";
import {
  EDITIONS,
  resolveEditionId,
  briefingsDirForEdition,
  snapshotPathForEdition,
} from "./editions.js";

describe("resolveEditionId", () => {
  it("defaults to oss", () => {
    expect(resolveEditionId()).toBe("oss");
    expect(resolveEditionId("")).toBe("oss");
  });

  it("accepts skills", () => {
    expect(resolveEditionId("skills")).toBe("skills");
  });

  it("rejects unknown editions", () => {
    expect(() => resolveEditionId("nope")).toThrow(/Unknown edition/);
  });
});

describe("skills edition paths", () => {
  it("uses separate briefing and snapshot paths", () => {
    const edition = EDITIONS.skills;
    expect(briefingsDirForEdition("/repo", edition)).toBe("/repo/briefings/skills");
    expect(snapshotPathForEdition("/repo", edition)).toBe(
      "/repo/data/snapshots/skills-repos.jsonl",
    );
  });
});
