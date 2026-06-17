import type { Metadata } from "next"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Users, FileText, Star, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
}

const stats = [
  { label: "Total Leads", value: "1,284", change: "+12.5%", icon: Users },
  { label: "Blog Posts", value: "48", change: "+3", icon: FileText },
  {
    label: "Testimonials",
    value: "32",
    change: "+5",
    icon: Star,
  },
  {
    label: "Conversion Rate",
    value: "24.8%",
    change: "+2.1%",
    icon: TrendingUp,
  },
]

const recentLeads = [
  { name: "Sarah Johnson", email: "sarah@example.com", service: "SEO", status: "New", date: "2026-06-15" },
  { name: "Michael Chen", email: "michael@example.com", service: "Web Design", status: "Contacted", date: "2026-06-14" },
  { name: "Emily Rodriguez", email: "emily@example.com", service: "PPC", status: "Qualified", date: "2026-06-13" },
  { name: "David Kim", email: "david@example.com", service: "Local SEO", status: "New", date: "2026-06-12" },
  { name: "Lisa Thompson", email: "lisa@example.com", service: "Content Marketing", status: "Won", date: "2026-06-11" },
  { name: "James Wilson", email: "james@example.com", service: "Technical SEO", status: "Contacted", date: "2026-06-10" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your agency metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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
                <p className="text-xs text-green-600">{stat.change} from last month</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
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
                    <tr key={lead.email} className="border-b last:border-0">
                      <td className="py-3 font-medium">{lead.name}</td>
                      <td className="py-3 text-muted-foreground">{lead.email}</td>
                      <td className="py-3 text-muted-foreground">{lead.service}</td>
                      <td className="py-3">
                        <span
                          className={
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " +
                            (lead.status === "New"
                              ? "bg-blue-100 text-blue-700"
                              : lead.status === "Contacted"
                              ? "bg-yellow-100 text-yellow-700"
                              : lead.status === "Qualified"
                              ? "bg-green-100 text-green-700"
                              : "bg-emerald-100 text-emerald-700")
                          }
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end justify-between gap-2">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                <div key={month} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-md bg-primary/20"
                    style={{ height: `${40 + Math.random() * 60}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{month}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Chart placeholder — GA4 integration coming soon
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
