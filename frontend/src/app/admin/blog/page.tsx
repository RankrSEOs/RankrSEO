"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  category: string
  author: string
  published: boolean
  date: string
}

const initialPosts: BlogPost[] = [
  { id: 1, title: "10 SEO Strategies for 2026", category: "SEO", author: "Amit Kumar", published: true, date: "2026-06-10" },
  { id: 2, title: "The Future of Local Search", category: "Local SEO", author: "Priya Sharma", published: true, date: "2026-06-08" },
  { id: 3, title: "Web Design Trends to Watch", category: "Web Design", author: "Amit Kumar", published: false, date: "2026-06-05" },
  { id: 4, title: "PPC Budget Optimization Guide", category: "PPC", author: "Rahul Verma", published: true, date: "2026-06-03" },
  { id: 5, title: "Content Marketing ROI Metrics", category: "Content Marketing", author: "Priya Sharma", published: false, date: "2026-05-30" },
  { id: 6, title: "Technical SEO Checklist", category: "Technical SEO", author: "Amit Kumar", published: true, date: "2026-05-28" },
  { id: 7, title: "Link Building in the AI Era", category: "Link Building", author: "Rahul Verma", published: true, date: "2026-05-25" },
  { id: 8, title: "Google Business Profile Optimization", category: "Local SEO", author: "Priya Sharma", published: false, date: "2026-05-22" },
]

export default function BlogPage() {
  const [posts, setPosts] = useState(initialPosts)

  const togglePublish = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">
            Manage your blog content.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Author</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 font-medium">{post.title}</td>
                    <td className="py-3 text-muted-foreground">{post.category}</td>
                    <td className="py-3 text-muted-foreground">{post.author}</td>
                    <td className="py-3">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                          (post.published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600")
                        }
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{post.date}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePublish(post.id)}
                          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title={post.published ? "Unpublish" : "Publish"}
                        >
                          {post.published ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
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
