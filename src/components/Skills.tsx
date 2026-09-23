import { LEARNING_GROUPS, SKILL_GROUPS } from '../data/portfolio';
import type { SkillItem } from '../types/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SkillGlyph } from './icons';

function SkillCards({ items, learning = false }: { items: SkillItem[]; learning?: boolean }): React.JSX.Element {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.name}
          className={`flex min-w-0 flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-md ${
            learning
              ? 'border-dashed border-accent/50 bg-accent/5 dark:bg-accent/10'
              : 'border-line bg-black/5 dark:bg-white/5'
          }`}
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
              learning ? (
                <span className="mx-auto mt-1.5 block w-fit rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                  {item.note}
                </span>
              ) : (
                <span className="mt-0.5 block text-xs font-medium text-muted">{item.note}</span>
              )
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Skills(): React.JSX.Element {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="skills-heading" accent="Skills">
          Technical
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Technologies &amp; tools I use across languages, web, backend, databases, mobile,
          desktop, and game development — plus the cloud platforms I&apos;m actively learning.
        </p>
        <div className="mt-10 flex flex-col gap-6">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="rounded-3xl border border-line bg-card p-7">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-accent">
                <SkillGlyph icon={group.icon} className="h-5 w-5" />
                {group.title}
              </h3>
              {group.blurb ? <p className="mb-4 text-muted">{group.blurb}</p> : null}
              <SkillCards items={group.items} />
            </div>
          ))}

          <div className="rounded-3xl border border-dashed border-accent/50 bg-card p-7">
            <h3 className="flex flex-wrap items-center gap-2 text-lg font-bold text-accent">
              <SkillGlyph icon="cloud" className="h-5 w-5" />
              Cloud &amp; DevOps
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold tracking-wide text-accent uppercase">
                Currently learning
              </span>
            </h3>
            <p className="mt-2 mb-6 text-muted">
              Platforms and infrastructure tools I&apos;m actively exploring — shown here as a
              learning path, not claimed expertise.
            </p>
            <div className="flex flex-col gap-6">
              {LEARNING_GROUPS.map((group) => (
                <div key={group.title}>
                  <h4 className="mb-3 flex items-center gap-2 text-base font-bold">
                    <SkillGlyph icon={group.icon} className="h-4 w-4 text-accent" />
                    {group.title}
                  </h4>
                  <SkillCards items={group.items} learning />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
