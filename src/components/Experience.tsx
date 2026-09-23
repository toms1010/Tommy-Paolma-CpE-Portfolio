import { EXPERIENCE } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { UiIcon } from './icons';

export function Experience(): React.JSX.Element {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="experience-heading" accent="Leadership">
          Experience &amp;
        </SectionHeading>
        <div className="mt-10 grid gap-5">
          {EXPERIENCE.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-line border-l-[3px] border-l-accent bg-card p-6 sm:px-7"
            >
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider text-accent uppercase">
                <UiIcon name="briefcase" className="h-4 w-4" /> {item.kicker}
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
