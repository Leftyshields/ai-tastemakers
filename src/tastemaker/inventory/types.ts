export interface ToolInventoryEntry {
  full_name: string;
  html_url: string;
  topics: string[];
  capability_tags: string[];
  pipeline_roles: string[];
  appearance_count: number;
  first_seen: string;
  last_seen: string;
  recommendation?: string;
  notes?: string;
}

export interface ToolInventory {
  schema_version: 1;
  generated_at: string;
  scan_sources: string[];
  entries: ToolInventoryEntry[];
}

export interface ScanObservation {
  full_name: string;
  html_url: string;
  topics: string[];
  brief: string | null;
  date: string;
  source: string;
}
