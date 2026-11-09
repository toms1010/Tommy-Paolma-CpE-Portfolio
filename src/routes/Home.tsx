import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, TYPING_ROLES } from '../data/portfolio';
import { asset } from '../lib/asset';
import { useTyping } from '../hooks/useTyping';
import { CircuitBackdrop } from '../components/CircuitBackdrop';
import { CpuVisual } from '../components/CpuVisual';
import { Reveal } from '../components/Reveal';
import { UiIcon } from '../components/icons';
import { ProjectImage } from '../components/common/ProjectImage';
import { PROJECTS } from '../data/portfolio';
import type { Project } from '../types/portfolio';
import { ArrowRight } from 'lucide-react';

const TECH_BADGES = [
  'C',
  'C++',
  'C#',
  'Java',
  'Python',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'React',
];

function projectSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function FeaturedCard({ project }: { project: Project }): React.JSX.Element {
  const slug = projectSlug(project.title);

  return (
    <article
      id={`project-${slug}`}
      aria-label={`Featured project: ${project.title}`}
      className="grid scroll-mt-24 overflow-hidden rounded-3xl border border-accent/30 bg-card transition-all duration-300 hover:border-accent hover:shadow-xl md:grid-cols-2"
    >
      <ProjectImage
        src={project.imageLocal ? asset(project.image) : project.image}
        alt={project.imageAlt}
        width={640}
        height={360}
        className="aspect-video w-full object-cover object-center sm:aspect-[16/9] md:aspect-auto md:h-full md:min-h-[320px]"
      />
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-accent uppercase">
          {project.kicker}
        </p>
        <h3 role="heading" className="text-2xl font-extrabold">
          {project.title}
        </h3>
        {project.badges && project.badges.length > 0 ? (
          <ul aria-label={`${project.title} highlights`} className="mt-3 flex flex-wrap gap-1.5">
            {project.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent"
              >
                {badge}
              </li>
            ))}
          </ul>
        ) : null}
        {project.role ? (
          <p className="mt-1 text-sm font-semibold text-muted">My role: {project.role}</p>
        ) : null}
        <p className="mt-3 text-muted">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo (opens in a new tab)`}
              className="btn-primary min-h-11 px-5 py-2.5 text-sm"
            >
              Fullscreen Picture <ArrowRight className="h-4 w-4" />
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
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Source
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function FeaturedProjects(): React.JSX.Element {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects" className="scroll-mt-24 py-16">
      <div aria-label="Featured projects">
        <Reveal>
          <h2
            id="projects-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl text-center"
          >
            Featured
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            Things I&apos;ve built — current featured work plus event-management web apps deployed
            for real registrations, orders, and scoreboards.
          </p>
          <div className="mt-10 flex flex-col gap-6" aria-label="Featured projects">
            {featured.map((project) => (
              <FeaturedCard key={project.title} project={project} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Home(): React.JSX.Element {
  const typed = useTyping(TYPING_ROLES);
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative flex min-h-[85vh] items-center overflow-clip py-12"
      >
        <CircuitBackdrop />
        <Reveal className="grid w-full items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            {/* Availability indicator */}
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              <span
                aria-hidden="true"
                className="relative flex h-2 w-2 rounded-full"
              >
                <span
                  className="absolute inset-0 rounded-full bg-current animate-ping opacity-75"
                />
                <span className="relative block rounded-full bg-current w-full h-full" />
              </span>
              Open to OJT opportunities and collaborations
            </p>
            <h1
              id="hero-heading"
              className="gradient-text text-5xl font-extrabold tracking-tight sm:text-6xl"
            >
              Tommy Paolma
            </h1>
            <p className="mt-3 text-sm font-semibold tracking-wider text-muted uppercase tech-label">
              Computer Engineering Student · Software Engineer · Technical Writer
            </p>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {typed}
              {typed && !prefersReducedMotion && (
                <span aria-hidden="true" className="typing-caret" />
              )}
            </p>
            <p className="mt-5 max-w-xl text-lg text-muted">
              I build practical software solutions across web, desktop, mobile, and embedded systems
              — turning engineering ideas into working products through programming, system design,
              and hardware-software integration.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="#projects" className="btn-primary">
                Explore My Projects <UiIcon name="arrowRight" className="h-4 w-4" />
              </Link>
              <a href={asset('Tommy-Paolma-CV.pdf')} download className="btn-outline">
                Download CV
              </a>
              <a href="#contact" className="btn-outline">
                Contact Me
              </a>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <a
                href="https://github.com/toms1010"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tommy Paolma on GitHub (opens in a new tab)"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-2 text-sm font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span className="text-sm font-semibold">github.com/toms1010</span>
              </a>
              <a
                href={SOCIAL_LINKS.find((s) => s.icon === 'linkedin')?.href ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tommy Paolma on LinkedIn (opens in a new tab)"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-2 text-sm font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                <span className="text-sm font-semibold">LinkedIn</span>
              </a>
            </div>
            <ul
              aria-label="Technologies I work with"
              className="mt-10 flex flex-wrap gap-2"
            >
              {TECH_BADGES.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold text-ink uppercase tech-label"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <CpuVisual />
        </Reveal>
      </section>
      <FeaturedProjects />
    </>
  );
}
