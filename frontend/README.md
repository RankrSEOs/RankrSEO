# RankrSEO Frontend

Next.js 16 frontend for the RankrSEO SEO agency website.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4, ShadCN UI
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Auth:** NextAuth v5
- **Blog Source:** Blogger RSS Feed

## Pages (60+)

| Route | Type |
|-------|------|
| `/` | Static — 10 premium sections |
| `/about` | Static |
| `/services` | Static — 8 service cards |
| `/services/[slug]` | SSG — service detail |
| `/portfolio` | Static — carousel + grid + modal |
| `/blog` | ISR (5min) — search, categories, pagination |
| `/blog/[slug]` | SSG — 25 posts from Blogger |
| `/cases` | Static |
| `/cases/[slug]` | SSG |
| `/contact` | Static |
| `/admin/*` | 9 admin pages (client) |

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build (zero errors)
npm run start    # Production server
```
