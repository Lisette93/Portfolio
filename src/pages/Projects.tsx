import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import WaveDivider from '../components/WaveDivider'
import FadeIn from '../components/FadeIn'
import ImageSlot from '../components/ImageSlot'
import { projects, type Project } from '../data/projects'

const INK = '#35302C'
const BODY = '#5F564F'
const LABEL = '#9A8B80'
const FAINT = '#B0A69E'

type Filter = 'All' | 'UX' | 'Frontend'

function groupOf(p: Project): 'UX' | 'Frontend' {
  return p.category === 'UX PROJECT' ? 'UX' : 'Frontend'
}

function Star({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={className}>✦</span>
}

function ProjectCard({ project, index, num }: { project: Project; index: number; num: number }) {
  const isUx = project.category === 'UX PROJECT'
  const primaryLink = project.links[0]
  const secondaryLinks = project.links.slice(1)

  return (
    <FadeIn delay={Math.min(index, 5) * 0.06} className={index % 2 === 1 ? 'lg:mt-[60px]' : ''}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.26, ease: 'easeOut' }}
        className="rounded-[4px_4px_26px_26px] overflow-hidden border shadow-[0_20px_44px_-38px_rgba(88,63,48,0.5)] hover:shadow-[0_30px_60px_-44px_rgba(88,63,48,0.55)] transition-shadow"
        style={{ background: '#FEFCFA', borderColor: 'rgba(53,48,44,0.07)' }}
      >
        <div className="h-1 w-full" style={{ background: project.color }} />

        <div className="relative h-64 sm:h-[340px] p-6 sm:p-8 pb-0" style={{ background: project.accentColor }}>
          {project.image ? (
            <div className={`absolute inset-0 p-6 sm:p-8 flex items-end justify-center ${project.imagePad ?? ''}`}>
              <img src={project.image} alt={project.title} className="w-full h-full object-contain object-bottom" />
            </div>
          ) : (
            <div className="absolute inset-0 p-6 sm:p-8">
              <ImageSlot image={{ alt: `${project.title} — screenshot` }} className="rounded-2xl" />
            </div>
          )}
        </div>

        <div className="p-7 sm:p-9">
          <div className="flex items-baseline justify-between gap-5">
            <div className="flex items-baseline gap-3.5">
              <span className="font-display text-base" style={{ color: project.color }}>
                {String(num).padStart(2, '0')}
              </span>
              <span className="font-body text-[11px] uppercase tracking-[0.18em]" style={{ color: LABEL }}>
                {project.category}
              </span>
            </div>
            <span className="font-body text-xs" style={{ color: FAINT }}>{project.year}</span>
          </div>

          <h2 className="font-display font-normal text-3xl sm:text-[38px] leading-tight tracking-[-0.01em] mt-3.5" style={{ color: INK }}>
            {project.title}
          </h2>
          <p className="font-body font-light text-base leading-relaxed mt-3.5" style={{ color: BODY, textWrap: 'pretty' }}>
            {project.shortDesc}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-[13px] font-light px-3.5 py-1.5 rounded-full border whitespace-nowrap"
                style={{ color: '#7C6B5F', borderColor: 'rgba(53,48,44,0.12)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="h-px my-6" style={{ background: 'rgba(53,48,44,0.08)' }} />

          <div className="flex flex-wrap gap-2.5">
            {isUx && (
              <Link
                to={`/projects/${project.id}`}
                className="font-body text-sm font-medium px-5 py-3 rounded-full text-white whitespace-nowrap transition-colors"
                style={{ background: project.color }}
              >
                Read the case study →
              </Link>
            )}
            {primaryLink && (
              <a
                href={primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-body text-sm px-5 py-3 rounded-full whitespace-nowrap border transition-colors ${isUx ? 'font-normal' : 'font-medium text-white'}`}
                style={
                  isUx
                    ? { color: '#6B5A4E', borderColor: 'rgba(53,48,44,0.16)' }
                    : { background: project.color, borderColor: project.color }
                }
              >
                {isUx ? 'View prototype ↗' : primaryLink.label + ' ↗'}
              </a>
            )}
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm font-normal px-5 py-3 rounded-full whitespace-nowrap border transition-colors"
                style={{ color: '#6B5A4E', borderColor: 'rgba(53,48,44,0.16)' }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </motion.article>
    </FadeIn>
  )
}

function PinnedProjectCard({ project }: { project: Project }) {
  const primaryLink = project.links[0]

  return (
    <FadeIn>
      <article
        className="rounded-[4px_4px_26px_26px] overflow-hidden border shadow-[0_20px_44px_-38px_rgba(88,63,48,0.5)]"
        style={{ background: '#FEFCFA', borderColor: 'rgba(53,48,44,0.07)' }}
      >
        <div className="h-1 w-full" style={{ background: project.color }} />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div className="relative h-56 lg:h-auto p-2 lg:p-3" style={{ background: project.accentColor }}>
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
            ) : (
              <ImageSlot image={{ alt: `${project.title} — hi-fi screens or prototype` }} className="rounded-2xl" />
            )}
          </div>

          <div className="p-7 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3 flex-wrap">
              {project.status && (
                <span
                  className="font-body text-[11px] font-medium uppercase tracking-[0.16em] px-4 py-2 rounded-full text-white whitespace-nowrap"
                  style={{ background: project.color }}
                >
                  {project.status}
                </span>
              )}
              {project.stage && (
                <span className="font-body text-[11.5px] uppercase tracking-[0.16em]" style={{ color: LABEL }}>
                  {project.stage}
                </span>
              )}
            </div>

            <h2 className="font-display font-normal text-4xl sm:text-5xl leading-tight tracking-[-0.01em] mt-4" style={{ color: INK }}>
              {project.title}
            </h2>
            <p className="font-body font-light text-base leading-relaxed mt-4 max-w-xl" style={{ color: BODY, textWrap: 'pretty' }}>
              {project.shortDesc}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[13px] font-light px-3.5 py-1.5 rounded-full border whitespace-nowrap"
                  style={{ color: '#7C6B5F', borderColor: 'rgba(53,48,44,0.12)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="h-px my-6" style={{ background: 'rgba(53,48,44,0.08)' }} />

            <div className="flex flex-wrap gap-2.5">
              <Link
                to={`/projects/${project.id}`}
                className="font-body text-sm font-medium px-5 py-3 rounded-full text-white whitespace-nowrap transition-colors"
                style={{ background: project.color }}
              >
                Read the case study →
              </Link>
              {primaryLink && (
                <a
                  href={primaryLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-normal px-5 py-3 rounded-full whitespace-nowrap border transition-colors"
                  style={{ color: '#6B5A4E', borderColor: 'rgba(53,48,44,0.16)' }}
                >
                  {primaryLink.label} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </FadeIn>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')

  const gridPool = projects.filter((p) => !p.status)
  const pinned = projects.filter((p) => p.status)

  const filtered = filter === 'All' ? gridPool : gridPool.filter((p) => groupOf(p) === filter)
  const visiblePinned = filter === 'All' ? pinned : pinned.filter((p) => groupOf(p) === filter)
  const totalShown = filtered.length + visiblePinned.length

  return (
    <PageTransition>
      {/* ── HEADER ── */}
      <section className="w-full pt-32 pb-0 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10 items-end">
            <FadeIn>
              <span className="font-accent text-xl" style={{ color: '#A96C52' }}>selected work <Star /></span>
              <h1 className="font-display font-normal text-6xl sm:text-7xl lg:text-8xl leading-none tracking-[-0.02em] mt-2.5" style={{ color: INK }}>
                Projects
              </h1>
              <p className="font-body font-light text-lg leading-relaxed mt-5 max-w-[560px]" style={{ color: BODY, textWrap: 'pretty' }}>
                UX work and things I've built. Each UX project has a full case study behind it — the process, the decisions, and what I'd do differently.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:pb-2">
              <div className="font-display text-5xl leading-none" style={{ color: '#DCC3B3' }}>
                {String(totalShown).padStart(2, '0')}
              </div>
              <div className="font-body text-xs uppercase tracking-[0.16em] mt-2" style={{ color: '#A2856F' }}>
                projects shown
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="flex items-center gap-2.5 mt-12 pb-7 flex-wrap border-b" style={{ borderColor: 'rgba(53,48,44,0.1)' }}>
              {(['All', 'UX', 'Frontend'] as const).map((f) => {
                const active = f === filter
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="font-body text-sm px-5 py-2.5 rounded-full border whitespace-nowrap transition-colors"
                    style={
                      active
                        ? { fontWeight: 500, color: '#FFFCFA', background: '#AE7159', borderColor: '#AE7159' }
                        : { fontWeight: 300, color: '#6B5A4E', background: 'transparent', borderColor: 'rgba(53,48,44,0.14)' }
                    }
                  >
                    {f === 'All' ? 'All work' : f}
                  </button>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PINNED / CURRENT PROJECT ── */}
      {visiblePinned.length > 0 && (
        <section className="w-full pt-14 px-6">
          <div className="max-w-[1240px] mx-auto grid gap-8">
            {visiblePinned.map((project) => (
              <PinnedProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* ── GRID ── */}
      <section className="w-full pt-14 pb-24 px-6">
        <div className="max-w-[1240px] mx-auto">
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-11 items-start">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} num={i + 1} />
              ))}
            </AnimatePresence>
          </motion.div>

          {totalShown === 0 && (
            <div className="text-center py-20">
              <p className="font-accent text-xl" style={{ color: '#A96C52' }}>nothing here yet ✦</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <div className="relative w-full">
        <WaveDivider fill="#f0ebe3" />
        <section className="w-full bg-[#f0ebe3] py-16 text-center flex flex-col items-center px-8 md:px-14">
          <FadeIn>
            <span className="font-accent text-sand-dark text-xl">let's make something</span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mt-2 mb-6">
              Got a project in mind?
            </h2>
            <Link
              to="/contact"
              className="inline-block px-8 py-3.5 bg-sage text-cream rounded-full font-body font-medium text-sm hover:bg-sage-light transition-colors"
            >
              Get in touch →
            </Link>
          </FadeIn>
        </section>
        <WaveDivider fill="#f0ebe3" flip className="-mt-1" />
      </div>
    </PageTransition>
  )
}
