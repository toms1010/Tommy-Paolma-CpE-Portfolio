import { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { GITHUB_PROFILE, PROJECTS } from '../data/portfolio';
import type { Project, ProjectCategory } from '../types/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SocialGlyph } from './icons';

const FILTERS: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'game', label: 'Game' },
  { value: 'registration', label: 'Registration' },
  { value: 'orders', label: 'Orders' },
  { value: 'events', label: 'Events & Scoring' },
];

function projectImage(project: Project): string {
  return project.imageLocal ? asset(project.image) : project.image;
}

function ProjectLinks({ project }: { project: Project }): React.JSX.Element | null {
  if (!project.demo && !project.github) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo (opens in a new tab)`}
          className="btn-primary min-h-11 px-5 py-2.5 text-sm"
        >
          Live Demo <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
        </a>
      ) : null}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
          className="btn-outline min-h-11 px-5 py-2.5 text-sm"
        >
          <SocialGlyph icon="github" className="h-4 w-4" /> GitHub
        </a>
      ) : null}
    </div>
  );
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
          className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function FeaturedCard({
  project,
  flip,
}: {
  project: Project;
  flip: boolean;
}): React.JSX.Element {
  return (
    <article
      aria-label={`Featured project: ${project.title}`}
      className="grid overflow-hidden rounded-3xl border border-accent/30 bg-card transition-all duration-300 hover:border-accent hover:shadow-xl md:grid-cols-2"
    >
      <img
        src={projectImage(project)}
        alt={project.imageAlt}
        loading="lazy"
        width={640}
        height={400}
        className={`h-56 w-full object-cover sm:h-72 md:h-full md:min-h-80 ${flip ? 'md:order-2' : ''}`}
      />
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-accent uppercase">
          <Star className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
          {project.kicker}
        </p>
        <h3 className="text-2xl font-extrabold">{project.title}</h3>
        {project.role ? (
          <p className="mt-1 text-sm font-semibold text-muted">My role: {project.role}</p>
        ) : null}
        <p className="mt-3 text-muted">{project.description}</p>
        <TechBadges project={project} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }): React.JSX.Element {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl">
      <img
        src={projectImage(project)}
        alt={project.imageAlt}
        loading="lazy"
        width={400}
        height={160}
        className="h-40 w-full bg-white object-contain"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-xs font-bold tracking-wider text-accent uppercase">
          {project.kicker}
        </p>
        <h3 className="text-lg font-bold">{project.title}</h3>
        <p className="mt-2 text-sm text-muted">{project.description}</p>
        {project.problem && project.solution ? (
          <p className="mt-2 text-sm text-muted">
            <strong className="text-ink">Problem:</strong> {project.problem}{' '}
            <strong className="text-ink">Solution:</strong> {project.solution}
          </p>
        ) : null}
        <TechBadges project={project} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export function Projects(): React.JSX.Element {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const matches = (p: Project): boolean => filter === 'all' || p.categories.includes(filter);
  const featured = PROJECTS.filter((p) => p.featured && matches(p));
  const more = PROJECTS.filter((p) => !p.featured && matches(p));
  const visibleCount = featured.length + more.length;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="projects-heading" accent="Projects">
          Featured
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Things I&apos;ve built — current featured work plus event-management web apps deployed
          for real registrations, orders, and scoreboards.
        </p>

        {featured.length > 0 ? (
          <div className="mt-10 flex flex-col gap-6" aria-label="Featured projects">
            {featured.map((project, i) => (
              <FeaturedCard key={project.title} project={project} flip={i % 2 === 1} />
            ))}
          </div>
        ) : null}

        <h3 className="mt-12 text-center text-xl font-bold">More Projects</h3>
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => {
                setFilter(f.value);
              }}
              aria-pressed={filter === f.value}
              className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                filter === f.value
                  ? 'border-accent bg-accent/15 text-accent'
                  : 'border-line bg-card text-ink hover:border-accent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-6 text-center text-sm text-muted">
          Showing {visibleCount} of {PROJECTS.length} projects.
        </p>
        {more.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((project) => (
              <ProjectCard key={project.title} project={project} />
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
      </Reveal>
    </section>
  );
}
