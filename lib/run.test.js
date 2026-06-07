/**
 * Tests for lib/run.js (story 9 run one path end-to-end).
 * Run from repo root: node --test lib/run.test.js
 */

const path = require('path');
const { execSync } = require('child_process');
const assert = require('node:assert');
const test = require('node:test');
const { runPath, resolveMolecule } = require('./run');
const { aggregateHealth } = require('./signaling');

const REPO_ROOT = path.join(__dirname, '..');

test('runPath with valid path returns overlay with molecule status ok and result (string content)', () => {
  const genomeDir = path.join(REPO_ROOT, '.genome');
  const { root, overlay, result } = runPath({
    genomeDir,
    path: '.genome/mission.md',
    repoRoot: REPO_ROOT,
  });

  assert.ok(root && root.id === 'organism');
  assert.ok(overlay && typeof overlay === 'object');
  assert.strictEqual(overlay['molecule:read_file'].status, 'ok');
  assert.ok(typeof result === 'string' && result.length > 0);
  assert.ok(result.includes('mission') || result.includes('Mission') || result.length > 10);
});

test('runPath with missing path returns overlay failed and result undefined; aggregateHealth shows failed', () => {
  const genomeDir = path.join(REPO_ROOT, '.genome');
  const { root, overlay, result } = runPath({
    genomeDir,
    path: '.genome/nonexistent-file-404.txt',
    repoRoot: REPO_ROOT,
  });

  assert.ok(root && root.id === 'organism');
  assert.strictEqual(overlay['molecule:read_file'].status, 'failed');
  assert.ok(overlay['molecule:read_file'].message);
  assert.strictEqual(result, undefined);

  const health = aggregateHealth(root, overlay);
  assert.strictEqual(health.organism.status, 'failed');
  assert.strictEqual(health.organs[0].status, 'failed');
});

test('runPath with no options uses default path and succeeds when .genome/mission.md exists', () => {
  const genomeDir = path.join(REPO_ROOT, '.genome');
  const { root, overlay, result } = runPath({ genomeDir });

  assert.ok(root && root.id === 'organism');
  assert.strictEqual(overlay['molecule:read_file'].status, 'ok');
  assert.ok(typeof result === 'string');
});

test('runPath with allowed path does not set blocked (guardrails pass)', () => {
  const genomeDir = path.join(REPO_ROOT, '.genome');
  const out = runPath({ genomeDir, path: '.genome/mission.md', repoRoot: REPO_ROOT });
  assert.ok(out.root && out.overlay && out.result !== undefined);
  assert.strictEqual(out.blocked, undefined);
  assert.strictEqual(out.violationReason, undefined);
});

test('runPath return shape has root, overlay, and result (or undefined on failure)', () => {
  const genomeDir = path.join(REPO_ROOT, '.genome');
  const ok = runPath({ genomeDir, path: '.genome/mission.md', repoRoot: REPO_ROOT });
  assert.ok('root' in ok && 'overlay' in ok && 'result' in ok);
  assert.ok(ok.result !== undefined);

  const fail = runPath({ genomeDir, path: '.genome/missing.txt', repoRoot: REPO_ROOT });
  assert.ok('root' in fail && 'overlay' in fail && 'result' in fail);
  assert.strictEqual(fail.result, undefined);
});

test('resolveMolecule(read_file) returns readFile function', () => {
  const resolved = resolveMolecule('read_file');
  assert.ok(resolved !== null && typeof resolved.fn === 'function');
  const content = resolved.fn({ path: '.genome/mission.md', repoRoot: REPO_ROOT });
  assert.ok(typeof content === 'string');
});

test('resolveMolecule(unknown_role) returns null', () => {
  const resolved = resolveMolecule('unknown_molecule_xyz');
  assert.strictEqual(resolved, null);
});

test('runPath with path outside repo returns blocked by guardrails (no molecule run)', () => {
  const genomeDir = path.join(REPO_ROOT, '.genome');
  const out = runPath({
    genomeDir,
    path: '/tmp/not-under-repo-root',
    repoRoot: REPO_ROOT,
  });
  assert.ok(out.root && out.root.id === 'organism');
  assert.strictEqual(out.blocked, true);
  assert.ok(out.violationReason);
  assert.strictEqual(out.result, undefined);
  assert.strictEqual(out.overlay['molecule:read_file'].status, 'failed');
  assert.ok(out.overlay['molecule:read_file'].message);
});

test('runPath with no arguments does not throw and returns root, overlay, result', () => {
  const out = runPath();
  assert.ok(out && typeof out === 'object');
  assert.ok('root' in out && 'overlay' in out && 'result' in out);
  assert.ok(out.root && out.root.id === 'organism');
});

test('script scripts/run-path.js with valid path prints ok and exits 0', () => {
  const scriptPath = path.join(REPO_ROOT, 'scripts', 'run-path.js');
  const stdout = execSync(`node "${scriptPath}" .genome/mission.md`, {
    encoding: 'utf8',
    cwd: REPO_ROOT,
  });
  assert.ok(stdout.trim().startsWith('ok'));
});

test('script scripts/run-path.js with missing file prints failed and exits 1', () => {
  const scriptPath = path.join(REPO_ROOT, 'scripts', 'run-path.js');
  try {
    execSync(`node "${scriptPath}" .genome/nonexistent-404.txt`, {
      encoding: 'utf8',
      cwd: REPO_ROOT,
    });
    assert.fail('expected script to exit non-zero');
  } catch (err) {
    assert.ok(err.status === 1 || err.code === 1);
    const stdout = err.stdout || '';
    assert.ok(stdout.trim().startsWith('failed'));
  }
});
