# Expression Profile Derivation

This document defines how to derive the **active genome subset** (expression profile) for each layer of the organism: organism, organ, tissue, cell, and molecule. The organism loader (story 6) and any tooling that needs a per-layer view of the genome use these rules.

**Purpose:** From the existing `.genome/` (mission, decomposition_rules, role_library, contracts), determine unambiguously what each layer "expresses"—what mission slice, which decomposition rules, which role library entries, and which contracts apply. Derivation is by **layer** and, for organ/tissue/cell/molecule, by **instance id** (e.g. organ:Build, tissue:Implementation).

**Inputs (genome layout):**

- `.genome/mission.md` — mission (objectives, success criteria, out-of-scope)
- `.genome/constraints.md` — global constraints
- `.genome/decomposition_rules.md` — how organism → organs → tissues → cells → molecules decompose
- `.genome/role_library/organs.md` — organ roles (each with id, purpose, composition, etc.)
- `.genome/role_library/tissues.md` — tissue roles
- `.genome/role_library/cells.md` — cell roles
- `.genome/role_library/molecules.md` — molecule (primitive) roles
- `.genome/contracts/` — handoff contracts (e.g. `handoffs.md`), referencing role ids

**Layer + instance:** For organism there is a single profile. For organ, tissue, cell, and molecule, each **instance** (e.g. the organ named "Build") has its own profile derived from the same rules applied to that instance id.

---

## Organism profile

**Layer:** organism (single instance).

**Active subset:**

- **Mission:** Full contents of `.genome/mission.md`.
- **Decomposition rules:** Full contents of `.genome/decomposition_rules.md`.
- **Constraints:** Full contents of `.genome/constraints.md`.
- **Role library:** All four files — `.genome/role_library/organs.md`, `tissues.md`, `cells.md`, `molecules.md`.
- **Contracts:** All files under `.genome/contracts/` (e.g. `handoffs.md`).

The organism sees the entire genome; no filtering. It uses this to orchestrate organs and apply global policy.

---

## Organ profile (layer + instance)

**Layer:** organ. **Instance id:** an organ role id from `role_library/organs.md` (e.g. `Build`).

**How to resolve "this organ's" tissues, cells, and molecules:**

1. Open `.genome/role_library/organs.md` and find the section for the instance id (e.g. `## Build`).
2. Read the **composition** field (e.g. "Contains tissues (e.g. Implementation)").
3. The tissues belonging to this organ are the role ids named in that composition (and/or in `.genome/decomposition_rules.md` under "Organs → Tissues" for this organ). Resolve similarly for cells and molecules by walking composition in `tissues.md` and `cells.md`.

**Active subset for organ:*instance_id* (e.g. organ:Build):**

- **Mission slice:**  
  - **v1 rule:** When the genome has **exactly one** organ defined in `role_library/organs.md`, use the **full mission** (entire `.genome/mission.md`).  
  - **Extension (multi-organ):** When multiple organs exist, the mission slice for an organ is the subset of mission relevant to that organ's capability (e.g. filter by organ purpose); exact filtering is defined in a later iteration.
- **Decomposition rules:** All of `.genome/decomposition_rules.md` that apply to organs → tissues and below (i.e. organs→tissues, tissues→cells, cells→molecules). Full file is acceptable in v1 since rules are short.
- **Role library entries:**  
  - This organ's own entry from `role_library/organs.md`.  
  - Entries for this organ's tissues from `role_library/tissues.md` (from composition).  
  - Entries for those tissues' cells from `role_library/cells.md`.  
  - Entries for those cells' molecules from `role_library/molecules.md`.
- **Contracts:** Every handoff in `.genome/contracts/` where **From** is this organ (e.g. Build → Implementation), plus any handoffs between this organ's tissues/cells if documented in contracts.

---

## Tissue profile (layer + instance)

**Layer:** tissue. **Instance id:** a tissue role id from `role_library/tissues.md` (e.g. `Implementation`).

**How to resolve "this tissue's" cells and molecules:**

1. Open `.genome/role_library/tissues.md` and find the section for the instance id (e.g. `## Implementation`).
2. Read the **composition** field (e.g. "Contains cells (e.g. Worker)").
3. The cells belonging to this tissue are the role ids named there (and/or in decomposition_rules). Resolve molecules from `role_library/cells.md` composition for those cells.

**Active subset for tissue:*instance_id* (e.g. tissue:Implementation):**

- **Mission slice:**  
  - **v1 rule:** When the genome has exactly one organ and one tissue (or this tissue is the only one under its organ), use the same mission slice as the parent organ — in v1 that is the full mission.  
  - **Extension:** With multiple tissues, mission slice can be refined by tissue function.
- **Decomposition rules:** The parts of `.genome/decomposition_rules.md` for tissues → cells and cells → molecules (full file acceptable in v1).
- **Role library entries:**  
  - This tissue's own entry from `role_library/tissues.md`.  
  - Entries for this tissue's cells from `role_library/cells.md`.  
  - Entries for those cells' molecules from `role_library/molecules.md`.
- **Contracts:** Every handoff where this tissue is **From** or **To** (e.g. Build → Implementation, or Implementation → Worker if present).

