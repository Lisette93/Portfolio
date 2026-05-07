import { Link } from "react-router-dom";
import WaveDivider from "../components/WaveDivider";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/FadeIn";
import {
  HeroBotanicalLeft,
  HeroBotanicalRight,
  FloatingSparkles,
} from "../components/HeroDecorations";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { motion } from "framer-motion";
import healthAppImg from "../assets/HealthApp.png";

const whatIDo = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="12" r="6" stroke="#B67963" strokeWidth="1.5" />
        <path
          d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10"
          stroke="#B67963"
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
        <rect x="3" y="5" width="26" height="22" rx="3" stroke="#B67963" strokeWidth="1.5" />
        <path d="M3 11h26" stroke="#B67963" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="8" r="1" fill="#B67963" opacity="0.5" />
        <circle cx="12" cy="8" r="1" fill="#B67963" opacity="0.5" />
        <circle cx="16" cy="8" r="1" fill="#B67963" opacity="0.5" />
        <path d="M10 17l-3 2 3 2" stroke="#B67963" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 17l3 2-3 2" stroke="#B67963" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 15l-4 8" stroke="#B67963" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: "Frontend Development",
    desc: "React, TypeScript, Tailwind to build interfaces that are both pixel-perfect and technically solid.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4l2.5 7.5H26l-6.5 4.7 2.5 7.5L16 19l-6 4.7 2.5-7.5L6 11.5h7.5L16 4z"
          stroke="#B67963"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "AI-Assisted Workflows",
    desc: "Using Claude Code, v0, and other AI tools to work smarter and raise the quality bar.",
  },
];

export default function Home() {
  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center px-6 pt-28 pb-12 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, #f5e6d8 0%, #FAF7F2 55%)",
        }}
      >
        <HeroBotanicalLeft />
        <HeroBotanicalRight />
        <FloatingSparkles />

        <div className="w-full max-w-[72rem] mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <FadeIn delay={0}>
              <span className="font-accent text-sand-dark text-xl">
                Frontend Development · UX Design · Product Thinking ✦
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mt-4 max-w-3xl">
                <span className="block text-charcoal">Design that thinks.</span>
                <em style={{ color: "#B67963" }}>Code that feels.</em>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="font-body text-charcoal-light text-lg md:text-xl mt-6 max-w-xl leading-relaxed">
                I think about the whole picture — the user, the experience, and
                the code that brings it all to life.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-10">
                <Link
                  to="/projects"
                  className="px-8 py-4 text-cream rounded-full font-body font-medium text-base transition-opacity duration-300 hover:opacity-80"
                  style={{ backgroundColor: "#B67963" }}
                >
                  See my work
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 border rounded-full font-body font-medium text-base transition-opacity duration-300 hover:opacity-70"
                  style={{ borderColor: "#B67963", color: "#B67963" }}
                >
                  About me
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right column — floating image */}
          <FadeIn delay={0.2} className="flex justify-center lg:justify-end">
            <motion.img
              src={healthAppImg}
              alt="Health app project preview"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 md:w-72 lg:w-80 xl:w-96 drop-shadow-2xl rounded-3xl"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT I DO ── */}
      <div className="relative w-full">
        <WaveDivider fill="#f0ebe3" />
        <section className="w-full bg-[#f0ebe3] pt-8 pb-28 flex justify-center">
          <div className="w-full max-w-[72rem] px-8 md:px-14">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="font-accent text-sand-dark text-xl">
                  what I do ✦
                </span>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {whatIDo.map((item, i) => {
                const borderColors = ["#B67963b0", "#C9A87Cb0", "#D4897Ab0"];
                return (
                  <FadeIn key={item.title} delay={i * 0.1} className="flex">
                    <div className="flex flex-col items-center text-center gap-5 p-10 pt-12 rounded-3xl bg-cream shadow-[0_4px_24px_rgba(44,44,42,0.10)] hover:shadow-[0_8px_32px_rgba(44,44,42,0.15)] transition-shadow w-full min-h-75 overflow-hidden relative">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: `${borderColors[i]}22` }}
                      >
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
                );
              })}
            </div>
          </div>
        </section>
        <WaveDivider fill="#f0ebe3" flip className="-mt-1" />
      </div>

      {/* ── FEATURED PROJECTS ── */}
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
