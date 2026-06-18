import type { Metadata } from "next"
import { AuthProvider } from "@/lib/auth-context"
import { AdminShell } from "./admin-shell"

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | RankrSEO",
    template: "%s | RankrSEO Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  )
}
