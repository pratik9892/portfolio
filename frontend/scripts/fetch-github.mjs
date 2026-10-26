// Build-time enrichment (ADR-0003): merge curated projects.json with live GitHub
// repo stats and write projects.generated.json. Never fails the build.
import { readFile, writeFile } from 'node:fs/promises'

const OWNER = 'pratik9892'
const dataDir = new URL('../src/data/', import.meta.url)
const token = process.env.GITHUB_TOKEN

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'portfolio-build',
  ...(token && { Authorization: `Bearer ${token}` }),
}

async function fetchRepo(repo) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${repo}`, {
    headers,
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  const r = await res.json()
  return {
    stars: r.stargazers_count,
    language: r.language,
    topics: r.topics ?? [],
    updatedAt: r.pushed_at,
    githubUrl: r.html_url,
  }
}

const curated = JSON.parse(await readFile(new URL('projects.json', dataDir), 'utf8'))

const enriched = await Promise.all(
  curated.map(async (project) => {
    try {
      return { ...project, ...(await fetchRepo(project.repo)) }
    } catch (err) {
      console.warn(`[fetch-github] ${project.repo}: ${err.message} — using curated data only`)
      return { ...project, githubUrl: `https://github.com/${OWNER}/${project.repo}` }
    }
  }),
)

await writeFile(new URL('projects.generated.json', dataDir), JSON.stringify(enriched, null, 2) + '\n')
console.log(`[fetch-github] wrote ${enriched.length} projects`)
