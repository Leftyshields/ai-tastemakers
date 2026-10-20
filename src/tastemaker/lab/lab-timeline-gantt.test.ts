import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  buildTimelineModel,
} from "../../../scripts/lab/build-lab-public.js";
import {
  measureAxisLabelGapPx,
  resolveFreezeAxisLabelPct,
} from "../../../scripts/lab/lab-dashboard-render.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("Lab Gantt timeline model (UX13 UX14 UX20)", () => {
  it("uses one row per experiment with surface chips metadata", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    expect(model).toBeTruthy();
    const humanizer = model!.items.find((i) => i.id === "EXP-20260913-humanizer-polish-skills");
    expect(humanizer?.surfaces).toContain("narration_oss");
    expect(humanizer?.surfaces).toContain("narration_skills");
    expect(humanizer?.kind).toBe("experiment");
  });

  it("orders running, recent done, planned, then collapsed history row", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    expect(model!.items[0]?.status).toBe("running");
    const collapsedIdx = model!.items.findIndex((i) => i.kind === "collapsed");
    const plannedIdx = model!.items.findIndex((i) => i.status === "planned");
    const doneInWindowIdx = model!.items.findIndex(
      (i) => i.kind === "experiment" && i.status === "done" && !i.hidden_until_show_all,
    );
    if (doneInWindowIdx >= 0 && plannedIdx >= 0) {
      expect(doneInWindowIdx).toBeLessThan(plannedIdx);
    }
    if (model!.collapsed_count > 0) {
      expect(collapsedIdx).toBeGreaterThan(plannedIdx);
      const collapsed = model!.items[collapsedIdx];
      expect(collapsed?.label).toMatch(/earlier tests, see History/);
    }
  });

  it("default window starts one month before as of date", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    expect(model!.range_start).toBe("2026-09-19");
  });

  it("Freeze axis label sits at least 8px right of Nov month tick", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    expect(model?.freeze).toBeTruthy();
    const nov = model!.month_ticks.find((t) => t.label === "Nov");
    expect(nov).toBeTruthy();
    const rawCenter = model!.freeze!.offset_pct + model!.freeze!.width_pct / 2;
    const resolved = resolveFreezeAxisLabelPct(model!.freeze!, model!.month_ticks);
    expect(resolved).toBeGreaterThanOrEqual(rawCenter - 0.01);
    const gap = measureAxisLabelGapPx(resolved, "Freeze", 0.6, nov!, 0.65);
    expect(gap).toBeGreaterThanOrEqual(8);
  });
});
