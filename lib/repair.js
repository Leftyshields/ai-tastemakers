/**
 * Repair flow (story 10): run path with optional retry per genome repair policy.
 * On failure, retries runPath up to maxRetries times (with optional delayMs), then returns with escalated.
 * No Repair node in the graph; uses aggregateHealth(root, overlay).organism.status.
 *
 * @example
 *   const { runPathWithRepair } = require('./lib/repair');
 *   const out = runPathWithRepair({ path: '.genome/mission.md' });
 *   // out.root, out.overlay, out.result, out.repaired?, out.escalated?, out.attemptCount?
 */

const { loadGenome } = require('./loadGenome');
const { runPath } = require('./run');
const { aggregateHealth } = require('./signaling');
const { parseRepairPolicy } = require('./repairPolicy');

/**
 * Synchronous delay (blocks the event loop). Use only for small delayMs (e.g. 0 in tests).
 * Capped at 30s to avoid accidental long blocks from misconfigured policy.
 * @param {number} ms
 */
function sleepSync(ms) {
  if (ms <= 0) return;
  const capped = Math.min(ms, 30000);
  const end = Date.now() + capped;
  while (Date.now() < end) {
    // busy-wait
  }
}

/**
 * Run one path with repair: on failure, retry up to policy maxRetries, then escalate.
 *
 * @param {{
 *   genomeDir?: string,
 *   path?: string,
 *   encoding?: string,
 *   repoRoot?: string
 * }} [options] - Same as runPath. Passed to each runPath call.
 * @param {((opts: object) => { root: object, overlay: object, result?: string|Buffer })|{ injectRunPath?: function, injectLoadGenome?: function }} [testInject] - Optional. For tests: injectRunPath substitutes runPath; injectLoadGenome substitutes loadGenome.
 * @returns {{
 *   root: object,
 *   overlay: object,
 *   result?: string|Buffer,
 *   repaired?: boolean,
 *   escalated?: boolean,
 *   attemptCount?: number,
 *   message?: string
 * }}
 */
function runPathWithRepair(options, testInject) {
  const injectRunPath = typeof testInject === 'function' ? testInject : testInject?.injectRunPath;
  const injectLoadGenome = typeof testInject === 'object' ? testInject?.injectLoadGenome : undefined;
  const runPathFn = injectRunPath || runPath;
  const genome = injectLoadGenome
    ? injectLoadGenome({ genomeDir: options?.genomeDir })
    : loadGenome({ genomeDir: options?.genomeDir });
  const policy = genome.repair_policy;
  const maxRetries = policy ? policy.maxRetries : 0;
  const delayMs = policy ? policy.delayMs : 0;

  let attempt = 0;
  const maxAttempts = 1 + maxRetries;

  while (true) {
    attempt += 1;
    const run = runPathFn(options);
    const health = aggregateHealth(run.root, run.overlay);

    if (health.organism.status === 'ok') {
      return {
        ...run,
        ...(attempt > 1 && { repaired: true }),
        ...(attempt > 1 && { escalated: false }),
        attemptCount: attempt,
      };
    }

    if (attempt >= maxAttempts) {
      return {
        ...run,
        repaired: attempt > 1,
        escalated: true,
        attemptCount: attempt,
        message: health.organism.message || 'retries exhausted',
      };
    }

    sleepSync(delayMs);
  }
}

module.exports = {
  runPathWithRepair,
  parseRepairPolicy,
};
