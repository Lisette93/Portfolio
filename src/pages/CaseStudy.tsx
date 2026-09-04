import { useEffect, useRef, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/FadeIn";
import {
  projects,
  type Project,
  type CaseStudy,
  type CaseStudyImage,
} from "../data/projects";

const INK = "#35302C";
const BODY = "#5F564F";
const SECONDARY = "#7C736C";
const MUTED = "#9A9089";
const FAINT = "#B0A69E";
const LABEL = "#A2856F";
const HAIRLINE = "rgba(53,48,44,0.08)";
const HAIRLINE_STRONG = "rgba(53,48,44,0.11)";
const CARD = "#FEFCFA";

/* empty image placeholder — swap `image.src` for a real asset later */
function ImageSlot({
  image,
  className = "",
}: {
  image: CaseStudyImage;
  className?: string;
}) {
  if (image.src) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`w-full h-full flex items-center justify-center text-center px-5 border border-dashed rounded-[inherit] ${className}`}
      style={{ borderColor: "rgba(53,48,44,0.18)", background: "rgba(255,255,255,0.4)" }}
    >
      <span className="font-body text-xs italic" style={{ color: SECONDARY }}>
        {image.alt}
      </span>
    </div>
  );
}

function Star({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span aria-hidden="true" className={`select-none ${className}`} style={style}>
      ✦
    </span>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.id === slug);

  if (!project || !project.caseStudy) {
    return <Navigate to="/projects" replace />;
  }

  return <CaseStudyContent project={project} caseStudy={project.caseStudy} />;
}

