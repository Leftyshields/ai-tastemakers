import { describe, it, expect } from "vitest";
import {
  appendDailyDigestUtmToUrl,
  DAILY_DIGEST_UTM,
  isDigestEmailUtmSource,
} from "./digest-email-utm.js";
import { DEFAULT_DIGEST_SITE_URL } from "../config.js";

describe("appendDailyDigestUtmToUrl", () => {
  it("appends the daily digest UTM contract on Pages URLs", () => {
    const url = appendDailyDigestUtmToUrl(
      `${DEFAULT_DIGEST_SITE_URL}/briefings/2026-06-06.html`,
    );
    const parsed = new URL(url);
    expect(parsed.searchParams.get("utm_source")).toBe(DAILY_DIGEST_UTM.utm_source);
    expect(parsed.searchParams.get("utm_medium")).toBe(DAILY_DIGEST_UTM.utm_medium);
    expect(parsed.searchParams.get("utm_campaign")).toBe(DAILY_DIGEST_UTM.utm_campaign);
  });

  it("preserves existing query params and hash", () => {
    const raw =
      `${DEFAULT_DIGEST_SITE_URL}/lab/index.html?from_list=oss&from_rank=3#lab-exp-EXP-20260913-humanizer-polish-skills`;
    const url = appendDailyDigestUtmToUrl(raw);
    const parsed = new URL(url);
    expect(parsed.searchParams.get("from_list")).toBe("oss");
    expect(parsed.searchParams.get("from_rank")).toBe("3");
    expect(parsed.hash).toBe("#lab-exp-EXP-20260913-humanizer-polish-skills");
    expect(parsed.searchParams.get("utm_campaign")).toBe("daily");
  });

  it("does not double-append when any utm param is already present", () => {
    const withSource = `${DEFAULT_DIGEST_SITE_URL}/?utm_source=newsletter`;
    expect(appendDailyDigestUtmToUrl(withSource)).toBe(withSource);
    const withCampaign = `${DEFAULT_DIGEST_SITE_URL}/?utm_campaign=weekly`;
    expect(appendDailyDigestUtmToUrl(withCampaign)).toBe(withCampaign);
  });

  it("leaves non-URL strings unchanged", () => {
    expect(appendDailyDigestUtmToUrl("not-a-url")).toBe("not-a-url");
  });
});

describe("isDigestEmailUtmSource", () => {
  it("accepts digest and legacy email values", () => {
    expect(isDigestEmailUtmSource("digest")).toBe(true);
    expect(isDigestEmailUtmSource("email")).toBe(true);
    expect(isDigestEmailUtmSource("direct")).toBe(false);
  });
});
