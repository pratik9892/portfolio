import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { ArrowUpRight, Award } from './Icons'

function ColumnHeading({ children }) {
  return <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">{children}</h3>
}

function Timeline({ heading, items }) {
  if (!items?.length) return null
  return (
    <Reveal>
      <ColumnHeading>{heading}</ColumnHeading>
      <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[11px] before:top-6 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800">
        {items.map((item, i) => (
          <li key={i} className="relative flex gap-5">
            <span className="relative z-10 mt-5 grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              <span className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
            </span>
            <div className="flex-1 rounded-xl px-4 py-4 transition-colors duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
              <p className="font-mono text-xs text-zinc-500">{item.period}</p>
              <p className="mt-1.5 font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
              <p className="text-sm">{item.org}</p>
              {item.points?.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

function Certifications({ items }) {
  if (!items?.length) return null
  return (
    <Reveal delay={120}>
      <ColumnHeading>Certifications</ColumnHeading>
      <ul className="space-y-4">
        {items.map((c) => (
          <li key={c.title} className="card card-hover group relative overflow-hidden p-6">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-indigo-500/10" />
            <div className="relative flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-indigo-400">
                <Award />
              </span>
              <div>
                <p className="font-mono text-xs text-zinc-500">
                  {c.issuer} · {c.date}
                </p>
                <p className="mt-1.5 font-semibold leading-snug text-zinc-900 dark:text-zinc-100">{c.title}</p>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition hover:gap-2 dark:text-indigo-400"
                  >
                    View credential
                    <ArrowUpRight />
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function Experience({ experience, education, certifications }) {
  const hasExperience = experience?.length > 0
  const hasCerts = certifications?.length > 0
  const parts = [hasExperience && 'Experience', 'Education', hasCerts && 'Certifications'].filter(Boolean)
  const title = parts.length > 2 ? `${parts.slice(0, -1).join(', ')} & ${parts.at(-1)}` : parts.join(' & ')

  return (
    <section id="experience" className="section bg-zinc-50/70 dark:bg-zinc-900/20">
      <div className="container-page">
        <SectionHeader index="04" eyebrow={hasExperience ? 'Journey' : 'Learning'} title={title} />
        <div className="grid gap-14 md:grid-cols-2 lg:gap-20">
          <Timeline heading="Experience" items={experience} />
          <Timeline heading="Education" items={education} />
          <Certifications items={certifications} />
        </div>
      </div>
    </section>
  )
}
