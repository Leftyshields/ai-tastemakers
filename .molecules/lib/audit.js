'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Default repo root when not provided: two levels up from this file (.molecules/lib/ -> repo root).
 */
function defaultRepoRoot() {
  return path.resolve(__dirname, '..', '..');
}

/**
 * Appends one audit log line for a molecule invocation.
 * Ensures .logs/ exists; writes to .logs/audit.log; falls back to stdout if write fails.
 *
 * @param {Object} logEntry
 * @param {string} logEntry.moleculeId - e.g. 'read_file'
 * @param {string} logEntry.pathOrRef - path or reference (e.g. file path)
 * @param {boolean} logEntry.success - whether the invocation succeeded
 * @param {string} [logEntry.timestamp] - ISO 8601; defaults to new Date().toISOString()
 * @param {string} [logEntry.repoRoot] - repo root for .logs path; defaults to defaultRepoRoot()
 */
function audit(logEntry) {
  const moleculeId = (logEntry.moleculeId || 'unknown').replace(/\s/g, ' ');
  const pathOrRef = (logEntry.pathOrRef != null ? String(logEntry.pathOrRef) : '').replace(/[\r\n]/g, ' ');
  const success = Boolean(logEntry.success);
  const ts = logEntry.timestamp || new Date().toISOString();
  const repoRoot = logEntry.repoRoot || defaultRepoRoot();

  const line = `molecule=${moleculeId} path=${pathOrRef} success=${success} ts=${ts}\n`;
  const logsDir = path.join(repoRoot, '.logs');
  const auditPath = path.join(logsDir, 'audit.log');

  try {
    fs.mkdirSync(logsDir, { recursive: true });
    fs.appendFileSync(auditPath, line);
  } catch (err) {
    console.log(line.trim());
  }
}

module.exports = { audit };
