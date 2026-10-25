# Deeper web context on Skills briefs

_**Shipped (Aug 1, 2026).** Skills digests keep post rank web enrich with Firecrawl as the fetch provider. We did not finish the formal before and after window._

## The question, in English

Skills blurbs already get extra context after ranking: cleaned web text plus Hacker News hits, merged into the narrate step. That pipeline started with Jina Reader as the default fetcher.

We wanted to swap the fetch provider to **Firecrawl** while keeping ranking, discovery, and HN enrichment unchanged. The bet: richer page context improves specificity, accuracy, and timely hooks on shadow rubric review without new hallucinations.

That is the whole test. [Firecrawl](https://github.com/firecrawl/firecrawl) is the project we featured on the list; we did not install their product inside the digest. We changed one env flag on the Skills digest command.

## What changed

| Piece | Before | After |
|-------|--------|-------|
| Web enrich | `DIGEST_ENRICH_WEB=1` with default Jina Reader | Same flag, `DIGEST_ENRICH_WEB_PROVIDER=firecrawl` |
| Edition | Skills only | Skills only |
| Secrets | Existing enrich path | `FIRECRAWL_API_KEY` in GitHub Actions |

Production flipped on **Aug 1, 2026** per operator decision. The planned baseline and treatment calendar window in `lab/experiments.json` (Aug 1 through Aug 14) was not used for a formal gate; we prioritized shipping the provider swap over sparse click metrics.

## How we would have measured

| We want | What "good" looks like |
|---------|------------------------|
| Better briefs | Shadow rubric pass on most reviewed repos: specificity, accuracy, timely hooks |
| Same traffic story | `repo_click` with `section=skills` as a secondary signal (known sparse) |

PostHog click through was never the primary gate for this swap. Editorial rubric and brief quality were.

## Outcome

We **shipped** Firecrawl for Skills web enrich and archived the experiment record. HN enrichment and 7 day momentum ranking stayed as they were. Later narration work (Ponytail, Humanizer) builds on top of this enrich layer; see the [web enrich write up](EXP-20260628-web-enrich-skills.html) for the earlier Jina plus HN chapter.

## Operator notes

| Flag | What it does |
|------|----------------|
| `DIGEST_ENRICH_WEB=1` | Post rank web context block before narrate on Skills |
| `DIGEST_ENRICH_WEB_PROVIDER=firecrawl` | Use Firecrawl v2 adapter instead of Jina Reader |
| `DIGEST_ENRICH_SHADOW=0` | Normal production path (not side by side shadow) |

Requires `FIRECRAWL_API_KEY` in the Skills digest environment on GitHub Actions.
