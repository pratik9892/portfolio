import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { MapPin } from './Icons'

export default function About({ profile }) {
  const degree = profile.education?.[0]
  const facts = [
    profile.location && { label: 'Based in', value: profile.location },
    degree && { label: 'Education', value: `${degree.title}, ${degree.period.split(/\s*—\s*/).pop()}` },
    profile.coreSkills?.length && { label: 'Focus', value: 'Backend & full-stack JavaScript' },
    profile.availability && { label: 'Status', value: 'Open to opportunities' },
  ].filter(Boolean)

  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionHeader index="03" eyebrow="Background" title="About me" />
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Reveal className="space-y-5 text-base leading-[1.8] sm:text-lg">
            {profile.about.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <dl className="card divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
              {facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 px-6 py-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">{f.label}</dt>
                  <dd className="flex items-center gap-1.5 text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {f.label === 'Based in' && <MapPin className="h-3.5 w-3.5 text-zinc-400" />}
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
