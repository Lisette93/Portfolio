import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import WaveDivider from "../components/WaveDivider"; // SVG wave shape used between sections
import pastelImg from "../assets/pastel-shimmering-acrylic-brush-stroke.jpg";
import PageTransition from "../components/PageTransition"; // fade+slide animation that wraps every page
import { projects } from "../data/projects"; // all project data lives in data/projects.ts

function AnimatedHeroBackground() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 70% 35% at 50% 38%, #a8c4b0 0%, #d8eae4 35%, #edf5f2 62%, #FAF7F2 82%)",
      }}
    />
  );
}

// The three service cards shown below the hero — each has an icon, title, and description
const whatIDo = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="12" r="6" stroke="#7A9E87" strokeWidth="1.5" />
        <path
          d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10"
          stroke="#7A9E87"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "UX Design",
    desc: "User-centered thinking from research to high-fidelity prototypes. I design for clarity, empathy, and delight.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
          x="4"
          y="6"
          width="24"
          height="18"
          rx="3"
          stroke="#7A9E87"
          strokeWidth="1.5"
        />
        <path
          d="M12 16l-4 3 4 3M20 16l4 3-4 3M17 13l-2 8"
          stroke="#7A9E87"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Frontend Development",
    desc: "React, TypeScript, Tailwind — building interfaces that are both pixel-perfect and technically solid.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4l2.5 7.5H26l-6.5 4.7 2.5 7.5L16 19l-6 4.7 2.5-7.5L6 11.5h7.5L16 4z"
          stroke="#7A9E87"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "AI-Assisted Workflows",
    desc: "Using Claude Code, v0, and other AI tools to sharpen problem-solving and raise the quality bar.",
  },
];

// FadeIn: reusable wrapper that animates children up into view when they scroll into the viewport.
// Pass delay (in seconds) to stagger multiple elements so they appear one after another.
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Large botanical branch growing from bottom-left corner of the hero — sways gently
function HeroBotanicalLeft() {
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
      <path
        d="M60 275 C 18 255 -2 228 5 200"
        stroke="#7A9E87"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M80 232 C 38 215 20 188 28 160"
        stroke="#7A9E87"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M98 188 C 56 170 40 143 50 115"
        stroke="#7A9E87"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M75 255 C 115 237 130 210 118 184"
        stroke="#7A9E87"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M88 210 C 130 190 145 162 133 135"
        stroke="#7A9E87"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M104 168 C 146 148 160 118 148 90"
        stroke="#7A9E87"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M112 128 C 154 106 164 76 152 48"
        stroke="#7A9E87"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <ellipse
        cx="5"
        cy="197"
        rx="12"
        ry="17"
        fill="#7A9E87"
        opacity="0.35"
        transform="rotate(-30 5 197)"
      />
      <ellipse
        cx="28"
        cy="157"
        rx="10"
        ry="15"
        fill="#7A9E87"
        opacity="0.3"
        transform="rotate(-20 28 157)"
      />
      <ellipse
        cx="50"
        cy="112"
        rx="9"
        ry="13"
        fill="#7A9E87"
        opacity="0.28"
        transform="rotate(-12 50 112)"
      />
      <ellipse
        cx="118"
        cy="182"
        rx="12"
        ry="17"
        fill="#7A9E87"
        opacity="0.3"
        transform="rotate(22 118 182)"
      />
      <ellipse
        cx="133"
        cy="132"
        rx="10"
        ry="15"
        fill="#7A9E87"
        opacity="0.28"
        transform="rotate(28 133 132)"
      />
      <ellipse
        cx="148"
        cy="87"
        rx="9"
        ry="13"
        fill="#7A9E87"
        opacity="0.25"
        transform="rotate(32 148 87)"
      />
      <ellipse
        cx="152"
        cy="45"
        rx="8"
        ry="12"
        fill="#7A9E87"
        opacity="0.22"
        transform="rotate(35 152 45)"
      />
      <ellipse cx="105" cy="18" rx="13" ry="18" fill="#7A9E87" opacity="0.25" />
    </motion.svg>
  );
}

