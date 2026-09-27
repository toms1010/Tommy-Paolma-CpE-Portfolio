# Tommy Paolma | Computer Engineering Portfolio

**Live:** https://tommy-paolma-cpe-portfolio.vercel.app/

Personal portfolio website of **Tommy Paolma**, a Computer Engineering student and
aspiring software engineer. Showcases 7 deployed event-management web apps,
18 certifications, mentoring/competition experience, and contact details.

## Featured projects

### Windows vs Linux Academy

Interactive operating-system learning platform covering Windows, macOS, Linux,
kernels, system architecture, commands, interactive labs, quizzes, and backend
engineering.

- **Purpose:** turn OS concepts from static documentation into an interactive
  learning experience (comparisons, simulations, quizzes, visual explanations,
  hands-on labs).
- **Main features:** OS overviews & comparisons, kernel/architecture lessons,
  evolution timeline, 5 interactive labs (permissions, CPU scheduling, virtual
  memory, filesystem explorer, system calls), Linux terminal simulator with
  guided debugging scenarios, 30-question quiz, backend roadmap, learning hub,
  sign-in/sign-up/profile pages, site search.
- **Technology stack:** Next.js (Pages Router, static export), React,
  JavaScript, CSS — deployed on Vercel. No external backend/database detected;
  simulators, terminal, and quiz run client-side in the browser.
- **Screenshots:** real captures from the deployed site live in
  `public/images/wla-*.jpg` (desktop pages + a 390px mobile capture).
- **Development challenges:** responsive navigation across ~29 routes,
  converting OS theory into interactive modules, a deterministic CPU scheduling
  engine with Gantt chart + metrics, information architecture for 8 content
  groups, static-export performance.
- **My contribution:** sole developer — design, build, deploy.
- **Live Demo:** https://windows-linux-academy.vercel.app/
- **Portfolio case study:** `#project-windows-linux-academy` section in
  `src/components/WindowsLinuxAcademy.tsx` (linked from the project card via
  “View Project”).

## Pages

| Page | File |
|------|------|
| Home (hero, about, services, skills, education, experience, contact) | `index.html` |
| All projects with category filtering | `projects.html` |
| All 18 certifications | `certifications.html` |
| Printable resume (Print / Save as PDF) | `resume.html` |
frequently asked questions
## Stack

Plain **HTML + CSS + vanilla JS** (no build step), `particles.js` background,
Font Awesome icons, Inter font. Deployable as-is to GitHub Pages.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

## Notes

- The contact form is intentionally backend-free: it validates input and opens
  the visitor's email app via `mailto:` — it does not send mail from a server.
- Skill listings are evidence-based (certifications, coursework, shipped apps);
  no invented experience, employers, or proficiency percentages.
- See `robots.txt` / `sitemap.xml` for SEO basics.
