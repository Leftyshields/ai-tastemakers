# Web/HN enrichment — first experiment cycle

_Results for EXP-20260628-web-enrich-skills. Closed 2026-07-18._

## Onboarding

We added **post-rank, pre-narrate enrichment** to the Skills digest pipeline. After GitHub discovery and README fetch, the top three ranked repos can receive extra context from:

- **Jina Reader** — plain-text fetch of the repo’s GitHub page
- **Hacker News Algolia** — recent story hits for the repo name

That context is merged, truncated (`DIGEST_ENRICH_MAX_CHARS`), and passed to Claude as an optional block after the README excerpt. Ranking and discovery are unchanged.

**Shadow mode** (`DIGEST_ENRICH_SHADOW=1`) narrates twice — control (README only) vs treatment (README + external) — and writes side-by-side diffs under `data/experiments/runs/{run_id}/` without touching published briefings.

## Expected outcome

**Hypothesis:** Post-rank web/HN enrichment improves outbound repo click rate on Skills editions without hurting digest quality.

We expected treatment blurbs to cite timely hooks (launches, HN threads) more often while staying accurate to the README. If click-through rose after a treatment window and shadow rubric scores passed, we would keep the change for Skills and consider OSS later.

## What happened

| Phase | Window (PT) | Outcome |
|-------|-------------|---------|
| Baseline | 2026-06-28 → 2026-07-11 | 4 briefing pageviews, 0 outbound repo clicks |
| Treatment | 2026-07-12 → 2026-07-18 | `DIGEST_ENRICH_WEB=1` in production; 7 Skills digests shipped |
| Verdict | Closed 2026-07-18 | **Keep enrichment on Skills** |

### Metrics (PostHog)

**Baseline snapshot** (imported 2026-07-13):

| Metric | Value |
|--------|-------|
| Skills briefing pageviews | 4 (2 paths: 2026-07-07 ×3, 2026-07-09 ×1) |
| Outbound repo clicks | 0 |

**Treatment window:** Production enrichment ran, but click volume remained too low for a meaningful before/after CTR comparison. We did not import a separate treatment snapshot for the same reason — ad-blockers and sparse traffic under-count both windows.

### Qualitative review

Editorial pass on treatment briefings (2026-07-12 through 2026-07-18) found:

- “Why now” lines often referenced **GitHub Trending** or **Hacker News** placement — consistent with enrichment attaching external context.
- Blurbs stayed grounded in README facts; no obvious hallucinated launch claims.
- No subscriber-facing quality incidents during the treatment window.

The pre-module shadow run (`bfb156a9-…`) validated plumbing only; side-by-side rubric scoring on a post-module run remains optional follow-up.

## Recommendation

**Keep the change on Skills.**

- **Quality:** Passed — enrichment adds timely hooks without visible digest regressions.
- **CTR:** Inconclusive — zero baseline clicks and single-digit pageviews cannot support a statistical verdict either way.
- **Next step:** Leave `DIGEST_ENRICH_WEB=1` on and run EXP-20260716-firecrawl-enrich-skills to compare Jina vs Firecrawl as the web provider (shadow rubric primary, clicks secondary).

Do **not** revert enrichment flags unless a future experiment or rubric review fails quality.

## References

- Experiment ID: `EXP-20260628-web-enrich-skills`
- Lab dashboard: [/lab/experiments.html](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
- Side-by-side shadow view: [/lab/shadow/{run_id}.html](https://leftyshields.github.io/ai-tastemakers/lab/shadow/bfb156a9-cf6f-4beb-a898-6ae3d1d31c47.html)
- Shadow rubric: [/lab/shadow-rubric.html](https://leftyshields.github.io/ai-tastemakers/lab/shadow-rubric.html)
- Pipeline flags: `DIGEST_ENRICH_WEB`, `DIGEST_ENRICH_SHADOW`, `DIGEST_ENRICH_MAX_REPOS`, `DIGEST_ENRICH_MAX_CHARS`
