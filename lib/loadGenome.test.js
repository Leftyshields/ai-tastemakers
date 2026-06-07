/**
 * Tests for lib/loadGenome.js (story 6 organism loader).
 * Run from repo root: node --test lib/loadGenome.test.js
 */

const path = require('path');
const assert = require('node:assert');
const test = require('node:test');
const { loadGenome } = require('./loadGenome');
const { validateGenome } = require('./validateGenome');

const REPO_ROOT = path.join(__dirname, '..');
const FIXTURE_MISSING_ROLE = path.join(REPO_ROOT, 'tests', 'fixtures', 'genome-missing-role');

test('loadGenome() returns object with expected keys and string values when genome is valid', () => {
  const genome = loadGenome({ genomeDir: path.join(REPO_ROOT, '.genome') });
  assert.strictEqual(typeof genome.mission, 'string');
  assert.strictEqual(typeof genome.constraints, 'string');
  assert.strictEqual(typeof genome.decomposition_rules, 'string');
  assert.strictEqual(typeof genome.role_library, 'object');
  assert.strictEqual(typeof genome.role_library.organs, 'string');
  assert.strictEqual(typeof genome.role_library.tissues, 'string');
  assert.strictEqual(typeof genome.role_library.cells, 'string');
  assert.strictEqual(typeof genome.role_library.molecules, 'string');
  assert.strictEqual(typeof genome.contracts, 'object');
  assert.strictEqual(typeof genome.contracts.handoffs, 'string');
  assert.ok(genome.mission.length >= 0);
  assert.ok(genome.decomposition_rules.includes('Organism') || genome.decomposition_rules.includes('organ'));
});

test('loadGenome() throws when validation fails (missing files or missing role ids)', () => {
  assert.throws(
    () => loadGenome({ genomeDir: FIXTURE_MISSING_ROLE }),
    (err) => {
      assert.ok(err.message.includes('Missing') || err.message.includes('role'), 'message should indicate missing files or missing role ids');
      return true;
    }
  );
});

test('validateGenome() returns valid: true for current genome', () => {
  const result = validateGenome(path.join(REPO_ROOT, '.genome'));
  assert.strictEqual(result.valid, true);
  assert.ok(Array.isArray(result.errors));
  assert.strictEqual(result.errors.length, 0);
});

test('validateGenome() returns valid: false with errors for fixture with missing role/files', () => {
  const result = validateGenome(FIXTURE_MISSING_ROLE);
  assert.strictEqual(result.valid, false);
  assert.ok(Array.isArray(result.errors));
  assert.ok(result.errors.length >= 1);
  assert.ok(
    result.errors.some((e) => e.includes('Missing') || e.includes('role_library')),
    'errors should mention missing files or role_library'
  );
});
