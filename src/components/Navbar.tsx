import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { useViewerProfile } from '../context/viewerProfile'
import { profile, sections } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import ProfileAvatar from './ProfileAvatar'

/** Distance (px) the user must scroll before the navbar can hide. */
const HIDE_AFTER = 120
/** Ignore tiny scroll jitters (trackpads emit 1–2px deltas). */
const SCROLL_DELTA = 6

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Links follow the active viewer profile's section order. `order` is a stable
  // array from context, so useActiveSection only re-subscribes when it changes.
  const { order, profile: viewer, openGate } = useViewerProfile()
  const links = useMemo(
    () => order.map((id) => sections.find((s) => s.id === id)).filter((s) => s !== undefined),
    [order],
  )
  const active = useActiveSection(order)

  // Motion's useScroll gives a MotionValue that updates outside React's render
  // cycle. useMotionValueEvent subscribes to it, and we only call setState when
  // the derived booleans change, so scrolling doesn't re-render on every frame.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    const delta = y - prev

    setScrolled(y > 10)
    if (Math.abs(delta) < SCROLL_DELTA) return
    // Scrolling down past the threshold hides; any scroll up reveals.
    setHidden(delta > 0 && y > HIDE_AFTER)
  })

  // Close the mobile menu on Escape, and when the viewport grows to desktop size.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <>
      {/* Keyboard users can jump past the nav straight to the content */}
      <a
        href="#main"
        className="fixed top-2 left-2 z-[60] -translate-y-20 rounded bg-white px-4 py-2 font-semibold text-black focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        // Slide fully out of view when hidden; never hide while the menu is open.
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? 'bg-background/95 shadow-lg shadow-black/40 backdrop-blur-md'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <nav aria-label="Primary" className="page-gutter flex h-16 items-center justify-between gap-6">
          {/* Logo: name as wordmark */}
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-black tracking-tight text-accent uppercase transition-colors hover:text-accent-hover sm:text-xl"
          >
            {profile.name}
          </a>

          {/* Desktop links */}
          <ul className="ml-auto hidden items-center gap-6 md:flex">
            {links.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'location' : undefined}
                  className={`text-sm transition-colors ${
                    active === s.id ? 'font-semibold text-foreground' : 'text-muted hover:text-foreground'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Viewer profile: reopens "Who's watching?" */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false)
              openGate()
            }}
            aria-haspopup="dialog"
            aria-label={viewer ? `Viewing as ${viewer.label}. Switch profile` : 'Choose a viewer profile'}
            title={viewer ? `Viewing as ${viewer.label}` : 'Choose a profile'}
            className="group ml-auto flex items-center gap-2 rounded md:ml-0"
          >
            <ProfileAvatar profile={viewer} className="size-8 rounded transition group-hover:ring-2 group-hover:ring-white" />
            <span className="hidden text-xs text-muted transition group-hover:text-foreground lg:inline">
              {viewer?.label ?? 'Profiles'}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="-mr-2 rounded p-2 text-foreground md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </nav>

        {/* Mobile menu panel: AnimatePresence lets it animate out before unmounting */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="page-gutter overflow-hidden border-t border-border md:hidden"
            >
              {links.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === s.id ? 'location' : undefined}
                    className={`block border-l-2 py-3 pl-3 text-base transition-colors ${
                      active === s.id
                        ? 'border-accent font-semibold text-foreground'
                        : 'border-transparent text-muted hover:text-foreground'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="h-3" aria-hidden="true" />
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

/** Hamburger that morphs into an X (pure CSS transforms on three bars). */
function MenuIcon({ open }: { open: boolean }) {
  const bar = 'absolute left-0 h-0.5 w-6 rounded bg-current transition-transform duration-300'
  return (
    <span className="relative block h-5 w-6" aria-hidden="true">
      <span className={`${bar} top-0.5 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`${bar} top-[9px] ${open ? 'scale-x-0' : ''}`} />
      <span className={`${bar} top-[17px] ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </span>
  )
}
