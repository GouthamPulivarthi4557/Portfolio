import { useState } from 'react'
import { projects } from '../data/portfolio'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import ScrollRow from './ScrollRow'

/** "Originals": personal projects as a scrolling row of title cards. */
export default function Originals() {
  // `open` and `selected` are separate so the modal keeps showing the project
  // while its close animation plays (clearing `selected` would blank it).
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)
  const allPlaceholders = projects.every((p) => p.placeholder)

  return (
    <section id="originals" aria-labelledby="originals-title" className="page-gutter py-12 sm:py-16">
      <h2 id="originals-title" className="row-title mb-1">
        Originals
      </h2>
      <p className="text-sm text-muted">
        Projects I built on my own.
        {allPlaceholders && <span className="text-amber-200/80"> Real projects coming soon.</span>}
      </p>

      <ScrollRow label="Projects" className="gap-3 sm:gap-4">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            onOpen={() => {
              setSelected(i)
              setOpen(true)
            }}
          />
        ))}
      </ScrollRow>

      <ProjectModal project={projects[selected] ?? null} index={selected} open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
