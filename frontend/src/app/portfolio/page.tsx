import type { Metadata } from "next"
import PortfolioContent from "./portfolio-content"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our portfolio of real projects — websites, SEO campaigns, and digital marketing solutions we've built for businesses worldwide.",
  openGraph: {
    title: "RankrSEO Portfolio | Real Projects & Results",
    description: "See real websites and SEO projects built by RankrSEO. From corporate sites to full-service digital marketing.",
    url: "https://rankrseo.com/portfolio",
  },
}

export default function PortfolioPage() {
  return <PortfolioContent />
}
