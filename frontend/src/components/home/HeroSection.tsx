"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, TrendingUp, Star, Award, Play, Sparkles, CheckCircle } from "lucide-react"
import Link from "next/link"

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
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function HeroSection() {
  const [auditOpen, setAuditOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F]">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 size-96 rounded-full bg-primary/20 blur-[150px] animate-breathe"
          style={{ animationDelay: "0s" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 size-96 rounded-full bg-accent/15 blur-[150px] animate-breathe"
          style={{ animationDelay: "2s" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/5 blur-[200px] animate-breathe"
          style={{ animationDelay: "4s" }}
        />

        {/* SVG illustration */}
        <motion.div
          className="absolute -right-20 top-20 w-80 opacity-[0.08] lg:opacity-[0.15] hidden lg:block"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Illustration type="seo-dashboard" className="text-white" />
        </motion.div>

        <div className="container relative z-10 px-4 pt-24 pb-16">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-5xl">
            {/* Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-8">
              {["SEO", "Web Design", "Content Marketing", "PPC"].map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white/80"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={itemVariants} className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
              <span className="bg-gradient-to-r from-blue-400 via-white to-teal-300 bg-clip-text text-transparent">
                Search. Rank. Grow.
              </span>
              <br />
              <span className="text-white/90">Data-Driven SEO That Delivers Revenue</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-2xl text-center text-base text-white/60 sm:text-lg md:text-xl leading-relaxed">
              Founded by <span className="font-semibold text-white">Amit Kumar</span> — RankrSEO is a{" "}
              <span className="font-semibold text-white">premium SEO agency and digital marketing services</span> company
              that combines technical expertise with data-driven strategies to deliver measurable growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setAuditOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] text-base sm:text-sm"
              >
                <Sparkles className="size-5 transition-transform duration-300 group-hover:rotate-12" />
                Get Your Free SEO Audit
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <Link
                href="/cases"
                className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-base sm:text-sm"
              >
                <Play className="size-4 text-accent" />
                View Case Studies
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.sub} className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.06]">
                    <stat.icon className="size-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Badges */}
            <motion.div variants={itemVariants} className="mt-14 flex flex-wrap justify-center gap-4 sm:gap-8">
              {[
                { icon: Award, text: "Google Partner" },
                { icon: Award, text: "Clutch Top Rated" },
                { icon: CheckCircle, text: "Trustpilot 4.9★" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-2.5 backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.05]"
                >
                  <badge.icon className="size-4 text-accent" />
                  <span className="text-xs font-medium text-white/50">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </section>
      <SeoAuditForm open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  )
}
