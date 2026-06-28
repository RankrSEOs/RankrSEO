"use client"

import { useState, useEffect } from "react"
import { adminApi } from "@/lib/admin-api"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MailOpen, Mail as MailIcon } from "lucide-react"

export default function MessagesPage() {
  useEffect(() => { document.title = "Messages | RankrSEO Admin" }, [])
  const [messages, setMessages] = useState<Array<Record<string, unknown>>>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null)

  const fetchMessages = () => {
    setLoading(true)
    adminApi.getMessages()
      .then(setMessages)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchMessages() }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-sm text-muted-foreground">Contact form submissions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Messages ({messages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-primary" /></div>
          ) : messages.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id as string}
                  className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  onClick={() => setSelected(selected?.id === msg.id ? null : msg)}
                >
                  <div className="mt-0.5">
                    {msg.read ? <MailOpen className="size-4 text-muted-foreground" /> : <MailIcon className="size-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium">{msg.name as string}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {new Date(msg.createdAt as string).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{msg.email as string}</p>
                    {msg.message ? (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground/80">{msg.message as string}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Message Details</h2>
              <button onClick={() => setSelected(null)} aria-label="Close" className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <dl className="space-y-3 text-sm">
              {Object.entries(selected).filter(([k]) => !["id", "read"].includes(k)).map(([key, val]) => (
                <div key={key} className="flex justify-between gap-4 border-b pb-2 last:border-0">
                  <dt className="font-medium capitalize text-muted-foreground">{key}</dt>
                  <dd className="text-right font-medium max-w-[60%] break-words">
                    {key === "createdAt" ? new Date(val as string).toLocaleString() :
                     val === null ? "—" : String(val)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}
