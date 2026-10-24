import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildLabPublicFile } from "../../../scripts/lab/build-lab-public.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("buildLabPublicFile", () => {
  it("includes all planned experiments in backlog with full details", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    expect(pub.backlog.some((b) => b.id === "EXP-20260913-rank-bootstrap-skills")).toBe(true);
    const rank = pub.backlog.find((b) => b.id === "EXP-20260913-rank-bootstrap-skills");
    expect(rank?.metric).toBeTruthy();
    expect(rank?.depends_on.length).toBeGreaterThan(0);
  });

  it("mirrors full experiments array in public payload", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    expect(pub.experiments.length).toBe(10);
    expect(pub.experiments.some((e) => e.status === "planned")).toBe(true);
  });

  it("includes last result when no experiment is running", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    expect(pub.control_panel.running).toBeNull();
    expect(pub.control_panel.summary.last_result?.id).toBe("EXP-20260913-humanizer-polish-skills");
    expect(pub.control_panel.summary.last_result?.verdict).toBe("ship");
  });
});
