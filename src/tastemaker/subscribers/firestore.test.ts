import { describe, it, expect } from "vitest";
import {
  isFirebaseAdminConfigured,
  subscriberDocId,
  TASTEMAKERS_SUBSCRIBERS_COLLECTION,
} from "./firestore.js";
import type { AppConfig } from "../types.js";

const base: AppConfig = {
  githubToken: "x",
  anthropicApiKey: "y",
  anthropicModel: "claude-test",
  timezone: "UTC",
  topN: 10,
  minStars: 50,
  pushedWithinDays: 30,
  topics: [],
  searchPagesPerTopic: 1,
  blocklist: new Set(),
  maxStarsBootstrap: 80000,
  softDedupBriefingCount: 3,
  softDedupPenalty: 0.8,
  readmeMaxChars: 1000,
  rootDir: "/tmp",
  snapshotPath: "/tmp/snap.jsonl",
  briefingsDir: "/tmp/briefings",
  digestSiteUrl: "https://example.com",
  editionId: "oss",
  editionName: "AI Tastemakers",
  enrichWeb: false,
  enrichShadow: false,
  enrichWebProvider: "jina" as const,
  enrichMaxRepos: 3,
  enrichMaxChars: 1500,
};

describe("subscriberDocId", () => {
  it("uses normalized email as document id", () => {
    expect(subscriberDocId("  You@Example.COM ")).toBe("you@example.com");
  });
});

describe("isFirebaseAdminConfigured", () => {
  it("returns false when unset", () => {
    expect(isFirebaseAdminConfigured(base)).toBe(false);
  });

  it("returns true with client email + private key", () => {
    expect(
      isFirebaseAdminConfigured({
        ...base,
        firebaseProjectId: "epiphoric-prod",
        firebaseClientEmail: "firebase-adminsdk@test.iam.gserviceaccount.com",
        firebasePrivateKey: "-----BEGIN PRIVATE KEY-----\\nabc\\n-----END PRIVATE KEY-----\\n",
      }),
    ).toBe(true);
  });

  it("returns true with service account json", () => {
    expect(
      isFirebaseAdminConfigured({
        ...base,
        firebaseServiceAccount: { project_id: "epiphoric-prod", private_key: "x", client_email: "y" },
      }),
    ).toBe(true);
  });
});

describe("TASTEMAKERS_SUBSCRIBERS_COLLECTION", () => {
  it("uses expected collection name", () => {
    expect(TASTEMAKERS_SUBSCRIBERS_COLLECTION).toBe("tastemakers_subscribers");
  });
});
