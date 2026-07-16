import type { ExperimentRecord } from "./experiments/types.js";

export type ExperimentMilestoneType =
  | "baseline_start"
  | "baseline_end"
  | "treatment_start"
  | "treatment_end";

const POSTHOG_HOME_URL = "https://us.posthog.com/project/489599/home";
const POSTHOG_WEB_ANALYTICS_URL = "https://us.posthog.com/project/489599/web";
const POSTHOG_TRENDS_URL = "https://us.posthog.com/project/489599/insights/new";
const PLAYBOOK_URL =
  "https://github.com/Leftyshields/ai-tastemakers/blob/main/docs/EXPERIMENT_LIFECYCLE_PLAYBOOK.md";

interface MetricsHints {
  pageviews: string;
  event: string;
  eventFilter?: string;
}

function metricsHints(record: ExperimentRecord): MetricsHints {
  const flags = record.change.flags ?? {};
  if (flags.DIGEST_ENRICH_WEB || record.id.includes("web-enrich")) {
    return {
      pageviews: "Skills briefing pages (/briefings/skills/YYYY-MM-DD.html)",
      event: "outbound_repo_click",
      eventFilter: "edition = skills",
    };
  }
  if (
    flags.DIGEST_SOFT_DEDUP_PENALTY ||
    flags.DIGEST_SOFT_DEDUP_BRIEFINGS ||
    record.id.includes("soft-dedup") ||
    record.id.includes("diversity")
  ) {
    return {
      pageviews: "Skills briefing pages (/briefings/skills/YYYY-MM-DD.html)",
      event: "outbound_repo_click",
      eventFilter: "edition = skills",
    };
  }
  if (
    flags.DIGEST_ENRICH_WEB_PROVIDER ||
    flags.DIGEST_ENRICH_FIRECRAWL ||
    record.id.includes("firecrawl")
  ) {
    return {
      pageviews: "Skills briefing pages (/briefings/skills/YYYY-MM-DD.html)",
      event: "outbound_repo_click",
      eventFilter: "edition = skills",
    };
  }
  if (flags.SITE_LANDING_LAYOUT_V2 || record.id.includes("landing")) {
    return {
      pageviews: "Homepage index pages (/index.html and /skills/index.html)",
      event: "homepage_index_click",
    };
  }
  return {
    pageviews: `Pages for edition "${record.edition}"`,
    event: "Primary conversion event from experiment hypothesis",
  };
}

function csvExamplePath(record: ExperimentRecord, label: string): string {
  return `data/experiments/exports/${record.id}-${label}.csv`;
}

function snapshotExportBlock(
  record: ExperimentRecord,
  periodStart: string,
  periodEnd: string,
  label: string,
): string[] {
  const hints = metricsHints(record);
  const csvPath = csvExamplePath(record, label);
  const examplePage =
    record.id.includes("web-enrich")
      ? "/briefings/skills/2026-06-28.html"
      : "/index.html";

  return [
    "POSTHOG EXPORT (step by step)",
    `1. Open PostHog home: ${POSTHOG_HOME_URL}`,
    "   (Default project — you'll land on the Home screen with sidebar on the left.)",
    `2. Set date range: ${periodStart} through ${periodEnd} (inclusive). Use the date picker at the top of each view (Pacific / project timezone).`,
    "3. Pageviews — in left sidebar: Analytics → Web analytics",
    `   Direct link: ${POSTHOG_WEB_ANALYTICS_URL}`,
    `   Collect top paths for: ${hints.pageviews}`,
    "   Export or copy counts per path from the Top paths / pages table.",
    "4. Events — in left sidebar: Analytics → Product analytics → Trends",
    `   Direct link (new insight): ${POSTHOG_TRENDS_URL}`,
    `   Add event "${hints.event}"; set the same date range.`,
    hints.eventFilter ? `   Filter: ${hints.eventFilter}.` : "",
    "   Note total event count (per-repo breakdown optional).",
    `5. Save a CSV locally, e.g. ${csvPath}`,
    "   Simplified format (hand-edited from PostHog counts is fine):",
    "   type,key,count",
    `   pageview,${examplePage},42`,
    "   outbound_click,_aggregate,120",
    "   (Use outbound_click rows for click events; _aggregate = one total.)",
    "",
    "IMPORT SNAPSHOT",
    "",
    `npm run experiment -- snapshot ${record.id} \\`,
    `  --csv ${csvPath} \\`,
    `  --period-start ${periodStart} --period-end ${periodEnd} --dry-run`,
    "",
    `npm run experiment -- snapshot ${record.id} \\`,
    `  --csv ${csvPath} \\`,
    `  --period-start ${periodStart} --period-end ${periodEnd}`,
    "",
    "PUBLISH TO LAB DASHBOARD",
    "",
    "npm run build:pages",
    `git add data/experiments/${record.id}.json`,
    `git commit -m "chore: import ${label} snapshot for ${record.id}"`,
    "git push origin main",
    "(Push triggers GitHub Pages deploy when experiment JSON changes.)",
  ].filter(Boolean);
}

