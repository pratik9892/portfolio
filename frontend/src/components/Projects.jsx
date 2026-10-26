import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import { ArrowUpRight } from './Icons'

function CardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden="true">
      <div className="aspect-[16/10] animate-pulse bg-zinc-100 dark:bg-zinc-900" />
      <div className="space-y-3 p-7">
        <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-3 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
      </div>
    </div>
  )
}

export default function Projects({ data, error, loading, githubUrl }) {
  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionHeader
          index="01"
          eyebrow="Selected work"
          title="Projects"
          lede="A few things I've built end to end, from APIs and job queues to real-time UIs."
        />
        {error && <p className="text-red-600">Could not load projects: {error.message}</p>}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {loading && [0, 1].map((i) => <CardSkeleton key={i} />)}
          {data?.map((project, i) => (
            <Reveal key={project.repo} delay={(i % 2) * 120} className="h-full">
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
        {githubUrl && (
          <Reveal className="mt-12 flex justify-center">
            <a href={`${githubUrl}?tab=repositories`} target="_blank" rel="noreferrer" className="btn-ghost">
              More on GitHub
              <ArrowUpRight className="btn-arrow-up h-3.5 w-3.5" />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
