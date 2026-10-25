---
lead: "This experiment gave the Skills writer extra background from each project's web pages and Hacker News before writing. The change stayed on after the test closed."
---

# Richer Skills briefs

_**Closed Jul 18, 2026.** This experiment gave the Skills writer extra background from each project's web pages and Hacker News before writing. The change stayed on after the test closed._

## The idea

Each Skills brief is a short write-up about a GitHub project. Until this test, the writer, Claude, saw only the project's README. This experiment let Claude also read a cleaned copy of the project's GitHub page and recent Hacker News mentions of it. The top three projects each day got this extra background. The list of projects stayed exactly the same. Only the write-ups changed.

The hope: richer background would make briefs more timely, and more readers would click through to GitHub.

## The change

Two tools supplied the extra background. Jina Reader turned each project's GitHub page into plain text, and Hacker News search found recent stories naming the project. Their combined text was trimmed to a set length and handed to Claude after the README. Ranking and project discovery did not change.

Before going live, a trial run wrote each brief twice, once with the README alone and once with the extra background, so the two versions could be compared side by side without touching published briefs. That trial checked that the setup worked. It did not score the writing.

## How to tell if it worked

Two signals counted. More clicks out to GitHub after the change would show readers cared. Briefs that cited timely news, like a launch or a Hacker News thread, while staying true to the README would show better writing. If both held, the change would stay on Skills, with the OSS list as a possible next step.

## What happened

| Period | Dates (Pacific time) | Result |
|--------|----------------------|--------|
| Before the change | Jun 28 to Jul 11, 2026 | 4 views of Skills briefs, 0 clicks out to GitHub |
| With the change | Jul 12 to Jul 18, 2026 | Extra background ran live on 7 Skills briefs |
| Decision | Closed Jul 18, 2026 | Keep the extra background on Skills |

The traffic numbers are humbling. In the two weeks before the change, Skills briefs drew 4 views in total, 3 on the Jul 7 edition and 1 on the Jul 9 edition, and not a single click out to GitHub. Starting from zero clicks, there is no way to show a rise, so clicks could not settle this test. No separate traffic count was pulled for the week with the change, for the same reason. Ad blockers and light traffic undercount both weeks anyway.

The writing told a clearer story. An editor read every brief from Jul 12 to Jul 18, 2026:

- "Why now" lines often mentioned a project's spot on GitHub Trending or Hacker News, which is exactly the outside background the change added.
- Briefs stayed true to the README, with no made-up launch claims.
- Readers saw no quality problems during that week.

The writing got more timely without losing accuracy, so the change stayed on for Skills. Clicks remain unproven, because zero clicks and four views can't prove anything either way. The extra background stays on unless a later test or editor review finds a quality drop.

Firecrawl replaced Jina Reader as the page reader for Skills on Aug 1, 2026. The next test in this line was the shorter briefs test (EXP-20260802), not another comparison of page readers.

## References

- Experiment ID: EXP-20260628-web-enrich-skills
- [All Lab experiments](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
- [Side by side trial view](https://leftyshields.github.io/ai-tastemakers/lab/shadow/bfb156a9-cf6f-4beb-a898-6ae3d1d31c47.html)
- [Scoring guide for side by side reviews](https://leftyshields.github.io/ai-tastemakers/lab/shadow-rubric.html)
