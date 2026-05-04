import { motion } from "framer-motion";
import WaveDivider from "../components/WaveDivider";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/FadeIn";
import liseImg from "../assets/Lisette1.png";

const uxSkills = [
  "User-centered design",
  "UX fundamentals",
  "User research",
  "Problem definition",
  "User flows",
  "Information architecture",
  "Wireframing",
  "Prototyping (Figma)",
  "Usability",
  "Accessibility",
  "Visual hierarchy",
];

const devSkills = [
  "React",
  "React Native",
  "TypeScript",
  "JavaScript",
  "HTML & CSS",
  "Tailwind CSS",
  "WordPress / Elementor",
  "Git & GitHub",
  "REST API",
  "Claude Code",
  "Google Analytics",
  "Expo Router",
];

const backendSkills = ["Node.js", "Express", "MySQL", "JSON", "Postman"];

const timeline = [
  {
    period: "Jan 2025 – Ongoing",
    title: "Frontend Developer",
    place: "Yrkeshögskolan Borås",
    accent: "#7A9E87",
  },
  {
    period: "Jan 2026 – Mar 2026",
    title: "UX Design Intensive Course",
    place: "Continuing Education",
    accent: "#C9A87C",
  },
  {
    period: "2015 – 2016",
    title: "Hudterapeut CIDESCO",
    place: "Kosmetologskolen, Copenhagen",
    accent: "#D4897A",
  },
];

function SkillPill({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      className="font-body text-sm px-5 py-2.5 rounded-full border border-sand/30 text-charcoal bg-cream/80 shadow-sm hover:shadow-md hover:border-sage transition-all"
    >
      {label}
    </motion.span>
  );
}

