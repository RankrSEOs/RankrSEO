# RankrSEO — Project Context

## Deployed URLs
- **Backend API:** https://rankrseo.onrender.com (Render)
- **Frontend:** https://rankrseo.vercel.app (Vercel) — pending deploy

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
cd frontend && npx next build    # 34 static pages, zero errors
cd backend && npm run build      # tsc compiles to dist/
```
