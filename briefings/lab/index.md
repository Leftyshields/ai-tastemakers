## What this is

**Tastemakers Lab** is where we explain how the daily digest actually works — and show our work when we try to make it better.

The briefings recommend tools for search, context compaction, and agent workflows every week. The pipeline that writes those briefings should practice what it preaches: measure reader engagement, run controlled changes, and publish honest results instead of shipping tweaks in the dark.

This is not a product roadmap or a marketing page. It is an open notebook for operators and curious readers who want to know *why* a digest entry looks the way it does and *what happened* when we changed something.

## The feedback loop

We run the same cycle for every meaningful pipeline or site change:

1. **Inventory** — scan past briefings for tools we might adopt (search APIs, indexers, eval harnesses, analytics).
2. **Measure** — track pageviews and outbound repo clicks on the public site so we know what people read and click, not just what we think is interesting.
3. **Experiment** — register a hypothesis, collect a baseline window, run the change (often on the Skills edition first), compare metrics, and record a verdict.
4. **Report** — publish the experiment record and, when we dogfood a tool, a short write-up of what we tried and whether we kept it.

Shadow runs let us preview enriched blurbs side-by-side with production output before anything ships to subscribers.

## What you'll find here

- **[Tool inventory](tools.html)** — repos that appeared in briefing history, tagged by pipeline role (search, compaction, eval, analytics). Candidates for adoption, not endorsements.
- **[Experiments](experiments.html)** — what we tested, what is live on the site today, and what is on hold. Written for readers first.
- **[Token usage](token-usage.html)** — how much it costs to write each digest, and whether the writing still passes a quality check.
- **[Posts](posts/)** — short stories when we try a digest-featured tool in our own stack.
- **[Shadow rubric](shadow-rubric.html)** — how we score “before” vs “after” blurbs before a change stays on.

## How to read an experiment

Each experiment states a **question** (what we expect to improve), **what we changed**, and two time windows: **before** (change off) and **after** (change on). Numbers come from analytics we import after each window — this page only updates when we rebuild the site.

We use **before/after calendar windows** rather than live A/B tests because the site is static HTML rebuilt daily. Slower feedback, but easy to audit.

**Right now (2026-08-16):** We are testing **[shorter Skills briefs](posts/EXP-20260802-ponytail-narration-skills.html)**. Today's Skills digest still uses the old writing style. Starting **Aug 17** through **Aug 29**, new Skills briefs use tighter rules (one “try this” step). OSS is unchanged. Cost and quality live on the [Token dashboard](token-usage.html). Next in line: less-repeated Skills picks, after this window ends.

## Transparency boundaries

Everything in `/lab/` is safe to publish: no API keys, no subscriber data, no unpublished digest drafts. Pipeline source lives on [GitHub](https://github.com/Leftyshields/ai-tastemakers); Lab is the human-readable layer on top.

If you have questions or spot something that looks off, open an issue — we would rather fix a misleading chart than hide the methodology.
