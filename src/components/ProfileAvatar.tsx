import type { ReactNode } from 'react'
import type { ViewerProfile, ViewerProfileId } from '../data/portfolio'

/** Simple line icons per profile (inline SVG: no icon library needed). */
const ICONS: Record<ViewerProfileId | 'none', ReactNode> = {
  // Briefcase
  recruiter: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  // Code brackets
  engineer: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  // Team
  manager: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 14.2A5 5 0 0 1 21 19.5" />
    </>
  ),
  // Generic person (no profile picked yet)
  none: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
}

interface ProfileAvatarProps {
  profile: ViewerProfile | null
  /** Tailwind size + radius classes for the tile. */
  className?: string
  iconClassName?: string
}

/** Square avatar tile with the profile's gradient and icon. Decorative. */
export default function ProfileAvatar({ profile, className = 'size-8 rounded', iconClassName = 'w-3/5' }: ProfileAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center text-white ${profile?.tileClass ?? 'bg-surface-hover'} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClassName}
      >
        {ICONS[profile?.id ?? 'none']}
      </svg>
    </span>
  )
}
