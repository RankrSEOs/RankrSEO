"use client"

import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Star, Users, Award } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const stats = [
  { icon: BarChart3, label: "200+", sub: "Projects" },
  { icon: Users, label: "50+", sub: "Clients" },
  { icon: Star, label: "4.9★", sub: "Rating" },
  { icon: Award, label: "3 Years", sub: "Experience" },
]

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
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#2563EB]">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-20 left-10 size-64 rounded-full bg-white/5 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 size-96 rounded-full bg-white/5 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 size-48 rounded-full bg-accent/10 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 flex flex-col items-center text-center px-4"
      >
        <motion.h1
          variants={itemVariants}
          className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Grow Your Business.{" "}
          <span className="text-accent">Dominate Search.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg md:text-xl"
        >
          RankrSEO is a results-driven digital marketing agency founded by Amit
          Kumar. We help businesses increase online visibility, generate
          qualified leads, and grow sustainable revenue.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#2563EB]",
              "transition-all hover:bg-white/90 hover:shadow-lg active:translate-y-px"
            )}
          >
            Get a Free Consultation
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/portfolio"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white",
              "transition-all hover:border-white hover:bg-white/10 active:translate-y-px"
            )}
          >
            View Our Work
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" as const }}
        className="container relative z-10 mt-16 px-4 pb-10"
      >
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm sm:grid-cols-4 sm:px-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <stat.icon className="size-5 text-accent" />
              <span className="text-2xl font-bold text-white sm:text-3xl">
                {stat.label}
              </span>
              <span className="text-xs text-white/60 sm:text-sm">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
