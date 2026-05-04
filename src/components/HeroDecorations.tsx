import { motion } from "framer-motion";

export function HeroBotanicalLeft() {
  return (
    <motion.svg
      className="absolute bottom-0 left-0 w-80 opacity-[0.22] pointer-events-none select-none"
      viewBox="0 0 250 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ originX: "10%", originY: "100%" }}
      animate={{ rotate: [0, 2.8, 0, -2.8, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M15 360 C 30 310 55 265 85 220 C 110 182 128 145 124 105 C 121 75 112 50 105 20"
        stroke="#7A9E87"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M60 275 C 18 255 -2 228 5 200" stroke="#7A9E87" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M80 232 C 38 215 20 188 28 160" stroke="#7A9E87" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M98 188 C 56 170 40 143 50 115" stroke="#7A9E87" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M75 255 C 115 237 130 210 118 184" stroke="#7A9E87" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M88 210 C 130 190 145 162 133 135" stroke="#7A9E87" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M104 168 C 146 148 160 118 148 90" stroke="#7A9E87" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M112 128 C 154 106 164 76 152 48" stroke="#7A9E87" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="5" cy="197" rx="12" ry="17" fill="#7A9E87" opacity="0.35" transform="rotate(-30 5 197)" />
      <ellipse cx="28" cy="157" rx="10" ry="15" fill="#7A9E87" opacity="0.3" transform="rotate(-20 28 157)" />
      <ellipse cx="50" cy="112" rx="9" ry="13" fill="#7A9E87" opacity="0.28" transform="rotate(-12 50 112)" />
      <ellipse cx="118" cy="182" rx="12" ry="17" fill="#7A9E87" opacity="0.3" transform="rotate(22 118 182)" />
      <ellipse cx="133" cy="132" rx="10" ry="15" fill="#7A9E87" opacity="0.28" transform="rotate(28 133 132)" />
      <ellipse cx="148" cy="87" rx="9" ry="13" fill="#7A9E87" opacity="0.25" transform="rotate(32 148 87)" />
      <ellipse cx="152" cy="45" rx="8" ry="12" fill="#7A9E87" opacity="0.22" transform="rotate(35 152 45)" />
      <ellipse cx="105" cy="18" rx="13" ry="18" fill="#7A9E87" opacity="0.25" />
    </motion.svg>
  );
}

export function HeroBotanicalRight() {
  return (
    <motion.svg
      className="absolute top-10 right-0 w-64 opacity-[0.17] pointer-events-none select-none"
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ originX: "85%", originY: "0%" }}
      animate={{ rotate: [0, -3, 0, 3, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    >
      <path d="M170 8 C 155 48 132 88 105 122 C 80 152 58 182 52 220" stroke="#C9A87C" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M138 52 C 95 38 74 15 80 -5" stroke="#C9A87C" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M118 90 C 72 75 52 50 60 25" stroke="#C9A87C" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M90 128 C 44 114 26 88 36 62" stroke="#C9A87C" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M144 68 C 188 52 200 26 190 2" stroke="#C9A87C" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M122 105 C 166 88 178 60 168 34" stroke="#C9A87C" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M96 142 C 140 124 150 96 138 70" stroke="#C9A87C" strokeWidth="1.1" strokeLinecap="round" />
      <ellipse cx="80" cy="-3" rx="10" ry="14" fill="#C9A87C" opacity="0.32" transform="rotate(-22 80 -3)" />
      <ellipse cx="60" cy="27" rx="9" ry="13" fill="#C9A87C" opacity="0.28" transform="rotate(-15 60 27)" />
      <ellipse cx="36" cy="64" rx="9" ry="12" fill="#C9A87C" opacity="0.25" transform="rotate(-8 36 64)" />
      <ellipse cx="190" cy="4" rx="10" ry="14" fill="#C9A87C" opacity="0.28" transform="rotate(18 190 4)" />
      <ellipse cx="168" cy="36" rx="9" ry="13" fill="#C9A87C" opacity="0.25" transform="rotate(22 168 36)" />
      <ellipse cx="138" cy="72" rx="8" ry="12" fill="#C9A87C" opacity="0.22" transform="rotate(28 138 72)" />
      <ellipse cx="52" cy="218" rx="12" ry="16" fill="#C9A87C" opacity="0.25" />
    </motion.svg>
  );
}

const sparkles = [
  { x: "22%", y: "18%", symbol: "✦", color: "#C9A87C", size: 22, opacity: 0.55, duration: 7, delay: 0 },
  { x: "68%", y: "14%", symbol: "✶", color: "#D4897A", size: 14, opacity: 0.45, duration: 9, delay: 1.2 },
  { x: "80%", y: "44%", symbol: "✦", color: "#7A9E87", size: 18, opacity: 0.4, duration: 11, delay: 0.6 },
  { x: "14%", y: "62%", symbol: "✺", color: "#C9A87C", size: 13, opacity: 0.38, duration: 8, delay: 2.0 },
  { x: "55%", y: "72%", symbol: "✦", color: "#D4897A", size: 16, opacity: 0.35, duration: 10, delay: 3.1 },
  { x: "40%", y: "28%", symbol: "✶", color: "#7A9E87", size: 11, opacity: 0.3, duration: 13, delay: 1.8 },
  { x: "88%", y: "70%", symbol: "✦", color: "#C9A87C", size: 12, opacity: 0.32, duration: 9, delay: 4.0 },
];

export function FloatingSparkles() {
  return (
    <>
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: s.x, top: s.y, fontSize: s.size, color: s.color }}
          animate={{ y: [0, -18, 0], opacity: [s.opacity * 0.55, s.opacity, s.opacity * 0.55] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          {s.symbol}
        </motion.span>
      ))}
    </>
  );
}
