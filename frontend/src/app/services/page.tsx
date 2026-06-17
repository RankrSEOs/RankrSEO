import type { Metadata } from "next"
import ServicesContent from "./services-content"

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "RankrSEO offers comprehensive digital marketing services including SEO, Local SEO, Technical SEO, Link Building, Web Design, Content Marketing, Google Business Profile, and PPC Advertising.",
  openGraph: {
    title: "Digital Marketing Services | RankrSEO",
    description: "Full-service digital marketing agency specializing in SEO, web design, and PPC.",
    url: "https://rankrseo.com/services",
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}
