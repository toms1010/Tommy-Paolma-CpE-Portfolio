import { ExternalLink, Layers, Search, Grid } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function PeriodicTable(): React.JSX.Element {
  return (
    <section
      id="project-periodic-table"
      aria-labelledby="periodic-table-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <p className="mb-3 text-center text-xs font-bold tracking-[0.25em] text-muted">
          CASE STUDY / FEATURED PROJECT
        </p>
        <SectionHeading id="periodic-table-heading" accent="Elements">
          Periodic Table Explorer
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          An interactive, searchable periodic table of the elements with group color-coding, element
          property details, and a mobile-friendly layout — built as a clean educational reference
          for students and chemistry enthusiasts.
        </p>

        <ul
          aria-label="Project badges"
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          <li className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            Featured Project
          </li>
          <li className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            Web Application
          </li>
          <li className="rounded-full border border-line bg-card px-3 py-1 text-xs font-bold text-muted">
            Educational
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://peroidic-table.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Periodic Table Explorer (opens in a new tab)"
            className="btn-primary min-h-11 px-6 py-2.5 text-sm"
          >
            Live Demo <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
          <a
            href="#projects"
            aria-label="Back to projects section"
            className="btn-outline min-h-11 px-6 py-2.5 text-sm"
          >
            <Grid className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
        </div>

        {/* Live preview */}
        <figure className="mx-auto mt-8 sm:mt-10 max-w-4xl overflow-hidden rounded-3xl border border-line bg-card shadow-xl">
          <div className="flex items-center gap-2 border-b border-line bg-black/5 px-4 py-3 dark:bg-black/25">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </span>
            <span className="ml-2 min-w-0 flex-1 truncate rounded-lg bg-page px-3 py-1 font-mono text-xs text-muted">
              periodic-table
            </span>
          </div>
          <img
            src="https://peroidic-table.vercel.app/"
            alt="Periodic Table Explorer live preview"
            loading="lazy"
            width={1280}
            height={720}
            className="h-auto w-full max-w-[700px] sm:max-w-[900px] mx-auto object-cover object-center"
          />
          <figcaption className="border-t border-line px-4 py-3 text-center text-xs text-muted">
            Live preview of the Periodic Table Explorer web app
          </figcaption>
        </figure>

        {/* Features */}
        <h3 className="mt-10 sm:mt-12 text-center text-2xl font-extrabold">Project Features</h3>
        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Search & Filter',
              body: 'Search elements by name or symbol; filter by group (alkali metals, halogens, noble gases, and more).',
            },
            {
              title: 'Element Details',
              body: 'View atomic number, atomic mass, electron configuration, and category for each element.',
            },
            {
              title: 'Responsive Design',
              body: 'Mobile-friendly layout that works on phones, tablets, and desktops.',
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-line bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-5 w-5 text-accent" aria-hidden="true" />
                <h4 className="text-xl font-bold">{feature.title}</h4>
              </div>
              <p className="text-sm text-muted">{feature.body}</p>
            </article>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-10 sm:mt-12">
          <h3 className="text-center text-2xl font-extrabold">Technology Stack</h3>
          <p className="mt-2 text-center text-muted">
            Built with vanilla web technologies for fast, reliable performance.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA + nav */}
        <div className="mt-10 sm:mt-12 rounded-3xl bg-gradient-to-br from-accent to-highlight p-6 text-center text-white sm:p-10">
          <h3 className="text-2xl font-extrabold">Explore the Elements</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/85">
            Browse the full periodic table, search for elements, and explore group properties in one
            interactive web app.
          </p>
          <a
            href="https://peroidic-table.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Periodic Table Explorer (opens in a new tab)"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 transition-transform hover:-translate-y-0.5"
          >
            Open Live Demo <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
        </div>

        <nav
          aria-label="Project navigation"
          className="mt-6 sm:mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            aria-label="Back to projects section"
            className="btn-outline min-h-11 w-full px-5 py-2.5 text-sm sm:w-auto"
          >
            <Grid className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#project-wit-barcode"
              aria-label="Previous project: WIT Barcode"
              className="btn-outline min-h-11 px-5 py-2.5 text-sm"
            >
              Previous Project
            </a>
          </div>
        </nav>
      </Reveal>
    </section>
  );
}
