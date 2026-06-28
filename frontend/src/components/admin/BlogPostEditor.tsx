"use client"

import { useState, useEffect } from "react"
import { adminApi } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save, X } from "lucide-react"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "")
}

interface BlogPostEditorProps {
  post?: Record<string, unknown> | null
  onClose: () => void
  onSaved: () => void
}

export function BlogPostEditor({ post, onClose, onSaved }: BlogPostEditorProps) {
  const [title, setTitle] = useState((post?.title as string) || "")
  const [slug, setSlug] = useState((post?.slug as string) || "")
  const [content, setContent] = useState((post?.content as string) || "")
  const [excerpt, setExcerpt] = useState((post?.excerpt as string) || "")
  const [authorName, setAuthorName] = useState((post?.authorName as string) || "")
  const [coverImage, setCoverImage] = useState((post?.coverImage as string) || "")
  const [tagsStr, setTagsStr] = useState(((post?.tags as string[]) || []).join(", "))
  const [categoryId, setCategoryId] = useState((post?.categoryId as string) || "")
  const [published, setPublished] = useState((post?.published as boolean) ?? true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    adminApi.getCategories().then(setCategories).catch(() => {})
  }, [])

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!post) setSlug(slugify(val))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) { setError("Title is required"); return }
    if (!slug.trim()) { setError("Slug is required"); return }
    if (!content.trim()) { setError("Content is required"); return }

    setSaving(true)
    try {
      const tags = tagsStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)

      const body: Record<string, unknown> = {
        title: title.trim(),
        slug: slug.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        authorName: authorName.trim() || undefined,
        coverImage: coverImage.trim() || undefined,
        categoryId: categoryId || undefined,
        tags: tags.length ? tags : undefined,
        published,
      }

      if (post) {
        await adminApi.updateBlogPost(post.id as string, body)
      } else {
        await adminApi.createBlogPost(body)
      }

      onSaved()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
      <div className="w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">{post ? "Edit Post" : "New Post"}</h2>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Post title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-slug" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={12} placeholder="Write your post content here..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} placeholder="Brief summary for previews" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input id="author" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Amit Kumar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="SEO, marketing, web" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image URL</Label>
            <Input id="cover" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="size-4 rounded border-border"
            />
            <Label htmlFor="published" className="text-sm font-normal">Published</Label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {post ? "Update" : "Create"} Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
