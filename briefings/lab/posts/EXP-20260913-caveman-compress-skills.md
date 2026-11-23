---
lead: "Not kept, Nov 21, 2026. Trimming the background notes ran on every Skills run but cut them by only 3.7%, so cost, brief length and quality stayed flat. The notes were too small a part of the prompt to matter."
---

# Shorter background notes

_**Not kept, Nov 21, 2026.** This experiment trimmed the background notes the Skills writer reads before each brief. From Nov 8 to Nov 21, 2026, the trimming ran every day but cut the notes by only 3.7%, and cost, brief length and quality didn't move. The trimming worked. It was aimed at the wrong part of the prompt._

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

The trimming ran on every Skills run from Nov 8 to Nov 21. It just had very little to cut. The comparison is 14 runs before the change (Oct 25 to Nov 7) against 14 runs with it.

- **Cheaper to run: no.** The background notes shrank by 3.7%, about 120 characters per run. What Claude reads per Skills list, counted in tokens (the chunks of text AI models bill by), went from 24,412 to 24,279, down 0.5%. The OSS list had no trimming and fell 2.0% over the same weeks, so the Skills drop is normal drift, not the change. Cost stayed flat: $1.716 for the 14 runs before, $1.721 for the 14 after, about 12 cents a run.
- **Briefs don't bloat: held.** Briefs ran about the same length, 980 words per list before and 996 after.
- **Quality holds: held.** The day's top brief passed its quality checks 14 times out of 14 in both periods.
- **Still timely: held.** The why now score, which rates from 1 to 5 how well a brief explains why a project matters right now, sat at 4.64 in both periods. Specificity, which rates how concrete the details are, stayed at 5.0.

Why so little changed: the background notes are only about 3,000 characters of a prompt that runs about 70,000. Most of the prompt is project READMEs, the front page text of each project, capped at 4,000 characters per project. If cost becomes the goal, the READMEs are the bigger target.

The trimming didn't help the briefs, so the step is off. That result is about this digest, not Caveman. The digest borrowed Caveman's habit and never installed the tool.

A test that changes nothing still gets published here. That's the rule.

## References

- Experiment ID: EXP-20260913-caveman-compress-skills
- Earlier in the queue: [Humanizer polish](./EXP-20260913-humanizer-polish-skills.html)
- Where the background notes come from: [Richer Skills briefs](./EXP-20260628-web-enrich-skills.html)
- Where the idea came from: [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) (habit borrowed, not installed)
- [All Lab experiments](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
