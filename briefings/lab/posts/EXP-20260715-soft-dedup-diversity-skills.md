---
lead: "This experiment made the Skills list repeat fewer of the previous day's top picks. Repeats in the top 10 dropped from 70% to 37.5%, and the change stayed on after the test closed."
---

# Less-repeated Skills picks

_**Closed Sep 26, 2026.** This experiment made the Skills list repeat fewer of the previous day's top picks. Repeats in the top 10 dropped from 70% to 37.5%, and the change stayed on after the test closed._

## The idea

The Skills list ranks projects by how many GitHub stars they gained over the past seven days. A built-in rule already pushes down projects that appeared recently, so the list doesn't show the same names every day. Even so, about 70% of each day's top 10 were repeats from the day before.

This experiment made that rule stronger. The hope: a fresher list each day, with more projects that had never been featured on Skills before, while real weekly activity still decided the ranking.

## The change

Two things changed, on the Skills list only:

- The rule looked back further. It checked the last 14 lists instead of the last 5.
- Repeats got pushed down harder. A recent repeat kept 15% of its ranking score instead of 50%.

Ranking, project discovery and the writing of each brief did not change. The OSS list kept its usual settings. The shorter writing style from the earlier Ponytail test stayed on throughout.

## How to tell if it worked

The main signal was repeats: how many of today's top 10 were also in yesterday's top 10. Before the change, that averaged 70%. The bar for success was a drop of at least 15 percentage points.

Two more signals helped tell the story: how many different projects reached the top 10 over two weeks, and how many top 10 spots went to projects marked NEW (never featured on Skills before).

Reader clicks were tracked too, but they couldn't decide the result. Traffic was too thin.

## What happened

| | Before the change | With the change |
|--------|----------------------|--------|
| Dates (Pacific time) | Aug 30 to Sep 12, 2026 | Sep 13 to Sep 26, 2026 |
| Skills lists published | 14 | 13 |
| Top 10 repeats from the day before | 70.0% | 37.5% |
| Different projects in the top 10 | 33 (out of 140 spots) | 82 (out of 130 spots) |
| Top 10 spots marked NEW | 4.3% | 26.2% |

Repeats fell by 32.5 percentage points, more than double the 15 point bar. In plain terms, a typical day went from 7 repeats in the top 10 to fewer than 4. Over two weeks, the number of different projects in the top 10 rose from 33 to 82, and the share of NEW projects jumped from 4.3% to 26.2%. The list got noticeably fresher.

The test period had 13 lists instead of 14 because the Sep 26 list was missing when the test closed.

The traffic numbers stay humble. In the two weeks before the change, Skills pages drew 2 views of a daily list (both on the Sep 1 edition), 2 views of the Skills home page, and 0 clicks out to GitHub. That's a small, loyal audience, and far too small to judge anything. Clicks did not count toward the decision.

The Lab kept the change. It is still on for Skills.

Sample lists from before the change: [Aug 30](../../skills/briefings/2026-08-30.html) · [Sep 1](../../skills/briefings/2026-09-01.html) · [Sep 12](../../skills/briefings/2026-09-12.html)

## References

- Experiment ID: EXP-20260715-soft-dedup-diversity-skills
- [All Lab experiments](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
- Earlier write-ups: [Shorter Skills briefs](./EXP-20260802-ponytail-narration-skills.html) · [Richer Skills briefs](./EXP-20260628-web-enrich-skills.html)
