# Reyhan Dwi Saputra — Portfolio

Personal portfolio for **Reyhan Dwi Saputra**, Software Engineer (Backend & Flutter), Information Technology, Politeknik Negeri Padang.

The site has a single-page portfolio (Hero, Selected Works, Approach, Technical Arsenal, Education & Journey, Contact) and a case-study page for each published project at `/projects/[slug]`. All content comes from typed data files, so updating the portfolio rarely means touching UI code.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components, Turbopack)
- React 19 and TypeScript (strict mode)
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- [Motion for React](https://motion.dev) for the project filter and mobile menu
- [Lucide React](https://lucide.dev) icons
- `next/font` (Space Grotesk, Inter, IBM Plex Mono), `next/image`, `next/og`
- Deployment target: Vercel

## Requirements

- Node.js 20.9 or newer (developed on Node 24)
- npm

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Development server                                   |
| `npm run build`     | Production build                                     |
| `npm run start`     | Serve the production build                           |
| `npm run lint`      | ESLint (flat config, `eslint-config-next`)           |
| `npm run typecheck` | Generate route types, then `tsc --noEmit`            |
| `npm run check`     | Lint, typecheck, and build in one go                 |

## Project structure

```
src/
  app/
    layout.tsx               Root layout, fonts, global metadata
    page.tsx                 Home page (all sections) + Person JSON-LD
    globals.css              Design tokens, base styles, animations
    not-found.tsx            404 page
    icon.svg                 Favicon
    opengraph-image.tsx      Social card for the home page
    sitemap.ts, robots.ts
    projects/[slug]/
      page.tsx               Case-study route
      opengraph-image.tsx    Social card per project
  proxy.ts                   Returns a real 404 for unknown project slugs
  components/
    layout/                  Navbar, footer
    sections/                One file per home-page section
    hero/terminal.tsx        Interactive terminal (fixed command list)
    projects/                Cards, filter, cover, diagrams, case-study layout
    contact/                 Copy-to-clipboard button
    ui/                      Button, container, section heading, reveal, icons
  data/
    site-config.ts           Name, bio, education, email, social links, CV path
    projects.ts              Projects and case studies
    skills.ts                Skill groups
    journey.ts               Timeline and certifications
  lib/                       URL helpers, contact links, OG image renderer
  types/project.ts           Project and case-study types
public/
  documents/cv.pdf           Downloadable CV
  images/projects/           Project screenshots
```

## Updating content

### Profile, links, and CV — `src/data/site-config.ts`

- `email`, `social.github`, `social.linkedin`: set a URL to show it everywhere (hero, contact, footer, terminal). `null` hides it.
- `education.status`: `"graduate"` or `"student"`. Controls the hero label and the timeline period.
- `education.graduationYear`: set once official, e.g. `"2027"`.
- `availability.enabled`: shows an "open to work" badge in the hero.
- `cvPath`: path inside `public/`. Set to `null` to hide every Download CV button (the hero then says "CV available on request").

### Projects — `src/data/projects.ts`

Each project has a `slug`, `published` flag, `categories` (`backend`, `mobile`, `software-engineering`), card fields, and a `caseStudy` object. Every case-study field is optional; the page only renders sections that have content.

To add a project:

1. Copy an existing entry and give it a unique `slug`.
2. Fill in what you can verify. Leave unknown fields out instead of writing placeholders.
3. Set `published: true`.

Filters only appear for categories that have at least one published project, so adding a Flutter project with `categories: ["mobile"]` makes the **Mobile** filter appear automatically. At least one project must stay published (Cache Components needs one static param for `/projects/[slug]`).

### Skills — `src/data/skills.ts`

Only skills with `confirmed: true` are shown. Add `evidence: "<project-slug>"` to link a skill to the project that proves it.

### Journey — `src/data/journey.ts`

`timeline` (newest first) and `certifications`. Leave `period` out when the date is unknown, and set `credentialUrl` to show a "View credential" link.

## Screenshots and CV

- **Screenshots:** put images in `public/images/projects/<slug>/` and reference them in `caseStudy.screenshots` with `width`, `height`, `alt`, and `device` (`"desktop"` or `"mobile"`). To use a screenshot as the card cover instead of the code excerpt, set `cover` to `{ type: "image", src, alt, width, height }`.
- **CV:** replace `public/documents/cv.pdf` (keep the name, or update `cvPath`). Visitors download it as `Reyhan-Dwi-Saputra-CV.pdf`. Remember that anything in `public/` is publicly downloadable.

## Environment variables

Copy `.env.example` to `.env.local` if you need to override the site URL locally.

| Variable   | Required | Purpose                                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------------------- |
| `SITE_URL` | No       | Production URL for metadata, canonical links, Open Graph, sitemap, and robots. Falls back to Vercel's production domain, then `http://localhost:3000`. |

There are no secrets in this project. Canonical URLs are only emitted when `SITE_URL` or a Vercel production domain is available.

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Build portfolio v1"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Create the empty repository on GitHub first (without a README, so the push does not conflict).

### 2. Import into Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New → Project**, then import the repository.
3. Vercel detects Next.js automatically. Keep the default build command (`next build`) and output settings.
4. Optional: add `SITE_URL` under **Settings → Environment Variables** if you use a custom domain.
5. Click **Deploy**.

Every push to `main` deploys to production, and every pull request gets a preview URL.

### 3. Custom domain (optional)

Add the domain in **Settings → Domains**, follow the DNS instructions, then set `SITE_URL` to the new domain and redeploy.

## Accessibility and performance notes

- Skip link, semantic landmarks, one `h1` per page, visible focus states, labelled icon buttons.
- Scroll reveals use CSS scroll-driven animations, so content is never hidden waiting for JavaScript, and browsers without support show it immediately.
- `prefers-reduced-motion` turns off reveals, typing, and transitions.
- Client JavaScript is limited to the navbar, terminal, project filter, and copy button. Everything else is a Server Component.
