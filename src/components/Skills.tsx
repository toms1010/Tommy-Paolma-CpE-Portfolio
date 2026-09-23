import { SKILL_GROUPS } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SkillGlyph } from './icons';

export function Skills(): React.JSX.Element {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="skills-heading" accent="Expertise">
          Skills &amp;
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Grouped by evidence — certifications, coursework, and shipped projects. No inflated
          proficiency claims.
        </p>
        <div className="mt-10 flex flex-col gap-6">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="rounded-3xl border border-line bg-card p-7">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-accent">
                <SkillGlyph icon={group.icon} className="h-5 w-5" />
                {group.title}
              </h3>
              {group.blurb ? <p className="mb-4 text-muted">{group.blurb}</p> : null}
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-full border border-line bg-black/5 px-4 py-1.5 text-sm dark:bg-white/5"
                  >
                    {item.name} <span className="ml-1 font-semibold text-accent">{item.note}</span>
                  </li>
                ))}
              </ul>
              {group.images ? (
                <div className="mt-4 flex flex-wrap gap-4">
                  {group.images.map((img) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      width={280}
                      height={180}
                      className="h-44 w-full max-w-70 rounded-2xl border border-accent object-cover"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
