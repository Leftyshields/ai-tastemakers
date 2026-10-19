import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  isPublished,
  visibilityOf,
} from "../../../scripts/lab/build-lab-public.js";
import { loadExperimentsFile } from "../../../scripts/lab/validate-experiments.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("buildLabPublicFile", () => {
  it("omits private planned entries from backlog", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    expect(pub.backlog.some((b) => b.id === "EXP-20260913-rank-bootstrap-skills")).toBe(false);
    expect(pub.backlog.some((b) => b.id === "EXP-20260913-caveman-compress-skills")).toBe(true);
  });

  it("redacts teaser backlog rows", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const whynow = pub.backlog.find((b) => b.id === "EXP-20260913-whynow-memory-skills");
    expect(whynow?.visibility).toBe("teaser");
    expect(whynow && "metric" in whynow).toBe(false);
  });

  it("includes running control panel", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    expect(pub.control_panel.running?.id).toBe("EXP-20260913-humanizer-polish-skills");
    expect(pub.control_panel.running?.day_of_min_read).toBe(9);
  });

  it("defaults visibility to teaser in source", () => {
    const file = loadExperimentsFile(repoRoot);
    const rank = file.experiments.find((e) => e.id === "EXP-20260913-rank-bootstrap-skills");
    expect(rank && visibilityOf(rank as Parameters<typeof visibilityOf>[0])).toBe("private");
    expect(file.experiments.every((e) => isPublished(e as Parameters<typeof isPublished>[0]) || visibilityOf(e as Parameters<typeof visibilityOf>[0]) === "private")).toBe(true);
  });
});

describe("experiments.public.json on disk after build", () => {
  it("is schema v2 when present", () => {
    const p = path.join(repoRoot, "site", "lab", "experiments.public.json");
    if (!fs.existsSync(p)) return;
    const pub = JSON.parse(fs.readFileSync(p, "utf8")) as { schema_version: number };
    expect(pub.schema_version).toBe(2);
  });
});
