function escapeScriptString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

/** Inline script for /go page: verify HMAC and safe external URL before redirect. */
export function outboundGoVerifyClientScript(signingKey: string): string {
  const safeKey = escapeScriptString(signingKey);
  return `
  var OUTBOUND_SIGNING_KEY = '${safeKey}';

  function base64UrlFromBytes(bytes) {
    var bin = "";
    bytes.forEach(function (b) { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/, "");
  }

  function isSafeExternalUrl(raw) {
    if (!raw) return false;
    try { raw = decodeURIComponent(String(raw).trim()); } catch (e) { return false; }
    var lower = String(raw).toLowerCase();
    if (lower.indexOf("javascript:") === 0 || lower.indexOf("data:") === 0 || lower.indexOf("vbscript:") === 0) return false;
    var u;
    try { u = new URL(raw); } catch (e) { return false; }
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    if (!u.hostname || u.username || u.password) return false;
    return true;
  }

  function verifyOutboundSig(dest, sig) {
    if (!OUTBOUND_SIGNING_KEY || !dest || !sig) return Promise.resolve(false);
    var enc = new TextEncoder();
    return crypto.subtle.importKey(
      "raw",
      enc.encode(OUTBOUND_SIGNING_KEY),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    ).then(function (key) {
      return crypto.subtle.sign("HMAC", key, enc.encode(dest));
    }).then(function (buf) {
      return base64UrlFromBytes(new Uint8Array(buf)) === sig;
    }).catch(function () { return false; });
  }
`;
}
