#!/usr/bin/env node
/**
 * Build: validate genome, then run one path. Prints run-the-app instructions when done.
 * Usage: node scripts/build.js [path]
 * Example: node scripts/build.js .genome/mission.md
 * Default path: .genome/mission.md
 */

const path = require('path');
const { validateGenome } = require('../lib/validateGenome');
const { runPath } = require('../lib/run');

const repoRoot = path.join(__dirname, '..');
const genomeDir = path.join(repoRoot, '.genome');
const filePath = process.argv[2] || '.genome/mission.md';

// Quote path for shell if it contains spaces or metacharacters, so printed command is copy-paste safe.
function formatPathForShell(p) {
  if (!/[\s'"$`\\]/.test(p)) return p;
  return "'" + p.replace(/'/g, "'\\''") + "'";
}
const pathForOutput = formatPathForShell(filePath);

const validation = validateGenome(genomeDir);
if (!validation.valid) {
  console.error('Build failed: genome validation failed.');
  validation.errors.forEach((e) => console.error('  ' + e));
  process.exitCode = 1;
  console.log('');
  console.log('After fixing the genome, run: node scripts/run-path.js ' + pathForOutput);
  process.exit(1);
}

const { overlay, result } = runPath({ path: filePath, repoRoot });
// Current single-path leaf node id (read_file molecule).
const moleculeId = 'molecule:read_file';
const status = overlay[moleculeId] ? overlay[moleculeId].status : 'unknown';
const message = overlay[moleculeId] && overlay[moleculeId].message;

if (status === 'ok') {
  console.log('Build ok.');
  if (result !== undefined) {
    const preview = typeof result === 'string' ? result.slice(0, 200) : `<${typeof result} ${result?.length ?? 0} bytes>`;
    console.log(preview + (result && result.length > 200 ? '...' : ''));
  }
} else {
  console.log('Build failed.');
  if (message) console.error(message);
  process.exitCode = 1;
}

console.log('');
console.log('To run the organism: node scripts/run-path.js ' + pathForOutput);
console.log('See lib/README.md for runtime options, guardrails, and repair.');
