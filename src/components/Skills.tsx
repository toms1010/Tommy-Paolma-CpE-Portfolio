import { SKILL_GROUPS } from '../data/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SkillGlyph } from './icons';

export function Skills(): React.JSX.Element {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="skills-heading" accent="Skills">
          Technical
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Technologies &amp; tools I use across languages, web, backend, databases, mobile,
          desktop, and game development.
        </p>
        <div className="mt-10 flex flex-col gap-6">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="rounded-3xl border border-line bg-card p-7">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-accent">
                <SkillGlyph icon={group.icon} className="h-5 w-5" />
                {group.title}
              </h3>
              {group.blurb ? <p className="mb-4 text-muted">{group.blurb}</p> : null}
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-line bg-black/5 px-3 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-md dark:bg-white/5"
                  >
                    {item.logo ? (
                      <img
                        src={asset(item.logo)}
                        alt={`${item.name} logo`}
                        loading="lazy"
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 object-contain"
                      />
                    ) : null}
                    <span className="min-w-0 text-sm font-semibold break-words">
                      {item.name}
                      {item.note ? (
                        <span className="mt-0.5 block text-xs font-medium text-muted">
                          {item.note}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