// Delicate botanical draping from top-right corner of the hero — sways gently
function HeroBotanicalRight() {
  return (
    <motion.svg
      className="absolute top-10 right-0 w-64 opacity-[0.17] pointer-events-none select-none"
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ originX: "85%", originY: "0%" }}
      animate={{ rotate: [0, -3, 0, 3, 0] }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5,
      }}
    >
      <path
        d="M170 8 C 155 48 132 88 105 122 C 80 152 58 182 52 220"
        stroke="#C9A87C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M138 52 C 95 38 74 15 80 -5"
        stroke="#C9A87C"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M118 90 C 72 75 52 50 60 25"
        stroke="#C9A87C"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M90 128 C 44 114 26 88 36 62"
        stroke="#C9A87C"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M144 68 C 188 52 200 26 190 2"
        stroke="#C9A87C"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M122 105 C 166 88 178 60 168 34"
        stroke="#C9A87C"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M96 142 C 140 124 150 96 138 70"
        stroke="#C9A87C"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <ellipse
        cx="80"
        cy="-3"
        rx="10"
        ry="14"
        fill="#C9A87C"
        opacity="0.32"
        transform="rotate(-22 80 -3)"
      />
      <ellipse
        cx="60"
        cy="27"
        rx="9"
        ry="13"
        fill="#C9A87C"
        opacity="0.28"
        transform="rotate(-15 60 27)"
      />
      <ellipse
        cx="36"
        cy="64"
        rx="9"
        ry="12"
        fill="#C9A87C"
        opacity="0.25"
        transform="rotate(-8 36 64)"
      />
      <ellipse
        cx="190"
        cy="4"
        rx="10"
        ry="14"
        fill="#C9A87C"
        opacity="0.28"
        transform="rotate(18 190 4)"
      />
      <ellipse
        cx="168"
        cy="36"
        rx="9"
        ry="13"
        fill="#C9A87C"
        opacity="0.25"
        transform="rotate(22 168 36)"
      />
      <ellipse
        cx="138"
        cy="72"
        rx="8"
        ry="12"
        fill="#C9A87C"
        opacity="0.22"
        transform="rotate(28 138 72)"
      />
      <ellipse cx="52" cy="218" rx="12" ry="16" fill="#C9A87C" opacity="0.25" />
    </motion.svg>
  );
}

const sparkles = [
  {
    x: "22%",
    y: "18%",
    symbol: "✦",
    color: "#C9A87C",
    size: 22,
    opacity: 0.55,
    duration: 7,
    delay: 0,
  },
  {
    x: "68%",
    y: "14%",
    symbol: "✶",
    color: "#D4897A",
    size: 14,
    opacity: 0.45,
    duration: 9,
    delay: 1.2,
  },
  {
    x: "80%",
    y: "44%",
    symbol: "✦",
    color: "#7A9E87",
    size: 18,
    opacity: 0.4,
    duration: 11,
    delay: 0.6,
  },
  {
    x: "14%",
    y: "62%",
    symbol: "✺",
    color: "#C9A87C",
    size: 13,
    opacity: 0.38,
    duration: 8,
    delay: 2.0,
  },
  {
    x: "55%",
    y: "72%",
    symbol: "✦",
    color: "#D4897A",
    size: 16,
    opacity: 0.35,
    duration: 10,
    delay: 3.1,
  },
  {
    x: "40%",
    y: "28%",
    symbol: "✶",
    color: "#7A9E87",
    size: 11,
    opacity: 0.3,
    duration: 13,
    delay: 1.8,
  },
  {
    x: "88%",
    y: "70%",
    symbol: "✦",
    color: "#C9A87C",
    size: 12,
    opacity: 0.32,
    duration: 9,
    delay: 4.0,
  },
];

function FloatingSparkles() {
  return (
    <>
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: s.x, top: s.y, fontSize: s.size, color: s.color }}
          animate={{
            y: [0, -18, 0],
            opacity: [s.opacity * 0.55, s.opacity, s.opacity * 0.55],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          {s.symbol}
        </motion.span>
      ))}
    </>
  );
}

const featured = projects.filter((p) => p.featured);

function ArrowButton({
  onClick,
  dir,
}: {
  onClick: () => void;
  dir: "left" | "right";
}) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-full border border-charcoal/15 bg-cream/80 backdrop-blur-sm flex items-center justify-center text-charcoal/60 hover:border-sage hover:text-sage transition-all shadow-sm hover:shadow-md shrink-0"
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      {dir === "left" ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M11 4L6 9l5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M7 4l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const n = featured.length;

  const prev = () => setCurrent((c) => (c - 1 + n) % n);
  const next = () => setCurrent((c) => (c + 1) % n);

  return (
    <>
    <div className="flex items-center justify-center gap-6 px-6">
      <ArrowButton onClick={prev} dir="left" />

      {/* track — clips overflow so side cards fade out */}
      <div className="relative flex-1 max-w-4xl" style={{ height: 480 }}>
        {featured.map((project, idx) => {
          // offset: 0=center, 1=right, -1=left, anything else hidden
          let offset = (idx - current + n) % n;
          if (offset > n / 2) offset -= n;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          return (
            <motion.div
              key={idx}
              animate={{
                x: -160 + offset * 340,
                scale: isCenter ? 1 : 0.82,
                opacity: isVisible ? (isCenter ? 1 : 0.55) : 0,
                zIndex: isCenter ? 10 : isVisible ? 5 : 0,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => {
                if (!isCenter && isVisible) {
                  if (offset < 0) prev();
                  else next();
                }
              }}
              className="absolute top-0 w-80 bg-cream rounded-3xl shadow-[0_4px_24px_rgba(44,44,42,0.09)] overflow-hidden"
              style={{ left: "50%", cursor: isCenter ? "default" : "pointer" }}
            >
              {/* image */}
              {project.image ? (
                <div
                  className="h-44 overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: project.accentColor }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div
                  className="h-44 flex items-center justify-center"
                  style={{ backgroundColor: project.color + "22" }}
                >
                  <div
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: project.color + "55" }}
                  />
                </div>
              )}

              <div className="p-6">
                <span
                  className="font-accent text-sm"
                  style={{ color: project.color }}
                >
                  {project.category}
                </span>
                <h3 className="font-display text-2xl text-charcoal mt-1 mb-2">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-charcoal-light leading-relaxed">
                  {project.shortDesc}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs px-3 py-1.5 rounded-full bg-sand/10 text-charcoal-light border border-sand/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* links — only show on center card */}
                <AnimatePresence>
                  {isCenter && project.links.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-3 mt-5"
                    >
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) =>
                            link.url === "#" && e.preventDefault()
                          }
                          className="font-body text-xs px-5 py-2.5 rounded-full text-cream inline-flex items-center gap-2"
                          style={{ backgroundColor: project.color }}
                        >
                          {link.label}
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <path
                              d="M2 8L8 2M8 2H4M8 2V6"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ArrowButton onClick={next} dir="right" />
    </div>

    {/* pagination dots */}
    <div className="flex items-center justify-center gap-2.5 mt-8">
      {featured.map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrent(i)}
          aria-label={`Visa projekt ${i + 1}`}
          className="transition-all duration-300"
        >
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              backgroundColor: i === current ? '#7d9e8a' : '#C9A87C',
              opacity: i === current ? 1 : 0.4,
            }}
          />
        </button>
      ))}
    </div>
    </>
  );
}

