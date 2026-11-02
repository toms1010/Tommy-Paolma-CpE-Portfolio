import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GITHUB_PROFILE, PROJECTS } from '../data/portfolio';
import type { Project, ProjectCategory } from '../types/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Button } from './common/Button';
import { ProjectDetails } from './projects/ProjectDetails';

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  desktop: 'Desktop Applications',
  web: 'Web Applications',
  mobile: 'Mobile Applications',
  game: 'Game Development',
  electronics: 'Electronics & Embedded Systems',
  registration: 'Registration Systems',
  orders: 'Order Systems',
  events: 'Events & Scoring',
  other: 'Other Projects',
};

const FILTER_ORDER: ProjectCategory[] = [
  'desktop',
  'web',
  'mobile',
  'game',
  'electronics',
  'registration',
  'orders',
  'events',
  'other',
];

const FILTERS: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  ...FILTER_ORDER.map((cat) => ({ value: cat, label: CATEGORY_LABELS[cat] })),
];

function categoryLabel(category: ProjectCategory): string {
  return CATEGORY_LABELS[category];
}

function TechBadges({ project }: { project: Project }): React.JSX.Element {
  return (
    <ul
      aria-label={`Technologies used in ${project.title}`}
      className="mt-3 flex flex-wrap gap-1.5"
    >
      {project.technologies.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function projectImage(project: Project): string {
  return project.imageLocal ? asset(project.image) : project.image;
}

function ProjectCard({
  project,
  onReadMore,
}: {
  project: Project;
  onReadMore: (project: Project) => void;
}): React.JSX.Element {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl">
      <figure className="relative h-48 w-full overflow-hidden bg-black">
        <img
          src={projectImage(project)}
          alt={project.imageAlt}
          loading="lazy"
          width={640}
          height={360}
          className="aspect-video w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold text-white shadow-sm">
          {project.categories.map(categoryLabel).join(' · ')}
        </span>
      </figure>
      <div className="flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-ink">{project.title}</h3>
          <span className="text-[10px] font-bold tracking-wider text-accent uppercase">
            {project.categories.map(categoryLabel).join(' · ')}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted line-clamp-2">{project.description}</p>
        <TechBadges project={project} />
        <div className="mt-auto pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onReadMore(project);
            }}
            className="w-full"
          >
            Read More <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
          </Button>
          {project.demo && (
            <a
              key="demo"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo (opens in a new tab)`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-accent/90 mt-3"
            >
              Live Demo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
            </a>
          )}
          {project.github && (
            <a
              key="github"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-line bg-card px-4 py-2 text-xs font-bold text-ink transition-colors hover:border-accent hover:text-accent mt-3"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects(): React.JSX.Element {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [details, setDetails] = useState<Project | null>(null);
  const matches = (p: Project): boolean => filter === 'all' || p.categories.includes(filter);
  const filtered = PROJECTS.filter(matches);
  const featured = filtered.filter((p) => p.featured);
  const more = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 py-16">
      <Reveal>
        {/* Featured Projects */}
        <div className="mt-10" aria-label="Featured projects">
          <SectionHeading id="projects-heading" accent="Projects">
            Featured Projects
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            My strongest and most important projects — desktop applications, web applications, and
            educational tools I&apos;ve designed and built from the ground up.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.title} project={project} onReadMore={setDetails} />
            ))}
          </div>
        </div>

        {/* More Projects with category filtering */}
        <div className="mt-16">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => {
                  setFilter(f.value);
                }}
                aria-pressed={filter === f.value}
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === f.value
                    ? 'border-accent bg-accent/15 text-accent'
                    : 'border-line bg-card text-ink hover:border-accent'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p
            role="status"
            aria-live="polite"
            className="mb-6 min-h-6 text-center text-sm text-muted"
          >
            Showing {filtered.length} of {PROJECTS.length} projects.
          </p>

          {more.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((project) => (
                <ProjectCard key={project.title} project={project} onReadMore={setDetails} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-center text-muted">
              No projects in this category yet — try another filter.
            </p>
          )}

          <p className="mt-8 text-center text-muted">
            More code and experiments:{' '}
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              github.com/toms1010
            </a>
          </p>
        </div>

        {details !== null && (
          <ProjectDetails
            project={details}
            open
            onClose={() => {
              setDetails(null);
            }}
          />
        )}
      </Reveal>
    </section>
  );
}
