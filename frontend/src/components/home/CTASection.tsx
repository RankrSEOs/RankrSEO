"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, MessageCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/lib/utils"
import { cn } from "@/lib/utils"
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
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <motion.div className="absolute top-10 left-1/4 size-64 rounded-full bg-primary/20 blur-[100px] animate-pulse-glow" />
        <motion.div className="absolute bottom-10 right-1/4 size-64 rounded-full bg-accent/15 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Grow Your Revenue?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Join 50+ businesses that trust RankrSEO for their digital marketing. Start with a free SEO audit.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setAuditOpen(true)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-[#2563EB]",
                  "transition-all hover:bg-white/90 hover:shadow-lg active:translate-y-px"
                )}
              >
                <BarChart3 className="size-4" />
                Get Your Free SEO Audit
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href={`https://wa.me/${siteConfig.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white",
                  "transition-all hover:border-white/40 hover:bg-white/10 active:translate-y-px backdrop-blur-sm"
                )}
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 max-w-lg mx-auto">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="size-4 shrink-0 text-accent" />
                  {b}
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-white/40">
              Free consultation &bull; No obligation &bull; 30-minute strategy call
            </p>
          </motion.div>
        </div>
      </section>
      <SeoAuditForm open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  )
}
