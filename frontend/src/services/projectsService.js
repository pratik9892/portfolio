// The single data-access seam (ADR-0001). Components never import data files
// directly. Phase 1 reads bundled JSON; Phase 2 sets VITE_DATA_SOURCE=api and
// the Express API returns the same shapes.
const source = import.meta.env.VITE_DATA_SOURCE ?? 'static'

async function fetchJson(path) {
  const res = await fetch(path, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`${path} → ${res.status}`)
  return res.json()
}

const byOrder = (a, b) => (a.order ?? 99) - (b.order ?? 99)

export async function getProjects() {
  const projects =
    source === 'api'
      ? await fetchJson('/api/projects')
      : (await import('../data/projects.generated.json')).default
  return projects.filter((p) => p.featured).sort(byOrder)
}

export async function getProfile() {
  if (source === 'api') return fetchJson('/api/profile')
  return (await import('../data/profile.json')).default
}
