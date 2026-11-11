---
lead: "Kept Aug 29, 2026. Two simple writing rules made Skills briefs about 18% shorter, kept them passing every quality check, and made them better at explaining why each project matters now."
---

# Shorter Skills briefs

_**Kept Aug 29, 2026.** This experiment tried a tighter writing style for Skills briefs. Briefs came out about 18% shorter, passed all 13 quality checks, and did a better job on average of explaining why each project matters now._

## The idea

Each Skills brief has three parts: what it does, why now, and try this. Briefs tended to run long, suggest whole stacks of tools, and describe setups the project never mentioned.

The bet: two writing rules make briefs shorter, more concrete, and about 10% cheaper to produce, without weakening the why now line.

The rules borrow habits from two GitHub projects that kept coming up in a late July [weekly takeaway](../../weekly/2026-W31.html). Neither project runs on the list. Only the habits carry over.

- [Graphify](https://github.com/Graphify-Labs/graphify) turns a codebase into an organized map of facts instead of one big pile. The habit: keep lasting facts (the project's own description) separate from passing news. News can explain why now. It should not rewrite what it does.
- [Ponytail](https://github.com/DietrichGebert/ponytail), which first appeared on the Skills list on Jun 13, 2026, stops coding assistants from overbuilding, for example by using a browser's built-in date field instead of adding a date picker library. The habit: one path, the smallest one. Try this becomes a single step a builder can do today.
- YAGNI, short for "You Aren't Gonna Need It," is an old software saying against adding layers just in case. If a project's description never mentions a big multi-part setup, the brief should not recommend one.

## The change

Two rules went into the Skills writing step only. The AI Tastemakers daily list stayed the same.

1. **Facts in order.** The writer reads the project's own description first, then stars and topics, then news last, and uses news only for the why now line.
2. **Stay small.** One sentence per section where possible, exactly one thing to try, and no invented setups.

The first brief with the new rules published Aug 17, 2026.

## How to tell if it worked

The test compared Aug 2 to 16 (old rules) with Aug 17 to 29 (new rules) on the [Token dashboard](../token-usage.html). Tokens are the units an AI model reads and writes, so fewer output tokens means shorter briefs and a lower bill.

| Goal | Sign of success |
|---------|------------------------|
| Shorter and cheaper | At least 15% fewer output tokens per run than the old average of about 2005 |
| Still accurate | The day's top brief passes the quality checklist at least 95% of the time |
| Still timely | Why now still points to real news, a release, or a trending spot |

Clicks were not part of the pass or fail call, which is lucky. Skills projects drew 2 clicks in four weeks, Aug 2 to Aug 29. The Lab appreciates both of those readers, but two clicks can't show a difference in writing style.

## What happened

**Before (Aug 3 to 16):** 14 daily runs averaged about 2005 output tokens and 1239 words, and all 14 passed the automated quality checks. That set the bar.

**After (Aug 17 to 29):** 13 daily runs averaged about 1649 output tokens and 1026 words.

- Output dropped 17.8% and words dropped 17.2%. That beat the 15% target, so briefs got shorter and cheaper to make.
- The top brief passed the quality checklist 13 times out of 13, so the shorter style did not cost accuracy.
- The why now score, on a 1 to 5 scale, averaged 4.1, up from 3.4. Briefs got better at saying why a project matters right now.
- The specificity score slipped to 4.5 from 5.0. It still cleared the passing bar, so briefs still named real features.
- Editors saw timely news, trending spots, and release notes stay in the briefs. A few late picks leaned on star growth alone and still passed.

Both rules stay on for Skills briefs. The AI Tastemakers daily list is unchanged.

### Compare two briefs

- **Before:** [Aug 16, 2026](../../skills/briefings/2026-08-16.html), the last brief under the old rules. Notice how long each section runs.
- **After:** [Aug 17, 2026](../../skills/briefings/2026-08-17.html), the first brief under the new rules. Notice one short sentence per section and a single thing to try.

### More

- Earlier experiment this builds on: [Richer Skills briefs](./EXP-20260628-web-enrich-skills.html)
- All experiments: [Lab dashboard](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)
