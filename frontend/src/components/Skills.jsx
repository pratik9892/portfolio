import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function Skills({ skills, coreSkills }) {
  return (
    <section id="skills" className="section bg-zinc-50/70 dark:bg-zinc-900/20">
      <div className="container-page">
        <SectionHeader
          index="02"
          eyebrow="Toolkit"
          title="Skills"
          lede="The stack I reach for first, and everything else I've shipped with."
        />
        {coreSkills?.length > 0 && (
          <Reveal className="mb-14">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Core stack</h3>
            <ul className="flex flex-wrap gap-3">
              {coreSkills.map((item) => (
                <li
                  key={item}
                  className="cursor-default rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-[15px] font-medium text-zinc-900 shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-indigo-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={(i % 3) * 80} className="card p-6">
              <dt className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{s.group}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <span key={item} className="badge">
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
