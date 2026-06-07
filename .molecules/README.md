# Molecule library (primitives)

Atomic, permissioned primitives for the organism runtime. Each molecule has pre/post conditions, permissions, and audit.

## v1 primitives

- **read_file** — Read a file under the repository root. Paths must resolve under repo root; read-only; each invocation is audited.

## Invoking from repo root

```js
const { readFile } = require('./.molecules/lib/read_file.js');

const contents = readFile({ path: '.genome/mission.md' });
// or with encoding: readFile({ path: 'file.txt', encoding: 'utf8' });
// or Buffer: readFile({ path: 'file.bin', encoding: null });
```

Paths can be relative (to repo root) or absolute; they must resolve to a path **under** the repository root. Optional `repoRoot` overrides the default (e.g. `readFile({ path: 'x.txt', repoRoot: '/path/to/repo' })`).

## Audit

Each molecule invocation is logged to `.logs/audit.log` (created if missing). Format: one line per call, e.g. `molecule=read_file path=.genome/mission.md success=true ts=2025-03-14T...`. If `.logs/` is not writable, the same line is printed to stdout.

## Adding more primitives

Add a new file under `.molecules/lib/<name>.js` that:

- Exports a single function (or default export) with a clear options contract.
- Enforces preconditions and postconditions; documents permissions.
- Calls the audit helper after each invocation (success or failure).

See `.molecules/lib/read_file.js` and `.molecules/lib/audit.js` for the pattern. Role definitions live in `.genome/role_library/molecules.md`; implementations here fulfill those roles.
