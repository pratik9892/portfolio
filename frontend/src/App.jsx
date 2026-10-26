import { useAsync } from './hooks/useAsync'
import { getProfile, getProjects } from './services/projectsService'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const profile = useAsync(getProfile)
  const projects = useAsync(getProjects)

  if (profile.loading) return null
  if (profile.error) {
    return <p className="p-8 text-red-600">Could not load profile: {profile.error.message}</p>
  }

  const p = profile.data
  const github = p.socials.find((s) => s.label === 'GitHub')?.url
  return (
    <>
      <Navbar name={p.name} hasExperience={p.experience?.length > 0} />
      <main id="main">
        <Hero profile={p} />
        <Projects {...projects} githubUrl={github} />
        <Skills skills={p.skills} coreSkills={p.coreSkills} />
        <About profile={p} />
        <Experience experience={p.experience} education={p.education} certifications={p.certifications} />
        <Contact profile={p} />
      </main>
      <Footer profile={p} />
    </>
  )
}
