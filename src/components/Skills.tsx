import {
  SKILLS_CURRENTLY_LEARNING,
  SKILLS_FAMILIAR_WITH,
  SKILLS_USED_IN_PROJECTS,
} from '../data/portfolio';
import type { SkillGroup, SkillItem } from '../types/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SkillGlyph } from './icons';
import { ProjectImage } from './common/ProjectImage';
import { ArrowUp, AlertCircle, Clock } from 'lucide-react';

function SkillCards({ items }: { items: SkillItem[] }): React.JSX.Element {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
        >
          {item.logo ? (
            <ProjectImage
              src={asset(item.logo)}
              alt={`${item.name} logo`}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 object-contain mx-auto"
            />
          ) : null}
          <span className="min-w-0 text-sm font-semibold break-words text-ink">
            {item.name}
          </span>
          {item.note ? (
            <span className="mx-auto mt-1 block w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold text-muted">
              {item.note}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function SkillTier({
  title,
  icon,
  groups,
  tierLabel,
  tierColor,
}: {
  title: string;
  icon: React.ReactNode;
  groups: SkillGroup[];
  tierLabel: string;
  tierColor: string;
}): React.JSX.Element {
  return (
    <div className="rounded-3xl border bg-card p-7 sm:p-9">
      <div className="mb-6 flex items-center gap-2">
        <span className="shrink-0" aria-hidden="true">{icon}</span>
        <h3 className="text-lg font-bold text-ink">{title}</h3>
        <span
          className={`ml-auto inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold tracking-wide uppercase ${tierColor}`}
        >
          {tierLabel}
        </span>
      </div>
      {groups.map((group) => (
        <div key={group.title} className="mb-8 last:mb-0">
          <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
            <SkillGlyph icon={group.icon} className="h-4 w-4 text-accent" />
            {group.title}
          </h4>
          <SkillCards items={group.items} />
        </div>
      ))}
    </div>
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
          Technologies organized by real experience — what I&apos;ve shipped in completed projects,
          what I&apos;m familiar with, and what I&apos;m currently learning. No progress bars or
          invented proficiency levels.
        </p>
        <div className="mt-10 flex flex-col gap-6">
          <SkillTier
            title="Used in Projects"
            icon={<ArrowUp className="h-5 w-5 text-green-400" aria-hidden="true" />}
            groups={SKILLS_USED_IN_PROJECTS}
            tierLabel="Experienced"
            tierColor="border-green-400/30 text-green-400 bg-green-400/10"
          />
          <SkillTier
            title="Familiar With"
            icon={<AlertCircle className="h-5 w-5 text-accent" aria-hidden="true" />}
            groups={SKILLS_FAMILIAR_WITH}
            tierLabel="Familiar"
            tierColor="border-accent/30 text-accent bg-accent/10"
          />
          <SkillTier
            title="Currently Learning"
            icon={<Clock className="h-5 w-5 text-muted" aria-hidden="true" />}
            groups={SKILLS_CURRENTLY_LEARNING}
            tierLabel="Learning"
            tierColor="border-line/50 text-muted bg-black/5"
          />
        </div>
      </Reveal>
    </section>
  );
}
