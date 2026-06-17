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
  Share2,
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
  Share2,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

export default function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#2563EB] py-24 sm:py-32">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
              radial-gradient(circle at 80% 30%, white 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <motion.div
          className="absolute -top-40 -right-40 size-96 rounded-full bg-white/5 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80">
              What We Offer
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg text-white/70 sm:text-xl">
              Comprehensive digital marketing solutions designed to grow your
              online presence, attract qualified traffic, and boost revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
                  <Link href={`/services/${service.id}`} className="block">
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
                          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <span
                      className={cn(
                        "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary",
                        "transition-colors group-hover:text-primary/80"
                      )}
                    >
                      Learn More
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#0F172A] py-20 sm:py-28">
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
              Not Sure Which Service You Need?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Get a free consultation and we'll recommend the perfect strategy
              for your business
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
                Book a Free Strategy Call
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
            <p className="mt-4 text-xs text-white/60">
              No commitment &bull; 30-minute call
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
