# RankrSEO

A production-ready digital marketing agency website built with Next.js 16, TypeScript, Tailwind CSS v4, and Express.js.

> **Founder:** Amit Kumar | **Location:** Delhi, India | **Target:** USA, UK, Canada, Australia, India

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, ShadCN UI, Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (via Neon) |
| **ORM** | Prisma |
| **Auth** | NextAuth v5 / JWT |
| **CMS** | Sanity CMS |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
RankrSEO/
├── frontend/                    # Next.js 16 App Router
│   └── src/
│       ├── app/                 # Routes & pages
│       │   ├── page.tsx         # Homepage (10 sections)
│       │   ├── about/           # Founder, mission, team
│       │   ├── services/        # 8 service pages + overview
│       │   ├── portfolio/       # Filterable portfolio grid
│       │   ├── blog/            # Blog listing + detail
│       │   ├── cases/           # Case studies
│       │   ├── contact/         # Contact form + map
│       │   ├── admin/           # Secure dashboard
│       │   ├── sitemap.ts       # Dynamic sitemap
│       │   └── robots.ts        # Robots.txt
│       ├── components/
│       │   ├── ui/              # ShadCN components
│       │   ├── layout/          # Navbar, Footer, Theme
│       │   ├── home/            # Hero, Services, FAQ, etc.
│       │   ├── lead-generation/ # Audit form, WhatsApp, popups
│       │   └── seo/             # JSON-LD schemas
│       └── lib/                 # Utils, Sanity client
├── backend/                     # Express.js API
│   ├── src/
│   │   ├── index.ts             # Server entry
│   │   ├── routes/              # Auth, leads, blog, contact
│   │   └── middleware/          # JWT auth, validation
│   └── prisma/
│       └── schema.prisma        # 10 database models
└── .github/workflows/           # CI/CD pipeline
```

---

## Pages (33 Static Routes)

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Hero, Services, Why Us, Process, Testimonials, Industries, FAQ, CTA |
| `/about` | Static | Founder story, mission, vision, values |
| `/services` | Static | Services overview grid |
| `/services/[slug]` | SSG | 8 individual service detail pages |
| `/portfolio` | Static | Filterable portfolio grid |
| `/blog` | Static | Blog with search, categories, pagination |
| `/blog/[slug]` | SSG | Blog post detail with author & sharing |
| `/cases/[slug]` | SSG | Case study detail (problem, strategy, results) |
| `/contact` | Static | Contact form, Calendly, map, WhatsApp |
| `/admin/*` | Static | Dashboard, leads, blog, testimonials, portfolio, cases, analytics |

---

## Lead Generation Features

- **Free SEO Audit** — Modal form (name, email, website, phone) with Zod validation
- **Sticky CTA Bar** — Appears at 30% scroll, promotes audit
- **Floating WhatsApp** — Fixed green button, links to WhatsApp
- **Exit Intent Popup** — Detects mouse leaving, offers free audit
- **Contact Form** — Full form with service dropdown & budget

---

## SEO Implementation

- Dynamic `<title>` & `<meta>` per page via `generateMetadata`
- `sitemap.xml` — auto-generated with all routes
- `robots.txt` — allows all, disallows `/admin/` and `/api/`
- JSON-LD schemas: Organization, LocalBusiness, FAQ, Article, BreadcrumbList
- Open Graph & Twitter Card meta tags
- Semantic HTML with proper heading hierarchy

---

## Free Deployment Guide

### 1. Frontend — Vercel (Free)

```bash
# 1. Push code to GitHub
git add -A && git commit -m "Ready for deploy" && git push

# 2. Go to https://vercel.com/new
#    - Import your GitHub repo
#    - Set Root Directory: frontend
#    - Framework: Next.js
#    - Environment Variables:
#      - NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
#      - NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
#      - NEXTAUTH_URL=https://your-domain.vercel.app
#      - NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
#
# 3. Click Deploy
```

### 2. Database — Neon (Free)

```bash
# 1. Go to https://neon.tech
# 2. Sign up with GitHub
# 3. Create a new project (PostgreSQL 16)
# 4. Copy the DATABASE_URL (looks like: postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require)
# 5. Save this for the backend
```

### 3. Backend — Render (Free)

```bash
# 1. Go to https://render.com
# 2. Click "New +" → "Web Service"
# 3. Connect your GitHub repo
# 4. Configure:
#    - Name: rankrseo-api
#    - Root Directory: backend
#    - Build Command: npm install && npx prisma generate && npm run build
#    - Start Command: npm start
#    - Instance Type: Free
# 5. Add Environment Variables:
#    - DATABASE_URL=<from Neon>
#    - JWT_SECRET=<generate with: openssl rand -base64 32>
#    - CORS_ORIGIN=https://your-frontend.vercel.app
#    - PORT=5000
#    - NODE_ENV=production
# 6. Click "Create Web Service"
```

### 4. Media — Cloudinary (Free)

```bash
# 1. Go to https://cloudinary.com
# 2. Sign up for free tier (25GB storage)
# 3. Copy CLOUDINARY_URL from dashboard
# 4. Add to Vercel env vars if using images
```

### 5. Custom Domain (Optional)

```bash
# Vercel: Project Settings → Domains → Add your domain
# Render: Dashboard → Your Service → Settings → Custom Domain
```

### 6. Post-Deployment Checklist

- [x] Site loads at custom domain (HTTPS)
- [x] All pages render (check /, /services/seo, /blog, /contact)
- [x] Contact form submits successfully
- [x] SEO audit modal opens and submits
- [x] WhatsApp button links correctly
- [x] Admin dashboard loads (/admin)
- [x] Sitemap accessible (/sitemap.xml)
- [x] Robots.txt accessible (/robots.txt)
- [x] Lighthouse score 90+ (test in incognito)
- [x] Google Search Console verified
- [x] Google Analytics 4 tracking active

---

## Local Development

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL (or Neon connection string)

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
# Opens at http://localhost:3000
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with DATABASE_URL and JWT_SECRET
npx prisma db push    # Sync database schema
npm run dev
# Runs at http://localhost:5000
```

### Environment Variables

**Frontend** (`frontend/.env.local`):
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_CALENDLY_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

**Backend** (`backend/.env`):
```
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/rankrseo
JWT_SECRET=your-jwt-secret-here
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

---

## Services Offered

| Service | Route |
|---------|-------|
| SEO Services | `/services/seo` |
| Local SEO | `/services/local-seo` |
| Technical SEO | `/services/technical-seo` |
| Link Building | `/services/link-building` |
| Web Design | `/services/web-design` |
| Content Marketing | `/services/content-marketing` |
| Google Business Profile | `/services/google-business-profile` |
| PPC Advertising | `/services/ppc` |

---

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`):
- **Frontend:** `npm install` → `npm run lint` → `npm run build`
- **Backend:** `npm install` → `npx prisma generate` → `npm run build`

Runs on every push to `main` and on Pull Requests.

---

## License

MIT — Built with passion by [RankrSEO](https://github.com/RankrSEOs/RankrSEO)
