import type { Metadata } from "next"
import HeroSection from "@/components/home/HeroSection"
import SocialProofSection from "@/components/home/SocialProofSection"
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection"
import ServicesSection from "@/components/home/ServicesSection"
import CaseStudiesSection from "@/components/home/CaseStudiesSection"
import FounderSection from "@/components/home/FounderSection"
import ProcessSection from "@/components/home/ProcessSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import FAQSection from "@/components/home/FAQSection"
import CTASection from "@/components/home/CTASection"

export const metadata: Metadata = {
  title: "RankrSEO — SEO Agency & Digital Marketing Services",
  description:
    "RankrSEO is a results-driven SEO agency offering organic SEO, local SEO, technical SEO, content marketing, and paid ads for businesses in the USA, UK, Canada, Australia, and India.",
  openGraph: {
    title: "RankrSEO — SEO Agency & Digital Marketing Services",
    description:
      "RankrSEO is a results-driven SEO agency offering organic SEO, local SEO, technical SEO, content marketing, and paid ads for businesses worldwide.",
    url: "https://rankrseo.vercel.app",
    siteName: "RankrSEO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RankrSEO — SEO Agency & Digital Marketing Services",
    description:
      "RankrSEO is a results-driven SEO agency offering organic SEO, local SEO, technical SEO, content marketing, and paid ads.",
  },
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeaturedProjectsSection />
      <ServicesSection />
      <CaseStudiesSection />
      <FounderSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