export default function Home() {
  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-36 pb-4 overflow-hidden">
        <AnimatedHeroBackground />

        <HeroBotanicalLeft />
        <HeroBotanicalRight />

        <FloatingSparkles />

        <FadeIn delay={0}>
          <span className="font-accent text-sand-dark text-xl">
            welcome to my portfolio ✦
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[1.05] mt-4 max-w-5xl">
            {/* Pastel shimmer image clipped to the text — colours show through the letters */}
            <span
              style={{
                backgroundImage: `url(${pastelImg})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                display: "block",
              }}
            >
              Design that thinks.
            </span>
            <em className="text-sage-dark">Code that feels.</em>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="font-body text-charcoal-light text-lg md:text-xl mt-6 max-w-xl leading-relaxed">
            Hi, I'm Lisette — a frontend developer student with a passion for
            UX, usability, and building things that feel as good as they look.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              to="/projects"
              className="px-8 py-4 bg-charcoal text-cream rounded-full font-body font-medium text-base hover:bg-sage transition-colors duration-300"
            >
              See my work
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border border-charcoal/30 text-charcoal rounded-full font-body font-medium text-base hover:border-sage hover:text-sage transition-colors duration-300"
            >
              About me
            </Link>
          </div>
        </FadeIn>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-charcoal/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-body text-xs tracking-widest uppercase">scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </section>

      {/* ── WHAT I DO STRIP ──
           Pastel image fills the whole block. Cream waves on top and bottom
           cut into it so the image lives inside the wave shape naturally. */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: `url(${pastelImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Softening overlay over the pastel image */}
        <div className="absolute inset-0 bg-cream/30 pointer-events-none z-1" />
        {/* Top wave: cream fill + flip so cream covers the TOP, pastel peeks below */}
        <WaveDivider
          fill="#FAF7F2"
          flip
          wavy
          height="h-44 md:h-60"
          className="relative z-10"
        />
        <section className="relative z-10 w-full -mt-20 md:-mt-28 pt-4 pb-28 flex justify-center">
          <div className="w-full max-w-[72rem] px-8 md:px-14">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="relative inline-block px-8 py-3">
                  <span className="relative font-accent text-sand-dark text-xl">
                    what I do ✦
                  </span>
                </span>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {whatIDo.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1} className="flex">
                  <div className="flex flex-col items-center text-center gap-5 p-10 pt-14 rounded-3xl bg-cream/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow w-full min-h-75">
                    <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="font-display text-2xl text-charcoal">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── FEATURED PROJECTS — circular carousel ── */}
      <section
        className="w-full pt-16 pb-40 overflow-hidden"
        style={{ background: "#FAF7F2" }}
      >
        <div className="w-full max-w-[72rem] mx-auto px-8 md:px-14">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="font-accent text-sand-dark text-lg">
                things I've made
              </span>
              <h2 className="font-display text-5xl md:text-6xl text-charcoal mt-2">
                Featured work
              </h2>
            </div>
          </FadeIn>
        </div>

        <FeaturedCarousel />

        <FadeIn>
          <div className="text-center mt-20">
            <Link
              to="/projects"
              className="font-body text-sm text-sage hover:text-charcoal transition-colors inline-flex items-center gap-2 group"
            >
              View all projects
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
