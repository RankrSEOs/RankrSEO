import { cn } from "@/lib/utils"

const portfolioImages: Record<string, { viewBox: string; paths: React.ReactNode }> = {
  excompany: {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="40" y="80" width="120" height="180" rx="8" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <rect x="40" y="60" width="120" height="24" rx="8" fill="currentColor" className="text-primary-500" />
        <rect x="56" y="104" width="88" height="12" rx="4" fill="currentColor" className="text-primary-300" />
        <rect x="56" y="126" width="60" height="8" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="56" y="144" width="80" height="8" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="56" y="162" width="40" height="8" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="56" y="190" width="88" height="50" rx="4" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="68" y="202" width="30" height="24" rx="6" fill="currentColor" className="text-primary-500" />
        <rect x="106" y="202" width="26" height="24" rx="6" fill="currentColor" className="text-accent-500" />
        <rect x="180" y="80" width="180" height="60" rx="8" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <rect x="196" y="96" width="60" height="8" rx="4" fill="currentColor" className="text-primary-500" />
        <rect x="196" y="110" width="80" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="196" y="122" width="40" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="180" y="156" width="180" height="60" rx="8" fill="currentColor" className="text-accent-50 dark:text-accent-900/20" />
        <rect x="196" y="172" width="50" height="8" rx="4" fill="currentColor" className="text-accent-500" />
        <rect x="196" y="186" width="70" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="196" y="198" width="30" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="180" y="232" width="180" height="28" rx="8" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="196" y="240" width="30" height="8" rx="4" fill="currentColor" className="text-secondary-300 dark:text-secondary-600" />
        <rect x="236" y="240" width="50" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="296" y="240" width="40" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
      </g>
    ),
  },
  "zubilo-studio": {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <circle cx="140" cy="100" r="60" fill="currentColor" className="text-accent-50 dark:text-accent-900/20" />
        <circle cx="140" cy="100" r="40" fill="currentColor" className="text-accent-100 dark:text-accent-900/30" />
        <circle cx="140" cy="100" r="24" fill="currentColor" className="text-accent-500" />
        <text x="140" y="106" fontFamily="'Poppins',sans-serif" fontSize="16" fontWeight="800" fill="white" textAnchor="middle">Z</text>
        <rect x="220" y="40" width="140" height="40" rx="10" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="220" y="90" width="140" height="40" rx="10" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="220" y="140" width="140" height="40" rx="10" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <circle cx="240" cy="60" r="8" fill="currentColor" className="text-primary-500" />
        <rect x="256" y="56" width="40" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="256" y="68" width="60" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <circle cx="240" cy="110" r="8" fill="currentColor" className="text-accent-500" />
        <rect x="256" y="106" width="60" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="256" y="118" width="40" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <circle cx="240" cy="160" r="8" fill="currentColor" className="text-primary-400" />
        <rect x="256" y="156" width="50" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="256" y="168" width="30" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="120" y="200" width="80" height="24" rx="8" fill="currentColor" className="text-primary-500" />
        <text x="160" y="215" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">DESIGN</text>
        <rect x="220" y="200" width="80" height="24" rx="8" fill="currentColor" className="text-accent-500" />
        <text x="260" y="215" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">BRAND</text>
        <rect x="80" y="240" width="240" height="40" rx="8" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <rect x="100" y="254" width="60" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="170" y="254" width="80" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="260" y="254" width="40" height="6" rx="3" fill="currentColor" className="text-accent-500" />
      </g>
    ),
  },
  scrapco: {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <path
          d="M200 50 C240 50 270 60 290 80 C310 100 315 130 310 160 C305 190 280 210 250 220 L200 260 L150 220 C120 210 95 190 90 160 C85 130 90 100 110 80 C130 60 160 50 200 50Z"
          fill="currentColor"
          className="text-green-50 dark:text-green-900/20"
        />
        <path
          d="M200 70 C230 70 255 80 270 96 C285 112 290 132 285 158 C280 184 260 200 238 208 L200 238 L162 208 C140 200 120 184 115 158 C110 132 115 112 130 96 C145 80 170 70 200 70Z"
          fill="currentColor"
          className="text-green-100 dark:text-green-900/30"
        />
        <path d="M170 130 L200 160 L230 130" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-green-500" />
        <path d="M200 160 L200 220" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-green-500" />
        <path d="M160 250 L240 250" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-green-400" />
        <path d="M136 106 L164 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-green-400" />
        <path d="M264 106 L236 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-green-400" />
        <circle cx="156" cy="102" r="6" fill="currentColor" className="text-green-500" />
        <circle cx="244" cy="102" r="6" fill="currentColor" className="text-green-500" />
        <rect x="120" y="262" width="160" height="24" rx="6" fill="currentColor" className="text-green-500" />
        <text x="200" y="277" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">RECYCLE · REUSE · REDUCE</text>
      </g>
    ),
  },
  ezdry: {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="70" y="50" width="120" height="180" rx="16" fill="currentColor" className="text-blue-50 dark:text-blue-900/20" />
        <rect x="70" y="50" width="120" height="180" rx="16" fill="currentColor" className="text-blue-100 dark:text-blue-900/30" />
        <rect x="86" y="68" width="88" height="140" rx="8" fill="currentColor" className="text-blue-200 dark:text-blue-800/40" />
        <circle cx="130" cy="110" r="14" fill="currentColor" className="text-blue-500" />
        <rect x="115" y="140" width="30" height="4" rx="2" fill="currentColor" className="text-blue-400" />
        <rect x="115" y="150" width="30" height="4" rx="2" fill="currentColor" className="text-blue-400" />
        <rect x="115" y="160" width="30" height="4" rx="2" fill="currentColor" className="text-blue-400" />
        <rect x="115" y="170" width="30" height="4" rx="2" fill="currentColor" className="text-blue-400" />
        <rect x="115" y="180" width="30" height="4" rx="2" fill="currentColor" className="text-blue-400" />
        <rect x="115" y="190" width="30" height="4" rx="2" fill="currentColor" className="text-blue-400" />
        <circle cx="100" cy="220" r="4" fill="currentColor" className="text-blue-400" />
        <circle cx="130" cy="222" r="4" fill="currentColor" className="text-blue-400" />
        <circle cx="160" cy="220" r="4" fill="currentColor" className="text-blue-400" />
        <rect x="220" y="60" width="140" height="80" rx="12" fill="currentColor" className="text-cyan-50 dark:text-cyan-900/20" />
        <circle cx="260" cy="100" r="12" fill="currentColor" className="text-cyan-500" />
        <text x="260" y="105" fontFamily="'Poppins',sans-serif" fontSize="12" fontWeight="800" fill="white" textAnchor="middle">~</text>
        <rect x="240" y="190" width="100" height="40" rx="20" fill="currentColor" className="text-cyan-500" />
        <rect x="244" y="198" width="92" height="24" rx="12" fill="white" opacity="0.3" />
        <rect x="248" y="202" width="60" height="4" rx="2" fill="white" opacity="0.5" />
        <rect x="248" y="210" width="40" height="4" rx="2" fill="white" opacity="0.5" />
        <rect x="240" y="240" width="100" height="40" rx="20" fill="currentColor" className="text-blue-500" />
        <rect x="244" y="248" width="92" height="24" rx="12" fill="white" opacity="0.3" />
        <rect x="248" y="252" width="60" height="4" rx="2" fill="white" opacity="0.5" />
        <rect x="248" y="260" width="40" height="4" rx="2" fill="white" opacity="0.5" />
        <path d="M286 170 L286 190 M280 176 L286 170 L292 176" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500" />
        <path d="M286 110 L286 160" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-cyan-300" />
      </g>
    ),
  },
  pogotunes: {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <circle cx="120" cy="120" r="50" fill="currentColor" className="text-yellow-100 dark:text-yellow-900/30" />
        <circle cx="120" cy="120" r="32" fill="currentColor" className="text-yellow-500" />
        <polygon points="120,98 140,120 120,142 100,120" fill="white" />
        <circle cx="280" cy="90" r="24" fill="currentColor" className="text-yellow-200 dark:text-yellow-800/40" />
        <circle cx="280" cy="90" r="16" fill="currentColor" className="text-orange-500" />
        <circle cx="280" cy="90" r="8" fill="white" opacity="0.3" />
        <circle cx="300" cy="140" r="20" fill="currentColor" className="text-yellow-100 dark:text-yellow-900/30" />
        <circle cx="300" cy="140" r="12" fill="currentColor" className="text-primary-500" />
        <text x="300" y="145" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">♪</text>
        <circle cx="100" cy="200" r="16" fill="currentColor" className="text-yellow-200 dark:text-yellow-800/40" />
        <circle cx="100" cy="200" r="10" fill="currentColor" className="text-accent-500" />
        <circle cx="100" cy="200" r="4" fill="white" />
        <rect x="50" y="240" width="300" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="50" y="252" width="200" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="50" y="264" width="160" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="140" y="40" width="120" height="8" rx="4" fill="currentColor" className="text-primary-500" />
        <rect x="160" y="52" width="80" height="6" rx="3" fill="currentColor" className="text-yellow-400" />
        <rect x="230" y="192" width="90" height="28" rx="14" fill="currentColor" className="text-yellow-500" />
        <text x="275" y="210" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">500+ VIDEOS</text>
      </g>
    ),
  },
  saferaahia: {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <path
          d="M200 30 C240 50 280 50 310 65 C320 75 330 90 335 110 C340 140 330 180 300 210 C270 240 220 260 200 270 C180 260 130 240 100 210 C70 180 60 140 65 110 C70 90 80 75 90 65 C120 50 160 50 200 30Z"
          fill="currentColor"
          className="text-purple-50 dark:text-purple-900/20"
        />
        <path
          d="M200 55 C230 70 260 70 285 82 C294 90 300 102 304 118 C308 142 300 174 276 200 C252 226 210 242 200 250 C190 242 148 226 124 200 C100 174 92 142 96 118 C100 102 106 90 115 82 C140 70 170 70 200 55Z"
          fill="currentColor"
          className="text-purple-200 dark:text-purple-800/40"
        />
        <path
          d="M200 75 C220 85 240 85 258 94 C264 100 268 108 270 120 C272 136 266 162 248 182 C230 202 206 215 200 220 C194 215 170 202 152 182 C134 162 128 136 130 120 C132 108 136 100 142 94 C160 85 180 85 200 75Z"
          fill="currentColor"
          className="text-purple-500"
        />
        <path
          d="M182 140 L196 154 L218 128"
          stroke="white"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="160" y="240" width="80" height="8" rx="4" fill="currentColor" className="text-purple-400" />
        <rect x="140" y="254" width="120" height="8" rx="4" fill="currentColor" className="text-purple-300" />
        <rect x="120" y="268" width="160" height="8" rx="4" fill="currentColor" className="text-pink-400" />
      </g>
    ),
  },
  electrobridge: {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="50" y="60" width="300" height="200" rx="16" fill="currentColor" className="text-blue-50 dark:text-blue-900/20" />
        <rect x="50" y="60" width="300" height="200" rx="16" fill="currentColor" className="text-blue-100 dark:text-blue-900/30" />
        <circle cx="200" cy="130" r="50" fill="currentColor" className="text-blue-200 dark:text-blue-800/40" />
        <circle cx="200" cy="130" r="36" fill="currentColor" className="text-blue-500" />
        <path d="M188 106 L188 124 L176 124 L212 154 L212 136 L224 136 L188 106Z" fill="white" opacity="0.9" />
        <rect x="120" y="210" width="60" height="8" rx="4" fill="currentColor" className="text-blue-400" />
        <rect x="120" y="222" width="80" height="8" rx="4" fill="currentColor" className="text-blue-300" />
        <rect x="120" y="234" width="40" height="8" rx="4" fill="currentColor" className="text-blue-400" />
        <rect x="220" y="210" width="60" height="8" rx="4" fill="currentColor" className="text-blue-400" />
        <rect x="220" y="222" width="80" height="8" rx="4" fill="currentColor" className="text-blue-300" />
        <rect x="220" y="234" width="40" height="8" rx="4" fill="currentColor" className="text-blue-400" />
        <path d="M160 80 L240 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-blue-400" />
        <path d="M180 92 L220 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-blue-300" />
        <rect x="280" y="100" width="50" height="50" rx="8" fill="currentColor" className="text-accent-500" />
        <path d="M300 116 L300 134 M291 125 L309 125" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <rect x="70" y="100" width="50" height="50" rx="8" fill="currentColor" className="text-primary-500" />
        <path d="M82 130 L108 130" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <circle cx="95" cy="115" r="4" fill="white" opacity="0.8" />
        <circle cx="95" cy="145" r="4" fill="white" opacity="0.8" />
      </g>
    ),
  },
  rankrseo: {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="40" y="80" width="140" height="180" rx="12" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <rect x="40" y="60" width="140" height="24" rx="12" fill="currentColor" className="text-primary-500" />
        <circle cx="60" cy="72" r="4" fill="white" opacity="0.6" />
        <circle cx="74" cy="72" r="4" fill="white" opacity="0.6" />
        <circle cx="88" cy="72" r="4" fill="white" opacity="0.6" />
        <rect x="56" y="100" width="108" height="8" rx="4" fill="currentColor" className="text-primary-300" />
        <rect x="56" y="116" width="80" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="56" y="140" width="108" height="60" rx="8" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="72" y="156" width="30" height="30" rx="4" fill="currentColor" className="text-accent-500" />
        <rect x="112" y="148" width="20" height="38" rx="4" fill="currentColor" className="text-primary-500" />
        <rect x="140" y="166" width="12" height="20" rx="4" fill="currentColor" className="text-accent-300" />
        <rect x="56" y="218" width="108" height="24" rx="6" fill="currentColor" className="text-accent-100 dark:text-accent-900/30" />
        <rect x="72" y="226" width="40" height="8" rx="4" fill="currentColor" className="text-accent-500" />
        <rect x="122" y="226" width="28" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="220" y="100" width="140" height="40" rx="10" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <circle cx="240" cy="120" r="8" fill="currentColor" className="text-primary-500" />
        <text x="240" y="124" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="800" fill="white" textAnchor="middle">G</text>
        <rect x="256" y="114" width="50" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="256" y="124" width="70" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="220" y="156" width="140" height="40" rx="10" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <circle cx="240" cy="176" r="8" fill="currentColor" className="text-accent-500" />
        <text x="240" y="180" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="800" fill="white" textAnchor="middle">#</text>
        <rect x="256" y="170" width="60" height="6" rx="3" fill="currentColor" className="text-accent-500" />
        <rect x="256" y="180" width="40" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="220" y="212" width="140" height="40" rx="10" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <circle cx="240" cy="232" r="8" fill="currentColor" className="text-primary-400" />
        <text x="240" y="236" fontFamily="'Poppins',sans-serif" fontSize="8" fontWeight="800" fill="white" textAnchor="middle">/</text>
        <rect x="256" y="226" width="40" height="6" rx="3" fill="currentColor" className="text-primary-400" />
        <rect x="256" y="236" width="50" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="300" y="74" width="60" height="24" rx="8" fill="currentColor" className="text-accent-500" />
        <text x="330" y="89" fontFamily="'Poppins',sans-serif" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">#1</text>
      </g>
    ),
  },
}

type PortfolioId = keyof typeof portfolioImages

interface PortfolioImageProps {
  id: string
  className?: string
}

export default function PortfolioImage({ id, className }: PortfolioImageProps) {
  const image = portfolioImages[id as PortfolioId]
  if (!image) return null

  return (
    <svg
      viewBox={image.viewBox}
      className={cn("w-full h-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {image.paths}
    </svg>
  )
}
