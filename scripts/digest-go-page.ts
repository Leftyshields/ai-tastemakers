import {
  digestDateFromCompact,
  labBadgeDestGoInlineRegexSources,
  parseGoRedirectQuery,
  resolveAllowlistedGithubUrl,
  resolveAllowlistedLabBadgeDestPath,
  type RepoClickProperties,
} from "../src/tastemaker/analytics/repo-click.js";
import { escapeScriptString, posthogScriptHtml } from "./edition-pages.js";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderGoRedirectPage(
  allowlist: Record<string, string>,
  homePath = "/",
): string {
  const allowlistJson = JSON.stringify(allowlist);
  const posthog = posthogScriptHtml();
  const safeAllowlist = escapeScriptString(allowlistJson);
  const safeHome = escapeScriptString(homePath.startsWith("/") ? homePath : `/${homePath}`);
  const labDestRe = labBadgeDestGoInlineRegexSources();
  const safePostPathRe = escapeScriptString(labDestRe.postPath);
  const safeIndexPathRe = escapeScriptString(labDestRe.indexPath);
  const safeIndexHashRe = escapeScriptString(labDestRe.indexHash);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Continue to GitHub</title>
  ${posthog}
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; background: #fafaf9; color: #1c1917; }
    main { max-width: 28rem; margin: 0 auto; text-align: center; }
    a { color: #1e40af; font-weight: 600; }
    a:focus-visible { outline: 2px solid #1e40af; outline-offset: 3px; }
  </style>
</head>
<body>
  <main>
    <p>Opening GitHub</p>
    <p><a id="continue-link" href="${escapeHtml(homePath)}">Continue to GitHub</a></p>
  </main>
  <noscript>
    <meta http-equiv="refresh" content="0;url=${escapeHtml(homePath)}">
  </noscript>
  <script>
(function () {
  var ALLOWLIST = JSON.parse('${safeAllowlist}');
  var HOME = '${safeHome}';
  var captured = false;

  function captureOnce(event, props) {
    if (captured) return;
    captured = true;
    if (typeof posthog !== "undefined" && posthog.capture) {
      try {
        posthog.capture(event, props, { transport: "sendBeacon", send_instantly: true });
      } catch (e) {}
    }
  }

  function forward(url) {
    window.location.replace(url);
  }

  var params = new URLSearchParams(window.location.search);
  var eventName = params.get("event") || "";
  var parsed = {
    repo: params.get("repo"),
    section: params.get("section"),
    pos: params.get("pos"),
    rank: params.get("rank"),
    target: params.get("target"),
    d: params.get("d"),
    exp: params.get("exp"),
    status: params.get("status"),
    dest: params.get("dest"),
    channel: params.get("channel")
  };

  var repo = parsed.repo;
  var section = parsed.section === "skills" ? "skills" : parsed.section === "oss" ? "oss" : "";
  var pos = parsed.pos ? parseInt(parsed.pos, 10) : NaN;
  var rank = parsed.rank ? parseInt(parsed.rank, 10) : NaN;
  var target = parsed.target || "url";
  var digestCompact = parsed.d || "";
  var digestDate = digestCompact.length === 8
    ? digestCompact.slice(0, 4) + "-" + digestCompact.slice(4, 6) + "-" + digestCompact.slice(6, 8)
    : digestCompact;
  var labDest = parsed.dest || "";

  function normalizeRepo(raw) {
    if (!raw) return "";
    try { raw = decodeURIComponent(String(raw).trim()); } catch (e) { return ""; }
    if (!/^[A-Za-z0-9._-]+\\/[A-Za-z0-9._-]+$/.test(raw)) return "";
    if (raw.indexOf(":") >= 0) return "";
    return raw;
  }

  function resolveUrl() {
    var key = normalizeRepo(repo);
    if (!key) return null;
    var canonical = "https://github.com/" + key;
    var listed = ALLOWLIST[key];
    if (!listed || listed !== canonical) return null;
    return canonical;
  }

  var LAB_DEST_POST_RE = new RegExp('${safePostPathRe}', 'i');
  var LAB_DEST_INDEX_PATH_RE = new RegExp('${safeIndexPathRe}', 'i');
  var LAB_DEST_INDEX_HASH_RE = new RegExp('${safeIndexHashRe}', 'i');

  function parseFromList(raw) {
    if (!raw) return null;
    var v = String(raw).trim().toLowerCase();
    return v === "oss" || v === "skills" ? v : null;
  }
  function parseFromRank(raw) {
    if (raw == null) return null;
    var n = parseInt(String(raw).trim(), 10);
    return Number.isFinite(n) && n >= 1 && n <= 10 ? n : null;
  }
  function attributionQueryOk(search) {
    if (!search) return true;
    if (!search.startsWith("?")) return false;
    var params = new URLSearchParams(search.slice(1));
    var keys = Array.from(params.keys());
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] !== "from_list" && keys[i] !== "from_rank") return false;
    }
    var list = params.has("from_list") ? parseFromList(params.get("from_list")) : null;
    var rank = params.has("from_rank") ? parseFromRank(params.get("from_rank")) : null;
    if (params.has("from_list") && !list) return false;
    if (params.has("from_rank") && rank == null) return false;
    if (list && rank == null) return false;
    if (!list && rank != null) return false;
    return true;
  }
  function isAllowlistedLabDest(raw) {
    if (!raw) return null;
    try { raw = decodeURIComponent(String(raw).trim()); } catch (e) { return null; }
    if (!raw.startsWith("/") || raw.indexOf("://") >= 0 || raw.indexOf("..") >= 0) return null;
    var hashIdx = raw.indexOf("#");
    var beforeHash = hashIdx >= 0 ? raw.slice(0, hashIdx) : raw;
    var hash = hashIdx >= 0 ? raw.slice(hashIdx) : "";
    var qIdx = beforeHash.indexOf("?");
    var pathPart = qIdx >= 0 ? beforeHash.slice(0, qIdx) : beforeHash;
    var search = qIdx >= 0 ? beforeHash.slice(qIdx) : "";
    if (!attributionQueryOk(search)) return null;
    var postOk = LAB_DEST_POST_RE.test(pathPart);
    var indexOk = LAB_DEST_INDEX_PATH_RE.test(pathPart) && LAB_DEST_INDEX_HASH_RE.test(hash);
    return (postOk || indexOk) ? encodeURIComponent(raw) : null;
  }

  var destination = resolveUrl() || (window.location.origin + HOME);
  if (eventName === "lab_badge_click" && labDest) {
    var safeLabDest = isAllowlistedLabDest(labDest);
    if (safeLabDest) destination = window.location.origin + decodeURIComponent(safeLabDest);
  }
  var continueLink = document.getElementById("continue-link");
  if (continueLink) continueLink.href = destination;

  if (eventName === "lab_badge_click" && section && Number.isFinite(rank) && parsed.exp) {
    var normalizedRepo = normalizeRepo(repo) || "";
    captureOnce("lab_badge_click", {
      experiment_id: parsed.exp,
      exp_id: parsed.exp,
      repo: normalizedRepo || repo || "",
      source_repo: normalizedRepo,
      status: parsed.status || "",
      list: section,
      rank: rank,
      surface: "email",
      channel: parsed.channel || "email"
    });
  } else {
    var githubTarget = resolveUrl();
    if (githubTarget && section && Number.isFinite(pos)) {
      captureOnce("repo_click", {
        repo: normalizeRepo(repo),
        section: section,
        channel: "email",
        position: pos,
        target: target,
        digest_date: digestDate,
        source: "email"
      });
    }
  }

  var done = false;
  function go() {
    if (done) return;
    done = true;
    forward(destination);
  }

  setTimeout(go, 300);
})();
  </script>
