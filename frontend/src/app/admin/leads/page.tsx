"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Search, Trash2, Eye } from "lucide-react"

const statuses = ["All", "NEW", "CONTACTED", "QUALIFIED", "LOST", "WON"] as const

const initialLeads = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 (555) 123-4567", service: "SEO Services", status: "NEW" as const, date: "2026-06-15" },
  { id: 2, name: "Michael Chen", email: "michael@example.com", phone: "+1 (555) 234-5678", service: "Web Design", status: "CONTACTED" as const, date: "2026-06-14" },
  { id: 3, name: "Emily Rodriguez", email: "emily@example.com", phone: "+1 (555) 345-6789", service: "PPC Advertising", status: "QUALIFIED" as const, date: "2026-06-13" },
  { id: 4, name: "David Kim", email: "david@example.com", phone: "+1 (555) 456-7890", service: "Local SEO", status: "NEW" as const, date: "2026-06-12" },
  { id: 5, name: "Lisa Thompson", email: "lisa@example.com", phone: "+1 (555) 567-8901", service: "Content Marketing", status: "WON" as const, date: "2026-06-11" },
  { id: 6, name: "James Wilson", email: "james@example.com", phone: "+1 (555) 678-9012", service: "Technical SEO", status: "CONTACTED" as const, date: "2026-06-10" },
  { id: 7, name: "Amanda Foster", email: "amanda@example.com", phone: "+1 (555) 789-0123", service: "Link Building", status: "LOST" as const, date: "2026-06-09" },
  { id: 8, name: "Robert Patel", email: "robert@example.com", phone: "+1 (555) 890-1234", service: "SEO Services", status: "QUALIFIED" as const, date: "2026-06-08" },
  { id: 9, name: "Jennifer Lee", email: "jennifer@example.com", phone: "+1 (555) 901-2345", service: "Web Design", status: "NEW" as const, date: "2026-06-07" },
  { id: 10, name: "Thomas Garcia", email: "thomas@example.com", phone: "+1 (555) 012-3456", service: "PPC Advertising", status: "CONTACTED" as const, date: "2026-06-06" },
]

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  QUALIFIED: "bg-green-100 text-green-700",
  LOST: "bg-red-100 text-red-700",
  WON: "bg-emerald-100 text-emerald-700",
}

export default function LeadsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = initialLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.service.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
            <CardTitle>All Leads</CardTitle>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((lead) => (
                    <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 font-medium">{lead.name}</td>
                      <td className="py-3 text-muted-foreground">{lead.email}</td>
                      <td className="py-3 text-muted-foreground">{lead.phone}</td>
                      <td className="py-3 text-muted-foreground">{lead.service}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[lead.status]}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{lead.date}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <Eye className="size-4" />
                          </button>
                          <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive">
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
        </CardContent>
      </Card>
    </div>
  )
}
