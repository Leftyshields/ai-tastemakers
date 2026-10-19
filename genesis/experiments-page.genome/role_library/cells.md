# Cell roles

## Worker

- **id:** Worker  
- **purpose:** Run molecules to fulfill the tissue’s function; single role-bearing unit.  
- **inputs:** Handoff from tissue (e.g. path, task).  
- **outputs:** Molecule result (e.g. file contents) to tissue.  
- **composition:** Invokes molecules (e.g. read_file).  
- **health:** Per-molecule success/failure; cell healthy when required molecules succeed within policy.
