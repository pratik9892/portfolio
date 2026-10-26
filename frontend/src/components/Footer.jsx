export default function Footer({ profile }) {
  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-zinc-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind &amp; nginx.
        </p>
        <a href="#top" className="group inline-flex items-center gap-1.5 transition hover:text-zinc-900 dark:hover:text-white">
          Back to top
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
        </a>
      </div>
    </footer>
  )
}
