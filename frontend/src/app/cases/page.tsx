import type { Metadata } from "next"
import { caseStudies as hardcodedCases } from "@/lib/utils"
import { fetchPublishedCases } from "@/lib/public-api"
import CaseStudiesClient from "./cases-client"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real results from real clients. See how RankrSEO has helped businesses grow their traffic, leads, and revenue.",
}

export default async function CasesPage() {
  let items = hardcodedCases
  try {
    items = await fetchPublishedCases()
    if (!items.length) items = hardcodedCases
  } catch {}
  return <CaseStudiesClient caseStudies={items} />
}
