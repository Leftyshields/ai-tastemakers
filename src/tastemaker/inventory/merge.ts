import type { ScanObservation, ToolInventory, ToolInventoryEntry } from "./types.js";
import { classifyEntry } from "./classify.js";

function mergeTopics(existing: string[], incoming: string[]): string[] {
  return [...new Set([...existing, ...incoming])].sort();
}

export function aggregateObservations(observations: ScanObservation[]): Map<string, ScanObservation[]> {
  const byRepo = new Map<string, ScanObservation[]>();
  for (const obs of observations) {
    const list = byRepo.get(obs.full_name) ?? [];
    list.push(obs);
    byRepo.set(obs.full_name, list);
  }
  return byRepo;
}

export function mergeInventory(
  observations: ScanObservation[],
  prior: ToolInventory | null,
  scanSources: string[],
  generatedAt: string,
): ToolInventory {
  const byRepo = aggregateObservations(observations);
  const priorByName = new Map((prior?.entries ?? []).map((e) => [e.full_name, e]));

  const entries: ToolInventoryEntry[] = [];

  for (const [fullName, obs] of byRepo) {
    const priorEntry = priorByName.get(fullName);
    const dates = obs.map((o) => o.date).sort();
    const html_url =
      obs.find((o) => o.html_url)?.html_url ??
      priorEntry?.html_url ??
      `https://github.com/${fullName}`;
    const topics = obs.reduce<string[]>((acc, o) => mergeTopics(acc, o.topics), priorEntry?.topics ?? []);
    const briefSample =
      obs
        .map((o) => o.brief)
        .filter((b): b is string => Boolean(b))
        .sort((a, b) => b.length - a.length)[0] ?? null;
    const { capability_tags, pipeline_roles } = classifyEntry(topics, briefSample);

    const first_seen =
      priorEntry?.first_seen && priorEntry.first_seen < dates[0] ? priorEntry.first_seen : dates[0];
    const last_seen =
      priorEntry?.last_seen && priorEntry.last_seen > dates[dates.length - 1]
        ? priorEntry.last_seen
        : dates[dates.length - 1];

    entries.push({
      full_name: fullName,
      html_url,
      topics,
      capability_tags,
      pipeline_roles,
      appearance_count: obs.length,
      first_seen,
      last_seen,
      recommendation: priorEntry?.recommendation,
      notes: priorEntry?.notes,
    });
  }

  for (const [fullName, priorEntry] of priorByName) {
    if (!byRepo.has(fullName)) {
      entries.push(priorEntry);
    }
  }

  entries.sort((a, b) => b.appearance_count - a.appearance_count || a.full_name.localeCompare(b.full_name));

  return {
    schema_version: 1,
    generated_at: generatedAt,
    scan_sources: scanSources,
    entries,
  };
}
