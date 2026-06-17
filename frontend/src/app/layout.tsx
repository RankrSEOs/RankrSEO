import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import FloatingWhatsApp from "@/components/lead-generation/FloatingWhatsApp"
import StickyCTA from "@/components/lead-generation/StickyCTA"
import ExitIntentPopup from "@/components/lead-generation/ExitIntentPopup"
import { LocalBusinessJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd"
import { faqData } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "RankrSEO - Digital Marketing Agency | SEO, Web Design & Revenue Growth",
    template: "%s | RankrSEO",
  },
  description:
    "RankrSEO is a results-driven digital marketing agency founded by Amit Kumar. We help businesses increase online visibility, generate qualified leads, and grow revenue through SEO, web design, content marketing, and paid advertising.",
  keywords: [
    "SEO agency", "SEO services", "digital marketing agency", "web design agency",
    "local SEO services", "technical SEO", "content marketing", "PPC advertising",
    "WordPress development", "social media marketing", "rankrseo", "Amit Kumar",
    "SEO consultant India", "SEO expert", "growth marketing agency",
  ],
  authors: [{ name: "Amit Kumar", url: "https://www.linkedin.com/in/rankrseo/" }],
  creator: "RankrSEO",
  publisher: "RankrSEO",
  metadataBase: new URL("https://rankrseo.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RankrSEO",
    title: "RankrSEO - Digital Marketing Agency | Grow Your Business, Dominate Search",
    description:
      "Data-driven SEO and digital marketing to grow your revenue. Founded by Amit Kumar. Serving clients in USA, UK, Canada, Australia & India.",
    url: "https://rankrseo.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RankrSEO - Digital Marketing Agency",
    description: "Data-driven SEO and digital marketing to grow your revenue. Founded by Amit Kumar.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://rankrseo.com" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <head>
        <LocalBusinessJsonLd />
        <FaqJsonLd faqs={faqData.map((f) => ({ question: f.q, answer: f.a }))} />
        <BreadcrumbJsonLd items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Contact", url: "/contact" },
        ]}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <StickyCTA />
          <ExitIntentPopup />
        </ThemeProvider>
      </body>
    </html>
  )
}
