/**
 * Decomposition engine (story 7): consume loaded genome, apply decomposition rules,
 * produce organ/tissue/cell/molecule instance graph. No execution.
 *
 * @example
 *   const { loadGenome } = require('./lib/loadGenome');
 *   const { decompose } = require('./lib/decompose');
 *   const genome = loadGenome();
 *   const { root } = decompose(genome);
 *   // root.id === 'organism', root.children[0].roleId === 'Build', etc.
 *
 * @throws {Error} If genome is invalid or Example chain cannot be parsed.
 */

/**
 * Parse the "Example chain" from decomposition_rules content.
 * Expects **Organ:**, **Tissue:**, **Cell:**, **Molecule:** (v1 single chain).
 *
 * @param {string} content - genome.decomposition_rules
 * @returns {{ organId: string, tissueId: string, cellId: string, moleculeId: string }}
 * @throws {Error} When any of the four is missing or unparseable.
 */
function parseExampleChain(content) {
  const organMatch = content.match(/\*\*Organ:\*\*\s*(\w+)/);
  const tissueMatch = content.match(/\*\*Tissue:\*\*\s*(\w+)/);
  const cellMatch = content.match(/\*\*Cell:\*\*\s*(\w+)/);
  const moleculeMatch = content.match(/\*\*Molecule:\*\*\s*(\w+)/);

  if (!organMatch || !tissueMatch || !cellMatch || !moleculeMatch) {
    const missing = [];
    if (!organMatch) missing.push('**Organ:**');
    if (!tissueMatch) missing.push('**Tissue:**');
    if (!cellMatch) missing.push('**Cell:**');
    if (!moleculeMatch) missing.push('**Molecule:**');
    throw new Error(
      `Decomposition engine: could not parse Example chain (expected **Organ:**, **Tissue:**, **Cell:**, **Molecule:**). Missing or unparseable: ${missing.join(', ')}.`
    );
  }

  return {
    organId: organMatch[1].trim(),
    tissueId: tissueMatch[1].trim(),
    cellId: cellMatch[1].trim(),
    moleculeId: moleculeMatch[1].trim(),
  };
}

/**
 * Build the instance graph from parsed chain ids.
 *
 * @param {{ organId: string, tissueId: string, cellId: string, moleculeId: string }} chain
 * @returns {{ root: { id: string, layer: string, roleId: null, children: object[] } }}
 */
function buildGraph(chain) {
  const molecule = {
    id: `molecule:${chain.moleculeId}`,
    layer: 'molecule',
    roleId: chain.moleculeId,
    children: [],
  };

  const cell = {
    id: `cell:${chain.cellId}`,
    layer: 'cell',
    roleId: chain.cellId,
    children: [molecule],
  };

  const tissue = {
    id: `tissue:${chain.tissueId}`,
    layer: 'tissue',
    roleId: chain.tissueId,
    children: [cell],
  };

  const organ = {
    id: `organ:${chain.organId}`,
    layer: 'organ',
    roleId: chain.organId,
    children: [tissue],
  };

  const root = {
    id: 'organism',
    layer: 'organism',
    roleId: null,
    children: [organ],
  };

  return { root };
}

/**
 * Decompose a loaded genome into an organ/tissue/cell/molecule instance graph.
 * Input must be the object returned by loadGenome(). No execution; output is data only.
 *
 * @param {object} genome - Object returned by loadGenome() (must have decomposition_rules string).
 * @returns {{ root: { id: string, layer: string, roleId: string|null, children: object[] } }}
 * @throws {Error} When genome is missing or decomposition_rules is missing/invalid; or when Example chain cannot be parsed.
 */
function decompose(genome) {
  if (!genome || typeof genome !== 'object') {
    throw new Error('Decomposition engine: genome (object) is required.');
  }
  if (typeof genome.decomposition_rules !== 'string' || genome.decomposition_rules.trim() === '') {
    throw new Error('Decomposition engine: genome.decomposition_rules is required.');
  }

  const chain = parseExampleChain(genome.decomposition_rules);
  return buildGraph(chain);
}

module.exports = {
  decompose,
  parseExampleChain,
  buildGraph,
};