function CaseStudyContent({
  project,
  caseStudy: cs,
}: {
  project: Project;
  caseStudy: CaseStudy;
}) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const d = document.documentElement;
        const max = d.scrollHeight - d.clientHeight;
        const p = max > 0 ? Math.min(100, Math.max(0, (d.scrollTop / max) * 100)) : 0;
        let a = 0;
        document.querySelectorAll("[data-phase-anchor]").forEach((el, i) => {
          if (el.getBoundingClientRect().top <= 200) a = i;
        });
        setProgress(p);
        setActive(a);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const ux = projects.filter((p) => p.category === "UX PROJECT" && p.caseStudy);
  const myIndex = ux.findIndex((p) => p.id === project.id);
  const nextProject = ux[(myIndex + 1) % ux.length];

  const accent = project.color;
  const tint = project.accentColor;
  const { tintSoft, accentSoft, accentInk } = cs;

  return (
    <PageTransition>
      {/* scroll progress, pinned under the fixed site navbar */}
      <div
        className="fixed top-[69px] inset-x-0 z-30 h-[2px]"
        style={{ background: "rgba(53,48,44,0.05)" }}
        aria-hidden="true"
      >
        <div
          className="h-full transition-[width] duration-100 ease-linear"
          style={{ background: accent, width: `${progress}%` }}
        />
      </div>

      {/* ░░ HERO ░░ */}
      <section
        className="relative overflow-hidden pt-28 sm:pt-32"
        style={{ background: `linear-gradient(180deg, #FAF7F2 0%, ${tintSoft} 100%)` }}
      >
        <Star className="hidden lg:block absolute top-24 right-[24%] text-xl" style={{ color: tint }} />
        <Star className="hidden lg:block absolute top-56 right-[9%] text-sm" style={{ color: tint }} />

        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <Link
            to="/projects"
            className="font-body text-sm inline-block"
            style={{ color: MUTED }}
          >
            ← Back to projects
          </Link>

          <FadeIn className="max-w-3xl mt-8">
            <div className="font-accent text-xl sm:text-2xl" style={{ color: accentInk }}>
              {cs.eyebrow} <Star />
            </div>
            <h1 className="font-display font-normal text-5xl sm:text-6xl lg:text-[82px] leading-[1.02] tracking-[-0.015em] mt-3" style={{ color: INK }}>
              {project.title}
            </h1>
            <p className="font-body font-light text-lg lg:text-xl leading-relaxed mt-5 max-w-[660px]" style={{ color: BODY, textWrap: "pretty" }}>
              {cs.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-wrap gap-3.5 mt-8">
            {project.links[0] && (
              <a
                href={project.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm font-medium px-7 py-3.5 rounded-full text-white transition-colors"
                style={{ background: accent }}
              >
                View the prototype ↗
              </a>
            )}
            <a
              href="#delivery"
              className="font-body text-sm px-7 py-3.5 rounded-full border transition-colors"
              style={{ color: accent, borderColor: tint }}
            >
              Skip to the outcome
            </a>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-14">
            <div className="p-5 sm:p-6 rounded-t-[28px] sm:rounded-t-[34px]" style={{ background: tint }}>
              <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[520px] rounded-3xl overflow-hidden">
                <ImageSlot image={cs.heroImage} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ░░ THE SHORT VERSION ░░ */}
      <div style={{ background: tint }}>
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="rounded-b-[28px] sm:rounded-b-[34px] px-6 sm:px-14 pt-10 sm:pt-14 pb-12 sm:pb-16" style={{ background: "#FBF7F3" }}>
            <div className="flex items-baseline gap-3.5 mb-8 flex-wrap">
              <div className="font-body text-[12.5px] uppercase tracking-[0.18em]" style={{ color: LABEL }}>
                The short version
              </div>
              <div className="font-accent text-lg" style={{ color: tint === accent ? accent : "#C09B85" }}>
                if you read nothing else <Star />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
              {cs.summary.map((s) => (
                <div key={s.label} className="sm:px-8 first:sm:pl-0 border-l sm:border-l first:border-l-0" style={{ borderColor: HAIRLINE_STRONG }}>
                  <div className="font-display text-2xl leading-tight" style={{ color: accentInk }}>
                    {s.label}
                  </div>
                  <p className="font-body font-light text-base leading-relaxed mt-3.5" style={{ color: "#544B45", textWrap: "pretty" }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ░░ OVERVIEW + FACT BOX ░░ */}
      <section className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-20 lg:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-12 lg:gap-20 items-start">
          <FadeIn>
            <div className="font-accent text-xl" style={{ color: accentInk }}>
              overview <Star />
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-[42px] leading-tight mt-2" style={{ color: INK }}>
              {cs.overview.heading}
            </h2>
            {cs.overview.body.map((p, i) => (
              <p key={i} className="font-body font-light text-base lg:text-lg leading-relaxed mt-5" style={{ color: BODY, textWrap: "pretty" }}>
                {p}
              </p>
            ))}
            <div className="mt-8 p-7 rounded-[22px]" style={{ background: tintSoft }}>
              <div className="font-body text-[13px] uppercase tracking-[0.14em]" style={{ color: LABEL }}>
                What I owned
              </div>
              <p className="font-display italic text-xl leading-relaxed mt-3" style={{ color: "#4A423C", textWrap: "pretty" }}>
                {cs.overview.contribution}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-[26px] p-8 border" style={{ background: CARD, borderColor: HAIRLINE, boxShadow: "0 18px 40px -28px rgba(88,63,48,0.35)" }}>
              <div className="font-display text-2xl" style={{ color: INK }}>Project facts</div>
              <div className="h-px my-5" style={{ background: HAIRLINE_STRONG }} />
              <div className="grid gap-5">
                {cs.facts.map((f) => (
                  <div key={f.label}>
                    <div className="font-body text-xs uppercase tracking-[0.15em]" style={{ color: LABEL }}>{f.label}</div>
                    <div className="font-body text-base mt-1.5 leading-snug" style={{ color: "#3D372F" }}>{f.value}</div>
                  </div>
                ))}
              </div>
              <div className="h-px my-6" style={{ background: HAIRLINE_STRONG }} />
              <div className="font-body text-xs uppercase tracking-[0.15em] mb-3" style={{ color: LABEL }}>Methods &amp; tools</div>
              <div className="flex flex-wrap gap-2">
                {cs.tools.map((t) => (
                  <span key={t} className="font-body text-[13.5px] px-3.5 py-1.5 rounded-full" style={{ color: "#6B5A4E", background: "#F5EAE3" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ░░ PROCESS ░░ */}
      <section className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-20 lg:pt-28">
        <div className="flex items-baseline gap-4 flex-wrap">
          <h2 className="font-display font-normal text-4xl lg:text-[52px]" style={{ color: INK }}>The process</h2>
          <div className="font-accent text-xl" style={{ color: accentInk }}>step by step <Star /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[212px_minmax(0,1fr)] gap-10 items-start mt-10">
          <nav aria-label="Process phases" className="hidden lg:block lg:sticky lg:top-[120px]">
            <div className="font-body text-[11.5px] uppercase tracking-[0.16em] mb-4" style={{ color: FAINT }}>On this page</div>
            <div className="grid gap-0.5">
              {cs.phases.map((ph, i) => {
                const isActive = i === Math.min(active, cs.phases.length - 1);
                return (
                  <a
                    key={ph.n}
                    href={`#phase-${ph.n}`}
                    aria-current={isActive ? "step" : undefined}
                    className="grid grid-cols-[12px_minmax(0,1fr)] gap-3 items-baseline py-2 text-sm"
                    style={{ fontWeight: isActive ? 500 : 300, color: isActive ? accentInk : MUTED }}
                  >
                    <span className="w-[7px] h-[7px] rounded-full -translate-y-0.5" style={{ background: isActive ? accent : tint }} />
                    <span>{ph.title}</span>
                  </a>
                );
              })}
              <div className="h-px my-3" style={{ background: HAIRLINE_STRONG }} />
              {[
                ["Before / after", "#compare"],
                ["Alternatives", "#alternatives"],
                ["Delivery", "#delivery"],
                ["Reflection", "#reflection"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="py-1.5 pl-6 text-sm font-light" style={{ color: MUTED }}>
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <div className="grid gap-7">
            {cs.phases.map((ph) => (
              <FadeIn key={ph.n}>
                <div
                  id={`phase-${ph.n}`}
                  data-phase-anchor={ph.n}
                  className="rounded-[28px] sm:rounded-[32px] p-7 sm:p-11 border scroll-mt-[110px]"
                  style={{ background: CARD, borderColor: HAIRLINE, boxShadow: "0 24px 60px -44px rgba(88,63,48,0.4)" }}
                >
                  <div className="flex items-start justify-between gap-7 flex-wrap">
                    <div className="max-w-[520px]">
                      <div className="font-display text-4xl leading-none" style={{ color: tint }}>{ph.n}</div>
                      <h3 className="font-display font-normal text-2xl sm:text-3xl leading-tight mt-2" style={{ color: INK }}>{ph.title}</h3>
                      <p className="font-body font-light text-base leading-relaxed mt-3.5" style={{ color: SECONDARY, textWrap: "pretty" }}>{ph.intro}</p>
                    </div>
                    <div className="inline-flex items-center gap-2.5 rounded-full py-2.5 pl-4 pr-5 mt-2" style={{ background: accentSoft }}>
                      <Star style={{ color: accent }} className="text-xs" />
                      <span className="font-body text-[13px] whitespace-nowrap" style={{ color: accentInk }}>My role in this phase:</span>
                      <span className="font-body text-sm font-medium whitespace-nowrap" style={{ color: accentInk }}>{ph.role}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: tint }} />
                        <div className="font-body text-xs uppercase tracking-[0.16em]" style={{ color: LABEL }}>Where things stood</div>
                      </div>
                      <div className="grid gap-3 mt-4">
                        {ph.before.map((item, i) => (
                          <div key={i} className="grid grid-cols-[14px_minmax(0,1fr)] gap-3 items-start">
                            <span className="font-display" style={{ color: tint }}>—</span>
                            <span className="font-body font-light text-[15px] leading-relaxed" style={{ color: "#544B45", textWrap: "pretty" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: tint }} />
                        <div className="font-body text-xs uppercase tracking-[0.16em]" style={{ color: LABEL }}>What we did</div>
                      </div>
                      <div className="grid gap-3 mt-4">
                        {ph.did.map((item, i) => (
                          <div key={i} className="grid grid-cols-[14px_minmax(0,1fr)] gap-3 items-start">
                            <span className="font-display" style={{ color: tint }}>—</span>
                            <span className="font-body font-light text-[15px] leading-relaxed" style={{ color: "#544B45", textWrap: "pretty" }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[22px] p-6 sm:p-7 mt-7" style={{ background: tintSoft }}>
                    <div className="flex items-center gap-2.5">
                      <Star style={{ color: accent }} className="text-xs" />
                      <div className="font-body text-xs uppercase tracking-[0.16em]" style={{ color: "#9A7A64" }}>What we found</div>
                    </div>
                    <div className="flex flex-wrap gap-2.5 mt-4">
                      {ph.found.map((chip) => (
                        <span key={chip} className="font-body text-sm px-4 py-2 rounded-full border" style={{ color: "#6B5040", background: CARD, borderColor: "#E7D3C7" }}>
                          {chip}
                        </span>
                      ))}
                    </div>
                    <p className="font-display italic text-lg leading-relaxed mt-5" style={{ color: "#5A4C43", textWrap: "pretty" }}>{ph.takeaway}</p>
                  </div>

                  <div className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {ph.images.map((img, i) => (
                        <div key={i} className="relative h-[220px] sm:h-[260px] rounded-[18px] overflow-hidden">
                          <ImageSlot image={img} />
                        </div>
                      ))}
                    </div>
                    <div className="font-body text-[13.5px] italic mt-3.5" style={{ color: MUTED }}>{ph.caption}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ░░ BEFORE / AFTER ░░ */}
      {cs.compare && (
        <section id="compare" className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-20 lg:pt-28 scroll-mt-[110px]">
          <FadeIn className="max-w-[660px]">
            <div className="font-accent text-xl" style={{ color: accentInk }}>what changed <Star /></div>
            <h2 className="font-display font-normal text-4xl lg:text-[52px] leading-tight mt-2" style={{ color: INK }}>Before &amp; after testing</h2>
            <p className="font-body font-light text-base lg:text-lg leading-relaxed mt-5" style={{ color: BODY, textWrap: "pretty" }}>{cs.compare.intro}</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-11">
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="font-body text-xs font-medium tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full" style={{ color: "#8F8781", background: "#EFE9E4" }}>Before</span>
                <span className="font-body text-sm" style={{ color: MUTED }}>{cs.compare.beforeLabel}</span>
              </div>
              <div className="relative h-[280px] sm:h-[380px] rounded-[26px] p-4" style={{ background: "#F3EFEB" }}>
                <ImageSlot image={cs.compare.before} className="rounded-2xl" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="font-body text-xs font-medium tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full text-white" style={{ background: accent }}>After</span>
                <span className="font-body text-sm" style={{ color: MUTED }}>{cs.compare.afterLabel}</span>
              </div>
              <div className="relative h-[280px] sm:h-[380px] rounded-[26px] p-4" style={{ background: tint }}>
                <ImageSlot image={cs.compare.after} className="rounded-2xl" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-7">
            {cs.compare.changes.map((c) => (
              <div key={c.label} className="rounded-[22px] p-6 border" style={{ background: CARD, borderColor: HAIRLINE }}>
                <div className="font-body text-xs uppercase tracking-[0.15em]" style={{ color: LABEL }}>{c.label}</div>
                <div className="font-display text-xl mt-2 leading-snug" style={{ color: INK }}>{c.title}</div>
                <p className="font-body font-light text-sm leading-relaxed mt-2.5" style={{ color: "#6B625B", textWrap: "pretty" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ░░ ALTERNATIVES ░░ */}
      {cs.alternatives && (
        <section id="alternatives" className="mt-20 lg:mt-28 py-16 lg:py-24 scroll-mt-20" style={{ background: tintSoft }}>
          <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
            <FadeIn className="max-w-[660px]">
              <div className="font-accent text-xl" style={{ color: accentInk }}>three ways in <Star /></div>
              <h2 className="font-display font-normal text-4xl lg:text-[52px] leading-tight mt-2" style={{ color: INK }}>Directions I weighed against each other</h2>
              <p className="font-body font-light text-base lg:text-lg leading-relaxed mt-5" style={{ color: BODY, textWrap: "pretty" }}>{cs.alternatives.intro}</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-11 items-start">
              {cs.alternatives.options.map((alt) => {
                const badgeStyle =
                  alt.badge === "Chosen"
                    ? { color: "#FFFCFA", background: accent }
                    : alt.badge === "Considered"
                    ? { color: "#8A6A57", background: "#F0DED4" }
                    : { color: "#8F8781", background: "#EFE9E4" };
                return (
                  <div key={alt.label} className="rounded-[26px] p-6 border" style={{ background: CARD, borderColor: HAIRLINE, boxShadow: "0 20px 44px -34px rgba(88,63,48,0.45)" }}>
                    <div className="flex items-center justify-between gap-3 min-h-[30px]">
                      <div className="font-body text-xs uppercase tracking-[0.15em]" style={{ color: LABEL }}>{alt.label}</div>
                      <div className="font-body text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap" style={badgeStyle}>{alt.badge}</div>
                    </div>
                    <div className="relative h-[180px] mt-4 rounded-2xl overflow-hidden">
                      <ImageSlot image={alt.img} />
                    </div>
                    <h4 className="font-display font-normal text-2xl mt-5 leading-tight" style={{ color: INK }}>{alt.title}</h4>
                    <p className="font-body font-light text-[15px] leading-relaxed mt-3" style={{ color: BODY, textWrap: "pretty" }}>{alt.body}</p>
                    <div className="h-px my-4" style={{ background: HAIRLINE }} />
                    <div className="font-body text-xs uppercase tracking-[0.15em]" style={{ color: LABEL }}>Why / why not</div>
                    <p className="font-body font-light text-sm leading-relaxed mt-2.5" style={{ color: "#6B625B", textWrap: "pretty" }}>{alt.why}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 rounded-3xl p-8 sm:p-9 max-w-[820px]" style={{ background: CARD }}>
              <div className="flex items-center gap-2.5">
                <Star style={{ color: accent }} className="text-xs" />
                <div className="font-body text-xs uppercase tracking-[0.16em]" style={{ color: "#9A7A64" }}>My design decision</div>
              </div>
              <p className="font-display text-xl leading-relaxed mt-3.5" style={{ color: "#453D37", textWrap: "pretty" }}>{cs.alternatives.decision}</p>
            </div>
          </div>
        </section>
      )}

      {/* ░░ DELIVERY ░░ */}
      <section id="delivery" className="max-w-[1180px] mx-auto px-6 sm:px-10 pt-20 lg:pt-28 scroll-mt-[110px]">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <FadeIn className="max-w-[660px]">
            <div className="font-accent text-xl" style={{ color: accentInk }}>the result <Star /></div>
            <h2 className="font-display font-normal text-4xl lg:text-[52px] leading-tight mt-2" style={{ color: INK }}>Delivery &amp; prototype</h2>
            <p className="font-body font-light text-base lg:text-lg leading-relaxed mt-5" style={{ color: BODY, textWrap: "pretty" }}>{cs.delivery.intro}</p>
          </FadeIn>
          <a
            href={cs.delivery.prototypeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium px-7 py-3.5 rounded-full text-white whitespace-nowrap"
            style={{ background: accent }}
          >
            Open the prototype ↗
          </a>
        </div>

        <div className="mt-11 rounded-[28px] sm:rounded-[34px] p-5 sm:p-8" style={{ background: tint }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {cs.delivery.screens.map((s, i) => (
              <div key={i}>
                <div className="relative h-[280px] sm:h-[420px] lg:h-[520px] rounded-[20px] overflow-hidden">
                  <ImageSlot image={s} />
                </div>
                <div className="font-body text-sm text-center mt-3.5" style={{ color: accentInk }}>{s.caption}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
          {cs.delivery.deliverables.map((d) => (
            <div key={d.label} className="rounded-[22px] p-6 border" style={{ background: CARD, borderColor: HAIRLINE }}>
              <div className="font-body text-xs uppercase tracking-[0.15em]" style={{ color: LABEL }}>{d.label}</div>
              <div className="font-display text-xl mt-2" style={{ color: INK }}>{d.title}</div>
              <p className="font-body font-light text-sm leading-relaxed mt-2.5" style={{ color: "#6B625B", textWrap: "pretty" }}>{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ░░ OUTCOME & REFLECTION ░░ */}
      <section id="reflection" className="mt-20 lg:mt-28 py-16 lg:py-24 scroll-mt-20" style={{ background: `linear-gradient(180deg, #FBF7F3 0%, ${tintSoft} 100%)` }}>
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <FadeIn className="max-w-[660px]">
            <div className="font-accent text-xl" style={{ color: accentInk }}>honestly <Star /></div>
            <h2 className="font-display font-normal text-4xl lg:text-[52px] leading-tight mt-2" style={{ color: INK }}>Outcome &amp; reflection</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-11">
            {cs.reflections.map((r) => (
              <div key={r.n} className="rounded-3xl p-8 sm:p-9 border" style={{ background: CARD, borderColor: HAIRLINE, boxShadow: "0 20px 44px -36px rgba(88,63,48,0.45)" }}>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg" style={{ color: tint }}>{r.n}</span>
                  <h3 className="font-display font-normal text-2xl leading-tight" style={{ color: INK }}>{r.title}</h3>
                </div>
                <div className="grid gap-3 mt-5">
                  {r.points.map((pt, i) => (
                    <div key={i} className="grid grid-cols-[14px_minmax(0,1fr)] gap-3 items-start">
                      <span className="font-display" style={{ color: tint }}>—</span>
                      <span className="font-body font-light text-[15px] leading-relaxed" style={{ color: "#544B45", textWrap: "pretty" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ░░ FOOTER NAV ░░ */}
      <div className="border-t" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-14 flex items-center justify-between gap-8 flex-wrap">
          <Link to="/projects" className="grid gap-1.5">
            <span className="font-body text-[13px]" style={{ color: MUTED }}>← Back to</span>
            <span className="font-display text-2xl" style={{ color: INK }}>All projects</span>
          </Link>
          <Star className="text-base" style={{ color: "#C9BEB6" }} />
          <Link to={`/projects/${nextProject.id}`} className="grid gap-1.5 text-right">
            <span className="font-body text-[13px]" style={{ color: MUTED }}>Next project →</span>
            <span className="font-display text-2xl" style={{ color: INK }}>{nextProject.title}</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
