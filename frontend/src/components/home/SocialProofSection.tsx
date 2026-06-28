"use client"

import { motion } from "framer-motion"
import { clientLogos } from "@/lib/utils"

export default function SocialProofSection() {
  return (
    <section className="border-y border-white/[0.04] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent py-14">
      <div className="container px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/50 mb-8"
        >
          Trusted by innovative companies worldwide
        </motion.p>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {clientLogos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-center"
            >
              <div className="flex h-10 items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
                <span className="text-sm font-bold tracking-tight text-muted-foreground/30">{name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
