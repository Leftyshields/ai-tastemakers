/**
 * Guardrails (story 11): check run requests against genome-derived policy, audit violations.
 * checkGuardrails(genome, request) returns { allowed, reason? }; auditViolation(entry) appends to .logs/guardrails.log.
 * No Defense node in the graph; lib flow only.
 */

const path = require('path');
const fs = require('fs');

const DEFAULT_ALLOWED_PREFIXES = ['.genome/'];
const PATH_ALLOWLIST_CONSTRAINT_ID = 'path_allowlist';

/**
 * Parse optional guardrails policy content. Used by loadGenome or callers.
 *
 * @param {string} content - Raw content of .genome/guardrails.md
 * @returns {{ allowedPathPrefix: string[] }} - Allowed path prefixes under repo root (e.g. ['.genome/', '.molecules/'])
 */
function parseGuardrailsPolicy(content) {
  if (typeof content !== 'string' || content.trim() === '') {
    return { allowedPathPrefix: [...DEFAULT_ALLOWED_PREFIXES] };
  }
  const line = content.split('\n').find((l) => l.includes('allowed_path_prefix:'));
  if (!line) {
    return { allowedPathPrefix: [...DEFAULT_ALLOWED_PREFIXES] };
  }
  const match = line.match(/allowed_path_prefix:\s*(.+)/);
  if (!match) {
    return { allowedPathPrefix: [...DEFAULT_ALLOWED_PREFIXES] };
  }
  const prefixes = match[1]
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return { allowedPathPrefix: prefixes.length > 0 ? prefixes : [...DEFAULT_ALLOWED_PREFIXES] };
}

/**
 * Get allowed path prefixes from genome. Uses genome.guardrails (from loader) or default.
 *
 * @param {object} genome - Loaded genome (may have genome.guardrails from optional guardrails.md)
 * @returns {string[]}
 */
function getAllowedPrefixes(genome) {
  if (genome && genome.guardrails && Array.isArray(genome.guardrails.allowedPathPrefix)) {
    return genome.guardrails.allowedPathPrefix;
  }
  return [...DEFAULT_ALLOWED_PREFIXES];
}

/**
 * Check run request against guardrails. v1: path allowlist only.
 *
 * @param {object} genome - Loaded genome (from loadGenome)
 * @param {{ path?: string, genomeDir?: string, repoRoot?: string }} request - runPath options
 * @returns {{ allowed: boolean, reason?: string, constraintId?: string }}
 */
function checkGuardrails(genome, request) {
  const repoRoot = request.repoRoot ?? process.cwd();
  const repoRootAbs = path.resolve(repoRoot);
  const rawPath = request.path ?? '.genome/mission.md';
  const absolutePath = path.resolve(repoRootAbs, rawPath);

  // Path must be under repo root (no traversal outside)
  const relativePath = path.relative(repoRootAbs, absolutePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return { allowed: false, reason: 'path outside repo', constraintId: PATH_ALLOWLIST_CONSTRAINT_ID };
  }

  const prefixes = getAllowedPrefixes(genome);
  for (const prefix of prefixes) {
    const fullPrefix = path.resolve(repoRootAbs, prefix);
    if (absolutePath === fullPrefix || absolutePath.startsWith(fullPrefix + path.sep)) {
      return { allowed: true };
    }
  }

  return {
    allowed: false,
    reason: 'path not under allowed prefix',
    constraintId: PATH_ALLOWLIST_CONSTRAINT_ID,
  };
}

/**
 * Append one violation line to .logs/guardrails.log. Creates .logs/ if needed.
 * On write failure, logs to stderr and does not throw.
 *
 * @param {{ constraintId: string, requestSummary: string, reason: string, timestamp?: string }} entry
 * @param {{ repoRoot?: string }} [options] - Optional. repoRoot for .logs path; default process.cwd()
 */
function auditViolation(entry, options) {
  const repoRoot = options?.repoRoot ?? process.cwd();
  const logsDir = path.join(repoRoot, '.logs');
  const guardrailsPath = path.join(logsDir, 'guardrails.log');
  const constraintId = (entry.constraintId || 'unknown').replace(/\s/g, ' ');
  const requestSummary = (entry.requestSummary != null ? String(entry.requestSummary) : '').replace(/[\r\n]/g, ' ');
  const reason = (entry.reason != null ? String(entry.reason) : '').replace(/[\r\n]/g, ' ');
  const ts = entry.timestamp || new Date().toISOString();
  const line = `violation=${constraintId} request_summary=${requestSummary} reason=${reason} ts=${ts}\n`;

  try {
    fs.mkdirSync(logsDir, { recursive: true });
    fs.appendFileSync(guardrailsPath, line);
  } catch (err) {
    process.stderr.write(line);
  }
}

module.exports = {
  checkGuardrails,
  auditViolation,
  parseGuardrailsPolicy,
  getAllowedPrefixes,
  DEFAULT_ALLOWED_PREFIXES,
  PATH_ALLOWLIST_CONSTRAINT_ID,
};
