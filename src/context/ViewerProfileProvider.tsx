import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { defaultOrder, viewerProfiles, type ViewerProfileId } from '../data/portfolio'
import { ViewerProfileContext, type ViewerProfileState } from './viewerProfile'

const STORAGE_KEY = 'portfolio.viewer'
/** Stored when the visitor skips, so we don't ask again on the next visit. */
const SKIPPED = 'skipped'

// localStorage can throw (Safari private mode, blocked cookies), so every
// access is wrapped. Failing just means the choice isn't remembered.
function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}
function writeStored(value: string) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* not persisted; fine */
  }
}

/**
 * Holds which viewer profile is active and exposes it via context, so the
 * Navbar (link order) and App (section order) stay in sync without passing
 * props through every level.
 */
export default function ViewerProfileProvider({ children }: { children: ReactNode }) {
  // Lazy initializers read storage once on mount, not on every render.
  const [profileId, setProfileId] = useState<ViewerProfileId | null>(() => {
    const stored = readStored()
    return viewerProfiles.some((p) => p.id === stored) ? (stored as ViewerProfileId) : null
  })
  // First-time visitors (nothing stored) see the gate; returning ones don't.
  const [gateOpen, setGateOpen] = useState(() => readStored() === null)

  const choose = useCallback((id: ViewerProfileId | null) => {
    setProfileId(id)
    writeStored(id ?? SKIPPED)
    setGateOpen(false)
    // Start the newly ordered page from the top.
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const openGate = useCallback(() => setGateOpen(true), [])

  const closeGate = useCallback(() => {
    // Remember the dismissal so a first-time visitor isn't asked again.
    if (readStored() === null) writeStored(SKIPPED)
    setGateOpen(false)
  }, [])

  // useMemo keeps the context value (and `order` array) referentially stable,
  // so consumers only re-render when something actually changed.
  const value = useMemo<ViewerProfileState>(() => {
    const profile = viewerProfiles.find((p) => p.id === profileId) ?? null
    return { profile, order: profile?.order ?? defaultOrder, gateOpen, openGate, closeGate, choose }
  }, [profileId, gateOpen, openGate, closeGate, choose])

  return <ViewerProfileContext.Provider value={value}>{children}</ViewerProfileContext.Provider>
}
