import { Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-cream border-t border-sand/20 py-14 flex justify-center">
      <div className="w-full max-w-5xl px-8 md:px-14 flex flex-col items-center justify-center gap-8 text-center">

        {/* wordmark */}
        <Link to="/" className="font-display text-3xl text-charcoal hover:text-sage transition-colors">
          Lisette<span className="text-sage">.</span>
        </Link>

        {/* nav */}
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-body text-sm text-charcoal-light hover:text-charcoal transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* divider */}
        <div className="w-16 h-px bg-sand/40" />

        {/* social icons */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/lisette-storm-ab6744158/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full border border-sand/30 flex items-center justify-center text-charcoal-light hover:text-sage hover:border-sage transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
          <a
            href="https://github.com/Lisette93"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full border border-sand/30 flex items-center justify-center text-charcoal-light hover:text-sage hover:border-sage transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="mailto:lisettestorm@hotmail.com"
            aria-label="Email"
            className="w-10 h-10 rounded-full border border-sand/30 flex items-center justify-center text-charcoal-light hover:text-sage hover:border-sage transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* built-by + stack */}
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-accent text-sand-dark text-xl">designed & built by Lisette ✦</p>
          <p className="font-body text-xs text-charcoal-light tracking-wide">
            React · TypeScript · Tailwind · Framer Motion
          </p>
        </div>

      </div>
    </footer>
  )
}
