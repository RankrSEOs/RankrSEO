import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { Calendar, User, Tag, ArrowLeft, ArrowRight, ExternalLink, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorBio: string
  date: string
  gradient: string
}

const blogPosts: BlogPost[] = [
  {
    slug: "seo-trends-2026",
    title: "SEO Trends to Dominate in 2026",
    excerpt: "Stay ahead of the curve with the latest SEO trends including AI search, EEAT, and voice search optimization.",
    content: `
## The Rise of AI-Powered Search

Artificial intelligence is reshaping how search engines understand and rank content. Google's Search Generative Experience (SGE) and other AI-driven algorithms prioritize content that demonstrates expertise, authority, and trustworthiness.

## Why EEAT Matters More Than Ever

Experience, Expertise, Authoritativeness, and Trustworthiness (EEAT) remain critical ranking factors. Google's quality rater guidelines emphasize content created by people with genuine first-hand experience.

## Voice Search Optimization

With voice search accounting for over 30% of all searches, optimizing for conversational queries and featured snippets is no longer optional.

## Core Web Vitals Are Table Stakes

Page experience signals including LCP, FID, and CLS continue to be ranking factors. Sites that fail to meet these thresholds will see declining visibility.

## Video SEO Is Exploding

YouTube is the second-largest search engine. Optimizing video content with proper metadata, transcripts, and structured data gives you a massive competitive advantage.

## Actionable Takeaways

Focus on creating EEAT-driven content, optimize for voice search, ensure your technical foundation is solid, and invest in video content. The brands that adapt to these trends will dominate search in 2026 and beyond.
    `,
    category: "SEO",
    author: "Amit Kumar",
    authorBio: "Amit is the founder of RankrSEO with over 7 years of experience in SEO and digital marketing. He has helped 50+ businesses achieve top rankings and measurable growth.",
    date: "2026-06-01",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    slug: "local-seo-guide",
    title: "The Ultimate Guide to Local SEO in 2026",
    excerpt: "Learn how to dominate local search results with Google Business Profile optimization and local citations.",
    content: `
## Why Local SEO Matters

Local SEO is the most cost-effective way for brick-and-mortar businesses to attract customers. 46% of all Google searches have local intent, and "near me" searches have grown by over 500% in recent years.

## Google Business Profile Optimization

Your GBP listing is the most important asset for local SEO. Ensure your profile is fully completed with accurate NAP (Name, Address, Phone), categories, attributes, photos, and posts.

## Building Local Citations

Consistent citations across authoritative directories like Yelp, YellowPages, and industry-specific sites signal trustworthiness to Google.

## Review Management Strategy

Reviews are a top local ranking factor. Develop a systematic approach to generating and responding to reviews across all platforms.

## Local Content Creation

Create location-specific landing pages and blog posts that target neighborhood keywords, landmarks, and local events.

## Tracking Local Rankings

Use tools like Google Search Console, GBP insights, and rank tracking software to monitor your local search performance.
    `,
    category: "Local SEO",
    author: "Priya Sharma",
    authorBio: "Priya is a Local SEO specialist at RankrSEO with expertise in Google Business Profile optimization and multi-location SEO strategies.",
    date: "2026-05-25",
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    slug: "web-design-conversion",
    title: "How Web Design Impacts Conversion Rates",
    excerpt: "Discover the key design principles that turn visitors into customers and boost your bottom line.",
    content: `
## First Impressions Matter

Users form an opinion about your website within 50 milliseconds. A well-designed site builds trust and credibility instantly.

## Mobile-First Design

With over 60% of traffic coming from mobile devices, a responsive mobile-first design is essential for conversions.

## Clear Call-to-Actions

Your CTAs should be prominent, action-oriented, and placed strategically throughout the user journey.

## Loading Speed and Performance

A 1-second delay in page load time can reduce conversions by 7%. Optimize images, leverage caching, and minimize code.

## Trust Signals

Display testimonials, case studies, security badges, and guarantees to reduce friction and build confidence.

## Simplifying Navigation

Complex navigation confuses users. A clear, intuitive information architecture guides visitors toward conversion.
    `,
    category: "Web Design",
    author: "Rahul Verma",
    authorBio: "Rahul leads the Web Design team at RankrSEO, specializing in conversion-focused UI/UX design and accessible web experiences.",
    date: "2026-05-18",
    gradient: "from-purple-600 to-pink-500",
  },
]

