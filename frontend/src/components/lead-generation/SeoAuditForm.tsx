"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, Loader2 } from "lucide-react"
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
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-accent/10">
                  <Search className="size-8 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Audit Request Received!</h3>
                <p className="text-muted-foreground">
                  We&apos;ll analyze your website and send your free SEO audit report within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <Search className="size-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Free SEO Audit</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get a comprehensive analysis of your website&apos;s SEO performance.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Your Name"
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      placeholder="Email Address"
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("website")}
                      placeholder="Your Website URL"
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
                    />
                    {errors.website && <p className="mt-1 text-xs text-destructive">{errors.website.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("phone")}
                      placeholder="Phone Number"
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="mx-auto size-4 animate-spin" />
                    ) : (
                      "Get My Free Audit"
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