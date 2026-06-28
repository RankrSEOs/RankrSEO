"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, ArrowUpRight, Search, Loader2, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
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
    const id = setInterval(handleCarouselNext, 5000)
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
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Real results for real businesses. Explore our case studies and see how we help our clients dominate search and grow revenue.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-background pt-10 pb-6">
        <div className="container px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
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
        </div>
      </section>

      {/* Auto Carousel — one project at a time */}
      <section className="bg-background pb-2">
        <div className="container px-4">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={items[carouselIndex]?.id || "empty"}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col md:flex-row"
              >
                {/* SVG side */}
                {items[carouselIndex] && (
                  <div
                    className="flex min-h-[260px] items-center justify-center md:w-2/5"
                    style={{ backgroundColor: THEME_COLORS[items[carouselIndex].id] || "#334155" }}
                  >
                    <div className="w-4/5 max-w-[280px] opacity-25">
                      <PortfolioImage id={items[carouselIndex].id} />
                    </div>
                  </div>
                )}

                {/* Content side */}
                {items[carouselIndex] && (
                  <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <span className="mb-2 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {items[carouselIndex].category}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                      {items[carouselIndex].title}
                    </h3>
                    <p className="mt-3 max-w-xl text-muted-foreground">
                      {items[carouselIndex].description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {items[carouselIndex].results.slice(0, 3).map((r) => (
                        <span key={r} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          {r}
                        </span>
                      ))}
                      {items[carouselIndex].results.length > 3 && (
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          +{items[carouselIndex].results.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                      <button
                        onClick={() => setSelectedItem(items[carouselIndex])}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        View Details
                        <ArrowUpRight className="size-4" />
                      </button>
                      {items[carouselIndex].website && (
                        <a
                          href={items[carouselIndex].website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          Visit Website
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 border-t border-border bg-background/80 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={cn(
                      "size-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                      i === carouselIndex
                        ? "w-6 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                    )}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCarouselPaused((p) => !p)}
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                  aria-label={carouselPaused ? "Resume auto-play" : "Pause auto-play"}
                >
                  {carouselPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                </button>
                <button
                  onClick={handleCarouselPrev}
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={handleCarouselNext}
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                  aria-label="Next project"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-background pb-20 sm:pb-28">
        <div className="container px-4">
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {!loading && (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                    <div className="relative flex h-48 items-end justify-end overflow-hidden p-4" style={{ backgroundColor: THEME_COLORS[item.id] || "#334155" }}>
                      <div className="absolute inset-0 opacity-20">
                        <PortfolioImage id={item.id} />
                      </div>
                      <span className="relative z-10 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                        View Project
                        <ArrowUpRight className="size-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          )}

          {!loading && filteredItems.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <Search className="size-12 text-muted-foreground/40" />
              <p className="text-lg font-medium text-foreground">No projects found</p>
              <p className="text-sm text-muted-foreground">Try a different category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog.Root open={!!selectedItem} onOpenChange={(open) => { if (!open) setSelectedItem(null) }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border bg-background p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-8">
            {selectedItem && (
              <>
                <Dialog.Close className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground">
                  <X className="size-4" />
                </Dialog.Close>

                <div className="relative flex h-40 items-end justify-end overflow-hidden rounded-xl p-4 sm:h-52" style={{ backgroundColor: THEME_COLORS[selectedItem.id] || "#334155" }}>
                  <div className="absolute inset-0 opacity-20">
                    <PortfolioImage id={selectedItem.id} />
                  </div>
                  <span className="relative z-10 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
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
