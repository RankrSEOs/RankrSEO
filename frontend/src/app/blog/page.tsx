import type { Metadata } from "next"
import BlogContent from "./blog-content"
import { fetchPosts } from "@/lib/blogger-feed"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, strategies, and expert advice to help you master SEO and digital marketing.",
}

export default async function BlogPage() {
  const posts = await fetchPosts()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary to-primary pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Our Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Insights, strategies, and expert advice to help you master SEO and digital marketing.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="bg-background pb-20 sm:pb-28">
          <div className="container px-4">
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-lg font-medium text-foreground">No articles found</p>
              <p className="text-sm text-muted-foreground">Check back soon for new posts.</p>
            </div>
          </div>
        </section>
      ) : (
        <BlogContent initialPosts={posts} />
      )}
    </>
  )
}
