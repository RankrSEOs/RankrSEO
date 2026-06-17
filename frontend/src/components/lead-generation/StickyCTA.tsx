"use client"

import { useState, useEffect } from "react"
import { X, Search } from "lucide-react"
import { SeoAuditForm } from "./SeoAuditForm"

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [auditOpen, setAuditOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setVisible(scrollPercent > 0.3)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible || dismissed) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur-md shadow-lg">
        <div className="container flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Search className="size-5 text-primary" />
            <p className="text-sm font-medium">
              Get Your Free SEO Audit — <span className="text-primary">Limited Time</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAuditOpen(true)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
            >
              Claim Now
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      </div>
      <SeoAuditForm open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  )
}