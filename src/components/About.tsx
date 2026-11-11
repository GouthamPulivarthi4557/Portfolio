import { motion } from 'motion/react'
import { education, profile, seasons } from '../data/portfolio'

const totalEpisodes = seasons.reduce((n, s) => n + s.episodes.length, 0)

/** "About" section: the synopsis, highlights, and quick facts. */
export default function About() {
  const facts = [
    { label: 'Experience', value: `${profile.yearsOfExperience} years` },
    { label: 'Based in', value: profile.location },
    { label: 'Domains', value: profile.domains.join(' · ') },
    { label: 'Career so far', value: `${seasons.length} seasons · ${totalEpisodes} episodes` },
  ]

  return (
    <section id="about" aria-labelledby="about-title" className="page-gutter py-12 sm:py-16">
      <motion.div
        className="grid gap-10 lg:grid-cols-[1.5fr_1fr]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <h2 id="about-title" className="row-title">
            About
          </h2>
          <p className="max-w-2xl text-lg text-foreground/90">{profile.summary}</p>
          <ul className="mt-6 max-w-2xl space-y-3 text-muted">
            {profile.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-lg bg-surface-raised p-6 ring-1 ring-white/5">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm lg:grid-cols-1">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-subtle">{f.label}</dt>
                <dd className="mt-0.5 font-semibold text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
          {education.map((e) => (
            <div key={e.school} className="mt-6 border-t border-border pt-5 text-sm">
              <p className="text-subtle">Education</p>
              <p className="mt-0.5 font-semibold">{e.degree}</p>
              <p className="text-muted">
                {e.school} · {e.graduation}
              </p>
            </div>
          ))}
        </aside>
      </motion.div>
    </section>
  )
}
