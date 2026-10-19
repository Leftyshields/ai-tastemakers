# Decomposition rules

Hierarchy: organism → organ → tissue → cell → molecule. Only molecules execute code.

## Example chain

- **Organ:** Build
- **Tissue:** Implementation (under Build)
- **Cell:** Worker (under Implementation)
- **Molecule:** read_file (invocable by Worker)

The Worker reads the genome mission file to confirm the blueprint before human or CI executes lab scripts.
