"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, Star, StarOff, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  client: string
  company: string
  content: string
  rating: number
  featured: boolean
  date: string
}

const initialTestimonials: Testimonial[] = [
  { id: 1, client: "Sarah Johnson", company: "BrightPath Marketing", content: "RankrSEO transformed our online presence. Our organic traffic increased by 300% in just 6 months.", rating: 5, featured: true, date: "2026-05-15" },
  { id: 2, client: "Michael Chen", company: "TechVista Solutions", content: "The team's expertise in technical SEO is unmatched. They identified and fixed issues we didn't even know existed.", rating: 5, featured: true, date: "2026-04-20" },
  { id: 3, client: "Emily Rodriguez", company: "Coastal Realty Group", content: "Our Google Business Profile optimization brought us 50+ new leads per month. Highly recommended!", rating: 4, featured: false, date: "2026-03-10" },
  { id: 4, client: "David Kim", company: "Quantum Health", content: "Professional, data-driven, and results-oriented. A true partner in our growth journey.", rating: 5, featured: true, date: "2026-02-28" },
  { id: 5, client: "Lisa Thompson", company: "GreenLeaf Organics", content: "From zero to page one rankings. The content strategy they developed was exceptional.", rating: 4, featured: false, date: "2026-01-15" },
  { id: 6, client: "James Wilson", company: "Premier Construction", content: "PPC campaigns that actually deliver ROI. Our cost per lead dropped by 40%.", rating: 5, featured: false, date: "2025-12-20" },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials)

  const toggleFeatured = (id: number) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, featured: !t.featured } : t))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Manage client testimonials and reviews.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {testimonials.map((t) => (
          <Card key={t.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-base">{t.client}</CardTitle>
                <p className="text-sm text-muted-foreground">{t.company}</p>
              </div>
              <button
                onClick={() => toggleFeatured(t.id)}
                className={cn(
                  "rounded p-1 transition-colors",
                  t.featured
                    ? "text-yellow-500 hover:text-yellow-600"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title={t.featured ? "Unfeature" : "Feature"}
              >
                {t.featured ? <Star className="size-4 fill-current" /> : <StarOff className="size-4" />}
              </button>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-3.5",
                      i < t.rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t.date}</span>
                <div className="flex items-center gap-1">
                  <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <Pencil className="size-3.5" />
                  </button>
                  <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
