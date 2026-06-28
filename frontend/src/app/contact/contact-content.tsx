"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react"

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
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary to-primary pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="container relative z-10 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Let&apos;s Talk
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
          >
            Ready to grow your business? Get in touch and let&apos;s discuss how RankrSEO can help you dominate search.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background py-16 sm:py-24">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Send Us a Message</h2>
              <p className="mt-2 text-muted-foreground">Fill out the form and we&apos;ll get back to you within 24 hours.</p>

              {isSuccess && (
                <div className="mt-6 flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-accent">
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

                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  const content = (
                    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-foreground">Book a Free Consultation</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Schedule a 30-minute strategy call with our team.
                </p>
                <div className="mt-4 flex h-48 flex-col items-center justify-center gap-3 rounded-lg bg-gradient-to-br from-primary to-secondary">
                  <p className="px-4 text-center text-sm text-white/90">
                    Call us at <strong className="text-white">{siteConfig.phone}</strong> or email{" "}
                    <strong className="text-white">{siteConfig.email}</strong>
                  </p>
                  <Link
                    href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-white/90"
                  >
                    <Phone className="size-4" />
                    Call Now
                  </Link>
                </div>
              </div>

              {/* Our Location */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-foreground">Our Location</h3>
                <p className="mt-1 text-sm text-muted-foreground">Delhi, India</p>
                <div className="mt-4 flex h-48 flex-col items-center justify-center gap-3 rounded-lg bg-gradient-to-br from-secondary to-primary">
                  <MapPin className="size-8 text-white/60" />
                  <p className="px-4 text-center text-sm text-white/90">
                    {siteConfig.address}<br />
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                      View on Google Maps
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
