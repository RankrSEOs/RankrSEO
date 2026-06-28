import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Calendar, User, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { fetchPosts, formatDate, getFirstCategory, getBlogGradient } from "@/lib/blogger-feed"

export const revalidate = 300

export async function generateStaticParams() {
  const posts = await fetchPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const posts = await fetchPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | RankrSEO Blog`,
    description: post.summary,
    alternates: { canonical: post.url },
    openGraph: {
      title: `${post.title} - RankrSEO Blog`,
      description: post.summary,
      type: "article",
      publishedTime: post.published,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = await fetchPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const category = getFirstCategory(post.categories)
  const gradient = getBlogGradient(category)
  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <section className="bg-background pt-28 pb-4">
        <div className="container px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      <section className="bg-background pb-4">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{category}</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {formatDate(post.published)}
              </span>
              <span className="flex items-center gap-1">
                <User className="size-3.5" />
                {post.author}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{post.title}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{post.summary}</p>
          </div>
        </div>
      </section>

      <div className="bg-background pb-8">
        <div className="container px-4">
          <div className={cn("mx-auto flex h-56 max-w-4xl flex-col items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg sm:h-72", gradient)}>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">{category}</span>
            <div className="mt-4 px-6 text-center text-2xl font-bold text-white sm:text-3xl">{post.title}</div>
          </div>
        </div>
      </div>

      <article className="bg-background pb-12">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <div className="prose-headings:text-foreground prose-p:text-muted-foreground max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.content.slice(0, 2000)}
              {post.content.length > 2000 && "..."}
            </div>

            <div className="mt-12 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                This article continues on our main blog. Visit{" "}
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
                  rankrseo.blogspot.com
                </a>{" "}
                to read the full article with all details, images, and resources.
              </p>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Read Full Article
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-border bg-muted/30 py-12">
        <div className="container px-4">
          <div className="mx-auto flex max-w-3xl items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-foreground">{post.author}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {post.author === "Amit Kumar"
                  ? "Amit is the founder of RankrSEO with over 7 years of experience in SEO and digital marketing."
                  : `${post.author} is a contributor at RankrSEO, sharing expert insights on SEO and digital marketing.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {otherPosts.length > 0 && (
        <section className="bg-background py-16">
          <div className="container px-4">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Related Articles</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {otherPosts.map((rp) => {
                const cat = getFirstCategory(rp.categories)
                const grad = getBlogGradient(cat)
                return (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                      <div className={cn("flex h-32 items-end bg-gradient-to-br p-4", grad)}>
                        <h3 className="text-base font-semibold text-white">{rp.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-primary">
                        Read Article
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary py-20">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="container relative z-10 px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Stay Ahead of the Curve</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Get the latest SEO insights delivered straight to your inbox.
          </p>
          <a
            href="https://rankrseo.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-white/90 hover:shadow-lg active:translate-y-px"
          >
            Subscribe on Blogger
            <ExternalLink className="size-4" />
          </a>
        </div>
      </section>
    </>
  )
}
