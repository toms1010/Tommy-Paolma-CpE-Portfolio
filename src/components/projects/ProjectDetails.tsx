import { ArrowRight, Code, ExternalLink, Info, Layers, Target, X } from 'lucide-react';
import { asset } from '../../lib/asset';
import type { Project } from '../../types/portfolio';
import { Button } from '../common/Button';

interface ProjectDetailsProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

function ScreenshotGrid({ project }: { project: Project }): React.JSX.Element | null {
  const screenshots = project.screenshots;
  if (!screenshots || screenshots.length === 0) return null;
  return (
    <section aria-label={`${project.title} screenshots`}>
      <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
        <Layers className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
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

export function ProjectDetails({
  project,
  open,
  onClose,
}: ProjectDetailsProps): React.JSX.Element | null {
  if (!open) return null;

  const hasLinks = Boolean(project.demo || project.github);
  const hasProblemSolution = Boolean(project.problem) || Boolean(project.solution);
  const hasRole = Boolean(project.role);
  const hasObjectives = (project.objectives?.length ?? 0) > 0;
  const hasFuture = (project.futureImprovements?.length ?? 0) > 0;
  const hasScreenshots = (project.screenshots?.length ?? 0) > 0;
  const hasHighlights = (project.highlights?.length ?? 0) > 0;
  const hasControls = (project.controls?.length ?? 0) > 0;
  const hasFlow = (project.flow?.length ?? 0) > 0;
  const hasRun = Boolean(project.runCommand) || Boolean(project.runNote);
  const hasCta = Boolean(project.cta);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
    >
      {/* Backdrop — tap to close. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Panel */}
      <div className="relative mx-auto mt-10 mb-10 w-full max-w-3xl max-h-[90vh] rounded-3xl border border-line bg-card shadow-2xl overflow-y-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-line bg-page/50 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
            <h2 className="text-lg font-bold text-ink">{project.title}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close project details">
            <X className="h-4 w-4" aria-hidden="true" focusable="false" />
          </Button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Overview */}
          <section>
            <p className="text-sm text-muted leading-relaxed">{project.description}</p>
          </section>

          {/* Highlights */}
          {hasHighlights && (
            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Layers className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
                Highlights
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.highlights?.map((item) => (
                  <div key={item.title} className="rounded-xl border border-line bg-card p-4">
                    <p className="text-sm font-bold text-ink">{item.title}</p>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Controls + flow / run */}
          {(hasControls || hasFlow || hasRun) && (
            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Layers className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
                Gameplay Details
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {hasControls && (
                  <div className="rounded-xl border border-line bg-card p-4">
                    <h4 className="text-sm font-bold text-ink">Controls</h4>
                    <ul className="mt-3 space-y-2">
                      {project.controls?.map((c) => (
                        <li
                          key={c.input}
                          className="flex items-center justify-between gap-3 text-sm text-muted"
                        >
                          <span className="font-bold text-ink">{c.input}</span>
                          <span className="text-right">{c.action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(hasFlow || hasRun) && (
                  <div className="rounded-xl border border-line bg-card p-4">
                    {hasFlow && (
                      <>
                        <h4 className="text-sm font-bold text-ink">Game Flow</h4>
                        <ol className="mt-3 space-y-1.5 text-sm text-muted">
                          {project.flow?.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>
                      </>
                    )}
                    {hasRun && (
                      <div className="mt-3">
                        {project.runCommand && (
                          <pre className="overflow-x-auto rounded-lg bg-black/80 p-3 font-mono text-xs text-green-300">
                            {project.runCommand}
                          </pre>
                        )}
                        {project.runNote && (
                          <p className="mt-2 text-sm text-muted leading-relaxed">
                            {project.runNote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Call to action */}
          {hasCta && project.cta && (
            <section className="rounded-2xl bg-gradient-to-br from-accent to-highlight p-6 text-center">
              <h3 className="text-xl font-extrabold text-white">{project.cta.title}</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-white/85">{project.cta.body}</p>
            </section>
          )}

          {/* Problem / Solution */}
          {hasProblemSolution && (
            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Target className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
                Problem &amp; Solution
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.problem && (
                  <div className="rounded-xl border border-line bg-card p-4">
                    <p className="text-xs font-semibold text-accent uppercase">Problem</p>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="rounded-xl border border-line bg-card p-4">
                    <p className="text-xs font-semibold text-accent uppercase">Solution</p>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Objectives */}
          {hasObjectives && (
            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Target className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
                Objectives
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted list-disc pl-5">
                {(project.objectives ?? []).map((obj) => (
                  <li key={obj}>{obj}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Technologies */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
              <Code className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
              Technologies Used
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* My Role */}
          {hasRole && (
            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Info className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
                My Role
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{project.role}</p>
            </section>
          )}

          {/* Future improvements */}
          {hasFuture && (
            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Layers className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
                Future Improvements
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted list-disc pl-5">
                {(project.futureImprovements ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Architecture / Workflow */}
          {(project.workflow?.length ?? 0) > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Layers className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
                Architecture & Workflow
              </h3>
              <ul className="mt-4 space-y-1.5 text-sm text-muted list-disc pl-5">
                {project.workflow?.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Engineering Challenges */}
          {(project.challenges?.length ?? 0) > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Target className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
                Engineering Challenges
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.challenges?.map((challenge) => (
                  <div key={challenge.title} className="rounded-xl border border-line bg-card p-4">
                    <p className="text-sm font-bold text-ink">{challenge.title}</p>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{challenge.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Screenshots gallery */}
          {hasScreenshots && <ScreenshotGrid project={project} />}

          {/* Links */}
          {hasLinks && (
            <section className="pt-4 border-t border-line">
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <ArrowRight className="h-5 w-5 text-accent" aria-hidden="true" focusable="false" />
                Links
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo (opens in a new tab)`}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-accent/90"
                  >
                    Live Demo{' '}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-line bg-card px-4 py-2 text-xs font-bold text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" focusable="false" />{' '}
                    Source
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
