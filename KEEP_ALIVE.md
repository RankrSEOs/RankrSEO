# RankrSEO Backend — Keep Alive & Monitoring

## Deployment

| Detail         | Value                              |
|----------------|------------------------------------|
| Backend URL    | https://rankrseo.onrender.com      |
| Health URL     | https://rankrseo.onrender.com/health |
| Root URL       | https://rankrseo.onrender.com      |
| API Base       | https://rankrseo.onrender.com/api  |
| Stack          | Express.js, Prisma, PostgreSQL     |

## Endpoints

| Method | Path           | Auth     | Description                      |
|--------|----------------|----------|----------------------------------|
| GET    | `/`            | No       | API status & available endpoints |
| GET    | `/health`      | No       | Lightweight uptime check         |
| GET    | `/api/health`  | No       | Legacy health check              |
| POST   | `/api/auth/login` | No    | Admin login                      |
| GET    | `/api/blog`    | No       | Public blog posts                |
| POST   | `/api/leads`   | No       | Submit lead (admin)              |
| POST   | `/api/audit`   | No       | Submit lead (SEO audit form)     |
| POST   | `/api/contact` | No       | Submit contact form              |

## Uptime Monitoring

### Primary — GitHub Actions Keep-Alive (Already Configured)
A GitHub Actions workflow (`.github/workflows/keep-alive.yml`) pings both `/health` and `/` every 10 minutes for free.
- ✅ No external account needed
- ✅ Alerts via GitHub email when workflow fails
- ✅ Keeps Render instance warm (within the 15min idle window)

### Backup — External Service (Optional)
For redundant monitoring and SMS/chat alerts:

| Service       | Free Tier                          | URL                          |
|---------------|------------------------------------|------------------------------|
| UptimeRobot   | 50 monitors @ 5min                | https://uptimerobot.com      |
| Better Stack  | 3 heartbeats + Slack/Email alerts | https://betterstack.com      |
| cron-job.org  | Unlimited cron jobs @ 5min        | https://cron-job.org         |

Add `https://rankrseo.onrender.com/health` as a monitor URL.

## What Happens Without Monitoring

Render free instances spin down after 15 minutes of inactivity.
The first request after inactivity triggers a **cold start** that takes 5–30 seconds.
- `/health` responds quickly (no DB query, lightweight)
- Other endpoints may take longer on first request after idle

## Troubleshooting

### Backend returns 502/503
1. Check Render dashboard logs: https://dashboard.render.com
2. Restart the service manually from the Render dashboard
3. Verify the health endpoint: `curl https://rankrseo.onrender.com/health`

### Prisma connection errors
1. Check that `DATABASE_URL` is set in Render environment variables
2. The Neon (PostgreSQL) free tier may pause after 7 days of inactivity
3. Wake up the database by accessing the Neon dashboard

### CORS errors from frontend
1. Set `CORS_ORIGIN` environment variable in Render
2. For Vercel frontend: `CORS_ORIGIN=https://rankrseo.vercel.app`
3. Restart the backend after updating env vars

### Cold start is too slow
1. Upgrade to Render Starter plan ($7/mo) — no cold starts
2. The GitHub Actions keep-alive workflow runs every 10 min to stay within the 15min idle window
3. /health endpoint responds in under 100ms even on cold start

## Local Development

```bash
cd backend
cp .env.example .env    # Fill in DATABASE_URL and JWT_SECRET
npm install
npx prisma generate
npm run dev             # ts-node-dev with auto-reload
```

## Build Pipeline

```bash
npm install             # Install all deps (types included)
npx prisma generate     # Generate Prisma client
npm run build           # tsc compiles to dist/
npm start               # node dist/index.js
```
