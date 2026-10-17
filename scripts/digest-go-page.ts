import {
  digestDateFromCompact,
  parseGoRedirectQuery,
  resolveAllowlistedGithubUrl,
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

  function captureOnce(props) {
    if (captured) return;
    captured = true;
    if (typeof posthog !== "undefined" && posthog.capture) {
      try {
        posthog.capture("repo_click", props, { transport: "sendBeacon", send_instantly: true });
      } catch (e) {}
    }
  }

  function forward(url) {
    window.location.replace(url);
  }

  var params = new URLSearchParams(window.location.search);
  var parsed = {
    repo: params.get("repo"),
    section: params.get("section"),
    pos: params.get("pos"),
    target: params.get("target"),
    d: params.get("d")
  };

  var repo = parsed.repo;
  var section = parsed.section === "skills" ? "skills" : parsed.section === "oss" ? "oss" : "";
  var pos = parsed.pos ? parseInt(parsed.pos, 10) : NaN;
  var target = parsed.target || "url";
  var digestCompact = parsed.d || "";
  var digestDate = digestCompact.length === 8
    ? digestCompact.slice(0, 4) + "-" + digestCompact.slice(4, 6) + "-" + digestCompact.slice(6, 8)
    : digestCompact;

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

  var destination = resolveUrl() || (window.location.origin + HOME);
  var continueLink = document.getElementById("continue-link");
  if (continueLink) continueLink.href = destination;

  var githubTarget = resolveUrl();
  if (githubTarget && section && Number.isFinite(pos)) {
    captureOnce({
      repo: normalizeRepo(repo),
      section: section,
      channel: "email",
      position: pos,
      target: target,
      digest_date: digestDate,
      source: "email"
    });
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
