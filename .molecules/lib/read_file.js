'use strict';

const fs = require('fs');
const path = require('path');
const { audit } = require('./audit.js');

const MOLECULE_ID = 'read_file';

/**
 * Returns true if resolvedPath is under repoRoot (or equal). Uses path.relative to avoid
 * platform-specific edge cases; resolved paths must be normalized.
 */
function isUnderRepoRoot(repoRootResolved, resolvedPath) {
  const rel = path.relative(repoRootResolved, resolvedPath);
  return rel !== '' && !rel.startsWith('..');
}

/**
 * Reads a file under the repository root. Enforces path-under-repo and read-only; audits each invocation.
 *
 * @param {Object} options
 * @param {string} options.path - File path (relative to repo root or absolute; must resolve under repo root).
 * @param {string|null} [options.encoding='utf8'] - Encoding (e.g. 'utf8'); null for Buffer.
 * @param {string} [options.repoRoot] - Repository root; defaults to process.cwd().
 * @returns {string|Buffer} File contents.
 * @throws {Error} If path is outside repo root, file does not exist, or not readable.
 *
 * Postcondition: No side effect except read; return value is an immutable snapshot of file contents.
 * Permissions: Read-only; paths must be under repo root.
 */
function readFile(options) {
  if (!options || typeof options.path !== 'string') {
    const err = new Error('read_file: path (string) is required');
    audit({ moleculeId: MOLECULE_ID, pathOrRef: '', success: false, repoRoot: options && options.repoRoot });
    throw err;
  }

  const repoRoot = path.resolve(options.repoRoot || process.cwd());
  const inputPath = options.path;
  const encoding = options.encoding === undefined ? 'utf8' : options.encoding;

  let resolvedInputPath;
  if (path.isAbsolute(inputPath)) {
    resolvedInputPath = path.normalize(inputPath);
  } else {
    resolvedInputPath = path.join(repoRoot, inputPath);
  }

  let resolvedPath;
  try {
    resolvedPath = fs.realpathSync(resolvedInputPath);
  } catch (err) {
    audit({
      moleculeId: MOLECULE_ID,
      pathOrRef: inputPath,
      success: false,
      repoRoot,
    });
    throw err;
  }

  const repoRootResolved = fs.realpathSync(repoRoot);
  if (!isUnderRepoRoot(repoRootResolved, resolvedPath)) {
    const err = new Error('read_file: path not under repo root');
    audit({
      moleculeId: MOLECULE_ID,
      pathOrRef: inputPath,
      success: false,
      repoRoot,
    });
    throw err;
  }

  try {
    fs.accessSync(resolvedPath, fs.constants.R_OK);
  } catch (err) {
    audit({
      moleculeId: MOLECULE_ID,
      pathOrRef: inputPath,
      success: false,
      repoRoot,
    });
    throw err;
  }

  try {
    const contents = fs.readFileSync(resolvedPath, encoding);
    audit({
      moleculeId: MOLECULE_ID,
      pathOrRef: inputPath,
      success: true,
      repoRoot,
    });
    return contents;
  } catch (err) {
    audit({
      moleculeId: MOLECULE_ID,
      pathOrRef: inputPath,
      success: false,
      repoRoot,
    });
    throw err;
  }
}

module.exports = { readFile };
