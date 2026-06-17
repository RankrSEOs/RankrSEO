"use client"

import { motion } from "framer-motion"
import { Search, MapPin, Settings, Link as LinkIcon, FileText, Palette, Building2, BarChart3, Share2, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { servicesData } from "@/lib/utils"
import { cn } from "@/lib/utils"

const iconMap: Record<string, typeof Search> = {
  Search, MapPin, Settings, Link: LinkIcon, FileText, Palette, Building2, BarChart3, Share2,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export default function ServicesSection() {
  return (
    <section className="gradient-section py-24 sm:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Our Services
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Full-Suite Digital Marketing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every service is backed by data, executed with precision, and optimized for one thing — your growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || Search
            return (
              <Link key={service.id} href={service.href} className="group block">
                <motion.div
                  variants={cardVariants}
                  className={cn(
                    "relative h-full rounded-2xl border border-border/60 bg-card p-8",
                    "transition-all duration-500",
                    "group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/5",
                    "group-hover:-translate-y-1"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                      <Icon className="size-7" />
                    </div>
                    <TrendingUp className="size-5 text-muted-foreground/30 transition-all duration-500 group-hover:text-accent group-hover:rotate-12" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.outcome}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-accent shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Learn More
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground",
              "transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
            )}
          >
            View All Services
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
