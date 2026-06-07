#!/usr/bin/env node
/**
 * Run one path end-to-end (Build → tissue → cell → molecule). Default path: .genome/mission.md.
 * Usage: node scripts/run-path.js [path]
 * Example: node scripts/run-path.js .genome/mission.md
 */

const path = require('path');
const { runPath } = require('../lib/run');

const filePath = process.argv[2] || '.genome/mission.md';
const repoRoot = path.join(__dirname, '..');

const { overlay, result } = runPath({ path: filePath, repoRoot });

const moleculeId = 'molecule:read_file';
const status = overlay[moleculeId] ? overlay[moleculeId].status : 'unknown';
const message = overlay[moleculeId] && overlay[moleculeId].message;

if (status === 'ok') {
  console.log('ok');
  if (result !== undefined) {
    const preview = typeof result === 'string' ? result.slice(0, 200) : `<${typeof result} ${result?.length ?? 0} bytes>`;
    console.log(preview + (result && result.length > 200 ? '...' : ''));
  }
} else {
  console.log('failed');
  if (message) console.error(message);
  process.exitCode = 1;
}
