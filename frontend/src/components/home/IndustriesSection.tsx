"use client"

import { motion } from "framer-motion"
import {
  Store,
  MapPin,
  Rocket,
  GraduationCap,
  Building2,
  ShoppingCart,
  HeartPulse,
  Home,
  Scale,
  Stethoscope,
  Globe,
} from "lucide-react"

import { industriesData } from "@/lib/utils"
import { cn } from "@/lib/utils"

const industryIcons: Record<string, typeof Store> = {
  "Small Business": Store,
  "Local Business": MapPin,
  Startup: Rocket,
  Coach: GraduationCap,
  Agency: Building2,
  "E-Commerce Store": ShoppingCart,
  Healthcare: HeartPulse,
  "Real Estate": Home,
  Lawyer: Scale,
  Dentist: Stethoscope,
  "SaaS Company": Globe,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
}

export default function IndustriesSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Industries We Serve
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tailored SEO strategies for every industry
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {industriesData.map((industry) => {
            const Icon = industryIcons[industry] || Store
            return (
              <motion.div
                key={industry}
                variants={pillVariants}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
                )}
              >
                <Icon className="size-4 text-primary" />
                {industry}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
