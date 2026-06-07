import type { VercelRequest, VercelResponse } from "@vercel/node";

const REPO = process.env.GITHUB_REPO || "Leftyshields/ai-tastemakers";
const FILE_PATH = "data/subscribers.json";

function allowedOrigins(): string[] {
  const raw =
    process.env.ALLOWED_ORIGINS ||
    "https://leftyshields.github.io,http://localhost:8788";
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function corsHeaders(origin: string | undefined): Record<string, string> {
  const allowed = allowedOrigins();
  const match =
    origin && allowed.some((entry) => entry === origin || entry === "*")
      ? origin
      : allowed[0];
  return {
    "Access-Control-Allow-Origin": match,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

async function readSubscribers(
  token: string,
): Promise<{ emails: string[]; sha?: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (res.status === 404) {
    return { emails: [] };
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub read failed (${res.status}): ${body}`);
  }

  const file = (await res.json()) as { content?: string; sha?: string };
  const decoded = Buffer.from(file.content || "", "base64").toString("utf8");
  const parsed: unknown = JSON.parse(decoded);
  const emails = Array.isArray(parsed)
    ? parsed.filter((entry): entry is string => typeof entry === "string").map(normalizeEmail)
    : [];
  return { emails, sha: file.sha };
}

async function writeSubscribers(
  token: string,
  emails: string[],
  sha: string | undefined,
): Promise<void> {
  const content = `${JSON.stringify(emails, null, 2)}\n`;
  const body: Record<string, string> = {
    message: `chore: add digest subscriber (${emails.length} total)`,
    content: Buffer.from(content).toString("base64"),
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${text}`);
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const headers = corsHeaders(req.headers.origin);

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", headers["Access-Control-Allow-Origin"]);
    res.setHeader("Access-Control-Allow-Methods", headers["Access-Control-Allow-Methods"]);
    res.setHeader("Access-Control-Allow-Headers", headers["Access-Control-Allow-Headers"]);
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Access-Control-Allow-Origin", headers["Access-Control-Allow-Origin"]);
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.GITHUB_TOKEN?.trim();
  if (!token) {
    res.setHeader("Access-Control-Allow-Origin", headers["Access-Control-Allow-Origin"]);
    res.status(500).json({ error: "Subscribe API is not configured" });
    return;
  }

  const email = normalizeEmail(String(req.body?.email || ""));
  if (!isValidEmail(email)) {
    res.setHeader("Access-Control-Allow-Origin", headers["Access-Control-Allow-Origin"]);
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  try {
    const { emails, sha } = await readSubscribers(token);
    if (emails.includes(email)) {
      res.setHeader("Access-Control-Allow-Origin", headers["Access-Control-Allow-Origin"]);
      res.status(200).json({ ok: true, message: "Already subscribed" });
      return;
    }

    await writeSubscribers(token, [...emails, email], sha);
    res.setHeader("Access-Control-Allow-Origin", headers["Access-Control-Allow-Origin"]);
    res.status(200).json({ ok: true, message: "Subscribed" });
  } catch (err) {
    console.error(err);
    res.setHeader("Access-Control-Allow-Origin", headers["Access-Control-Allow-Origin"]);
    res.status(500).json({ error: "Could not save subscription" });
  }
}
