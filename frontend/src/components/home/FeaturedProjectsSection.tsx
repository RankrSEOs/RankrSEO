"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const projects = [
  { name: "ExCompany", url: "https://www.excompany.in/", tag: "Corporate", gradient: "from-slate-600 to-gray-500" },
  { name: "Zubilo Studio", url: "https://www.zubilo.studio/", tag: "Web Design", gradient: "from-orange-600 to-red-500" },
  { name: "ScrapCo", url: "https://www.scrapco.app/", tag: "Web Dev", gradient: "from-green-600 to-emerald-500" },
  { name: "EZ Dry", url: "https://www.ezdry.in/", tag: "Web Design", gradient: "from-blue-600 to-cyan-500" },
  { name: "PogoTunes", url: "https://pogotunes.vercel.app/", tag: "Web Dev", gradient: "from-yellow-500 to-orange-500" },
  { name: "Safe Raahia", url: "https://saferaahia.netlify.app/", tag: "Web Dev", gradient: "from-purple-600 to-pink-500" },
]

export default function FeaturedProjectsSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Real Projects
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={cn("absolute inset-0 opacity-5", project.gradient)} />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{project.tag}</p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View Full Portfolio <ArrowUpRight className="size-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
