# Better source pages for Skills briefs

_On Aug 1, 2026, we switched to a better tool for reading web pages, aiming for more specific and accurate Skills briefs. We kept it, though we shipped without running the planned before and after comparison._

## What we tried

Every Skills brief is a short write-up about a GitHub project. After we pick the day's projects, we pull in extra background before writing: text from the project's web pages and mentions on Hacker News. A tool called Jina Reader did the page reading.

We swapped in [Firecrawl](https://github.com/firecrawl/firecrawl), an open source project we had featured on the list, and changed nothing else. How we pick projects and how we use Hacker News stayed the same. Our bet: better page text would give the writer better material, so briefs would come out more specific, accurate, and current, without new made-up facts.

## What changed

| Part | Before | After |
|-------|--------|-------|
| Page reader | Jina Reader | Firecrawl |
| Which digest | Skills only | Skills only |
| Setup needed | Existing setup | A Firecrawl API key in GitHub Actions |

We planned to compare results from Aug 1 through Aug 14. We never ran that comparison. Click numbers on Skills are always too thin to settle a question like this, so we decided to ship the switch on Aug 1 instead of waiting.

## How we would have judged it

| Goal | Sign of success |
|---------|------------------------|
| Better briefs | Most reviewed briefs pass our editors' checklist: specific, accurate, and current |
| Steady traffic | Clicks on Skills projects hold steady (a minor signal, since the numbers are small) |

Editor review was always the real test here. Clicks were a backup.

## Where it landed

Firecrawl now reads the pages for every Skills brief, and the experiment is closed. Project ranking, still based on seven day momentum, and the Hacker News step did not change. Two later writing upgrades, Ponytail and Humanizer, build on this one. For the earlier step that first added web background with Jina and Hacker News, see the [earlier write-up](EXP-20260628-web-enrich-skills.html).
