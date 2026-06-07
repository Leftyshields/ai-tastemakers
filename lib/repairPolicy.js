/**
 * Parse repair policy content (e.g. from .genome/repair_policy.md).
 * Returns { maxRetries: number, delayMs: number }. Missing or invalid keys default to 0.
 *
 * @param {string} content - Raw file content (key: value lines, e.g. max_retries: 2, delay_ms: 0).
 * @returns {{ maxRetries: number, delayMs: number }}
 */
function parseRepairPolicy(content) {
  let maxRetries = 0;
  let delayMs = 0;
  if (typeof content !== 'string') {
    return { maxRetries, delayMs };
  }
  const maxRetriesMatch = content.match(/max_retries\s*:\s*(\d+)/);
  const delayMsMatch = content.match(/delay_ms\s*:\s*(\d+)/);
  if (maxRetriesMatch) {
    const n = parseInt(maxRetriesMatch[1], 10);
    if (Number.isFinite(n) && n >= 0) maxRetries = n;
  }
  if (delayMsMatch) {
    const n = parseInt(delayMsMatch[1], 10);
    if (Number.isFinite(n) && n >= 0) delayMs = n;
  }
  return { maxRetries, delayMs };
}

module.exports = {
  parseRepairPolicy,
};
