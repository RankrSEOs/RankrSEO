import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight, BarChart3, TrendingUp, Target, Award, CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"

interface CaseStudy {
  slug: string
  title: string
  client: string
  industry: string
  category: string
  gradient: string
  problem: string
  strategy: string[]
  results: string[]
  metrics: { label: string; value: string; icon: string }[]
}

const hardcodedCaseStudies: CaseStudy[] = [
  {
    slug: "techflow-seo",
    title: "TechFlow SaaS",
    client: "TechFlow Inc.",
    industry: "B2B SaaS",
    category: "SEO",
    gradient: "from-blue-600 to-cyan-500",
    problem: "TechFlow, a B2B SaaS platform, was struggling with low organic visibility despite having a robust product. Their website had significant technical SEO issues, thin content, and zero blog presence. They were losing market share to competitors who dominated search results for high-intent keywords.",
    strategy: [
      "Conducted comprehensive technical SEO audit and fixed 140+ issues including crawl errors, duplicate content, and slow page speed.",
      "Developed a cluster-based content strategy targeting 200+ long-tail keywords with high purchase intent.",
      "Built a strategic backlink acquisition campaign featuring guest posts on tier-1 SaaS publications and broken link building.",
      "Implemented structured data markup (FAQ, HowTo, Article) to enhance search appearance and CTR.",
      "Optimized core web vitals achieving 95+ PageSpeed scores across desktop and mobile.",
    ],
    results: [
      "+340% increase in organic traffic within 6 months",
      "Top 5 rankings for 47 high-value keywords",
      "150% ROI on SEO investment within the first quarter",
      "450% increase in blog-generated leads",
      "Zero manual penalties or ranking drops",
    ],
    metrics: [
      { label: "Organic Traffic", value: "+340%", icon: "TrendingUp" },
      { label: "Keywords in Top 5", value: "47", icon: "Target" },
      { label: "ROI", value: "150%", icon: "BarChart3" },
      { label: "PageSpeed Score", value: "97", icon: "Award" },
    ],
  },
  {
    slug: "greenleaf-web",
    title: "GreenLeaf Organics",
    client: "GreenLeaf Organics",
    industry: "E-Commerce",
    category: "Web Design",
    gradient: "from-emerald-600 to-teal-500",
    problem: "GreenLeaf Organics had an outdated, slow-loading website with a confusing checkout process. Their mobile conversion rate was under 1%, and cart abandonment exceeded 75%. They needed a complete digital transformation to compete with larger organic food retailers.",
    strategy: [
      "Designed a mobile-first, accessibility-compliant e-commerce experience with WCAG 2.1 AA standards.",
      "Streamlined the checkout flow from 5 steps to 2, reducing friction and abandonment.",
      "Integrated real-time inventory, one-click purchase, and multiple payment gateways.",
      "Optimized all images, implemented lazy loading, and leveraged CDN for global delivery.",
    ],
    results: [
      "28% increase in overall conversion rate",
      "42% reduction in bounce rate",
      "94/100 PageSpeed score (mobile)",
      "65% increase in mobile revenue",
      "A+ accessibility rating from WAVE",
    ],
    metrics: [
      { label: "Conversion Rate", value: "+28%", icon: "TrendingUp" },
      { label: "Bounce Rate", value: "-42%", icon: "Target" },
      { label: "Mobile Revenue", value: "+65%", icon: "BarChart3" },
      { label: "PageSpeed", value: "94", icon: "Award" },
    ],
  },
  {
    slug: "brickhouse-local",
    title: "BrickHouse Realty",
    client: "BrickHouse Realty",
    industry: "Real Estate",
    category: "Local SEO",
    gradient: "from-amber-600 to-orange-500",
    problem: "BrickHouse Realty had 12 agents but zero presence in Google Local Pack. Their Google Business Profile was unclaimed and incomplete. Competitors dominated local search for 'real estate agent' and related terms in their service area.",
    strategy: [
      "Claimed, verified, and fully optimized Google Business Profile with accurate NAP, categories, and attributes.",
      "Built 65+ high-quality local citations on authoritative directories with consistent NAP data.",
      "Implemented a review generation system that increased reviews from 3 to 120+ in 4 months.",
      "Created localized content targeting neighborhood-specific keywords and landmarks.",
    ],
    results: [
      "#1 in Google Local Pack for 12 high-value terms",
      "280% increase in leads from Google Search",
      "130+ Google reviews with 4.9★ average rating",
      "190% increase in direction requests",
      "3 new offices opened based on local search data",
    ],
    metrics: [
      { label: "Local Pack #1", value: "12 Terms", icon: "Award" },
      { label: "Lead Increase", value: "+280%", icon: "TrendingUp" },
      { label: "Google Rating", value: "4.9★", icon: "Target" },
      { label: "New Reviews", value: "130+", icon: "BarChart3" },
    ],
  },
]

