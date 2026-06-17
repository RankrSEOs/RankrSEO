import type { Metadata } from "next"
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
  return <AdminShell>{children}</AdminShell>
}
