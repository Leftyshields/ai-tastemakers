import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildLabPublicFile, buildTimelineModel } from "../../../scripts/lab/build-lab-public.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("UX32 timeline labels match experiments.json", () => {
  it("maps each Gantt row label to its experiment id", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const byId = new Map(pub.experiments.map((e) => [e.id, e]));
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    expect(model).toBeTruthy();
    for (const item of model!.items) {
      if (item.kind !== "experiment") continue;
      const exp = byId.get(item.id);
      expect(exp, `missing experiment for timeline id ${item.id}`).toBeTruthy();
      expect(item.label).toBe(exp!.label);
    }
  });

  it("caveman window row reads Shorter enrichment context", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    const caveman = model!.items.find(
      (i) => i.id === "EXP-20260913-caveman-compress-skills" && i.kind === "experiment",
    );
    expect(caveman).toBeTruthy();
    expect(caveman!.label).toBe("Shorter enrichment context");
    expect(caveman!.start).toBe("2026-10-25");
    expect(caveman!.end).toBe("2026-11-21");
  });

  it("keeps Nov 1 freeze band on the timeline model", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const model = buildTimelineModel(pub.experiments, ["running", "done", "planned"], "2026-10-19");
    expect(model!.freeze).toBeTruthy();
    expect(model!.freeze!.start).toBe("2026-11-01");
  });
});
