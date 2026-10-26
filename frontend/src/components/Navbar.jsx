import { useEffect, useState } from 'react'
import { Moon, Sun } from './Icons'

const getLinks = (hasExperience) => [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: hasExperience ? 'Experience' : 'Education' },
  { href: '#contact', label: 'Contact' },
]

// Tracks which section is in the middle band of the viewport.
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids.join()])
  return active
}

function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
    setDark(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative grid h-9 w-9 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 active:scale-90 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
    >
      <span className={`absolute transition duration-500 ease-out ${dark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`}>
        <Sun />
      </span>
      <span className={`absolute transition duration-500 ease-out ${dark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
        <Moon />
      </span>
    </button>
  )
}

export default function Navbar({ name, hasExperience }) {
  const [open, setOpen] = useState(false)
  const links = getLinks(hasExperience)
  const active = useActiveSection(links.map((l) => l.href.slice(1)))
  const scrolled = useScrolled()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-50 -translate-y-16 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition focus:translate-y-0 dark:bg-white dark:text-zinc-900"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-500 ${
          scrolled || open
            ? 'border-zinc-200/70 bg-white/75 dark:border-zinc-800/70 dark:bg-zinc-950/75'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-900 dark:text-white"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-zinc-900 font-mono text-xs text-white transition-transform duration-300 group-hover:rotate-[-6deg] dark:bg-white dark:text-zinc-900">
              {name
                .split(/\s+/)
                .map((w) => w[0])
                .join('')}
            </span>
            <span>{name}</span>
          </a>
          <div className="flex items-center gap-1">
            <ul className="mr-2 hidden items-center gap-0.5 rounded-full border border-zinc-200/80 bg-white/60 p-1 dark:border-zinc-800/80 dark:bg-zinc-900/40 md:flex">
              {links.map((l) => {
                const isActive = active === l.href.slice(1)
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={`block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition duration-300 ${
                        isActive
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                          : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                )
              })}
            </ul>
            <ThemeToggle />
            <button
              className="grid h-9 w-9 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-100 active:scale-90 dark:text-zinc-300 dark:hover:bg-zinc-800 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 h-[1.5px] w-4 bg-current transition duration-300 ${open ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </nav>
        <div
          id="mobile-menu"
          className={`grid transition-[grid-template-rows] duration-500 ease-out md:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <ul className="container-page overflow-hidden" inert={open ? undefined : ''}>
            {links.map((l, i) => (
              <li
                key={l.href}
                className={`border-t border-zinc-200/70 transition duration-500 ease-out first:border-t-0 dark:border-zinc-800/70 ${
                  open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 text-[15px] font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {l.label}
                  <span className="font-mono text-xs text-zinc-400">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  )
}
