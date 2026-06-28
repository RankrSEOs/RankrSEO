"use client"

import { useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BarChart3, ExternalLink } from "lucide-react"

export default function AnalyticsPage() {
  useEffect(() => { document.title = "Analytics | RankrSEO Admin" }, [])
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Website performance and traffic insights.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Google Analytics 4</CardTitle>
          <CardDescription>Connect GA4 to see real-time traffic data.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <BarChart3 className="size-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium">Analytics not yet connected</p>
            <p className="mt-1 text-sm text-muted-foreground max-w-md">
              Connect Google Analytics 4 to view traffic sources, user behavior, and conversion data directly in your dashboard.
            </p>
          </div>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Open Google Analytics
            <ExternalLink className="size-3.5" />
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Additional analytics features in development.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary/50" />
              Lead source tracking (UTM parameter analysis)
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary/50" />
              Keyword rank tracking over time
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary/50" />
              Monthly performance reports (PDF export)
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary/50" />
              Goal conversion funnel visualization
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
