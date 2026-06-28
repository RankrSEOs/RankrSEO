"use client"

import { motion } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { faqData } from "@/lib/utils"

export default function FAQSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" id="faq">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-accent/[0.02]" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <HelpCircle className="size-3" />
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about working with RankrSEO.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-2xl space-y-3">
          {faqData.map((faq, i) => (
            <motion.details
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 [&[open]]:border-primary/20 [&[open]]:shadow-lg [&[open]]:shadow-primary/5"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-semibold text-card-foreground [&::-webkit-details-marker]:hidden">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-5 pt-0">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-4" />
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}
