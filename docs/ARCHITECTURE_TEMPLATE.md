# Architecture (template)

Copy to **`docs/ARCHITECTURE.md`** during `/create_plan` or `/execute_plan`. Replace placeholders with your stack.

## Overview

_One paragraph: what the app does and main technologies._

## Module layout

```
src/ or web/ api/ ...
```

## Backend entry points (required for API projects)

Document **every** environment that serves HTTP:

| Environment | Entry file | Base path | How to run | Deploy |
|-------------|------------|-----------|------------|--------|
| Local dev | _e.g. `api/src/server.ts`_ | _e.g. `/api`_ | _e.g. `npm run dev:api`_ | — |
| Production | _e.g. `functions/src/index.ts`_ | _e.g. `/api`_ | — | _e.g. `firebase deploy --only functions`_ |

**Rule:** Shared route handlers live in **one place** (e.g. `api/src/handlers/`). Both entry points import the same router — do not duplicate route definitions in separate files unless unavoidable.

## Web → API

| Build | `VITE_API_BASE_URL` / equivalent |
|-------|----------------------------------|
| Local | Full URL including base path, e.g. `http://localhost:3001/api` |
| Production | Relative path matching hosting rewrite, e.g. `/api` |

## Security

- Auth: _how uid is derived (never from client body)_
- Secrets: _server-only; Firestore rules deny client access to sensitive subcollections_

## External services

| Service | Usage |
|---------|--------|
