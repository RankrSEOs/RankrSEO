import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const siteConfig = {
  name: "RankrSEO",
  tagline: "SEO Agency & Digital Marketing Services",
  description: "RankrSEO is a results-driven digital marketing agency founded by Amit Kumar. We help businesses increase online visibility, generate qualified leads, and grow revenue through SEO, web design, content marketing, and paid advertising.",
  url: "https://rankrseo.com",
  email: "rankrseo@gmail.com",
  phone: "+91-9953732860",
  phoneDisplay: "+91 99537 32860",
  wa: "919953732860",
  address: "Delhi, India",
  foundingYear: "2022",
  founder: "Amit Kumar",
  founderRole: "Founder & CEO",
  founderEmail: "amit@rankrseo.com",
  founderLinkedIn: "https://www.linkedin.com/in/rankrseo/",
}

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100089141288063", icon: "Facebook" },
  { label: "Twitter", href: "https://www.twitter.com/rankrseo", icon: "Twitter" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rankrseo/", icon: "Linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/rankrseo/", icon: "Instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@rankrseo", icon: "Youtube" },
]

export const servicesData = [
  {
    id: "seo",
    title: "SEO Services",
    shortTitle: "SEO",
    description: "Data-driven SEO strategies to boost your organic rankings and drive qualified traffic. On-Page, Off-Page, Technical SEO, and more.",
    outcome: "Rank higher on Google and attract more organic traffic that converts into paying customers.",
    icon: "Search",
    href: "/services/seo",
    features: ["On-Page SEO", "Off-Page SEO", "Technical SEO", "Keyword Research", "Competitor Analysis", "SEO Audit", "SEO Reporting", "Content Optimization"],
  },
  {
    id: "local-seo",
    title: "Local SEO",
    shortTitle: "Local SEO",
    description: "Dominate local search results and attract more customers in your area with proven local SEO strategies.",
    outcome: "Get found by nearby customers actively searching for your products or services.",
    icon: "MapPin",
    href: "/services/local-seo",
    features: ["Google Business Profile Optimization", "Local Citations", "Map Ranking", "Reputation Management", "Local Link Building", "Review Management"],
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    shortTitle: "Technical SEO",
    description: "Optimize your website infrastructure for maximum search engine crawling, indexing, and performance.",
    outcome: "Fix hidden issues that hold your site back and create a perfect foundation for search visibility.",
    icon: "Settings",
    href: "/services/technical-seo",
    features: ["Site Audit", "Core Web Vitals", "Schema Markup", "Site Structure", "Mobile Optimization", "Page Speed Optimization"],
  },
  {
    id: "link-building",
    title: "Link Building",
    shortTitle: "Link Building",
    description: "Build high-quality, authoritative backlinks that boost domain authority and search rankings.",
    outcome: "Strengthen your site's authority and outrank competitors with a powerful backlink profile.",
    icon: "Link",
    href: "/services/link-building",
    features: ["Guest Posting", "Broken Link Building", "Digital PR", "Outreach Campaigns", "Link Reclamation", "Niche Edits"],
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    shortTitle: "Content",
    description: "Create compelling, SEO-optimized content that attracts, engages, and converts your target audience.",
    outcome: "Build a content engine that drives consistent traffic and establishes your brand as an industry authority.",
    icon: "FileText",
    href: "/services/content-marketing",
    features: ["SEO Blog Writing", "Content Strategy", "Website Copywriting", "Product Descriptions", "Service Page Content", "Content Optimization"],
  },
  {
    id: "web-design",
    title: "Web Design & Development",
    shortTitle: "Web Design",
    description: "Beautiful, high-converting websites built on WordPress with SEO-first architecture and modern design.",
    outcome: "Get a stunning, fast-loading website that converts visitors into customers from day one.",
    icon: "Palette",
    href: "/services/web-design",
    features: ["WordPress Development", "Business Websites", "E-Commerce Development", "Landing Pages", "Website Redesign", "Website Maintenance"],
  },
  {
    id: "google-business-profile",
    title: "Google Business Profile",
    shortTitle: "GBP",
    description: "Optimize your GBP listing to appear in local pack, Google Maps, and attract nearby customers.",
    outcome: "Dominate local search results and appear in the coveted local 3-pack on Google.",
    icon: "Building2",
    href: "/services/google-business-profile",
    features: ["Profile Setup & Verification", "Optimization", "Post Management", "Review Strategy", "Insights & Analytics", "Q&A Management"],
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    shortTitle: "SMM",
    description: "Grow your brand on Instagram, Facebook, LinkedIn with strategic social media marketing campaigns.",
    outcome: "Build a loyal community and generate leads through strategic social media presence.",
    icon: "Share2",
    href: "/services/social-media",
    features: ["SMO", "Instagram Marketing", "Facebook Marketing", "LinkedIn Marketing", "Brand Awareness", "Content Creation"],
  },
  {
    id: "ppc",
    title: "PPC Advertising",
    shortTitle: "PPC",
    description: "Targeted paid campaigns that deliver immediate ROI through Google Ads, display, and remarketing.",
    outcome: "Get instant visibility and qualified leads with high-ROI paid advertising campaigns.",
    icon: "BarChart3",
    href: "/services/ppc",
    features: ["Google Ads", "Search Ads", "Display Ads", "Remarketing Campaigns", "Lead Generation Campaigns", "Ad Copy"],
  },
]

