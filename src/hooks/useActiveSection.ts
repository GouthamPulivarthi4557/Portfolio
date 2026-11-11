import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in the middle of the viewport,
 * so the navbar can highlight the matching link.
 *
 * Uses IntersectionObserver instead of a scroll listener: the browser tells us
 * when a section crosses a thin band in the middle of the screen, so there's no
 * work on every scroll frame. rootMargin shrinks the observed area to the band
 * between 45% and 50% from the top.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    elements.forEach((el) => observer.observe(el))

    // Cleanup runs on unmount or when ids change: no leaked observers.
    return () => observer.disconnect()
  }, [ids])

  return active
}
