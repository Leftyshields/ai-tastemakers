import type { ToolInventory } from "./types.js";

const TOP_N = 25;

export function renderToolInventoryMarkdown(inventory: ToolInventory): string {
  const lines: string[] = [
    "# Tool inventory — digest-featured candidates",
    "",
    `_Generated ${inventory.generated_at} from ${inventory.scan_sources.length} briefing artifact(s)._`,
    "",
    "Repos surfaced repeatedly in daily, weekly, and monthly briefings, classified by capability and mapped to pipeline roles.",
    "",
    "## Top candidates by appearance",
    "",
    "| Repo | Appearances | Pipeline roles | Capability tags |",
    "|------|-------------|------------------|-----------------|",
  ];

  const top = inventory.entries.filter((e) => e.pipeline_roles.length > 0).slice(0, TOP_N);
  for (const entry of top) {
    const roles = entry.pipeline_roles.join(", ") || "—";
    const tags = entry.capability_tags.join(", ") || "—";
    lines.push(
      `| [${entry.full_name}](${entry.html_url}) | ${entry.appearance_count} | ${roles} | ${tags} |`,
    );
  }

  lines.push("", "## Role matrix", "");

  const roleGroups = new Map<string, typeof inventory.entries>();
  for (const entry of inventory.entries) {
    if (entry.pipeline_roles.length === 0) continue;
    for (const role of entry.pipeline_roles) {
      const list = roleGroups.get(role) ?? [];
      list.push(entry);
      roleGroups.set(role, list);
    }
  }

  for (const role of [...roleGroups.keys()].sort()) {
    const repos = roleGroups.get(role)!;
    repos.sort((a, b) => b.appearance_count - a.appearance_count);
    lines.push(`### ${role}`, "");
    for (const entry of repos.slice(0, 8)) {
      const rec = entry.recommendation ? ` _(${entry.recommendation})_` : "";
      lines.push(
        `- **${entry.full_name}** — ${entry.appearance_count} appearances (${entry.first_seen} → ${entry.last_seen})${rec}`,
      );
    }
    lines.push("");
  }

  lines.push(
    "## Operator notes",
    "",
    "Set `recommendation` and `notes` in `data/tool-inventory.json`; re-running `npm run inventory:tools` preserves manual fields.",
    "",
  );

  return lines.join("\n");
}
