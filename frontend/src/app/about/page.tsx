import type { Metadata } from "next"
import AboutContent from "./about-content"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "RankrSEO is a data-driven digital marketing agency founded by Amit Kumar. We help businesses rank higher, attract more customers, and scale revenue through SEO, web design, and PPC.",
  openGraph: {
    title: "About RankrSEO | Digital Marketing Agency",
    description: "Learn about our mission, vision, and the team behind RankrSEO.",
    url: "https://rankrseo.com/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
}

export default function AboutPage() {
  return <AboutContent />
}
