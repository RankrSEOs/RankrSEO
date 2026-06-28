"use client"

import Link from "next/link"

export default function AboutError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-destructive/10">
        <span className="text-4xl font-bold text-destructive">!</span>
      </div>
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Something went wrong</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again or contact us if the problem persists.
      </p>
      <div className="mt-8 flex gap-4">
        <button onClick={reset} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Try Again
        </button>
        <Link href="/" className="rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
          Go Home
        </Link>
      </div>
    </div>
  )
}
