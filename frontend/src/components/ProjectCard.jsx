import { ArrowUpRight, GitHub } from './Icons'

// Stands in for a screenshot when a project has no `image`.
function PlaceholderImage({ title, tech }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-50 via-white to-indigo-50/60 px-6 text-center transition-transform duration-700 ease-out group-hover:scale-[1.03] dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950/40"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(113_113_122/0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgb(113_113_122/0.1)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <p className="relative text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        {title.split(' — ')[0]}
      </p>
      <p className="relative font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
        {tech.slice(0, 3).join(' · ')}
      </p>
    </div>
  )
}

export default function ProjectCard({ project, index }) {
  const { title, summary, highlights, tech, repoUrls, liveUrl, stars, image } = project
  const [name, subtitle] = title.split(' — ')

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80">
        {image ? (
          <img
            src={image}
            alt={`Screenshot of ${name}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderImage title={title} tech={tech} />
        )}
        <span className="absolute left-4 top-4 rounded-full border border-zinc-200/80 bg-white/80 px-2.5 py-1 font-mono text-[10px] text-zinc-500 backdrop-blur dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-400">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
            {subtitle && <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>}
          </div>
          {stars > 0 && (
            <span className="shrink-0 font-mono text-xs text-zinc-500" title="GitHub stars">
              ★ {stars}
            </span>
          )}
        </header>
        <p className="mt-4 leading-relaxed">{summary}</p>
        {highlights?.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm">
            {highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>
        <footer className="mt-auto flex flex-wrap items-center gap-2 pt-7">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" className="btn-primary btn-sm">
              Live demo
              <ArrowUpRight className="btn-arrow-up h-3.5 w-3.5" />
            </a>
          )}
          {repoUrls.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="btn-ghost btn-sm">
              <GitHub className="h-3.5 w-3.5" />
              {repoUrls.length > 1 ? r.label : 'Source'}
            </a>
          ))}
        </footer>
      </div>
    </article>
  )
}
