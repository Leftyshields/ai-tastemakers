import path from "node:path";
import { digestDateCompact } from "../../src/tastemaker/analytics/repo-click.js";
import type { OutboundDestRegistry } from "../../src/tastemaker/analytics/outbound-dest-manifest.js";
import { absoluteCanonicalUrl } from "../seo-helpers.js";
import { loadExperimentsFile, type LabExperimentEntry, type LabVerdict } from "./validate-experiments.js";
import { listLabWriteupPostIds } from "./lab-format.js";
import { labBadgeSiteDestPath, resolveLabBadgeHref, type LabBadgeInfo } from "./lab-tested-badge.js";
import {
  readVerdictLogEvents,
  sortVerdictLogEventsForFeed,
  type VerdictLogEvent,
  type VerdictLogEventKind,
} from "./lab-verdict-log.js";

export const LAB_CHANGES_RSS_REL = "feeds/lab-changes.xml";

export const LAB_CHANGES_RSS_COPY = {
  channelTitle: "Tastemakers Lab changes",
  channelDescription:
    "Lab verdict updates for AI Tastemakers, a daily digest of fast rising open source AI projects on GitHub with short builder briefs and public experiments.",
  itemTitle: {
    verdict_set: "Lab verdict recorded for {label}",
    verdict_flip: "Lab verdict updated for {label}",
    stale_label_applied: "Lab verdict marked stale for {label}",
  },
  itemDescription: {
    verdict_set:
      "AI Tastemakers Lab recorded a {verdictLabel} verdict for the experiment {label}. Open the experiment page for full notes.",
    verdict_flip:
      "AI Tastemakers Lab changed the verdict for {label} from {fromLabel} to {toLabel}. Open the experiment page for full notes.",
    stale_label_applied:
      "AI Tastemakers Lab marked the {verdictLabel} verdict for {label} as stale after ninety days. Open the experiment page for context.",
  },
} as const;

