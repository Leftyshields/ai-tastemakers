# Short public name

_One sentence a reader can understand without knowing flag names._

## In plain English

What changed for someone who reads the digest, in a few bullets. Operator detail belongs below.

## Onboarding

What we changed and why a reader should care.

When an experiment borrows from a repo on the daily lists, name its first list appearance in plain language (for example: "first appeared on the Skills list on Aug 5, 2026"). At build time, `experiments.public.json` includes `firstSeen` per experiment (`date`, `list`, `fullName`, no rank). For new drafts, `formatFirstSeenClause(displayName, firstSeen)` in `scripts/lab/first-seen.ts` produces the comma clause or falls back to the display name alone when the repo is not in the archives. Hand-edit the sentence around it; do not paste operator flags or env names.

## Expected outcome

Copy from experiment `hypothesis` and baseline assumptions.

## What happened

Before/after metrics summary. Link to `/lab/experiments.html` detail.

## Recommendation

Keep or revert? Plain language for builders considering the same change.

## References

- Experiment ID: `EXP-YYYYMMDD-slug`
- Snapshots imported: YYYY-MM-DD
- Shadow runs reviewed: yes/no
