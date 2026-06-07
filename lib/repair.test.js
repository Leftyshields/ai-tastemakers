/**
 * Tests for lib/repair.js (story 10 repair flow).
 * Run from repo root: node --test lib/repair.test.js
 */

const path = require('path');
const assert = require('node:assert');
const test = require('node:test');
const { parseRepairPolicy, runPathWithRepair } = require('./repair');
const { loadGenome } = require('./loadGenome');

const REPO_ROOT = path.join(__dirname, '..');
const GENOME_DIR = path.join(REPO_ROOT, '.genome');

test('parseRepairPolicy with valid content returns correct numbers', () => {
  const out = parseRepairPolicy('max_retries: 2\ndelay_ms: 100');
  assert.strictEqual(out.maxRetries, 2);
  assert.strictEqual(out.delayMs, 100);
});

test('parseRepairPolicy with only max_retries returns delayMs 0', () => {
  const out = parseRepairPolicy('max_retries: 3');
  assert.strictEqual(out.maxRetries, 3);
  assert.strictEqual(out.delayMs, 0);
});

test('parseRepairPolicy with empty or malformed content returns defaults (0, 0)', () => {
  assert.deepStrictEqual(parseRepairPolicy(''), { maxRetries: 0, delayMs: 0 });
  assert.deepStrictEqual(parseRepairPolicy('garbage'), { maxRetries: 0, delayMs: 0 });
  assert.deepStrictEqual(parseRepairPolicy(null), { maxRetries: 0, delayMs: 0 });
  assert.deepStrictEqual(parseRepairPolicy(undefined), { maxRetries: 0, delayMs: 0 });
});

test('runPathWithRepair when first run succeeds returns immediately with no retry', () => {
  const out = runPathWithRepair({
    genomeDir: GENOME_DIR,
    path: '.genome/mission.md',
    repoRoot: REPO_ROOT,
  });
  assert.ok(out.root && out.root.id === 'organism');
  assert.ok(out.overlay);
  assert.strictEqual(out.overlay['molecule:read_file'].status, 'ok');
  assert.ok(typeof out.result === 'string');
  assert.strictEqual(out.attemptCount, 1);
  assert.strictEqual(out.repaired, undefined);
  assert.strictEqual(out.escalated, undefined);
});

test('runPathWithRepair when no policy (injectLoadGenome without repair_policy): single run, no retry', () => {
  const genome = loadGenome({ genomeDir: GENOME_DIR });
  const genomeNoRepair = { ...genome };
  delete genomeNoRepair.repair_policy;
  const out = runPathWithRepair(
    { genomeDir: GENOME_DIR, path: '.genome/mission.md', repoRoot: REPO_ROOT },
    { injectLoadGenome: () => genomeNoRepair }
  );
  assert.strictEqual(out.attemptCount, 1);
  assert.ok(out.result);
  assert.strictEqual(out.repaired, undefined);
  assert.strictEqual(out.escalated, undefined);
});

test('runPathWithRepair with policy maxRetries 2 and runPath fails every time: escalated after 3 attempts', () => {
  const root = {
    id: 'organism',
    layer: 'organism',
    roleId: null,
    children: [{ id: 'organ:Build', layer: 'organ', roleId: 'Build', children: [] }],
  };
  const overlayFailed = { 'molecule:read_file': { status: 'failed', message: 'test' }, 'organ:Build': { status: 'failed', message: 'test' } };
  let calls = 0;
  const injectRunPath = () => {
    calls++;
    return { root, overlay: { ...overlayFailed }, result: undefined };
  };
  const genome = loadGenome({ genomeDir: GENOME_DIR });
  const out = runPathWithRepair(
    { genomeDir: GENOME_DIR },
    { injectRunPath, injectLoadGenome: () => genome }
  );
  assert.strictEqual(calls, 3, 'initial + 2 retries');
  assert.strictEqual(out.attemptCount, 3);
  assert.strictEqual(out.repaired, true);
  assert.strictEqual(out.escalated, true);
  assert.strictEqual(out.result, undefined);
});

test('runPathWithRepair with policy maxRetries 2, second attempt succeeds', () => {
  const root = {
    id: 'organism',
    layer: 'organism',
    roleId: null,
    children: [{ id: 'organ:Build', layer: 'organ', roleId: 'Build', children: [] }],
  };
  let attempt = 0;
  const injectRunPath = () => {
    attempt++;
    const failed = attempt < 2;
    const overlay = failed
      ? { 'molecule:read_file': { status: 'failed' }, 'organ:Build': { status: 'failed' } }
      : { 'molecule:read_file': { status: 'ok' }, 'organ:Build': { status: 'ok' } };
    return { root, overlay, result: failed ? undefined : 'success' };
  };
  const genome = loadGenome({ genomeDir: GENOME_DIR });
  const out = runPathWithRepair(
    { genomeDir: GENOME_DIR },
    { injectRunPath, injectLoadGenome: () => genome }
  );
  assert.strictEqual(attempt, 2);
  assert.strictEqual(out.attemptCount, 2);
  assert.strictEqual(out.repaired, true);
  assert.strictEqual(out.escalated, false);
  assert.strictEqual(out.result, 'success');
});

test('runPathWithRepair with maxRetries 0 and failure: one run, then escalated', () => {
  const genome = loadGenome({ genomeDir: GENOME_DIR });
  const genomeZeroRetries = { ...genome, repair_policy: { maxRetries: 0, delayMs: 0 } };
  const root = {
    id: 'organism',
    layer: 'organism',
    roleId: null,
    children: [{ id: 'organ:Build', layer: 'organ', roleId: 'Build', children: [] }],
  };
  const injectRunPath = () => ({
    root,
    overlay: { 'molecule:read_file': { status: 'failed' }, 'organ:Build': { status: 'failed' } },
    result: undefined,
  });
  const out = runPathWithRepair(
    { genomeDir: GENOME_DIR },
    { injectRunPath, injectLoadGenome: () => genomeZeroRetries }
  );
  assert.strictEqual(out.attemptCount, 1);
  assert.strictEqual(out.repaired, false);
  assert.strictEqual(out.escalated, true);
});

test('loadGenome includes repair_policy when .genome/repair_policy.md exists', () => {
  const genome = loadGenome({ genomeDir: GENOME_DIR });
  assert.ok(genome.repair_policy);
  assert.strictEqual(typeof genome.repair_policy.maxRetries, 'number');
  assert.strictEqual(typeof genome.repair_policy.delayMs, 'number');
});
