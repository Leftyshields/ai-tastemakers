'use strict';

/**
 * Tests for instantiate.sh: run script into a temp dir and assert e2e works.
 * Run from repo root: node --test scripts/instantiate.test.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const assert = require('assert');
const test = require('node:test');

const repoRoot = path.join(__dirname, '..');
const scriptPath = path.join(repoRoot, 'instantiate.sh');

function mkdtemp() {
  const base = path.join(os.tmpdir(), 'pg-instantiate-test-');
  return fs.mkdtempSync(base);
}

test('instantiate.sh copies repo and e2e works', () => {
  const targetDir = mkdtemp();
  try {
    execSync(`sh "${scriptPath}" "${repoRoot}" "${targetDir}" --no-verify`, {
      cwd: repoRoot,
      stdio: 'pipe',
      encoding: 'utf-8',
    });

    // Critical files/dirs for e2e and workflow
    assert.ok(fs.existsSync(path.join(targetDir, 'package.json')), 'package.json copied');
    assert.ok(fs.existsSync(path.join(targetDir, '.genome', 'mission.md')), '.genome copied');
    assert.ok(fs.existsSync(path.join(targetDir, '.cursor', 'commands')), '.cursor/commands copied');
    assert.ok(fs.existsSync(path.join(targetDir, 'docs')), 'docs/ copied');
    assert.ok(fs.existsSync(path.join(targetDir, 'lib')), 'lib/ copied');
    assert.ok(fs.existsSync(path.join(targetDir, 'scripts', 'run-path.js')), 'scripts/run-path.js copied');
    assert.ok(fs.existsSync(path.join(targetDir, '.ai', 'context')), '.ai/context created');
    assert.ok(fs.statSync(path.join(targetDir, '.ai', 'context')).isDirectory());

    const testOut = execSync('npm test', { cwd: targetDir, encoding: 'utf-8' });
    assert.ok(testOut.includes('tests'), 'npm test runs');

    const runPathOut = execSync('node scripts/run-path.js .genome/mission.md', {
      cwd: targetDir,
      encoding: 'utf-8',
    });
    assert.ok(runPathOut.trim().startsWith('ok'), 'run-path.js succeeds');
  } finally {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
});
