/**
 * Tests for lib/signaling.js (story 8 signaling and health aggregation).
 * Run from repo root: node --test lib/signaling.test.js
 */

const path = require('path');
const assert = require('node:assert');
const test = require('node:test');
const { loadGenome } = require('./loadGenome');
const { decompose } = require('./decompose');
const { createStatusOverlay, setNodeStatus, aggregateHealth } = require('./signaling');

const REPO_ROOT = path.join(__dirname, '..');

test('createStatusOverlay() returns an empty overlay that can be mutated', () => {
  const overlay = createStatusOverlay();
  assert.ok(overlay !== null && typeof overlay === 'object');
  assert.strictEqual(Object.keys(overlay).length, 0);
  setNodeStatus(overlay, 'molecule:read_file', { status: 'ok' });
  assert.strictEqual(overlay['molecule:read_file'].status, 'ok');
});

test('setNodeStatus(overlay, nodeId, payload) stores payload; read by node id returns it', () => {
  const overlay = createStatusOverlay();
  setNodeStatus(overlay, 'organ:Build', { status: 'failed', message: 'timeout' });
  assert.deepStrictEqual(overlay['organ:Build'], { status: 'failed', message: 'timeout' });
});

test('aggregateHealth(root, overlay) with no overlay entries returns organism and all organs as ok', () => {
  const genome = loadGenome({ genomeDir: path.join(REPO_ROOT, '.genome') });
  const { root } = decompose(genome);
  const overlay = createStatusOverlay();
  const health = aggregateHealth(root, overlay);

  assert.strictEqual(health.organism.status, 'ok');
  assert.ok(Array.isArray(health.organs));
  assert.strictEqual(health.organs.length, 1);
  assert.strictEqual(health.organs[0].id, 'organ:Build');
  assert.strictEqual(health.organs[0].status, 'ok');
});

test('aggregateHealth(root, overlay) with one molecule set to failed propagates failed up the chain', () => {
  const genome = loadGenome({ genomeDir: path.join(REPO_ROOT, '.genome') });
  const { root } = decompose(genome);
  const overlay = createStatusOverlay();
  setNodeStatus(overlay, 'molecule:read_file', { status: 'failed', message: 'ENOENT' });

  const health = aggregateHealth(root, overlay);

  assert.strictEqual(health.organism.status, 'failed');
  assert.strictEqual(health.organs.length, 1);
  assert.strictEqual(health.organs[0].id, 'organ:Build');
  assert.strictEqual(health.organs[0].status, 'failed');
});

test('aggregateHealth(root, overlay) with all molecules ok returns organism and organs as ok', () => {
  const genome = loadGenome({ genomeDir: path.join(REPO_ROOT, '.genome') });
  const { root } = decompose(genome);
  const overlay = createStatusOverlay();
  setNodeStatus(overlay, 'molecule:read_file', { status: 'ok' });

  const health = aggregateHealth(root, overlay);

  assert.strictEqual(health.organism.status, 'ok');
  assert.strictEqual(health.organs[0].status, 'ok');
});

test('aggregateHealth with minimal mock tree (no loadGenome) works', () => {
  const molecule = { id: 'molecule:read_file', layer: 'molecule', roleId: 'read_file', children: [] };
  const cell = { id: 'cell:Worker', layer: 'cell', roleId: 'Worker', children: [molecule] };
  const tissue = { id: 'tissue:Implementation', layer: 'tissue', roleId: 'Implementation', children: [cell] };
  const organ = { id: 'organ:Build', layer: 'organ', roleId: 'Build', children: [tissue] };
  const root = { id: 'organism', layer: 'organism', roleId: null, children: [organ] };

  const overlay = createStatusOverlay();
  const health = aggregateHealth(root, overlay);

  assert.strictEqual(health.organism.status, 'ok');
  assert.strictEqual(health.organs.length, 1);
  assert.strictEqual(health.organs[0].id, 'organ:Build');

  setNodeStatus(overlay, 'molecule:read_file', { status: 'failed' });
  const health2 = aggregateHealth(root, overlay);
  assert.strictEqual(health2.organism.status, 'failed');
  assert.strictEqual(health2.organs[0].status, 'failed');
});

test('aggregateHealth(null, overlay) throws', () => {
  const overlay = createStatusOverlay();
  assert.throws(
    () => aggregateHealth(null, overlay),
    (err) => {
      assert.ok(err.message.includes('root') && err.message.includes('required'));
      return true;
    }
  );
});

test('aggregateHealth(undefined, overlay) throws', () => {
  const overlay = createStatusOverlay();
  assert.throws(
    () => aggregateHealth(undefined, overlay),
    (err) => {
      assert.ok(err.message.includes('root') && err.message.includes('required'));
      return true;
    }
  );
});
