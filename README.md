# RankrSEO

A premium SEO agency website built with Next.js 16, TypeScript, Tailwind CSS v4, and Express.js — serving the USA, UK, Canada, Australia, and India.

> **Founder:** Amit Kumar | **Location:** Delhi, India | **Email:** rankrseo@gmail.com | **Phone:** +91 9953732860

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, ShadCN UI, Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (via Neon) |
| **ORM** | Prisma |
| **Auth** | JWT (bcrypt + jsonwebtoken) |
| **Blog Source** | Blogger RSS Feed |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel (frontend) + Render (backend) |

## Project Structure

```
RankrSEO/
├── frontend/                    # Next.js 16 App Router
│   └── src/
│       ├── app/
│       │   ├── page.tsx         # Homepage (10 premium sections)
│       │   ├── about/           # Founder story, values, team
│       │   ├── services/        # 8 service pages + detail
│       │   ├── portfolio/       # Hero carousel + filterable grid + detail modal
│       │   ├── blog/            # 25 SSG blog posts from Blogger feed
│       │   ├── cases/           # Case studies + detail
│       │   ├── contact/         # Contact form + info cards
│       │   ├── admin/           # Full admin dashboard (9 pages)
│       │   ├── sitemap.ts       # Auto-generated sitemap
│       │   ├── robots.ts        # Robots.txt
│       │   ├── globals.css      # Glass utilities, gradient-border, animations
│       │   ├── loading.tsx      # Root loading state
│       │   ├── error.tsx        # Root error boundary
│       │   └── not-found.tsx    # Custom 404 page
│       ├── components/
│       │   ├── ui/              # UI primitives
│       │   ├── layout/          # Navbar (glass scroll), Footer (gradient)
│       │   ├── home/            # Hero, Services, FAQ, CTA, etc.
│       │   ├── lead-generation/ # Audit form, WhatsApp, exit popup
│       │   └── admin/           # BlogPostEditor, PortfolioEditor, etc.
│       └── lib/
│           ├── blogger-feed.ts  # Shared Blogger RSS fetch + fallback
│           └── utils.ts         # siteConfig, servicesData, cn
├── backend/                     # Express.js REST API
│   ├── src/
│   │   ├── index.ts             # Server + CORS + rate limiting
│   │   ├── lib/prisma.ts        # Shared PrismaClient singleton
│   │   ├── routes/              # auth, leads, blog, cases, portfolio...
│   │   └── middleware/          # JWT auth, Zod validation
│   └── prisma/
│       └── schema.prisma        # 9 database models
└── .github/workflows/
    └── deploy-frontend.yml      # Auto-deploy on push to main
```

## Portfolio Projects

| Project | Description |
|---------|-------------|
| ExCompany | Corporate website for a business services firm |
| Zubilo Studio | Creative agency brand site with portfolio showcase |
| ScrapCo | Recycling marketplace with inventory management |
| EZ Dry | Laundry service booking platform |
| PogoTunes | Music streaming platform with curated playlists |
| Safe Raahia | Women's safety app information portal |
| ElectroBridge | Electrical services marketplace connecting customers with professionals |
| RankrSEO | This site — SEO agency built with Next.js |

## Key Features

- **60+ pages**, zero build errors
- Premium glassmorphism design with gradient orbs and animations
- SEO-optimized with OG/Twitter metadata, JSON-LD, sitemap
- Blog with 25 SSG posts sourced from Blogger RSS feed
- Full admin dashboard (analytics, leads, blog, cases, portfolio, testimonials, settings)
- Lead generation: SEO audit modal, floating WhatsApp, exit-intent popup, sticky CTA
- Responsive design with dark mode support
- Framer Motion page transitions and scroll-triggered animations

## CI/CD

### Frontend Deploy (GitHub Actions)
- Triggered on push to `main` affecting `frontend/**`
- Curls Vercel Deploy Hook → Vercel builds & deploys
- Requires `VERCEL_DEPLOY_HOOK` secret in GitHub

### Backend Deploy (Render)
- Auto-deploys from GitHub on push to `main`
- Build: `npm install && npx prisma generate && npm run build`

## Quick Start

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npx prisma db push && npm run dev
```

## Deployed URLs

- **Frontend:** https://rankrseo.vercel.app
- **Backend API:** https://rankrseo.onrender.com
- **Health:** https://rankrseo.onrender.com/health

## License

MIT — Built with passion by [RankrSEO](https://github.com/RankrSEOs/RankrSEO)
