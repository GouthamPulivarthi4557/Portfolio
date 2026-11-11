import type { Project } from '../data/portfolio'
import { projectArt } from './projectArt'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: () => void
}

/** Landscape title card. The whole card is a button that opens the detail modal. */
export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <li className="w-64 shrink-0 snap-start sm:w-72 lg:w-80">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="group relative block aspect-video w-full overflow-hidden rounded-md text-left shadow-lg shadow-black/50 ring-1 ring-white/10 transition duration-300 ease-cinematic hover:z-10 hover:scale-[1.04] hover:ring-white/40 focus-visible:scale-[1.04]"
      >
        {/* Art */}
        <span aria-hidden="true" className={`absolute inset-0 ${projectArt(index)}`} />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Top badges */}
        <span className="absolute top-2.5 left-3 flex items-center gap-1.5 text-[0.6rem] font-black tracking-[0.25em] text-white/80">
          <span className="grid size-4 place-items-center rounded-[3px] bg-accent text-[0.5rem] tracking-normal text-white">GP</span>
          ORIGINAL
        </span>
        {project.placeholder && (
          <span className="absolute top-2 right-2 rounded-sm border border-dashed border-amber-300/70 bg-black/60 px-1.5 py-0.5 text-[0.6rem] font-bold tracking-wider text-amber-200 uppercase">
            Placeholder
          </span>
        )}

        {/* Title + tagline (tagline slides up on hover/focus) */}
        <span className="absolute inset-x-0 bottom-0 p-3.5">
          <span className="block text-lg leading-tight font-black text-white drop-shadow sm:text-xl">{project.title}</span>
          <span className="mt-1 block max-h-0 overflow-hidden text-xs text-white/75 opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100 group-focus-visible:max-h-12 group-focus-visible:opacity-100">
            {project.tagline}
          </span>
          <span className="mt-1.5 block truncate text-[0.7rem] text-white/60">{project.tech.join(' · ')}</span>
        </span>
      </button>
    </li>
  )
}
