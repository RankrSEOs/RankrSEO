import type { Metadata } from "next"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Users, MousePointerClick, Globe, Clock, TrendingUp, Activity } from "lucide-react"

export const metadata: Metadata = {
  title: "Analytics",
  robots: {
    index: false,
    follow: false,
  },
}

const metrics = [
  { label: "Total Sessions", value: "45,892", change: "+8.2%", icon: Users },
  { label: "Page Views", value: "124,503", change: "+12.4%", icon: MousePointerClick },
  { label: "Bounce Rate", value: "32.1%", change: "-2.3%", icon: Globe },
  { label: "Avg. Session Duration", value: "3m 42s", change: "+5.1%", icon: Clock },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Website performance and traffic insights.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const isPositive = metric.change.startsWith("+")
          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p
                  className={
                    "text-xs " + (isPositive ? "text-green-600" : "text-red-600")
                  }
                >
                  {metric.change} vs last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>
              Monthly website traffic — GA4 integration placeholder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-56 items-end justify-between gap-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const height = 20 + Math.random() * 60
                const isCurrent = i === 11
                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={
                        "w-full rounded-md " +
                        (isCurrent ? "bg-primary" : "bg-primary/20")
                      }
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {[
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                      ][i]}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>
              Where your visitors come from — GA4 integration placeholder
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { source: "Organic Search", value: 45, color: "bg-primary" },
              { source: "Direct", value: 25, color: "bg-accent" },
              { source: "Referral", value: 15, color: "bg-yellow-500" },
              { source: "Social", value: 10, color: "bg-purple-500" },
              { source: "Other", value: 5, color: "bg-muted-foreground" },
            ].map((item) => (
              <div key={item.source}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{item.source}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={"h-full rounded-full " + item.color}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Page Performance</CardTitle>
            <CardDescription>
              Top performing pages — GA4 integration placeholder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Page</th>
                    <th className="pb-3 font-medium">Views</th>
                    <th className="pb-3 font-medium">Unique Visitors</th>
                    <th className="pb-3 font-medium">Avg. Time</th>
                    <th className="pb-3 font-medium">Bounce Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { page: "/", views: "12,450", unique: "8,230", time: "2m 15s", bounce: "28%" },
                    { page: "/services/seo", views: "8,920", unique: "5,610", time: "3m 42s", bounce: "22%" },
                    { page: "/blog", views: "7,340", unique: "4,890", time: "4m 10s", bounce: "18%" },
                    { page: "/portfolio", views: "5,210", unique: "3,450", time: "2m 55s", bounce: "32%" },
                    { page: "/contact", views: "4,180", unique: "3,120", time: "1m 30s", bounce: "45%" },
                  ].map((row) => (
                    <tr key={row.page} className="border-b last:border-0">
                      <td className="py-3 font-medium">{row.page}</td>
                      <td className="py-3 text-muted-foreground">{row.views}</td>
                      <td className="py-3 text-muted-foreground">{row.unique}</td>
                      <td className="py-3 text-muted-foreground">{row.time}</td>
                      <td className="py-3 text-muted-foreground">{row.bounce}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
