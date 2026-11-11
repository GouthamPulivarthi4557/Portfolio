import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { seasons, type Season } from '../data/portfolio'
import EpisodeList from './EpisodeList'

/**
 * Career as a series: one tab per job ("season"), each showing its resume
 * bullets as "episodes". Opens on the latest season, the most relevant one.
 *
 * The season picker follows the WAI-ARIA Tabs pattern: role="tablist"/"tab"/
 * "tabpanel", arrow keys move between tabs, and only the selected tab is in
 * the Tab order (a "roving tabindex").
 */
export default function Seasons() {
  const [selected, setSelected] = useState(seasons.length - 1)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const season = seasons[selected]

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = seasons.length - 1
    const next =
      e.key === 'ArrowRight' ? (selected === last ? 0 : selected + 1)
      : e.key === 'ArrowLeft' ? (selected === 0 ? last : selected - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="seasons" aria-labelledby="seasons-title" className="page-gutter py-12 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="seasons-title" className="row-title mb-1">
            Seasons
          </h2>
          <p className="text-sm text-muted">My career so far, one season per role. Episodes are what I shipped.</p>
        </div>

        <div
          role="tablist"
          aria-label="Choose a season"
          onKeyDown={onTabKeyDown}
          // Equal-width grid on phones so every season (incl. the selected one) is visible.
          className="grid grid-cols-3 gap-2 sm:flex"
        >
          {seasons.map((s, i) => {
            const isSelected = i === selected
            return (
              <button
                key={s.number}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={`season-tab-${s.number}`}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls="season-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(i)}
                className={`min-w-0 rounded-md border px-3 py-2 text-left transition sm:min-w-28 sm:px-4 ${
                  isSelected
                    ? 'border-foreground bg-foreground text-black'
                    : 'border-border bg-surface-raised text-muted hover:border-muted hover:text-foreground'
                }`}
              >
                <span className={`block text-[0.7rem] tracking-wide uppercase ${isSelected ? 'text-black/60' : 'text-subtle'}`}>
                  Season {s.number}
                </span>
                <span className="block truncate text-sm font-bold">{s.company}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* mode="wait": the old season fades out before the new one fades in.
          The key change also resets EpisodeList's "show all" state per season. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={season.number}
          id="season-panel"
          role="tabpanel"
          aria-labelledby={`season-tab-${season.number}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <SeasonHeader season={season} isCurrent={selected === seasons.length - 1} />
          <EpisodeList season={season} />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

function SeasonHeader({ season, isCurrent }: { season: Season; isCurrent: boolean }) {
  const metrics = season.episodes.flatMap((e) => (e.metric ? [e.metric] : []))

  return (
    <header className="relative overflow-hidden rounded-lg bg-[radial-gradient(ellipse_at_100%_0%,#e5091433_0%,transparent_55%),linear-gradient(to_right,#1f1f1f,#141414)] p-5 ring-1 ring-white/5 sm:p-8">
      {/* Giant season number as background art */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-2 text-[9rem] leading-none font-black text-white/[0.04] select-none sm:text-[12rem]"
      >
        S{season.number}
      </span>

      <p className="text-xs font-bold tracking-[0.3em] text-muted uppercase">Season {season.number}</p>
      <h3 className="mt-1 text-3xl font-black sm:text-4xl">{season.company}</h3>
      <p className="mt-1 text-lg font-semibold text-foreground/90">{season.role}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        {isCurrent && <span className="font-semibold text-emerald-400">Now streaming</span>}
        <span>
          {season.start} – {season.end}
        </span>
        <span aria-hidden="true">·</span>
        <span>{season.location}</span>
        <span aria-hidden="true">·</span>
        <span>{season.episodes.length} episodes</span>
      </div>

      <p className="mt-4 max-w-2xl text-foreground/85">{season.synopsis}</p>

      {metrics.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Season highlights">
          {metrics.map((m) => (
            <li key={m} className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
              ▲ {m}
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
