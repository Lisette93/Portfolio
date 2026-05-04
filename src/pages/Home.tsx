import { Link } from "react-router-dom";
import WaveDivider from "../components/WaveDivider";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/FadeIn";
import { HeroBotanicalLeft, HeroBotanicalRight, FloatingSparkles } from "../components/HeroDecorations";
import FeaturedCarousel from "../components/FeaturedCarousel";
import pastelImg from "../assets/pastel-shimmering-acrylic-brush-stroke.jpg";

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

const whatIDo = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="12" r="6" stroke="#7A9E87" strokeWidth="1.5" />
        <path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#7A9E87" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "UX Design",
    desc: "User-centered thinking from research to high-fidelity prototypes. I design for clarity, empathy, and delight.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="18" rx="3" stroke="#7A9E87" strokeWidth="1.5" />
        <path d="M12 16l-4 3 4 3M20 16l4 3-4 3M17 13l-2 8" stroke="#7A9E87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Frontend Development",
    desc: "React, TypeScript, Tailwind to build interfaces that are both pixel-perfect and technically solid.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l2.5 7.5H26l-6.5 4.7 2.5 7.5L16 19l-6 4.7 2.5-7.5L6 11.5h7.5L16 4z" stroke="#7A9E87" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "AI-Assisted Workflows",
    desc: "Using Claude Code, v0, and other AI tools to sharpen problem-solving and raise the quality bar.",
  },
];

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
          <span className="font-accent text-sand-dark text-xl">welcome to my portfolio ✦</span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[1.05] mt-4 max-w-5xl">
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
            <p>Hi, I'm Lisette!</p>A frontend developer student who loves the
            combination of design and code, and genuinely cares about how things
            feel to use, not just how they look.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              to="/projects"
              className="px-8 py-4 bg-rose text-charcoal rounded-full font-body font-medium text-base hover:bg-sand transition-colors duration-300"
            >
              See my work
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border border-charcoal/30 text-charcoal rounded-full font-body font-medium text-base hover:border-sand hover:text-sand transition-colors duration-300"
            >
              About me
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── WHAT I DO ── */}
      <div
        className="relative w-full"
        style={{ backgroundImage: `url(${pastelImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-cream/30 pointer-events-none z-1" />
        <WaveDivider fill="#FAF7F2" flip wavy height="h-44 md:h-60" className="relative z-10" />
        <section className="relative z-10 w-full -mt-20 md:-mt-28 pt-4 pb-28 flex justify-center">
          <div className="w-full max-w-[72rem] px-8 md:px-14">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="relative inline-block px-8 py-3">
                  <span className="relative font-accent text-sand-dark text-xl">what I do ✦</span>
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
                    <h3 className="font-display text-2xl text-charcoal">{item.title}</h3>
                    <p className="font-body text-sm text-charcoal-light leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── FEATURED PROJECTS ── */}
      <section className="w-full pt-16 pb-40 overflow-hidden" style={{ background: "#FAF7F2" }}>
        <div className="w-full max-w-[72rem] mx-auto px-8 md:px-14">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="font-accent text-sand-dark text-lg">things I've made</span>
              <h2 className="font-display text-5xl md:text-6xl text-charcoal mt-2">Featured work</h2>
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
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
