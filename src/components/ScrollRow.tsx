import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

interface ScrollRowProps {
  /** Accessible name for the list, e.g. "Projects". */
  label: string
  children: ReactNode
  /** Extra classes for the <ul> (gap, padding tweaks). */
  className?: string
  /**
   * Set when the items aren't focusable themselves (e.g. static skill tiles):
   * makes the row a tab stop so keyboard users can scroll it with arrow keys.
   */
  focusable?: boolean
}

/**
 * Horizontal scrolling row (reused by Originals and Skills).
 *
 * - Bleeds to the screen edges on every breakpoint by cancelling the page gutter
 *   with negative margin, then re-adding it as padding + scroll-padding so the
 *   first item still lines up with the section title.
 * - Desktop: arrow buttons appear on hover and page by ~one screen width. They
 *   hide at either end, tracked with a scroll listener + ResizeObserver.
 * - Touch / keyboard: native swipe, and tabbing to an item scrolls it into view,
 *   so the arrows are a mouse convenience only (kept out of the tab order).
 */
export default function ScrollRow({ label, children, className = '', focusable = false }: ScrollRowProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const update = useCallback(() => {
    const el = listRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    // Re-check when the row resizes (window resize, fonts loading, items added).
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [update])

  const page = (direction: 1 | -1) => {
    const el = listRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="group/row relative">
      <ul
        ref={listRef}
        aria-label={label}
        tabIndex={focusable ? 0 : undefined}
        className={`scrollbar-none focus-visible:outline-offset-[-2px] -mx-4 flex snap-x scroll-px-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-14 lg:scroll-px-14 lg:px-14 ${className}`}
      >
        {children}
      </ul>

      <ArrowButton side="left" visible={canLeft} onClick={() => page(-1)} />
      <ArrowButton side="right" visible={canRight} onClick={() => page(1)} />
    </div>
  )
}

function ArrowButton({ side, visible, onClick }: { side: 'left' | 'right'; visible: boolean; onClick: () => void }) {
  if (!visible) return null
  const isLeft = side === 'left'
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      onClick={onClick}
      className={`absolute inset-y-4 z-10 hidden w-10 place-items-center text-white opacity-0 transition-opacity group-hover/row:opacity-100 md:grid lg:w-14 ${
        isLeft
          ? '-left-8 bg-gradient-to-r from-background/95 to-transparent lg:-left-14'
          : '-right-8 bg-gradient-to-l from-background/95 to-transparent lg:-right-14'
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-8 drop-shadow transition-transform hover:scale-125" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d={isLeft ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
