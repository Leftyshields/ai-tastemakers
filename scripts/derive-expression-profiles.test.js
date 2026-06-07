/**
 * Automated tests for scripts/derive-expression-profiles.js
 * Run from repo root: node --test scripts/derive-expression-profiles.test.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const assert = require('node:assert');
const test = require('node:test');

const SCRIPT = path.join(__dirname, 'derive-expression-profiles.js');
const GENOME = path.join(__dirname, '..', '.genome');
const FIXTURE_MISSING_ROLE = path.join(__dirname, '..', 'tests', 'fixtures', 'genome-missing-role');

test('validation passes with current genome', () => {
  const out = execSync(`node "${SCRIPT}"`, {
    encoding: 'utf8',
    cwd: path.join(__dirname, '..'),
  });
  assert.ok(out.includes('Validation passed'), 'stdout should contain "Validation passed"');
});

test('validation fails when a role id is missing from role_library', () => {
  try {
    execSync(`node "${SCRIPT}"`, {
      encoding: 'utf8',
      cwd: path.join(__dirname, '..'),
      env: { ...process.env, GENOME_DIR: FIXTURE_MISSING_ROLE },
    });
    assert.fail('expected script to exit non-zero');
  } catch (e) {
    assert.strictEqual(e.status, 1, 'exit code should be 1');
    assert.ok(
      e.stderr && (e.stderr.includes('Implementation') || e.stderr.includes('missing')),
      'stderr should mention missing role or list Implementation'
    );
  }
});

test('--emit creates expected profile files', () => {
  const outDir = path.join(GENOME, 'expression_profiles');
  const expected = [
    'organism.md',
    'organ-Build.md',
    'tissue-Implementation.md',
    'cell-Worker.md',
    'molecule-read_file.md',
  ];
  execSync(`node "${SCRIPT}" --emit`, {
    encoding: 'utf8',
    cwd: path.join(__dirname, '..'),
  });
  for (const name of expected) {
    const p = path.join(outDir, name);
    assert.ok(fs.existsSync(p), `expected file: expression_profiles/${name}`);
  }
});
