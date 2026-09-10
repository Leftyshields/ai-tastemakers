# Firebase subscribe (epiphoric-prod)

AI Tastemakers stores digest subscribers in Firestore collection **`tastemakers_subscribers`** on the existing **epiphoric-prod** Firebase project.

## One-time setup

### 1. Deploy Firestore rules + API (Epiphoric repo)

Rules and **`POST /api/tastemakers-unsubscribe`** live in the **Epiphoric** repo. Deploy from Epiphoric:

```bash
cd /path/to/epiphoric
firebase use epiphoric-prod
firebase deploy --only firestore:rules,functions
```

Public Firestore **delete** is disabled; unsubscribe goes through the API (token required when the doc has `unsubscribeToken`).

### 2. Seed existing subscribers

Copy `data/subscribers.json` into Firestore:

```bash
# In ai-tastemakers — set FIREBASE_PROJECT_ID + Admin credentials in .env
npm run subscribers:seed-firestore
```

New docs include `unsubscribeToken` automatically.

### 3. Backfill tokens for legacy subscribers

After deploying rules + unsubscribe API, run once against **epiphoric-prod**:

```bash
npm run subscribers:migrate-unsubscribe-tokens -- --dry-run
npm run subscribers:migrate-unsubscribe-tokens -- --apply
```

Legacy docs without a token can still unsubscribe via the API (email only) until backfill runs. After backfill, digest links include `?email=&token=` and manual griefing via Firestore delete is blocked.

### 4. GitHub Actions secrets

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

### 5. Local `.env`

Copy public keys from `epiphoric/.env.production` (`REACT_APP_FIREBASE_*` → `FIREBASE_*`) and Admin credentials for digest/seed/migrate scripts.

Optional Pages build override for unsubscribe API URL (defaults to prod Cloud Functions):

```bash
TASTEMAKERS_UNSUBSCRIBE_API_URL=https://us-central1-epiphoric-prod.cloudfunctions.net/api/api/tastemakers-unsubscribe
```

## How it works

- **Subscribe page** (`/subscribe.html`) — Firebase web SDK creates `tastemakers_subscribers/{email}` with `unsubscribeToken`
- **Unsubscribe page** (`/unsubscribe.html`) — POST to Epiphoric **`/api/tastemakers-unsubscribe`** (not client Firestore delete)
- **Daily digest** — Admin SDK reads Firestore; one email per subscriber with personalized unsubscribe URL
- **Manual add** — `npm run subscribers:add -- email@example.com`
- **Manual remove** — `npm run subscribers:remove -- email@example.com` (Admin SDK)

Digest emails include an **Unsubscribe** link and `List-Unsubscribe` header pointing at `/unsubscribe.html?email=…&token=…` when the subscriber has a token.

## Collection schema

```json
{
  "email": "you@example.com",
  "subscribedAt": "<Firestore Timestamp>",
  "source": "ai-tastemakers",
  "unsubscribeToken": "<uuid>"
}
```

Document ID = normalized lowercase email.