</body>
</html>`;
}

/** Test helper mirroring inline redirect resolution. */
export function resolveGoPageDestination(
  search: string,
  allowlist: Record<string, string>,
  homeUrl: string,
): string {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const event = params.get("event") || "";
  const dest = params.get("dest");
  if (event === "lab_badge_click" && dest) {
    const allowed = resolveAllowlistedLabBadgeDestPath(dest);
    if (allowed) {
      try {
        const home = new URL(homeUrl);
        return `${home.origin}${decodeURIComponent(allowed)}`;
      } catch {
        return homeUrl;
      }
    }
  }
  const parsed = parseGoRedirectQuery(search);
  const github = resolveAllowlistedGithubUrl(parsed.repo ?? null, allowlist);
  return github ?? homeUrl;
}

export function buildRepoClickFromGoQuery(search: string): RepoClickProperties | null {
  const parsed = parseGoRedirectQuery(search);
  if (!parsed.repo || !parsed.section || parsed.pos == null || !parsed.target || !parsed.d) {
    return null;
  }
  const digest_date = digestDateFromCompact(parsed.d) ?? parsed.d;
  return {
    repo: parsed.repo,
    section: parsed.section,
    channel: "email",
    position: parsed.pos,
    target: parsed.target,
    digest_date,
    source: "email",
  };
}
