import { cn } from "@/lib/utils"

interface BrandMarkProps {
  className?: string
  size?: number
  showText?: boolean
}

export default function BrandMark({ className, size = 40, showText = false }: BrandMarkProps) {
  const rSize = size * 0.28
  const fontSize = size * 0.45
  const textSize = size * 0.35

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brandMarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="22" fill="url(#brandMarkGradient)" />
        <text
          x="50" y="72"
          fontFamily="'Poppins',system-ui,-apple-system,sans-serif"
          fontSize="64" fontWeight="800"
          fill="white"
          textAnchor="middle"
        >
          R
        </text>
      </svg>
      {showText && (
        <span
          className="font-bold tracking-tight text-foreground"
          style={{ fontSize: textSize }}
        >
          RankrSEO
        </span>
      )}
    </div>
  )
}
