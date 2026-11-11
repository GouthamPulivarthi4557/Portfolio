import { motion } from 'motion/react'
import { impactHighlights } from '../data/portfolio'

/**
 * "Top 4" impact row: a ranked, chart-style row of measurable results, with a
 * giant outlined rank number behind each card. Only in the Hiring Manager order.
 */
export default function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="page-gutter py-10 sm:py-14">
      <h2 id="impact-title" className="row-title flex items-baseline gap-3">
        <span className="rounded-sm bg-accent px-1.5 py-0.5 text-xs font-black tracking-wider text-white">TOP 4</span>
        Impact Highlights
      </h2>
      <p className="-mt-1 mb-5 text-sm text-muted">Measured results from my resume, ranked by size.</p>

      {/* Ordered list: the rank is meaningful, so screen readers announce "1 of 4" etc. */}
      {/* -mx-4/px-4 lets the row scroll edge-to-edge on phones while the first card
          still lines up with the page gutter. scroll-px-4 is needed too: snapping
          aligns items to the scroll-padding edge, not the padding edge. */}
      <ol className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:scroll-px-0 sm:gap-4 sm:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible">
        {impactHighlights.map((item, i) => (
          <motion.li
            key={`${item.company}-${item.value}`}
            className="flex shrink-0 snap-start flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="group flex items-end">
              {/* Rank numeral: outlined, sits behind the card's left edge */}
              <span
                aria-hidden="true"
                className="-mr-5 text-[8.5rem] leading-[0.75] font-black tracking-[-0.08em] text-background select-none [-webkit-text-stroke:3px_#5c5c5c] sm:text-[10rem] lg:-mr-6 lg:text-[11rem]"
              >
                {i + 1}
              </span>

              {/* Poster card */}
              <div className="relative flex aspect-[2/3] w-32 flex-col justify-between overflow-hidden rounded-md bg-[radial-gradient(ellipse_at_30%_0%,#e5091440_0%,transparent_60%),linear-gradient(160deg,#262626,#111)] p-3 shadow-xl shadow-black/60 ring-1 ring-white/10 transition duration-300 group-hover:-translate-y-1 group-hover:ring-white/30 sm:w-40 sm:p-4">
                <span className="self-start rounded-sm bg-black/50 px-1.5 py-0.5 text-[0.65rem] font-bold tracking-widest text-muted uppercase">
                  {item.company}
                </span>
                <div>
                  <p className="text-4xl leading-none font-black text-foreground sm:text-5xl">
                    <span className="text-2xl text-accent sm:text-3xl" aria-hidden="true">
                      ~
                    </span>
                    <span className="sr-only">approximately </span>
                    {item.value}%
                  </p>
                  <p className="mt-2 text-sm leading-tight font-semibold text-foreground/90 sm:text-base">
                    {item.headline}
                  </p>
                </div>
                <span className="text-[0.7rem] text-subtle">{item.tech}</span>
              </div>
            </div>
            <p className="mt-3 max-w-60 text-xs leading-snug text-subtle">{item.detail}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
