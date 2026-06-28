# Closure — EPH-20260628-SRCH

**Status:** Implementation complete; baseline metrics collection ongoing through 2026-07-11.

## Shipped

- Tool inventory CLI + `/lab/tools`
- PostHog analytics + `outbound_repo_click` events
- Experiment registry, snapshot import, shadow runs
- `/lab/experiments` dashboard + markdown export
- Web/HN enrichment module (Jina Reader + HN Algolia) with side-by-side shadow diffs
- Lab writeup, shadow rubric, dogfood post (`briefings/lab/posts/EXP-20260628-web-enrich-skills.md`)

## Operator next steps

1. Verify PostHog on production after Pages deploy
2. Re-run shadow with `DIGEST_ENRICH_WEB=1 DIGEST_ENRICH_SHADOW=1` for rubric review
3. Import baseline snapshot after 2026-07-11
4. Enable treatment only after rubric go + second metrics window

## Tests

135 vitest + 61 node tests passing at ship time.

See `.ai/context/postmortem_eph-20260628-srch.md` for full session notes (local).
