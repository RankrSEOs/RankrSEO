"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react"
import { servicesData, socialLinks, siteConfig } from "@/lib/utils"

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/cases" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-secondary/95">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 30% 40%, white 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="container relative z-10 px-4 py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold">
              <span className="gradient-text">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6 space-y-3">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground group">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="size-4" />
                </div>
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground group">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="size-4" />
                </div>
                {siteConfig.phoneDisplay}
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-4" />
                </div>
                {siteConfig.address}
              </div>
              <a href={`https://wa.me/${siteConfig.wa}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground group">
                <div className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <MessageCircle className="size-4" />
                </div>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1.5 group">
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {servicesData.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link href={service.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Follow Us</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5"
                  aria-label={link.label}
                >
                  <span className="text-xs font-bold">{link.label[0]}</span>
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground/60">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
