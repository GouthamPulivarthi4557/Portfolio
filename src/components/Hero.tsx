import { motion, type Variants } from 'motion/react'
import { useState } from 'react'
import { useIntroDone } from '../context/intro'
import { profile, seasons } from '../data/portfolio'
import MoreInfoModal from './MoreInfoModal'

// Derived from data, never hard-coded: adding a job updates these automatically.
const currentSeason = seasons[seasons.length - 1]
const episodeCount = seasons.reduce((sum, s) => sum + s.episodes.length, 0)
const firstYear = seasons[0].start.split(' ').pop()

// Staggered entrance: the container orchestrates, each child fades up in turn.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const [infoOpen, setInfoOpen] = useState(false)
  // Hold the entrance animation until the intro has gone.
  const introDone = useIntroDone()

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[88svh] items-end overflow-hidden pb-[12svh] sm:min-h-[92svh]"
    >
      <Backdrop />

      <motion.div
        variants={container}
        initial="hidden"
        animate={introDone ? 'show' : 'hidden'}
        className="page-gutter relative w-full max-w-4xl"
      >
        <motion.p variants={item} className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.35em] text-muted uppercase sm:text-sm">
          <span className="grid size-5 place-items-center rounded-sm bg-accent text-[0.65rem] tracking-normal text-white">GP</span>
          Series
        </motion.p>

        <motion.h1 id="hero-title" variants={item} className="text-display font-black uppercase">
          {profile.name}
        </motion.h1>

        <motion.p variants={item} className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
          {profile.title}
        </motion.p>

        {/* Metadata row, styled like a title's info line */}
        <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted sm:text-base">
          <span className="font-semibold text-emerald-400">Now streaming at {currentSeason.company}</span>
          <span>{firstYear}–Present</span>
          <span className="rounded-sm border border-muted/60 px-1.5 text-xs leading-5">{profile.yearsOfExperience} YRS</span>
          <span>
            {seasons.length} Seasons · {episodeCount} Episodes
          </span>
        </motion.div>

        <motion.p variants={item} className="mt-4 max-w-2xl text-base text-foreground/90 sm:text-lg">
          {profile.summary}
        </motion.p>

        <motion.p variants={item} className="mt-3 text-sm text-muted">
          <span className="text-subtle">Genres: </span>
          {profile.domains.join(' · ')}
        </motion.p>

        <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
          {/* "Play" starts the series: jumps to Season 1. A link, since it navigates. */}
          <a
            href="#seasons"
            className="inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-2.5 text-base font-bold text-black transition hover:bg-white/75 sm:px-8 sm:py-3 sm:text-lg"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
            </svg>
            Play
          </a>
          {/* "More Info" opens a dialog: a button, since it doesn't navigate. */}
          <button
            type="button"
            onClick={() => setInfoOpen(true)}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-2.5 rounded-md bg-surface-hover/80 px-6 py-2.5 text-base font-bold text-foreground backdrop-blur-sm transition hover:bg-surface-hover/50 sm:px-8 sm:py-3 sm:text-lg"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="9.5" />
              <path d="M12 11v5.5M12 7.5v.01" strokeLinecap="round" />
            </svg>
            More Info
          </button>
        </motion.div>
      </motion.div>

      <MoreInfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />
    </section>
  )
}

const CODE = `@RestController
@RequestMapping("/api/v1/engineers")
public class PortfolioController {

  private final KafkaTemplate<String, HireEvent> kafka;

  @GetMapping("/goutham")
  public ResponseEntity<Engineer> profile() {
    return ResponseEntity.ok(Engineer.builder()
        .role("Java Full Stack Developer")
        .stack(List.of("Java", "Spring Boot", "React"))
        .experience("5+ years")
        .build());
  }

  @PostMapping("/goutham/interview")
  public void schedule(@RequestBody Invite invite) {
    kafka.send("interviews", HireEvent.of(invite));
  }
}`

/**
 * Pure-CSS "key art": no image download, so the hero paints instantly.
 * Layers (back to front): red glow, faint grid, code snippet, darkening gradients.
 * Decorative only, so it's aria-hidden.
 */
function Backdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 select-none">
      {/* Red glow */}
      <div className="absolute -top-1/4 right-[-15%] size-[70vmax] rounded-full bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_60%)] opacity-35 blur-3xl" />
      <div className="absolute bottom-[-30%] left-[20%] size-[50vmax] rounded-full bg-[radial-gradient(circle,#7f1d1d_0%,transparent_65%)] opacity-40 blur-3xl" />

      {/* Grid, fading out toward the edges */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]" />

      {/* Code snippet "poster art" on the right */}
      <motion.pre
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[14%] right-[-6rem] hidden font-mono text-[clamp(0.7rem,1.05vw,1rem)] leading-relaxed text-white/25 [mask-image:linear-gradient(to_right,transparent,black_30%)] md:block lg:right-[2%]"
      >
        {CODE}
      </motion.pre>

      {/* Darkening overlays so text stays readable */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(10_10_10/0.95)_0%,rgb(10_10_10/0.7)_40%,transparent_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
