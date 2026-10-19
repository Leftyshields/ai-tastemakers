# Molecule roles (primitives)

## read_file

- **id:** read_file  
- **purpose:** Atomic read of a file; single responsibility, testable primitive.  
- **inputs:** path (string).  
- **outputs:** file contents (string or buffer); or error.  
- **preconditions:** path exists and is readable within permissions.  
- **postconditions:** No side effect except read; result is immutable snapshot.  
- **permissions:** Read-only; no write or delete.
