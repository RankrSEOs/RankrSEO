import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text
  return text.substring(0, length) + "..."
}

export const servicesData = [
  {
    id: "seo",
    title: "SEO Services",
    description: "Data-driven SEO strategies to boost your organic rankings and drive qualified traffic.",
    icon: "Search",
    href: "/services/seo",
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Content Strategy", "Link Building", "SEO Audit"],
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "Dominate local search results and attract customers in your area.",
    icon: "MapPin",
    href: "/services/local-seo",
    features: ["Google Business Profile", "Local Citations", "Review Management", "Local Content", "Map Rankings"],
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    description: "Optimize your website infrastructure for maximum search engine performance.",
    icon: "Settings",
    href: "/services/technical-seo",
    features: ["Site Audit", "Core Web Vitals", "Schema Markup", "Site Structure", "Mobile Optimization"],
  },
  {
    id: "link-building",
    title: "Link Building",
    description: "Build high-quality backlinks that boost domain authority and rankings.",
    icon: "Link",
    href: "/services/link-building",
    features: ["Guest Posting", "Broken Link Building", "Digital PR", "Outreach", "Link Reclamation"],
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    description: "Create compelling content that attracts, engages, and converts your audience.",
    icon: "FileText",
    href: "/services/content-marketing",
    features: ["Blog Writing", "Content Strategy", "Copywriting", "Infographics", "Video Content"],
  },
  {
    id: "web-design",
    title: "Website Design",
    description: "Beautiful, conversion-optimized websites that represent your brand perfectly.",
    icon: "Palette",
    href: "/services/web-design",
    features: ["UI/UX Design", "Responsive Design", "WordPress Development", "E-Commerce", "Landing Pages"],
  },
  {
    id: "google-business-profile",
    title: "Google Business Profile",
    description: "Optimize your GBP listing to appear in local pack and Google Maps.",
    icon: "Building2",
    href: "/services/google-business-profile",
    features: ["Profile Setup", "Optimization", "Post Management", "Review Strategy", "Insights"],
  },
  {
    id: "ppc",
    title: "PPC Advertising",
    description: "Targeted paid campaigns that deliver immediate ROI and qualified leads.",
    icon: "BarChart3",
    href: "/services/ppc",
    features: ["Google Ads", "Social Ads", "Remarketing", "Ad Copy", "Conversion Tracking"],
  },
]

export const industriesData = [
  "Small Business",
  "Local Business",
  "Startup",
  "Coach",
  "Agency",
  "E-Commerce Store",
  "Healthcare",
  "Real Estate",
  "Lawyer",
  "Dentist",
  "SaaS Company",
]

export const faqData = [
  {
    q: "How long does it take to see SEO results?",
    a: "SEO is a long-term strategy. Most clients start seeing improvements within 3-6 months, with significant results通常在6-12个月内显现。",
  },
  {
    q: "What is the cost of your SEO services?",
    a: "Our pricing is customized based on your business needs, competition, and goals. Contact us for a free consultation and quote.",
  },
  {
    q: "Do you guarantee #1 rankings on Google?",
    a: "No ethical SEO agency can guarantee #1 rankings. We guarantee our efforts and strategies, but search results depend on many factors.",
  },
  {
    q: "What makes RankrSEO different from other agencies?",
    a: "We combine data-driven strategies with personalized attention. Every client gets a dedicated SEO manager and transparent reporting.",
  },
  {
    q: "Do you work with international businesses?",
    a: "Yes! We serve clients in USA, UK, Canada, Australia, India, and globally. Our strategies are tailored to each market.",
  },
]
