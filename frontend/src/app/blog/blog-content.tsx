"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, ChevronLeft, ChevronRight, Calendar, User, ArrowRight, Loader2, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import BlogFeaturedImage from "@/components/ui/BlogFeaturedImage"

interface BloggerPost {
  id: string; title: string; slug: string; url: string; published: string
  author: string; categories: string[]; summary: string
}

const POSTS_PER_PAGE = 6

const allCategories = ["All", "SEO", "AI SEO", "Technical SEO", "Local SEO", "Content Marketing", "Web Design", "PPC", "Link Building", "Ecommerce SEO", "Blogger SEO"]

function getDisplayCategories(cats: string[]): string[] {
  const exclude = new Set(["Blog", "RankrSeo", "Resources", "SEO Services", "Consultation", "Digital Marketing"])
  return cats.filter((c) => !exclude.has(c))
}

function formatDate(dateStr: string): string {
  try { return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) }
  catch { return dateStr.slice(0, 10) }
}

export default function BlogContent({ initialPosts }: { initialPosts: BloggerPost[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    let result = initialPosts
    if (activeCategory !== "All") {
      const cat = activeCategory.toLowerCase()
      result = result.filter((p) => p.categories.some((c) => c.toLowerCase() === cat))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.categories.some((c) => c.toLowerCase().includes(q)),
      )
    }
    return result
  }, [activeCategory, searchQuery, initialPosts])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F] py-24 sm:py-28">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} />
        <motion.div className="absolute -top-40 -left-40 size-96 rounded-full bg-primary/15 blur-[120px] animate-breathe" />
        <motion.div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-accent/10 blur-[120px] animate-breathe" style={{ animationDelay: "2s" }} />
        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 backdrop-blur-sm mb-6">
              <BookOpen className="size-3" />
              Blog & Insights
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
              SEO Tips, Tricks & Insights
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Stay ahead of the curve with actionable SEO strategies, industry trends, and expert guides.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="relative overflow-hidden py-10 pb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1) }}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="relative overflow-hidden pb-20 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="container relative z-10 px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post, i) => (
              <motion.article
                key={post.id || post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <a href={post.slug ? `/blog/${post.slug}` : post.url} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-primary/5 h-full flex flex-col">
                    <BlogFeaturedImage
                      title={post.title}
                      category={post.categories[0]}
                      className="h-48 sm:h-44 rounded-none rounded-t-2xl"
                    />
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="size-3" />{formatDate(post.published)}</span>
                        <span className="flex items-center gap-1"><User className="size-3" />{post.author}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground flex-1">{post.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Read More<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>

          {paginatedPosts.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <Search className="size-12 text-muted-foreground/30" />
              <p className="text-lg font-medium text-foreground">No articles found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filter.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                className="flex size-10 items-center justify-center rounded-xl border border-border/50 bg-card text-foreground transition-all duration-200 hover:border-primary/30 hover:text-primary hover:shadow-md disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <ChevronLeft className="size-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => handlePageChange(page)}
                  className={cn("flex size-10 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    page === currentPage ? "bg-primary text-primary-foreground shadow-md" : "border border-border/50 bg-card text-foreground hover:border-primary/30 hover:text-primary hover:shadow-md")}>
                  {page}
                </button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                className="flex size-10 items-center justify-center rounded-xl border border-border/50 bg-card text-foreground transition-all duration-200 hover:border-primary/30 hover:text-primary hover:shadow-md disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
