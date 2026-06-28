"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart, ArrowRight, ArrowUpRight, Quote, UserCheck, Sparkles, BarChart3 } from "lucide-react"
import Link from "next/link"
import ProcessSection from "@/components/home/ProcessSection"
import { cn } from "@/lib/utils"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower businesses with data-driven digital marketing strategies that deliver measurable growth, maximize ROI, and establish lasting online authority.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become the most trusted digital marketing partner for businesses worldwide, setting the standard for transparency, innovation, and results-driven excellence.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Integrity, transparency, and relentless pursuit of results. We treat every client's business as our own and celebrate their success as our success.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F] py-28 sm:py-36">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} />
        <motion.div className="absolute -top-40 -left-40 size-96 rounded-full bg-primary/15 blur-[120px] animate-breathe" />
        <motion.div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-accent/10 blur-[120px] animate-breathe" style={{ animationDelay: "2s" }} />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 backdrop-blur-sm">
              <UserCheck className="size-3" />
              About RankrSEO
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              We Build Brands That{" "}
              <span className="bg-gradient-to-r from-blue-400 via-white to-teal-300 bg-clip-text text-transparent">Rank Higher</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 sm:text-xl max-w-2xl mx-auto">
              RankrSEO is a boutique digital marketing agency obsessed with one
              thing: helping businesses like yours dominate search results and grow revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="container relative z-10 px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/40 to-accent/20" />
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, #2563EB 0%, transparent 50%), radial-gradient(circle at 80% 70%, #14B8A6 0%, transparent 50%)`,
              }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm mb-4">
                  <Quote className="size-8 text-white/60" />
                </div>
                <p className="max-w-[220px] text-center text-sm text-white/70 italic leading-relaxed">
                  &ldquo;Data without action is just noise. We turn insights into growth.&rdquo;
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <UserCheck className="size-3" />
                Founder & CEO
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Meet Amit Kumar
              </h2>
              <p className="mt-2 text-muted-foreground">
                Founder & CEO, RankrSEO
              </p>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Amit Kumar is the Founder & CEO of RankrSEO. He holds a
                  Master&rsquo;s degree in Computer Applications (MCA) and brings
                  expertise in SEO, web development, and digital strategy. With
                  years of hands-on experience across technical SEO, WordPress
                  development, content marketing, and paid advertising, Amit has
                  helped dozens of businesses — from local startups to
                  international brands — achieve measurable online growth.
                </p>
                <p>
                  Before founding RankrSEO, Amit worked as a Senior SEO Analyst
                  and Web Developer, where he managed high-budget campaigns,
                  led technical SEO migrations, and built websites that
                  consistently ranked in the top 3 on Google. His deep
                  understanding of search algorithms, user experience, and
                  conversion optimization gives RankrSEO clients a competitive
                  edge.
                </p>
                <p>
                  Amit founded RankrSEO with a simple belief: every business
                  deserves a fair chance to be found online. He built the agency
                  to be different — transparent, data-driven, and relentlessly
                  focused on results. What started as a solo consultancy has
                  grown into a full-service digital agency serving clients
                  across the USA, UK, Canada, Australia, and India.
                </p>
                <p>
                  Today, Amit leads a team of passionate marketers, developers,
                  and strategists who share his vision of making world-class
                  digital marketing accessible to businesses of all sizes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <BarChart3 className="size-3" />
              What Drives Us
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our Mission, Vision & Values
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our mission, vision, and values shape every strategy we build
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 grid gap-8 md:grid-cols-3"
          >
            {values.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
              >
                <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                  <item.icon className="size-7" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Real Projects */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3" />
              Our Work
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Real Projects We&rsquo;ve Built
            </h2>
            <p className="mt-4 text-muted-foreground">
              We don&rsquo;t just talk about SEO — we design, develop, and optimize real websites for real businesses
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { name: "ExCompany", url: "https://www.excompany.in/", tag: "Corporate", color: "#475569" },
              { name: "Zubilo Studio", url: "https://www.zubilo.studio/", tag: "Web Design", color: "#EA580C" },
              { name: "ScrapCo", url: "https://www.scrapco.app/", tag: "Web Dev", color: "#16A34A" },
              { name: "EZ Dry", url: "https://www.ezdry.in/", tag: "Web Design", color: "#2563EB" },
              { name: "PogoTunes", url: "https://pogotunes.vercel.app/", tag: "Web Dev", color: "#D97706" },
              { name: "Safe Raahia", url: "https://saferaahia.netlify.app/", tag: "Web Dev", color: "#7C3AED" },
              { name: "RankrSEO", url: "https://rankrseo.vercel.app/", tag: "Full Service", color: "#14B8A6" },
            ].map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
              >
                <div className="absolute inset-0 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]" style={{ backgroundColor: project.color }} />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{project.tag}</p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
            >
              View Full Portfolio <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection />

      {/* CTA */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <motion.div className="absolute -top-20 -right-20 size-80 rounded-full bg-primary/15 blur-[120px] animate-breathe" />
        <motion.div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-accent/10 blur-[120px] animate-breathe" style={{ animationDelay: "2s" }} />

        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 backdrop-blur-sm mb-6">
              <Sparkles className="size-3 text-accent" />
              Let&rsquo;s Collaborate
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              Ready to Work Together?
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              Let&rsquo;s build a strategy that takes your business to the top of search results
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-primary shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="size-5 text-accent" />
                Get in Touch
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <p className="mt-4 text-xs text-white/30">
              Free consultation &bull; No obligation &bull; 30-minute strategy call
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
