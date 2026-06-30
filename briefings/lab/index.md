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
- **[Experiments](experiments.html)** — active and completed tests with baseline/treatment windows, imported metrics, and plain-language verdicts.
- **[Posts](posts/)** — onboarding notes and outcome stories when we adopt a digest-featured tool in our own stack.
- **[Shadow rubric](shadow-rubric.html)** — how we score control vs treatment blurbs before enabling enrichment in production.

## How to read an experiment

Each experiment states a **hypothesis** (what we expect to improve), a **change summary** (what we toggled), and two time windows: **baseline** (before) and **treatment** (after). Snapshots are imported from site analytics; nothing live-updates — the dashboard reflects what we committed at the last site build.

We default to **before/after windows** rather than live A/B tests because the site is static HTML rebuilt daily. That is a deliberate trade-off: slower feedback, but reproducible and easy to audit.

## Transparency boundaries

Everything in `/lab/` is safe to publish: no API keys, no subscriber data, no unpublished digest drafts. Pipeline source lives on [GitHub](https://github.com/Leftyshields/ai-tastemakers); Lab is the human-readable layer on top.

If you have questions or spot something that looks off, open an issue — we would rather fix a misleading chart than hide the methodology.
