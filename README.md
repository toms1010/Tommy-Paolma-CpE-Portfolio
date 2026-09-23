# Tommy Paolma | Computer Engineering Portfolio

Personal portfolio website of **Tommy Paolma**, a Computer Engineering student and
aspiring software engineer. Showcases 7 deployed event-management web apps,
18 certifications, mentoring/competition experience, and contact details.

## Stack

**TypeScript · React 19 · Vite 8 · Tailwind CSS 4** — plus ESLint 10, Prettier,
and a canvas particle field + inline SVG icons (no icon/CDN libraries).

Single-page app with anchored sections: Hero, About, Projects (filterable),
Skills, Education, Experience, Certifications, Resume (printable), Contact.

## Scripts

```bash
npm install        # install dependencies
npm run dev        # start dev server
npm run typecheck  # tsc -b, no emit
npm run lint       # eslint
npm run format     # prettier --write
npm run build      # typecheck + production build to dist/
npm run preview    # preview the production build
```

Requires Node `^20.19.0 || >=22.12.0`.

## Deploy

Static output in `dist/`. The Vite `base` is set to `/Tommy-Paolma-CpE-Portfolio/`
for GitHub Pages project-site hosting.

## Notes

- The contact form is intentionally backend-free: it validates input and opens
  the visitor's email app via `mailto:` — it does not send mail from a server.
- Skill listings are evidence-based (certifications, coursework, shipped apps);
  no invented experience, employers, or proficiency percentages.
- Theme defaults to dark, follows the OS preference on first visit, and persists
  the manual choice in `localStorage` (no flash of the wrong theme).
