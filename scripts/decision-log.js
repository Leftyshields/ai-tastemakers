'use strict';

/**
 * Append only decision trail (TSV) for Genesis autonomous runs.
 * Columns: ts, phase, decision, why, evidence, result
 */

const fs = require('fs');
const path = require('path');

const DECISIONS_REL = '.ai/context/decisions.tsv';
const HEADER = 'ts\tphase\tdecision\twhy\tevidence\tresult\n';

/** @param {string} value */
function cleanCell(value) {
  const v = String(value ?? '')
    .replace(/\t/g, ' ')
    .replace(/\r?\n/g, ' ')
    .trim();
  if (/^[=+\-@"]/.test(v)) {
    return `'${v}`;
  }
  return v;
}

/** @param {string} repoRoot */
function decisionsPath(repoRoot) {
  return path.join(repoRoot, DECISIONS_REL);
}

/** @param {string} repoRoot */
function ensureLogFile(repoRoot) {
  const filePath = decisionsPath(repoRoot);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
    fs.writeFileSync(filePath, HEADER, 'utf-8');
  }
}

/**
 * @param {string} repoRoot
 * @param {string} phase
 * @param {string} decision
 * @param {string} why
 * @param {string} evidence
 * @param {string} result
 */
function appendDecisionRow(repoRoot, phase, decision, why, evidence, result) {
  ensureLogFile(repoRoot);
  const ts = new Date().toISOString();
  const row = [
    ts,
    cleanCell(phase),
    cleanCell(decision),
    cleanCell(why),
    cleanCell(evidence),
    cleanCell(result),
  ].join('\t');
  fs.appendFileSync(decisionsPath(repoRoot), `${row}\n`, 'utf-8');
}

/**
 * @param {string} repoRoot
 * @param {{ runId?: string | null }} options
 */
function appendRunStartRow(repoRoot, options = {}) {
  const runId = options.runId || 'unknown';
  appendDecisionRow(
    repoRoot,
    'start',
    'genesis run initialized',
    'decision trail marks boundary for this run',
    `run_id:${runId}`,
    'open'
  );
}

/**
 * Parse ### UX tradeoff blocks from design_decisions.md into trail rows.
 * @param {string} repoRoot
 */
function ingestUxTradeoffsFromDesign(repoRoot) {
  const designPath = path.join(repoRoot, '.ai/context/design_decisions.md');
  if (!fs.existsSync(designPath)) return 0;
  const content = fs.readFileSync(designPath, 'utf-8');
  const blocks = content.split(/^### UX tradeoff:/m).slice(1);
  let count = 0;
  for (const block of blocks) {
    const titleLine = block.split('\n')[0]?.trim() || 'ux decision';
    const body = block.trim();
    const decisionLine =
      body.match(/^Decision:\s*(.+)$/m)?.[1]?.trim() ||
      body.match(/^Governing law\(s\):\s*(.+)$/m)?.[1]?.trim() ||
      titleLine;
    const whyLine =
      body.match(/^Rejected:\s*(.+)$/m)?.[1]?.trim() ||
      body.match(/^Conflict:\s*(.+)$/m)?.[1]?.trim() ||
      'ux laws skill autonomous default';
    appendDecisionRow(
      repoRoot,
      'design_decisions',
      `UX tradeoff ${titleLine}`,
      whyLine,
      '.ai/context/design_decisions.md',
      decisionLine
    );
    count += 1;
  }
  return count;
}

/**
 * @param {string} repoRoot
 * @param {string} stepName
 * @param {string[]} artifacts
 */
function logStepComplete(repoRoot, stepName, artifacts) {
  const evidence = artifacts.length ? artifacts.join(',') : 'none';
  appendDecisionRow(
    repoRoot,
    stepName,
    `completed genesis step ${stepName}`,
    'step gate passed and artifacts recorded',
    evidence,
    'completed'
  );
  if (stepName === 'design_decisions') {
    ingestUxTradeoffsFromDesign(repoRoot);
  }
}

module.exports = {
  DECISIONS_REL,
  HEADER,
  cleanCell,
  decisionsPath,
  ensureLogFile,
  appendDecisionRow,
  appendRunStartRow,
  ingestUxTradeoffsFromDesign,
  logStepComplete,
};
