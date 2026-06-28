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
  Check,
  ArrowRight,
  Star,
  Zap,
  BarChart,
  Sparkles,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Service = {
  id: string
  title: string
  description: string
  icon: string
  href: string
  features: string[]
}

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

const processSteps = [
  {
    icon: Search,
    title: "Discovery & Audit",
    description: "We analyze your current online presence, competition, and goals to build a data-driven strategy.",
  },
  {
    icon: Star,
    title: "Strategy Development",
    description: "Our experts craft a customized roadmap tailored to your business objectives and target audience.",
  },
  {
    icon: Zap,
    title: "Implementation",
    description: "We execute the strategy with precision, keeping you informed every step of the way.",
  },
  {
    icon: BarChart,
    title: "Monitor & Optimize",
    description: "Continuous tracking, reporting, and refinement to maximize results and ROI.",
  },
]

const pricingTiers = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "Perfect for small businesses getting started with their online presence.",
    features: [
      "Initial audit & strategy",
      "Monthly performance report",
      "Email support",
      "1 revision cycle",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "$999",
    period: "/month",
    description: "Ideal for growing businesses ready to scale their digital presence.",
    features: [
      "Everything in Starter",
      "Bi-weekly performance calls",
      "Priority support",
      "Unlimited revisions",
      "Dedicated account manager",
    ],
    cta: "Start Growing",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations with advanced needs.",
    features: [
      "Everything in Growth",
      "Weekly strategy sessions",
      "24/7 priority support",
      "Custom integrations",
      "Multi-channel management",
      "White-label reporting",
    ],
    cta: "Contact Us",
    popular: false,
  },
]

