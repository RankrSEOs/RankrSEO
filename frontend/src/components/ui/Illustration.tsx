import { cn } from "@/lib/utils"

const illustrations = {
  "seo-dashboard": {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="20" y="30" width="360" height="200" rx="12" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="40" y="50" width="120" height="16" rx="4" fill="currentColor" className="text-primary-300 dark:text-primary-700" />
        <rect x="40" y="74" width="200" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="40" y="90" width="180" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="40" y="114" width="320" height="80" rx="8" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <rect x="56" y="130" width="60" height="48" rx="6" fill="currentColor" className="text-accent-400 dark:text-accent-600" />
        <rect x="130" y="140" width="40" height="38" rx="6" fill="currentColor" className="text-primary-400 dark:text-primary-500" />
        <rect x="184" y="124" width="50" height="54" rx="6" fill="currentColor" className="text-accent-500 dark:text-accent-400" />
        <rect x="248" y="146" width="30" height="32" rx="6" fill="currentColor" className="text-primary-300 dark:text-primary-600" />
        <rect x="292" y="134" width="45" height="44" rx="6" fill="currentColor" className="text-accent-300 dark:text-accent-500" />
        <circle cx="300" cy="180" r="4" fill="currentColor" className="text-accent-500" />
        <path d="M296 176 L300 172 L308 180" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent-600" />
        <rect x="40" y="210" width="100" height="6" rx="3" fill="currentColor" className="text-neutral-300 dark:text-neutral-600" />
        <rect x="40" y="250" width="240" height="30" rx="8" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <circle cx="62" cy="265" r="6" fill="currentColor" className="text-primary-500" />
        <rect x="76" y="258" width="80" height="6" rx="3" fill="currentColor" className="text-neutral-300 dark:text-neutral-600" />
        <rect x="76" y="268" width="50" height="4" rx="2" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="170" y="258" width="60" height="6" rx="3" fill="currentColor" className="text-accent-400" />
        <rect x="170" y="268" width="40" height="4" rx="2" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
      </g>
    ),
  },
  "seo-audit": {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <circle cx="200" cy="140" r="80" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <circle cx="200" cy="140" r="60" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <circle cx="200" cy="140" r="40" fill="currentColor" className="text-primary-200 dark:text-primary-800/40" />
        <circle cx="200" cy="140" r="20" fill="currentColor" className="text-primary-500" />
        <text x="200" y="146" fontFamily="'Poppins',sans-serif" fontSize="14" fontWeight="800" fill="white" textAnchor="middle">R</text>
        <rect x="40" y="240" width="320" height="40" rx="8" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="56" y="252" width="80" height="6" rx="3" fill="currentColor" className="text-primary-400" />
        <rect x="148" y="252" width="60" height="6" rx="3" fill="currentColor" className="text-accent-400" />
        <rect x="220" y="252" width="100" height="6" rx="3" fill="currentColor" className="text-neutral-300 dark:text-neutral-600" />
        <rect x="60" y="50" width="120" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="60" y="64" width="90" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="250" y="50" width="90" height="24" rx="6" fill="currentColor" className="text-accent-400/20" />
        <text x="295" y="65" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="600" fill="currentColor" textAnchor="middle" className="text-accent-600">AUDIT</text>
        <circle cx="100" cy="110" r="6" fill="currentColor" className="text-accent-500" />
        <circle cx="130" cy="120" r="8" fill="currentColor" className="text-primary-400" />
        <circle cx="160" cy="108" r="5" fill="currentColor" className="text-accent-400" />
      </g>
    ),
  },
  "keyword-research": {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="40" y="40" width="320" height="44" rx="10" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <circle cx="64" cy="62" r="6" fill="currentColor" className="text-primary-300" />
        <rect x="80" y="56" width="60" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="80" y="66" width="40" height="4" rx="2" fill="currentColor" className="text-neutral-300 dark:text-neutral-600" />
        <rect x="160" y="58" width="80" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="260" y="58" width="60" height="8" rx="4" fill="currentColor" className="text-accent-200 dark:text-accent-800/40" />
        <rect x="40" y="100" width="320" height="44" rx="10" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <circle cx="64" cy="122" r="6" fill="currentColor" className="text-primary-300" />
        <rect x="80" y="116" width="80" height="6" rx="3" fill="currentColor" className="text-accent-500" />
        <rect x="80" y="126" width="50" height="4" rx="2" fill="currentColor" className="text-neutral-300 dark:text-neutral-600" />
        <rect x="180" y="118" width="60" height="8" rx="4" fill="currentColor" className="text-primary-200 dark:text-primary-800/40" />
        <rect x="260" y="118" width="60" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="40" y="160" width="320" height="44" rx="10" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <circle cx="64" cy="182" r="6" fill="currentColor" className="text-primary-300" />
        <rect x="80" y="176" width="100" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="80" y="186" width="60" height="4" rx="2" fill="currentColor" className="text-neutral-300 dark:text-neutral-600" />
        <rect x="200" y="178" width="40" height="8" rx="4" fill="currentColor" className="text-accent-300 dark:text-accent-700" />
        <rect x="260" y="178" width="60" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="40" y="220" width="320" height="44" rx="10" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <circle cx="64" cy="242" r="6" fill="currentColor" className="text-primary-300" />
        <rect x="80" y="236" width="70" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="80" y="246" width="45" height="4" rx="2" fill="currentColor" className="text-neutral-300 dark:text-neutral-600" />
        <rect x="170" y="238" width="70" height="8" rx="4" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="260" y="238" width="60" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <g transform="translate(310, 68)">
          <rect x="0" y="0" width="24" height="24" rx="6" fill="currentColor" className="text-accent-500" />
          <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    ),
  },
  "link-building": {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <circle cx="200" cy="80" r="30" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <circle cx="200" cy="80" r="18" fill="currentColor" className="text-primary-500" />
        <text x="200" y="86" fontFamily="'Poppins',sans-serif" fontSize="14" fontWeight="800" fill="white" textAnchor="middle">#</text>
        <circle cx="100" cy="160" r="24" fill="currentColor" className="text-accent-100 dark:text-accent-900/30" />
        <circle cx="100" cy="160" r="14" fill="currentColor" className="text-accent-500" />
        <text x="100" y="165" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">1</text>
        <circle cx="300" cy="160" r="24" fill="currentColor" className="text-accent-100 dark:text-accent-900/30" />
        <circle cx="300" cy="160" r="14" fill="currentColor" className="text-accent-500" />
        <text x="300" y="165" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">2</text>
        <circle cx="160" cy="230" r="20" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <circle cx="160" cy="230" r="12" fill="currentColor" className="text-primary-400" />
        <text x="160" y="235" fontFamily="'Poppins',sans-serif" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">3</text>
        <circle cx="240" cy="230" r="20" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <circle cx="240" cy="230" r="12" fill="currentColor" className="text-primary-400" />
        <text x="240" y="235" fontFamily="'Poppins',sans-serif" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">4</text>
        <line x1="125" y1="145" x2="175" y2="95" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="text-primary-300 dark:text-primary-600" />
        <line x1="275" y1="145" x2="225" y2="95" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="text-primary-300 dark:text-primary-600" />
        <line x1="115" y1="140" x2="145" y2="212" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="text-accent-300 dark:text-accent-600" />
        <line x1="285" y1="140" x2="255" y2="212" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="text-accent-300 dark:text-accent-600" />
        <rect x="50" y="50" width="60" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="280" y="40" width="70" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="50" y="62" width="40" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="280" y="52" width="45" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
      </g>
    ),
  },
  "technical-seo": {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="60" y="40" width="280" height="200" rx="12" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <rect x="80" y="60" width="240" height="24" rx="6" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <circle cx="96" cy="72" r="4" fill="currentColor" className="text-primary-500" />
        <circle cx="110" cy="72" r="4" fill="currentColor" className="text-primary-500" />
        <circle cx="124" cy="72" r="4" fill="currentColor" className="text-primary-500" />
        <rect x="80" y="96" width="110" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="80" y="110" width="90" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="80" y="124" width="240" height="60" rx="6" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <rect x="96" y="138" width="100" height="6" rx="3" fill="currentColor" className="text-primary-300 dark:text-primary-600" />
        <rect x="96" y="150" width="80" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="96" y="162" width="60" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="220" y="140" width="80" height="20" rx="6" fill="currentColor" className="text-accent-400" />
        <text x="260" y="153" fontFamily="'Poppins',sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">SCORE 98</text>
        <rect x="80" y="200" width="240" height="24" rx="6" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="96" y="208" width="80" height="8" rx="4" fill="currentColor" className="text-accent-300 dark:text-accent-700" />
        <rect x="186" y="208" width="60" height="8" rx="4" fill="currentColor" className="text-primary-300 dark:text-primary-600" />
        <rect x="256" y="208" width="40" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="310" y="100" width="20" height="40" rx="4" fill="currentColor" className="text-accent-500" />
        <rect x="314" y="104" width="12" height="16" rx="2" fill="white" />
      </g>
    ),
  },
  "local-seo": {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <g transform="translate(180, 80)">
          <path d="M20 20 C20 0 60 0 60 20 C60 40 40 60 40 60 C40 60 20 40 20 20Z" fill="currentColor" className="text-primary-500" />
          <circle cx="40" cy="20" r="8" fill="white" />
        </g>
        <rect x="60" y="150" width="280" height="40" rx="8" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <rect x="80" y="162" width="60" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="150" y="162" width="80" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="260" y="162" width="40" height="6" rx="3" fill="currentColor" className="text-accent-500" />
        <rect x="60" y="200" width="280" height="40" rx="8" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <rect x="80" y="212" width="40" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="130" y="212" width="100" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="260" y="212" width="40" height="6" rx="3" fill="currentColor" className="text-accent-500" />
        <rect x="60" y="250" width="280" height="40" rx="8" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <rect x="80" y="262" width="80" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="170" y="262" width="60" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="260" y="262" width="40" height="6" rx="3" fill="currentColor" className="text-accent-500" />
        <rect x="40" y="150" width="160" height="16" rx="6" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <text x="120" y="161" fontFamily="'Poppins',sans-serif" fontSize="8" fontWeight="700" fill="currentColor" textAnchor="middle" className="text-primary-600">GOOGLE BUSINESS PROFILE</text>
        <circle cx="200" cy="30" r="4" fill="currentColor" className="text-accent-500" />
        <circle cx="220" cy="24" r="3" fill="currentColor" className="text-primary-300" />
        <circle cx="235" cy="32" r="3" fill="currentColor" className="text-primary-300" />
      </g>
    ),
  },
  "content-marketing": {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="50" y="60" width="130" height="160" rx="8" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <rect x="50" y="60" width="130" height="160" rx="8" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <rect x="66" y="80" width="98" height="6" rx="3" fill="currentColor" className="text-primary-400" />
        <rect x="66" y="92" width="80" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="66" y="104" width="98" height="80" rx="4" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="66" y="112" width="80" height="6" rx="3" fill="currentColor" className="text-primary-500" />
        <rect x="66" y="124" width="60" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="66" y="136" width="70" height="6" rx="3" fill="currentColor" className="text-accent-400" />
        <rect x="66" y="148" width="50" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="66" y="194" width="98" height="8" rx="4" fill="currentColor" className="text-accent-400" />
        <rect x="66" y="206" width="60" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="210" y="60" width="130" height="160" rx="8" fill="currentColor" className="text-accent-50 dark:text-accent-900/20" />
        <rect x="226" y="80" width="98" height="6" rx="3" fill="currentColor" className="text-accent-400" />
        <rect x="226" y="92" width="60" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="226" y="104" width="98" height="80" rx="4" fill="currentColor" className="text-accent-100 dark:text-accent-900/30" />
        <rect x="226" y="112" width="80" height="6" rx="3" fill="currentColor" className="text-accent-500" />
        <rect x="226" y="124" width="40" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="226" y="136" width="60" height="6" rx="3" fill="currentColor" className="text-primary-400" />
        <rect x="226" y="148" width="50" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="226" y="194" width="98" height="8" rx="4" fill="currentColor" className="text-primary-500" />
        <rect x="226" y="206" width="40" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <circle cx="200" cy="48" r="14" fill="currentColor" className="text-primary-500" />
        <text x="200" y="53" fontFamily="'Poppins',sans-serif" fontSize="12" fontWeight="800" fill="white" textAnchor="middle">+</text>
        <rect x="160" y="240" width="80" height="24" rx="6" fill="currentColor" className="text-accent-400" />
        <text x="200" y="255" fontFamily="'Poppins',sans-serif" fontSize="9" fontWeight="700" fill="white" textAnchor="middle">PUBLISH</text>
      </g>
    ),
  },
  analytics: {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="30" y="40" width="340" height="200" rx="12" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <rect x="50" y="60" width="120" height="8" rx="4" fill="currentColor" className="text-primary-500" />
        <rect x="180" y="60" width="80" height="8" rx="4" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="50" y="90" width="300" height="100" rx="8" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <rect x="70" y="110" width="30" height="60" rx="4" fill="currentColor" className="text-accent-400" />
        <rect x="112" y="130" width="30" height="40" rx="4" fill="currentColor" className="text-primary-400" />
        <rect x="154" y="100" width="30" height="70" rx="4" fill="currentColor" className="text-accent-500" />
        <rect x="196" y="140" width="30" height="30" rx="4" fill="currentColor" className="text-primary-300" />
        <rect x="238" y="116" width="30" height="54" rx="4" fill="currentColor" className="text-accent-300" />
        <rect x="280" y="105" width="40" height="65" rx="4" fill="currentColor" className="text-primary-500" />
        <line x1="50" y1="195" x2="350" y2="195" stroke="currentColor" strokeWidth="1" className="text-neutral-200 dark:text-neutral-700" />
        <circle cx="330" cy="50" r="8" fill="currentColor" className="text-accent-500" />
        <text x="330" y="53" fontFamily="'Poppins',sans-serif" fontSize="8" fontWeight="700" fill="white" textAnchor="middle">$</text>
        <rect x="50" y="214" width="100" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="50" y="224" width="70" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <circle cx="300" cy="214" r="4" fill="currentColor" className="text-accent-500" />
        <text x="310" y="218" fontFamily="'Poppins',sans-serif" fontSize="8" fontWeight="600" fill="currentColor" className="text-accent-600">+45% ROI</text>
      </g>
    ),
  },
  "web-design": {
    viewBox: "0 0 400 300",
    paths: (
      <g>
        <rect x="50" y="40" width="300" height="200" rx="12" fill="currentColor" className="text-neutral-100 dark:text-neutral-800" />
        <rect x="50" y="40" width="300" height="24" rx="12" fill="currentColor" className="text-primary-500" />
        <circle cx="70" cy="52" r="4" fill="white" opacity="0.7" />
        <circle cx="84" cy="52" r="4" fill="white" opacity="0.7" />
        <circle cx="98" cy="52" r="4" fill="white" opacity="0.7" />
        <rect x="120" y="46" width="60" height="8" rx="4" fill="white" opacity="0.4" />
        <rect x="190" y="46" width="40" height="8" rx="4" fill="white" opacity="0.4" />
        <rect x="240" y="46" width="50" height="8" rx="4" fill="white" opacity="0.4" />
        <rect x="70" y="80" width="130" height="140" rx="6" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <rect x="86" y="96" width="98" height="80" rx="4" fill="currentColor" className="text-primary-100 dark:text-primary-900/30" />
        <rect x="86" y="186" width="60" height="6" rx="3" fill="currentColor" className="text-primary-400" />
        <rect x="86" y="196" width="80" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="220" y="80" width="110" height="64" rx="6" fill="currentColor" className="text-accent-50 dark:text-accent-900/20" />
        <rect x="236" y="94" width="78" height="6" rx="3" fill="currentColor" className="text-accent-400" />
        <rect x="236" y="106" width="60" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="236" y="118" width="40" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="220" y="154" width="110" height="64" rx="6" fill="currentColor" className="text-primary-50 dark:text-primary-900/20" />
        <rect x="236" y="168" width="70" height="6" rx="3" fill="currentColor" className="text-primary-400" />
        <rect x="236" y="180" width="50" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
        <rect x="236" y="192" width="30" height="6" rx="3" fill="currentColor" className="text-neutral-200 dark:text-neutral-700" />
      </g>
    ),
  },
}

export type IllustrationType = keyof typeof illustrations

interface IllustrationProps {
  type: IllustrationType
  className?: string
}

export default function Illustration({ type, className }: IllustrationProps) {
  const illustration = illustrations[type]
  if (!illustration) return null

  return (
    <svg
      viewBox={illustration.viewBox}
      className={cn("w-full h-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {illustration.paths}
    </svg>
  )
}
