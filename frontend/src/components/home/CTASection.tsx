"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, CheckCircle, Sparkles, Star } from "lucide-react"
import { siteConfig } from "@/lib/utils"
import { SeoAuditForm } from "@/components/lead-generation/SeoAuditForm"

const benefits = [
  "Free comprehensive SEO audit worth $497",
  "Custom strategy tailored to your business",
  "No commitment, no obligation",
  "Results within 3-6 months",
]

export default function CTASection() {
  const [auditOpen, setAuditOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden py-28 sm:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <motion.div className="absolute top-10 left-1/4 size-80 rounded-full bg-primary/15 blur-[120px] animate-breathe" />
        <motion.div className="absolute bottom-10 right-1/4 size-80 rounded-full bg-accent/10 blur-[120px] animate-breathe" style={{ animationDelay: "2s" }} />

        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 backdrop-blur-sm mb-6">
              <Star className="size-3 text-accent" />
              Start Today
            </span>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              Ready to Grow Your Revenue?
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              Join 50+ businesses that trust RankrSEO for their digital marketing. Start with a free SEO audit.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setAuditOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-primary shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="size-5 text-accent" />
                Get Your Free SEO Audit
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href={`https://wa.me/${siteConfig.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="size-4 text-accent" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 max-w-lg mx-auto">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2.5 text-sm text-white/50">
                  <CheckCircle className="size-4 shrink-0 text-accent" />
                  {b}
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-white/30">
              Free consultation &bull; No obligation &bull; 30-minute strategy call
            </p>
          </motion.div>
        </div>
      </section>
      <SeoAuditForm open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  )
}
