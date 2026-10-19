'use strict';

/**
 * Genesis workflow orchestrator — mode flags, run state, and test execution.
 *
 * Mode resolution (high → low priority):
 *   1. CLI --interactive (wins if both --interactive and --autonomous are passed)
 *   2. CLI --autonomous
 *   3. ENV GENESIS_AUTONOMOUS=true|1|yes
 *   4. default: interactive
 *
 * Re-init: same mode updates issue_id (from capture) and reflect (--reflect only).
 * Mid-run takeover: `init --autonomous` upgrades an interactive run (preserves steps).
 * Delete .ai/context/run_config.json to start fresh or downgrade autonomous → interactive.
 *
 * Usage:
 *   node scripts/genesis-run.js init [--autonomous|--interactive] [--reflect]
 *   node scripts/genesis-run.js status
 *   node scripts/genesis-run.js validate-gate <step>
 *   node scripts/genesis-run.js step-complete <name> [--artifacts path,...]
 *   node scripts/genesis-run.js halt <step> <reason>
 *   node scripts/genesis-run.js test [--attempt N] [--remediation]
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const {
  appendDecisionRow,
  appendRunStartRow,
  logStepComplete,
  DECISIONS_REL,
} = require('./decision-log.js');

const CONTEXT_DIR = '.ai/context';
const RUN_CONFIG_FILE = 'run_config.json';
const TEST_RESULTS_FILE = 'test_results.json';

/** Canonical nine-step order (must match genesis_run.md). */
const STEP_ORDER = [
  'capture',
  'explore',
  'design_decisions',
  'create_plan',
  'pre_implementation_checklist',
  'execute_plan',
  'code_review',
  'qa',
  'postmortem',
];

/** Required artifact paths (relative to repo root) per step. */
const STEP_ARTIFACTS = {
  capture: ['.ai/context/last_capture.md'],
  explore: ['.ai/context/last_explore.md'],
  design_decisions: ['.ai/context/design_decisions.md'],
  create_plan: ['.ai/context/last_plan.md'],
  pre_implementation_checklist: ['.ai/context/pre_implementation_result.md'],
  code_review: ['.ai/context/code_review_changelog.md'],
  qa: ['.ai/context/test_results.json'],
  postmortem: [], // issue-scoped; validated via --artifacts only
};

/** @param {string[]} argv @param {NodeJS.ProcessEnv} env */
function resolveMode(argv, env) {
  if (argv.includes('--interactive')) return 'interactive';
  if (argv.includes('--autonomous')) return 'autonomous';
  const val = String(env.GENESIS_AUTONOMOUS || '')
    .trim()
    .toLowerCase();
  if (val === 'true' || val === '1' || val === 'yes') return 'autonomous';
  return 'interactive';
}

function contextDir(repoRoot) {
  return path.join(repoRoot, CONTEXT_DIR);
}

function contextPath(repoRoot, ...parts) {
  return path.join(contextDir(repoRoot), ...parts);
}

/** @param {string} repoRoot */
function readRunConfig(repoRoot) {
  const filePath = contextPath(repoRoot, RUN_CONFIG_FILE);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    throw new Error(`Invalid ${RUN_CONFIG_FILE}: ${err.message}`);
  }
}

/** @param {string} repoRoot @param {object} config */
function writeRunConfig(repoRoot, config) {
  fs.mkdirSync(contextDir(repoRoot), { recursive: true });
  fs.writeFileSync(
    contextPath(repoRoot, RUN_CONFIG_FILE),
    `${JSON.stringify(config, null, 2)}\n`,
    'utf-8'
  );
}

