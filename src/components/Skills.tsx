import { motion } from 'motion/react'
import { seasons, skillCategories } from '../data/portfolio'
import { projectArt } from './projectArt'
import ScrollRow from './ScrollRow'

/** Searchable text of every career episode: the resume bullet plus its tech tags. */
const episodeTexts = seasons.flatMap((s) => s.episodes.map((e) => `${e.description} ${e.tech.join(' ')}`))

/**
 * How many career "episodes" (resume bullets) mention a skill. This turns the
 * skills list into evidence: a tile can say "6 episodes" instead of only
 * naming the technology.
 *
 * Whole-word, case-insensitive match, so "Java" doesn't count "JavaScript" and
 * "SQL" doesn't count "PostgreSQL". Version suffixes are dropped ("Java 8+" → "Java").
 */
function countEpisodes(skill: string): number {
  // Only strip a *separate* version ("Java 8+"), not one that's part of the name ("HTML5").
  const term = skill.replace(/\s+\d+\+?$/, '').replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
  const pattern = new RegExp(`(?<![\\w-])${term}(?![\\w-])`, 'i')
  return episodeTexts.filter((text) => pattern.test(text)).length
}

// Computed once at module load, not on every render.
const episodeUsage = new Map(skillCategories.flatMap((c) => c.skills).map((s) => [s, countEpisodes(s)]))

/** Skills as genre-style rows, one per resume category. */
export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="page-gutter py-12 sm:py-16">
      <h2 id="skills-title" className="row-title mb-1">
        Skills
      </h2>
      <p className="text-sm text-muted">
        Browse by genre. <span className="text-foreground/80">Episode badges</span> count how many of my career episodes used
        that skill.
      </p>

      <div className="mt-6 space-y-4 sm:space-y-6">
        {skillCategories.map((category, rowIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 id={`skills-${category.id}`} className="flex items-baseline gap-2 text-base font-semibold sm:text-lg">
              {category.title}
              <span className="text-xs font-normal text-subtle">{category.skills.length}</span>
            </h3>

            <ScrollRow label={category.title} focusable className="gap-2 py-3 sm:gap-3">
              {category.skills.map((skill) => {
                const uses = episodeUsage.get(skill) ?? 0
                return (
                  <li
                    key={skill}
                    className={`relative flex aspect-video w-36 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-md p-3 ring-1 ring-white/10 transition duration-300 ease-cinematic hover:z-10 hover:scale-105 hover:ring-white/40 sm:w-44 ${projectArt(rowIndex)}`}
                  >
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                    {uses > 0 && (
                      <span className="absolute top-2 right-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[0.6rem] font-bold text-emerald-300">
                        {uses} {uses === 1 ? 'episode' : 'episodes'}
                      </span>
                    )}
                    <span className="relative text-sm leading-tight font-bold text-white sm:text-base">{skill}</span>
                  </li>
                )
              })}
            </ScrollRow>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
