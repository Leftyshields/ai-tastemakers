# Decomposition Rules

Organism decomposes hierarchically: organism → organs → tissues → cells → molecules. Each layer is defined in the role library; decomposition stops when a primitive (molecule) is reached.

## Organism → Organs

- Decompose by capability area. Example: Build organ (capability: produce artifacts from intent).

## Organs → Tissues

- Each organ decomposes into tissues by functional grouping. Example: Build organ contains Implementation tissue (function: execute implementation work).

## Tissues → Cells

- Each tissue decomposes into cells by role-bearing worker. Example: Implementation tissue contains Worker cells (role: run molecules to fulfill the tissue’s function).

## Cells → Molecules

- Each cell decomposes into molecules (primitives) by atomic action. Example: Worker cell may invoke the read_file molecule (atomic: read a file with given path and return contents).

## When to stop

- Stop at molecule when the unit is a single, testable, permissioned primitive with pre/postconditions.

## Example chain (this genome)

- **Organ:** Build  
- **Tissue:** Implementation (under Build)  
- **Cell:** Worker (under Implementation)  
- **Molecule:** read_file (invocable by Worker)
