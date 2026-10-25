---
lead: "<Optional panel lead: full Copywriter summary without the status/date prefix. Omit to derive from the intro paragraph below.>"
---

# Short public name

_**<Status: Queued, Running, Shipped or Closed> <Mon D, YYYY>.** One sentence on what this experiment changed, in words any reader understands. One sentence on the result or the plan._

<!--
Voice rules for every Lab post:
- Active voice. The experiment or a tool is the subject of each sentence. Never "we," "our" or "us."
- Say "the Lab" only for a human decision, like keeping a change or shipping early.
- Plain words. No setting names, run IDs, or terms like treatment, baseline, control, shadow, CTR or hypothesis.
- Explain every tool the first time it appears, in the same sentence.
- If the tool or repo was featured on Tastemakers, add: "<Name>, which first appeared on the <OSS or Skills> list on <Mon D, YYYY>". Use the real date from the digest archive. If none exists, leave the clause out. Never mention rank.
- Dates like "Jun 28 to Jul 11, 2026". No em dashes.
- Every number gets a plain sentence on what it means. Give small numbers as totals. If results or traffic are thin, say so with a light joke. Never estimate.
-->

## The idea

What readers saw before, what was wrong with it, and what this experiment hoped to improve. Name where the idea came from.

## The change

What changed, on which list, and what stayed the same.

| Period | Dates (Pacific time) |
|--------|----------------------|
| Before the change | <Mon D to Mon D, YYYY> |
| With the change | <Mon D to Mon D, YYYY> |

## How to tell if it worked

The signals that decide the result, and the bar each one has to clear. Note any signal that is tracked but doesn't count, and why.

## What happened

| | Before the change | With the change |
|--------|----------------------|--------|
| <Signal> | <Number> | <Number> |

One plain sentence per number: what it means and whether it cleared the bar. Then the decision the Lab made and whether the change is still on. For a test that hasn't started, write: "Nothing yet. The test has not started."

## References

- Experiment ID: EXP-YYYYMMDD-slug
- [All Lab experiments](https://leftyshields.github.io/ai-tastemakers/lab/experiments.html)

<!--
When an experiment borrows from a repo on the daily lists, name its first list appearance in plain language (for example: "first appeared on the Skills list on Aug 5, 2026"). At build time, `experiments.public.json` includes `firstSeen` per experiment (`date`, `list`, `fullName`, no rank). For new drafts, `formatFirstSeenClause(displayName, firstSeen)` in `scripts/lab/first-seen.ts` produces the comma clause or falls back to the display name alone when the repo is not in the archives. Hand-edit the sentence around it; do not paste operator flags or env names.
-->
