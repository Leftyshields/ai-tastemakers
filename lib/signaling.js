/**
 * Signaling and health aggregation (story 8): status overlay and bottom-up health.
 * Graph from decompose() is read-only; status lives in a separate overlay keyed by node id.
 *
 * @example
 *   const { loadGenome } = require('./loadGenome');
 *   const { decompose } = require('./decompose');
 *   const { createStatusOverlay, setNodeStatus, aggregateHealth } = require('./signaling');
 *   const genome = loadGenome();
 *   const { root } = decompose(genome);
 *   const overlay = createStatusOverlay();
 *   setNodeStatus(overlay, 'molecule:read_file', { status: 'ok' });
 *   const health = aggregateHealth(root, overlay);
 *   // health.organism.status, health.organs
 */

/**
 * Get status from overlay for a node id. Supports plain object or Map.
 * @param {Object|Map} overlay - Status overlay (from createStatusOverlay or plain object).
 * @param {string} nodeId - Node id (e.g. 'molecule:read_file').
 * @returns {{ status: 'ok'|'failed', message?: string }|undefined}
 */
function getOverlayEntry(overlay, nodeId) {
  if (overlay instanceof Map) {
    return overlay.get(nodeId);
  }
  return overlay[nodeId];
}

/**
 * Set status in overlay for a node id. Supports plain object or Map.
 * @param {Object|Map} overlay - Status overlay (mutated).
 * @param {string} nodeId - Node id.
 * @param {{ status: 'ok'|'failed', message?: string }} payload - Status payload.
 */
function setOverlayEntry(overlay, nodeId, payload) {
  if (overlay instanceof Map) {
    overlay.set(nodeId, payload);
  } else {
    overlay[nodeId] = payload;
  }
}

/**
 * Creates a new status overlay for storing status by node id.
 * Use with setNodeStatus and aggregateHealth. Graph from decompose() is read-only.
 *
 * @returns {Object} Empty plain object keyed by node id. Caller owns it; one overlay per run is typical.
 */
function createStatusOverlay() {
  return Object.create(null);
}

/**
 * Records status for a node in the overlay. Does not validate node id against the graph (v1).
 *
 * @param {Object|Map} overlay - Status overlay from createStatusOverlay (or plain object/Map).
 * @param {string} nodeId - Node id (e.g. 'molecule:read_file', 'organ:Build').
 * @param {{ status: 'ok'|'failed', message?: string }} payload - Status payload. message is optional.
 */
function setNodeStatus(overlay, nodeId, payload) {
  setOverlayEntry(overlay, nodeId, payload);
}

/**
 * Computes derived health for a node: leaf uses overlay or default ok; parent is failed if any child failed, else ok.
 *
 * @param {object} node - Graph node with id, layer, children.
 * @param {Object|Map} overlay - Status overlay.
 * @param {Map<string, { status: string, message?: string, childrenFailed?: number }>} healthById - Mutable map to fill.
 * @returns {{ status: 'ok'|'failed', message?: string, childrenFailed?: number }}
 */
function computeNodeHealth(node, overlay, healthById) {
  const entry = getOverlayEntry(overlay, node.id);
  if (!node.children || node.children.length === 0) {
    const health = entry && (entry.status === 'ok' || entry.status === 'failed')
      ? { status: entry.status, message: entry.message }
      : { status: 'ok' };
    healthById.set(node.id, health);
    return health;
  }
  const childHealths = node.children.map((child) => computeNodeHealth(child, overlay, healthById));
  const failedCount = childHealths.filter((h) => h.status === 'failed').length;
  const anyFailed = failedCount > 0;
  const firstFailed = childHealths.find((h) => h.status === 'failed');
  const health = {
    status: anyFailed ? 'failed' : 'ok',
    message: firstFailed ? firstFailed.message : undefined,
    childrenFailed: failedCount,
  };
  healthById.set(node.id, health);
  return health;
}

/**
 * Collects all nodes with layer === 'organ' from the tree.
 *
 * @param {object} node - Graph node.
 * @param {object[]} out - Array to push organ nodes into.
 */
function collectOrgans(node, out) {
  if (node.layer === 'organ') {
    out.push(node);
  }
  if (node.children) {
    for (const child of node.children) {
      collectOrgans(child, out);
    }
  }
}

/**
 * Aggregates health bottom-up from the instance graph and overlay.
 * Leaf nodes: use overlay entry or default { status: 'ok' }.
 * Parent nodes: failed if any child failed, else ok.
 *
 * @param {object} root - Organism node from decompose(genome).root (id, layer, roleId, children).
 * @param {Object|Map} overlay - Status overlay (from createStatusOverlay, updated via setNodeStatus).
 * @returns {{ organism: { status: 'ok'|'failed', message?: string, organs: object[] }, organs: { id: string, status: string, message?: string, childrenFailed?: number }[] }}
 */
function aggregateHealth(root, overlay) {
  if (!root || typeof root !== 'object') {
    throw new Error('aggregateHealth: root (organism node from decompose) is required.');
  }
  const healthById = new Map();
  computeNodeHealth(root, overlay, healthById);
  const organNodes = [];
  collectOrgans(root, organNodes);
  const organs = organNodes.map((node) => {
    const h = healthById.get(node.id) || { status: 'ok' };
    return {
      id: node.id,
      status: h.status,
      message: h.message,
      ...(h.childrenFailed !== undefined && { childrenFailed: h.childrenFailed }),
    };
  });
  const organismHealth = healthById.get(root.id) || { status: 'ok' };
  const organism = {
    status: organismHealth.status,
    ...(organismHealth.message && { message: organismHealth.message }),
    organs,
  };
  return { organism, organs };
}

module.exports = {
  createStatusOverlay,
  setNodeStatus,
  aggregateHealth,
};
