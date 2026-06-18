"use client"

import { useState, useEffect } from "react"
import { adminApi } from "@/lib/admin-api"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Trash2, Star, Loader2 } from "lucide-react"

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Array<Record<string, unknown>>>([])
  const [loading, setLoading] = useState(true)

  const fetch = () => {
    setLoading(true)
    adminApi.getTestimonials()
      .then(setTestimonials)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return
    try {
      await adminApi.deleteTestimonial(id)
      fetch()
    } catch (err) { console.error(err) }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
        <p className="text-sm text-muted-foreground">Client testimonials and reviews.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-primary" /></div>
          ) : testimonials.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No testimonials yet.</p>
          ) : (
            <div className="space-y-4">
              {testimonials.map((t) => (
                <div key={t.id as string} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{t.clientName as string}</p>
                      <p className="text-sm text-muted-foreground">
                        {[t.company, t.position].filter(Boolean).join(" • ") || "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {t.rating && (
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: t.rating as number }).map((_, i) => (
                            <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => handleDelete(t.id as string)}
                        className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground/80">&ldquo;{t.content as string}&rdquo;</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
