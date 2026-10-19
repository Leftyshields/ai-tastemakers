import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { listArchivedExperimentIds, listExperimentIds } from "../experiments/load.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const planPath = path.join(repoRoot, "lab", "experiments.jantt.json");

interface JanttTaskRow {
  id: string;
  label?: string;
  category: string;
  start: string;
  end: string;
  dependsOn?: string | string[] | null;
  status?: string;
  phase?: string;
  fields?: Record<string, unknown>;
}

describe("lab/experiments.jantt.json", () => {
  const raw = fs.readFileSync(planPath, "utf8");
  const plan = JSON.parse(raw) as { tasks: JanttTaskRow[] };
  const tasks = plan.tasks;

  it("covers every active and archived experiment registry id", async () => {
    const registryIds = [...(await listExperimentIds(repoRoot)), ...(await listArchivedExperimentIds(repoRoot))].sort();
    const covered = new Set(
      tasks.map((t) => t.fields?.experiment_id).filter((id): id is string => typeof id === "string"),
    );
    covered.delete("POLICY-DIGEST-UI-FREEZE");
    for (const id of registryIds) {
      expect(covered.has(id), `missing calendar tasks for ${id}`).toBe(true);
    }
  });

  it("uses allowed status values and ISO date windows", () => {
    const allowed = new Set(["done", "running", "planned"]);
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    for (const task of tasks) {
      expect(task.id.length).toBeGreaterThan(0);
      expect(task.category.length).toBeGreaterThan(0);
      expect(iso.test(task.start)).toBe(true);
      expect(iso.test(task.end)).toBe(true);
      if (task.status) {
        expect(allowed.has(task.status)).toBe(true);
      }
    }
  });

  it("resolves dependsOn links to existing task ids", () => {
    const ids = new Set(tasks.map((t) => t.id));
    for (const task of tasks) {
      const deps = task.dependsOn;
      if (!deps) continue;
      const list = Array.isArray(deps) ? deps : [deps];
      for (const dep of list) {
        expect(ids.has(dep), `${task.id} depends on missing ${dep}`).toBe(true);
      }
    }
  });
});
