"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#0F172A] py-20 sm:py-28">
      {/* Decorative elements */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <motion.div
        className="absolute -top-20 -right-20 size-80 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Grow Your Business?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Get your free SEO audit today and discover how we can help you rank
            #1
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#2563EB]",
                "transition-all hover:bg-white/90 hover:shadow-lg active:translate-y-px"
              )}
            >
              Get Free Audit
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
          <p className="mt-4 text-xs text-white/60">
            No commitment required &bull; Free strategy call included
          </p>
        </motion.div>
      </div>
    </section>
  )
}
