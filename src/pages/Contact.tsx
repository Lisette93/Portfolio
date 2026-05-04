import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import WaveDivider from '../components/WaveDivider'
import FadeIn from '../components/FadeIn'

function BotanicalLeft() {
  return (
    <svg className="absolute left-8 top-20 w-24 opacity-20 pointer-events-none" viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 120C40 120 40 20 40 8" stroke="#7A9E87" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 78C40 78 14 62 9 40" stroke="#7A9E87" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M40 78C40 78 66 62 71 40" stroke="#7A9E87" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M40 55C40 55 18 42 14 24" stroke="#7A9E87" strokeWidth="1" strokeLinecap="round" />
      <path d="M40 55C40 55 62 42 66 24" stroke="#7A9E87" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="40" cy="8" rx="9" ry="13" fill="#7A9E87" opacity="0.25" />
    </svg>
  )
}

function BotanicalRight() {
  return (
    <svg className="absolute right-10 top-28 w-20 opacity-20 pointer-events-none rotate-12" viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 120C40 120 40 20 40 8" stroke="#C9A87C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 85C40 85 14 68 9 48" stroke="#C9A87C" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M40 85C40 85 66 68 71 48" stroke="#C9A87C" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="40" cy="8" rx="8" ry="12" fill="#C9A87C" opacity="0.25" />
    </svg>
  )
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    // Replace YOUR_FORM_ID with your Formspree form ID from formspree.io
    const res = await fetch('https://formspree.io/f/mzdoejnq', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })

    if (res.ok) {
      setStatus('success')
      form.reset()
    } else {
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section
        className="w-full pt-32 pb-4 px-6 text-center relative overflow-hidden flex flex-col items-center"
        style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #edf2ef 55%, #f5ede4 100%)' }}
      >
        <BotanicalLeft />
        <BotanicalRight />

        <FadeIn>
          <span className="font-accent text-sand-dark text-xl">don't be a stranger ✦</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl text-charcoal mt-3 leading-tight">
            Let's make something<br /><em className="text-sage-dark">great.</em>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-body text-charcoal-light mt-5 max-w-md mx-auto text-base leading-relaxed">
            Have a project in mind, want to collaborate, or just want to say hi?
            I'd love to hear from you.
          </p>
        </FadeIn>
      </section>

      <WaveDivider fill="#edf2ef" />

      {/* ── FORM + INFO ── */}
      <section className="w-full py-20 flex justify-center">
        <div className="w-full max-w-5xl px-8 md:px-14 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* ── left: info ── */}
          <div className="lg:col-span-2 space-y-5">
            <FadeIn>
              <div className="p-6 rounded-3xl bg-[#e8f0ea]">
                <span className="font-accent text-sage-dark text-base">location</span>
                <p className="font-display text-2xl text-charcoal mt-1">Helsingborg, Sweden</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="p-6 rounded-3xl bg-[#f0ebe3]">
                <span className="font-accent text-sand-dark text-base">email</span>
                <a
                  href="mailto:lisettestorm@hotmail.com"
                  className="font-body text-sm text-charcoal hover:text-sage transition-colors block mt-1"
                >
                  lisettestorm@hotmail.com
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="p-6 rounded-3xl bg-[#f5e8e5]">
                <span className="font-accent text-rose-dark text-base">find me online</span>
                <div className="flex flex-col gap-3 mt-3">
                  <a
                    href="https://www.linkedin.com/in/lisette-storm-ab6744158/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-charcoal-light hover:text-charcoal transition-colors flex items-center gap-2.5"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/Lisette93"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-charcoal-light hover:text-charcoal transition-colors flex items-center gap-2.5"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ── right: form ── */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-3xl bg-[#e8f0ea] text-center"
              >
                <span className="text-4xl text-sage">✦</span>
                <h2 className="font-display text-4xl text-charcoal mt-4">Message sent!</h2>
                <p className="font-body text-charcoal-light mt-3 leading-relaxed">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-charcoal-light mb-2 block tracking-wide uppercase">
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Anna Karlsson"
                      className="w-full px-5 py-3.5 rounded-2xl border border-sand/25 bg-cream font-body text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sage transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-charcoal-light mb-2 block tracking-wide uppercase">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="anna@example.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-sand/25 bg-cream font-body text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sage transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-charcoal-light mb-2 block tracking-wide uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={7}
                    placeholder="Tell me about your project, idea, or anything you'd like to discuss..."
                    className="w-full px-5 py-3.5 rounded-2xl border border-sand/25 bg-cream font-body text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sage transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="font-body text-xs text-rose-dark">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-charcoal text-cream rounded-2xl font-body font-medium text-sm hover:bg-sage transition-colors disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send message ✦'}
                </motion.button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── closing line ── */}
      <div className="relative w-full">
        <WaveDivider fill="#f0ebe3" />
        <section className="w-full bg-[#f0ebe3] py-10 px-6 text-center flex justify-center">
          <FadeIn>
            <p className="font-accent text-sand-dark text-2xl">
              Currently open to UX &amp; frontend opportunities ✦
            </p>
          </FadeIn>
        </section>
        <WaveDivider fill="#f0ebe3" flip className="-mt-1" />
      </div>
    </PageTransition>
  )
}
