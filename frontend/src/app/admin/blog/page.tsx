"use client"

import { useState, useEffect } from "react"
import { adminApi } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BlogPostEditor } from "@/components/admin/BlogPostEditor"
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react"

export default function BlogPage() {
  const [posts, setPosts] = useState<Array<Record<string, unknown>>>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Record<string, unknown> | null>(null)

  const fetchPosts = () => {
    setLoading(true)
    adminApi.getBlogPosts()
      .then((res) => setPosts(res.posts))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchPosts() }, [])

  const togglePublish = async (post: Record<string, unknown>) => {
    setActionLoading(post.id as string)
    try {
      await adminApi.updateBlogPost(post.id as string, { published: !post.published })
      fetchPosts()
    } catch (err) { console.error(err) }
    finally { setActionLoading(null) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return
    setActionLoading(id)
    try {
      await adminApi.deleteBlogPost(id)
      fetchPosts()
    } catch (err) { console.error(err) }
    finally { setActionLoading(null) }
  }

  const openEditor = (post?: Record<string, unknown>) => {
    setEditingPost(post || null)
    setEditorOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">Manage your blog content.</p>
        </div>
        <Button onClick={() => openEditor()}>
          <Plus className="size-4" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Author</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">No posts yet. Create your first post!</td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id as string} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 font-medium max-w-[300px] truncate">{post.title as string}</td>
                        <td className="py-3 text-muted-foreground">{post.authorName as string || "—"}</td>
                        <td className="py-3">
                          <span className={
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                            (post.published ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400")
                          }>
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground text-nowrap">
                          {new Date(post.createdAt as string).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => togglePublish(post)}
                              disabled={actionLoading === post.id}
                              className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
                              title={post.published ? "Unpublish" : "Publish"}
                            >
                              {post.published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                            <button
                              onClick={() => openEditor(post)}
                              className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              title="Edit"
                            >
                              <Pencil className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id as string)}
                              disabled={actionLoading === post.id}
                              className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive disabled:opacity-40"
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

      {editorOpen && (
        <BlogPostEditor
          post={editingPost}
          onClose={() => { setEditorOpen(false); setEditingPost(null) }}
          onSaved={fetchPosts}
        />
      )}
    </div>
  )
}
