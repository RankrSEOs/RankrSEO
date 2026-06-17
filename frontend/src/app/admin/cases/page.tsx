import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Eye, ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Case Studies",
  robots: {
    index: false,
    follow: false,
  },
}

const caseStudies = [
  { id: 1, title: "How BrightPath Marketing Achieved 300% Traffic Growth", client: "BrightPath Marketing", industry: "Marketing", result: "300% Traffic Increase", status: "Published", date: "2026-05-15" },
  { id: 2, title: "TechVista Solutions: From Page 10 to #1 in 90 Days", client: "TechVista Solutions", industry: "SaaS", result: "#1 Rankings", status: "Published", date: "2026-04-20" },
  { id: 3, title: "Coastal Realty Group: 50+ Monthly Leads from Local SEO", client: "Coastal Realty Group", industry: "Real Estate", result: "50+ Leads/Month", status: "Draft", date: "2026-03-10" },
  { id: 4, title: "Quantum Health: Technical SEO Overhaul Case Study", client: "Quantum Health", industry: "Healthcare", result: "200% Organic Growth", status: "Published", date: "2026-02-28" },
  { id: 5, title: "GreenLeaf Organics: Content Strategy That Converts", client: "GreenLeaf Organics", industry: "E-Commerce", result: "150% Revenue Growth", status: "Draft", date: "2026-01-15" },
]

export default function CasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Case Studies</h1>
          <p className="text-sm text-muted-foreground">
            Manage your agency&apos;s case studies.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          New Case Study
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Case Studies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Industry</th>
                  <th className="pb-3 font-medium">Result</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.map((cs) => (
                  <tr key={cs.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 font-medium">{cs.title}</td>
                    <td className="py-3 text-muted-foreground">{cs.client}</td>
                    <td className="py-3 text-muted-foreground">{cs.industry}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        <ArrowUpRight className="size-3" />
                        {cs.result}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                          (cs.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600")
                        }
                      >
                        {cs.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{cs.date}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                          <Eye className="size-4" />
                        </button>
                        <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                          <Pencil className="size-4" />
                        </button>
                        <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
