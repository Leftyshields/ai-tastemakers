---
lead: "Queued, not started, and planned for Oct 25 to Nov 21, 2026. Trimming the background notes the writer reads should cut cost without losing a single fact."
---

# Shorter background notes

_**Queued, not started.** This experiment will trim the background notes the Skills writer reads before writing each brief. It is planned for Oct 25 to Nov 21, 2026._

## The idea

Before Claude writes each Skills brief, Firecrawl, a tool that reads web pages, gathers background on the project from the web, Hacker News and Reddit. Those notes run long. They carry long quotes and repeated context that cost money to process and add no new facts.

This experiment will trim the notes before Claude sees them. File paths, numbers, release names and the timely news stay. Filler goes.

The idea comes from Caveman, an open source project that first appeared on the OSS list on Jun 8, 2026. Caveman is an add-on for Claude Code, a coding assistant, and it strips wordy text from what the assistant reads while keeping code, paths and error messages. The digest does not run Caveman. This test borrows the habit: facts in, fluff out.

This test is about what Claude reads, not how the brief sounds. The earlier Ponytail and Humanizer tests covered the writing itself.

## The change

The trimming step will run only on the Skills list, only during the second half of the test. Firecrawl keeps gathering background the whole time, so the only difference is whether the notes get trimmed.

| Period | Dates (Pacific time) |
|--------|----------------------|
| Before the change | Oct 25 to Nov 7, 2026 |
| With the change | Nov 8 to Nov 21, 2026 |

## How to tell if it worked

- **Cheaper to run:** Claude reads fewer words per Skills list than before the change.
- **Briefs don't bloat:** the briefs come out shorter or about the same length, since there is less filler to repeat.
- **Quality holds:** the top brief each day passes its quality checks as often as before.
- **Still timely:** scores for explaining why a project matters now don't drop.

Reader clicks will be tracked but won't decide the result. Recent tests show why: Skills clicks have been rare enough to count on one hand.

## What happened

Nothing yet. The test has not started. Results will be added here when it closes.

## References

- Experiment ID: EXP-20260913-caveman-compress-skills
- Earlier in the queue: [Humanizer polish](./EXP-20260913-humanizer-polish-skills.html)
- Where the background notes come from: [Richer Skills briefs](./EXP-20260628-web-enrich-skills.html)
- Where the idea came from: [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) (habit borrowed, not installed)
- [All Lab experiments](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
