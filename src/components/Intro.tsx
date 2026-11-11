import { AnimatePresence, motion, type Variants } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { markIntroSeen } from '../lib/introPolicy'

/** How long the name holds on screen before the intro zooms away (ms). */
const HOLD_MS = 1900
/** Exit zoom/fade duration (s). Total intro ≈ 2.4s. */
const EXIT_S = 0.5

// Split the name into words of letters once, with a running index per letter
// for the stagger delay (computed outside render, so render stays pure).
const WORDS = (() => {
  let index = 0
  return profile.name
    .toUpperCase()
    .split(' ')
    .map((word) => [...word].map((char) => ({ char, index: index++ })))
})()

type Ending = 'auto' | 'skip'

// The exit is a function of how the intro ended. A skip should feel instant,
// so it's a quick fade; the natural ending zooms toward the viewer.
const overlay: Variants = {
  exit: (ending: Ending) =>
    ending === 'skip'
      ? { opacity: 0, transition: { duration: 0.2 } }
      : { opacity: 0, scale: 1.25, filter: 'blur(6px)', transition: { duration: EXIT_S, ease: [0.7, 0, 0.84, 0] } },
}

/**
 * Short name-reveal intro. Letters rise out of a blur one by one, a red light
 * bar sweeps underneath, then everything zooms toward the viewer and fades to
 * reveal the site. "Skip intro" (or Esc / Enter / a click anywhere) ends it at once.
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  // null while playing; otherwise how it ended. Only the first ending counts
  // (a skip after the auto-end has started is ignored, and vice versa).
  const [ending, setEnding] = useState<Ending | null>(null)
  const end = (how: Ending) => setEnding((current) => current ?? how)
  const skipRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    markIntroSeen()
    skipRef.current?.focus({ preventScroll: true })
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const finish = (how: Ending) => setEnding((current) => current ?? how)
    const timer = window.setTimeout(() => finish('auto'), HOLD_MS)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        finish('skip')
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  return (
    // onExitComplete fires after the exit animation, so the page is revealed
    // underneath the zoom instead of popping in afterwards.
    // `custom` is how AnimatePresence passes fresh data to a child that is
    // already leaving: its exit variant receives the latest `ending`.
    <AnimatePresence custom={ending} onExitComplete={onDone}>
      {ending === null && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90] grid cursor-pointer place-items-center overflow-hidden bg-black"
          onClick={() => end('skip')}
          variants={overlay}
          exit="exit"
        >
          {/* Name: decorative here (the hero has the real <h1>), so hidden from screen readers */}
          <div aria-hidden="true" className="relative px-4 text-center select-none">
            <p className="flex flex-col items-center gap-x-[0.3em] text-[clamp(2.75rem,11vw,8.5rem)] leading-[0.95] font-black tracking-tight text-accent sm:flex-row sm:justify-center">
              {WORDS.map((letters) => (
                <span key={letters[0].index} className="flex">
                  {letters.map(({ char, index }) => (
                    <motion.span
                      key={index}
                      className="inline-block drop-shadow-[0_0_30px_rgb(229_9_20/0.45)]"
                      initial={{ opacity: 0, y: '35%', filter: 'blur(12px)' }}
                      animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
                      transition={{ delay: 0.15 + index * 0.045, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </p>

            {/* Light bar sweeping out from the center */}
            <motion.div
              className="mx-auto mt-5 h-[3px] w-full max-w-3xl origin-center rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="mt-4 text-sm font-semibold tracking-[0.4em] text-muted uppercase sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              {profile.title}
            </motion.p>
          </div>

          <button
            ref={skipRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              end('skip')
            }}
            className="absolute right-4 bottom-6 flex items-center gap-2 rounded border border-white/60 bg-black/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 sm:right-10 sm:bottom-10 sm:text-base"
          >
            Skip intro
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d="M5 5.5v13l9-6.5-9-6.5Zm10 0v13h3v-13h-3Z" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
