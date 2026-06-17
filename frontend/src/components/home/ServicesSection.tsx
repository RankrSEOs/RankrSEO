"use client"

import { motion } from "framer-motion"
import {
  Search,
  MapPin,
  Settings,
  Link as LinkIcon,
  FileText,
  Palette,
  Building2,
  BarChart3,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

import { servicesData } from "@/lib/utils"
import { cn } from "@/lib/utils"

const iconMap: Record<string, typeof Search> = {
  Search,
  MapPin,
  Settings,
  Link: LinkIcon,
  FileText,
  Palette,
  Building2,
  BarChart3,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export default function ServicesSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-muted-foreground">
            Comprehensive digital marketing solutions tailored to your business
            goals
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || Search
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={cn(
                  "group rounded-xl border border-border bg-card p-6 transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30"
                )}
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {service.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="size-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium text-primary",
              "transition-colors hover:text-primary/80"
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
