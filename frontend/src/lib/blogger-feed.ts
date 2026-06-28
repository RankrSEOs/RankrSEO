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

const fallbackPosts: BloggerPost[] = [
  { id: "voice-search-seo-guide", slug: "voice-search-seo-guide", title: "Voice Search SEO — Optimize for Conversational AI & Voice Assistants", url: "https://rankrseo.blogspot.com/2026/06/voice-search-seo-guide.html", published: "2026-06-27T22:46:21.309-07:00", author: "Amit Kumar", categories: ["AI SEO", "Conversational SEO", "Voice Search"], summary: "Voice search is transforming how users interact with search engines. Learn how to optimize your content for conversational queries, featured snippets, and AI-powered voice assistants like Siri, Google Assistant, and Alexa.", content: "" },
  { id: "video-seo-optimization-guide", slug: "video-seo-optimization-guide", title: "Video SEO Guide — How to Rank YouTube & Web Videos in 2026", url: "https://rankrseo.blogspot.com/2026/06/video-seo-optimization-guide.html", published: "2026-06-27T22:44:40.398-07:00", author: "Amit Kumar", categories: ["Video SEO", "Content Marketing"], summary: "YouTube is the second-largest search engine. Master video SEO with strategies for keyword research, thumbnails, transcripts, and YouTube optimization to boost your video rankings.", content: "" },
  { id: "seo-reporting-guide", slug: "seo-reporting-guide", title: "SEO Reporting Guide — What to Track, Tools & How to Report to Clients", url: "https://rankrseo.blogspot.com/2026/06/seo-reporting-guide.html", published: "2026-06-27T22:40:50.786-07:00", author: "Amit Kumar", categories: ["SEO", "SEO Reporting", "Analytics"], summary: "Effective SEO reporting builds trust and demonstrates ROI. Learn what metrics matter, which tools to use, and how to create client-ready SEO reports.", content: "" },
  { id: "seo-for-saas-companies", slug: "seo-for-saas-companies", title: "SEO for SaaS Companies — A Complete Growth Strategy Guide", url: "https://rankrseo.blogspot.com/2026/06/seo-for-saas-companies.html", published: "2026-06-27T22:36:46.775-07:00", author: "Amit Kumar", categories: ["SEO", "SaaS SEO", "B2B SEO", "Content Marketing"], summary: "SaaS companies face unique SEO challenges. This guide covers product-led content, documentation SEO, competitive keyword strategies, and conversion optimization for SaaS.", content: "" },
  { id: "mobile-seo-best-practices", slug: "mobile-seo-best-practices", title: "Mobile SEO Best Practices — Optimize for Mobile-First Indexing in 2026", url: "https://rankrseo.blogspot.com/2026/06/mobile-seo-best-practices.html", published: "2026-06-27T22:30:22.195-07:00", author: "Amit Kumar", categories: ["Mobile SEO", "Technical SEO", "Core Web Vitals"], summary: "Google uses mobile-first indexing. Ensure your site is optimized for mobile with responsive design, fast loading, proper viewport settings, and touch-friendly navigation.", content: "" },
  { id: "affordable-seo-services", slug: "affordable-seo-services", title: "Affordable SEO Services — Budget-Friendly SEO Without Cutting Corners", url: "https://rankrseo.blogspot.com/2026/06/affordable-seo-services.html", published: "2026-06-22T07:11:52.664-07:00", author: "Amit Kumar", categories: ["SEO", "SEO Services"], summary: "Quality SEO doesn't have to break the bank. Learn how affordable SEO services can deliver real results with transparent pricing and ethical white-hat strategies.", content: "" },
  { id: "ai-seo-guide", slug: "ai-seo-guide", title: "The Complete AI SEO Guide 2026 — Optimize for ChatGPT, Google SGE & Beyond", url: "https://rankrseo.blogspot.com/2026/06/ai-seo-guide.html", published: "2026-06-22T07:10:49.581-07:00", author: "Amit Kumar", categories: ["AI SEO", "GEO"], summary: "AI is reshaping search. Learn how to optimize for Google SGE, ChatGPT, Gemini, and other AI-powered search platforms with this comprehensive AI SEO guide.", content: "" },
  { id: "ai-seo-services", slug: "ai-seo-services", title: "AI SEO Services — Optimize for ChatGPT, Google SGE & AI Search", url: "https://rankrseo.blogspot.com/2026/06/ai-seo-services.html", published: "2026-06-22T07:09:45.238-07:00", author: "Amit Kumar", categories: ["AI SEO", "SEO Services"], summary: "Prepare your business for the AI search revolution. Our AI SEO services help you optimize for ChatGPT, Google SGE, and generative AI search platforms.", content: "" },
  { id: "answer-engine-optimization-guide", slug: "answer-engine-optimization-guide", title: "Answer Engine Optimization Guide — Prepare for AI-Powered Search", url: "https://rankrseo.blogspot.com/2026/06/answer-engine-optimization-guide.html", published: "2026-06-22T07:08:41.679-07:00", author: "Amit Kumar", categories: ["AI SEO", "GEO"], summary: "Search is evolving from links to answers. Learn how to optimize your content for AI-powered answer engines like ChatGPT, Perplexity, and Google SGE.", content: "" },
  { id: "blog-content-strategy-guide", slug: "blog-content-strategy-guide", title: "Blog Content Strategy Guide — Plan a Blog That Drives Traffic", url: "https://rankrseo.blogspot.com/2026/06/blog-content-strategy-guide.html", published: "2026-06-22T07:07:34.312-07:00", author: "Amit Kumar", categories: ["Blog", "Content Marketing"], summary: "A strategic blog is your most powerful SEO asset. Learn how to plan, create, and promote blog content that ranks, drives traffic, and generates leads.", content: "" },
  { id: "blogger-schema-markup-guide", slug: "blogger-schema-markup-guide", title: "Blogger Schema Markup Guide — Add Structured Data to Blogspot", url: "https://rankrseo.blogspot.com/2026/06/blogger-schema-markup-guide.html", published: "2026-06-22T07:06:27.252-07:00", author: "Amit Kumar", categories: ["Blog", "Blogger SEO"], summary: "Add schema markup to your Blogger blog to enhance search results with rich snippets and improve your CTR from organic search.", content: "" },
  { id: "blogger-seo-guide-2026", slug: "blogger-seo-guide-2026", title: "Blogger SEO Guide (2026) — Complete Optimization for Blogspot", url: "https://rankrseo.blogspot.com/2026/06/blogger-seo-guide-2026.html", published: "2026-06-22T07:05:19.540-07:00", author: "Amit Kumar", categories: ["Blog", "Blogger SEO"], summary: "Complete Blogger SEO guide covering technical optimization, content strategy, keyword research, and on-page SEO for Blogspot blogs.", content: "" },
  { id: "blogger-seo", slug: "blogger-seo", title: "Blogger SEO Services — Optimize Your Blogspot Blog for Higher Rankings", url: "https://rankrseo.blogspot.com/2026/06/blogger-seo.html", published: "2026-06-22T07:04:12.547-07:00", author: "Amit Kumar", categories: ["Blogger SEO", "SEO Services"], summary: "Specialized Blogger SEO services to optimize your Blogspot blog for better search rankings, faster loading, and improved user experience.", content: "" },
  { id: "blogger-speed-optimization-guide", slug: "blogger-speed-optimization-guide", title: "Blogger Speed Optimization Guide — Make Your Blogspot Fast", url: "https://rankrseo.blogspot.com/2026/06/blogger-speed-optimization-guide.html", published: "2026-06-22T07:03:03.521-07:00", author: "Amit Kumar", categories: ["Blog", "Blogger SEO"], summary: "Speed matters for SEO and user experience. Learn how to optimize your Blogger blog for lightning-fast loading times.", content: "" },
  { id: "blogger-theme-seo-optimization", slug: "blogger-theme-seo-optimization", title: "Blogger Theme SEO Optimization — XML Theme Best Practices", url: "https://rankrseo.blogspot.com/2026/06/blogger-theme-seo-optimization.html", published: "2026-06-22T06:59:13.678-07:00", author: "Amit Kumar", categories: ["Blog", "Blogger SEO"], summary: "Optimize your Blogger XML theme for SEO with proper heading structure, schema markup, mobile responsiveness, and fast loading.", content: "" },
  { id: "blogger-vs-wordpress-for-seo", slug: "blogger-vs-wordpress-for-seo", title: "Blogger vs WordPress for SEO — Which Platform Ranks Better?", url: "https://rankrseo.blogspot.com/2026/06/blogger-vs-wordpress-for-seo.html", published: "2026-06-22T06:54:47.364-07:00", author: "Amit Kumar", categories: ["Blog", "Blogger SEO", "WordPress SEO"], summary: "Compare Blogger and WordPress for SEO performance, customization, speed, and ranking potential to choose the right platform for your blog.", content: "" },
  { id: "book-seo-consultation", slug: "book-seo-consultation", title: "Book a Free SEO Consultation — Discuss Your Growth Goals", url: "https://rankrseo.blogspot.com/2026/06/book-seo-consultation.html", published: "2026-06-22T06:53:39.940-07:00", author: "Amit Kumar", categories: ["Consultation", "SEO"], summary: "Schedule a free SEO consultation with RankrSEO. Discuss your business goals and get a custom growth strategy from our experienced SEO team.", content: "" },
  { id: "seo-case-studies", slug: "seo-case-studies", title: "SEO Case Studies — Real Results from RankrSEO Clients", url: "https://rankrseo.blogspot.com/2026/06/seo-case-studies.html", published: "2026-06-22T06:52:32.682-07:00", author: "Amit Kumar", categories: ["Case Studies", "SEO"], summary: "Real SEO results from real clients. Browse our case studies showcasing traffic increases, ranking improvements, and revenue growth.", content: "" },
  { id: "chatgpt-seo-optimization", slug: "chatgpt-seo-optimization", title: "ChatGPT SEO Optimization — How to Rank in ChatGPT Search Results", url: "https://rankrseo.blogspot.com/2026/06/chatgpt-seo-optimization.html", published: "2026-06-22T06:51:17.122-07:00", author: "Amit Kumar", categories: ["AI SEO", "GEO"], summary: "Learn how to optimize your content for ChatGPT search results. Understand how AI models rank information and how to appear in GPT-powered answers.", content: "" },
  { id: "content-marketing", slug: "content-marketing", title: "Content Marketing Services — Drive Traffic & Generate Leads", url: "https://rankrseo.blogspot.com/2026/06/content-marketing.html", published: "2026-06-22T06:50:06.486-07:00", author: "Amit Kumar", categories: ["Content Marketing", "SEO Services"], summary: "Data-driven content marketing services that attract, engage, and convert your target audience with SEO-optimized content.", content: "" },
  { id: "core-web-vitals-optimization-guide", slug: "core-web-vitals-optimization-guide", title: "Core Web Vitals Optimization Guide — Improve LCP, FID & CLS", url: "https://rankrseo.blogspot.com/2026/06/core-web-vitals-optimization-guide.html", published: "2026-06-22T06:48:20.142-07:00", author: "Amit Kumar", categories: ["Technical SEO", "Core Web Vitals"], summary: "Master Core Web Vitals optimization. Learn how to improve LCP, FID, and CLS scores to boost your search rankings and user experience.", content: "" },
  { id: "crawl-budget-optimization-guide", slug: "crawl-budget-optimization-guide", title: "Crawl Budget Optimization Guide — Help Google Crawl What Matters", url: "https://rankrseo.blogspot.com/2026/06/crawl-budget-optimization-guide.html", published: "2026-06-22T06:47:08.964-07:00", author: "Amit Kumar", categories: ["Technical SEO"], summary: "Optimize your crawl budget to ensure Googlebot discovers and indexes your most important pages. Technical SEO guide for large websites.", content: "" },
  { id: "digital-marketing", slug: "digital-marketing", title: "Digital Marketing Services — Full-Funnel Growth Solutions", url: "https://rankrseo.blogspot.com/2026/06/digital-marketing.html", published: "2026-06-22T06:46:00.361-07:00", author: "Amit Kumar", categories: ["Digital Marketing", "SEO Services"], summary: "Full-funnel digital marketing services including SEO, PPC, social media, content marketing, and web design to grow your business online.", content: "" },
  { id: "digital-pr-for-link-building", slug: "digital-pr-for-link-building", title: "Digital PR for Link Building — Earn Press Coverage & Authority Links", url: "https://rankrseo.blogspot.com/2026/06/digital-pr-for-link-building.html", published: "2026-06-22T06:44:49.565-07:00", author: "Amit Kumar", categories: ["Link Building", "Digital PR"], summary: "Digital PR is a scalable link building strategy. Learn how to earn press coverage, journalist links, and authoritative backlinks through digital PR.", content: "" },
  { id: "ecommerce-seo-checklist", slug: "ecommerce-seo-checklist", title: "Ecommerce SEO Checklist — 30-Point Guide for Online Stores", url: "https://rankrseo.blogspot.com/2026/06/ecommerce-seo-checklist.html", published: "2026-06-22T06:43:34.360-07:00", author: "Amit Kumar", categories: ["Ecommerce SEO"], summary: "Complete ecommerce SEO checklist covering product page optimization, category structure, technical SEO, and off-page strategies for online stores.", content: "" },
]

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
    const res = await fetch(BLOGGER_FEED, { headers: { "User-Agent": "RankrSEO/1.0" } })
    if (!res.ok) return fallbackPosts
    const data = await res.json()
    const entries = data?.feed?.entry || []
    if (entries.length === 0) return fallbackPosts
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
    return fallbackPosts
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
