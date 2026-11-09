import { EXPERIENCE } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { UiIcon } from './icons';

export function Experience(): React.JSX.Element {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="experience-heading" accent="Experience">
          Technical Experience
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Practical technical contributions — competition, consulting, deployed event tools, and
          peer mentoring. No invented employment history; dates shown only where applicable.
        </p>
        <div className="mt-10 grid gap-6">
          {EXPERIENCE.map((item) => (
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
                <p className="mb-1 text-sm font-semibold text-muted">{item.organization}</p>
              ) : null}
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-muted">{item.description}</p>
              {item.responsibilities && item.responsibilities.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 text-xs font-bold tracking-wider text-muted uppercase">
                    My contributions
                  </h4>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                    {item.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
