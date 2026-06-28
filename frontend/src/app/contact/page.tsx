import type { Metadata } from "next"
import ContactContent from "./contact-content"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with RankrSEO for a free consultation. Let's discuss how we can help your business rank higher, attract more customers, and grow revenue.",
  openGraph: {
    title: "Contact RankrSEO | Get a Free SEO Consultation",
    description: "Ready to grow your business? Contact RankrSEO for a free consultation and custom SEO strategy.",
    url: "https://rankrseo.com/contact",
  },
}

export default function ContactPage() {
  return <ContactContent />
}
