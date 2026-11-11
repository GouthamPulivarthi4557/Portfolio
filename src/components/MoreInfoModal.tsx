import { contact, education, profile, seasons } from '../data/portfolio'
import Modal from './Modal'

interface MoreInfoModalProps {
  open: boolean
  onClose: () => void
}

/** "More Info" dialog from the hero: the at-a-glance recruiter summary. */
export default function MoreInfoModal({ open, onClose }: MoreInfoModalProps) {
  // Close first (restores page scroll), then scroll on the next tick.
  // scrollIntoView() with no options follows the CSS scroll-behavior, so it's
  // smooth normally and instant for reduced-motion users.
  const startWatching = () => {
    onClose()
    setTimeout(() => document.getElementById('seasons')?.scrollIntoView(), 0)
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="more-info-title">
      {/* Banner */}
      <div className="relative bg-[radial-gradient(ellipse_at_80%_0%,#e5091455_0%,transparent_60%),linear-gradient(to_bottom,#1f1f1f,#141414)] px-6 pt-12 pb-6 sm:px-10 sm:pt-16">
        <p className="text-xs font-bold tracking-[0.35em] text-muted uppercase">Series</p>
        <h2 id="more-info-title" className="mt-1 text-3xl font-black uppercase sm:text-5xl">
          {profile.name}
        </h2>
        <p className="mt-2 text-lg font-semibold">{profile.title}</p>
        <button
          type="button"
          onClick={startWatching}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 font-bold text-black transition hover:bg-white/75"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
          </svg>
          Watch Seasons
        </button>
      </div>

      <div className="grid gap-8 px-6 pt-4 pb-8 sm:px-10 md:grid-cols-[1.6fr_1fr]">
        {/* Left: synopsis */}
        <div>
          <p className="text-sm text-muted">
            <span className="font-semibold text-emerald-400">{profile.yearsOfExperience} years</span> ·{' '}
            {profile.location}
          </p>
          <p className="mt-3 text-foreground/90">{profile.summary}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {profile.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: quick facts */}
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-subtle">Seasons</dt>
            <dd>
              <ul className="mt-1 space-y-1">
                {[...seasons].reverse().map((s) => (
                  <li key={s.company}>
                    <span className="font-semibold">{s.company}</span>
                    <span className="text-muted"> · {s.role}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          {education.map((e) => (
            <div key={e.school}>
              <dt className="text-subtle">Education</dt>
              <dd className="mt-1">
                <span className="font-semibold">{e.degree}</span>
                <span className="block text-muted">
                  {e.school} · {e.graduation}
                </span>
              </dd>
            </div>
          ))}
          <div>
            <dt className="text-subtle">Genres</dt>
            <dd className="mt-1">{profile.domains.join(', ')}</dd>
          </div>
          <div>
            <dt className="text-subtle">Contact</dt>
            <dd className="mt-1 space-y-1">
              <a href={`mailto:${contact.email}`} className="block break-all text-foreground underline-offset-4 hover:underline">
                {contact.email}
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground underline-offset-4 hover:underline"
              >
                LinkedIn ↗
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </Modal>
  )
}
