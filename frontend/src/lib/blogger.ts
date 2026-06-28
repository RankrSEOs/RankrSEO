const BLOGGER_FEED = "https://rankrseo.blogspot.com/feeds/posts/default?alt=json&maxResults=50"

export interface BloggerPost {
  id: string
  title: string
  url: string
  published: string
  author: string
  categories: string[]
  summary: string
}

function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

export async function fetchBloggerPosts(): Promise<BloggerPost[]> {
  try {
    const res = await fetch(BLOGGER_FEED, { next: { revalidate: 300 } })
    if (!res.ok) return []
    const data = await res.json()
    const entries = data?.feed?.entry || []
    return entries.map((e: Record<string, unknown>) => {
      const title = decodeHtml((e.title as Record<string, string>)?.$t || "")
      const url = ((e.link as Array<Record<string, string>>)?.find((l) => l.rel === "alternate")?.href) || ""
      const published = (e.published as Record<string, string>)?.$t || ""
      const author = (e.author as Array<Record<string, unknown>>)?.[0]?.name as Record<string, string> | undefined
      const authorName = author?.$t || "RankrSEO"
      const cats = (e.category as Array<Record<string, string>>)?.map((c) => c.term) || []
      const summary = decodeHtml(((e.summary as Record<string, string>)?.$t || (e.content as Record<string, string>)?.$t || "").replace(/<[^>]*>/g, "").slice(0, 300))
      const id = (e.id as string)?.split(".").pop() || url.split("/").pop() || ""
      return { id, title, url, published, author: authorName, categories: cats, summary }
    })
  } catch {
    return []
  }
}

export async function findBloggerPost(slugOrTitle: string): Promise<BloggerPost | null> {
  const posts = await fetchBloggerPosts()
  const slugLower = slugOrTitle.toLowerCase().replace(/\.html$/, "")
  return (
    posts.find((p) => p.url.toLowerCase().includes(slugLower)) ||
    posts.find((p) => slugify(p.title) === slugLower) ||
    null
  )
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "")
}

export const BLOGGER_URL = "https://rankrseo.blogspot.com"
