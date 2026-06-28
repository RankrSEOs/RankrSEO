"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  X, ArrowUpRight, Search, Loader2, ChevronLeft, ChevronRight,
  ExternalLink, Sparkles, Eye, Globe,
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
  electrobridge: "#2563EB",
  rankrseo: "#2563EB",
}

const GRADIENT_MAP: Record<string, string> = {
  "excompany": "from-slate-600 to-gray-500",
  "zubilo-studio": "from-orange-600 to-red-500",
  "scrapco": "from-green-600 to-emerald-500",
  "ezdry": "from-blue-600 to-cyan-500",
  "pogotunes": "from-yellow-500 to-orange-500",
  "saferaahia": "from-purple-600 to-pink-500",
  "electrobridge": "from-blue-600 to-accent",
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
    id: "electrobridge", title: "ElectroBridge", category: "Web Development",
    description: "Built a modern electrical services marketplace platform with online booking, service area management, local SEO optimization, and real-time quote generation.",
    client: "ElectroBridge",
    results: ["Website Development", "Local SEO", "Technical SEO", "Online Booking System", "Performance Optimization"],
    gradient: "from-blue-600 to-accent",
    website: "https://electrobridge.vercel.app/",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const categoryGradients: Record<string, string> = {
  "Corporate": "from-slate-500/20 to-slate-600/10",
  "Web Design": "from-orange-500/20 to-red-500/10",
  "Web Development": "from-green-500/20 to-emerald-500/10",
  "Full Service": "from-primary/20 to-accent/10",
}

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
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

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
                    className="mt-8 flex flex-wrap items-center gap-3"
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
                      className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-all duration-300 hover:bg-white/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                    >
                      <Eye className="size-4" />
                      View Details
                    </button>
                    {currentItem.website && (
                      <a
                        href={currentItem.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 underline-offset-4 transition-all hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                      >
                        <Globe className="size-4" />
                        Visit Website
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </motion.div>
                </div>

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

        {/* Carousel controls */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-6 bg-gradient-to-t from-black/40 to-transparent px-4 pb-8 pt-16">
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={cn(
                  "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                  i === carouselIndex
                    ? "h-2.5 w-8 bg-white shadow-md"
                    : "h-2.5 w-2.5 bg-white/30 hover:bg-white/60",
                )}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCarouselPrev}
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous project"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={handleCarouselNext}
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next project"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              onClick={() => setCarouselPaused((p) => !p)}
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={carouselPaused ? "Resume auto-play" : "Pause auto-play"}
            >
              {carouselPaused ? "▶" : "❚❚"}
            </button>
          </div>
        </div>
      </section>

      {/* ────────────── ALL PROJECTS ────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              <Sparkles className="size-3" />
              Our Work
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              All Projects
            </h2>
            <p className="mt-3 text-muted-foreground">
              Browse our complete portfolio across every category.
            </p>
          </motion.div>

          {/* Filter bar */}
          <div className="mt-10 mb-12 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {!loading && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    variants={cardVariants}
                    className="group cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
                      <div
                        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden p-8"
                        style={{ backgroundColor: THEME_COLORS[item.id] || "#334155" }}
                      >
                        <div className="w-full max-w-[180px] opacity-25 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40">
                          <PortfolioImage id={item.id} />
                        </div>
                        <span className="absolute right-3 top-3 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {item.category}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>

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

                        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          View Project
                          <Eye className="size-3.5 transition-all duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-20 text-center"
            >
              <Search className="size-12 text-muted-foreground/30" />
              <p className="text-lg font-medium text-foreground">No projects found</p>
              <p className="text-sm text-muted-foreground">Try a different category filter.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ────────────── DETAIL MODAL ────────────── */}
      <Dialog.Root open={!!selectedItem} onOpenChange={(open) => { if (!open) setSelectedItem(null) }}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          >
            {selectedItem && (
              <div className="relative max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-background shadow-2xl">
                {/* Close button */}
                <Dialog.Close className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:bg-muted hover:text-foreground hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <X className="size-4" />
                </Dialog.Close>

                {/* Header with SVG */}
                <div
                  className="relative flex aspect-[5/2] items-center justify-center overflow-hidden sm:aspect-[4/1]"
                  style={{ backgroundColor: THEME_COLORS[selectedItem.id] || "#0F172A" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="w-full max-w-[280px] opacity-20 sm:max-w-[360px]">
                    <PortfolioImage id={selectedItem.id} />
                  </div>
                  <span className="absolute left-6 top-6 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {selectedItem.category}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="grid gap-8 lg:grid-cols-5">
                    {/* Left — details */}
                    <div className="lg:col-span-3">
                      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{selectedItem.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Client: {selectedItem.client}</p>
                      <p className="mt-4 leading-relaxed text-muted-foreground">{selectedItem.description}</p>

                      <h3 className="mt-8 font-semibold text-foreground">Key Results</h3>
                      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {selectedItem.results.map((result) => (
                          <div
                            key={result}
                            className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 p-3 text-sm text-muted-foreground transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
                          >
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                              ✓
                            </span>
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right — actions */}
                    <div className="lg:col-span-2">
                      <div className="sticky top-4 space-y-4 rounded-2xl border border-border/50 bg-muted/20 p-6">
                        <h3 className="font-semibold text-foreground">Quick Actions</h3>

                        {selectedItem.website && (
                          <a
                            href={selectedItem.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <ExternalLink className="size-4" />
                            Visit Website
                            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}

                        {caseStudySlugs.has(selectedItem.id) && (
                          <Link
                            href={`/cases/${selectedItem.id}`}
                            className="group flex w-full items-center justify-center gap-2.5 rounded-2xl border border-border/50 bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
                          >
                            <Eye className="size-4" />
                            View Full Case Study
                            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        )}

                        <div className="pt-2">
                          <Dialog.Close className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-border/30 px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-border hover:bg-muted/50 hover:text-foreground">
                            Close
                          </Dialog.Close>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
