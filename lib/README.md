# lib — Runtime support

Shared modules for organism loader, genome validation, and decomposition engine (story 6, 7 and downstream).

## loadGenome(options?)

Loads the genome from disk, validates minimum completeness, and returns an object of raw file contents (strings). Use this when you need a validated genome in memory (e.g. decomposition engine, defense organ).

- **Options:** `{ genomeDir?: string }` — optional. If omitted, uses `process.env.GENOME_DIR` or `.genome` under the current working directory.
- **Returns:** `{ mission, constraints, decomposition_rules, role_library: { organs, tissues, cells, molecules }, contracts: { handoffs } }` (all string values). May also include `repair_policy` (when `.genome/repair_policy.md` exists) and `guardrails` (when `.genome/guardrails.md` exists).
- **Throws:** If required files are missing or validation fails (referenced role ids not found in role_library). Message lists missing files and/or missing role ids.

Example:

```js
const { loadGenome } = require('./lib/loadGenome');
const genome = loadGenome();
// or: loadGenome({ genomeDir: '/path/to/.genome' });
```

## decompose(genome)

Decomposition engine (story 7): takes a **loaded genome** (the object returned by `loadGenome()`) and returns an organ/tissue/cell/molecule **instance graph**. No execution; output is data only. Downstream (signaling, execution, defense) use the graph to walk the hierarchy.

- **Argument:** `genome` — object returned by `loadGenome()`. Must have `decomposition_rules` (string). Engine does not read from disk.
- **Returns:** `{ root }` where `root` is the organism node. Each node has:
  - `id` — stable id (e.g. `organism`, `organ:Build`, `tissue:Implementation`, `cell:Worker`, `molecule:read_file`)
  - `layer` — `organism` | `organ` | `tissue` | `cell` | `molecule`
  - `roleId` — role id from the role library (string), or `null` for organism
  - `children` — array of child nodes (empty for molecule)
- **Throws:** If `genome` is missing, `genome.decomposition_rules` is missing/empty, or the "Example chain" in decomposition_rules cannot be parsed (expected **Organ:**, **Tissue:**, **Cell:**, **Molecule:**).

Molecule nodes carry `roleId` only (e.g. `read_file`); no implementation path. Story 9 resolves the implementation when executing.

Example:

```js
const { loadGenome } = require('./lib/loadGenome');
const { decompose } = require('./lib/decompose');
const genome = loadGenome();
const { root } = decompose(genome);
// root.id === 'organism', root.children[0].roleId === 'Build'
// root.children[0].children[0].roleId === 'Implementation'
// ... down to molecule with roleId 'read_file', children: []
```

## Signaling and health aggregation (story 8)

Status and health flow bottom-up: use a **status overlay** (keyed by node id) to record status; the graph from `decompose()` stays read-only. Story 9 (execution) writes into the overlay; story 10 (Repair) reads via `aggregateHealth()`.

### createStatusOverlay()

Returns a new empty overlay (plain object) for storing status by node id. Caller owns it; typically one overlay per run.

```js
const { createStatusOverlay, setNodeStatus, aggregateHealth } = require('./lib/signaling');
const overlay = createStatusOverlay();
```

### setNodeStatus(overlay, nodeId, payload)

Records status for a node. **Payload shape:** `{ status: 'ok' | 'failed', message?: string }`. Does not validate that `nodeId` exists in the graph (v1).

```js
setNodeStatus(overlay, 'molecule:read_file', { status: 'ok' });
setNodeStatus(overlay, 'molecule:read_file', { status: 'failed', message: 'ENOENT' });
```

### aggregateHealth(root, overlay)

Walks the instance tree bottom-up: leaf nodes use the overlay entry or default `{ status: 'ok' }`; parent nodes are `failed` if any child is `failed`, else `ok`. Returns organism-level summary and organ-level health.

**Returns:**

- `organism`: `{ status: 'ok' | 'failed', message?, organs }` — organism-level summary; `organs` is the same array as below.
- `organs`: array of `{ id, status, message?, childrenFailed? }` — one entry per organ node.

```js
const genome = loadGenome();
const { root } = decompose(genome);
const overlay = createStatusOverlay();
setNodeStatus(overlay, 'molecule:read_file', { status: 'failed', message: 'timeout' });
const health = aggregateHealth(root, overlay);
// health.organism.status === 'failed'
// health.organs[0].id === 'organ:Build', health.organs[0].status === 'failed'
```

Graph is from `decompose(loadGenome())` and is read-only; the overlay is caller-owned and in-memory only.

## runPath(options?) — run one path end-to-end (story 9)

Runs one full path: load genome → decompose → create overlay → walk to leaf molecule → resolve implementation → invoke molecule → set molecule node status in overlay. Returns `{ root, overlay, result? }`.

