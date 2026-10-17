import type { EditionId } from "../editions.js";

export type RepoClickChannel = "pages" | "email";
export type RepoClickTarget = "title" | "button" | "url" | "card";
export type RepoClickSource = "email" | "direct";

export interface RepoClickProperties {
  repo: string;
  section: EditionId;
  channel: RepoClickChannel;
  position: number;
  target: RepoClickTarget;
  digest_date: string;
  source: RepoClickSource;
}

/** ISO date `2026-06-06` → compact `20260606` for UTM and `d` params. */
export function digestDateCompact(isoDate: string): string {
  return isoDate.replace(/-/g, "");
}

/** Compact `20260606` → ISO `2026-06-06`. */
export function digestDateFromCompact(compact: string): string | null {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(compact.trim());
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

export function pagesRepoClickSource(pageSearch: string): RepoClickSource {
  try {
    const params = new URLSearchParams(pageSearch.startsWith("?") ? pageSearch : `?${pageSearch}`);
    return params.get("utm_source") === "email" ? "email" : "direct";
  } catch {
    return "direct";
  }
}

export interface GoRedirectQuery {
  repo: string;
  section: EditionId;
  pos: number;
  target: RepoClickTarget;
  d: string;
}

const REPO_PARAM_RE = /^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/;

export function normalizeRepoParam(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  let decoded = raw.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return null;
  }
  if (!REPO_PARAM_RE.test(decoded)) return null;
  if (decoded.includes(":") || decoded.includes("\\") || decoded.includes("//")) return null;
  return decoded;
}

/** Returns canonical GitHub URL or null when not allowlisted. */
export function resolveAllowlistedGithubUrl(
  repoParam: string | null | undefined,
  allowlist: Record<string, string>,
): string | null {
  const repo = normalizeRepoParam(repoParam);
  if (!repo) return null;
  const canonical = `https://github.com/${repo}`;
  const listed = allowlist[repo];
  if (!listed || listed !== canonical) return null;
  return canonical;
}

export function parseGoRedirectQuery(search: string): Partial<GoRedirectQuery> {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const sectionRaw = params.get("section");
  const section: EditionId | undefined =
    sectionRaw === "oss" || sectionRaw === "skills" ? sectionRaw : undefined;
  const posRaw = params.get("pos");
  const pos = posRaw ? Number.parseInt(posRaw, 10) : Number.NaN;
  const targetRaw = params.get("target");
  const target: RepoClickTarget | undefined =
    targetRaw === "title" ||
    targetRaw === "button" ||
    targetRaw === "url" ||
    targetRaw === "card"
      ? targetRaw
      : undefined;
  const repo = normalizeRepoParam(params.get("repo")) ?? undefined;
  const d = params.get("d")?.trim() || undefined;
  return { repo, section, pos: Number.isFinite(pos) ? pos : undefined, target, d };
}

export function buildEmailGoUrl(
  siteBaseUrl: string,
  query: {
    repo: string;
    section: EditionId;
    position: number;
    target: RepoClickTarget;
    digestDate: string;
  },
): string {
  const base = siteBaseUrl.replace(/\/+$/, "");
  const d = digestDateCompact(query.digestDate);
  const params = new URLSearchParams({
    repo: query.repo,
    section: query.section,
    pos: String(query.position),
    target: query.target,
    d,
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: `digest_${d}`,
  });
  return `${base}/go/?${params.toString()}`;
}

export function buildFullDigestPagesUrl(
  siteBaseUrl: string,
  digestDate: string,
  section: EditionId,
): string {
  const base = siteBaseUrl.replace(/\/+$/, "");
  const d = digestDateCompact(digestDate);
  const prefix = section === "skills" ? "/skills" : "";
  const params = new URLSearchParams({
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: `digest_${d}`,
  });
  return `${base}${prefix}/briefings/${digestDate}.html?${params.toString()}`;
}

/** Ensures PostHog repo_click fires at most once per page load. */
export class GoRedirectCaptureGate {
  private captured = false;

  tryCapture(run: () => void): boolean {
    if (this.captured) return false;
    this.captured = true;
    run();
    return true;
  }

  get hasCaptured(): boolean {
    return this.captured;
  }
}
