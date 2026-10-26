import { ArrowRight, FileText, GitHub, LinkedIn } from './Icons'

// A small "profile.ts" card that fills the right side of the hero on desktop.
function CodeCard({ profile }) {
  const stack = (profile.coreSkills ?? []).slice(0, 4)
  return (
    <div
      aria-hidden="true"
      className="relative hidden animate-fade-up rounded-2xl border border-zinc-200/80 bg-white/70 shadow-[0_32px_64px_-32px_rgb(24_24_27/0.25)] backdrop-blur [animation-delay:400ms] dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:shadow-[0_32px_64px_-32px_rgb(0_0_0/0.8)] lg:block"
    >
      <div className="flex items-center gap-1.5 border-b border-zinc-200/80 px-4 py-3 dark:border-zinc-800/80">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="ml-3 font-mono text-[11px] text-zinc-400">profile.ts</span>
      </div>
      <pre className="overflow-hidden px-5 py-5 font-mono text-[12.5px] leading-6 text-zinc-500 dark:text-zinc-400">
        <code>
          <span className="text-indigo-600 dark:text-indigo-400">const</span> engineer = {'{'}
          {'\n'}  name: <span className="text-emerald-600 dark:text-emerald-400">'{profile.name}'</span>,
          {'\n'}  role: <span className="text-emerald-600 dark:text-emerald-400">'{profile.role}'</span>,
          {profile.location && (
            <>
              {'\n'}  location: <span className="text-emerald-600 dark:text-emerald-400">'{profile.location}'</span>,
            </>
          )}
          {'\n'}  stack: [
          {stack.map((s, i) => (
            <span key={s}>
              <span className="text-emerald-600 dark:text-emerald-400">'{s}'</span>
              {i < stack.length - 1 ? ', ' : ''}
            </span>
          ))}
          ],
          {'\n'}  openToWork: <span className="text-indigo-600 dark:text-indigo-400">true</span>,
          {'\n'}{'}'}
          <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] animate-pulse bg-zinc-400 dark:bg-zinc-500" />
        </code>
      </pre>
    </div>
  )
}

export default function Hero({ profile }) {
  const social = (label) => profile.socials.find((s) => s.label === label)?.url
  const github = social('GitHub')
  const linkedin = social('LinkedIn')

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Background: soft glow + faded grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12rem] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(113_113_122/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(113_113_122/0.08)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      </div>

      <div className="container-page grid items-center gap-16 pb-8 pt-16 sm:pb-12 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:pt-28">
        <div>
          {profile.availability && (
            <p className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-zinc-200/80 bg-white/70 py-1 pl-2.5 pr-3.5 text-xs font-medium text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </p>
          )}
          <h1 className="mt-7 animate-fade-up text-5xl font-semibold tracking-[-0.035em] [animation-delay:80ms] sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 animate-fade-up text-xl font-medium tracking-tight text-zinc-400 [animation-delay:140ms] dark:text-zinc-500 sm:text-2xl">
            {profile.role}
          </p>
          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed [animation-delay:200ms] sm:text-lg">
            {profile.tagline}
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:260ms]">
            <a href="#projects" className="btn-primary">
              View projects
              <ArrowRight className="btn-arrow h-4 w-4" />
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                <FileText />
                Résumé
              </a>
            )}
            <div className="flex items-center gap-1 sm:ml-2">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  <GitHub className="h-[18px] w-[18px]" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  <LinkedIn className="h-[18px] w-[18px]" />
                </a>
              )}
            </div>
          </div>
        </div>
        <CodeCard profile={profile} />
      </div>
    </section>
  )
}
