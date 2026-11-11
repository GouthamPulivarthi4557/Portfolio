import { contact, profile } from '../data/portfolio'

// Read once at module load: render functions should be pure (same input → same output).
const YEAR = new Date().getFullYear()

/** End credits. */
export default function Footer() {
  return (
    <footer className="page-gutter border-t border-border py-8 text-xs text-subtle">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {YEAR} {profile.name}. Designed and built with React, TypeScript, Tailwind CSS and Motion.
        </p>
        <nav aria-label="Footer" className="flex gap-4">
          <a href={`mailto:${contact.email}`} className="transition hover:text-foreground">
            Email
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition hover:text-foreground">
            LinkedIn
          </a>
          <a href="#home" className="transition hover:text-foreground">
            Back to top ↑
          </a>
        </nav>
      </div>
      <p className="mt-3 text-subtle/80">
        A personal portfolio inspired by streaming-service interfaces. Not affiliated with or endorsed by any streaming
        service.
      </p>
    </footer>
  )
}
