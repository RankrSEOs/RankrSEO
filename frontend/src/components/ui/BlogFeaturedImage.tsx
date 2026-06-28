import { cn } from "@/lib/utils"

interface BlogFeaturedImageProps {
  title: string
  category?: string
  className?: string
}

const categoryGradients: Record<string, string> = {
  seo: "from-primary-600 to-primary-800",
  "local-seo": "from-accent-600 to-accent-800",
  "technical-seo": "from-primary-700 to-neutral-800",
  "link-building": "from-accent-500 to-accent-700",
  "content-marketing": "from-primary-500 to-accent-600",
  "web-design": "from-primary-600 to-accent-500",
  ppc: "from-primary-800 to-primary-600",
  "social-media": "from-accent-700 to-accent-500",
  default: "from-primary-600 to-accent-500",
  ai: "from-primary-700 to-accent-600",
}

const categoryIcons: Record<string, string> = {
  seo: "🔍",
  "local-seo": "📍",
  "technical-seo": "⚙️",
  "link-building": "🔗",
  "content-marketing": "📝",
  "web-design": "🎨",
  ppc: "📊",
  "social-media": "📱",
  default: "📰",
  ai: "🤖",
}

export default function BlogFeaturedImage({ title, category, className }: BlogFeaturedImageProps) {
  const catSlug = category?.toLowerCase().replace(/\s+/g, "-") || "default"
  const gradient = categoryGradients[catSlug] || categoryGradients.default
  const icon = categoryIcons[catSlug] || categoryIcons.default

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-gradient-to-br p-8 flex flex-col justify-end min-h-[220px]", gradient, className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-sm backdrop-blur-sm">
        <span>{icon}</span>
        <span className="font-medium text-white text-xs">{category || "Article"}</span>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <svg width="20" height="20" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="60" rx="12" fill="rgba(255,255,255,0.2)" />
            <text x="30" y="41" fontFamily="'Poppins',sans-serif" fontSize="32" fontWeight="800" fill="white" textAnchor="middle">R</text>
          </svg>
          <span className="text-xs font-medium text-white/70">RankrSEO</span>
        </div>
        <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">{title}</h3>
      </div>
    </div>
  )
}
