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
    description: "Data-driven SEO strategies to boost your organic rankings and drive qualified traffic. On-Page, Off-Page, Technical SEO, and more.",
    icon: "Search",
    href: "/services/seo",
    features: ["On-Page SEO", "Off-Page SEO", "Technical SEO", "Keyword Research", "Competitor Analysis", "SEO Audit", "SEO Reporting", "Content Optimization"],
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "Dominate local search results and attract more customers in your area with proven local SEO strategies.",
    icon: "MapPin",
    href: "/services/local-seo",
    features: ["Google Business Profile Optimization", "Local Citations", "Map Ranking", "Reputation Management", "Local Link Building", "Review Management"],
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    description: "Optimize your website infrastructure for maximum search engine crawling, indexing, and performance.",
    icon: "Settings",
    href: "/services/technical-seo",
    features: ["Site Audit", "Core Web Vitals", "Schema Markup", "Site Structure", "Mobile Optimization", "Page Speed Optimization"],
  },
  {
    id: "link-building",
    title: "Link Building",
    description: "Build high-quality, authoritative backlinks that boost domain authority and search rankings.",
    icon: "Link",
    href: "/services/link-building",
    features: ["Guest Posting", "Broken Link Building", "Digital PR", "Outreach Campaigns", "Link Reclamation", "Niche Edits"],
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    description: "Create compelling, SEO-optimized content that attracts, engages, and converts your target audience.",
    icon: "FileText",
    href: "/services/content-marketing",
    features: ["SEO Blog Writing", "Content Strategy", "Website Copywriting", "Product Descriptions", "Service Page Content", "Content Optimization"],
  },
  {
    id: "web-design",
    title: "Website Design & Development",
    description: "Beautiful, high-converting websites built on WordPress with SEO-first architecture and modern design.",
    icon: "Palette",
    href: "/services/web-design",
    features: ["WordPress Development", "Business Websites", "E-Commerce Development", "Landing Pages", "Website Redesign", "Website Maintenance"],
  },
  {
    id: "google-business-profile",
    title: "Google Business Profile Optimization",
    description: "Optimize your GBP listing to appear in local pack, Google Maps, and attract nearby customers.",
    icon: "Building2",
    href: "/services/google-business-profile",
    features: ["Profile Setup & Verification", "Optimization", "Post Management", "Review Strategy", "Insights & Analytics", "Q&A Management"],
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description: "Grow your brand on Instagram, Facebook, LinkedIn with strategic social media marketing campaigns.",
    icon: "Share2",
    href: "/services/social-media",
    features: ["SMO", "Instagram Marketing", "Facebook Marketing", "LinkedIn Marketing", "Brand Awareness", "Content Creation"],
  },
  {
    id: "ppc",
    title: "PPC Advertising",
    description: "Targeted paid campaigns that deliver immediate ROI through Google Ads, display, and remarketing.",
    icon: "BarChart3",
    href: "/services/ppc",
    features: ["Google Ads", "Search Ads", "Display Ads", "Remarketing Campaigns", "Lead Generation Campaigns", "Ad Copy"],
  },
]

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100089141288063" },
  { label: "Twitter", href: "https://www.twitter.com/rankrseo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rankrseo/" },
  { label: "Instagram", href: "https://www.instagram.com/rankrseo/" },
  { label: "YouTube", href: "https://www.youtube.com/@rankrseo" },
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
