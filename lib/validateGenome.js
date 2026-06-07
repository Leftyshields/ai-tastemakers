/**
 * Shared genome validation for organism loader (story 6) and derive-expression-profiles script.
 * Validates required files exist and every role id referenced in decomposition_rules and
 * contracts exists in the corresponding role_library file.
 *
 * Required files (under genomeDir):
 *   mission.md, constraints.md, decomposition_rules.md,
 *   role_library/organs.md, role_library/tissues.md, role_library/cells.md, role_library/molecules.md,
 *   contracts/handoffs.md
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  'mission.md',
  'constraints.md',
  'decomposition_rules.md',
  'role_library/organs.md',
  'role_library/tissues.md',
  'role_library/cells.md',
  'role_library/molecules.md',
  'contracts/handoffs.md',
];

/**
 * Read file as UTF-8. Returns null if missing or unreadable.
 * @param {string} filePath
 * @returns {string|null}
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    if (process.env.DEBUG) console.error(`Read failed: ${filePath}`, e.code || e.message);
    return null;
  }
}

/**
 * Extract role ids from role library markdown (## Id headings).
 * @param {string} content
 * @returns {string[]}
 */
function roleIdsInRoleLibrary(content) {
  const ids = [];
  const re = /^##\s+(.+)$/gm;
  let m;
  while ((m = re.exec(content)) !== null) {
    const name = m[1].trim();
    if (name && !name.toLowerCase().startsWith('role') && !name.toLowerCase().endsWith('roles')) {
      ids.push(name);
    }
  }
  return ids;
}

/**
 * Extract role ids referenced in decomposition_rules content (match script behavior).
 * v1: uses regex for **Organ:** etc. plus literal names for the current single-organ genome
 *     (Build, Implementation, Worker, read_file). For multi-organ genomes, this should be
 *     generalized (e.g. parse from a structured section or table) in a later story.
 * @param {string} content
 * @returns {Set<string>}
 */
function parseRoleIdsFromDecomposition(content) {
  const ids = new Set();
  const organMatch = content.match(/\*\*Organ:\*\*\s*(\w+)/);
  const tissueMatch = content.match(/\*\*Tissue:\*\*\s*(\w+)/);
  const cellMatch = content.match(/\*\*Cell:\*\*\s*(\w+)/);
  const moleculeMatch = content.match(/\*\*Molecule:\*\*\s*(\w+)/);
  if (organMatch) ids.add(organMatch[1].trim());
  if (tissueMatch) ids.add(tissueMatch[1].trim());
  if (cellMatch) ids.add(cellMatch[1].trim());
  if (moleculeMatch) ids.add(moleculeMatch[1].trim());
  if (content.includes('Build')) ids.add('Build');
  if (content.includes('Implementation')) ids.add('Implementation');
  if (content.includes('Worker')) ids.add('Worker');
  if (content.includes('read_file')) ids.add('read_file');
  return ids;
}

/**
 * Extract role ids From/To from contract markdown.
 * @param {string} content
 * @returns {Set<string>}
 */
function parseRoleIdsFromContract(content) {
  const ids = new Set();
  const fromMatch = content.match(/\*\*From:\*\*\s*([^(]+)/g);
  const toMatch = content.match(/\*\*To:\*\*\s*([^(]+)/g);
  if (fromMatch) fromMatch.forEach(l => { const n = l.replace(/\*\*From:\*\*\s*/, '').trim().split(/\s/)[0]; if (n) ids.add(n); });
  if (toMatch) toMatch.forEach(l => { const n = l.replace(/\*\*To:\*\*\s*/, '').trim().split(/\s/)[0]; if (n) ids.add(n); });
  return ids;
}

/**
 * Resolve genome directory: optional genomeDir, else GENOME_DIR env, else .genome under cwd.
 * @param {string} [genomeDir]
 * @returns {string}
 */
function resolveGenomeDir(genomeDir) {
  return genomeDir || process.env.GENOME_DIR || path.join(process.cwd(), '.genome');
}

/**
 * Validate genome: required files present and all referenced role ids exist in role_library.
 * @param {string} [genomeDir] - Optional; uses GENOME_DIR env or path.join(process.cwd(), '.genome') if omitted.
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateGenome(genomeDir) {
  const root = path.resolve(resolveGenomeDir(genomeDir));
  const errors = [];

  const missingFiles = [];
  for (const rel of REQUIRED_FILES) {
    const p = path.join(root, rel);
    if (!fs.existsSync(p)) missingFiles.push(rel);
  }
  if (missingFiles.length > 0) {
    errors.push(`Missing required file(s): ${missingFiles.map(f => path.join(root, f)).join(', ')}`);
    return { valid: false, errors };
  }

  const decompositionPath = path.join(root, 'decomposition_rules.md');
  const handoffsPath = path.join(root, 'contracts/handoffs.md');
  const decomposition = readFile(decompositionPath);
  const handoffs = readFile(handoffsPath);

  if (!decomposition) {
    errors.push(`Could not read ${decompositionPath}`);
    return { valid: false, errors };
  }
  if (!handoffs) {
    errors.push(`Could not read ${handoffsPath}`);
    return { valid: false, errors };
  }

  const roleLib = path.join(root, 'role_library');
  const organsContent = readFile(path.join(roleLib, 'organs.md'));
  const tissuesContent = readFile(path.join(roleLib, 'tissues.md'));
  const cellsContent = readFile(path.join(roleLib, 'cells.md'));
  const moleculesContent = readFile(path.join(roleLib, 'molecules.md'));

  const organIdsInLib = organsContent ? roleIdsInRoleLibrary(organsContent) : [];
  const tissueIdsInLib = tissuesContent ? roleIdsInRoleLibrary(tissuesContent) : [];
  const cellIdsInLib = cellsContent ? roleIdsInRoleLibrary(cellsContent) : [];
  const moleculeIdsInLib = moleculesContent ? roleIdsInRoleLibrary(moleculesContent) : [];

  const refsFromDecomp = parseRoleIdsFromDecomposition(decomposition);
  const refsFromContract = parseRoleIdsFromContract(handoffs);
  const allRefs = new Set([...refsFromDecomp, ...refsFromContract]);

  const missingRoleIds = [];
  for (const id of allRefs) {
    if (organIdsInLib.includes(id)) continue;
    if (tissueIdsInLib.includes(id)) continue;
    if (cellIdsInLib.includes(id)) continue;
    if (moleculeIdsInLib.includes(id)) continue;
    missingRoleIds.push(id);
  }

  if (missingRoleIds.length > 0) {
    errors.push(`Validation failed: the following role ids are referenced but not found in role_library: ${missingRoleIds.join(', ')}`);
    return { valid: false, errors };
  }

  // Optional: validate repair_policy.md if present (story 10). Errors are appended but do not set valid = false.
  // Negative check is future-proofing (current parser already returns >= 0).
  const repairPolicyPath = path.join(root, 'repair_policy.md');
  if (fs.existsSync(repairPolicyPath)) {
    const content = readFile(repairPolicyPath);
    if (content !== null) {
      const { parseRepairPolicy } = require('./repairPolicy');
      const policy = parseRepairPolicy(content);
      if (policy.maxRetries < 0 || policy.delayMs < 0) {
        errors.push('repair_policy.md: max_retries and delay_ms must be non-negative');
      }
    }
  }

  return { valid: true, errors };
}

module.exports = {
  readFile,
  roleIdsInRoleLibrary,
  parseRoleIdsFromDecomposition,
  parseRoleIdsFromContract,
  resolveGenomeDir,
  validateGenome,
  REQUIRED_FILES,
};
