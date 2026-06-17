"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, ArrowRight } from "lucide-react"
import { SeoAuditForm } from "./SeoAuditForm"

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [auditOpen, setAuditOpen] = useState(false)

  useEffect(() => {
    let triggered = false

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered || e.clientY > 0) return
      triggered = true
      setShow(true)
    }

    const handleScroll = () => {
      if (triggered) return
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPercent > 0.6) {
        triggered = true
        setShow(true)
      }
    }

    setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
      window.addEventListener("scroll", handleScroll, { passive: true })
    }, 10000)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShow(false)} />
            <motion.div
              className="relative w-full max-w-lg rounded-3xl border border-border/60 bg-card p-8 sm:p-10 shadow-2xl text-center"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <button
                onClick={() => setShow(false)}
                className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>

              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                <Search className="size-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Wait! Before You Go...</h3>
              <p className="mt-3 text-muted-foreground">
                Claim your <span className="font-semibold text-primary">free SEO audit</span> worth $497
                and discover exactly how your website can rank higher and attract more customers.
                No commitment required.
              </p>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => { setShow(false); setAuditOpen(true) }}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Yes, Get My Free Audit
                  <ArrowRight className="size-4" />
                </button>
                <button
                  onClick={() => setShow(false)}
                  className="w-full text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  No thanks, I&apos;ll come back later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <SeoAuditForm open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  )
}
