"use client"

import { useState } from "react"
import { adminApi } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save, X } from "lucide-react"

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim().replace(/^-+|-+$/g, "")
}

interface Props {
  item?: Record<string, unknown> | null
  onClose: () => void
  onSaved: () => void
}

export function PortfolioEditor({ item, onClose, onSaved }: Props) {
  const [title, setTitle] = useState((item?.title as string) || "")
  const [slug, setSlug] = useState((item?.slug as string) || "")
  const [category, setCategory] = useState((item?.category as string) || "")
  const [description, setDescription] = useState((item?.description as string) || "")
  const [imageUrl, setImageUrl] = useState((item?.imageUrl as string) || "")
  const [tagsStr, setTagsStr] = useState(((item?.tags as string[]) || []).join(", "))
  const [clientName, setClientName] = useState((item?.clientName as string) || "")
  const [liveUrl, setLiveUrl] = useState((item?.liveUrl as string) || "")
  const [featured, setFeatured] = useState((item?.featured as boolean) ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!item) setSlug(slugify(val))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!title.trim() || !slug.trim()) { setError("Title and slug are required"); return }
    setSaving(true)
    try {
      const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean)
      const body: Record<string, unknown> = {
        title: title.trim(), slug: slug.trim(), featured,
        category: category.trim() || undefined,
        description: description.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        tags: tags.length ? tags : undefined,
        clientName: clientName.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
      }
      if (item) await adminApi.updatePortfolioItem(item.id as string, body)
      else await adminApi.createPortfolioItem(body)
      onSaved(); onClose()
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to save") }
    finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
      <div className="w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">{item ? "Edit Portfolio Item" : "New Portfolio Item"}</h2>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Title *</Label><Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Project title" /></div>
            <div className="space-y-2"><Label>Slug *</Label><Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="project-slug" /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Category</Label><Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="SEO, Web Design, PPC" /></div>
            <div className="space-y-2"><Label>Client Name</Label><Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client name" /></div>
          </div>
          <div className="space-y-2"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Project description" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Image URL</Label><Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." /></div>
            <div className="space-y-2"><Label>Live URL</Label><Input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." /></div>
          </div>
          <div className="space-y-2"><Label>Tags (comma-separated)</Label><Input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="SEO, redesign, e-commerce" /></div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="p-feat" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="size-4 rounded border-border" />
            <Label htmlFor="p-feat" className="text-sm font-normal">Featured</Label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{item ? "Update" : "Create"} Item</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
