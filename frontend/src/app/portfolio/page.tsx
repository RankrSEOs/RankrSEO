"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, ArrowUpRight, Search, Loader2 } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

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

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [items, setItems] = useState<PortfolioItem[]>(hardcodedPortfolio)
  const [loading, setLoading] = useState(true)

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
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
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
                    <div className={cn("flex h-48 items-end justify-end bg-gradient-to-br p-4", item.gradient)}>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
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

                <div className={cn("flex h-40 items-end justify-end rounded-xl bg-gradient-to-br p-4 sm:h-52", selectedItem.gradient)}>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
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
