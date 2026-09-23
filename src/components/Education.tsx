import { EDUCATION } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { UiIcon } from './icons';

export function Education(): React.JSX.Element {
  return (
    <section id="education" aria-labelledby="education-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="education-heading" accent="tion">
          Educa
        </SectionHeading>
        <div className="mt-10 grid gap-5">
          {EDUCATION.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-line border-l-[3px] border-l-accent bg-card p-6 sm:px-7"
            >
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-accent uppercase">
                <UiIcon name="cap" className="h-4 w-4" /> {item.kicker}
              </p>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
