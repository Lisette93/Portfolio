import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";

const featured = projects.filter((p) => p.featured);

function ArrowButton({ onClick, dir }: { onClick: () => void; dir: "left" | "right" }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-full border border-charcoal/15 bg-cream/80 backdrop-blur-sm flex items-center justify-center text-charcoal/60 hover:border-sage hover:text-sage transition-all shadow-sm hover:shadow-md shrink-0"
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      {dir === "left" ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const n = featured.length;

  const prev = () => setCurrent((c) => (c - 1 + n) % n);
  const next = () => setCurrent((c) => (c + 1) % n);

  return (
    <>
      <div className="flex items-center justify-center gap-10 px-6">
        <ArrowButton onClick={prev} dir="left" />

        <div className="relative flex-1 max-w-4xl" style={{ height: 520 }}>
          {featured.map((project, idx) => {
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
                {project.image ? (
                  <div className="h-44 overflow-hidden flex items-center justify-center" style={{ backgroundColor: project.accentColor }}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="h-44 flex items-center justify-center" style={{ backgroundColor: project.color + "22" }}>
                    <div className="w-12 h-12 rounded-full" style={{ backgroundColor: project.color + "55" }} />
                  </div>
                )}

                <div className="p-6">
                  <span className="font-accent text-sm" style={{ color: project.color }}>
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl text-charcoal mt-1 mb-2">{project.title}</h3>
                  <p className="font-body text-sm text-charcoal-light leading-relaxed">{project.shortDesc}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-body text-xs px-3 py-1.5 rounded-full bg-sand/10 text-charcoal-light border border-sand/20">
                        {tag}
                      </span>
                    ))}
                  </div>

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
                            onClick={(e) => link.url === "#" && e.preventDefault()}
                            className="font-body text-xs px-5 py-2.5 rounded-full text-cream inline-flex items-center gap-2"
                            style={{ backgroundColor: project.color }}
                          >
                            {link.label}
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

      <div className="flex items-center justify-center gap-2.5 mt-8">
        {featured.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Visa projekt ${i + 1}`} className="transition-all duration-300">
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                backgroundColor: i === current ? "#7d9e8a" : "#C9A87C",
                opacity: i === current ? 1 : 0.4,
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
}