---

## Cell profile (layer + instance)

**Layer:** cell. **Instance id:** a cell role id from `role_library/cells.md` (e.g. `Worker`).

**How to resolve "allowed molecules":**

1. Open `.genome/role_library/cells.md` and find the section for the instance id (e.g. `## Worker`).
2. Read the **composition** field (e.g. "Invokes molecules (e.g. read_file)").
3. The allowed molecules for this cell are the molecule role ids named there.

**Active subset for cell:*instance_id* (e.g. cell:Worker):**

- **Mission slice:** Mission slice for this cell's role — in v1 (single chain) same as the tissue (full mission). Extension: can be narrowed by cell role purpose.
- **Role library entries:**  
  - This cell's own entry from `role_library/cells.md`.  
  - Entries for each allowed molecule from `role_library/molecules.md` (from composition).
- **Contracts:** Handoffs that involve this cell (e.g. tissue → cell handoff format, or molecule invocation contract if documented).
- **Health / adaptation:** Any health or adaptation boundaries stated in this cell's role entry (in `cells.md`).

---

## Molecule profile (per primitive)

**Layer:** molecule. **Instance id:** a molecule (primitive) role id from `role_library/molecules.md` (e.g. `read_file`).

**Active subset for molecule:*instance_id* (e.g. molecule:read_file):**

- **Single primitive definition only:** The contents of that molecule's entry in `.genome/role_library/molecules.md` — the section for that id (e.g. `## read_file`). Include: id, purpose, inputs, outputs, preconditions, postconditions, permissions, and any other fields present.
- **No decomposition below molecule.** The molecule does not see mission, decomposition rules, or other roles; only its own definition.

---

## Validation

**Rule:** Every role id referenced in `.genome/decomposition_rules.md` or in any file under `.genome/contracts/` must exist in the corresponding role library file.

- **Organs** mentioned in decomposition_rules or as "From"/"To" in contracts must have an entry in `.genome/role_library/organs.md`.
- **Tissues** must exist in `.genome/role_library/tissues.md`.
- **Cells** must exist in `.genome/role_library/cells.md`.
- **Molecules** must exist in `.genome/role_library/molecules.md`.

A script or the organism loader (story 6) should:

1. Parse all role ids from `decomposition_rules.md` and from each contract (From, To, and any named roles).
2. For each id, verify that the corresponding `role_library` file contains a section (e.g. `## Build`) for that id.
3. Report any missing ids (e.g. to stdout or as a list) and **exit with a non-zero status** if any are missing, so that invalid genomes are not used.

---

## Example (current genome)

The current genome has one chain: **Build** (organ) → **Implementation** (tissue) → **Worker** (cell) → **read_file** (molecule). One contract: Build → Implementation.

| Layer / Instance       | What they "see" (summary) |
|------------------------|---------------------------|
| **organism**           | Full `mission.md`, `decomposition_rules.md`, `constraints.md`, all of `role_library/` (organs, tissues, cells, molecules), and `contracts/handoffs.md`. |
| **organ:Build**        | Full mission (v1 single organ); full decomposition rules; own entry (Build) from `organs.md`; Implementation from `tissues.md`, Worker from `cells.md`, read_file from `molecules.md`; contract Build → Implementation. |
| **tissue:Implementation** | Full mission (v1); decomposition for tissues→cells and cells→molecules; own entry (Implementation) from `tissues.md`; Worker from `cells.md`, read_file from `molecules.md`; contract Build → Implementation. |
| **cell:Worker**         | Mission slice (v1 full); own entry (Worker) from `cells.md`; read_file from `molecules.md`; handoff/contract relevant to Worker. |
| **molecule:read_file**  | Only the `read_file` section of `role_library/molecules.md` (id, purpose, inputs, outputs, pre/post, permissions). |

---

## Optional: validation and emission script

A script can validate the genome and optionally emit derived profiles:

- **Location:** `scripts/derive-expression-profiles.js` (or equivalent).
- **Run from repo root:** `node scripts/derive-expression-profiles.js`
- **Behavior:**  
  - Reads `.genome/mission.md`, `decomposition_rules.md`, `role_library/*.md`, `contracts/handoffs.md`.  
  - Validates that every role id referenced in decomposition_rules and contracts exists in the corresponding role_library file; prints result and exits non-zero if any are missing.  
  - Optionally writes markdown files under `.genome/expression_profiles/` (e.g. `organism.md`, `organ-Build.md`, `tissue-Implementation.md`, `cell-Worker.md`, `molecule-read_file.md`) with the derived profile content per the rules above; overwrites on each run.
- **Dependencies:** Node built-ins only (`fs`, `path`); no new npm packages for v1.

### Future improvements (approved)

- **Tighten role-id parsing:** When the genome has multiple organs/tissues, parse referenced ids only from the "Example chain" section or from an explicit structure (e.g. decomposition table) instead of loose `content.includes()` checks, to avoid false positives from prose.
- **Clearer read errors:** Script could distinguish "file not found" vs "permission denied" when reading genome files and log once for diagnostics.
- **Tests:** Add a small test (e.g. run script against a fixture genome, assert validation pass/fail and optional emit) in a later story for regression safety.
