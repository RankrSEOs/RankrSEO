"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search } from "lucide-react"

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true)
      }
    }
    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [dismissed])

  useEffect(() => {
    if (dismissed) return
    const timer = setTimeout(() => {
      if (!show) setShow(true)
    }, 30000)
    return () => clearTimeout(timer)
  }, [dismissed, show])

  if (dismissed) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={() => setShow(false)} />
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl text-center"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button
              onClick={() => { setShow(false); setDismissed(true) }}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Search className="size-8 text-primary" />
            </div>

            <h3 className="mb-2 text-2xl font-bold">Wait! Don&apos;t Go!</h3>
            <p className="mb-6 text-muted-foreground">
              Claim your <span className="font-semibold text-primary">Free SEO Audit</span> worth $299. Limited spots available!
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const email = new FormData(form).get("email") as string
                await fetch("/api/audit", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                })
                setShow(false)
                setDismissed(true)
              }}
              className="space-y-3"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
              >
                Get Free Audit
              </button>
            </form>

            <button
              onClick={() => { setShow(false); setDismissed(true) }}
              className="mt-3 text-xs text-muted-foreground hover:text-foreground"
            >
              No thanks, I&apos;ll pass
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}