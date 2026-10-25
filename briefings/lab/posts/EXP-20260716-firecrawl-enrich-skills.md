# Deeper web context on Skills briefs

_**Shipped (Aug 1, 2026).** The Skills digest still adds web context after ranking, and Firecrawl now fetches the pages. We did not finish the formal before and after comparison window._

## The question, in plain English

Each Skills blurb already gets extra context once ranking is done: cleaned up text from the web plus Hacker News mentions, merged in before the writing (narrate) step. That setup started with Jina Reader as the default page fetcher.

We wanted to switch the fetcher to **Firecrawl** and leave everything else alone: ranking, discovery, and Hacker News enrichment. Our bet was that richer page context would make briefs more specific, more accurate, and more timely when reviewed against our shadow rubric, without introducing new made up facts.

That is the whole test. [Firecrawl](https://github.com/firecrawl/firecrawl) is a project we featured on the list; we did not build their product into the digest. We changed one environment setting on the Skills digest command.

## What changed

| Piece | Before | After |
|-------|--------|-------|
| Web context | `DIGEST_ENRICH_WEB=1` with Jina Reader as the default | Same setting, plus `DIGEST_ENRICH_WEB_PROVIDER=firecrawl` |
| Edition | Skills only | Skills only |
| Secrets | Existing enrichment setup | `FIRECRAWL_API_KEY` in GitHub Actions |

Production switched over on **Aug 1, 2026** by operator decision. The planned comparison window in `lab/experiments.json` (Aug 1 through Aug 14) was never used as a formal checkpoint. We chose to ship the fetcher switch rather than wait on click numbers that are always thin.

## How we would have measured it

| We want | What "good" looks like |
|---------|------------------------|
| Better briefs | Most reviewed repos pass the shadow rubric: specific, accurate, timely |
| Steady traffic | `repo_click` with `section=skills` as a secondary signal (known to be sparse) |

PostHog click through was never the main test for this switch. Editorial review and brief quality were.

## Outcome

We **shipped** Firecrawl for Skills web context and archived the experiment record. Hacker News enrichment and ranking by seven day momentum stayed as they were. Later writing improvements (Ponytail, Humanizer) build on this layer. For the earlier chapter with Jina and Hacker News, see the [web context write up](EXP-20260628-web-enrich-skills.html).

## Operator notes

| Setting | What it does |
|------|----------------|
| `DIGEST_ENRICH_WEB=1` | Adds a web context block after ranking and before narration on Skills |
| `DIGEST_ENRICH_WEB_PROVIDER=firecrawl` | Uses the Firecrawl v2 adapter instead of Jina Reader |
| `DIGEST_ENRICH_SHADOW=0` | Runs the normal production path (not the side by side shadow run) |

Requires `FIRECRAWL_API_KEY` in the Skills digest environment on GitHub Actions.
