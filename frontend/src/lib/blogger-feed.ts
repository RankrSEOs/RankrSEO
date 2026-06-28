export interface BloggerPost {
  id: string
  title: string
  slug: string
  url: string
  published: string
  author: string
  categories: string[]
  summary: string
  content: string
}

const BLOGGER_FEED = "https://rankrseo.blogspot.com/feeds/posts/default?alt=json&maxResults=50"

function decodeHtml(str: string): string {
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "")
}

function extractSlug(url: string): string {
  return url.split("/").pop()?.replace(".html", "") || ""
}

export async function fetchPosts(): Promise<BloggerPost[]> {
  try {
    const res = await fetch(BLOGGER_FEED, { next: { revalidate: 300 } })
    if (!res.ok) return []
    const data = await res.json()
    const entries = data?.feed?.entry || []
    return entries.map((e: Record<string, unknown>) => {
      const title = decodeHtml((e.title as Record<string, string>)?.$t || "")
      const url = ((e.link as Array<Record<string, string>>)?.find((l) => l.rel === "alternate")?.href) || ""
      const published = (e.published as Record<string, string>)?.$t || ""
      const author = ((e.author as Array<Record<string, unknown>>)?.[0]?.name as Record<string, string>)?.$t || "RankrSEO"
      const cats = (e.category as Array<Record<string, string>>)?.map((c) => c.term) || []
      const rawContent = (e.content as Record<string, string>)?.$t || ""
      const rawSummary = (e.summary as Record<string, string>)?.$t || rawContent
      const summary = decodeHtml(stripHtml(rawSummary).slice(0, 300))
      const content = decodeHtml(stripHtml(rawContent))
      const id = ((e.id as string)?.split(".").pop()) || url.split("/").pop() || ""
      return { id, title, slug: extractSlug(url), url, published, author, categories: cats, summary, content }
    })
  } catch {
    return []
  }
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  } catch {
    return dateStr.slice(0, 10)
  }
}

function getGradient(category: string): string {
  const gradientMap: Record<string, string> = {
    "AI SEO": "from-purple-600 to-indigo-500",
    "Blog": "from-blue-600 to-cyan-500",
    "Blogger SEO": "from-orange-600 to-red-500",
    "Content Marketing": "from-emerald-600 to-teal-500",
    "Conversational SEO": "from-violet-600 to-purple-500",
    "Core Web Vitals": "from-teal-600 to-cyan-500",
    "Digital PR": "from-pink-600 to-rose-500",
    "Ecommerce SEO": "from-green-600 to-emerald-500",
    "Link Building": "from-amber-600 to-orange-500",
    "Local SEO": "from-emerald-600 to-teal-500",
    "Mobile SEO": "from-sky-600 to-blue-500",
    "Technical SEO": "from-slate-600 to-gray-500",
    "Video SEO": "from-red-600 to-rose-500",
    "Voice Search": "from-indigo-600 to-purple-500",
    "SEO": "from-primary to-accent",
  }
  return gradientMap[category] || "from-primary to-secondary"
}

export function getFirstCategory(categories: string[]): string {
  const exclude = new Set(["Blog", "RankrSeo", "Resources", "SEO Services", "Consultation", "Digital Marketing"])
  return categories.find((c) => !exclude.has(c)) || categories[0] || "SEO"
}

export { getGradient as getBlogGradient }
