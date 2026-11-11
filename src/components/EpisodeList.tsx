import { motion } from 'motion/react'
import { useState } from 'react'
import type { Season } from '../data/portfolio'

/** Episodes shown before "Show all" — keeps the page skimmable. */
const INITIAL_COUNT = 4

/** A season's resume bullets, laid out like an episode list. */
export default function EpisodeList({ season }: { season: Season }) {
  const [showAll, setShowAll] = useState(false)
  const hasMore = season.episodes.length > INITIAL_COUNT
  const visible = showAll ? season.episodes : season.episodes.slice(0, INITIAL_COUNT)
  const listId = `episodes-s${season.number}`

  return (
    <div className="mt-6">
      <ol id={listId} className="divide-y divide-border/70">
        {visible.map((ep, i) => (
          <motion.li
            key={ep.title}
            // Only episodes revealed by "Show all" animate in; the first batch
            // is already visible when the season panel fades in.
            initial={i >= INITIAL_COUNT ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.max(0, i - INITIAL_COUNT) * 0.05 }}
            className="group grid grid-cols-[2rem_1fr] gap-x-4 rounded-md px-2 py-5 transition-colors hover:bg-surface-raised/60 sm:grid-cols-[2.5rem_9rem_1fr] sm:gap-x-5 sm:px-4"
          >
            {/* Episode number */}
            <span className="pt-0.5 text-2xl font-semibold text-subtle tabular-nums sm:self-center sm:pt-0">
              {i + 1}
            </span>

            {/* Thumbnail (decorative, hidden on phones) */}
            <div
              aria-hidden="true"
              className="relative hidden aspect-video overflow-hidden rounded bg-[linear-gradient(135deg,#2a2a2a,#151515)] ring-1 ring-white/10 sm:flex sm:items-end sm:p-2"
            >
              <span className="absolute top-1.5 left-2 text-[0.6rem] font-bold tracking-widest text-subtle">
                S{season.number}:E{i + 1}
              </span>
              <span className="text-xs leading-tight font-semibold text-foreground/80">{ep.tech[0]}</span>
              {/* Play glyph appears on hover, like an episode thumbnail */}
              <span className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="size-7 text-white" fill="currentColor">
                  <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
                </svg>
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h4 className="text-base font-semibold sm:text-lg">{ep.title}</h4>
                {ep.metric && (
                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                    ▲ {ep.metric}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{ep.description}</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Technologies">
                {ep.tech.map((t) => (
                  <li key={t} className="rounded bg-surface-hover px-2 py-0.5 text-[0.7rem] text-foreground/75">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>

      {hasMore && (
        // Centered divider with a toggle, like the "more episodes" chevron
        <div className="relative mt-2 flex justify-center">
          <span className="absolute inset-x-0 top-1/2 h-px bg-border" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls={listId}
            className="relative flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted transition hover:border-foreground hover:text-foreground"
          >
            {showAll ? 'Show fewer' : `Show all ${season.episodes.length} episodes`}
            <svg
              viewBox="0 0 24 24"
              className={`size-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
