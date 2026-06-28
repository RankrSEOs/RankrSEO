"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, Sparkles, ArrowRight } from "lucide-react"

import { siteConfig } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  budget: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

const services = ["SEO", "Local SEO", "Web Design", "PPC", "Content Marketing", "Technical SEO", "Link Building"]
const budgets = ["Under $1,000", "$1,000 - $2,500", "$2,500 - $5,000", "$5,000 - $10,000", "$10,000+"]

const contactInfo = [
  { icon: MapPin, label: "Visit Us", value: "Delhi, India" },
  { icon: Mail, label: "Email Us", value: "rankrseo@gmail.com", href: "mailto:rankrseo@gmail.com" },
  { icon: Phone, label: "Call Us", value: "+91-9953732860", href: "tel:+919953732860" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91-9953732860", href: "https://wa.me/919953732860" },
]

export default function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsSuccess(true)
      reset()
    } catch {
      // fallback
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setIsSuccess(false), 5000)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F] py-28 sm:py-36">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <motion.div className="absolute -top-40 -left-40 size-96 rounded-full bg-primary/15 blur-[120px] animate-breathe" />
        <motion.div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-accent/10 blur-[120px] animate-breathe" style={{ animationDelay: "2s" }} />
        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 backdrop-blur-sm mb-6">
              <Sparkles className="size-3" />
              Get in Touch
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
              Let&rsquo;s Talk
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Ready to grow your business? Get in touch and let&rsquo;s discuss how RankrSEO can help you dominate search.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="container relative z-10 px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Send Us a Message</h2>
              <p className="mt-2 text-muted-foreground">Fill out the form and we&apos;ll get back to you within 24 hours.</p>

              {isSuccess && (
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm text-accent">
                  <CheckCircle className="size-5 shrink-0" />
                  Message sent successfully! We&apos;ll be in touch soon.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <fieldset className="space-y-2">
                    <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </fieldset>
                  <fieldset className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                    <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </fieldset>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <fieldset className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 234 567 890" {...register("phone")} />
                  </fieldset>
                  <fieldset className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your Company Ltd." {...register("company")} />
                  </fieldset>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <fieldset className="space-y-2">
                    <Label htmlFor="service">Service</Label>
                    <Select onValueChange={(v) => setValue("service", v)}>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </fieldset>
                  <fieldset className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select onValueChange={(v) => setValue("budget", v)}>
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgets.map((b) => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </fieldset>
                </div>

                <fieldset className="space-y-2">
                  <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                  <Textarea id="message" rows={5} placeholder="Tell us about your project..." {...register("message")} />
                  {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                </fieldset>

                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto rounded-xl">
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  const content = (
                    <div className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 cursor-pointer">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{info.label}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  )
                  if (info.href) {
                    return (
                      <a key={info.label} href={info.href} className="block" target={info.href.startsWith("http") ? "_blank" : undefined} rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                        {content}
                      </a>
                    )
                  }
                  return <div key={info.label}>{content}</div>
                })}
              </div>

              {/* Book a Free Consultation */}
              <div className="rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <h3 className="font-semibold text-foreground">Book a Free Consultation</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Schedule a 30-minute strategy call with our team.
                </p>
                <div className="mt-4 flex h-48 flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F] p-6">
                  <Sparkles className="size-6 text-accent" />
                  <p className="text-center text-sm text-white/70">
                    Call us at <strong className="text-white">{siteConfig.phone}</strong> or email{" "}
                    <strong className="text-white">{siteConfig.email}</strong>
                  </p>
                  <Link
                    href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                    className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Phone className="size-4" />
                    Call Now
                  </Link>
                </div>
              </div>

              {/* Our Location */}
              <div className="rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <h3 className="font-semibold text-foreground">Our Location</h3>
                <p className="mt-1 text-sm text-muted-foreground">Delhi, India</p>
                <div className="mt-4 flex h-48 flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#131C31] to-[#1E3A5F] p-6">
                  <MapPin className="size-8 text-white/40" />
                  <p className="text-center text-sm text-white/70">
                    {siteConfig.address}<br />
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-accent underline underline-offset-2 hover:text-accent/80">
                      View on Google Maps
                      <ArrowRight className="size-3" />
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
