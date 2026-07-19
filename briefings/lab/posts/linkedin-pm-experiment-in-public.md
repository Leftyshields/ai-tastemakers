# LinkedIn post — PM audience (copy from here)

I product-manage a daily AI dev-tools digest the way I'd run a feature flag rollout — except the "users" are readers, the "metrics" are PostHog exports, and the verdict gets committed to GitHub.

The product is AI Tastemakers (GitHub discovery → ranking → Claude → email + static site). The lab is Tastemakers Lab — an open notebook for how we measure, change, and report. Not a roadmap deck. Actual experiment records.

The loop:
1. Inventory — tools that show up in our own briefings
2. Measure — pageviews + outbound repo clicks
3. Experiment — baseline → flip one flag → treatment → verdict in JSON
4. Report — dashboard + write-up; keep or revert

No live A/B — the site is static HTML rebuilt daily. We use before/after windows instead. Slower feedback, but you can audit the decision later.

First experiment closed last week — post-rank web + HN enrichment on the Skills digest:

- Bet: richer "Why now" context → more repo clicks, without hurting quality
- Baseline (14 days): 4 pageviews, 0 outbound clicks
- Treatment (7 days): enrichment on in prod
- Verdict: Ship it. Quality held. CTR inconclusive — sample size too small to call a winner.

Honest state: the process works; the n is tiny. That's why I'm posting.

In baseline now (parallel):
- Homepage layout v2 — does a clearer CTA move people to today's brief?
- Firecrawl vs Jina for enrichment — quality-first; clicks secondary until traffic grows

Links:
Lab dashboard: https://leftyshields.github.io/ai-tastemakers/lab/experiments.html
Repo + playbook: https://github.com/Leftyshields/ai-tastemakers
Subscribe (free): https://leftyshields.github.io/ai-tastemakers/subscribe.html

If you read dev-tools digests or run agent workflows — a visit or subscribe isn't vanity metrics. It's the data layer for the next experiment.

Comments welcome, especially "measure X instead" or "your window design is wrong because…" That's the point of doing it in public.

#BuildInPublic #ProductManagement #AIEngineering

---

## Pin as first comment

First experiment write-up: https://leftyshields.github.io/ai-tastemakers/lab/posts/EXP-20260628-web-enrich-skills.html
Lab home: https://leftyshields.github.io/ai-tastemakers/lab/

---

## Screenshot

Experiments dashboard — web-enrich = complete (green), landing + firecrawl = baseline (amber).
