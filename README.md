# Goutham Pulivarthi — Portfolio

A streaming-service-inspired personal portfolio for a Java Full Stack Developer.

**Live site: [gouthampulivarthi.vercel.app](https://gouthampulivarthi.vercel.app)**

Deployed on Vercel; every push to `main` redeploys automatically.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion

## Run locally

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
npm run lint      # lint with oxlint
```

## Structure

- `src/data/portfolio.ts` — single source of truth for all resume content
- `src/components/` — UI sections (Navbar, Hero, Seasons, Originals, Skills, Contact)
