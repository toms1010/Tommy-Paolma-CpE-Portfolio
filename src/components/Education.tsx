import { EDUCATION } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { UiIcon } from './icons';

export function Education(): React.JSX.Element {
  return (
    <section id="education" aria-labelledby="education-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="education-heading" accent="Education">
          Education
        </SectionHeading>
        <div className="mt-10 grid gap-6">
          {EDUCATION.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-line bg-card p-6 sm:p-8"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <p className="text-xs font-bold tracking-wider text-accent uppercase">
                  <UiIcon name="cap" className="mr-1 h-4 w-4" /> {item.kicker}
                </p>
                {item.date ? (
                  <span className="ml-auto text-xs font-medium text-muted tech-label">
                    {item.date}
                  </span>
                ) : null}
              </div>
              <h3 className="text-xl font-bold text-ink">{item.title}</h3>
              {item.organization ? (
                <p className="mt-1 text-sm font-semibold text-muted">
                  {item.organization}
                </p>
              ) : null}
              <p className="mt-3 text-muted">{item.description}</p>
              {item.responsibilities && item.responsibilities.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 text-xs font-bold tracking-wider text-muted uppercase">
                    Focus areas
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {item.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="rounded-full border border-line bg-black/5 px-3 py-1 text-xs text-muted"
                      >
                        {r}
                      </li>
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
