"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const projects = [
  { name: "ExCompany", url: "https://www.excompany.in/", tag: "Corporate", color: "#475569" },
  { name: "Zubilo Studio", url: "https://www.zubilo.studio/", tag: "Web Design", color: "#EA580C" },
  { name: "ScrapCo", url: "https://www.scrapco.app/", tag: "Web Dev", color: "#16A34A" },
  { name: "EZ Dry", url: "https://www.ezdry.in/", tag: "Web Design", color: "#2563EB" },
  { name: "PogoTunes", url: "https://pogotunes.vercel.app/", tag: "Web Dev", color: "#D97706" },
  { name: "Safe Raahia", url: "https://saferaahia.netlify.app/", tag: "Web Dev", color: "#7C3AED" },
]

export default function FeaturedProjectsSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Real Projects
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Websites We've Built & Optimized
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real businesses, real code, real results. We design, develop, and market websites that perform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5"
            >
              <div
                className="absolute inset-0 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]"
                style={{ backgroundColor: project.color }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{project.tag}</p>
                </div>
                <ExternalLink className="size-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
          >
            View Full Portfolio <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
