const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://rankrseo.onrender.com/api"

const GRADIENT_MAP: Record<string, string> = {
  "techflow-seo": "from-blue-600 to-cyan-500",
  "greenleaf-web": "from-emerald-600 to-teal-500",
  "brickhouse-local": "from-amber-600 to-orange-500",
  "quantum-ppc": "from-violet-600 to-purple-500",
  "sprout-content": "from-pink-600 to-rose-500",
  "nexus-seo": "from-indigo-600 to-blue-500",
  "urban-web": "from-sky-600 to-blue-500",
  "peak-local": "from-red-600 to-rose-500",
  "guru": "from-purple-600 to-pink-500",
  "scrapco": "from-green-600 to-emerald-500",
  "zubilo-studio": "from-orange-600 to-red-500",
  "ezdry": "from-blue-600 to-cyan-500",
  "pogotunes": "from-yellow-500 to-orange-500",
  "excompany": "from-slate-600 to-gray-500",
}

export interface CaseStudyItem {
  id: string; title: string; industry: string; challenge: string
  solution: string; resultTraffic: string; resultLeads: string
  resultRankings: string; timeframe: string; metricBefore: number; metricAfter: number
}

export interface TestimonialItem {
  name: string; role: string; content: string; rating: number
}

export interface PortfolioItem {
  id: string; title: string; category: string; description: string
  client: string; results: string[]; gradient: string
}

export interface CaseStudyDetail {
  slug: string; title: string; client: string; industry: string
  category: string; gradient: string; problem: string
  strategy: string[]; results: string[]
  metrics: { label: string; value: string; icon: string }[]
}

async function serverFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

type ApiCase = {
  id: string; title: string; slug: string; clientIndustry?: string
  clientName?: string; problem?: string; strategy?: string; results?: string
  metrics?: Record<string, unknown>; published?: boolean
}

function mapCaseToList(ac: ApiCase): CaseStudyItem {
  const m = (ac.metrics || {}) as Record<string, unknown>
  return {
    id: ac.slug || ac.id,
    title: ac.title,
    industry: ac.clientIndustry || "",
    challenge: ac.problem || "",
    solution: ac.strategy || "",
    resultTraffic: (m.traffic as string) || "",
    resultLeads: (m.leads as string) || "",
    resultRankings: (m.rankings as string) || "",
    timeframe: (m.timeframe as string) || "",
    metricBefore: (m.metricBefore as number) || 0,
    metricAfter: (m.metricAfter as number) || 0,
  }
}

export async function fetchPublishedCases(): Promise<CaseStudyItem[]> {
  const data = await serverFetch<ApiCase[]>("/cases?published=true")
  return data.map(mapCaseToList)
}

export async function fetchCases(): Promise<CaseStudyItem[]> {
  const data = await serverFetch<ApiCase[]>("/cases")
  return data.map(mapCaseToList)
}

type ApiTestimonial = {
  clientName: string; company?: string; position?: string
  content: string; rating?: number
}

export async function fetchFeaturedTestimonials(): Promise<TestimonialItem[]> {
  const data = await serverFetch<ApiTestimonial[]>("/testimonials?featured=true")
  return data.map((t) => ({
    name: t.clientName,
    role: [t.position, t.company].filter(Boolean).join(", "),
    content: t.content,
    rating: t.rating || 5,
  }))
}

export async function fetchAllTestimonials(): Promise<TestimonialItem[]> {
  const data = await serverFetch<ApiTestimonial[]>("/testimonials")
  return data.map((t) => ({
    name: t.clientName,
    role: [t.position, t.company].filter(Boolean).join(", "),
    content: t.content,
    rating: t.rating || 5,
  }))
}

type ApiPortfolio = {
  slug: string; title: string; category?: string; description?: string
  clientName?: string; tags?: string[]
}

export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  const data = await serverFetch<ApiPortfolio[]>("/portfolio")
  return data.map((p) => ({
    id: p.slug,
    title: p.title,
    category: p.category || "",
    description: p.description || "",
    client: p.clientName || "",
    results: p.tags || [],
    gradient: GRADIENT_MAP[p.slug] || "from-primary to-secondary",
  }))
}

type ApiCaseDetail = {
  id: string; title: string; slug: string; clientName?: string
  clientIndustry?: string; problem?: string; strategy?: string; results?: string
  metrics?: Record<string, unknown>; published?: boolean
}

function splitLines(s?: string): string[] {
  if (!s) return []
  return s.split("\n").map((l) => l.trim()).filter(Boolean)
}

function buildMetricsArray(m?: Record<string, unknown>): { label: string; value: string; icon: string }[] {
  if (!m) return []
  const arr: { label: string; value: string; icon: string }[] = []
  if (m.traffic) arr.push({ label: "Organic Traffic", value: String(m.traffic), icon: "TrendingUp" })
  if (m.leads) arr.push({ label: "Lead Growth", value: String(m.leads), icon: "Target" })
  if (m.rankings) arr.push({ label: "Keyword Rankings", value: String(m.rankings), icon: "Award" })
  if (m.roi) arr.push({ label: "ROI", value: String(m.roi), icon: "BarChart3" })
  return arr
}

export async function fetchCaseBySlug(slug: string): Promise<CaseStudyDetail | null> {
  try {
    const d = await serverFetch<ApiCaseDetail>(`/cases/${slug}`)
    return {
      slug: d.slug,
      title: d.title,
      client: d.clientName || "",
      industry: d.clientIndustry || "",
      category: d.clientIndustry || "SEO",
      gradient: GRADIENT_MAP[d.slug] || "from-primary to-secondary",
      problem: d.problem || "",
      strategy: splitLines(d.strategy),
      results: splitLines(d.results),
      metrics: buildMetricsArray(d.metrics),
    }
  } catch {
    return null
  }
}

export async function fetchAllCaseSlugs(): Promise<string[]> {
  try {
    const data = await serverFetch<{ slug: string }[]>("/cases?published=true")
    return data.map((c) => c.slug)
  } catch {
    return []
  }
}
