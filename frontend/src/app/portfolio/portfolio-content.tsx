"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  X, ArrowUpRight, Search, Loader2, ChevronLeft, ChevronRight,
} from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import PortfolioImage from "@/components/ui/PortfolioImage"

interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  client: string
  results: string[]
  gradient: string
  website?: string
}

const THEME_COLORS: Record<string, string> = {
  excompany: "#475569",
  "zubilo-studio": "#EA580C",
  scrapco: "#16A34A",
  ezdry: "#2563EB",
  pogotunes: "#D97706",
  saferaahia: "#7C3AED",
  rankrseo: "#2563EB",
}

const GRADIENT_MAP: Record<string, string> = {
  "excompany": "from-slate-600 to-gray-500",
  "zubilo-studio": "from-orange-600 to-red-500",
  "scrapco": "from-green-600 to-emerald-500",
  "ezdry": "from-blue-600 to-cyan-500",
  "pogotunes": "from-yellow-500 to-orange-500",
  "saferaahia": "from-purple-600 to-pink-500",
  "rankrseo": "from-primary to-accent",
}

const hardcodedPortfolio: PortfolioItem[] = [
  {
    id: "excompany", title: "ExCompany", category: "Corporate",
    description: "Developed a professional corporate website for a business consulting firm — full SEO, performance optimization, and ongoing search visibility management.",
    client: "ExCompany",
    results: ["Website Development", "Technical SEO", "On Page SEO", "Performance Optimization", "Search Visibility Improvements"],
    gradient: "from-slate-600 to-gray-500",
    website: "https://www.excompany.in/",
  },
  {
    id: "zubilo-studio", title: "Zubilo Studio", category: "Web Design",
    description: "Built a brand-first creative studio website with custom animations, bold visuals, SEO strategy, and technical content optimization.",
    client: "Zubilo Studio",
    results: ["Website Development", "SEO Strategy", "Technical SEO", "Content Optimization", "Search Engine Visibility"],
    gradient: "from-orange-600 to-red-500",
    website: "https://www.zubilo.studio/",
  },
  {
    id: "scrapco", title: "ScrapCo", category: "Web Development",
    description: "Designed and developed a scrap pickup marketplace connecting households, shops, and factories with verified vendors — with full technical SEO and architecture planning.",
    client: "ScrapCo",
    results: ["Product Website Development", "Technical SEO", "Search Optimization", "Website Architecture Planning", "Performance Improvements"],
    gradient: "from-green-600 to-emerald-500",
    website: "https://www.scrapco.app/",
  },
  {
    id: "ezdry", title: "EZ Dry", category: "Web Design",
    description: "Built a laundry service platform with online booking, location-based service areas, local SEO, and business visibility optimization.",
    client: "EZ Dry",
    results: ["Website Design", "Website Development", "Local SEO", "Technical SEO", "Business Visibility Optimization"],
    gradient: "from-blue-600 to-cyan-500",
    website: "https://www.ezdry.in/",
  },
  {
    id: "pogotunes", title: "PogoTunes", category: "Web Development",
    description: "Designed a fun kids' learning platform with 500+ educational videos, 50+ interactive games, UI/UX design, and SEO foundation setup.",
    client: "PogoTunes",
    results: ["Website Development", "UI/UX Design", "Technical Optimization", "SEO Foundation Setup", "Multi-Language Content"],
    gradient: "from-yellow-500 to-orange-500",
    website: "https://pogotunes.vercel.app/",
  },
  {
    id: "saferaahia", title: "Safe Raahia", category: "Web Development",
    description: "Developed a social initiative safety website with performance optimization, technical SEO, and content structure planning.",
    client: "Safe Raahia",
    results: ["Website Development", "Performance Optimization", "Technical SEO", "Content Structure Planning", "Social Initiative"],
    gradient: "from-purple-600 to-pink-500",
    website: "https://saferaahia.netlify.app/",
  },
  {
    id: "rankrseo", title: "RankrSEO", category: "Full Service",
    description: "Complete agency website — design, development, SEO strategy, branding, UI/UX, and conversion optimization for RankrSEO itself.",
    client: "RankrSEO",
    results: ["Complete Design & Development", "SEO Strategy", "Content Strategy", "Branding & UI/UX", "Conversion Optimization"],
    gradient: "from-primary to-accent",
    website: "https://rankrseo.vercel.app/",
  },
]

const categories = ["All", "Web Design", "Web Development", "Full Service", "Corporate"]
const caseStudySlugs = new Set(["techflow-seo", "greenleaf-web", "brickhouse-local"])

