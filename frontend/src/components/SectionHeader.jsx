import Reveal from './Reveal'

export default function SectionHeader({ index, eyebrow, title, lede, center = false }) {
  return (
    <Reveal className={`mb-14 sm:mb-16 ${center ? 'flex flex-col items-center text-center' : ''}`}>
      <p className="eyebrow">
        {index} · {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      {lede && <p className={`section-lede ${center ? 'mx-auto' : ''}`}>{lede}</p>}
    </Reveal>
  )
}
