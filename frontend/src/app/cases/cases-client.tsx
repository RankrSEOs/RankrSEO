"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Star, ArrowRight, Sparkles, BarChart3 } from "lucide-react"
import Link from "next/link"

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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F] py-28 sm:py-36">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
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
              <BarChart3 className="size-3" />
              Case Studies
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
              Results That Speak for Themselves
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Real numbers from real clients. No fluff, no filler — just measurable impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="container relative z-10 px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{cs.industry}</span>
                  <span className="text-xs text-muted-foreground">{cs.timeframe}</span>
                </div>

                <h3 className="text-xl font-bold text-card-foreground transition-colors duration-300 group-hover:text-primary">{cs.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{cs.challenge}</p>

                <div className="mt-6 grid grid-cols-3 gap-4 border-y border-border/50 py-4">
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
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-300 group-hover:gap-2"
                >
                  Read Full Case Study
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Sections */}
      {caseStudies.map((cs) => (
        <section key={cs.id + "-detail"} className="border-t border-border/30 py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{cs.title} — Full Story</h2>
              <div className="mt-8 space-y-8 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    The Challenge
                  </h3>
                  <p>{cs.challenge}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Our Solution
                  </h3>
                  <p>{cs.solution}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    The Results
                  </h3>
                  <div className="grid grid-cols-3 gap-6 mt-4">
                    <div className="rounded-2xl border border-border/50 bg-card p-5 text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
                      <div className="text-2xl font-bold text-accent">{cs.resultTraffic}</div>
                      <div className="text-sm text-muted-foreground">Traffic Growth</div>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card p-5 text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
                      <div className="text-2xl font-bold text-accent">{cs.resultLeads}</div>
                      <div className="text-sm text-muted-foreground">Lead Growth</div>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card p-5 text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
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

      {/* CTA */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <motion.div className="absolute -top-20 -right-20 size-80 rounded-full bg-primary/15 blur-[120px] animate-breathe" />
        <motion.div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-accent/10 blur-[120px] animate-breathe" style={{ animationDelay: "2s" }} />

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 backdrop-blur-sm mb-6">
              <Sparkles className="size-3 text-accent" />
              Ready to Grow?
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Let&rsquo;s build a strategy that delivers real results for your business.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-primary shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="size-5 text-accent" />
                Start Your Growth Journey
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
