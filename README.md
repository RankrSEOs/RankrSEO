# RankrSEO

A production-ready digital marketing agency website built with Next.js 16, TypeScript, Tailwind CSS v4, and Express.

## Tech Stack

**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, ShadCN UI, Framer Motion, Lucide Icons
**Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL
**CMS:** Sanity CMS
**Auth:** NextAuth v5
**Email:** Resend
**Deployment:** Vercel (frontend), Render (backend), Neon (database)

## Project Structure

```
RankrSEO/
├── frontend/                # Next.js 16 App Router
│   └── src/
│       ├── app/             # Pages & API routes
│       │   ├── about/       # About page
│       │   ├── services/    # Services pages (8 services)
│       │   ├── portfolio/   # Portfolio page
│       │   ├── blog/        # Blog listing & detail
│       │   ├── cases/       # Case studies
│       │   ├── contact/     # Contact page
│       │   └── admin/       # Admin dashboard
│       ├── components/      # Reusable components
│       │   ├── ui/          # ShadCN UI components
│       │   ├── layout/      # Navbar, Footer, Theme
│       │   ├── home/        # Homepage sections
│       │   └── seo/         # JSON-LD components
│       └── lib/             # Utilities & config
├── backend/                 # Express API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & validation
│   │   └── index.ts         # Server entry
│   └── prisma/              # Database schema
└── .github/workflows/       # CI/CD
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with 10 sections |
| `/about` | About the agency |
| `/services` | Services overview |
| `/services/[slug]` | 8 individual service pages |
| `/portfolio` | Portfolio grid with filters |
| `/cases/[slug]` | Case study detail |
| `/blog` | Blog with search & pagination |
| `/blog/[slug]` | Blog post detail |
| `/contact` | Contact form & info |
| `/admin` | Admin dashboard |


## Services

- SEO Services
- Local SEO
- Technical SEO
- Link Building
- Web Design
- Content Marketing
- Google Business Profile Optimization
- PPC Advertising

## Lead Generation Features

- Free SEO Audit form
- Sticky CTA bar
- Floating WhatsApp button
- Exit intent popup
- Contact form with validation

## SEO

- Dynamic metadata per page
- JSON-LD structured data (Organization, LocalBusiness, FAQ, Article, Breadcrumb)
- Dynamic sitemap.xml
- Robots.txt
- Open Graph & Twitter cards
- Core Web Vitals optimized

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Update DATABASE_URL in .env
npx prisma db push
npm run dev
```

## Deployment

- **Frontend:** Deploy `frontend/` to Vercel
- **Backend:** Deploy `backend/` to Render
- **Database:** Use Neon PostgreSQL free tier

## Environment Variables

See `frontend/.env.example` and `backend/.env.example` for required variables.

## License

MIT
