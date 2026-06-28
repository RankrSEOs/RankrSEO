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
}

const GRADIENT_MAP: Record<string, string> = {
  "techflow-seo": "from-blue-600 to-cyan-500",
  "greenleaf-web": "from-emerald-600 to-teal-500",
  "brickhouse-local": "from-amber-600 to-orange-500",
  "quantum-ppc": "from-violet-600 to-purple-500",
  "sprout-content": "from-pink-600 to-rose-500",
  "nexus-seo": "from-indigo-600 to-blue-500",
  "urban-web": "from-sky-600 to-blue-500",
  "peak-local": "from-red-600 to-rose-500",
  "guru": "from-purple-600 to-pink-500",
  "scrapco": "from-green-600 to-emerald-500",
  "zubilo-studio": "from-orange-600 to-red-500",
  "ezdry": "from-blue-600 to-cyan-500",
  "pogotunes": "from-yellow-500 to-orange-500",
  "excompany": "from-slate-600 to-gray-500",
}

const hardcodedPortfolio: PortfolioItem[] = [
  {
    id: "techflow-seo",
    title: "TechFlow SaaS",
    category: "SEO",
    description: "Increased organic traffic by 340% for a B2B SaaS company through comprehensive technical SEO and content strategy.",
    client: "TechFlow Inc.",
    results: ["+340% Organic Traffic", "Top 5 for 47 Keywords", "150% ROI in 6 months"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "greenleaf-web",
    title: "GreenLeaf Organics",
    category: "Web Design",
    description: "Designed a modern, conversion-optimized e-commerce store that increased sales by 28% within the first quarter.",
    client: "GreenLeaf Organics",
    results: ["+28% Conversion Rate", "42% Lower Bounce Rate", "A+ Accessibility Score"],
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    id: "brickhouse-local",
    title: "BrickHouse Realty",
    category: "Local SEO",
    description: "Dominated local search for a real estate agency, achieving #1 in Google Local Pack for 12 high-value terms.",
    client: "BrickHouse Realty",
    results: ["#1 in Local Pack (12 terms)", "+280% Leads from Google", "4.9★ Average Rating"],
    gradient: "from-amber-600 to-orange-500",
  },
  {
    id: "quantum-ppc",
    title: "Quantum Finance",
    category: "PPC",
    description: "Optimized Google Ads campaigns for a fintech startup, reducing CPA by 55% while scaling spend 3x.",
    client: "Quantum Finance",
    results: ["-55% Cost Per Acquisition", "3.2x ROAS", "12K+ Qualified Leads"],
    gradient: "from-violet-600 to-purple-500",
  },
  {
    id: "sprout-content",
    title: "Sprout Health",
    category: "Content Marketing",
    description: "Built a content engine that positioned Sprout Health as the authority in wellness, driving 200K monthly visitors.",
    client: "Sprout Health",
    results: ["200K Monthly Visitors", "450+ Keywords in Top 10", "8.5K Email Subscribers"],
    gradient: "from-pink-600 to-rose-500",
  },
  {
    id: "nexus-seo",
    title: "Nexus Enterprise",
    category: "SEO",
    description: "Enterprise-level SEO for a logistics company spanning 14 countries, achieving 180% organic growth.",
    client: "Nexus Enterprise",
    results: ["+180% Global Traffic", "#1 for 28 Country-Specific Terms", "3.2M Impressions/Month"],
    gradient: "from-indigo-600 to-blue-500",
  },
  {
    id: "urban-web",
    title: "UrbanCart",
    category: "Web Design",
    description: "Full redesign and development of a marketplace platform with focus on UX and mobile-first experience.",
    client: "UrbanCart",
    results: ["+65% Mobile Conversion", "94 PageSpeed Score", "Zero CLS"],
    gradient: "from-sky-600 to-blue-500",
  },
  {
    id: "peak-local",
    title: "Peak Fitness",
    category: "Local SEO",
    description: "Multi-location local SEO strategy for a fitness chain, driving foot traffic across 8 branches.",
    client: "Peak Fitness",
    results: ["+190% Direction Requests", "#1 for 23 Location Terms", "8 GBP Optimized"],
    gradient: "from-red-600 to-rose-500",
  },
  {
    id: "guru",
    title: "Gurutron",
    category: "Web Design",
    description: "Built a modern NEET/JEE/Board exam preparation platform with intuitive UI/UX, responsive design, and seamless student experience.",
    client: "Gurutron",
    results: ["NEET/JEE/Board Prep Platform", "Modern UI/UX Design", "Student-First Experience"],
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: "scrapco",
    title: "ScrapCo",
    category: "Web Design",
    description: "Designed and developed a scrap pickup marketplace connecting households, shops, and factories with verified vendors across multiple cities.",
    client: "ScrapCo",
    results: ["Scrap Pickup Marketplace", "4.9★ Rating", "Multi-City Operations"],
    gradient: "from-green-600 to-emerald-500",
  },
  {
    id: "zubilo-studio",
    title: "Zubilo Studio",
    category: "Web Design",
    description: "Created a brand-first creative studio website with custom animations, bold visuals, and a strong portfolio showcase.",
    client: "Zubilo Studio",
    results: ["Creative Studio Website", "Custom Animations", "Brand-First Design"],
    gradient: "from-orange-600 to-red-500",
  },
  {
    id: "ezdry",
    title: "EZDRY",
    category: "Web Design",
    description: "Built a laundry service platform with online booking, location-based service areas, and real-time order tracking.",
    client: "EZDRY",
    results: ["Laundry Service Platform", "Online Booking System", "Location-Based Service"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "pogotunes",
    title: "PogoTunes",
    category: "Web Design",
    description: "Designed a fun, ad-free kids' learning platform featuring 500+ educational videos, 50+ interactive games, and multi-language content.",
    client: "PogoTunes",
    results: ["500+ Educational Videos", "50+ Interactive Games", "100% Free & Ad-Free"],
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "excompany",
    title: "ExCompany",
    category: "Web Design",
    description: "Developed a professional corporate website for a business consulting firm with clean typography, structured layouts, and strong branding.",
    client: "ExCompany",
    results: ["Corporate Website", "Professional Branding", "Multi-Page Platform"],
    gradient: "from-slate-600 to-gray-500",
  },
]

const categories = ["All", "SEO", "Web Design", "Local SEO", "PPC", "Content Marketing"]

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
                        View Case Study
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
                  {caseStudySlugs.has(selectedItem.id) && (
                    <Link
                      href={`/cases/${selectedItem.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
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
