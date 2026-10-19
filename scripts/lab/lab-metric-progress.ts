import type { LabSuccessMetric } from "./validate-experiments.js";
import type { DailyMetricPoint } from "./posthog-metric.js";

export type LabTrackStatus = "Ahead" | "On track" | "Behind";

export function effectiveBaseline(
  metric: LabSuccessMetric,
  daily: DailyMetricPoint[],
): number {
  if (metric.baseline != null && Number.isFinite(metric.baseline)) {
    return metric.baseline;
  }
  if (daily.length > 0) return daily[0]!.value;
  return 0;
}

export function metricProgressPct(
  current: number | null,
  metric: LabSuccessMetric,
  baseline: number,
): number | null {
  if (current === null || !Number.isFinite(current)) return null;
  const target = metric.target;
  if (metric.direction === "increase") {
    const span = target - baseline;
    if (span === 0) return current >= target ? 100 : 0;
    return Math.max(0, Math.min(100, ((current - baseline) / span) * 100));
  }
  const span = baseline - target;
  if (span === 0) return current <= target ? 100 : 0;
  return Math.max(0, Math.min(100, ((baseline - current) / span) * 100));
}

export function computeTrackStatus(
  current: number | null,
  metric: LabSuccessMetric,
  baseline: number,
  dayOfMinRead: number | null,
  minReadDays: number,
): LabTrackStatus | null {
  if (current === null || dayOfMinRead === null || minReadDays <= 0) return null;
  const t = Math.min(Math.max(dayOfMinRead / minReadDays, 0), 1);
  const target = metric.target;
  const expected =
    metric.direction === "increase"
      ? baseline + (target - baseline) * t
      : baseline - (baseline - target) * t;
  const span = Math.abs(target - baseline);
  const eps = span > 0 ? span * 0.08 : Math.max(Math.abs(expected) * 0.05, 1);

  if (metric.direction === "increase") {
    if (current > expected + eps) return "Ahead";
    if (current < expected - eps) return "Behind";
    return "On track";
  }
  if (current < expected - eps) return "Ahead";
  if (current > expected + eps) return "Behind";
  return "On track";
}

export function renderSparklineSvg(
  daily: DailyMetricPoint[],
  width = 120,
  height = 32,
  options?: { animate?: boolean },
): string {
  const animate = options?.animate !== false;
  const motionClass = animate ? " lab-sparkline-animate" : "";
  if (daily.length === 0) {
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="lab-sparkline${motionClass}" aria-hidden="true"><line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="currentColor" stroke-opacity="0.2"/></svg>`;
  }
  const values = daily.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pad = 2;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const points = values
    .map((v, i) => {
      const x = pad + (values.length === 1 ? innerW / 2 : (i / (values.length - 1)) * innerW);
      const y = pad + innerH - ((v - min) / span) * innerH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="lab-sparkline text-blue-600 dark:text-blue-400${motionClass}" aria-hidden="true"><polyline fill="none" stroke="currentColor" stroke-width="1.5" points="${points}"/></svg>`;
}

export function renderProgressBarHtml(progressPct: number | null): string {
  const pct = progressPct === null ? 0 : Math.max(0, Math.min(100, progressPct));
  const pctLabel =
    progressPct === null
      ? `<span class="sr-only">Progress unavailable</span>`
      : `<span>${pct.toFixed(0)}%</span>`;
  return `<div class="mt-2 lab-progress"><div class="flex justify-between text-xs text-stone-500"><span>Progress to target</span>${pctLabel}</div><div class="mt-1 h-2 w-full overflow-hidden rounded bg-stone-200 dark:bg-stone-800"><div class="lab-progress-fill h-full rounded bg-emerald-600 dark:bg-emerald-500" style="width:${pct.toFixed(1)}%"></div></div></div>`;
}

export function trackBadgeClass(status: LabTrackStatus): string {
  switch (status) {
    case "Ahead":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200";
    case "Behind":
      return "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200";
    default:
      return "bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200";
  }
}
