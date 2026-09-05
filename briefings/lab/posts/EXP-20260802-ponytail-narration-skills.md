# Shorter Skills briefs

_**Kept (2026-08-29).** Treatment cut output ~18% with 13/13 rubric pass and stronger Why-now scores on average. Both narration flags stay on Skills digests._

## The question, in English

Skills blurbs have three parts: **what it does**, **why now**, and **try this**.

We changed two things about how those get written:

1. **Feed Claude the facts in order.** The README first (what the repo actually does), then stars and topics, then news last — and only for the “why now” line.
2. **Tell Claude to stay small.** One sentence per section when we can. Exactly one thing to try. No invented architecture.

If that works, blurbs should name real features, give one concrete next step, and cost about 10% less to generate — without turning “why now” into “it has a lot of stars.”

That is the whole test. The names Graphify, Ponytail, and YAGNI are *where the ideas came from*, not tools we installed.

## What those three names mean

In late July our [weekly takeaway](../../weekly/2026-W31/weekly_review.md#builder-takeaway) kept pointing at two GitHub projects. We borrowed their *habits*, not their code.

### Graphify

[Graphify](https://github.com/Graphify-Labs/graphify) is a tool that turns a codebase into a knowledge graph. Instead of stuffing every file into one pile for an AI to rummage through, it lets the model look up facts in a structured way — and it labels whether a fact was extracted or guessed.

We are **not** running Graphify on the digest.

We copied the habit: **don't dump everything into one blob.** Durable facts (the README) sit above timely noise (Hacker News, Reddit, a trending spike). News can inform “why now.” It should not rewrite “what it does.”

### Ponytail

[Ponytail](https://github.com/DietrichGebert/ponytail) is a skill for coding agents (Claude Code, Cursor, and similar). Its job is to stop the agent from overbuilding. A typical nudge: use the browser's built-in date field instead of pulling in a third-party date-picker library.

This experiment is **not** a test of that GitHub skill, even though Ponytail often appears *on* the Skills list. We did not install it.

We copied the habit: **one path, the smallest one.** “Try this” should be a single step a builder can do today, not a three-tool stack and a production architecture the README never mentioned.

### YAGNI

YAGNI is an old software proverb: **You Aren't Gonna Need It.** Don't add extra layers “just in case.”

Ponytail is YAGNI aimed at coding agents. For this digest, YAGNI means: if the README doesn't describe a pipeline, a platform, or a multi-service setup, the blurb shouldn't recommend one.

## What a reader should notice (starting Aug 17)

On Skills briefs only — OSS is unchanged:

- Sections stay short
- **Try this** names one integration, not a stack
- No “build a production-ready pipeline around…” unless the repo actually says that
- **Why now** still needs a timely hook (HN, Reddit, a release) — star count alone is not enough

The first treated digest shipped **2026-08-17**. We closed the window on **2026-08-29** and kept the tighter rules.

## How we'll know

We compare the old writing (Aug 2–16) with the new writing (Aug 17–29) on the [Token dashboard](../token-usage.html).

| We want | What “good” looks like |
|---------|------------------------|
| Cheaper / shorter | About 10% fewer words and output tokens, without the writing falling apart |
| More specific | Names real features, not generic hype |
| More useful | One step a builder could actually take |
| Still timely | “Why now” still cites a real hook |

Click and pageview stats are out of scope here. This test is about writing quality and cost.

### Before we had the new rules (Aug 3–16)

Fourteen Skills runs: about **2005** output tokens and **1239** words per run. Automated quality checks passed 14 of 14. That is the before picture.

### After the new rules (Aug 17–29)

Thirteen Skills runs: about **1649** output tokens (−17.8%) and **1026** words (−17.2%) per run. Rank-1 rubric passed **13 of 13**. Why-now heuristic averaged **4.1/5** (baseline 3.4); specificity averaged **4.5/5** (baseline 5.0) — still above the pass bar. Editorial review: timely hooks (HN, GitHub Trending, release notes) remain on treatment briefs; a few late-window rank-1 picks leaned on star velocity but passed rubric.

## Outcome

We **kept** both `DIGEST_NARRATE_STRUCTURED_CONTEXT=1` and `DIGEST_NARRATE_PONYTAIL=1` on the Skills digest command. The ~10% cost target was exceeded without rubric or Why-now regressions. OSS narration is unchanged.

## Published briefs (samples)

Links go to the live Skills digest pages — the reader-facing output from each window.

**After (treatment, Aug 17–29):**

- [2026-08-17](../../skills/briefings/2026-08-17.html) · [2026-08-18](../../skills/briefings/2026-08-18.html) · [2026-08-19](../../skills/briefings/2026-08-19.html) · [2026-08-20](../../skills/briefings/2026-08-20.html) · [2026-08-21](../../skills/briefings/2026-08-21.html) · [2026-08-22](../../skills/briefings/2026-08-22.html) · [2026-08-23](../../skills/briefings/2026-08-23.html) · [2026-08-24](../../skills/briefings/2026-08-24.html) · [2026-08-25](../../skills/briefings/2026-08-25.html) · [2026-08-26](../../skills/briefings/2026-08-26.html) · [2026-08-27](../../skills/briefings/2026-08-27.html) · [2026-08-28](../../skills/briefings/2026-08-28.html) · [2026-08-29](../../skills/briefings/2026-08-29.html)

**Before (baseline samples):**

- [2026-08-03](../../skills/briefings/2026-08-03.html) (first logged run) · [2026-08-10](../../skills/briefings/2026-08-10.html) · [2026-08-16](../../skills/briefings/2026-08-16.html) (last run before flags flipped)

---

## Operator notes

Two flags. Ranking, discovery, and web enrichment are unchanged.

| Flag | What it does |
|------|----------------|
| `DIGEST_NARRATE_STRUCTURED_CONTEXT=1` | Prompt order: README → metadata → web/HN/Reddit (Why now only) |
| `DIGEST_NARRATE_PONYTAIL=1` | Short sections; one Build-with-it step; no invented architecture; `max_tokens` 350 vs 450 |

Flags are on the **Skills digest command only**, not the shared OSS env block.

### Optional side-by-side preview

```bash
EXPERIMENT_ID=EXP-20260802-ponytail-narration-skills \
DIGEST_ENRICH_WEB=1 \
DIGEST_ENRICH_SHADOW=1 \
DIGEST_NARRATE_STRUCTURED_CONTEXT=1 \
DIGEST_NARRATE_PONYTAIL=1 \
npm run digest -- --edition skills
```

Output: `data/experiments/runs/{run_id}/`. Score with the [shadow rubric](../shadow-rubric.md) (specificity, build-with-it, why-now, accuracy).

### Windows

| Phase | Dates (PT) |
|-------|------------|
| Before (change off) | 2026-08-02 → 2026-08-16 |
| After (change on) | 2026-08-17 → 2026-08-29 |

## References

- Experiment ID: `EXP-20260802-ponytail-narration-skills`
- W31 takeaway: [weekly/2026-W31](../../weekly/2026-W31/weekly_review.md)
- Prior experiment: [Richer Skills briefs](./EXP-20260628-web-enrich-skills.md) (the enrichment layer this sits on)
- Lab dashboard: [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
