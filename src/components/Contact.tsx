import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { contact, seasons } from '../data/portfolio'

const nextSeason = seasons.length + 1

/**
 * "To Be Continued…" — the closing contact section. Email and LinkedIn only
 * (phone intentionally omitted).
 */
export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="page-gutter relative isolate overflow-hidden border-t border-border py-20 sm:py-28"
    >
      {/* Soft red glow from below, like end-credits lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-1/2 -z-10 mx-auto h-[120%] max-w-5xl rounded-full bg-[radial-gradient(ellipse_at_center,#e5091440_0%,transparent_65%)] blur-2xl"
      />

      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="contact-title" className="text-[clamp(2.25rem,6vw+0.5rem,4.5rem)] leading-none font-black tracking-tight uppercase italic">
          To Be Continued
          <AnimatedEllipsis />
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Season {nextSeason} hasn&rsquo;t been written yet. If your team is hiring a Java Full Stack Developer, let&rsquo;s
          talk about what it could look like.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-accent px-7 py-3 text-lg font-bold text-white transition hover:bg-accent-hover sm:w-auto"
          >
            <MailIcon />
            Email me
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-surface-hover/80 px-7 py-3 text-lg font-bold transition hover:bg-surface-hover/50 sm:w-auto"
          >
            <LinkedInIcon />
            Connect on LinkedIn
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <CopyEmail />

        {/* "Up next" card, like the next-episode prompt at the end of a show */}
        <div className="mx-auto mt-14 flex max-w-md items-center gap-4 rounded-lg bg-surface-raised/80 p-4 text-left ring-1 ring-white/10 backdrop-blur-sm">
          <div
            aria-hidden="true"
            className="grid aspect-video w-28 shrink-0 place-items-center rounded bg-[radial-gradient(ellipse_at_30%_20%,#e5091466_0%,transparent_60%),linear-gradient(135deg,#2a2a2a,#111)] text-2xl font-black text-white/80"
          >
            S{nextSeason}
          </div>
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold tracking-[0.25em] text-subtle uppercase">Up next</p>
            <p className="font-bold">Season {nextSeason}: Your Team</p>
            <p className="text-sm text-muted">Coming soon, pending your interview invite.</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/**
 * Ellipsis that types itself out dot by dot: a clipping box whose width steps
 * from 0 to 3 dots (see --animate-ellipsis in index.css). Its resting width is
 * the full "...", so with reduced motion it simply shows all three dots.
 */
function AnimatedEllipsis() {
  return (
    <>
      <span
        aria-hidden="true"
        className="inline-block w-[1.1em] animate-ellipsis overflow-hidden text-left align-baseline whitespace-nowrap"
      >
        ...
      </span>
      <span className="sr-only">…</span>
    </>
  )
}

/** Shows the address and copies it, for people who don't use a mail client. */
function CopyEmail() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setStatus('copied')
    } catch {
      // Clipboard API needs a secure context and permission; fall back to telling the user.
      setStatus('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted">
      <span className="break-all text-foreground/85">{contact.email}</span>
      <button
        type="button"
        onClick={copy}
        className="rounded px-2 py-0.5 text-xs font-semibold text-muted underline-offset-4 ring-1 ring-border transition hover:text-foreground hover:ring-muted"
      >
        Copy
      </button>
      {/* aria-live announces the result to screen readers */}
      <span aria-live="polite" className={`min-w-16 text-xs ${status === 'failed' ? 'text-amber-300' : 'text-emerald-400'}`}>
        {status === 'copied' ? 'Copied!' : status === 'failed' ? 'Copy failed: select the address above' : ''}
      </span>
    </p>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.95 1.3-1.95 2.66v5.14h-4v-11Z" />
    </svg>
  )
}
