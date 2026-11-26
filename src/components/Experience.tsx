import { EXPERIENCE_GROUPS } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { UiIcon } from './icons';
import { AlertCircle } from 'lucide-react';

const GROUP_ICONS: Record<string, React.ReactNode> = {
  'Software Development Experience': (
    <UiIcon name="briefcase" className="h-4 w-4" aria-hidden="true" />
  ),
  'Technical Leadership': (
    <UiIcon name="users" className="h-4 w-4" aria-hidden="true" />
  ),
  'Competitions & Achievements': (
    <UiIcon name="trophy" className="h-4 w-4" aria-hidden="true" />
  ),
  'Workshops & Mentoring': (
    <AlertCircle className="h-4 w-4" aria-hidden="true" />
  ),
};

export function Experience(): React.JSX.Element {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="experience-heading" accent="Experience">
          Experience &amp;
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Practical technical contributions, organizational leadership,
          competition experience, and mentoring. Dates shown only where
          verified; no invented employment history.
        </p>

        {EXPERIENCE_GROUPS.map((group) => (
          <section key={group.title} className="mt-12 last:mt-0">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-extrabold text-ink">
              {GROUP_ICONS[group.title]}
              {group.title}
            </h2>
            <div className="grid gap-6">
              {group.items.map((item: typeof EXPERIENCE_GROUPS[number]['items'][number]) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-line border-l-[3px] border-l-accent bg-card p-6 sm:p-8"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <p className="text-xs font-bold tracking-wider text-accent uppercase">
                      <UiIcon name="briefcase" className="mr-1 h-4 w-4" /> {item.kicker}
                    </p>
                    {item.date ? (
                      <span className="ml-auto text-xs font-medium text-muted tech-label">
                        {item.date}
                      </span>
                    ) : null}
                  </div>
                  {item.organization ? (
                    <p className="mb-1 text-sm font-semibold text-muted">
                      {item.organization}
                    </p>
                  ) : null}
                  <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.description}</p>
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div className="mt-4">
                      <h4 className="mb-2 text-xs font-bold tracking-wider text-muted uppercase">
                        My contributions
                      </h4>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                        {item.responsibilities.map((r: string) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </Reveal>
    </section>
  );
}