- **Options:** `{ genomeDir?: string, path?: string, encoding?: string, repoRoot?: string }`. `genomeDir` passed to loadGenome. For the read_file molecule: `path` (file to read; default `.genome/mission.md`), `encoding`, `repoRoot` (default `process.cwd()`).
- **Returns:** `{ root, overlay, result? }` — `root` is the organism node; `overlay` is the status overlay (molecule node set to ok/failed); `result` is the molecule return value (e.g. file contents) or undefined if invocation failed. When the run is **blocked by guardrails** (story 11), the return also includes `blocked: true` and `violationReason`; the molecule node is set to failed and no molecule is invoked.
- **RoleId → implementation:** Molecule roleId (e.g. `read_file`) maps to `.molecules/lib/<roleId>.js` under repo root. For read_file, the module exports `readFile(options)` and is invoked with `{ path, encoding?, repoRoot? }`.
- The runner sets only the **molecule node** in the overlay; parent health is derived by calling `aggregateHealth(root, overlay)` (see Signaling above).

Example:

```js
const { runPath } = require('./lib/run');
const { aggregateHealth } = require('./lib/signaling');
const { root, overlay, result } = runPath({ path: '.genome/mission.md' });
// overlay['molecule:read_file'].status === 'ok'; result is file contents
const health = aggregateHealth(root, overlay);
// health.organism.status, health.organs
```

CLI: `node scripts/run-path.js [path]` runs the path and prints ok/failed (and a short result preview on success).

## Guardrails (story 11)

Guardrails run at the **start of runPath** (after loadGenome, before path execution). Requests are checked against genome-derived policy; violations are blocked and audited. No Defense node in the graph—guardrails are a lib flow (like Repair).

- **Request (checked):** runPath options: `path`, `genomeDir`, `repoRoot`. The `path` option (resolved against `repoRoot`) must be under the repo root and under one of the **allowed path prefixes**.
- **Path allowlist:** Default when `.genome/guardrails.md` is missing: only paths under `.genome/` are allowed. Optional **`.genome/guardrails.md`**: one line `allowed_path_prefix: .genome/,.molecules/` (comma-separated prefixes). The loader attaches `genome.guardrails` when the file exists; otherwise the guardrails module uses the default allowlist in code.
- **When blocked:** `runPath` returns `{ root, overlay, result: undefined, blocked: true, violationReason }`; the molecule node is set to failed in the overlay; the molecule is not invoked. Each violation is appended to **`.logs/guardrails.log`** in the form: `violation=<constraint_id> request_summary=<short> reason=<short> ts=<ISO8601>`.
- **runPathWithRepair:** Uses the same `runPath`, so each attempt is checked by guardrails; a blocked request returns that result (retries will hit the same check).

## Repair policy and runPathWithRepair (story 10)

Repair is a **lib flow** (no Repair organ/tissue in the decomposition graph). When the path fails, the repair flow can retry `runPath` up to a genome-defined limit, then escalate (return value only).

### Repair policy (optional)

- **Location:** `.genome/repair_policy.md` (optional). If missing, no retries (single run).
- **Format:** Plain text with one key per line: `max_retries: <number>`, `delay_ms: <number>`. Order irrelevant. Missing keys default to 0. Parsed via `parseRepairPolicy` (in `lib/repairPolicy.js`); loader attaches `genome.repair_policy` as `{ maxRetries, delayMs }` when the file exists.
- **Validation:** Optional. If `validateGenome` runs and the file exists, it may validate non-negative values; errors are appended but do not set `valid: false`.

### runPathWithRepair(options?)

Runs one path with repair: calls `runPath(options)`; if `aggregateHealth(root, overlay).organism.status === 'failed'` and policy allows, retries up to `maxRetries` (with optional `delayMs` between attempts), then returns. Escalation is via return value only (`escalated: true`); no throw, file write, or callback.

- **Options:** Same as `runPath`: `{ genomeDir?, path?, encoding?, repoRoot? }`. Passed to each `runPath` call.
- **Returns:** Same as `runPath` (`root`, `overlay`, `result?`) plus: `repaired?` (true if at least one retry was attempted), `escalated?` (true when retries exhausted and still failed), `attemptCount?`, `message?` (e.g. when escalated).
- **Health used:** `aggregateHealth(root, overlay).organism.status` only (organ-level).

```js
const { runPathWithRepair } = require('./lib/repair');
const out = runPathWithRepair({ path: '.genome/mission.md' });
// out.root, out.overlay, out.result; out.repaired, out.escalated, out.attemptCount
```

## validateGenome(genomeDir?)

Validation-only: checks that required genome files exist and every role id referenced in `decomposition_rules.md` and contracts exists in the corresponding `role_library` file. Used by the loader and by `scripts/derive-expression-profiles.js`.

- **Argument:** Optional `genomeDir`. If omitted, uses `process.env.GENOME_DIR` or `path.join(process.cwd(), '.genome')`.
- **Returns:** `{ valid: boolean, errors: string[] }`.

Required files under the genome directory:

- `mission.md`, `constraints.md`, `decomposition_rules.md`
- `role_library/organs.md`, `role_library/tissues.md`, `role_library/cells.md`, `role_library/molecules.md`
- `contracts/handoffs.md`

## GENOME_DIR

Set `GENOME_DIR` to point at a genome directory (e.g. for tests or alternate genomes). Same convention as `scripts/derive-expression-profiles.js`.
