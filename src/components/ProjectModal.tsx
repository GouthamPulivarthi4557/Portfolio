import type { Project } from '../data/portfolio'
import Modal from './Modal'
import { projectArt } from './projectArt'

interface ProjectModalProps {
  project: Project | null
  index: number
  open: boolean
  onClose: () => void
}

/** Detail popup for an Original (built on the shared accessible Modal). */
export default function ProjectModal({ project, index, open, onClose }: ProjectModalProps) {
  return (
    <Modal open={open && project !== null} onClose={onClose} labelledBy="project-title">
      {project && (
        <>
          {/* Banner */}
          <div className={`relative flex aspect-[21/9] min-h-44 items-end p-6 sm:p-10 ${projectArt(index)}`}>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
            <div className="relative">
              <p className="flex items-center gap-1.5 text-[0.65rem] font-black tracking-[0.25em] text-white/80">
                <span className="grid size-4 place-items-center rounded-[3px] bg-accent text-[0.5rem] tracking-normal text-white">GP</span>
                ORIGINAL
              </p>
              <h2 id="project-title" className="mt-1 text-3xl font-black sm:text-4xl">
                {project.title}
              </h2>
              <p className="mt-1 text-foreground/85">{project.tagline}</p>
            </div>
          </div>

          <div className="grid gap-8 px-6 pt-2 pb-8 sm:px-10 md:grid-cols-[1.6fr_1fr]">
            <div>
              {project.placeholder && (
                <p className="mb-4 rounded border border-dashed border-amber-300/60 bg-amber-300/5 px-3 py-2 text-sm text-amber-200">
                  Placeholder project: real details coming soon.
                </p>
              )}
              <p className="text-foreground/90">{project.description}</p>
              {project.highlights.length > 0 && (
                <>
                  <h3 className="mt-6 text-sm font-semibold tracking-wide text-subtle uppercase">Highlights</h3>
                  <ul className="mt-2 space-y-2 text-sm text-muted">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h3 className="text-subtle">Tech stack</h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li key={t} className="rounded bg-surface-hover px-2 py-1 text-xs text-foreground/85">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {(project.githubUrl || project.liveUrl) && (
                <div className="flex flex-wrap gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 font-bold text-black transition hover:bg-white/75"
                    >
                      ▶ Live demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-surface-hover px-4 py-2 font-bold transition hover:bg-surface-hover/60"
                    >
                      View code ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}
