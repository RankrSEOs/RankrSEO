"use client"

import { motion } from "framer-motion"
import { clientLogos } from "@/lib/utils"

export default function SocialProofSection() {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-12">
      <div className="container px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-8"
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
              <div className="flex h-10 items-center rounded-lg border border-border/30 bg-card/50 px-5 backdrop-blur-sm">
                <span className="text-sm font-bold tracking-tight text-muted-foreground/40">{name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
