"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote } from "lucide-react"

import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO",
    company: "BrightLocal Services",
    quote:
      "RankrSEO transformed our online presence. Within 4 months we went from page 5 to the #1 spot for our key terms. The team is knowledgeable, responsive, and truly cares about results.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mark Thompson",
    position: "Founder",
    company: "Thompson & Co. Realty",
    quote:
      "The local SEO strategy they implemented for our real estate agency doubled our lead volume in the first quarter alone. Best investment we've made for our business.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    position: "Marketing Director",
    company: "Wellness Plus",
    quote:
      "We were skeptical about SEO agencies until we worked with RankrSEO. Their data-driven approach and transparent reporting gave us full confidence. Highly recommended.",
    rating: 5,
  },
  {
    id: 4,
    name: "James Rodriguez",
    position: "Owner",
    company: "Rodriguez Dental",
    quote:
      "Our patient bookings increased by 150% after RankrSEO optimized our Google Business Profile and website. They made the whole process simple and stress-free.",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[current].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="rounded-xl border border-border bg-card p-8 sm:p-12"
            >
              <Quote className="size-8 text-primary/30" />
              <p className="mt-4 text-base leading-relaxed text-card-foreground sm:text-lg">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="mt-6">
                <StarRating rating={testimonials[current].rating} />
              </div>
              <div className="mt-4">
                <p className="font-semibold text-card-foreground">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[current].position},{" "}
                  {testimonials[current].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={cn(
                  "size-2 rounded-full transition-all duration-300",
                  index === current
                    ? "w-6 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
