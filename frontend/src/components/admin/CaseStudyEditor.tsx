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

export function CaseStudyEditor({ item, onClose, onSaved }: Props) {
  const [title, setTitle] = useState((item?.title as string) || "")
  const [slug, setSlug] = useState((item?.slug as string) || "")
  const [clientName, setClientName] = useState((item?.clientName as string) || "")
  const [clientIndustry, setClientIndustry] = useState((item?.clientIndustry as string) || "")
  const [problem, setProblem] = useState((item?.problem as string) || "")
  const [strategy, setStrategy] = useState((item?.strategy as string) || "")
  const [results, setResults] = useState((item?.results as string) || "")
  const [metrics, setMetrics] = useState(JSON.stringify((item?.metrics as Record<string, unknown>) || {}, null, 2))
  const [coverImage, setCoverImage] = useState((item?.coverImage as string) || "")
  const [published, setPublished] = useState((item?.published as boolean) ?? true)
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
      let parsed: Record<string, unknown> | undefined
      if (metrics.trim()) {
        try { parsed = JSON.parse(metrics) } catch { setError("Metrics must be valid JSON"); setSaving(false); return }
      }
      const body: Record<string, unknown> = {
        title: title.trim(), slug: slug.trim(), published,
        clientName: clientName.trim() || undefined,
        clientIndustry: clientIndustry.trim() || undefined,
        problem: problem.trim() || undefined,
        strategy: strategy.trim() || undefined,
        results: results.trim() || undefined,
        metrics: parsed,
        coverImage: coverImage.trim() || undefined,
      }
      if (item) await adminApi.updateCase(item.id as string, body)
      else await adminApi.createCase(body)
      onSaved(); onClose()
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to save") }
    finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
      <div className="w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">{item ? "Edit Case Study" : "New Case Study"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Case study title" />
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="case-study-slug" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client name" />
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Input value={clientIndustry} onChange={(e) => setClientIndustry(e.target.value)} placeholder="e.g. SaaS, E-commerce" />
            </div>
          </div>
          <div className="space-y-2"><Label>Problem</Label><Textarea value={problem} onChange={(e) => setProblem(e.target.value)} rows={3} placeholder="Client's challenge" /></div>
          <div className="space-y-2"><Label>Strategy</Label><Textarea value={strategy} onChange={(e) => setStrategy(e.target.value)} rows={3} placeholder="Our approach" /></div>
          <div className="space-y-2"><Label>Results</Label><Textarea value={results} onChange={(e) => setResults(e.target.value)} rows={3} placeholder="Key outcomes" /></div>
          <div className="space-y-2"><Label>Metrics (JSON)</Label><Textarea value={metrics} onChange={(e) => setMetrics(e.target.value)} rows={3} placeholder='{"traffic": "+340%"}' /></div>
          <div className="space-y-2"><Label>Cover Image URL</Label><Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." /></div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="cs-pub" checked={published} onChange={(e) => setPublished(e.target.checked)} className="size-4 rounded border-border" />
            <Label htmlFor="cs-pub" className="text-sm font-normal">Published</Label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{item ? "Update" : "Create"} Case Study</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
