/**
 * Run one full path end-to-end (story 9): load genome, decompose, walk to leaf molecule,
 * resolve implementation, invoke molecule, set status in overlay. Returns { root, overlay, result? }.
 *
 * RoleId → implementation convention: molecule roleId (e.g. read_file) maps to
 * .molecules/lib/<roleId>.js under repo root. For read_file, the module exports readFile(options).
 *
 * @example
 *   const { runPath } = require('./lib/run');
 *   const { root, overlay, result } = runPath({ path: '.genome/mission.md' });
 *   // overlay['molecule:read_file'].status === 'ok'; result is file contents
 */

const path = require('path');
const { loadGenome } = require('./loadGenome');
const { decompose } = require('./decompose');
const { createStatusOverlay, setNodeStatus } = require('./signaling');
const { checkGuardrails, auditViolation, PATH_ALLOWLIST_CONSTRAINT_ID } = require('./guardrails');

const REPO_ROOT = path.join(__dirname, '..');

/**
 * Resolve the molecule implementation for a roleId. Convention: .molecules/lib/<roleId>.js.
 *
 * @param {string} roleId - Molecule role id (e.g. 'read_file').
 * @returns {{ fn: Function }|null} - The invoke function, or null if not found.
 */
function resolveMolecule(roleId) {
  const modulePath = path.join(REPO_ROOT, '.molecules', 'lib', `${roleId}.js`);
  try {
    const mod = require(modulePath);
    if (roleId === 'read_file' && typeof mod.readFile === 'function') {
      return { fn: mod.readFile };
    }
    if (typeof mod[roleId] === 'function') {
      return { fn: mod[roleId] };
    }
    const camel = roleId.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    if (typeof mod[camel] === 'function') {
      return { fn: mod[camel] };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Run one full path: load genome, decompose, create overlay, walk to leaf molecule,
 * resolve and invoke molecule, set molecule node status in overlay.
 *
 * @param {{
 *   genomeDir?: string,
 *   path?: string,
 *   encoding?: string,
 *   repoRoot?: string
 * }} [options] - Optional. genomeDir for loadGenome; path, encoding, repoRoot for read_file molecule.
 *   path defaults to '.genome/mission.md' when not provided.
 * @returns {{ root: object, overlay: object, result?: string|Buffer, blocked?: boolean, violationReason?: string }}
 *   When blocked by guardrails: blocked true, violationReason set, overlay molecule node failed, no result.
 */
function runPath(options) {
  const genome = loadGenome({ genomeDir: options?.genomeDir });
  const repoRoot = options?.repoRoot ?? process.cwd();
  const request = {
    path: options?.path ?? '.genome/mission.md',
    genomeDir: options?.genomeDir,
    repoRoot,
  };
  const guard = checkGuardrails(genome, request);
  if (!guard.allowed) {
    auditViolation(
      {
        constraintId: guard.constraintId ?? PATH_ALLOWLIST_CONSTRAINT_ID,
        requestSummary: request.path || 'runPath',
        reason: guard.reason ?? 'denied',
      },
      { repoRoot }
    );
    const { root } = decompose(genome);
    const overlay = createStatusOverlay();
    const organ = root.children && root.children[0];
    const tissue = organ && organ.children && organ.children[0];
    const cell = tissue && tissue.children && tissue.children[0];
    const moleculeNode = cell && cell.children && cell.children[0];
    const reason = guard.reason ?? 'blocked by guardrails';
    if (moleculeNode) {
      setNodeStatus(overlay, moleculeNode.id, { status: 'failed', message: reason });
    }
    return { root, overlay, result: undefined, blocked: true, violationReason: reason };
  }

  const { root } = decompose(genome);
  const overlay = createStatusOverlay();

  const organ = root.children && root.children[0];
  const tissue = organ && organ.children && organ.children[0];
  const cell = tissue && tissue.children && tissue.children[0];
  const moleculeNode = cell && cell.children && cell.children[0];

  if (!moleculeNode || moleculeNode.layer !== 'molecule') {
    return { root, overlay, result: undefined };
  }

  const roleId = moleculeNode.roleId;
  if (typeof roleId !== 'string' || roleId.trim() === '') {
    setNodeStatus(overlay, moleculeNode.id, {
      status: 'failed',
      message: 'molecule roleId is missing or invalid',
    });
    return { root, overlay, result: undefined };
  }

  const resolved = resolveMolecule(roleId);
  if (!resolved) {
    setNodeStatus(overlay, moleculeNode.id, {
      status: 'failed',
      message: `molecule implementation not found for roleId: ${roleId}`,
    });
    return { root, overlay, result: undefined };
  }

  const moleculeOptions = {
    path: options?.path ?? '.genome/mission.md',
    encoding: options?.encoding,
    repoRoot,
  };

  try {
    const result = resolved.fn(moleculeOptions);
    setNodeStatus(overlay, moleculeNode.id, { status: 'ok' });
    return { root, overlay, result };
  } catch (err) {
    setNodeStatus(overlay, moleculeNode.id, {
      status: 'failed',
      message: err && err.message ? err.message : String(err),
    });
    return { root, overlay, result: undefined };
  }
}

module.exports = {
  runPath,
  resolveMolecule,
};
