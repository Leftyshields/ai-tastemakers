import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AppConfig } from "../types.js";
import {
  filterDeliverableEmails,
  isDeliverableEmail,
  mergeRecipientEmails,
  isValidEmail,
  normalizeEmail,
  resolveDigestRecipients,
} from "./load.js";

vi.mock("./firestore.js", () => ({
  isFirebaseAdminConfigured: vi.fn(),
  readFirestoreSubscribers: vi.fn(),
}));

import {
  isFirebaseAdminConfigured,
  readFirestoreSubscribers,
} from "./firestore.js";

const baseConfig: AppConfig = {
  githubToken: "token",
  anthropicApiKey: "key",
  anthropicModel: "claude",
  timezone: "America/Los_Angeles",
  topN: 10,
  minStars: 50,
  pushedWithinDays: 30,
  topics: [],
  searchPagesPerTopic: 1,
  blocklist: new Set(),
  maxStarsBootstrap: 80000,
  softDedupBriefingCount: 5,
  softDedupPenalty: 0.5,
  readmeMaxChars: 1000,
  rootDir: "/tmp/tastemakers",
  snapshotPath: "/tmp/snap.jsonl",
  briefingsDir: "/tmp/briefings",
  digestSiteUrl: "https://example.com",
  editionId: "oss",
  editionName: "OSS",
  enrichWeb: false,
  enrichShadow: false,
  enrichMaxRepos: 3,
  enrichMaxChars: 1500,
};

beforeEach(() => {
  vi.mocked(isFirebaseAdminConfigured).mockReset();
  vi.mocked(readFirestoreSubscribers).mockReset();
});

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

describe("isDeliverableEmail", () => {
  it("accepts real domains", () => {
    expect(isDeliverableEmail("you@epiphoric.com")).toBe(true);
  });

  it("rejects RFC 2606 placeholder domains", () => {
    expect(isDeliverableEmail("you@example.com")).toBe(false);
    expect(isDeliverableEmail("you@example.org")).toBe(false);
  });
});

describe("filterDeliverableEmails", () => {
  it("drops placeholder domains and keeps real addresses", () => {
    expect(
      filterDeliverableEmails(["real@epiphoric.com", "bad@example.com", "also@example.net"]),
    ).toEqual(["real@epiphoric.com"]);
  });
});

describe("resolveDigestRecipients", () => {
  it("uses Firestore only when Firebase Admin is configured", async () => {
    vi.mocked(isFirebaseAdminConfigured).mockReturnValue(true);
    vi.mocked(readFirestoreSubscribers).mockResolvedValue(["sub@epiphoric.com"]);

    const recipients = await resolveDigestRecipients(baseConfig);

    expect(recipients).toEqual(["sub@epiphoric.com"]);
    expect(readFirestoreSubscribers).toHaveBeenCalledWith(baseConfig);
  });

  it("filters non-deliverable Firestore subscribers", async () => {
    vi.mocked(isFirebaseAdminConfigured).mockReturnValue(true);
    vi.mocked(readFirestoreSubscribers).mockResolvedValue([
      "good@epiphoric.com",
      "test@example.com",
    ]);

    const recipients = await resolveDigestRecipients(baseConfig);

    expect(recipients).toEqual(["good@epiphoric.com"]);
  });

  it("skips subscribers.json when Firebase Admin is configured", async () => {
    vi.mocked(isFirebaseAdminConfigured).mockReturnValue(true);
    vi.mocked(readFirestoreSubscribers).mockResolvedValue([]);

    const recipients = await resolveDigestRecipients({
      ...baseConfig,
      rootDir: process.cwd(),
    });

    expect(recipients).toEqual([]);
  });
});
