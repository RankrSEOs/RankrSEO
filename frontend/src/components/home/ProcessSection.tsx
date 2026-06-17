"use client"

import { motion } from "framer-motion"
import { Search, ClipboardList, Play, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Audit",
    description: "We analyze your current online presence, competition, and goals to build a data-driven strategy.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Strategy Development",
    description: "Our experts craft a customized roadmap tailored to your business objectives and target audience.",
  },
  {
    number: "03",
    icon: Play,
    title: "Implementation",
    description: "We execute the strategy with precision, keeping you informed every step of the way.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Monitor & Optimize",
    description: "Continuous tracking, reporting, and refinement to maximize results and ROI.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export default function ProcessSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Our Proven Process
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A battle-tested methodology that has delivered millions in revenue for our clients.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-accent to-primary lg:block" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {steps.map((step, i) => {
              const StepIcon = step.icon
              return (
                <motion.div
                  key={step.title}
                  variants={stepVariants}
                  className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8"
                >
                  <div className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-lg">
                    <StepIcon className="size-7 text-primary" />
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white shadow-lg">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-muted-foreground max-w-xl">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground",
              "transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-px"
            )}
          >
            Start Your Journey
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
