/**
 * Organism loader (story 6): read .genome/, validate minimum completeness, expose genome to caller.
 * No orchestration or execution.
 *
 * @example
 *   const { loadGenome } = require('./lib/loadGenome');
 *   const genome = loadGenome();  // uses GENOME_DIR or .genome under cwd
 *   const genome = loadGenome({ genomeDir: '/path/to/.genome' });
 *
 * @throws {Error} If required files are missing or validation fails (missing role ids).
 *   Message lists missing files and/or missing role ids.
 */

const path = require('path');
const { validateGenome, readFile } = require('./validateGenome');
const { parseRepairPolicy } = require('./repairPolicy');
const { parseGuardrailsPolicy } = require('./guardrails');

/**
 * Load and validate genome from disk. Returns an object with raw file contents (strings).
 *
 * @param {{ genomeDir?: string }} [options] - Optional. genomeDir overrides path; else GENOME_DIR env or path.join(process.cwd(), '.genome').
 * @returns {{
 *   mission: string,
 *   constraints: string,
 *   decomposition_rules: string,
 *   role_library: { organs: string, tissues: string, cells: string, molecules: string },
 *   contracts: { handoffs: string },
 *   repair_policy?: { maxRetries: number, delayMs: number },
 *   guardrails?: { allowedPathPrefix: string[] }
 * }}
 * @throws {Error} When required files are missing or referenced role ids are not in role_library.
 */
function loadGenome(options) {
  const genomeDir = path.resolve(
    options?.genomeDir ?? process.env.GENOME_DIR ?? path.join(process.cwd(), '.genome')
  );

  const result = validateGenome(genomeDir);
  if (!result.valid) {
    throw new Error(result.errors.join('; '));
  }

  const readRequired = (relativePath) => {
    const p = path.join(genomeDir, relativePath);
    const content = readFile(p);
    if (content === null) {
      throw new Error(`Could not read required file: ${p}`);
    }
    return content;
  };

  const genome = {
    mission: readRequired('mission.md'),
    constraints: readRequired('constraints.md'),
    decomposition_rules: readRequired('decomposition_rules.md'),
    role_library: {
      organs: readRequired('role_library/organs.md'),
      tissues: readRequired('role_library/tissues.md'),
      cells: readRequired('role_library/cells.md'),
      molecules: readRequired('role_library/molecules.md'),
    },
    contracts: {
      handoffs: readRequired('contracts/handoffs.md'),
    },
  };

  const repairPolicyPath = path.join(genomeDir, 'repair_policy.md');
  const repairPolicyContent = readFile(repairPolicyPath);
  if (repairPolicyContent !== null) {
    genome.repair_policy = parseRepairPolicy(repairPolicyContent);
  }

  const guardrailsPath = path.join(genomeDir, 'guardrails.md');
  const guardrailsContent = readFile(guardrailsPath);
  if (guardrailsContent !== null) {
    genome.guardrails = parseGuardrailsPolicy(guardrailsContent);
  }

  return genome;
}

module.exports = {
  loadGenome,
};
