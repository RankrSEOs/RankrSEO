import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-7xl font-extrabold text-primary/20 sm:text-8xl">404</span>
      <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">Page not found</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Go Home
        </Link>
        <Link href="/contact" className="rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
          Contact Us
        </Link>
      </div>
    </div>
  )
}