const faqData: Record<string, { q: string; a: string }[]> = {
  seo: [
    { q: "How long does SEO take to show results?", a: "Most clients see meaningful improvements within 3-6 months. SEO is a long-term investment that compounds over time." },
    { q: "What's included in your SEO service?", a: "Our SEO service includes keyword research, on-page optimization, technical SEO audits, content strategy, link building, and monthly performance reporting." },
    { q: "Do you guarantee page 1 rankings?", a: "No ethical SEO agency can guarantee specific rankings. We guarantee our best efforts, transparent reporting, and proven methodologies." },
  ],
  "local-seo": [
    { q: "What is Local SEO?", a: "Local SEO optimizes your online presence to attract more customers from relevant local searches on Google and other search engines." },
    { q: "How long until I see local ranking improvements?", a: "Local SEO improvements can often be seen within 4-8 weeks, especially with Google Business Profile optimization." },
    { q: "Do you help with Google Business Profile?", a: "Yes, GBP optimization is a core part of our Local SEO service, including setup, verification, posting, and review management." },
  ],
  "technical-seo": [
    { q: "What does a Technical SEO audit cover?", a: "We analyze site speed, mobile optimization, crawlability, indexation, schema markup, site structure, and Core Web Vitals." },
    { q: "How often should I do a Technical SEO audit?", a: "We recommend a comprehensive audit every 3-6 months, or after any major site changes." },
    { q: "Will technical fixes improve my rankings?", a: "Yes, resolving technical issues creates a strong foundation for your SEO efforts and often leads to ranking improvements." },
  ],
  "link-building": [
    { q: "What types of backlinks do you build?", a: "We focus on high-quality, relevant backlinks through guest posting, digital PR, broken link building, and content partnerships." },
    { q: "How many backlinks can I expect per month?", a: "The number varies based on your industry and competition, but we typically secure 5-15 high-quality links per month." },
    { q: "Are your backlinks safe from Google penalties?", a: "Yes, we use only white-hat techniques that comply with Google's guidelines. We prioritize quality over quantity." },
  ],
  "content-marketing": [
    { q: "What type of content do you create?", a: "We create blog posts, articles, landing pages, infographics, video scripts, and social media content tailored to your audience." },
    { q: "How often will you publish content?", a: "We typically publish 4-8 pieces per month depending on your strategy and goals." },
    { q: "Can you optimize existing content?", a: "Absolutely. We offer content audits and rewrite services to improve existing content performance." },
  ],
  "web-design": [
    { q: "How long does it take to build a website?", a: "A typical website takes 4-8 weeks from design to launch, depending on complexity and features." },
    { q: "Do you offer e-commerce development?", a: "Yes, we build custom e-commerce solutions on Shopify and WooCommerce." },
    { q: "Is the design mobile-responsive?", a: "All our websites are built mobile-first and fully responsive across all devices." },
  ],
  "google-business-profile": [
    { q: "What is Google Business Profile optimization?", a: "GBP optimization involves fully setting up and optimizing your business listing to appear in local search results and Google Maps." },
    { q: "How long does GBP optimization take?", a: "Initial setup and verification takes 1-2 weeks, while full optimization is ongoing for best results." },
    { q: "Can you help with review management?", a: "Yes, we help implement a review generation strategy and manage responses to maintain a positive reputation." },
  ],
  "social-media": [
    { q: "Which social media platforms do you manage?", a: "We manage Instagram, Facebook, LinkedIn, and YouTube — selecting platforms based on where your target audience is most active." },
    { q: "How long until I see results from social media marketing?", a: "You can expect to see engagement growth within 4-6 weeks, with lead generation improving over 2-3 months of consistent posting and optimization." },
    { q: "Do you create the content or do I need to provide it?", a: "We handle everything — strategy, content creation, graphic design, copywriting, scheduling, and performance analysis. You just provide brand direction." },
  ],
  ppc: [
    { q: "How quickly will I see results from PPC?", a: "PPC campaigns can start driving traffic within hours of launch, making it the fastest channel for immediate results." },
    { q: "What's your average ROAS?", a: "Our clients typically see a 3:1 to 5:1 return on ad spend, though results vary by industry and campaign." },
    { q: "Which platforms do you advertise on?", a: "We manage campaigns on Google Ads, Bing Ads, Facebook, Instagram, LinkedIn, and more." },
  ],
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] || Search
  const faqs = faqData[service.id] || faqData.seo

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F] py-28 sm:py-36">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} />
        <motion.div className="absolute -top-40 -right-40 size-96 rounded-full bg-primary/15 blur-[120px] animate-breathe" />
        <motion.div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-accent/10 blur-[120px] animate-breathe" style={{ animationDelay: "2s" }} />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Icon className="size-8 text-white" />
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              {service.title}
            </h1>
            <p className="mt-6 text-lg text-white/60 sm:text-xl max-w-2xl mx-auto">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Key Features
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Everything You Get
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our comprehensive approach ensures no stone is left unturned.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="group flex items-start gap-3 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110">
                  <Check className="size-4" />
                </div>
                <span className="text-sm font-medium text-card-foreground transition-colors duration-300 group-hover:text-primary">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              How It Works
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our Process
            </h2>
            <p className="mt-4 text-muted-foreground">
              A proven methodology that delivers consistent results.
            </p>
          </motion.div>

          <div className="relative mt-16">
            <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-accent to-transparent lg:block" />
            <div className="space-y-12">
              {processSteps.map((step, i) => {
                const StepIcon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8"
                  >
                    <div className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-2xl border border-border/50 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                      <StepIcon className="size-7 text-primary" />
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white shadow-lg">
                          {i + 1}
                        </span>
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="mt-2 text-muted-foreground max-w-xl">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative overflow-hidden py-20 sm:py-28" id="pricing">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Pricing
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose the plan that fits your needs. All plans include a free strategy session.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
                  tier.popular
                    ? "border-primary/30 bg-primary/5 shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/15"
                    : "border-border/50 bg-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                )}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                    {tier.period && <span className="text-sm text-muted-foreground">{tier.period}</span>}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300",
                      tier.popular
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                        : "border border-border/50 bg-background text-foreground hover:border-primary/30 hover:shadow-lg"
                    )}
                  >
                    {tier.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <HelpCircle className="size-3" />
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="mx-auto mt-12 max-w-2xl space-y-3">
            {faqs.map((faq, i) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 [&[open]]:border-primary/20 [&[open]]:shadow-lg [&[open]]:shadow-primary/5"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-semibold text-card-foreground [&::-webkit-details-marker]:hidden">
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 pt-0">
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-4" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

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
              Let&rsquo;s Get Started
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              Let&rsquo;s discuss how {service.title.toLowerCase()} can help grow your business.
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
                Book a Free Strategy Call
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <p className="mt-4 text-xs text-white/30">
              No commitment &bull; 30-minute call
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
