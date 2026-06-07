#!/usr/bin/env node
/**
 * Derive expression profiles from .genome/ and optionally emit to .genome/expression_profiles/.
 * Validates that every role id referenced in decomposition_rules and contracts exists in role_library.
 * Uses shared validation from lib/validateGenome.js (story 6).
 * Run from repo root: node scripts/derive-expression-profiles.js [--emit]
 * --emit: write markdown profile files to .genome/expression_profiles/
 * GENOME_DIR: optional env override for testing (default: .genome at repo root).
 */

const fs = require('fs');
const path = require('path');
const { validateGenome, readFile } = require('../lib/validateGenome');

const GENOME_DIR = process.env.GENOME_DIR || path.join(__dirname, '..', '.genome');

function main() {
  const emit = process.argv.includes('--emit');

  const result = validateGenome(GENOME_DIR);
  if (!result.valid) {
    result.errors.forEach((e) => console.error(e));
    process.exit(1);
  }

  console.log('Validation passed: all referenced role ids exist in role_library.');

  if (emit) {
    const outDir = path.join(GENOME_DIR, 'expression_profiles');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const mission = readFile(path.join(GENOME_DIR, 'mission.md')) || '';
    const constraints = readFile(path.join(GENOME_DIR, 'constraints.md')) || '';

    const write = (filename, body) => fs.writeFileSync(path.join(outDir, filename), body, 'utf8');

    write('organism.md', `# Organism expression profile\n\nDerived from .genome/ per EXPRESSION_DERIVATION.md.\n\n## Active subset\n\n- mission.md (full)\n- decomposition_rules.md (full)\n- constraints.md (full)\n- role_library/ (organs, tissues, cells, molecules)\n- contracts/ (all)\n`);
    write('organ-Build.md', `# Organ: Build expression profile\n\n- Mission slice: full (v1 single organ)\n- Decomposition: organs→tissues and below\n- Role library: Build (organs), Implementation (tissues), Worker (cells), read_file (molecules)\n- Contracts: Build → Implementation\n`);
    write('tissue-Implementation.md', `# Tissue: Implementation expression profile\n\n- Mission slice: full (v1)\n- Decomposition: tissues→cells, cells→molecules\n- Role library: Implementation (tissues), Worker (cells), read_file (molecules)\n- Contracts: Build → Implementation\n`);
    write('cell-Worker.md', `# Cell: Worker expression profile\n\n- Mission slice: full (v1)\n- Role library: Worker (cells), read_file (molecules)\n- Contracts: handoffs involving Worker\n`);
    write('molecule-read_file.md', `# Molecule: read_file expression profile\n\nSingle primitive definition only — see .genome/role_library/molecules.md section ## read_file\n`);

    console.log('Emitted profile files to .genome/expression_profiles/');
  }
}

main();
