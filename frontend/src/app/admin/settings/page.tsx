"use client"

import { useState, useEffect } from "react"
import { adminApi } from "@/lib/admin-api"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, Save } from "lucide-react"

export default function SettingsPage() {
  useEffect(() => { document.title = "Settings | RankrSEO Admin" }, [])
  const [values, setValues] = useState<Record<string, string>>({
    agencyName: "RankrSEO",
    contactEmail: "rankrseo@gmail.com",
    phone: "+91 9953732860",
    address: "Delhi, India",
    socialFacebook: "https://facebook.com/profile.php?id=100089141288063",
    socialTwitter: "https://twitter.com/rankrseo",
    socialLinkedin: "https://linkedin.com/in/rankrseo/",
    socialInstagram: "https://instagram.com/rankrseo",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    adminApi.getSettings()
      .then((data) => {
        if (Object.keys(data).length > 0) {
          setValues((prev) => ({ ...prev, ...data } as Record<string, string>))
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError("")
    try {
      await adminApi.updateSettings(values)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your agency settings. Changes are saved to the database.</p>
      </div>

      {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
          <CardDescription>Update your agency name, contact info, and branding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agencyName">Agency Name</Label>
            <Input id="agencyName" value={values.agencyName} onChange={(e) => setValues((v) => ({ ...v, agencyName: e.target.value }))} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" value={values.contactEmail} onChange={(e) => setValues((v) => ({ ...v, contactEmail: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={values.phone} onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={values.address} onChange={(e) => setValues((v) => ({ ...v, address: e.target.value }))} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Links to your social profiles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["facebook", "twitter", "linkedin", "instagram"].map((platform) => (
            <div key={platform} className="space-y-2">
              <Label htmlFor={`social-${platform}`} className="capitalize">{platform}</Label>
              <Input
                id={`social-${platform}`}
                value={values[`social${platform.charAt(0).toUpperCase() + platform.slice(1)}`] || ""}
                onChange={(e) => setValues((v) => ({ ...v, [`social${platform.charAt(0).toUpperCase() + platform.slice(1)}`]: e.target.value }))}
                placeholder={`https://${platform}.com/...`}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saved ? "Saved!" : "Save All Changes"}
        </Button>
      </div>
    </div>
  )
}
