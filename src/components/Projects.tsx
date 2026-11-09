import { useState, useMemo } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { GITHUB_PROFILE, PROJECTS } from '../data/portfolio';
import type { Project, ProjectCategory } from '../types/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Button } from './common/Button';
import { ProjectImage } from './common/ProjectImage';
import { FullscreenImage } from './common/FullscreenImage';
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
  onOpenFullscreen,
}: {
  project: Project;
  onReadMore: (project: Project) => void;
  onOpenFullscreen?: (src: string, alt: string) => void;
}): React.JSX.Element {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl"
    >
      <figure className="relative h-80 w-full overflow-hidden bg-black">
        <ProjectImage
          src={projectImage(project)}
          alt={project.imageAlt}
          width={640}
          height={360}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold text-white shadow-sm">
          {categoryLabel(project.categories[0])}
        </span>
      </figure>
      <div className="flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-ink">{project.title}</h3>
          <span className="text-[10px] font-bold tracking-wider text-accent uppercase">
            {categoryLabel(project.categories[0])}
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
          {(project.demo || project.image) && (
            <button
              key="screenshot"
              type="button"
              onClick={() => {
                onOpenFullscreen?.(projectImage(project), project.imageAlt);
              }}
              aria-label={`${project.title} view screenshot`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-accent/90 mt-3"
            >
              View Screenshot <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects(): React.JSX.Element {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [details, setDetails] = useState<Project | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<{
    src: string;
    alt: string;
    open: boolean;
  } | null>(null);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = filter === 'all' || p.categories.includes(filter);
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        p.categories.some((c) =>
          CATEGORY_LABELS[c].toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  const featured = filtered.filter((p) => p.featured);
  const more = filtered.filter((p) => !p.featured);

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<ProjectCategory | 'all', number>> = { all: PROJECTS.length };
    FILTER_ORDER.forEach((cat) => {
      counts[cat] = PROJECTS.filter((p) => p.categories.includes(cat)).length;
    });
    return counts;
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 py-16">
      <Reveal>
        {/* Search */}
        <div className="mt-10 max-w-md mx-auto sm:max-w-none">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="pl-9 pr-4 py-2 rounded-xl border border-line bg-card text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              aria-label="Search projects by title, description, technologies, or category"
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" aria-hidden="true" focusable="false" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mt-12" aria-label="Featured projects">
          <SectionHeading id="projects-heading" accent="Projects">
            Featured Projects
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            My strongest and most important projects — desktop applications, web applications, and
            educational tools I&apos;ve designed and built from the ground up.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard
                key={project.projectId ?? project.title}
                project={project}
                onReadMore={setDetails}
                onOpenFullscreen={(src, alt) => {
                  setFullscreenImage({ src, alt, open: true });
                }}
              />
            ))}
          </div>
        </div>

        {/* More Projects with category filtering */}
        <div className="mt-16">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
            {FILTERS.map((f) => {
              const count = categoryCounts[f.value] ?? 0;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => {
                    setFilter(f.value);
                  }}
                  aria-pressed={filter === f.value}
                  className={`min-w-[110px] shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    filter === f.value
                      ? 'border-accent bg-accent/15 text-accent'
                      : 'border-line bg-card text-ink hover:border-accent'
                  }`}
                >
                  {f.label} ({count})
                </button>
              );
            })}
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
                <ProjectCard
                  key={project.projectId ?? project.title}
                  project={project}
                  onReadMore={setDetails}
                  onOpenFullscreen={(src, alt) => {
                    setFullscreenImage({ src, alt, open: true });
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-center text-muted">
              No projects match your filters — try another category or clear the search.
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
              setFullscreenImage(null);
            }}
          />
        )}

        {fullscreenImage && (
          <FullscreenImage
            src={fullscreenImage.src}
            alt={fullscreenImage.alt}
            open={fullscreenImage.open}
            onClose={() => {
              setFullscreenImage(null);
            }}
          />
        )}
      </Reveal>
    </section>
  );
}
