import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Portfolio",
  robots: {
    index: false,
    follow: false,
  },
}

const projects = [
  { id: 1, title: "BrightPath Marketing", category: "SEO & Content", image: "/placeholder.svg", url: "#" },
  { id: 2, title: "TechVista Solutions", category: "Web Design", image: "/placeholder.svg", url: "#" },
  { id: 3, title: "Coastal Realty Group", category: "Local SEO", image: "/placeholder.svg", url: "#" },
  { id: 4, title: "Quantum Health", category: "Technical SEO", image: "/placeholder.svg", url: "#" },
  { id: 5, title: "GreenLeaf Organics", category: "Content Marketing", image: "/placeholder.svg", url: "#" },
  { id: 6, title: "Premier Construction", category: "PPC & SEO", image: "/placeholder.svg", url: "#" },
]

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-sm text-muted-foreground">
            Showcase your agency&apos;s work.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Add Item
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <Globe className="size-8 text-muted-foreground/40" />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <Pencil className="size-3.5" />
                  </button>
                  <button className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
