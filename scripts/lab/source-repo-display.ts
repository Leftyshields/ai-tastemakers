import fs from "node:fs";
import path from "node:path";

interface ToolInventoryEntry {
  full_name: string;
  html_url: string;
}

interface ToolInventoryFile {
  entries: ToolInventoryEntry[];
}

function loadInventory(repoRoot: string): ToolInventoryFile | null {
  const invPath = path.join(repoRoot, "data", "tool-inventory.json");
  if (!fs.existsSync(invPath)) return null;
  return JSON.parse(fs.readFileSync(invPath, "utf8")) as ToolInventoryFile;
}

function inventoryToolForSourceRepo(
  sourceRepo: string,
  inventory: ToolInventoryFile,
): ToolInventoryEntry | undefined {
  const needle = sourceRepo.trim().toLowerCase();
  return inventory.entries.find((e) => e.full_name.toLowerCase() === needle);
}

/** Display owner/repo casing from tool inventory (same source as digest learned links). */
export function displayFullNameForSourceRepo(
  sourceRepo: string,
  repoRoot: string,
): string | null {
  const inventory = loadInventory(repoRoot);
  if (!inventory) return null;
  return inventoryToolForSourceRepo(sourceRepo, inventory)?.full_name ?? null;
}

export function resolveSourceRepoGithubLink(
  sourceRepo: string,
  repoRoot: string,
): { displayFullName: string; githubUrl: string } {
  const key = sourceRepo.trim();
  const inventory = loadInventory(repoRoot);
  const tool = inventory ? inventoryToolForSourceRepo(key, inventory) : undefined;
  const displayFullName = tool?.full_name ?? key;
  const githubUrl = tool?.html_url ?? `https://github.com/${key}`;
  return { displayFullName, githubUrl };
}