export default function About() {
  return (
    <PageTransition>
      {/* ── INTRO HERO ── */}
      <section
        className="w-full pt-32 pb-8 px-6 text-center flex flex-col items-center"
        style={{
          background:
            "linear-gradient(160deg, #FAF7F2 0%, #edf2ef 60%, #FAF7F2 100%)",
        }}
      >
        <FadeIn>
          <span className="font-accent text-sand-dark text-xl">
            ...Before I wrote a line of code, I spent a decade reading people.
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl text-charcoal mt-4 leading-tight max-w-3xl mx-auto">
            Hi, I'm Lisette.
            <br />
            <em className="text-sage-dark text-4xl md:text-6xl">Frontend developer. UX thinker.</em>
          </h1>
        </FadeIn>
      </section>

      {/* ── TWO-COL BIO ── */}
      <section className="w-full py-28 flex justify-center">
        <div className="w-full max-w-5xl px-8 md:px-14 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Blob photo placeholder */}
          <FadeIn className="flex justify-center">
            <div className="relative w-72 h-80">
              <svg
                viewBox="0 0 300 340"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="blob-clip">
                    <path d="M140,20 C190,10 260,40 280,100 C300,160 290,230 240,270 C190,310 110,320 60,280 C10,240 0,160 20,100 C40,40 90,30 140,20 Z" />
                  </clipPath>
                </defs>
                {/* blob ram bakom bilden */}
                <path
                  d="M140,20 C190,10 260,40 280,100 C300,160 290,230 240,270 C190,310 110,320 60,280 C10,240 0,160 20,100 C40,40 90,30 140,20 Z"
                  fill="#e8f0ea"
                />
                {/* bild lätt inzoomad så ramen syns runt kanterna */}
                <image
                  href={liseImg}
                  x="12"
                  y="12"
                  width="276"
                  height="316"
                  clipPath="url(#blob-clip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
              {/* floating sparkle */}
              <span className="absolute -top-4 -right-4 text-sand text-3xl">
                ✦
              </span>
              <span className="absolute -bottom-2 -left-4 text-rose text-xl">
                ✶
              </span>
            </div>
          </FadeIn>

          {/* Bio text */}
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <p className="font-body text-charcoal leading-relaxed text-lg">
                I'm a frontend developer in training with a genuine love for UX.
                I think about usability, clarity, and structure in everything I
                build, and I believe both design and code gives me the ability
                to bridge the gap between how something should feel and how it
                actually gets built.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-body text-charcoal-light leading-relaxed">
                Before I wrote a line of code, I spent a decade as a
                self-employed skincare specialist. That world taught me to truly
                listen, read people, and care deeply about the experience you
                deliver. I carry all of that into how I think about UX and
                everything I build.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="font-body text-charcoal-light leading-relaxed">
                I'm actively exploring AI tools like Claude Code and v0 — not to
                skip the learning, but to sharpen how I approach problems and
                raise the quality of my work.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex items-center gap-3 pt-2">
                <span className="font-body text-sm text-charcoal-light">
                  Languages:
                </span>
                {["Swedish (native)", "English", "Danish"].map((lang) => (
                  <span
                    key={lang}
                    className="font-body text-xs px-4 py-1.5 rounded-full bg-sage/10 text-sage-dark border border-sage/20"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <div className="relative w-full">
        <WaveDivider fill="#f0ebe3" />
        <section className="w-full bg-[#f0ebe3] pt-14 pb-28 flex justify-center">
          <div className="w-full max-w-5xl px-8 md:px-14">
            <FadeIn>
              <div className="text-center mb-14">
                <span className="font-accent text-sand-dark text-xl">
                  what I bring to the table
                </span>
                <h2 className="font-display text-5xl text-charcoal mt-2">
                  Skills
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {/* UX & Design */}
              <div>
                <FadeIn>
                  <h3 className="font-display text-3xl text-charcoal mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-sage inline-block" />
                    UX & Design
                  </h3>
                </FadeIn>
                <div className="flex flex-wrap gap-3">
                  {uxSkills.map((skill, i) => (
                    <SkillPill key={skill} label={skill} delay={i * 0.05} />
                  ))}
                </div>
              </div>

              {/* Frontend & Technical */}
              <div>
                <FadeIn>
                  <h3 className="font-display text-3xl text-charcoal mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-sand inline-block" />
                    Frontend & Technical
                  </h3>
                </FadeIn>
                <div className="flex flex-wrap gap-3">
                  {devSkills.map((skill, i) => (
                    <SkillPill key={skill} label={skill} delay={i * 0.05} />
                  ))}
                </div>
              </div>
            </div>

            {/* Backend — full-width strip, centered */}
            <div className="mt-12 pt-10 border-t border-sand/20 text-center">
              <FadeIn>
                <h3 className="font-display text-3xl text-charcoal mb-6 inline-flex items-center gap-3">
                  <span className="w-8 h-px bg-rose inline-block" />
                  Backend
                </h3>
              </FadeIn>
              <div className="flex flex-wrap justify-center gap-3">
                {backendSkills.map((skill, i) => (
                  <SkillPill key={skill} label={skill} delay={i * 0.05} />
                ))}
              </div>
            </div>
          </div>
        </section>
        <WaveDivider fill="#f0ebe3" flip className="-mt-1" />
      </div>

      {/* ── EDUCATION TIMELINE ── */}
      <section className="w-full py-32 flex justify-center">
        <div className="w-full max-w-3xl px-8 md:px-14">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="font-accent text-sand-dark text-xl">
                the journey so far
              </span>
              <h2 className="font-display text-5xl text-charcoal mt-2">
                Education
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-linear-to-b from-sage via-sand to-rose opacity-40" />

            <div className="space-y-10 pl-12">
              {timeline.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.15}>
                  <div className="relative">
                    {/* dot */}
                    <div
                      className="absolute left-[-2.9rem] top-1.5 w-3 h-3 rounded-full border-2 border-cream shadow-sm"
                      style={{ backgroundColor: item.accent }}
                    />
                    <span className="font-body text-xs text-charcoal-light">
                      {item.period}
                    </span>
                    <h3 className="font-display text-2xl text-charcoal mt-0.5">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-charcoal-light mt-0.5">
                      {item.place}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
