"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search, ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  gradient: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "seo-trends-2026",
    title: "SEO Trends to Dominate in 2026",
    excerpt: "Stay ahead of the curve with the latest SEO trends including AI search, EEAT, and voice search optimization.",
    category: "SEO",
    author: "Amit Kumar",
    date: "2026-06-01",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    id: "2",
    slug: "local-seo-guide",
    title: "The Ultimate Guide to Local SEO in 2026",
    excerpt: "Learn how to dominate local search results with Google Business Profile optimization and local citations.",
    category: "Local SEO",
    author: "Priya Sharma",
    date: "2026-05-25",
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    id: "3",
    slug: "web-design-conversion",
    title: "How Web Design Impacts Conversion Rates",
    excerpt: "Discover the key design principles that turn visitors into customers and boost your bottom line.",
    category: "Web Design",
    author: "Rahul Verma",
    date: "2026-05-18",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: "4",
    slug: "ppc-budget-optimization",
    title: "Maximize ROI: PPC Budget Optimization Strategies",
    excerpt: "Get the most out of your ad spend with data-driven bidding, audience targeting, and ad copy testing.",
    category: "PPC",
    author: "Amit Kumar",
    date: "2026-05-10",
    gradient: "from-orange-600 to-red-500",
  },
  {
    id: "5",
    slug: "content-marketing-strategy",
    title: "Building a Content Marketing Strategy That Works",
    excerpt: "From keyword research to distribution, build a content engine that drives traffic and leads.",
    category: "Content Marketing",
    author: "Priya Sharma",
    date: "2026-05-02",
    gradient: "from-cyan-600 to-blue-500",
  },
  {
    id: "6",
    slug: "technical-seo-checklist",
    title: "Technical SEO Checklist: 20 Essential Checks",
    excerpt: "A comprehensive technical SEO audit checklist covering core web vitals, crawlability, and schema markup.",
    category: "SEO",
    author: "Rahul Verma",
    date: "2026-04-25",
    gradient: "from-slate-600 to-gray-500",
  },
]

const categories = ["All", "SEO", "Local SEO", "Web Design", "PPC", "Content Marketing"]

const POSTS_PER_PAGE = 4

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    let posts = blogPosts
    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
    }
    return posts
  }, [activeCategory, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary to-primary pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="container relative z-10 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Insights, strategies, and expert advice to help you master SEO and digital marketing.
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-background pt-10 pb-6">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1) }}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
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
      <section className="bg-background pb-20 sm:pb-28">
        <div className="container px-4">
          <div className="grid gap-8 sm:grid-cols-2">
            {paginatedPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/5">
                    <div className={cn("flex h-48 items-end bg-gradient-to-br p-4 sm:h-56", post.gradient)}>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="size-3" />
                          {post.author}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read More
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {paginatedPosts.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <Search className="size-12 text-muted-foreground/40" />
              <p className="text-lg font-medium text-foreground">No articles found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filter.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                    page === currentPage
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-foreground hover:bg-muted",
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