export default function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [items, setItems] = useState<PortfolioItem[]>(hardcodedPortfolio)
  const [loading, setLoading] = useState(true)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [carouselPaused, setCarouselPaused] = useState(false)

  const handleCarouselNext = useCallback(() => {
    setCarouselIndex((i) => (i + 1) % items.length)
  }, [items.length])

  const handleCarouselPrev = useCallback(() => {
    setCarouselIndex((i) => (i - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    if (carouselIndex >= items.length) setCarouselIndex(0)
  }, [items.length, carouselIndex])

  useEffect(() => {
    if (carouselPaused || items.length < 2) return
    const id = setInterval(handleCarouselNext, 6000)
    return () => clearInterval(id)
  }, [carouselPaused, items.length, handleCarouselNext])

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.length) {
          setItems(data.map((p: Record<string, unknown>) => ({
            id: p.slug as string,
            title: p.title as string,
            category: (p.category || "") as string,
            description: (p.description || "") as string,
            client: (p.clientName || "") as string,
            results: (p.tags || []) as string[],
            gradient: GRADIENT_MAP[p.slug as string] || "from-primary to-secondary",
            website: (p.liveUrl as string) || undefined,
          })))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filteredItems = useMemo(
    () =>
      activeFilter === "All"
        ? items
        : items.filter((item) => item.category === activeFilter),
    [activeFilter, items],
  )

  const currentItem = items[carouselIndex]

  return (
    <>
      {/* ────────────── HERO CAROUSEL ────────────── */}
      <section
        className="relative flex min-h-[70vh] items-center overflow-hidden sm:min-h-[80vh]"
        style={{ backgroundColor: THEME_COLORS[currentItem?.id] || "#0F172A" }}
      >
        {/* Decorative grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Animated content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem?.id || "empty"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container relative z-10 px-4 py-24 sm:py-32"
          >
            {currentItem && (
              <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                {/* Left — text */}
                <div>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm"
                  >
                    {currentItem.category}
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                  >
                    {currentItem.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
                  >
                    {currentItem.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 flex flex-wrap items-center gap-4"
                  >
                    {currentItem.results.slice(0, 3).map((r) => (
                      <span
                        key={r}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
                      >
                        {r}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex flex-wrap items-center gap-4"
                  >
                    <button
                      onClick={() => setSelectedItem(currentItem)}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-all hover:bg-white/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                    >
                      View Details
                      <ArrowUpRight className="size-4" />
                    </button>
                    {currentItem.website && (
                      <a
                        href={currentItem.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                      >
                        Visit Website
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Right — SVG illustration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="hidden justify-center md:flex"
                >
                  <div className="w-full max-w-[420px] opacity-30">
                    <PortfolioImage id={currentItem.id} />
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-4 bg-gradient-to-t from-black/40 to-transparent px-4 pb-8 pt-16">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={cn(
                  "rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  i === carouselIndex
                    ? "h-2.5 w-8 bg-white"
                    : "h-2.5 w-2.5 bg-white/40 hover:bg-white/70",
                )}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div className="ml-4 flex items-center gap-1">
            <button
              onClick={handleCarouselPrev}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous project"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={handleCarouselNext}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next project"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              onClick={() => setCarouselPaused((p) => !p)}
              className="ml-1 flex size-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={carouselPaused ? "Resume auto-play" : "Pause auto-play"}
            >
              {carouselPaused ? "▶" : "❚❚"}
            </button>
          </div>
        </div>
      </section>

      {/* ────────────── ALL PROJECTS ────────────── */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container px-4">
          {/* Section header */}
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Work
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              All Projects
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Browse our complete portfolio across every category.
            </p>
          </div>

          {/* Filter bar */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5">
                      {/* SVG header */}
                      <div
                        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden p-8"
                        style={{ backgroundColor: THEME_COLORS[item.id] || "#334155" }}
                      >
                        <div className="w-full max-w-[200px] opacity-25 transition-all duration-500 group-hover:scale-110 group-hover:opacity-35">
                          <PortfolioImage id={item.id} />
                        </div>
                        <span className="absolute right-3 top-3 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>

                      {/* Card body */}
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>

                        {/* Result tags */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.results.slice(0, 2).map((r) => (
                            <span
                              key={r}
                              className="rounded-full bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                            >
                              {r}
                            </span>
                          ))}
                          {item.results.length > 2 && (
                            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                              +{item.results.length - 2}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                          View Project
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && filteredItems.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <Search className="size-12 text-muted-foreground/40" />
              <p className="text-lg font-medium text-foreground">No projects found</p>
              <p className="text-sm text-muted-foreground">Try a different category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ────────────── DETAIL MODAL ────────────── */}
      <Dialog.Root open={!!selectedItem} onOpenChange={(open) => { if (!open) setSelectedItem(null) }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border bg-background p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-8">
            {selectedItem && (
              <>
                <Dialog.Close className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground">
                  <X className="size-4" />
                </Dialog.Close>

                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl p-8 sm:aspect-[3/1]"
                  style={{ backgroundColor: THEME_COLORS[selectedItem.id] || "#334155" }}
                >
                  <div className="w-full max-w-[200px] opacity-25 sm:max-w-[260px]">
                    <PortfolioImage id={selectedItem.id} />
                  </div>
                  <span className="absolute right-3 top-3 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {selectedItem.category}
                  </span>
                </div>

                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{selectedItem.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Client: {selectedItem.client}</p>
                  <p className="mt-4 text-muted-foreground">{selectedItem.description}</p>

                  <h3 className="mt-6 font-semibold text-foreground">Key Results</h3>
                  <ul className="mt-3 space-y-2">
                    {selectedItem.results.map((result) => (
                      <li key={result} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-accent" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {selectedItem.website && (
                    <a
                      href={selectedItem.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                    >
                      Visit Website
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  {caseStudySlugs.has(selectedItem.id) && (
                    <Link
                      href={`/cases/${selectedItem.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      View Full Case Study
                      <ArrowUpRight className="size-4" />
                    </Link>
                  )}
                  <Dialog.Close className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                    Close
                  </Dialog.Close>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
