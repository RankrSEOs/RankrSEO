# RankrSEO — Project Context

## Deployed URLs
- **Backend API:** https://rankrseo.onrender.com (Render)
- **Frontend:** https://rankrseo.vercel.app (Vercel) — auto-deploys from `main` via GitHub Actions

## CI / Deploy Pipeline

### GitHub Actions — Vercel Deploy (`.github/workflows/deploy-frontend.yml`)
- Triggers on push to `main` affecting `frontend/**` or the workflow file itself
- Also supports `workflow_dispatch` for manual trigger
- Curls a Vercel Deploy Hook URL stored as `VERCEL_DEPLOY_HOOK` in GitHub secrets

### Required GitHub Secrets
| Secret | Description |
|---|---|
| `VERCEL_DEPLOY_HOOK` | Deploy hook URL from Vercel dashboard (Settings > Git > Deploy Hooks) |

### Creating the Deploy Hook
1. Go to https://vercel.com/rankrseos-projects/rankrseo/settings/git
2. Scroll to **Deploy Hooks**
3. Create a hook named e.g. `GitHub Actions`
4. Copy the generated URL
5. Add it as a repository secret named `VERCEL_DEPLOY_HOOK` at https://github.com/RankrSEOs/RankrSEO/settings/secrets/actions

### Push → Deploy flow
Push to `main` → GitHub Actions runs → curls Vercel hook → Vercel builds & deploys frontend

## Backend Build Pipeline (Render)
```bash
npm install && npx prisma generate && npm run build
```

### Critical rules for backend `package.json`
- ALL `@types/*` packages, `prisma`, `typescript`, `ts-node`, `ts-node-dev` MUST be in `dependencies` (not `devDependencies`), because Render sets `NODE_ENV=production` during builds, which skips devDependencies.
- `@prisma/client` version must match `prisma` CLI version (currently both pinned to `^6.8.0`).

### tsconfig requirements
- Must include `"types": ["node"]` to resolve `process`, `console`, and Node.js globals.
- `moduleResolution` must be `"Node"`.

## Key commands
```bash
cd frontend && npx next build    # 60+ pages, zero errors
cd backend && npm run build      # tsc compiles to dist/
```
