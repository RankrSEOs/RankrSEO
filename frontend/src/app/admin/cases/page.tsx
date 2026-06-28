"use client"

import { useState, useEffect } from "react"
import { adminApi } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CaseStudyEditor } from "@/components/admin/CaseStudyEditor"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"

export default function CasesPage() {
  useEffect(() => { document.title = "Case Studies | RankrSEO Admin" }, [])
  const [items, setItems] = useState<Array<Record<string, unknown>>>([])
  const [loading, setLoading] = useState(true)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)

  const fetch = () => {
    setLoading(true)
    adminApi.getCases().then(setItems).catch(console.error).finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return
    try { await adminApi.deleteCase(id); fetch() } catch (err) { console.error(err) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Case Studies</h1>
          <p className="text-sm text-muted-foreground">Manage your agency&apos;s case studies.</p>
        </div>
        <Button onClick={() => { setEditing(null); setEditorOpen(true) }}>
          <Plus className="size-4" /> New Case Study
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>All Case Studies ({items.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Client</th>
                    <th className="pb-3 font-medium">Industry</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No case studies yet.</td></tr>
                  ) : (
                    items.map((cs) => (
                      <tr key={cs.id as string} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 font-medium max-w-[300px] truncate">{cs.title as string}</td>
                        <td className="py-3 text-muted-foreground">{cs.clientName as string || "—"}</td>
                        <td className="py-3 text-muted-foreground">{cs.clientIndustry as string || "—"}</td>
                        <td className="py-3">
                          <span className={
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                            (cs.published ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400")
                          }>{cs.published ? "Published" : "Draft"}</span>
                        </td>
                        <td className="py-3 text-muted-foreground text-nowrap">{new Date(cs.createdAt as string).toLocaleDateString()}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setEditing(cs); setEditorOpen(true) }} className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Pencil className="size-4" /></button>
                            <button onClick={() => handleDelete(cs.id as string)} className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"><Trash2 className="size-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {editorOpen && (
        <CaseStudyEditor
          item={editing}
          onClose={() => { setEditorOpen(false); setEditing(null) }}
          onSaved={fetch}
        />
      )}
    </div>
  )
}
