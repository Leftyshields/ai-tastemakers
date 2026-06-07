import { promises as fs } from "node:fs";
import path from "node:path";
import type { Digest } from "../types.js";

export async function writeDigestJson(dir: string, digest: Digest): Promise<string> {
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, "digest.json");
  await fs.writeFile(filePath, JSON.stringify(digest, null, 2) + "\n", "utf-8");
  return filePath;
}

export async function readDigestJson(filePath: string): Promise<Digest> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as Digest;
}
