# Constraints

- TypeScript lab scripts live under `scripts/lab/`; tests under `src/tastemaker/lab/`.
- Do not add chart libraries; sparklines are inline SVG only.
- PostHog project 489599; host default `https://us.posthog.com`.
- Validation must fail closed on missing `success` fields or invalid windows.
- Genesis organism runtime uses MIT lib in `lib/`; genome directory is `genesis/experiments-page.genome/`.
- Lab status CI: `.github/workflows/lab-experiment-status.yml` needs `permissions.actions: write`, commit step `id: commit` with `changed=true` on push, then `gh workflow run pages.yml --ref main` when changed. Do not modify `digest.yml`, `digest-catchup.yml`, or `digest-verify.yml`.
