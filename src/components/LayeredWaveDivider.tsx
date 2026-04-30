interface LayeredWaveDividerProps {
  nextBg?: string
  className?: string
}

export default function LayeredWaveDivider({ nextBg = '#f0ebe3', className = '' }: LayeredWaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height: '420px' }}>
      <svg
        viewBox="0 0 1440 420"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <rect width="1440" height="420" fill="#FAF7F2" />

        {/* Wave 1 — deep sage, spans upper half */}
        <path
          d="M0,80 C200,0 420,160 720,60 C960,-20 1200,140 1440,40 L1440,420 L0,420 Z"
          fill="#7A9E87"
          fillOpacity="0.28"
        />
        {/* Wave 2 — sand/gold, mid-high */}
        <path
          d="M0,40 C280,160 560,20 860,120 C1060,190 1300,60 1440,140 L1440,420 L0,420 Z"
          fill="#C9A87C"
          fillOpacity="0.20"
        />
        {/* Wave 3 — rose, mid */}
        <path
          d="M0,180 C220,80 500,220 800,130 C1020,60 1270,200 1440,90 L1440,420 L0,420 Z"
          fill="#D4897A"
          fillOpacity="0.18"
        />
        {/* Wave 4 — dusty teal, crossing */}
        <path
          d="M0,120 C350,240 660,80 1020,200 C1220,270 1380,140 1440,200 L1440,420 L0,420 Z"
          fill="#8BAAA0"
          fillOpacity="0.20"
        />
        {/* Wave 5 — light sage, lower foreground */}
        <path
          d="M0,260 C260,190 580,290 900,230 C1100,185 1320,270 1440,210 L1440,420 L0,420 Z"
          fill="#a8c4b0"
          fillOpacity="0.28"
        />
        {/* Wave 6 — warm sand, lowest foreground ribbon */}
        <path
          d="M0,330 C320,275 680,350 1000,295 C1200,260 1360,320 1440,285 L1440,420 L0,420 Z"
          fill="#C9A87C"
          fillOpacity="0.16"
        />
        {/* Solid bottom edge — transitions into next section */}
        <path
          d="M0,408 C400,400 900,415 1440,405 L1440,420 L0,420 Z"
          fill={nextBg}
          fillOpacity="1"
        />
      </svg>
    </div>
  )
}
