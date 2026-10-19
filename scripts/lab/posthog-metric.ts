export interface DailyMetricPoint {
  date: string;
  value: number;
}

export interface FetchedExperimentMetric {
  posthog: string;
  current: number | null;
  daily: DailyMetricPoint[];
  error?: string;
}

export interface ParsedPostHogRef {
  kind: "event" | "hogql" | "insight";
  event?: string;
  filters?: Record<string, string>;
  hogql?: string;
  insightId?: string;
}

const FILTER_PAIR = /^([^=]+)=(.+)$/;

export function parsePostHogMetricRef(ref: string): ParsedPostHogRef {
  const trimmed = ref.trim();
  if (trimmed.startsWith("hogql:")) {
    return { kind: "hogql", hogql: trimmed.slice("hogql:".length).trim() };
  }
  if (trimmed.startsWith("insight:")) {
    return { kind: "insight", insightId: trimmed.slice("insight:".length).trim() };
  }
  let body = trimmed;
  if (body.startsWith("event:")) {
    body = body.slice("event:".length);
  }
  const [eventPart, query] = body.split("?", 2);
  const event = eventPart.trim();
  const filters: Record<string, string> = {};
  if (query) {
    for (const segment of query.split("&")) {
      const m = FILTER_PAIR.exec(segment.trim());
      if (m) filters[m[1].trim()] = m[2].trim();
    }
  }
  return { kind: "event", event, filters };
}

export function buildEventDailyHogQL(
  event: string,
  filters: Record<string, string>,
  startDate: string,
  endDate: string,
): string {
  const clauses: string[] = [
    `event = '${event.replace(/'/g, "\\'")}'`,
    `toDate(timestamp) >= toDate('${startDate}')`,
    `toDate(timestamp) <= toDate('${endDate}')`,
  ];
  for (const [key, value] of Object.entries(filters)) {
    if (key === "edition" || key === "channel") {
      clauses.push(`properties.${key} = '${value.replace(/'/g, "\\'")}'`);
    } else {
      clauses.push(`properties['${key.replace(/'/g, "\\'")}'] = '${value.replace(/'/g, "\\'")}'`);
    }
  }
  return `SELECT toDate(timestamp) AS day, count() AS value FROM events WHERE ${clauses.join(" AND ")} GROUP BY day ORDER BY day`;
}

function parseHogqlResults(data: unknown): DailyMetricPoint[] {
  if (!data || typeof data !== "object") return [];
  const obj = data as { results?: unknown[]; columns?: string[] };
  const rows = obj.results;
  if (!Array.isArray(rows)) return [];
  const out: DailyMetricPoint[] = [];
  for (const row of rows) {
    if (!Array.isArray(row) || row.length < 2) continue;
    const dayRaw = row[0];
    const valueRaw = row[1];
    const date =
      typeof dayRaw === "string"
        ? dayRaw.slice(0, 10)
        : dayRaw instanceof Date
          ? dayRaw.toISOString().slice(0, 10)
          : String(dayRaw).slice(0, 10);
    const value = typeof valueRaw === "number" ? valueRaw : Number(valueRaw);
    if (!Number.isFinite(value)) continue;
    out.push({ date, value });
  }
  return out;
}

export async function fetchPostHogMetricSeries(
  apiKey: string,
  projectId: string,
  host: string,
  posthogRef: string,
  startDate: string,
  endDate: string,
): Promise<FetchedExperimentMetric> {
  const parsed = parsePostHogMetricRef(posthogRef);
  if (parsed.kind === "insight") {
    return {
      posthog: posthogRef,
      current: null,
      daily: [],
      error: `insight:${parsed.insightId} fetch not implemented`,
    };
  }

  let hogql: string;
  if (parsed.kind === "hogql") {
    hogql = parsed.hogql ?? "";
  } else {
    hogql = buildEventDailyHogQL(parsed.event!, parsed.filters ?? {}, startDate, endDate);
  }

  const url = `${host.replace(/\/$/, "")}/api/projects/${projectId}/query/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: {
        kind: "HogQLQuery",
        query: hogql,
      },
      name: `lab-metric ${posthogRef.slice(0, 80)}`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return {
      posthog: posthogRef,
      current: null,
      daily: [],
      error: `PostHog query ${res.status}: ${body.slice(0, 300)}`,
    };
  }

  const data = (await res.json()) as unknown;
  const daily = parseHogqlResults(data);
  const current = daily.length > 0 ? daily[daily.length - 1]!.value : null;
  return { posthog: posthogRef, current, daily };
}

export function sumDailySeries(daily: DailyMetricPoint[]): number {
  return daily.reduce((acc, p) => acc + p.value, 0);
}
