"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, TrendingUp, Star, Award, Play } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SeoAuditForm } from "@/components/lead-generation/SeoAuditForm"
import Illustration from "@/components/ui/Illustration"

const stats = [
  { icon: BarChart3, value: "$10M+", sub: "Revenue Generated" },
  { icon: TrendingUp, value: "200+", sub: "Projects Delivered" },
  { icon: Star, value: "50+", sub: "Happy Clients" },
  { icon: Award, value: "4.9★", sub: "Average Rating" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export default function HeroSection() {
  const [auditOpen, setAuditOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <motion.div className="absolute top-1/4 -left-32 size-96 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <motion.div className="absolute bottom-1/4 -right-32 size-96 rounded-full bg-accent/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <motion.div
          className="absolute -right-20 top-20 w-80 opacity-10 lg:opacity-20 hidden lg:block"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Illustration type="seo-dashboard" className="text-white" />
        </motion.div>

        <div className="container relative z-10 px-4 pt-24 pb-16">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-5xl">
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-6">
              {["SEO", "Web Design", "Content Marketing", "PPC"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
              <span className="gradient-text">Search. Rank. Grow.</span>
              <br />
              Data-Driven SEO That Delivers Revenue
            </motion.h1>

            <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-2xl text-center text-base text-white/70 sm:text-lg md:text-xl leading-relaxed">
              Founded by <span className="font-semibold text-white">Amit Kumar</span> — RankrSEO is a{" "}
              <span className="font-semibold text-white">premium SEO agency and digital marketing services</span> company
              that combines technical expertise with data-driven strategies to deliver measurable growth.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setAuditOpen(true)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground",
                  "transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-px",
                  "text-base sm:text-sm"
                )}
              >
                Get Your Free SEO Audit
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <Link
                href="/cases"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white",
                  "transition-all hover:border-white/40 hover:bg-white/10 active:translate-y-px backdrop-blur-sm",
                  "text-base sm:text-sm"
                )}
              >
                <Play className="size-4" />
                View Case Studies
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.sub} className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <stat.icon className="size-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10">
              {["Google Partner", "Clutch Top Rated", "Trustpilot 4.9★"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-sm">
                  <Award className="size-4 text-accent" />
                  <span className="text-xs font-medium text-white/70">{badge}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
      <SeoAuditForm open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  )
}
