import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-5 backdrop-blur-md bg-cream/85 border-b border-sand/20">
        <Link to="/" className="font-display text-2xl text-charcoal tracking-wide">
          Lisette<span className="text-sage">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="relative font-body text-sm text-charcoal-light hover:text-charcoal transition-colors pb-1"
            >
              {label}
              {pathname === to && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage rounded-full"
                />
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 px-5 py-2.5 rounded-full bg-sage text-cream text-sm font-body font-medium hover:bg-sage-light transition-colors"
          >
            Say hello ✦
          </Link>
        </nav>

        {/* Mobile: Say hello + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full bg-sage text-cream text-sm font-body font-medium"
          >
            Say hello ✦
          </Link>
          <button
            onClick={() => setOpen(o => !o)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-charcoal transition-all duration-300 ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-5 h-px bg-charcoal transition-all duration-300 ${open ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[69px] left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-b border-sand/20 flex flex-col px-6 py-6 gap-5 md:hidden"
          >
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-charcoal hover:text-sage transition-colors"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
