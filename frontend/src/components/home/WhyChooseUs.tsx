"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart3, Users, TrendingUp, Smile, Building2, Star } from "lucide-react"

import { cn } from "@/lib/utils"

const reasons = [
  {
    icon: BarChart3,
    title: "Data-Driven Approach",
    points: [
      "Every decision backed by real analytics and market research",
      "Continuous A/B testing and performance optimization",
      "Transparent reporting with actionable insights",
    ],
  },
  {
    icon: Users,
    title: "Expert Team",
    points: [
      "Certified SEO professionals with years of experience",
      "Dedicated account manager for personalized attention",
      "Continuous education on latest algorithm updates",
    ],
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    points: [
      "Track record of 200% average traffic increase",
      "First-page rankings across competitive industries",
      "Long-term sustainable growth strategies",
    ],
  },
]

const counters = [
  { icon: Smile, value: 98, suffix: "%", label: "Client Satisfaction" },
  { icon: Building2, value: 150, suffix: "+", label: "Businesses Helped" },
  { icon: Star, value: 4.9, suffix: "★", label: "Average Rating" },
]

function useAnimatedCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, end, duration])

  return { ref, count }
}

function Counter({ value, suffix, label, icon: Icon }: {
  value: number
  suffix: string
  label: string
  icon: typeof Smile
}) {
  const { ref, count } = useAnimatedCounter(value)

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Icon className="size-6 text-accent" />
      <span className="text-3xl font-bold text-foreground sm:text-4xl">
        <span ref={ref}>{count}</span>
        {suffix}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export default function WhyChooseUs() {
  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose RankrSEO?
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              className="rounded-xl border border-border bg-card p-8"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <reason.icon className="size-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {reason.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {reason.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={cn(
            "mt-16 grid grid-cols-1 gap-8 rounded-2xl border border-border bg-card px-6 py-10 sm:grid-cols-3 sm:px-12"
          )}
        >
          {counters.map((counter) => (
            <Counter key={counter.label} {...counter} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
