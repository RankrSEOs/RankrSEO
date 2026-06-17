import type { Metadata } from "next"
import { caseStudies } from "@/lib/utils"
import CaseStudiesClient from "./cases-client"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real results from real clients. See how RankrSEO has helped businesses grow their traffic, leads, and revenue.",
}

export default function CasesPage() {
  return <CaseStudiesClient caseStudies={caseStudies} />
}
