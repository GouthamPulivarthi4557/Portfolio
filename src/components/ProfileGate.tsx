import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { viewerProfiles } from '../data/portfolio'
import { useViewerProfile } from '../context/viewerProfile'
import ProfileAvatar from './ProfileAvatar'

/**
 * Full-screen "Who's watching?" picker. Choosing a profile reorders the page
 * sections for that audience. Shown on the first visit; reopened from the
 * navbar avatar. The rest of the page is made `inert` while it's open (see
 * App.tsx), so focus can't escape behind it.
 */
export default function ProfileGate() {
  const { profile, gateOpen, choose, closeGate } = useViewerProfile()
  const firstTileRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!gateOpen) return
    firstTileRef.current?.focus({ preventScroll: true })
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeGate()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [gateOpen, closeGate])

  return (
    <AnimatePresence>
      {gateOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-y-auto bg-background px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Exit zooms in slightly while fading, like walking "into" the profile.
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="gate-title" className="text-center text-3xl font-semibold sm:text-5xl">
            Who&rsquo;s watching?
          </h2>
          <p className="mt-3 text-center text-sm text-muted sm:text-base">
            Pick a profile and the page reorders for what you care about most.
          </p>

          <ul className="mt-10 flex flex-wrap justify-center gap-5 sm:mt-12 sm:gap-8">
            {viewerProfiles.map((p, i) => {
              const current = profile?.id === p.id
              return (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    ref={i === 0 ? firstTileRef : undefined}
                    type="button"
                    onClick={() => choose(p.id)}
                    aria-describedby={`blurb-${p.id}`}
                    aria-current={current ? 'true' : undefined}
                    className="group flex w-24 flex-col items-center text-center outline-none sm:w-36"
                  >
                    <ProfileAvatar
                      profile={p}
                      className={`size-24 rounded-md ring-offset-4 ring-offset-background transition sm:size-36 group-hover:ring-4 group-hover:ring-white group-focus-visible:ring-4 group-focus-visible:ring-white ${
                        current ? 'ring-2 ring-white/60' : ''
                      }`}
                      iconClassName="w-1/2"
                    />
                    <span className="mt-3 text-sm font-medium text-muted transition group-hover:text-foreground group-focus-visible:text-foreground sm:text-lg">
                      {p.label}
                    </span>
                    <span id={`blurb-${p.id}`} className="mt-1 text-xs leading-snug text-subtle">
                      {p.blurb}
                    </span>
                  </button>
                </motion.li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={() => choose(null)}
            className="mt-12 rounded border border-subtle px-5 py-2 text-sm tracking-wide text-muted uppercase transition hover:border-foreground hover:text-foreground"
          >
            Skip — just browsing
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
