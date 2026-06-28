"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Sun, Moon, Search, BarChart3 } from "lucide-react"
import { useTheme } from "@/components/layout/ThemeProvider"
import { servicesData, siteConfig } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { SeoAuditForm } from "@/components/lead-generation/SeoAuditForm"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#", dropdown: true },
  { label: "Case Studies", href: "/cases" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -4, pointerEvents: "none" as const },
  visible: { opacity: 1, y: 0, pointerEvents: "auto" as const },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [auditOpen, setAuditOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) { document.body.style.overflow = "hidden" }
    else { document.body.style.overflow = "" }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <div className="container flex h-16 sm:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="RankrSEO" className="h-9 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-muted/50"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown className={cn("size-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl border border-border/60 bg-popover/95 backdrop-blur-xl p-2 shadow-2xl"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          transition={{ duration: 0.15 }}
                        >
                          {servicesData.map((service) => (
                            <Link
                              key={service.id}
                              href={service.href}
                              className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-muted group"
                            >
                              <div className="shrink-0 mt-0.5">
                                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                  <span className="text-xs font-bold text-primary group-hover:text-primary-foreground">
                                    {service.shortTitle?.slice(0, 2)}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">{service.title}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">{service.outcome}</div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-muted/50"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAuditOpen(true)}
              className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-px"
            >
              <Search className="size-4" />
              Free SEO Audit
            </button>

            <button
              onClick={toggleTheme}
              className="flex size-9 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex lg:hidden size-9 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                className="fixed top-0 right-0 bottom-0 z-50 flex w-80 flex-col bg-background shadow-2xl"
                variants={drawerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="flex items-center justify-between border-b border-border px-5 h-16">
                  <img src="/logo.svg" alt="RankrSEO" className="h-8 w-auto" />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                    aria-label="Close menu"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {navLinks.map((link) => {
                    if (link.dropdown) {
                      return (
                        <div key={link.label}>
                          <button
                            onClick={() => setMobileServicesOpen((prev) => !prev)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
                          >
                            {link.label}
                            <ChevronDown className={cn("size-4 transition-transform duration-200", mobileServicesOpen && "rotate-180")} />
                          </button>
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                className="ml-3 space-y-1 overflow-hidden"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {servicesData.map((service) => (
                                  <Link
                                    key={service.id}
                                    href={service.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block rounded-lg px-3 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                                  >
                                    {service.title}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    }
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
                      >
                        {link.label}
                      </Link>
                    )
                  })}

                  <hr className="my-4 border-border" />

                  <button
                    onClick={() => { setMobileOpen(false); setAuditOpen(true) }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <BarChart3 className="size-4" />
                    Get Free SEO Audit
                  </button>

                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted mt-2"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
      <SeoAuditForm open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  )
}
