"use client"

import { motion } from "framer-motion"
import { Search, ClipboardList, Play, TrendingUp } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Discovery",
    description:
      "We analyze your business, competitors, and target audience to identify opportunities.",
  },
  {
    number: 2,
    icon: ClipboardList,
    title: "Strategy",
    description:
      "A custom roadmap is built with concrete KPIs, timelines, and deliverables.",
  },
  {
    number: 3,
    icon: Play,
    title: "Implementation",
    description:
      "Our team executes the plan with precision — from technical fixes to content creation.",
  },
  {
    number: 4,
    icon: TrendingUp,
    title: "Optimization",
    description:
      "We continuously refine the strategy based on performance data and market changes.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export default function ProcessSection() {
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
            Our Process
          </h2>
          <p className="mt-4 text-muted-foreground">
            A proven, repeatable methodology that delivers results
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-16 grid gap-8 md:grid-cols-4"
        >
          {/* Connecting line (desktop) */}
          <div className="absolute top-12 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] hidden h-0.5 bg-border md:block" />
          <div className="absolute top-12 left-[calc(12.5%+1.5rem)] right-3/4 hidden h-0.5 bg-primary md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative flex flex-col items-center text-center"
            >
              {/* Number + Icon */}
              <div className="relative z-10 flex size-24 items-center justify-center rounded-full border-2 border-primary/20 bg-card">
                <step.icon className="size-8 text-primary" />
                <span className="absolute -top-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.number}
                </span>
              </div>

              {/* Connecting line segment (mobile) */}
              {index < steps.length - 1 && (
                <div className="mt-2 h-8 w-0.5 bg-border md:hidden" />
              )}

              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
