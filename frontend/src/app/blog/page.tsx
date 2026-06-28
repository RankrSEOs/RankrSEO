import type { Metadata } from "next"
import BlogContent from "./blog-content"

const BLOGGER_FEED = "https://rankrseo.blogspot.com/feeds/posts/default?alt=json&maxResults=50"

function decodeHtml(str: string): string {
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
}

interface BloggerPost {
  id: string; title: string; url: string; published: string
  author: string; categories: string[]; summary: string
}

async function fetchPosts(): Promise<BloggerPost[]> {
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
      const summary = decodeHtml(((e.summary as Record<string, string>)?.$t || (e.content as Record<string, string>)?.$t || "").replace(/<[^>]*>/g, "").slice(0, 300))
      const id = ((e.id as string)?.split(".").pop()) || url.split("/").pop() || ""
      return { id, title, url, published, author, categories: cats, summary }
    })
  } catch {
    return []
  }
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, strategies, and expert advice to help you master SEO and digital marketing.",
}

export default async function BlogPage() {
  const posts = await fetchPosts()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary to-primary pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Our Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Insights, strategies, and expert advice to help you master SEO and digital marketing.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="bg-background pb-20 sm:pb-28">
          <div className="container px-4">
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-lg font-medium text-foreground">No articles found</p>
              <p className="text-sm text-muted-foreground">Check back soon for new posts.</p>
            </div>
          </div>
        </section>
      ) : (
        <BlogContent initialPosts={posts} />
      )}
    </>
  )
}
