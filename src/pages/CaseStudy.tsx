import { Fragment, useEffect, useRef, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/FadeIn";
import ImageSlot from "../components/ImageSlot";
import { projects, type Project, type CaseStudy, type CaseStudyImage, type CaseStudyPanel } from "../data/projects";

const INK = "#35302C";
const BODY = "#5F564F";
const SECONDARY = "#7C736C";
const MUTED = "#9A9089";
const FAINT = "#B0A69E";
const LABEL = "#A2856F";
const HAIRLINE = "rgba(53,48,44,0.08)";
const HAIRLINE_STRONG = "rgba(53,48,44,0.11)";
const CARD = "#FEFCFA";

function Star({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span aria-hidden="true" className={`select-none ${className}`} style={style}>
      ✦
    </span>
  );
}

/* wraps ImageSlot with a hover affordance and opens the lightbox — no-ops for src-less placeholders */
function ClickableImage({
  image,
  className = "",
  onOpen,
}: {
  image: CaseStudyImage;
  className?: string;
  onOpen: (image: CaseStudyImage) => void;
}) {
  if (!image.src) {
    return <ImageSlot image={image} className={className} />;
  }
  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      className="group relative block w-full h-full text-left bg-transparent border-0 p-0 cursor-zoom-in"
      aria-label={`Open larger view: ${image.alt}`}
    >
      <ImageSlot
        image={image}
        className={`${className} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
      />
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "rgba(30,26,23,0.26)" }}
        aria-hidden="true"
      >
        <span
          className="flex items-center justify-center w-11 h-11 rounded-full"
          style={{ background: "rgba(255,255,255,0.94)", color: "#3D372F" }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4" />
          </svg>
        </span>
      </div>
    </button>
  );
}

function Lightbox({ image, onClose }: { image: CaseStudyImage | null; onClose: () => void }) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(20,17,15,0.86)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 flex items-center justify-center w-11 h-11 rounded-full transition-colors"
        style={{ background: "rgba(255,255,255,0.12)", color: "#FBF7F3" }}
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>
      <figure className="max-w-[94vw] max-h-[90vh] flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[80vh] w-auto h-auto rounded-xl object-contain"
        />
        {image.alt && (
          <figcaption className="font-body text-sm text-center max-w-160" style={{ color: "#E4DED8" }}>
            {image.alt}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

/* renders **bold** spans within otherwise plain research-panel copy */
function Emphasis({ text, color }: { text: string; color?: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ color, fontWeight: 600 }}>
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function PanelShell({
  header,
  children,
}: {
  header: { eyebrow: string; title: string; meta?: string[] };
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[26px] sm:rounded-[30px] p-6 sm:p-9 border min-w-0" style={{ background: CARD, borderColor: HAIRLINE, boxShadow: "0 20px 48px -38px rgba(88,63,48,0.4)" }}>
      <div className="flex items-start justify-between gap-6 flex-wrap pb-6 mb-6 border-b" style={{ borderColor: HAIRLINE_STRONG }}>
        <div>
          <div className="font-body text-[11.5px] uppercase tracking-[0.16em]" style={{ color: LABEL }}>{header.eyebrow}</div>
          <div className="font-display text-2xl sm:text-[28px] leading-tight mt-1.5" style={{ color: INK }}>{header.title}</div>
        </div>
        {header.meta && (
          <div className="text-right">
            {header.meta.map((line, i) => (
              <div key={i} className="font-body text-xs leading-relaxed" style={{ color: MUTED }}>{line}</div>
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function CompetitorPanel({
  panel,
  accent,
  tintSoft,
  accentInk,
}: {
  panel: Extract<CaseStudyPanel, { kind: "competitor" }>;
  accent: string;
  tintSoft: string;
  accentInk: string;
}) {
  return (
    <>
      <div className="font-body text-[11.5px] uppercase tracking-[0.16em] mb-3" style={{ color: LABEL }}>{panel.promiseLabel}</div>
      <div className="rounded-2xl p-5" style={{ background: tintSoft }}>
        <div className="font-display text-lg" style={{ color: INK }}>{panel.promise.title}</div>
        <p className="font-body font-light text-sm leading-relaxed mt-2" style={{ color: BODY, textWrap: "pretty" }}>{panel.promise.body}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        {panel.features.map((f, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ background: tintSoft }}>
            <div className="font-body text-sm font-medium" style={{ color: INK }}>{f.title}</div>
            <div className="font-body text-[13px] mt-1" style={{ color: SECONDARY }}>{f.body}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-8 pb-6 mt-6 mb-6 border-b" style={{ borderColor: HAIRLINE_STRONG }}>
        {panel.stats.map((s, i) => (
          <div key={i}>
            <div className="font-display text-2xl" style={{ color: accentInk }}>{s.value}</div>
            <div className="font-body text-xs mt-1" style={{ color: MUTED }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
        <div>
          <div className="font-body text-[11.5px] uppercase tracking-[0.16em] mb-3" style={{ color: LABEL }}>{panel.notesLabel}</div>
          <div className="grid gap-2.5">
            {panel.notes.map((n, i) => (
              <div key={i} className="grid grid-cols-[14px_minmax(0,1fr)] gap-2.5 items-start">
                <span className="font-display" style={{ color: accent }}>+</span>
                <span className="font-body font-light text-[14px] leading-relaxed" style={{ color: "#544B45", textWrap: "pretty" }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-5" style={{ background: tintSoft }}>
          <div className="font-body text-[11px] uppercase tracking-[0.16em] mb-2" style={{ color: LABEL }}>{panel.conclusionLabel}</div>
          <p className="font-display italic text-[15px] leading-relaxed" style={{ color: "#4A423C", textWrap: "pretty" }}>
            <Emphasis text={panel.conclusion} color={accentInk} />
          </p>
        </div>
      </div>
      {panel.footnote && (
        <div className="font-body text-xs italic mt-6 pt-5 border-t" style={{ color: MUTED, borderColor: HAIRLINE }}>{panel.footnote}</div>
      )}
    </>
  );
}

function AffinityMapPanel({
  panel,
  tintSoft,
  accentSoft,
  accentInk,
}: {
  panel: Extract<CaseStudyPanel, { kind: "affinity-map" }>;
  tintSoft: string;
  accentSoft: string;
  accentInk: string;
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {panel.columns.map((col, ci) => (
          <div key={ci}>
            <div className="font-body text-[11px] uppercase tracking-[0.14em] mb-3 pb-2 border-b" style={{ color: LABEL, borderColor: HAIRLINE_STRONG }}>{col.heading}</div>
            <div className="grid gap-2.5">
              {col.items.map((item, i) =>
                item.type === "cluster" ? (
                  <div key={i} className="rounded-xl p-3.5" style={{ background: col.highlight ? accentSoft : tintSoft }}>
                    <div className="font-body text-[10.5px] uppercase tracking-[0.12em]" style={{ color: accentInk }}>{item.tag}</div>
                    <div className="font-body text-[13.5px] mt-1 leading-snug" style={{ color: INK }}>{item.title}</div>
                  </div>
                ) : (
                  <div key={i} className="rounded-xl p-3.5 border" style={{ borderColor: HAIRLINE, background: CARD }}>
                    <p className="font-display italic text-[13px] leading-snug" style={{ color: SECONDARY }}>&ldquo;{item.text}&rdquo;</p>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-6 mt-6" style={{ background: tintSoft }}>
        <div className="font-accent text-base mb-1.5" style={{ color: accentInk }}>{panel.insightLabel} →</div>
        <p className="font-display italic text-lg leading-relaxed" style={{ color: "#4A423C", textWrap: "pretty" }}>{panel.insight}</p>
      </div>
    </>
  );
}

function PersonasPanel({ panel, tintSoft }: { panel: Extract<CaseStudyPanel, { kind: "personas" }>; tintSoft: string }) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {panel.personas.map((p) => (
          <div key={p.name} className="rounded-2xl p-6" style={{ background: p.swatch }}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-lg shrink-0" style={{ background: p.swatchInk, color: "#FEFCFA" }}>
                {p.initial}
              </div>
              <div>
                <div className="font-display text-xl" style={{ color: INK }}>{p.name}</div>
                <div className="font-body text-[11px] uppercase tracking-[0.14em]" style={{ color: p.swatchInk }}>{p.subtitle}</div>
              </div>
            </div>
            <p className="font-body font-light text-sm leading-relaxed mt-4" style={{ color: BODY, textWrap: "pretty" }}>{p.description}</p>
            <div className="rounded-xl p-4 mt-4 border-l-2" style={{ background: CARD, borderColor: p.swatchInk }}>
              <p className="font-display italic text-[15px] leading-relaxed" style={{ color: "#4A423C", textWrap: "pretty" }}>&ldquo;{p.quote}&rdquo;</p>
            </div>
            <div className="font-body text-[11px] uppercase tracking-[0.15em] mt-5 mb-2" style={{ color: LABEL }}>Behavior today</div>
            <p className="font-body font-light text-[14px] leading-relaxed" style={{ color: "#544B45", textWrap: "pretty" }}>{p.behavior}</p>
            <div className="font-body text-[11px] uppercase tracking-[0.15em] mt-4 mb-2" style={{ color: LABEL }}>Frustrations</div>
            <div className="grid gap-1.5">
              {p.frustrations.map((f, i) => (
                <div key={i} className="grid grid-cols-[10px_minmax(0,1fr)] gap-2 items-start">
                  <span className="font-display" style={{ color: p.swatchInk }}>—</span>
                  <span className="font-body font-light text-[14px] leading-relaxed" style={{ color: "#544B45", textWrap: "pretty" }}>{f}</span>
                </div>
              ))}
            </div>
            <div className="font-body text-[11px] uppercase tracking-[0.15em] mt-4 mb-2" style={{ color: LABEL }}>Wants from Husplanen</div>
            <div className="grid gap-1.5">
              {p.wants.map((w, i) => (
                <div key={i} className="grid grid-cols-[10px_minmax(0,1fr)] gap-2 items-start">
                  <span className="font-display" style={{ color: p.swatchInk }}>—</span>
                  <span className="font-body font-light text-[14px] leading-relaxed" style={{ color: "#544B45", textWrap: "pretty" }}>{w}</span>
                </div>
              ))}
            </div>
            <div className="font-body text-xs mt-5 pt-4 border-t" style={{ color: MUTED, borderColor: "rgba(53,48,44,0.14)" }}>{p.clusterTag}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border overflow-hidden overflow-x-auto" style={{ borderColor: HAIRLINE }}>
        <div className="grid min-w-[560px]" style={{ gridTemplateColumns: `130px repeat(${panel.comparisonColumns.length}, 1fr)` }}>
          <div className="p-3.5 font-body text-[11px] uppercase tracking-[0.14em]" style={{ background: tintSoft, color: LABEL }}>{panel.comparisonLabel}</div>
          {panel.comparisonColumns.map((c, i) => (
            <div key={i} className="p-3.5 font-body text-[11px] uppercase tracking-[0.14em]" style={{ background: tintSoft, color: LABEL }}>{c}</div>
          ))}
          {panel.comparisonRows.map((row, ri) => (
            <Fragment key={ri}>
              <div className="p-3.5 font-display text-base border-t" style={{ borderColor: HAIRLINE, color: INK }}>{row.name}</div>
              {row.values.map((v, vi) => (
                <div key={vi} className="p-3.5 font-body text-[13px] leading-snug border-t" style={{ borderColor: HAIRLINE, color: SECONDARY }}>{v}</div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <p className="font-body font-light text-sm leading-relaxed mt-5" style={{ color: BODY, textWrap: "pretty" }}>{panel.closing}</p>
    </>
  );
}

function ProblemStatementPanel({
  panel,
  accent,
  tintSoft,
  accentInk,
}: {
  panel: Extract<CaseStudyPanel, { kind: "problem-statement" }>;
  accent: string;
  tintSoft: string;
  accentInk: string;
}) {
  return (
    <>
      <div className="rounded-2xl p-6 sm:p-7" style={{ background: tintSoft }}>
        <p className="font-display text-lg sm:text-xl leading-relaxed" style={{ color: INK, textWrap: "pretty" }}>
          <Emphasis text={panel.statement} color={accentInk} />
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <div className="font-body text-[11.5px] uppercase tracking-[0.16em] mb-3" style={{ color: LABEL }}>{panel.failuresLabel}</div>
          <div className="grid gap-2.5">
            {panel.failures.map((f, i) => (
              <div key={i} className="rounded-xl p-3.5 border font-body font-light text-[14px] leading-relaxed" style={{ borderColor: HAIRLINE, color: "#544B45", textWrap: "pretty" }}>{f}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-body text-[11.5px] uppercase tracking-[0.16em] mb-3" style={{ color: LABEL }}>{panel.validatedLabel}</div>
          <div className="grid grid-cols-2 gap-2.5">
            {panel.validated.map((v, i) => (
              <div key={i} className="rounded-xl p-3 font-body text-[13px] leading-snug" style={{ background: tintSoft, color: "#4A423C" }}>{v}</div>
            ))}
          </div>
          {panel.validatedNote && (
            <div className="rounded-xl p-3.5 mt-2.5 border-l-2 font-body text-[13px] leading-relaxed" style={{ borderColor: accent, background: CARD, color: SECONDARY, textWrap: "pretty" }}>{panel.validatedNote}</div>
          )}
        </div>
      </div>
      <div className="mt-7 pt-6 border-t" style={{ borderColor: HAIRLINE_STRONG }}>
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
          <div className="font-body text-[11.5px] uppercase tracking-[0.16em]" style={{ color: LABEL }}>{panel.hmwLabel}</div>
          {panel.hmwNote && <div className="font-accent text-sm" style={{ color: accentInk }}>{panel.hmwNote}</div>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {panel.hmw.map((h) => (
            <div key={h.n} className="rounded-xl p-4 border" style={{ borderColor: HAIRLINE, background: CARD }}>
              <div className="font-display text-sm" style={{ color: accentInk }}>{h.n}</div>
              <p className="font-body font-light text-[14px] leading-relaxed mt-1.5" style={{ color: "#544B45", textWrap: "pretty" }}>{h.question}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ResearchPanel({
  panel,
  accent,
  tintSoft,
  accentSoft,
  accentInk,
}: {
  panel: CaseStudyPanel;
  accent: string;
  tintSoft: string;
  accentSoft: string;
  accentInk: string;
}) {
  return (
    <PanelShell header={panel.header}>
      {panel.kind === "competitor" && <CompetitorPanel panel={panel} accent={accent} tintSoft={tintSoft} accentInk={accentInk} />}
      {panel.kind === "affinity-map" && <AffinityMapPanel panel={panel} tintSoft={tintSoft} accentSoft={accentSoft} accentInk={accentInk} />}
      {panel.kind === "personas" && <PersonasPanel panel={panel} tintSoft={tintSoft} />}
      {panel.kind === "problem-statement" && <ProblemStatementPanel panel={panel} accent={accent} tintSoft={tintSoft} accentInk={accentInk} />}
    </PanelShell>
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
  const [lightboxImage, setLightboxImage] = useState<CaseStudyImage | null>(null);
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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
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
                <ImageSlot image={cs.heroImage} fit="contain" />
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

          <div className="grid gap-7 min-w-0">
            {cs.phases.map((ph) => (
              <FadeIn key={ph.n} className="min-w-0">
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
                    <div className="inline-flex items-center gap-2.5 rounded-full py-2.5 pl-4 pr-5 mt-2 max-w-full" style={{ background: accentSoft }}>
                      <Star style={{ color: accent }} className="text-xs shrink-0" />
                      <span className="font-body text-[13px] whitespace-nowrap shrink-0" style={{ color: accentInk }}>My role in this phase:</span>
                      <span className="font-body text-sm font-medium" style={{ color: accentInk }}>{ph.role}</span>
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
                    {ph.panels ? (
                      <div className="grid gap-6 min-w-0">
                        {ph.panels.map((panel, i) => (
                          <ResearchPanel key={i} panel={panel} accent={accent} tintSoft={tintSoft} accentSoft={accentSoft} accentInk={accentInk} />
                        ))}
                      </div>
                    ) : ph.images ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {ph.images.map((img, i) => (
                          <div key={i} className="relative h-[220px] sm:h-[260px] rounded-[18px] overflow-hidden">
                            <ClickableImage image={img} onOpen={setLightboxImage} />
                          </div>
                        ))}
                      </div>
                    ) : null}
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
                <ClickableImage image={cs.compare.before} className="rounded-2xl" onOpen={setLightboxImage} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="font-body text-xs font-medium tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full text-white" style={{ background: accent }}>After</span>
                <span className="font-body text-sm" style={{ color: MUTED }}>{cs.compare.afterLabel}</span>
              </div>
              <div className="relative h-[280px] sm:h-[380px] rounded-[26px] p-4" style={{ background: tint }}>
                <ClickableImage image={cs.compare.after} className="rounded-2xl" onOpen={setLightboxImage} />
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
                      <ClickableImage image={alt.img} onOpen={setLightboxImage} />
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
          {cs.delivery.prototypeHref && (
            <a
              href={cs.delivery.prototypeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium px-7 py-3.5 rounded-full text-white whitespace-nowrap"
              style={{ background: accent }}
            >
              Open the prototype ↗
            </a>
          )}
        </div>

        <div className="mt-11 rounded-[28px] sm:rounded-[34px] p-5 sm:p-8" style={{ background: tint }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {cs.delivery.screens.map((s, i) => (
              <div key={i}>
                <div className="relative h-[280px] sm:h-[420px] lg:h-[520px] rounded-[20px] overflow-hidden">
                  <ClickableImage image={s} onOpen={setLightboxImage} />
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

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </PageTransition>
  );
}