const iconMap: Record<string, typeof TrendingUp> = {
  TrendingUp, Target, BarChart3, Award,
}

function MetricIcon({ name }: { name: string }) {
  const Icon = iconMap[name] || TrendingUp
  return <Icon className="size-5" />
}

async function getCase(slug: string): Promise<CaseStudy | null> {
  try {
    const { fetchCaseBySlug } = await import("@/lib/public-api")
    const api = await fetchCaseBySlug(slug)
    if (api && api.problem) return api
  } catch {}
  return hardcodedCaseStudies.find((c) => c.slug === slug) || null
}

export async function generateStaticParams() {
  let slugs: string[] = []
  try {
    const { fetchAllCaseSlugs } = await import("@/lib/public-api")
    slugs = await fetchAllCaseSlugs()
  } catch {}
  if (!slugs.length) slugs = hardcodedCaseStudies.map((c) => c.slug)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCase(slug)
  if (!cs) return {}
  return {
    title: `${cs.title} - Case Study | RankrSEO`,
    description: `See how RankrSEO helped ${cs.client} achieve ${cs.results[0] || "outstanding results"}. Full case study with strategy, results, and key metrics.`,
    openGraph: {
      title: `${cs.title} - RankrSEO Case Study`,
      description: `See how RankrSEO helped ${cs.client} achieve ${cs.results[0] || "outstanding results"}.`,
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = await getCase(slug)
  if (!cs) notFound()

  return (
    <>
      {/* Hero */}
      <section className={cn("relative overflow-hidden bg-gradient-to-br from-secondary to-primary pt-32 pb-20 sm:pt-40 sm:pb-28")}>
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="container relative z-10 px-4 text-center">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
            {cs.category} &bull; {cs.industry}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {cs.title}
          </h1>
          <p className="mt-2 text-lg text-white/70">Client: {cs.client}</p>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="bg-background py-10">
        <div className="container px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {cs.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MetricIcon name={metric.icon} />
                </div>
                <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Problem */}
      <section className="bg-background pb-12">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">The Challenge</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{cs.problem}</p>
          </div>
        </div>
      </section>

      {/* Case Study Banner */}
      <section className="bg-muted/30 py-12">
        <div className="container px-4">
          <div className={cn("mx-auto flex h-64 max-w-4xl flex-col items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg sm:h-80", cs.gradient)}>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">{cs.category} &bull; {cs.industry}</span>
            <h2 className="mt-4 px-6 text-center text-2xl font-bold text-white sm:text-3xl">{cs.title}</h2>
            <p className="mt-2 text-sm text-white/70">Client: {cs.client}</p>
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section className="bg-background py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Our Strategy</h2>
            <ul className="mt-6 space-y-4">
              {cs.strategy.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-muted/30 py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">The Results</h2>
            <ul className="mt-6 space-y-3">
              {cs.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{result}</span>
                </li>
              ))}
            </ul>
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
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Get Results Like This</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Ready to transform your business with data-driven SEO and digital marketing?
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-white/90 hover:shadow-lg active:translate-y-px"
          >
            Start Your Free Audit
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
