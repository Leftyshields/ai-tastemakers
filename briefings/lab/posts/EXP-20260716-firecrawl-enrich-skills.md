# Better source pages for Skills briefs

_**Shipped Aug 1, 2026.** This experiment swapped the tool that reads web pages for Skills briefs to Firecrawl, aiming for briefs that are more specific and accurate. It shipped without the planned before and after comparison._

## The idea

Every Skills brief is a short write-up about a GitHub project. Before the writing starts, the daily list pulls in background on each project: text from its web pages and mentions on Hacker News. A tool called Jina Reader handled the page reading.

The bet: a better page reader gives the writer better material, so briefs come out more specific, accurate, and current, without new made-up facts.

## The change

[Firecrawl](https://github.com/firecrawl/firecrawl), an open source project that first appeared on the OSS list on Jun 14, 2026, replaced Jina Reader. Nothing else moved. Project picks and the Hacker News step stayed the same.

| Part | Before | After |
|-------|--------|-------|
| Page reader | Jina Reader | Firecrawl |
| Which list | Skills only | Skills only |
| Setup needed | Existing setup | A Firecrawl account key |

## How to tell if it worked

The plan called for a before and after comparison from Aug 1 through Aug 14, judged two ways:

| Goal | Sign of success |
|---------|------------------------|
| Better briefs | At least 90% of reviewed briefs pass the editors' checklist: specific, accurate, and current |
| Steady traffic | Clicks on Skills projects hold steady |

Editor review was the real test. Clicks were a backup, and a modest one: Skills projects drew a grand total of 2 clicks from Aug 1 to Aug 14. Not exactly a stampede. Two clicks can't tell a real change from chance, so the editors made the call.

## What happened

The comparison never ran, so no before and after numbers exist for this experiment. With click counts too thin to settle the question anyway, the Lab chose to ship Firecrawl on Aug 1 instead of waiting.

Firecrawl now reads the pages for every Skills brief, and the experiment is closed. Project ranking, still based on seven day momentum, and the Hacker News step did not change. Two later writing upgrades, Ponytail and Humanizer, build on this one. For the earlier step that first added web background with Jina and Hacker News, see the [earlier write-up](EXP-20260628-web-enrich-skills.html).
