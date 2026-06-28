"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type CaseStudy = {
  id: string; title: string; industry: string; challenge: string; solution: string
  resultTraffic: string; resultLeads: string; resultRankings: string; timeframe: string
  metricBefore: number; metricAfter: number
}

function GrowthBar({ label, before, after }: { label: string; before: number; after: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-accent">{after}%</span>
      </div>
      <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 rounded-full bg-muted-foreground/20" style={{ width: `${before}%` }} />
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

export default function CaseStudiesClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <>
      <section className="relative overflow-hidden gradient-hero pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 opacity-[0.04]" style={{
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
            Case Studies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/70"
          >
            Real results from real clients. See how we&apos;ve helped businesses like yours grow.
          </motion.p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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
                  className="mt-6 flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  Read Full Case Study
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {caseStudies.map((cs) => (
        <section key={cs.id + "-detail"} className="border-t border-border/50 py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground">{cs.title} — Full Story</h2>
              <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">The Challenge</h3>
                  <p>{cs.challenge}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Our Solution</h3>
                  <p>{cs.solution}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">The Results</h3>
                  <div className="grid grid-cols-3 gap-6 mt-4">
                    <div className="rounded-xl border border-border/60 bg-card p-4 text-center">
                      <div className="text-2xl font-bold text-accent">{cs.resultTraffic}</div>
                      <div className="text-sm text-muted-foreground">Traffic Growth</div>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-card p-4 text-center">
                      <div className="text-2xl font-bold text-accent">{cs.resultLeads}</div>
                      <div className="text-sm text-muted-foreground">Lead Growth</div>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-card p-4 text-center">
                      <div className="text-2xl font-bold text-accent">{cs.resultRankings.split(" ")[0]}</div>
                      <div className="text-sm text-muted-foreground">{cs.resultRankings.split(" ").slice(1).join(" ")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="relative overflow-hidden gradient-hero py-20">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Let&apos;s build a strategy that delivers real results for your business.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-[#2563EB] transition-all hover:bg-white/90 hover:shadow-lg"
            >
              Start Your Growth Journey
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