export interface LabChangesFeedItem {
  guid: string;
  title: string;
  description: string;
  link: string;
  pubDateRfc822: string;
  experimentId: string;
  event: VerdictLogEventKind;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function verdictLabel(verdict: LabVerdict): string {
  if (verdict === "ship") return "ship";
  if (verdict === "revert") return "revert";
  return "inconclusive";
}

function buildLabRssItemGoUrl(
  siteBaseUrl: string,
  query: {
    repo: string;
    expId: string;
    status: "done" | "running";
    digestDate: string;
    destPath: string;
  },
): string {
  const base = siteBaseUrl.replace(/\/+$/, "");
  const params = new URLSearchParams({
    channel: "pages",
    event: "lab_badge_click",
    exp: query.expId,
    repo: query.repo,
    section: "oss",
    rank: "1",
    status: query.status,
    d: digestDateCompact(query.digestDate),
    dest: query.destPath.startsWith("/") ? query.destPath : `/${query.destPath}`,
    surface: "rss",
  });
  return `${base}/go/?${params.toString()}`;
}

function experimentLabel(exp: LabExperimentEntry | undefined, experimentId: string): string {
  const label = exp?.label?.trim();
  return label || experimentId;
}

function badgeStatus(exp: LabExperimentEntry | undefined): "done" | "running" {
  if (exp?.status === "running") return "running";
  return "done";
}

function resolveExperimentSiteRel(experimentId: string, writeupPostIds: readonly string[]): string {
  const badge: LabBadgeInfo = {
    id: experimentId,
    title: experimentId,
    status: "done",
    repoKey: "",
  };
  return resolveLabBadgeHref(badge, "lab/", writeupPostIds);
}

export function buildLabChangesFeedItems(
  repoRoot: string,
  siteBaseUrl: string,
  events: readonly VerdictLogEvent[],
  destRegistry?: OutboundDestRegistry,
): LabChangesFeedItem[] {
  const experiments = loadExperimentsFile(repoRoot).experiments;
  const byId = new Map(experiments.map((e) => [e.id, e]));
  const writeups = listLabWriteupPostIds(repoRoot);
  const sorted = sortVerdictLogEventsForFeed(events);

  return sorted.map((ev) => {
    const exp = byId.get(ev.experiment_id);
    const label = experimentLabel(exp, ev.experiment_id);
    const titleTemplate = LAB_CHANGES_RSS_COPY.itemTitle[ev.event];
    const title = titleTemplate.replace("{label}", label);

    let description = "";
    if (ev.event === "verdict_set") {
      description = LAB_CHANGES_RSS_COPY.itemDescription.verdict_set
        .replace("{verdictLabel}", verdictLabel(ev.verdict))
        .replace("{label}", label);
    } else if (ev.event === "verdict_flip") {
      description = LAB_CHANGES_RSS_COPY.itemDescription.verdict_flip
        .replace("{fromLabel}", verdictLabel(ev.from_verdict))
        .replace("{toLabel}", verdictLabel(ev.to_verdict))
        .replace("{label}", label);
    } else {
      description = LAB_CHANGES_RSS_COPY.itemDescription.stale_label_applied
        .replace("{verdictLabel}", verdictLabel(ev.verdict))
        .replace("{label}", label);
    }

    const destPath = labBadgeSiteDestPath(
      siteBaseUrl,
      {
        id: ev.experiment_id,
        title: label,
        status: badgeStatus(exp),
        repoKey: exp?.sourceRepo?.trim() ?? "",
      },
      writeups,
    );

    const occurredDate = ev.occurred_at.slice(0, 10);
    const repoKey = exp?.sourceRepo?.trim() || "leftyshields/ai-tastemakers";
    const link = buildLabRssItemGoUrl(siteBaseUrl, {
      repo: repoKey,
      expId: ev.experiment_id,
      status: badgeStatus(exp),
      digestDate: occurredDate,
      destPath,
    });

    if (destRegistry) {
      destRegistry.register(destPath);
    }

    const pubDateRfc822 = rfc822FromIso(ev.occurred_at);
    const guid = `${ev.event}:${ev.experiment_id}:${ev.occurred_at}`;

    return {
      guid,
      title,
      description,
      link,
      pubDateRfc822,
      experimentId: ev.experiment_id,
      event: ev.event,
    };
  });
}

/** RFC 822 date in GMT (deterministic from event timestamp). */
export function rfc822FromIso(iso: string): string {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) {
    throw new Error(`invalid occurred_at for RSS: ${iso}`);
  }
  return d.toUTCString();
}

export function buildLabChangesRssXml(options: {
  siteBaseUrl: string;
  channelLinkPath?: string;
  items: readonly LabChangesFeedItem[];
}): string {
  const base = options.siteBaseUrl.replace(/\/+$/, "");
  const selfUrl = `${base}/${LAB_CHANGES_RSS_REL.replace(/^\/+/, "")}`;
  const channelLink = absoluteCanonicalUrl(options.siteBaseUrl, options.channelLinkPath ?? "lab/");
  const channelTitle = LAB_CHANGES_RSS_COPY.channelTitle;
  const channelDescription = LAB_CHANGES_RSS_COPY.channelDescription;

  const itemXml = options.items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="false">${escapeXml(item.guid)}</guid>
      <pubDate>${escapeXml(item.pubDateRfc822)}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`,
    )
    .join("\n");

  const lastBuild = options.items[0]?.pubDateRfc822 ?? "Thu, 01 Jan 1970 00:00:00 GMT";

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(channelLink)}</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(lastBuild)}</lastBuildDate>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <generator>Tastemakers Lab verdict log</generator>
${itemXml ? `${itemXml}\n` : ""}  </channel>
</rss>
`;
}

export async function writeLabChangesRssFeed(
  repoRoot: string,
  siteDir: string,
  siteBaseUrl: string,
  destRegistry?: OutboundDestRegistry,
): Promise<{ itemCount: number; relPath: string }> {
  const fs = await import("node:fs/promises");
  const events = readVerdictLogEvents(repoRoot);
  const items = buildLabChangesFeedItems(repoRoot, siteBaseUrl, events, destRegistry);
  const xml = buildLabChangesRssXml({ siteBaseUrl, items });
  const outPath = path.join(siteDir, LAB_CHANGES_RSS_REL);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, xml, "utf8");
  return { itemCount: items.length, relPath: LAB_CHANGES_RSS_REL };
}
