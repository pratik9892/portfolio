import { useState } from 'react'
import Reveal from './Reveal'
import { ArrowRight, Check, Copy, GitHub, LinkedIn, Mail } from './Icons'

const socialIcons = { GitHub, LinkedIn }

// Contact is mailto + copy-email + socials. No backend form (ADR-0011).
export default function Contact({ profile }) {
  const socials = profile.socials.filter((s) => s.url)
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-50 px-6 py-16 text-center dark:border-zinc-800/80 dark:bg-zinc-900/40 sm:px-12 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/15" />
          </div>
          <p className="eyebrow justify-center">05 · Contact</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Let's build something together.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
            I'm open to new roles and collaborations. If you have an opportunity, a project or just a question, my inbox
            is open.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              <Mail />
              Say hello
              <ArrowRight className="btn-arrow h-4 w-4" />
            </a>
            <button type="button" onClick={copyEmail} className="btn-ghost bg-white/60 font-mono text-[13px] dark:bg-zinc-950/40">
              <span className="relative grid h-4 w-4 place-items-center">
                <Copy className={`absolute h-4 w-4 transition duration-300 ${copied ? 'scale-50 opacity-0' : ''}`} />
                <Check className={`absolute h-4 w-4 text-emerald-500 transition duration-300 ${copied ? '' : 'scale-50 opacity-0'}`} />
              </span>
              <span aria-live="polite">{copied ? 'Copied to clipboard' : profile.email}</span>
            </button>
          </div>
          <ul className="mt-10 flex justify-center gap-2">
            {socials.map((s) => {
              const Icon = socialIcons[s.label]
              return (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-white hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                  >
                    {Icon && <Icon />}
                    {s.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
