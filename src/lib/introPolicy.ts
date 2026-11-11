const SEEN_KEY = 'portfolio.introSeen'

/**
 * Whether to play the intro. Skipped when:
 *  - the OS asks for reduced motion,
 *  - the visitor arrived via a deep link (e.g. /#contact): they want that section now,
 *  - it already played this browser session (refreshes don't replay it).
 */
export function shouldPlayIntro(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.location.hash) return false
  try {
    return sessionStorage.getItem(SEEN_KEY) === null
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* ignore: worst case it plays again */
  }
}