/** @param {string} repoRoot */
function parseIssueIdFromCapture(repoRoot) {
  const capturePath = contextPath(repoRoot, 'last_capture.md');
  if (!fs.existsSync(capturePath)) return null;
  const content = fs.readFileSync(capturePath, 'utf-8');
  const match = content.match(/^# Issue ID\s*\r?\n(.+)/m);
  return match ? match[1].trim() : null;
}

/** @param {string} repoRoot @param {string[]} artifacts */
function validateArtifactsExist(repoRoot, artifacts) {
  const missing = [];
  for (const artifact of artifacts) {
    const full = path.isAbsolute(artifact) ? artifact : path.join(repoRoot, artifact);
    if (!fs.existsSync(full)) missing.push(artifact);
  }
  return missing;
}

/** @param {object | null} config */
function expectedNextStep(config) {
  if (!config || !config.steps.length) return STEP_ORDER[0];
  const last = config.steps[config.steps.length - 1].name;
  const idx = STEP_ORDER.indexOf(last);
  if (idx === -1) return null;
  return STEP_ORDER[idx + 1] ?? null;
}

/**
 * @param {string} repoRoot
 * @param {string} stepName
 * @param {{ artifacts?: string[], requireOrder?: boolean }} options
 */
function validateStepGate(repoRoot, stepName, options = {}) {
  if (!STEP_ORDER.includes(stepName)) {
    throw new Error(`Unknown step: ${stepName}`);
  }

  const config = readRunConfig(repoRoot);
  const required = STEP_ARTIFACTS[stepName] || [];
  const artifacts = options.artifacts?.length ? options.artifacts : required;
  const missing = validateArtifactsExist(repoRoot, artifacts);

  if (options.requireOrder !== false && config) {
    const next = expectedNextStep(config);
    if (next && next !== stepName) {
      throw new Error(`Step order violation: expected "${next}", got "${stepName}"`);
    }
  }

  if (stepName === 'capture') {
    const issueId = parseIssueIdFromCapture(repoRoot);
    if (!issueId) {
      missing.push('last_capture.md#Issue ID');
    }
  }

  if (stepName === 'create_plan' && !missing.includes('.ai/context/last_plan.md')) {
    const planPath = contextPath(repoRoot, 'last_plan.md');
    if (fs.existsSync(planPath)) {
      const captureId = parseIssueIdFromCapture(repoRoot);
      const planContent = fs.readFileSync(planPath, 'utf-8');
      const planMatch = planContent.match(/^# Issue ID\s*\r?\n(.+)/m);
      const planId = planMatch ? planMatch[1].trim() : null;
      if (captureId && planId && captureId !== planId) {
        throw new Error(`Issue ID mismatch: capture=${captureId}, plan=${planId}`);
      }
    }
  }

  return { valid: missing.length === 0, missing, step: stepName };
}

/**
 * @param {string} repoRoot
 * @param {{ mode?: string, reflect?: boolean, issueId?: string | null, runId?: string, force?: boolean }} options
 */
function initRun(repoRoot, options = {}) {
  const mode = options.mode || 'interactive';
  const existing = readRunConfig(repoRoot);

  if (existing && existing.mode !== mode) {
    if (existing.mode === 'interactive' && mode === 'autonomous' && !existing.halted) {
      existing.mode = 'autonomous';
      existing.mode_engaged_at = new Date().toISOString();
      const issueId =
        options.issueId !== undefined ? options.issueId : parseIssueIdFromCapture(repoRoot);
      if (issueId != null) existing.issue_id = issueId;
      if (options.reflect === true) existing.reflect = true;
      writeRunConfig(repoRoot, existing);
      appendDecisionRow(
        repoRoot,
        'start',
        'autonomous takeover mid run',
        'user engaged autonomous without restarting genesis steps',
        `run_id:${existing.run_id}`,
        'open'
      );
      return existing;
    }
    throw new Error(
      `Run already initialized with mode "${existing.mode}"; cannot change to "${mode}". ` +
        'From interactive, use `init --autonomous` for mid-run takeover. ' +
        'Delete .ai/context/run_config.json to reset.'
    );
  }

  if (existing && !options.force) {
    if (options.reflect === true) existing.reflect = true;
    const issueId =
      options.issueId !== undefined ? options.issueId : parseIssueIdFromCapture(repoRoot);
    if (issueId != null) existing.issue_id = issueId;
    writeRunConfig(repoRoot, existing);
    return existing;
  }

  const issueId =
    options.issueId !== undefined ? options.issueId : parseIssueIdFromCapture(repoRoot);

  const config = {
    run_id: options.runId || `run-${Date.now()}`,
    issue_id: issueId,
    mode,
    reflect: options.reflect === true,
    started_at: existing?.started_at || new Date().toISOString(),
    steps: existing?.steps || [],
    halted: false,
    halt_step: null,
    halt_reason: null,
  };

  writeRunConfig(repoRoot, config);
  if (!existing || config.steps.length === 0) {
    appendRunStartRow(repoRoot, { runId: config.run_id });
  }
  return config;
}

/**
 * @param {string} repoRoot
 * @param {string} stepName
 * @param {string[]} artifacts
 * @param {{ skipGateCheck?: boolean }} options
 */
function stepComplete(repoRoot, stepName, artifacts = [], options = {}) {
  const config = readRunConfig(repoRoot);
  if (!config) {
    throw new Error('run_config.json missing; run `genesis-run.js init` first');
  }
  if (config.halted) {
    throw new Error(`Run halted at ${config.halt_step}: ${config.halt_reason}`);
  }

  const next = expectedNextStep(config);
  if (next && next !== stepName) {
    throw new Error(`Step order violation: expected "${next}", got "${stepName}"`);
  }

  if (!options.skipGateCheck) {
    const gateArtifacts =
      artifacts.length > 0 ? artifacts : STEP_ARTIFACTS[stepName] || [];
    const gate = validateStepGate(repoRoot, stepName, {
      artifacts: gateArtifacts,
      requireOrder: false,
    });
    if (!gate.valid) {
      throw new Error(`Step gate failed for "${stepName}": missing ${gate.missing.join(', ')}`);
    }
  }

  const recordedArtifacts = artifacts.length ? artifacts : STEP_ARTIFACTS[stepName] || [];

  config.steps.push({
    name: stepName,
    status: 'completed',
    completed_at: new Date().toISOString(),
    artifacts: recordedArtifacts,
  });

  writeRunConfig(repoRoot, config);
  logStepComplete(repoRoot, stepName, recordedArtifacts);
  return config;
}

/** @param {string} repoRoot @param {string} step @param {string} reason */
function haltRun(repoRoot, step, reason) {
  const config = readRunConfig(repoRoot) || {
    run_id: null,
    issue_id: null,
    mode: 'interactive',
    reflect: false,
    started_at: new Date().toISOString(),
    steps: [],
  };

  config.halted = true;
  config.halt_step = step;
  config.halt_reason = reason;
  writeRunConfig(repoRoot, config);
  return config;
}

/**
 * Run npm test without shell (testCommand must be exactly "npm test").
 * @param {string} repoRoot
 * @param {{ attempt?: number, remediationAttempted?: boolean, testCommand?: string }} options
 */
function runTests(repoRoot, options = {}) {
  const attempt = options.attempt || 1;
  const testCommand = options.testCommand || 'npm test';
  if (testCommand !== 'npm test') {
    throw new Error('Only "npm test" is supported for testCommand');
  }

  const logFile = contextPath(repoRoot, `test_attempt_${attempt}.log`);
  fs.mkdirSync(contextDir(repoRoot), { recursive: true });

  const result = spawnSync('npm', ['test'], {
    cwd: repoRoot,
    encoding: 'utf-8',
    shell: false,
  });

  const exitCode = result.status ?? 1;
  const output = `${result.stdout || ''}${result.stderr || ''}`;
  fs.writeFileSync(logFile, output, 'utf-8');

  const resultsPath = contextPath(repoRoot, TEST_RESULTS_FILE);
  /** @type {{ command: string, attempts: object[], remediation_attempted: boolean, final_passed: boolean }} */
  let results = {
    command: testCommand,
    attempts: [],
    remediation_attempted: false,
    final_passed: false,
  };

  if (fs.existsSync(resultsPath)) {
    try {
      results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
    } catch {
      /* start fresh */
    }
  }

  results.command = testCommand;
  results.attempts.push({
    attempt,
    exit_code: exitCode,
    passed: exitCode === 0,
    log_file: path.relative(repoRoot, logFile),
  });
  results.final_passed = exitCode === 0;
  if (options.remediationAttempted) {
    results.remediation_attempted = true;
  }

  fs.writeFileSync(resultsPath, `${JSON.stringify(results, null, 2)}\n`, 'utf-8');

  return { exitCode, passed: exitCode === 0, results };
}

/** @param {string} repoRoot */
function getStatus(repoRoot) {
  return readRunConfig(repoRoot);
}

function printUsage() {
  console.log(`Usage:
  node scripts/genesis-run.js init [--autonomous|--interactive] [--reflect]
  node scripts/genesis-run.js status
  node scripts/genesis-run.js validate-gate <step>
  node scripts/genesis-run.js step-complete <name> [--artifacts path,...]
  node scripts/genesis-run.js halt <step> <reason>
  node scripts/genesis-run.js test [--attempt N] [--remediation]
  node scripts/genesis-run.js log-decision <phase> <decision> <why> <evidence> <result>

Environment:
  GENESIS_AUTONOMOUS=true|1|yes  Enable autonomous mode when CLI flag omitted

Re-init: same mode updates issue_id and --reflect.
Mid-run: init --autonomous upgrades interactive (keeps steps). Delete run_config.json to reset.`);
}

/** @param {string[]} argv */
function parseArtifactsArg(argv) {
  const idx = argv.indexOf('--artifacts');
  if (idx === -1 || !argv[idx + 1]) return [];
  return argv[idx + 1].split(',').map((s) => s.trim()).filter(Boolean);
}

if (require.main === module) {
  const repoRoot = process.cwd();
  const argv = process.argv.slice(2);
  const cmd = argv[0];

  try {
    if (!cmd || cmd === '--help' || cmd === '-h') {
      printUsage();
      process.exit(cmd ? 0 : 1);
    }

    if (cmd === 'init') {
      const mode = resolveMode(argv, process.env);
      const reflect = argv.includes('--reflect');
      const config = initRun(repoRoot, { mode, reflect: reflect ? true : undefined });
      console.log(JSON.stringify(config, null, 2));
    } else if (cmd === 'status') {
      const config = getStatus(repoRoot);
      if (!config) {
        console.error('No run_config.json found');
        process.exit(1);
      }
      console.log(JSON.stringify(config, null, 2));
    } else if (cmd === 'validate-gate') {
      const stepName = argv[1];
      if (!stepName) {
        throw new Error('validate-gate requires a step name');
      }
      const artifacts = parseArtifactsArg(argv);
      const gate = validateStepGate(repoRoot, stepName, {
        artifacts: artifacts.length ? artifacts : undefined,
      });
      console.log(JSON.stringify(gate, null, 2));
      process.exit(gate.valid ? 0 : 1);
    } else if (cmd === 'step-complete') {
      const stepName = argv[1];
      if (!stepName) {
        throw new Error('step-complete requires a step name');
      }
      const artifacts = parseArtifactsArg(argv);
      const config = stepComplete(repoRoot, stepName, artifacts);
      console.log(JSON.stringify(config, null, 2));
    } else if (cmd === 'halt') {
      const step = argv[1];
      const reason = argv.slice(2).join(' ');
      if (!step || !reason) {
        throw new Error('halt requires <step> and <reason>');
      }
      const config = haltRun(repoRoot, step, reason);
      console.log(JSON.stringify(config, null, 2));
      process.exit(1);
    } else if (cmd === 'log-decision') {
      const phase = argv[1];
      const decision = argv[2];
      const why = argv[3];
      const evidence = argv[4];
      const result = argv[5];
      if (!phase || !decision || !why || !evidence || !result) {
        throw new Error(
          'log-decision requires <phase> <decision> <why> <evidence> <result>'
        );
      }
      appendDecisionRow(repoRoot, phase, decision, why, evidence, result);
      console.log(JSON.stringify({ logged: true, file: DECISIONS_REL }, null, 2));
    } else if (cmd === 'test') {
      let attempt = 1;
      const attemptIdx = argv.indexOf('--attempt');
      if (attemptIdx !== -1 && argv[attemptIdx + 1]) {
        attempt = Number(argv[attemptIdx + 1]);
      }
      const result = runTests(repoRoot, {
        attempt,
        remediationAttempted: argv.includes('--remediation'),
      });
      console.log(JSON.stringify(result.results, null, 2));
      process.exit(result.passed ? 0 : 1);
    } else {
      throw new Error(`Unknown command: ${cmd}`);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = {
  resolveMode,
  initRun,
  stepComplete,
  haltRun,
  runTests,
  getStatus,
  readRunConfig,
  writeRunConfig,
  parseIssueIdFromCapture,
  validateStepGate,
  validateArtifactsExist,
  expectedNextStep,
  parseArtifactsArg,
  appendDecisionRow,
  appendRunStartRow,
  logStepComplete,
  STEP_ORDER,
  STEP_ARTIFACTS,
  CONTEXT_DIR,
  RUN_CONFIG_FILE,
  TEST_RESULTS_FILE,
  DECISIONS_REL,
};
