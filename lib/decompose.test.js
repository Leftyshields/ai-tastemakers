/**
 * Tests for lib/decompose.js (story 7 decomposition engine).
 * Run from repo root: node --test lib/decompose.test.js
 */

const path = require('path');
const assert = require('node:assert');
const test = require('node:test');
const { loadGenome } = require('./loadGenome');
const { decompose } = require('./decompose');

const REPO_ROOT = path.join(__dirname, '..');

test('decompose(genome) with valid genome returns { root } with full chain', () => {
  const genome = loadGenome({ genomeDir: path.join(REPO_ROOT, '.genome') });
  const { root } = decompose(genome);

  assert.strictEqual(root.id, 'organism');
  assert.strictEqual(root.layer, 'organism');
  assert.strictEqual(root.roleId, null);
  assert.ok(Array.isArray(root.children));
  assert.strictEqual(root.children.length, 1);

  const organ = root.children[0];
  assert.strictEqual(organ.id, 'organ:Build');
  assert.strictEqual(organ.layer, 'organ');
  assert.strictEqual(organ.roleId, 'Build');
  assert.strictEqual(organ.children.length, 1);

  const tissue = organ.children[0];
  assert.strictEqual(tissue.id, 'tissue:Implementation');
  assert.strictEqual(tissue.layer, 'tissue');
  assert.strictEqual(tissue.roleId, 'Implementation');
  assert.strictEqual(tissue.children.length, 1);

  const cell = tissue.children[0];
  assert.strictEqual(cell.id, 'cell:Worker');
  assert.strictEqual(cell.layer, 'cell');
  assert.strictEqual(cell.roleId, 'Worker');
  assert.strictEqual(cell.children.length, 1);

  const molecule = cell.children[0];
  assert.strictEqual(molecule.id, 'molecule:read_file');
  assert.strictEqual(molecule.layer, 'molecule');
  assert.strictEqual(molecule.roleId, 'read_file');
  assert.strictEqual(molecule.children.length, 0);
});

test('decompose(genome) with decomposition_rules missing Example chain throws', () => {
  const genome = loadGenome({ genomeDir: path.join(REPO_ROOT, '.genome') });
  genome.decomposition_rules = 'Only prose, no **Organ:** or **Tissue:**.';

  assert.throws(
    () => decompose(genome),
    (err) => {
      assert.ok(err.message.includes('Example chain'), 'message should mention Example chain');
      assert.ok(err.message.includes('Organ') || err.message.includes('Tissue'), 'message should mention expected fields');
      return true;
    }
  );
});

test('decompose(genome) with partial Example chain (only Organ) throws', () => {
  const genome = loadGenome({ genomeDir: path.join(REPO_ROOT, '.genome') });
  genome.decomposition_rules = '## Example chain\n\n- **Organ:** Build\n- No Tissue or Cell or Molecule.';

  assert.throws(
    () => decompose(genome),
    (err) => {
      assert.ok(err.message.includes('Example chain') || err.message.includes('Tissue') || err.message.includes('Molecule'), 'message should mention parse failure');
      return true;
    }
  );
});

test('decompose(null) throws (defensive input check)', () => {
  assert.throws(
    () => decompose(null),
    (err) => {
      assert.ok(err.message.includes('genome') || err.message.includes('required'), 'message should indicate genome is required');
      return true;
    }
  );
});

test('decompose(undefined) throws (defensive input check)', () => {
  assert.throws(
    () => decompose(undefined),
    (err) => {
      assert.ok(err.message.includes('genome') || err.message.includes('required'));
      return true;
    }
  );
});

test('decompose(non-object) throws (defensive input check)', () => {
  assert.throws(() => decompose('not an object'));
  assert.throws(() => decompose(42));
});

test('decompose({}) throws (defensive input check)', () => {
  assert.throws(
    () => decompose({}),
    (err) => {
      assert.ok(err.message.includes('decomposition_rules') || err.message.includes('required'), 'message should indicate missing genome.decomposition_rules');
      return true;
    }
  );
});

test('decompose({ decomposition_rules: "" }) throws', () => {
  assert.throws(
    () => decompose({ decomposition_rules: '' }),
    (err) => {
      assert.ok(err.message.includes('decomposition_rules') || err.message.includes('required'));
      return true;
    }
  );
});
