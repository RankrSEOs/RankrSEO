"use client"

import { motion } from "framer-motion"
import { Quote, ArrowRight, GraduationCap, Briefcase, Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/lib/utils"
import { cn } from "@/lib/utils"

export default function FounderSection() {
  return (
    <section className="gradient-section py-24 sm:py-32">
      <div className="container px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/40 to-accent/20 z-10" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 30% 20%, #2563EB 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, #14B8A6 0%, transparent 50%)
                  `,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8">
                <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm mb-4">
                  <Quote className="size-8 text-white/60" />
                </div>
                <p className="text-center text-lg text-white/80 font-medium italic leading-relaxed">
                  &ldquo;Data without action is just noise. We turn insights into growth.&rdquo;
                </p>
                <div className="mt-4 text-center">
                  <p className="font-semibold text-white">{siteConfig.founder}</p>
                  <p className="text-sm text-white/60">{siteConfig.founderRole}</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 size-32 rounded-full bg-accent/20 blur-2xl animate-pulse-glow" />
            <div className="absolute -top-4 -left-4 size-32 rounded-full bg-primary/20 blur-2xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {siteConfig.founderRole}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Meet <span className="gradient-text">{siteConfig.founder}</span>
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Amit Kumar is the Founder & CEO of RankrSEO. He holds a Master&apos;s degree in Computer Applications (MCA)
                and brings deep expertise in SEO, web development, and digital strategy.
              </p>
              <p>
                Before founding RankrSEO, Amit worked as a Senior SEO Analyst and Web Developer, managing high-budget
                campaigns and leading technical SEO migrations for businesses across the USA, UK, and India.
              </p>
              <p>
                He founded RankrSEO with a simple belief: every business deserves a fair chance to be found online.
                Today, the agency serves clients across North America, Europe, and Asia.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: GraduationCap, label: "MCA (Master's)" },
                { icon: Briefcase, label: "10+ Years Exp" },
                { icon: Award, label: "50+ Clients" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-4 text-center">
                  <item.icon className="size-5 text-primary" />
                  <span className="text-xs font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground",
                  "transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-px"
                )}
              >
                Learn Our Story
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={siteConfig.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground",
                  "transition-all hover:border-primary/30 hover:shadow-lg active:translate-y-px"
                )}
              >
                <ExternalLink className="size-4 text-[#0A66C2]" />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
