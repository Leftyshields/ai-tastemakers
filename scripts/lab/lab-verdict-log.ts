import fs from "node:fs";
import path from "node:path";
import type { LabVerdict } from "./validate-experiments.js";

/** Append-only Lab verdict log (one JSON object per line). */
export const LAB_VERDICT_LOG_REL = "lab/verdict-log.jsonl";

const VERDICTS: readonly LabVerdict[] = ["ship", "revert", "inconclusive"];

export type VerdictLogEventKind = "verdict_set" | "verdict_flip" | "stale_label_applied";

export interface VerdictLogEventBase {
  schema_version: number;
  event: VerdictLogEventKind;
  experiment_id: string;
  occurred_at: string;
}

export interface VerdictSetEvent extends VerdictLogEventBase {
  event: "verdict_set";
  verdict: LabVerdict;
}

export interface VerdictFlipEvent extends VerdictLogEventBase {
  event: "verdict_flip";
  from_verdict: LabVerdict;
  to_verdict: LabVerdict;
}

export interface StaleLabelAppliedEvent extends VerdictLogEventBase {
  event: "stale_label_applied";
  verdict: LabVerdict;
}

export type VerdictLogEvent = VerdictSetEvent | VerdictFlipEvent | StaleLabelAppliedEvent;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function isVerdict(value: unknown): value is LabVerdict {
  return typeof value === "string" && (VERDICTS as readonly string[]).includes(value);
}

function isIsoInstant(value: unknown): boolean {
  if (typeof value !== "string" || !value.trim()) return false;
  const t = Date.parse(value);
  return Number.isFinite(t);
}

export function parseVerdictLogLine(line: string, lineNumber: number): VerdictLogEvent | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  let raw: unknown;
  try {
    raw = JSON.parse(trimmed);
  } catch {
    throw new Error(`lab verdict log line ${lineNumber}: invalid JSON`);
  }
  if (!isRecord(raw)) {
    throw new Error(`lab verdict log line ${lineNumber}: expected object`);
  }
  if (raw.schema_version !== 1) {
    throw new Error(`lab verdict log line ${lineNumber}: schema_version must be 1`);
  }
  const experimentId = raw.experiment_id;
  if (typeof experimentId !== "string" || !/^EXP-\d{8}-/.test(experimentId.trim())) {
    throw new Error(`lab verdict log line ${lineNumber}: invalid experiment_id`);
  }
  if (!isIsoInstant(raw.occurred_at)) {
    throw new Error(`lab verdict log line ${lineNumber}: invalid occurred_at`);
  }
  const event = raw.event;
  if (event === "verdict_set") {
    if (!isVerdict(raw.verdict)) {
      throw new Error(`lab verdict log line ${lineNumber}: invalid verdict on verdict_set`);
    }
    return {
      schema_version: 1,
      event: "verdict_set",
      experiment_id: experimentId.trim(),
      occurred_at: String(raw.occurred_at),
      verdict: raw.verdict,
    };
  }
  if (event === "verdict_flip") {
    if (!isVerdict(raw.from_verdict) || !isVerdict(raw.to_verdict)) {
      throw new Error(`lab verdict log line ${lineNumber}: invalid from_verdict or to_verdict`);
    }
    if (raw.from_verdict === raw.to_verdict) {
      throw new Error(`lab verdict log line ${lineNumber}: verdict_flip requires different verdicts`);
    }
    return {
      schema_version: 1,
      event: "verdict_flip",
      experiment_id: experimentId.trim(),
      occurred_at: String(raw.occurred_at),
      from_verdict: raw.from_verdict,
      to_verdict: raw.to_verdict,
    };
  }
  if (event === "stale_label_applied") {
    if (!isVerdict(raw.verdict)) {
      throw new Error(`lab verdict log line ${lineNumber}: invalid verdict on stale_label_applied`);
    }
    return {
      schema_version: 1,
      event: "stale_label_applied",
      experiment_id: experimentId.trim(),
      occurred_at: String(raw.occurred_at),
      verdict: raw.verdict,
    };
  }
  throw new Error(`lab verdict log line ${lineNumber}: unsupported event ${String(event)}`);
}

export function readVerdictLogEvents(repoRoot: string, relPath = LAB_VERDICT_LOG_REL): VerdictLogEvent[] {
  const abs = path.join(repoRoot, relPath);
  if (!fs.existsSync(abs)) return [];
  const text = fs.readFileSync(abs, "utf8");
  const lines = text.split(/\r?\n/);
  const out: VerdictLogEvent[] = [];
  for (let i = 0; i < lines.length; i++) {
    const parsed = parseVerdictLogLine(lines[i]!, i + 1);
    if (parsed) out.push(parsed);
  }
  return out;
}

export function countQualifyingVerdictLogEvents(events: readonly VerdictLogEvent[]): number {
  return events.length;
}

const EVENT_SORT_RANK: Record<VerdictLogEventKind, number> = {
  verdict_set: 0,
  verdict_flip: 1,
  stale_label_applied: 2,
};

/** Stable newest-first ordering for RSS items. */
export function sortVerdictLogEventsForFeed(events: readonly VerdictLogEvent[]): VerdictLogEvent[] {
  return [...events].sort((a, b) => {
    const at = Date.parse(a.occurred_at);
    const bt = Date.parse(b.occurred_at);
    if (bt !== at) return bt - at;
    const idCmp = a.experiment_id.localeCompare(b.experiment_id);
    if (idCmp !== 0) return idCmp;
    return EVENT_SORT_RANK[a.event] - EVENT_SORT_RANK[b.event];
  });
}