export const industriesData = [
  "Small Business", "Local Business", "Startup", "Coach", "Consultant",
  "Agency", "E-Commerce Store", "Healthcare", "Real Estate", "Lawyer",
  "Dentist", "SaaS Company", "Local Service Provider",
]

export const faqData = [
  { q: "How long does SEO take to show results?", a: "SEO is a long-term strategy. Most clients start seeing improvements within 3-6 months, with significant results通常在6-12个月内显现。" },
  { q: "What is the cost of your SEO services?", a: "Our pricing is customized based on your business needs, competition, and goals. Contact us for a free consultation and quote." },
  { q: "Do you guarantee #1 rankings on Google?", a: "No ethical SEO agency can guarantee #1 rankings. We guarantee our efforts and strategies, but search results depend on many factors." },
  { q: "What makes RankrSEO different from other agencies?", a: "We combine data-driven strategies with personalized attention. Every client gets a dedicated SEO manager and transparent reporting." },
  { q: "Do you work with international businesses?", a: "Yes! We serve clients in USA, UK, Canada, Australia, India, and globally. Our strategies are tailored to each market." },
]

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechFlow Solutions",
    content: "RankrSEO transformed our online presence. Within 6 months, our organic traffic grew by 340% and we're now ranking on page 1 for 50+ keywords. Amit and his team are truly exceptional.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder, GreenLeaf Organics",
    content: "Working with RankrSEO was the best investment we made for our business. They built us a stunning website and our leads increased by 280% in the first quarter alone.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, BrickHouse Realty",
    content: "The local SEO expertise at RankrSEO is unmatched. Our Google Business Profile now appears in the top 3 for 20+ local searches, and we've seen a 190% increase in phone calls.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "CTO, DataStream Analytics",
    content: "Amit's technical SEO knowledge is world-class. He identified and fixed critical issues that were holding our site back. Our Core Web Vitals scores went from 45 to 98 in just weeks.",
    rating: 5,
  },
]

export const caseStudies = [
  {
    id: "techflow-seo",
    title: "TechFlow Solutions",
    industry: "B2B SaaS",
    challenge: "TechFlow was struggling with low organic visibility despite having a solid product. They ranked on page 3 for most high-value keywords.",
    solution: "We implemented a comprehensive SEO strategy including technical fixes, content overhaul, and strategic link building.",
    resultTraffic: "+340%",
    resultLeads: "+280%",
    resultRankings: "Page 1 for 50+ keywords",
    timeframe: "6 months",
    metricBefore: 45,
    metricAfter: 98,
  },
  {
    id: "greenleaf-web",
    title: "GreenLeaf Organics",
    industry: "E-Commerce",
    challenge: "GreenLeaf had an outdated website with poor conversion rates and zero organic traffic strategy.",
    solution: "We redesigned their website with SEO-first architecture, optimized product pages, and launched a content marketing strategy.",
    resultTraffic: "+410%",
    resultLeads: "+320%",
    resultRankings: "Page 1 for 30+ product keywords",
    timeframe: "8 months",
    metricBefore: 30,
    metricAfter: 95,
  },
  {
    id: "brickhouse-local",
    title: "BrickHouse Realty",
    industry: "Real Estate",
    challenge: "BrickHouse was invisible in local search results and losing potential clients to competitors with optimized GBP listings.",
    solution: "We optimized their Google Business Profile, built local citations, managed reviews, and created localized content.",
    resultTraffic: "+190%",
    resultLeads: "+250%",
    resultRankings: "Top 3 for 20+ local searches",
    timeframe: "4 months",
    metricBefore: 20,
    metricAfter: 85,
  },
]

export const trustBadges = [
  { name: "Google Partner", description: "Google Partner" },
  { name: "Clutch Top Rated", description: "Top Rated Agency" },
  { name: "Trustpilot 4.9★", description: "Excellent Rating" },
  { name: "ISO Certified", description: "Quality Management" },
]

export const clientLogos = [
  "ExCompany", "Zubilo Studio", "ScrapCo", "EZ Dry", "PogoTunes", "Safe Raahia"
]
