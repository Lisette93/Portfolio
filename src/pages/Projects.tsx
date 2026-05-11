import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import WaveDivider from '../components/WaveDivider'
import FadeIn from '../components/FadeIn'
import { projects, type Project } from '../data/projects'

/* decorative soft SVG blob used as card background accent */
function BlobAccent({ color, className = '' }: { color: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 220 180"
      className={`absolute pointer-events-none opacity-30 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100,20 C140,10 190,30 200,80 C210,130 170,160 120,165 C70,170 20,145 10,100 C0,55 60,30 100,20 Z"
        fill={color}
      />
    </svg>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const isLarge = project.size === 'large'

  return (
    <FadeIn delay={index * 0.1} className={isLarge ? 'md:col-span-2' : ''}>
      <motion.article
        style={{ rotate: project.rotation, backgroundColor: project.accentColor }}
        whileHover={{ rotate: '0deg', y: -8, scale: 1.01 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative rounded-4xl overflow-hidden shadow-[0_6px_30px_rgba(44,44,42,0.09)] hover:shadow-[0_16px_50px_rgba(44,44,42,0.16)] transition-shadow group"
      >
        {/* blob accent decoration */}
        <BlobAccent color={project.color} className="w-48 -top-8 -right-8" />
        <BlobAccent color={project.color} className="w-32 -bottom-6 -left-6 rotate-180" />

        {/* top color bar */}
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}88)` }} />

        {/* screenshot preview — only shown when project.image is set */}
        {project.image && (
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
        )}

        <div className={`relative z-10 p-7 md:p-9 ${isLarge ? 'md:flex md:gap-10' : ''}`}>

          {/* ── left / main content ── */}
          <div className={isLarge ? 'md:flex-1' : ''}>
            {/* category badge */}
            <span
              className="font-accent text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4"
              style={{ color: project.color, backgroundColor: project.color + '18', border: `1px solid ${project.color}33` }}
            >
              {project.category}
            </span>

            <h2 className="font-display text-3xl md:text-4xl text-charcoal leading-tight mb-3">
              {project.title}
            </h2>

            <p className="font-body text-charcoal-light text-sm leading-relaxed mb-5">
              {project.shortDesc}
            </p>

            {/* tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="font-body text-xs px-4 py-2 rounded-full bg-cream/70 text-charcoal-light border border-sand/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* links */}
            <div className="flex flex-wrap gap-3">
              {project.links.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-all"
                  style={{
                    backgroundColor: project.color,
                    color: '#FAF7F2',
                  }}
                  onClick={e => link.url === '#' && e.preventDefault()}
                >
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── right: deliverables (large card only) / expanded detail ── */}
          {isLarge && project.deliverables && (
            <AnimatePresence>
              <motion.div
                className="md:w-56 mt-8 md:mt-0 shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <p className="font-accent text-sand-dark text-sm mb-3">deliverables ✦</p>
                <ul className="space-y-1.5">
                  {project.deliverables.map(d => (
                    <li key={d} className="font-body text-xs text-charcoal-light flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* hover overlay: long description */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-20 flex items-end p-7 md:p-9 rounded-4xl"
              style={{ background: `linear-gradient(160deg, ${project.color}cc, ${project.color}ee)` }}
            >
              <div className="w-full">
                <p className="font-body text-cream/90 text-sm leading-relaxed mb-5">{project.longDesc}</p>
                <div className="flex flex-wrap gap-3">
                  {project.links.map(link => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => link.url === '#' && e.preventDefault()}
                      className="font-body text-xs px-5 py-2.5 rounded-full inline-flex items-center gap-2 bg-cream/20 border border-cream/40 text-cream hover:bg-cream/35 transition-colors"
                    >
                      {link.label}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </FadeIn>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'UX PROJECT' | 'FRONTEND PROJECT'>('all')

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section
        className="w-full pt-32 pb-12 px-6 text-center flex flex-col items-center"
        style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #f5e6de 60%, #f5ede4 100%)' }}
      >
        <FadeIn>
          <span className="font-accent text-sand-dark text-xl">things I've made ✦</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl text-charcoal mt-3 leading-tight">
            My Work
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-body text-charcoal-light mt-5 max-w-md mx-auto text-base leading-relaxed">
            UX research, design systems, and frontend builds — each project rooted in
            how people actually use things.
          </p>
        </FadeIn>

        {/* filter tabs */}
        <FadeIn delay={0.3}>
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {(['all', 'UX PROJECT', 'FRONTEND PROJECT'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-body text-sm px-6 py-2.5 rounded-full border transition-all ${
                  filter === f
                    ? 'bg-charcoal text-cream border-charcoal'
                    : 'bg-transparent text-charcoal-light border-charcoal/20 hover:border-sage hover:text-sage'
                }`}
              >
                {f === 'all' ? 'All projects' : f}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── GRID ── */}
      <section className="w-full py-24 flex justify-center">
        <div className="w-full max-w-5xl px-8 md:px-14">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-accent text-sand-dark text-xl">nothing here yet ✦</p>
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
