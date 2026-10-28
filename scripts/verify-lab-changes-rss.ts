import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import {
  buildLabChangesFeedItems,
  buildLabChangesRssXml,
  LAB_CHANGES_RSS_COPY,
  LAB_CHANGES_RSS_REL,
} from "./lab/lab-changes-rss.js";
import {
  countQualifyingVerdictLogEvents,
  readVerdictLogEvents,
} from "./lab/lab-verdict-log.js";
import { checkSeoText } from "./site-seo-text-gate.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(repoRoot, "site");
const siteBaseUrl =
  process.env.DIGEST_SITE_URL?.trim() || "https://leftyshields.github.io/ai-tastemakers";

function listLabHtmlFiles(): string[] {
  const labDir = path.join(siteDir, "lab");
  if (!fs.existsSync(labDir)) return [];
  const out: string[] = [];
  for (const ent of fs.readdirSync(labDir, { withFileTypes: true })) {
    const full = path.join(labDir, ent.name);
    if (ent.isDirectory()) {
      for (const sub of fs.readdirSync(full)) {
        if (sub.endsWith(".html")) out.push(path.join(full, sub));
      }
    } else if (ent.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

function validateRssXml(relPath: string): { ok: boolean; itemCount: number; messages: string[] } {
  const messages: string[] = [];
  const abs = path.join(siteDir, relPath);
  if (!fs.existsSync(abs)) {
    return { ok: false, itemCount: 0, messages: [`missing ${relPath}`] };
  }
  const xml = fs.readFileSync(abs, "utf8");
  const dom = new JSDOM(xml, { contentType: "text/xml" });
  const doc = dom.window.document;
  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    messages.push(`${relPath} XML parse error: ${parseError.textContent?.slice(0, 120)}`);
    return { ok: false, itemCount: 0, messages };
  }
  const rss = doc.querySelector("rss");
  if (!rss) {
    messages.push(`${relPath} missing rss root`);
  } else if (rss.getAttribute("version") !== "2.0") {
    messages.push(`${relPath} rss version must be 2.0`);
  }
  const channel = doc.querySelector("channel");
  if (!channel) {
    messages.push(`${relPath} missing channel`);
  }
  const items = doc.querySelectorAll("item");
  for (const item of items) {
    const link = item.querySelector("link")?.textContent?.trim() ?? "";
    if (!link.includes("/go/?") || !link.includes("event=lab_badge_click")) {
      messages.push(`${relPath} item link must use /go lab badge tracking: ${link.slice(0, 80)}`);
      break;
    }
  }
  return { ok: messages.length === 0, itemCount: items.length, messages };
}

function validateCopy(): string[] {
  const messages: string[] = [];
  messages.push(...checkSeoText(LAB_CHANGES_RSS_COPY.channelTitle, "lab-changes-rss", "title"));
  messages.push(
    ...checkSeoText(LAB_CHANGES_RSS_COPY.channelDescription, "lab-changes-rss", "description"),
  );
  for (const template of Object.values(LAB_CHANGES_RSS_COPY.itemTitle)) {
    messages.push(...checkSeoText(template, "lab-changes-rss", "title"));
  }
  for (const template of Object.values(LAB_CHANGES_RSS_COPY.itemDescription)) {
    messages.push(...checkSeoText(template, "lab-changes-rss", "description"));
  }
  return messages;
}

function validateLabPagesHaveRssAlternate(): string[] {
  const messages: string[] = [];
  const expectedHref = `${siteBaseUrl.replace(/\/+$/, "")}/feeds/lab-changes.xml`;
  for (const abs of listLabHtmlFiles()) {
    const rel = path.relative(repoRoot, abs);
    const html = fs.readFileSync(abs, "utf8");
    const dom = new JSDOM(html);
    const link = dom.window.document.querySelector(
      'link[rel="alternate"][type="application/rss+xml"]',
    );
    if (!link) {
      messages.push(`${rel}: missing Lab changes RSS alternate link`);
      continue;
    }
    const href = link.getAttribute("href")?.trim() ?? "";
    if (href !== expectedHref) {
      messages.push(`${rel}: RSS alternate href ${href} (expected ${expectedHref})`);
    }
  }
  return messages;
}

function main(): void {
  let failed = false;
  const copyIssues = validateCopy();
  if (copyIssues.length > 0) {
    failed = true;
    console.error("verify: lab changes RSS copy failed:");
    for (const m of copyIssues) console.error(`  ${m}`);
  }

  const logEvents = readVerdictLogEvents(repoRoot);
  const expectedItems = countQualifyingVerdictLogEvents(logEvents);
  const rss = validateRssXml(LAB_CHANGES_RSS_REL);
  console.log(
    `verify: lab changes RSS ${rss.itemCount} item(s); verdict log ${expectedItems} qualifying event(s)`,
  );
  if (!rss.ok) {
    failed = true;
    for (const m of rss.messages) console.error(`  ${m}`);
  }
  if (rss.itemCount !== expectedItems) {
    failed = true;
    console.error(
      `  item count mismatch: feed has ${rss.itemCount}, log has ${expectedItems} qualifying events`,
    );
  }

  const items = buildLabChangesFeedItems(repoRoot, siteBaseUrl, logEvents);
  const xmlA = buildLabChangesRssXml({ siteBaseUrl, items });
  const xmlB = buildLabChangesRssXml({ siteBaseUrl, items });
  if (xmlA !== xmlB) {
    failed = true;
    console.error("verify: lab changes RSS generator is not deterministic");
  } else {
    console.log("verify: lab changes RSS generator deterministic ok");
  }

  const builtXml = fs.existsSync(path.join(siteDir, LAB_CHANGES_RSS_REL))
    ? fs.readFileSync(path.join(siteDir, LAB_CHANGES_RSS_REL), "utf8")
    : "";
  if (builtXml && builtXml !== xmlA) {
    failed = true;
    console.error("verify: site/feeds/lab-changes.xml does not match generator output from verdict log");
  } else if (builtXml) {
    console.log("verify: built lab changes RSS matches verdict log ok");
  }

  const labAltIssues = validateLabPagesHaveRssAlternate();
  if (labAltIssues.length > 0) {
    failed = true;
    for (const m of labAltIssues) console.error(`  ${m}`);
  } else {
    console.log(`verify: Lab HTML RSS alternate links ok (${listLabHtmlFiles().length} page(s))`);
  }

  if (failed) process.exit(1);
  console.log("verify: lab changes RSS ok");
}

main();
