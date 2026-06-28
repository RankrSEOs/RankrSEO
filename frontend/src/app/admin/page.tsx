"use client"

import { useState, useEffect } from "react"
import { adminApi } from "@/lib/admin-api"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Users, FileText, Star, TrendingUp, Mail, Loader2 } from "lucide-react"

export default function AdminDashboard() {
  useEffect(() => { document.title = "Dashboard | RankrSEO Admin" }, [])
  const [stats, setStats] = useState({
    leads: 0,
    messages: 0,
    blogPosts: 0,
  })
  const [loading, setLoading] = useState(true)
  const [recentLeads, setRecentLeads] = useState<Array<{
    id: string; name: string; email: string; service: string | null;
    status: string; createdAt: string
  }>>([])

  useEffect(() => {
    Promise.all([
      adminApi.getLeads(),
      adminApi.getMessages(),
      adminApi.getBlogPosts(),
    ]).then(([leads, messages, blog]) => {
      setStats({
        leads: leads.length,
        messages: messages.length,
        blogPosts: blog.posts.length,
      })
      setRecentLeads(leads.slice(0, 6).map(l => ({
        id: l.id, name: l.name, email: l.email,
        service: l.service, status: l.status,
        createdAt: l.createdAt
      })))
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const statCards = [
    { label: "Total Leads", value: stats.leads.toString(), icon: Users },
    { label: "Contact Messages", value: stats.messages.toString(), icon: Mail },
    { label: "Blog Posts", value: stats.blogPosts.toString(), icon: FileText },
    { label: "Conversion Rate", value: "—", icon: TrendingUp },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your agency metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLeads.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">No leads yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Service</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{lead.name}</td>
                      <td className="py-3 text-muted-foreground">{lead.email}</td>
                      <td className="py-3 text-muted-foreground">{lead.service || "—"}</td>
                      <td className="py-3">
                        <span
                          className={
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " +
                            (lead.status === "NEW"
                              ? "bg-blue-100 text-blue-700"
                              : lead.status === "CONTACTED"
                              ? "bg-yellow-100 text-yellow-700"
                              : lead.status === "QUALIFIED"
                              ? "bg-green-100 text-green-700"
                              : lead.status === "WON"
                              ? "bg-emerald-100 text-emerald-700"
                              : lead.status === "LOST"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700")
                          }
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
