import { describe, it, expect } from "vitest";
import {
  compareExperimentToPostHog,
  matchPostHogExperiment,
  type PostHogExperimentRow,
} from "../../../scripts/lab/sync-posthog-experiment-status.js";
import type { LabExperimentEntry } from "../../../scripts/lab/validate-experiments.js";

describe("PostHog experiment sync helpers", () => {
  const rows: PostHogExperimentRow[] = [
    {
      id: 1,
      name: "EXP-20260913-humanizer-polish-skills",
      feature_flag_key: "digest-humanizer",
      start_date: "2026-10-11T00:00:00Z",
      end_date: "2026-10-24T00:00:00Z",
      archived: false,
    },
  ];

  const entry: LabExperimentEntry = {
    id: "EXP-20260913-humanizer-polish-skills",
    surface: "narration_skills",
    metric: "m",
    start: "2026-10-11",
    end: "2026-10-24",
    min_read_days: 14,
    depends_on: [],
    status: "running",
    experiment_key: "EXP-20260913-humanizer-polish-skills",
    posthog_flag: "digest-humanizer",
  };

  it("matches by posthog_flag", () => {
    expect(matchPostHogExperiment(entry, rows)?.id).toBe(1);
  });

  it("reports date mismatches", () => {
    const mismatched = compareExperimentToPostHog(
      { ...entry, end: "2026-10-25" },
      rows[0],
    );
    expect(mismatched.some((d) => d.field === "end")).toBe(true);
  });
});
