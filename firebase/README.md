# Firebase subscribe (epiphoric-prod)

AI Tastemakers stores digest subscribers in Firestore collection **`tastemakers_subscribers`** on the existing **epiphoric-prod** Firebase project.

## One-time setup

### 1. Deploy Firestore rules (Epiphoric repo)

Rules live in **`/home/brian/docker/epiphoric/firestore.rules`** (already patched). Deploy from the Epiphoric project:

```bash
cd /path/to/epiphoric
firebase use epiphoric-prod
firebase deploy --only firestore:rules
```

### 2. Seed existing subscribers

Copy `data/subscribers.json` into Firestore:

```bash
# In ai-tastemakers — set FIREBASE_PROJECT_ID + Admin credentials in .env
npm run subscribers:seed-firestore
```

### 3. GitHub Actions secrets

**Pages build** (public web config — from Firebase Console → Project settings → Web app):

```bash
gh secret set FIREBASE_API_KEY --repo Leftyshields/ai-tastemakers
gh secret set FIREBASE_APP_ID --repo Leftyshields/ai-tastemakers
```

**Daily digest** (Admin SDK — service account from Firebase Console → Service accounts):

```bash
gh secret set FIREBASE_CLIENT_EMAIL --repo Leftyshields/ai-tastemakers
gh secret set FIREBASE_PRIVATE_KEY --repo Leftyshields/ai-tastemakers
# Paste private key with literal \n newlines, or use FIREBASE_SERVICE_ACCOUNT JSON
```

### 4. Local `.env`

Copy public keys from `epiphoric/.env.production` (`REACT_APP_FIREBASE_*` → `FIREBASE_*`) and Admin credentials for digest/seed scripts.

## How it works

- **Subscribe page** (`/subscribe.html`) — Firebase web SDK writes to `tastemakers_subscribers/{email}` (create-only rules)
- **Daily digest** — Admin SDK reads all docs in the collection, merged with `data/subscribers.json` + `DIGEST_EMAIL_TO`
- **Manual add** — `npm run subscribers:add -- email@example.com` (Firestore + JSON file when Admin configured)

## Collection schema

```json
{
  "email": "you@example.com",
  "subscribedAt": "<Firestore Timestamp>",
  "source": "ai-tastemakers"
}
```

Document ID = normalized lowercase email.
