import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { servicesData } from "@/lib/utils"
import ServiceDetailClient from "./service-detail-client"

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData.find((s) => s.id === slug)
  if (!service) return {}
  return { title: service.title, description: service.description }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData.find((s) => s.id === slug)
  if (!service) notFound()
  return <ServiceDetailClient service={service} />
}
