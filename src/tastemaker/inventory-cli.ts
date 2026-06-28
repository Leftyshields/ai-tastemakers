#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { findRepoRoot } from "./config.js";
import { mergeInventory } from "./inventory/merge.js";
import { renderToolInventoryMarkdown } from "./inventory/markdown.js";
import { scanBriefings } from "./inventory/scan.js";
import type { ToolInventory } from "./inventory/types.js";

async function loadPriorInventory(inventoryPath: string): Promise<ToolInventory | null> {
  try {
    const raw = await fs.readFile(inventoryPath, "utf8");
    return JSON.parse(raw) as ToolInventory;
  } catch {
    return null;
  }
}

export async function runInventoryScan(rootDir: string): Promise<{
  inventoryPath: string;
  markdownPath: string;
  entryCount: number;
  withRoles: number;
}> {
  const briefingsDir = path.join(rootDir, "briefings");
  const inventoryPath = path.join(rootDir, "data", "tool-inventory.json");
  const labDir = path.join(briefingsDir, "lab");
  const markdownPath = path.join(labDir, "tool-inventory.md");

  const { observations, sources } = await scanBriefings(briefingsDir);
  const prior = await loadPriorInventory(inventoryPath);
  const generatedAt = new Date().toISOString();
  const inventory = mergeInventory(observations, prior, sources, generatedAt);

  await fs.mkdir(path.dirname(inventoryPath), { recursive: true });
  await fs.mkdir(labDir, { recursive: true });
  await fs.writeFile(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`, "utf8");
  await fs.writeFile(markdownPath, renderToolInventoryMarkdown(inventory), "utf8");

  const withRoles = inventory.entries.filter((e) => e.pipeline_roles.length > 0).length;

  return {
    inventoryPath,
    markdownPath,
    entryCount: inventory.entries.length,
    withRoles,
  };
}

async function main(): Promise<void> {
  try {
    const rootDir = findRepoRoot();
    const result = await runInventoryScan(rootDir);
    console.log("Tool inventory written:");
    console.log(`  ${result.inventoryPath}`);
    console.log(`  ${result.markdownPath}`);
    console.log(`  ${result.entryCount} repos (${result.withRoles} with pipeline roles)`);
  } catch (err) {
    console.error("Inventory scan failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