export function buildMilestoneInstructions(
  milestoneType: ExperimentMilestoneType,
  record: ExperimentRecord,
): string[] {
  const bw = record.baseline_window;
  const tw = record.treatment_window;
  const flags = Object.entries(record.change.flags ?? {}).filter(
    ([, value]) => value !== undefined && value !== "",
  );
  const lines: string[] = [];

  switch (milestoneType) {
    case "baseline_start":
      lines.push(
        "WHAT THIS MEANS",
        "Baseline (control) measurement starts today. Production must stay on the OLD behavior — no treatment flags in GitHub Actions yet.",
        "",
        "STEPS",
        `1. Open data/experiments/${record.id}.json — set "status": "baseline" if still draft.`,
        `2. Confirm baseline window: ${bw.start} → ${bw.end} (PT).`,
        "3. Do NOT enable treatment flags in digest.yml or Pages build yet.",
        "4. Optional: open a live briefing page → PostHog home → Activity (sidebar) → confirm $pageview in live stream.",
        `5. Lab dashboard: watch window dates until baseline ends on ${bw.end}.`,
      );
      break;

    case "baseline_end":
      lines.push(
        "WHAT THIS MEANS",
        "Baseline (control) window closes today. Export PostHog metrics for the full baseline period and save them into the experiment JSON before starting treatment.",
        "",
        ...snapshotExportBlock(record, bw.start, bw.end, "baseline"),
      );
      if (record.id.includes("web-enrich")) {
        lines.push(
          "",
          "OPTIONAL BEFORE TREATMENT (web-enrich quality check)",
          "Local shadow run (does not change production):",
          `EXPERIMENT_ID=${record.id} DIGEST_ENRICH_WEB=1 DIGEST_ENRICH_SHADOW=1 npm run digest -- --edition skills`,
          "Score output with briefings/lab/shadow-rubric.md before enabling treatment tomorrow.",
        );
      }
      if (record.id.includes("firecrawl")) {
        lines.push(
          "",
          "OPTIONAL BEFORE TREATMENT (firecrawl quality check)",
          "Requires Firecrawl adapter + FIRECRAWL_API_KEY. Local shadow (does not change production):",
          `EXPERIMENT_ID=${record.id} DIGEST_ENRICH_WEB=1 DIGEST_ENRICH_WEB_PROVIDER=firecrawl DIGEST_ENRICH_SHADOW=1 npm run digest -- --edition skills`,
          "Score Jina vs Firecrawl with briefings/lab/shadow-rubric.md before enabling treatment tomorrow.",
        );
      }
      if (isValidWindow(tw)) {
        lines.push(
          "",
          "NEXT MILESTONE",
          `Treatment starts ${tw.start} — you will get another reminder to enable flags in GitHub.`,
        );
      }
      break;

    case "treatment_start":
      lines.push(
        "WHAT THIS MEANS",
        "Turn ON the experiment change in production starting today. Baseline metrics should already be imported.",
        "",
        "STEPS",
        `1. Set "status": "active" in data/experiments/${record.id}.json`,
        `2. Treatment window: ${tw.start} → ${tw.end} (PT).`,
      );
      if (flags.some(([f]) => f.startsWith("SITE_"))) {
        lines.push(
          "3. GitHub repo → Settings → Secrets and variables → Actions → Variables",
        );
        for (const [flag, value] of flags) {
          if (flag.startsWith("SITE_")) {
            lines.push(`   Set ${flag} = ${value}`);
          }
        }
        lines.push(
          "4. Run Actions → Deploy GitHub Pages (or push a change that triggers pages.yml).",
          "5. Verify live homepage layout on OSS and Skills index URLs.",
        );
      } else if (
        flags.some(
          ([f]) => f === "DIGEST_SOFT_DEDUP_BRIEFINGS" || f === "DIGEST_SOFT_DEDUP_PENALTY",
        ) ||
        record.id.includes("soft-dedup")
      ) {
        lines.push(
          "3. Edit .github/workflows/digest.yml — apply soft-dedup env to the Skills digest only",
          "   (split OSS vs Skills into separate steps if they currently share one env block):",
        );
        for (const [flag, value] of flags) {
          if (!flag.startsWith("SITE_")) {
            lines.push(`   ${flag}: "${value}"`);
          }
        }
        lines.push(
          "   Leave OSS digest on defaults (BRIEFINGS=5, PENALTY=0.5).",
          "4. git add .github/workflows/digest.yml data/experiments/",
          `5. git commit -m "chore: start treatment for ${record.id}"`,
          "6. git push origin main",
          "7. Confirm next Skills digest uses the new soft-dedup values; OSS stays default.",
        );
      } else {
        lines.push(
          "3. Edit .github/workflows/digest.yml — add under the Run digest (OSS + Skills) step env:",
        );
        for (const [flag, value] of flags) {
          if (flag === "DIGEST_ENRICH_SHADOW") {
            lines.push(`   ${flag}: "0"   # production — use "1" only for local shadow runs`);
          } else if (!flag.startsWith("SITE_")) {
            lines.push(`   ${flag}: "${value}"`);
          }
        }
        if (flags.length === 0) {
          lines.push("   (Enable flags per change_summary and experiment notes.)");
        }
        lines.push(
          "4. git add .github/workflows/digest.yml data/experiments/",
          `5. git commit -m "chore: start treatment for ${record.id}"`,
          "6. git push origin main",
          "7. Confirm next scheduled Daily Digest run uses the new env vars.",
        );
      }
      break;

    case "treatment_end":
      lines.push(
        "WHAT THIS MEANS",
        "Treatment window closes today. Export treatment-period metrics, compare to baseline, record a verdict, and disable flags unless you are keeping the change.",
        "",
        ...snapshotExportBlock(record, tw.start, tw.end, "treatment"),
        "",
        "RECORD VERDICT",
        `1. Open data/experiments/${record.id}.json`,
        '2. Set "verdict": "<what happened, numbers, decision>"',
        '3. Set "keep_change": true or false',
        '4. Set "status": "complete"',
        "",
        "IF NOT KEEPING THE CHANGE",
        "Remove treatment flags from digest.yml (or set SITE_* variable to 0) → commit → push → redeploy.",
      );
      break;
  }

  lines.push("", `More detail: ${PLAYBOOK_URL}`);
  return lines;
}

function isValidWindow(w: { start: string; end: string }): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(w.start) && /^\d{4}-\d{2}-\d{2}$/.test(w.end);
}

/** Flat checklist for tests and simple consumers. */
export function buildChecklist(
  milestoneType: ExperimentMilestoneType,
  record: ExperimentRecord,
): string[] {
  return buildMilestoneInstructions(milestoneType, record);
}
