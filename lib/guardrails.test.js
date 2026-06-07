/**
 * Tests for lib/guardrails.js (story 11).
 * Run from repo root: node --test lib/guardrails.test.js
 */

const path = require('path');
const fs = require('fs');
const os = require('os');
const assert = require('node:assert');
const test = require('node:test');
const {
  checkGuardrails,
  auditViolation,
  parseGuardrailsPolicy,
  getAllowedPrefixes,
  DEFAULT_ALLOWED_PREFIXES,
  PATH_ALLOWLIST_CONSTRAINT_ID,
} = require('./guardrails');

const REPO_ROOT = path.join(__dirname, '..');

test('parseGuardrailsPolicy with allowed_path_prefix line returns array', () => {
  const out = parseGuardrailsPolicy('allowed_path_prefix: .genome/,.molecules/');
  assert.ok(Array.isArray(out.allowedPathPrefix));
  assert.strictEqual(out.allowedPathPrefix.length, 2);
  assert.strictEqual(out.allowedPathPrefix[0], '.genome/');
  assert.strictEqual(out.allowedPathPrefix[1], '.molecules/');
});

test('parseGuardrailsPolicy with empty or missing content returns default', () => {
  const out1 = parseGuardrailsPolicy('');
  assert.deepStrictEqual(out1.allowedPathPrefix, DEFAULT_ALLOWED_PREFIXES);
  const out2 = parseGuardrailsPolicy('   \n');
  assert.deepStrictEqual(out2.allowedPathPrefix, DEFAULT_ALLOWED_PREFIXES);
  const out3 = parseGuardrailsPolicy('no allowed_path_prefix here');
  assert.deepStrictEqual(out3.allowedPathPrefix, DEFAULT_ALLOWED_PREFIXES);
});

test('getAllowedPrefixes with genome.guardrails returns parsed prefixes', () => {
  const genome = { guardrails: { allowedPathPrefix: ['.genome/', '.molecules/'] } };
  assert.deepStrictEqual(getAllowedPrefixes(genome), ['.genome/', '.molecules/']);
});

test('getAllowedPrefixes without genome.guardrails returns default', () => {
  assert.deepStrictEqual(getAllowedPrefixes({}), DEFAULT_ALLOWED_PREFIXES);
  assert.deepStrictEqual(getAllowedPrefixes(null), DEFAULT_ALLOWED_PREFIXES);
});

test('checkGuardrails with allowed path under .genome/ returns allowed true', () => {
  const genome = {};
  const request = { path: '.genome/mission.md', repoRoot: REPO_ROOT };
  const out = checkGuardrails(genome, request);
  assert.strictEqual(out.allowed, true);
  assert.strictEqual(out.reason, undefined);
});

test('checkGuardrails with path outside repo returns allowed false', () => {
  const genome = {};
  const request = { path: '/etc/passwd', repoRoot: REPO_ROOT };
  const out = checkGuardrails(genome, request);
  assert.strictEqual(out.allowed, false);
  assert.ok(out.reason);
  assert.strictEqual(out.constraintId, PATH_ALLOWLIST_CONSTRAINT_ID);
});

test('checkGuardrails with path not under allowed prefix returns allowed false', () => {
  const genome = {}; // default allowlist is ['.genome/']
  const request = { path: 'package.json', repoRoot: REPO_ROOT };
  const out = checkGuardrails(genome, request);
  assert.strictEqual(out.allowed, false);
  assert.ok(out.reason);
});

test('checkGuardrails with path containing .. that resolves outside allowlist returns allowed false', () => {
  const genome = {};
  const request = { path: '.genome/../package.json', repoRoot: REPO_ROOT };
  const out = checkGuardrails(genome, request);
  assert.strictEqual(out.allowed, false);
});

test('checkGuardrails with .. escaping repo returns allowed false', () => {
  const genome = {};
  const subDir = path.join(REPO_ROOT, '.genome');
  const request = { path: '../package.json', repoRoot: subDir };
  const out = checkGuardrails(genome, request);
  assert.strictEqual(out.allowed, false);
});

test('auditViolation writes line to .logs/guardrails.log', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'guardrails-test-'));
  try {
    auditViolation(
      { constraintId: 'path_allowlist', requestSummary: '/etc/passwd', reason: 'path outside repo' },
      { repoRoot: tmpDir }
    );
    const logPath = path.join(tmpDir, '.logs', 'guardrails.log');
    assert.ok(fs.existsSync(logPath));
    const content = fs.readFileSync(logPath, 'utf8');
    assert.ok(content.includes('violation=path_allowlist'));
    assert.ok(content.includes('request_summary='));
    assert.ok(content.includes('reason=path outside repo'));
    assert.ok(content.includes('ts='));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('auditViolation on write failure does not throw', () => {
  const entry = { constraintId: 'path_allowlist', requestSummary: 'x', reason: 'y' };
  assert.doesNotThrow(() => {
    auditViolation(entry, { repoRoot: '/nonexistent-readonly-path-if-any' });
  });
});
