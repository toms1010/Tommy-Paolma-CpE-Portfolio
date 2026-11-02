import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Info, Layers, Target } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import type { Project, ProjectCategory } from '../types/portfolio';
import { asset } from '../lib/asset';
import { resolveProject } from './index';
import type { ProjectId } from './index';

/**
 * Project navigation ordering.
 *
 * Projects are ordered by appearance in src/data/portfolio.ts. Every project
 * gets exactly one dedicated page, and the Previous/Next links follow this
 * order so they never point at a missing page.
 */
const PROJECT_ORDER = PROJECTS.map((p) => p.projectId as ProjectId);

function getAdjacentProjects(currentId: ProjectId): {
  prevId: ProjectId | null;
  nextId: ProjectId | null;
} {
  const index = PROJECT_ORDER.indexOf(currentId);
  return {
    prevId: index > 0 ? PROJECT_ORDER[index - 1] : null,
    nextId: index < PROJECT_ORDER.length - 1 ? PROJECT_ORDER[index + 1] : null,
  };
}

function categoryLabel(category: ProjectCategory): string {
  const labels: Record<ProjectCategory, string> = {
    web: 'Web Application',
    game: 'Game',
    registration: 'Registration System',
    orders: 'Order / Management System',
    events: 'Events & Scoring System',
    desktop: 'Desktop Application',
  };
  return labels[category];
}

function categoryLabelAll(project: Project): string {
  if (project.categories.length === 1) return categoryLabel(project.categories[0]);
  return project.categories.map(categoryLabel).join(' · ');
}

function ProjectLinks({
  project,
}: {
  project: (typeof PROJECTS)[number];
}): React.JSX.Element | null {
  const links: React.JSX.Element[] = [];

  if (project.demo) {
    links.push(
      <a
        key="demo"
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} live demo (opens in a new tab)`}
        className="btn-primary min-h-11 px-5 py-2.5 text-sm"
      >
        Live Demo <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
      </a>
    );
  }

  if (project.github) {
    links.push(
      <a
        key="github"
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
        className="btn-outline min-h-11 px-5 py-2.5 text-sm"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
        Source
      </a>
    );
  }

  if (links.length === 0) return null;

  return <div className="mt-4 flex flex-wrap gap-3">{links}</div>;
}

function ScreenshotGrid({
  project,
}: {
  project: (typeof PROJECTS)[number];
}): React.JSX.Element | null {
  const screenshots = project.screenshots;
  if (!screenshots || screenshots.length === 0) return null;

  return (
    <section aria-label={`${project.title} screenshots`}>
      <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
        <Layers className="h-5 w-5 text-accent" aria-hidden="true" />
        Screenshots
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {screenshots.map((shot) => (
          <figure key={shot.src} className="overflow-hidden rounded-xl border border-line bg-card">
            <img
              src={asset(shot.src)}
              alt={shot.alt}
              loading="lazy"
              width={640}
              height={400}
              className="h-40 w-full object-cover object-top"
            />
            <figcaption className="px-3 py-2 text-center text-xs text-muted">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function ProjectDetail(): React.JSX.Element {
  const params = useParams();
  const id = params.projectId ?? '';
  const project = resolveProject(id);

  if (!project) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-3xl font-bold text-ink">Project not found</h1>
        <p className="mt-4 text-muted">The project you are looking for does not exist.</p>
        <Link to="/projects" className="btn-primary mt-6">
          Back to Projects
        </Link>
      </div>
    );
  }

  const { prevId, nextId } = getAdjacentProjects(project.projectId as ProjectId);

  return (
    <section aria-labelledby="project-detail-heading" className="scroll-mt-24 py-16">
      <h1 id="project-detail-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
        {project.title}
      </h1>

      <p className="mt-2 text-sm font-bold tracking-[0.2em] text-muted uppercase">
        {categoryLabelAll(project)}
      </p>

      <p className="mt-4 max-w-3xl text-muted">{project.description}</p>

      {/* Header: screenshot + links */}
      <div className="mt-8">
        <figure className="overflow-hidden rounded-3xl border border-line bg-card shadow-xl">
          <img
            src={asset(project.image)}
            alt={project.imageAlt}
            loading="lazy"
            width={1280}
            height={720}
            className="aspect-video w-full object-cover object-center"
          />
        </figure>
        <ProjectLinks project={project} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Overview */}
        <div>
          <h2 className="text-2xl font-bold text-ink">Overview</h2>
          <p className="mt-3 text-muted">{project.description}</p>

          {project.problem && (
            <div className="mt-6 rounded-2xl border border-line bg-card p-5">
              <h3 className="flex items-center gap-2 font-bold text-ink">
                <Target className="h-5 w-5 text-accent" aria-hidden="true" />
                Problem
              </h3>
              <p className="mt-2 text-sm text-muted">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className="mt-6 rounded-2xl border border-line bg-card p-5">
              <h3 className="flex items-center gap-2 font-bold text-ink">
                <Target className="h-5 w-5 text-accent" aria-hidden="true" />
                Solution
              </h3>
              <p className="mt-2 text-sm text-muted">{project.solution}</p>
            </div>
          )}

          {project.role && (
            <div className="mt-6 rounded-2xl border border-line bg-card p-5">
              <h3 className="flex items-center gap-2 font-bold text-ink">
                <Info className="h-5 w-5 text-accent" aria-hidden="true" />
                My Role
              </h3>
              <p className="mt-2 text-sm text-muted">{project.role}</p>
            </div>
          )}

          {project.objectives && project.objectives.length > 0 && (
            <div className="mt-6">
              <h3 className="flex items-center gap-2 font-bold text-ink">
                <Target className="h-5 w-5 text-accent" aria-hidden="true" />
                Objectives
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {project.objectives.map((obj) => (
                  <li key={obj} className="flex list-disc pl-5">
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-bold text-ink">Key Features</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.highlights?.map((highlight) => (
              <div key={highlight.title} className="rounded-2xl border border-line bg-card p-5">
                <p className="text-sm font-semibold text-accent">{highlight.title}</p>
                <p className="mt-1 text-sm text-muted">{highlight.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology stack */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Technology Stack</h2>
        <p className="mt-2 text-muted">Actual technologies used in this project.</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold text-muted uppercase">Programming Languages</h3>
            <ul className="mt-2 text-sm text-muted">
              {project.technologies.map((tech) => (
                <li key={tech} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-muted uppercase">Frameworks &amp; Libraries</h3>
            <ul className="mt-2 text-sm text-muted">
              {project.technologies.map((tech) => (
                <li key={tech} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Screenshots</h2>
        <p className="mt-2 text-muted">Real screenshots captured from the running application.</p>
        <ScreenshotGrid project={project} />
      </div>

      {/* Links */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Project Links</h2>
        <ProjectLinks project={project} />
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Link to="/projects" className="btn-outline min-h-11 px-5 py-2.5 text-sm">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to All Projects
        </Link>
        {prevId && nextId ? (
          <>
            <Link to={`/projects/${prevId}`} className="btn-outline min-h-11 px-5 py-2.5 text-sm">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </Link>
            <Link to={`/projects/${nextId}`} className="btn-outline min-h-11 px-5 py-2.5 text-sm">
              Next
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </>
        ) : prevId ? (
          <Link to={`/projects/${prevId}`} className="btn-outline min-h-11 px-5 py-2.5 text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </Link>
        ) : nextId ? (
          <Link to={`/projects/${nextId}`} className="btn-outline min-h-11 px-5 py-2.5 text-sm">
            Next
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </section>
  );
}
