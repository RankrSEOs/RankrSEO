"use client"

import { useState, useEffect } from "react"
import { adminApi } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Trash2, Eye, Loader2 } from "lucide-react"

const statuses = ["All", "NEW", "CONTACTED", "QUALIFIED", "LOST", "WON"]
const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  CONTACTED: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  QUALIFIED: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  LOST: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  WON: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
}

export default function LeadsPage() {
  useEffect(() => { document.title = "Leads | RankrSEO Admin" }, [])
  const [leads, setLeads] = useState<Array<{
    id: string; name: string; email: string; phone: string | null;
    website: string | null; company: string | null; service: string | null;
    source: string | null; status: string; createdAt: string
  }>>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selected, setSelected] = useState<string | null>(null)
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null)

  const fetchLeads = () => {
    setLoading(true)
    adminApi.getLeads({ status: statusFilter, search: search || undefined })
      .then(setLeads)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchLeads() }, [statusFilter])

  const handleSearch = () => fetchLeads()

  const handleStatusChange = async (id: string, status: string) => {
    setStatusUpdating(id)
    try {
      await adminApi.updateLead(id, { status })
      fetchLeads()
    } catch (err) {
      console.error(err)
    } finally {
      setStatusUpdating(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return
    try {
      await adminApi.deleteLead(id)
      fetchLeads()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track incoming leads.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Leads ({leads.length})</CardTitle>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Statuses" : s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="size-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Phone</th>
                    <th className="pb-3 font-medium">Service</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">
                        No leads found.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 font-medium">{lead.name}</td>
                        <td className="py-3 text-muted-foreground">{lead.email}</td>
                        <td className="py-3 text-muted-foreground">{lead.phone || "—"}</td>
                        <td className="py-3 text-muted-foreground">{lead.service || lead.source || "—"}</td>
                        <td className="py-3">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            disabled={statusUpdating === lead.id}
                            className="rounded-full border-0 bg-transparent px-2 py-0.5 text-xs font-semibold focus:outline-none"
                            style={{
                              backgroundColor: lead.status === "NEW" ? "#dbeafe" :
                                lead.status === "CONTACTED" ? "#fef3c7" :
                                lead.status === "QUALIFIED" ? "#d1fae5" :
                                lead.status === "WON" ? "#d1fae5" :
                                lead.status === "LOST" ? "#fee2e2" : "#f3f4f6",
                              color: lead.status === "NEW" ? "#1d4ed8" :
                                lead.status === "CONTACTED" ? "#b45309" :
                                lead.status === "QUALIFIED" ? "#047857" :
                                lead.status === "WON" ? "#047857" :
                                lead.status === "LOST" ? "#b91c1c" : "#374151",
                            }}
                          >
                            {statuses.filter(s => s !== "All").map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 text-muted-foreground text-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelected(selected === lead.id ? null : lead.id)}
                              className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              <Eye className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </button>
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

      {selected && (
        <LeadDetailModal leadId={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

function LeadDetailModal({ leadId, onClose }: { leadId: string; onClose: () => void }) {
  const [lead, setLead] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.getLead(leadId).then(setLead).catch(console.error).finally(() => setLoading(false))
  }, [leadId])

  if (!lead) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Lead Details</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="size-5 animate-spin text-primary" /></div>
        ) : (
          <dl className="space-y-3 text-sm">
            {Object.entries(lead as Record<string, unknown>).filter(([k]) => !["id", "updatedAt", "notes"].includes(k)).map(([key, val]) => (
              <div key={key} className="flex justify-between gap-4 border-b pb-2 last:border-0">
                <dt className="font-medium capitalize text-muted-foreground">{key}</dt>
                <dd className="text-right font-medium">
                  {key === "createdAt" ? new Date(val as string).toLocaleString() :
                   val === null ? "—" : String(val)}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  )
}
