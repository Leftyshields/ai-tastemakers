import { describe, it, expect } from "vitest";
import {
  GoRedirectCaptureGate,
  buildEmailGoUrl,
  digestDateCompact,
  digestDateFromCompact,
  normalizeRepoParam,
  resolveAllowlistedGithubUrl,
  resolveAllowlistedLabBadgeDestPath,
  buildLabBadgeEmailGoUrl,
} from "./repo-click.js";

describe("digest allowlist redirect", () => {
  const allowlist = {
    "acme/demo": "https://github.com/acme/demo",
  };

  it("forwards a known repo to exact GitHub URL", () => {
    expect(resolveAllowlistedGithubUrl("acme/demo", allowlist)).toBe(
      "https://github.com/acme/demo",
    );
  });

  it("sends unknown repos to home (null target)", () => {
    expect(resolveAllowlistedGithubUrl("unknown/repo", allowlist)).toBeNull();
  });

  it("rejects javascript: and other host URLs disguised as repo params", () => {
    expect(resolveAllowlistedGithubUrl("javascript:alert(1)", allowlist)).toBeNull();
    expect(resolveAllowlistedGithubUrl("evil.com/repo", allowlist)).toBeNull();
    expect(normalizeRepoParam("https://evil.com/a/b")).toBeNull();
  });

  it("never forwards to a mismatched allowlist entry", () => {
    const tampered = { "acme/demo": "https://github.com/other/repo" };
    expect(resolveAllowlistedGithubUrl("acme/demo", tampered)).toBeNull();
  });
});

describe("GoRedirectCaptureGate", () => {
  it("fires exactly one capture", () => {
    const gate = new GoRedirectCaptureGate();
    let count = 0;
    expect(gate.tryCapture(() => {
      count += 1;
    })).toBe(true);
    expect(gate.tryCapture(() => {
      count += 1;
    })).toBe(false);
    expect(count).toBe(1);
    expect(gate.hasCaptured).toBe(true);
  });
});

describe("email go URLs", () => {
  it("builds /go/ with utm params", () => {
    const url = buildEmailGoUrl("https://example.com/app", {
      repo: "acme/demo",
      section: "oss",
      position: 2,
      target: "button",
      digestDate: "2026-06-06",
    });
    expect(url).toContain("/go/?");
    expect(url).toContain("repo=acme%2Fdemo");
    expect(url).toContain("section=oss");
    expect(url).toContain("pos=2");
    expect(url).toContain("target=button");
    expect(url).toContain("d=20260606");
    expect(url).toContain("utm_campaign=digest_20260606");
  });

  it("round trips compact digest dates", () => {
    expect(digestDateCompact("2026-06-06")).toBe("20260606");
    expect(digestDateFromCompact("20260606")).toBe("2026-06-06");
  });

  it("accepts lab/posts paths for lab badge email dest", () => {
    const dest = "/ai-tastemakers/lab/posts/EXP-20260716-firecrawl-enrich-skills.html";
    expect(resolveAllowlistedLabBadgeDestPath(dest)).toBe(dest);
    expect(resolveAllowlistedLabBadgeDestPath("https://evil.com/lab/posts/x.html")).toBeNull();
    expect(resolveAllowlistedLabBadgeDestPath("/lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills")).toBe(
      "/lab/index.html#lab-exp-EXP-20260913-humanizer-polish-skills",
    );
    const url = buildLabBadgeEmailGoUrl("https://example.com/app", {
      repo: "firecrawl/firecrawl",
      section: "skills",
      rank: 3,
      expId: "EXP-20260716-firecrawl-enrich-skills",
      status: "done",
      digestDate: "2026-08-01",
      destPath: dest,
    });
    expect(url).toContain("dest=%2Fai-tastemakers%2Flab%2Fposts%2FEXP-20260716-firecrawl-enrich-skills.html");
  });
});
