import Link from "next/link"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { servicesData } from "@/lib/utils"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
]

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase text-white">{title}</h3>
      {children}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="About">
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              RankrSEO is a results-driven SEO agency dedicated to helping businesses grow through data-backed search
              engine optimization strategies. We deliver measurable rankings, traffic, and revenue.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-gray-400 transition-colors hover:bg-primary hover:text-white"
                    aria-label={social.label}
                  >
                    <span className="text-xs font-bold">{social.label[0]}</span>
                  </a>
                ))}
            </div>
          </FooterColumn>

          <FooterColumn title="Quick Links">
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Services">
            <ul className="space-y-2.5">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Delhi, India</span>
              </li>
              <li>
                <a
                  href="mailto:hello@rankrseo.com"
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0 text-primary" />
                  <span>hello@rankrseo.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919999999999"
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0 text-primary" />
                  <span>+91-9999999999</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#22C55E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#22C55E]/80"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} RankrSEO. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with passion by <span className="text-primary">RankrSEO</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
