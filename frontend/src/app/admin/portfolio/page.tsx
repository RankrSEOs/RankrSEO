"use client"

import { useState, useEffect } from "react"
import { adminApi } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PortfolioEditor } from "@/components/admin/PortfolioEditor"
import { Plus, Pencil, Trash2, Eye, Loader2 } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
  useEffect(() => { document.title = "Portfolio | RankrSEO Admin" }, [])
  const [items, setItems] = useState<Array<Record<string, unknown>>>([])
  const [loading, setLoading] = useState(true)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)

  const fetch = () => {
    setLoading(true)
    adminApi.getPortfolioItems().then(setItems).catch(console.error).finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio item?")) return
    try { await adminApi.deletePortfolioItem(id); fetch() } catch (err) { console.error(err) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-sm text-muted-foreground">Manage portfolio projects.</p>
        </div>
        <Button onClick={() => { setEditing(null); setEditorOpen(true) }}>
          <Plus className="size-4" /> New Project
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>All Projects ({items.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-primary" /></div>
          ) : items.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No portfolio items yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div key={item.id as string} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium truncate">{item.title as string}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                      {item.slug ? (
                        <Link href={`/cases/${item.slug}`} className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Eye className="size-3.5" /></Link>
                      ) : null}
                      <button onClick={() => { setEditing(item); setEditorOpen(true) }} className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Pencil className="size-3.5" /></button>
                      <button onClick={() => handleDelete(item.id as string)} className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"><Trash2 className="size-3.5" /></button>
                    </div>
                  </div>
                  {item.category ? (
                    <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{item.category as string}</span>
                  ) : null}
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description as string || "—"}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {editorOpen && (
        <PortfolioEditor
          item={editing}
          onClose={() => { setEditorOpen(false); setEditing(null) }}
          onSaved={fetch}
        />
      )}
    </div>
  )
}
