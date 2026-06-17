"use client"

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RankrSEO",
    url: "https://rankrseo.com",
    logo: "https://rankrseo.com/logo.png",
    foundingDate: "2022",
    founder: { "@type": "Person", name: "Amit Kumar" },
    address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
    contactPoint: { "@type": "ContactPoint", telephone: "+91-9999999999", contactType: "customer service" },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "RankrSEO",
    url: "https://rankrseo.com",
    logo: "https://rankrseo.com/logo.png",
    image: "https://rankrseo.com/og-image.jpg",
    telephone: "+91-9999999999",
    email: "hello@rankrseo.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Connaught Place",
      addressLocality: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6315,
      longitude: 77.2167,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
    ],
    sameAs: [
      "https://facebook.com/rankrseo",
      "https://twitter.com/rankrseo",
      "https://linkedin.com/company/rankrseo",
      "https://instagram.com/rankrseo",
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  authorName: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: image || "https://rankrseo.com/og-image.jpg",
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "RankrSEO", logo: { "@type": "ImageObject", url: "https://rankrseo.com/logo.png" } },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
