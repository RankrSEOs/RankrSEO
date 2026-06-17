import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import FloatingWhatsApp from "@/components/lead-generation/FloatingWhatsApp"
import StickyCTA from "@/components/lead-generation/StickyCTA"
import ExitIntentPopup from "@/components/lead-generation/ExitIntentPopup"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "RankrSEO - Digital Marketing Agency | SEO, Web Design & Growth",
    template: "%s | RankrSEO",
  },
  description:
    "RankrSEO is a data-driven digital marketing agency specializing in SEO, Local SEO, Web Design, and PPC. We help businesses rank higher, attract more customers, and scale revenue.",
  keywords: [
    "SEO agency",
    "digital marketing",
    "web design",
    "local SEO",
    "technical SEO",
    "content marketing",
    "PPC advertising",
    "RankrSEO",
  ],
  authors: [{ name: "Amit Kumar" }],
  creator: "RankrSEO",
  publisher: "RankrSEO",
  metadataBase: new URL("https://rankrseo.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RankrSEO",
    title: "RankrSEO - Digital Marketing Agency",
    description: "Data-driven SEO and digital marketing to grow your business.",
    url: "https://rankrseo.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "RankrSEO - Digital Marketing Agency",
    description: "Data-driven SEO and digital marketing to grow your business.",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <head>
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