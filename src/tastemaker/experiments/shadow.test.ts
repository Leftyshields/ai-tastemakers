import { describe, it, expect } from "vitest";
import { shadowReposFromDigest } from "./shadow.js";
import type { DigestRepo } from "../types.js";

const repos: DigestRepo[] = [
  {
    rank: 1,
    full_name: "acme/one",
    html_url: "https://github.com/acme/one",
    stars: 10,
    stars_gained_7d: 5,
    topics: [],
    language: null,
    brief: "treatment",
    pushed_at: "2026-06-01",
    is_new: true,
  },
];

describe("shadowReposFromDigest", () => {
  it("writes side-by-side briefs when enrich web requested", () => {
    const control = new Map([["acme/one", "control blurb"]]);
    const treatment = new Map([["acme/one", "treatment blurb"]]);
    const refs = new Map([["acme/one", "acme-one.json"]]);

    const shadow = shadowReposFromDigest(repos, true, control, treatment, refs);
    expect(shadow[0].brief_control).toBe("control blurb");
    expect(shadow[0].brief_treatment).toBe("treatment blurb");
    expect(shadow[0].enrichment_bundle_ref).toBe("acme-one.json");
    expect(shadow[0].brief).toBeUndefined();
  });

  it("writes legacy brief field when enrich web not requested", () => {
    const control = new Map([["acme/one", "only blurb"]]);
    const treatment = new Map([["acme/one", "only blurb"]]);
    const shadow = shadowReposFromDigest(repos, false, control, treatment, new Map());
    expect(shadow[0].brief).toBe("only blurb");
    expect(shadow[0].brief_control).toBeUndefined();
  });
});
