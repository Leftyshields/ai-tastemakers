# Shorter Skills briefs

_We're testing whether Skills write-ups can be shorter and more useful without losing a real “why this, today” hook. First treated digest: 2026-08-17._

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

Today's Skills brief (Aug 16) is still the old style. We decide on **Aug 29** whether to keep the tighter rules.

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

## If it doesn't work

On Aug 29: keep both changes if briefs get shorter and still pass the quality check with timely hooks.

If “why now” goes mushy, turn off the shortness rules first and keep the ordered-facts prompt. OSS stays on the old prompt until Skills earns a keep.

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