const relatedPosts = [
  { slug: "seo-trends-2026", title: "SEO Trends 2026: What Every Business Must Know", gradient: "from-blue-600 to-cyan-500" },
  { slug: "local-seo-guide", title: "The Ultimate Guide to Local SEO in 2026", gradient: "from-amber-600 to-orange-500" },
  { slug: "web-design-conversion", title: "Web Design Trends That Drive Conversions in 2026", gradient: "from-emerald-600 to-teal-500" },
]

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | RankrSEO Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://rankrseo.blogspot.com/search?q=${post.slug}` },
    openGraph: {
      title: `${post.title} - RankrSEO Blog`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let key = 0
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={key++} className="mt-10 mb-4 text-xl font-bold text-foreground sm:text-2xl">{trimmed.slice(3)}</h2>)
    } else if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={key++} className="mt-8 mb-3 text-lg font-semibold text-foreground">{trimmed.slice(4)}</h3>)
    } else if (trimmed.startsWith("- ")) {
      elements.push(<li key={key++} className="ml-5 list-disc text-muted-foreground">{trimmed.slice(2)}</li>)
    } else if (trimmed === "") {
      elements.push(<div key={key++} className="h-4" />)
    } else {
      elements.push(<p key={key++} className="text-muted-foreground leading-relaxed">{trimmed}</p>)
    }
  }
  return <>{elements}</>
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) {
    redirect("https://rankrseo.blogspot.com")
  }

  return (
    <>
      {/* Back link */}
      <section className="bg-background pt-28 pb-4">
        <div className="container px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="bg-background pb-4">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <User className="size-3.5" />
                {post.author}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{post.title}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="bg-background pb-8">
        <div className="container px-4">
          <div className={cn("mx-auto flex h-56 max-w-4xl flex-col items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg sm:h-72", post.gradient)}>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">{post.category}</span>
            <div className="mt-4 px-6 text-center text-2xl font-bold text-white sm:text-3xl">{post.title}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="bg-background pb-12">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl prose-headings:text-foreground prose-p:text-muted-foreground">
            <MarkdownContent content={post.content} />

            {/* Blogger CTA */}
            <div className="mt-12 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                This article was originally published on our blog. Visit{" "}
                <a href="https://rankrseo.blogspot.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
                  rankrseo.blogspot.com
                </a>{" "}
                for more in-depth guides and latest updates.
              </p>
              <a
                href="https://rankrseo.blogspot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Visit Our Blog
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Author Bio */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="container px-4">
          <div className="mx-auto flex max-w-3xl items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-foreground">{post.author}</p>
              <p className="mt-1 text-sm text-muted-foreground">{post.authorBio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-background py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Related Articles</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {relatedPosts.filter((rp) => rp.slug !== slug).slice(0, 3).map((rp) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className={cn("flex h-32 items-end bg-gradient-to-br p-4", rp.gradient)}>
                    <h3 className="text-base font-semibold text-white">{rp.title}</h3>
                  </div>
                  <div className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-primary">
                    Read Article
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary py-20">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="container relative z-10 px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Stay Ahead of the Curve</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Get the latest SEO insights delivered straight to your inbox.
          </p>
          <a
            href="https://rankrseo.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-white/90 hover:shadow-lg active:translate-y-px"
          >
            Subscribe on Blogger
            <ExternalLink className="size-4" />
          </a>
        </div>
      </section>
    </>
  )
}
