import { createContext, useContext } from 'react'
import type { SectionId, ViewerProfile, ViewerProfileId } from '../data/portfolio'

export interface ViewerProfileState {
  /** The chosen profile, or null if none was picked (skipped or first visit). */
  profile: ViewerProfile | null
  /** Section order to render, derived from the profile. */
  order: SectionId[]
  /** Whether the "Who's watching?" screen is showing. */
  gateOpen: boolean
  openGate: () => void
  /** Dismiss the gate, keeping the current profile (or skipping if none). */
  closeGate: () => void
  /** Pick a profile, or pass null to skip and use the default order. */
  choose: (id: ViewerProfileId | null) => void
}

// The context lives in its own file (not with the Provider component) so React
// Fast Refresh keeps working: a .tsx file should only export components.
export const ViewerProfileContext = createContext<ViewerProfileState | null>(null)

/** Read the current viewer profile. Must be used inside <ViewerProfileProvider>. */
export function useViewerProfile(): ViewerProfileState {
  const ctx = useContext(ViewerProfileContext)
  if (!ctx) throw new Error('useViewerProfile must be used inside <ViewerProfileProvider>')
  return ctx
}
