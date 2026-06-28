import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { aggregateObservations } from "./merge.js";
import { collectBriefingFiles, scanBriefings } from "./scan.js";

const tempDirs: string[] = [];

afterEach(async () => {
  for (const dir of tempDirs) {
    await fs.rm(dir, { recursive: true, force: true });
  }
  tempDirs.length = 0;
});

async function makeTempBriefings(): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "inventory-test-"));
  tempDirs.push(dir);
  const briefings = path.join(dir, "briefings");
  await fs.mkdir(path.join(briefings, "2026-06-01"), { recursive: true });
  await fs.mkdir(path.join(briefings, "2026-06-02"), { recursive: true });
  await fs.writeFile(
    path.join(briefings, "2026-06-01", "digest.json"),
    JSON.stringify({
      repos: [
        {
          full_name: "acme/alpha",
          html_url: "https://github.com/acme/alpha",
          topics: ["mcp"],
          brief: "An MCP server for agents.",
        },
      ],
    }),
    "utf8",
  );
  await fs.writeFile(
    path.join(briefings, "2026-06-02", "digest.json"),
    JSON.stringify({
      repos: [
        {
          full_name: "acme/alpha",
          html_url: "https://github.com/acme/alpha",
          topics: ["mcp", "llm"],
          brief: "Still an MCP server.",
        },
        {
          full_name: "acme/beta",
          html_url: "https://github.com/acme/beta",
          topics: ["web-search"],
          brief: "Web search for agents.",
        },
      ],
    }),
    "utf8",
  );
  return briefings;
}

describe("scanBriefings", () => {
  it("collects digest files and counts appearances", async () => {
    const briefingsDir = await makeTempBriefings();
    const files = await collectBriefingFiles(briefingsDir);
    expect(files).toEqual(["2026-06-01/digest.json", "2026-06-02/digest.json"]);

    const { observations } = await scanBriefings(briefingsDir);
    const byRepo = aggregateObservations(observations);
    expect(byRepo.get("acme/alpha")).toHaveLength(2);
    expect(byRepo.get("acme/beta")).toHaveLength(1);
  });
});
