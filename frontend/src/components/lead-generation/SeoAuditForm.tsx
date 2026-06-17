"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, Loader2, CheckCircle, ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const auditSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  website: z.string().url("Valid website URL required"),
  phone: z.string().min(7, "Valid phone required"),
})

type AuditForm = z.infer<typeof auditSchema>

export function SeoAuditForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuditForm>({
    resolver: zodResolver(auditSchema),
  })

  const onSubmit = async (data: AuditForm) => {
    try {
      await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch {
      // fallback
    }
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            {submitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-accent/10">
                  <CheckCircle className="size-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Audit Request Received!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We&apos;ll analyze your website and send your free SEO audit report within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <Search className="size-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Free SEO Audit</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get a comprehensive analysis of your website&apos;s SEO performance — worth $497.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      placeholder="Email Address"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("website")}
                      placeholder="Your Website URL"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                    {errors.website && <p className="mt-1 text-xs text-destructive">{errors.website.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("phone")}
                      placeholder="Phone Number"
                      type="tel"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        Get My Free Audit
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
