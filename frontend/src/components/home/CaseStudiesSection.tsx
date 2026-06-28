"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Star, ArrowRight, BarChart3, Loader2 } from "lucide-react"
import Link from "next/link"
import { caseStudies as hardcodedCases } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { CaseStudyItem } from "@/lib/public-api"

function GrowthBar({ label, before, after }: { label: string; before: number; after: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-accent">{after}%</span>
      </div>
      <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0 rounded-full bg-muted-foreground/20" style={{ width: `${before}%` }} />
        <motion.div
          className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${after}%` }}
          viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" as const }}
        />
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export default function CaseStudiesSection() {
  const [items, setItems] = useState<CaseStudyItem[]>(hardcodedCases)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/cases?published=true")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.length) setItems(data.map((ac: Record<string, unknown>) => {
          const m = (ac.metrics || {}) as Record<string, unknown>
          return {
            id: (ac.slug || ac.id) as string,
            title: ac.title as string,
            industry: (ac.clientIndustry || "") as string,
            challenge: (ac.problem || "") as string,
            solution: (ac.strategy || "") as string,
            resultTraffic: (m.traffic || "") as string,
            resultLeads: (m.leads || "") as string,
            resultRankings: (m.rankings || "") as string,
            timeframe: (m.timeframe || "") as string,
            metricBefore: (m.metricBefore || 0) as number,
            metricAfter: (m.metricAfter || 0) as number,
          }
        }))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Case Studies
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Results That Speak for Themselves
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real numbers from real clients. No fluff, no filler — just measurable impact.
          </p>
        </motion.div>

        {loading && (
          <div className="mt-14 flex justify-center">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-8 lg:grid-cols-3"
        >
          {items.map((cs) => (
            <motion.div
              key={cs.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{cs.industry}</span>
                <span className="text-xs text-muted-foreground">{cs.timeframe}</span>
              </div>

              <h3 className="text-xl font-bold text-card-foreground">{cs.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{cs.challenge}</p>

              <div className="mt-6 grid grid-cols-3 gap-4 border-y border-border py-4">
                <div className="text-center">
                  <TrendingUp className="mx-auto size-5 text-accent" />
                  <div className="mt-1 text-lg font-bold text-foreground">{cs.resultTraffic}</div>
                  <div className="text-xs text-muted-foreground">Traffic</div>
                </div>
                <div className="text-center">
                  <Users className="mx-auto size-5 text-accent" />
                  <div className="mt-1 text-lg font-bold text-foreground">{cs.resultLeads}</div>
                  <div className="text-xs text-muted-foreground">Leads</div>
                </div>
                <div className="text-center">
                  <Star className="mx-auto size-5 text-accent" />
                  <div className="mt-1 text-lg font-bold text-foreground">{cs.resultRankings.split(" ")[0]}</div>
                  <div className="text-xs text-muted-foreground">Rankings</div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <GrowthBar label="Performance Score" before={cs.metricBefore} after={cs.metricAfter} />
              </div>

              <Link
                href={`/cases/${cs.id}`}
                className="mt-6 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
              >
                Read Full Case Study
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/cases"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground",
              "transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
            )}
          >
            <BarChart3 className="size-4" />
            View All Case Studies
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
