# Mission — Lab experiments page

## Objectives

- Publish a governed Lab experiments dashboard on `/lab/` sourced from `lab/experiments.json`.
- Validate experiment windows (surface overlap, dependency order, `min_read_days`, required `success` blocks).
- Sync PostHog metric series from each row's `success.metric.posthog` into `lab/experiment-status.json`.
- After a bot push of `lab/experiment-status.json`, workflow `.github/workflows/lab-experiment-status.yml` dispatches `pages.yml` on `main` (bot pushes do not match Pages `on.push` paths). Never dispatch or edit digest workflows.
- Render control panel (running experiment with sparkline, progress bar, track badge), timeline, backlog, and history on the static site.

## Success Criteria

- Every experiment row includes `success.success_criteria` and `success.metric` with `posthog`, `direction`, `baseline`, `target`, and `pass_threshold`.
- `npm run lab:validate-experiments` passes; `npm run test:digest` passes; Pages build emits `experiments.public.json` and dashboard HTML.
- PostHog sync writes daily series and current value per experiment when `POSTHOG_PERSONAL_API_KEY` is set; skips cleanly otherwise.
- Full registry is public in `experiments.public.json` (no visibility tiers).

## Out of Scope

- Daily digest pipeline behavior changes.
- Editing project-genesis upstream.
- Formal PostHog Experiments product linkage for every historical row.
