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
| POST   | `/api/leads`   | No       | Submit lead (SEO audit)          |
| POST   | `/api/contact` | No       | Submit contact form              |

## Recommended Uptime Monitoring

### Option 1 — UptimeRobot (Free)
1. Sign up at https://uptimerobot.com
2. Add a new monitor:
   - **Type:** HTTP(s)
   - **URL:** https://rankrseo.onrender.com/health
   - **Interval:** 5 minutes
   - **Timeout:** 30 seconds
   - **Alert contacts:** your email
3. UptimeRobot pings every 5 min, keeping the instance awake.

### Option 2 — Better Stack (Free)
1. Sign up at https://betterstack.com
2. Create a heartbeat monitor for `/health`
3. Set check interval to 5 minutes
4. Configure Slack/Email alerts on downtime

### Option 3 — cron-job.org (Free)
1. Go to https://cron-job.org
2. Create a cron job: `GET https://rankrseo.onrender.com/health` every 5 minutes
3. This is the simplest option for a single endpoint.

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
2. Or use a monitoring service (above) to keep the instance warm
3. /health endpoint is designed to respond in under 100ms even on cold start

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
