"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart, ArrowRight, ArrowUpRight, Quote } from "lucide-react"
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#2563EB] py-24 sm:py-32">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, white 1px, transparent 1px),
              radial-gradient(circle at 70% 60%, white 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <motion.div
          className="absolute -top-40 -left-40 size-96 rounded-full bg-white/5 blur-3xl"
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
              About RankrSEO
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              We Build Brands That
              <span className="text-[#22C55E]"> Rank Higher</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 sm:text-xl">
              RankrSEO is a boutique digital marketing agency obsessed with one
              thing: helping businesses like yours dominate search results and
              grow revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/20 via-[#0F172A]/40 to-[#22C55E]/20" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 30%, #2563EB 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, #22C55E 0%, transparent 50%)
                  `,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Quote className="size-12 text-white/40" />
                <p className="mt-4 max-w-[200px] text-center text-sm text-white/60 italic">
                  "Data without action is just noise."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Founder & CEO
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Meet Amit Kumar
              </h2>
              <p className="mt-2 text-muted-foreground">
                Founder & CEO, RankrSEO
              </p>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Amit Kumar is the Founder & CEO of RankrSEO. He holds a
                  Master's degree in Computer Applications (MCA) and brings
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
              What Drives Us
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
                className={cn(
                  "group rounded-xl border border-border bg-card p-8 transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                )}
              >
                <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <item.icon className="size-7" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Real Projects */}
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
              Real Projects We've Built
            </h2>
            <p className="mt-4 text-muted-foreground">
              We don't just talk about SEO — we design, develop, and optimize real websites for real businesses
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { name: "ExCompany", url: "https://www.excompany.in/", tag: "Corporate" },
              { name: "Zubilo Studio", url: "https://www.zubilo.studio/", tag: "Web Design" },
              { name: "ScrapCo", url: "https://www.scrapco.app/", tag: "Web Dev" },
              { name: "EZ Dry", url: "https://www.ezdry.in/", tag: "Web Design" },
              { name: "PogoTunes", url: "https://pogotunes.vercel.app/", tag: "Web Dev" },
              { name: "Safe Raahia", url: "https://saferaahia.netlify.app/", tag: "Web Dev" },
              { name: "RankrSEO", url: "https://rankrseo.vercel.app/", tag: "Full Service" },
            ].map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5"
              >
                <div>
                  <p className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{project.tag}</p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View Full Portfolio <ArrowUpRight className="size-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection />

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
              Ready to Work Together?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Let's build a strategy that takes your business to the top of
              search results
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
                Get in Touch
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
            <p className="mt-4 text-xs text-white/60">
              Free consultation &bull; No obligation
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
