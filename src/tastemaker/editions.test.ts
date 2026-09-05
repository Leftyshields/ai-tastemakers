import { describe, it, expect } from "vitest";
import {
  EDITIONS,
  OSS_DISCOVER_TOPIC_CHIPS,
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

describe("edition topic queries", () => {
  it("share claude and cursor, so dual-list overlap is not one pool ranked twice", () => {
    const shared = EDITIONS.oss.topics.filter((t) => EDITIONS.skills.topics.includes(t));
    expect(shared).toEqual(["claude", "cursor"]);
  });

  it("Discover chips are topics the OSS edition actually searches", () => {
    for (const topic of OSS_DISCOVER_TOPIC_CHIPS) {
      expect(EDITIONS.oss.topics).toContain(topic);
    }
  });
});
