"use client"

import { useState } from "react"
import { adminApi } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save, X } from "lucide-react"

interface Props {
  item?: Record<string, unknown> | null
  onClose: () => void
  onSaved: () => void
}

export function TestimonialEditor({ item, onClose, onSaved }: Props) {
  const [clientName, setClientName] = useState((item?.clientName as string) || "")
  const [company, setCompany] = useState((item?.company as string) || "")
  const [position, setPosition] = useState((item?.position as string) || "")
  const [content, setContent] = useState((item?.content as string) || "")
  const [rating, setRating] = useState((item?.rating as number) ?? 5)
  const [avatar, setAvatar] = useState((item?.avatar as string) || "")
  const [featured, setFeatured] = useState((item?.featured as boolean) ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!clientName.trim() || !content.trim()) { setError("Client name and content are required"); return }
    setSaving(true)
    try {
      const body: Record<string, unknown> = {
        clientName: clientName.trim(),
        content: content.trim(),
        rating,
        featured,
        company: company.trim() || undefined,
        position: position.trim() || undefined,
        avatar: avatar.trim() || undefined,
      }
      if (item) await adminApi.updateTestimonial(item.id as string, body)
      else await adminApi.createTestimonial(body)
      onSaved(); onClose()
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to save") }
    finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">{item ? "Edit Testimonial" : "New Testimonial"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <div className="space-y-2"><Label>Client Name *</Label><Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Jane Doe" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Company</Label><Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Inc." /></div>
            <div className="space-y-2"><Label>Position</Label><Input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="CEO" /></div>
          </div>
          <div className="space-y-2"><Label>Content *</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} placeholder="Testimonial text..." /></div>
          <div className="space-y-2">
            <Label>Rating (1-5)</Label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
            </select>
          </div>
          <div className="space-y-2"><Label>Avatar URL</Label><Input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://..." /></div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="t-feat" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="size-4 rounded border-border" />
            <Label htmlFor="t-feat" className="text-sm font-normal">Featured</Label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{item ? "Update" : "Create"} Testimonial</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
