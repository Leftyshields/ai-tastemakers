## What this is

**Tastemakers Lab** is where we explain how the daily digest actually works and show our work when we try to make it better.

The briefings recommend tools for search, context compaction, and agent workflows every week. The pipeline that writes those briefings should practice what it preaches: measure reader engagement, run controlled changes, and publish honest results instead of shipping tweaks in the dark.

This is not a product roadmap or a marketing page. It is an open notebook for operators and curious readers who want to know *why* a digest entry looks the way it does and *what happened* when we changed something.

## The feedback loop

LAB_LOOP_ABOUT_PLACEHOLDER

Shadow runs let us preview enriched blurbs side by side with production output before anything ships to subscribers.

## What you'll find here

- **[Tool inventory](tools.html)** repos that appeared in briefing history, tagged by pipeline role (search, compaction, eval, analytics). Candidates for adoption, not endorsements.
- **[Experiments](experiments.html)** what we tested, what is live on the site today, and what is on hold. Written for readers first.
- **Control panel, timeline, backlog, and history** on the [Lab home](index.html) (from `lab/experiments.public.json` at build time).
- **[Token usage](token-usage.html)** how much it costs to write each digest, and whether the writing still passes a quality check.
- **[Posts](posts/)** short stories when we try a digest featured tool in our own stack.
- **[Shadow rubric](shadow-rubric.html)** how we score “before” vs “after” blurbs before a change stays on.

## How to read an experiment

Each experiment states a **question** (what we expect to improve), **what we changed**, and two time windows: **before** (change off) and **after** (change on). Numbers come from analytics we import after each window. This page only updates when we rebuild the site.

We use **before and after calendar windows** rather than live A/B tests because the site is static HTML rebuilt daily. Slower feedback, but easy to audit.

## Transparency boundaries

Everything in `/lab/` is safe to publish: no API keys, no subscriber data, no unpublished digest drafts. Pipeline source lives on [GitHub](https://github.com/Leftyshields/ai-tastemakers); Lab is the human readable layer on top.

If you have questions or spot something that looks off, open an issue. We would rather fix a misleading chart than hide the methodology.
