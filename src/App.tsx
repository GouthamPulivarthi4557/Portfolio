import { MotionConfig } from 'motion/react'
import { useState, type ComponentType } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Impact from './components/Impact'
import Intro from './components/Intro'
import { IntroDoneContext } from './context/intro'
import { shouldPlayIntro } from './lib/introPolicy'
import Navbar from './components/Navbar'
import Originals from './components/Originals'
import ProfileGate from './components/ProfileGate'
import Seasons from './components/Seasons'
import Skills from './components/Skills'
import { useViewerProfile } from './context/viewerProfile'
import ViewerProfileProvider from './context/ViewerProfileProvider'
import type { SectionId } from './data/portfolio'

/**
 * Section id → component. Typing it as Record<SectionId, ...> means TypeScript
 * errors if a section is added to the data without a component here.
 */
const SECTION_COMPONENTS: Record<SectionId, ComponentType> = {
  home: Hero,
  impact: Impact,
  about: About,
  seasons: Seasons,
  originals: Originals,
  skills: Skills,
  contact: Contact,
}

function Page() {
  const { order, gateOpen } = useViewerProfile()
  // Decided once on first render: play the intro, or skip straight to the site.
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro())

  return (
    <IntroDoneContext.Provider value={introDone}>
      {/* `inert` makes everything behind an overlay (intro or gate) unfocusable
          and unclickable, a native replacement for a hand-written focus trap. */}
      <div inert={gateOpen || !introDone}>
        <Navbar />
        <main id="main">
          {order.map((id) => {
            const Section = SECTION_COMPONENTS[id]
            // Stable keys: React moves existing sections instead of remounting them.
            return <Section key={id} />
          })}
        </main>
        <Footer />
      </div>
      {/* Sequence: intro first, then "Who's watching?" (if this visitor needs it). */}
      {introDone ? <ProfileGate /> : <Intro onDone={() => setIntroDone(true)} />}
    </IntroDoneContext.Provider>
  )
}

function App() {
  return (
    // reducedMotion="user": Motion skips transform/layout animations for users
    // whose OS asks for reduced motion (opacity fades still run).
    <MotionConfig reducedMotion="user">
      <ViewerProfileProvider>
        <Page />
      </ViewerProfileProvider>
    </MotionConfig>
  )
}

export default App
