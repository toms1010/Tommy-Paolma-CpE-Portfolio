import { GALLERY } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { UiIcon } from './icons';

const ACHIEVEMENTS = [
  { icon: 'trophy', title: 'ICPEP', detail: 'C Programming competitor' },
  { icon: 'rosette', title: '18 certs', detail: 'Programming, security & cloud' },
  { icon: 'users', title: 'Mentor', detail: 'Arduino & programming peers' },
] as const;

export function About(): React.JSX.Element {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="about-heading" accent="Me">
          About
        </SectionHeading>
        <div className="mt-10 flex flex-wrap gap-6">
          <div className="min-w-[min(100%,19rem)] flex-[2] rounded-3xl border border-line bg-card p-8">
            <p>
              I&apos;m <strong>Tommy Paolma</strong>, a{' '}
              <strong>Computer Engineering student</strong> and aspiring{' '}
              <strong>software engineer</strong>. I work across web development (HTML, CSS,
              JavaScript, Google Apps Script), programming fundamentals (Python, Java, C, C#, SQL),
              and hardware-software basics (Arduino, C++, IoT concepts) — with an engineering
              mindset: understand the problem, build simply, test, and iterate.
            </p>
            <p className="mt-4 text-muted">
              What I&apos;ve actually done: featured work includes a school rules website (team
              consultant/developer) and an educational ocean-themed game site, plus live
              event-management web apps used for real registrations, orders, and scoreboards;
              competed in C Programming at ICPEP; and mentored peers through Arduino workshops
              and programming fundamentals.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {ACHIEVEMENTS.map((a) => (
                <div
                  key={a.title}
                  className="min-w-28 flex-1 rounded-2xl bg-black/5 px-5 py-3 text-center dark:bg-black/30"
                >
                  <UiIcon name={a.icon} className="mx-auto mb-1 h-6 w-6 text-accent" />
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-xs text-muted">{a.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <blockquote className="min-w-[min(100%,16rem)] flex-1 self-start rounded-3xl border-l-[3px] border-l-accent bg-gradient-to-br from-accent/10 to-highlight/10 p-8">
            <UiIcon name="quote" className="mb-4 h-8 w-8 text-accent" />
            <p>
              &ldquo;Technology is best when it brings people together — my mission is to engineer
              solutions that are both practical and human-centered.&rdquo;
            </p>
          </blockquote>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((g) => (
            <figure
              key={g.src}
              className="overflow-hidden rounded-2xl border border-line bg-card transition-transform duration-300 hover:-translate-y-1.5 hover:border-accent"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={400}
                height={180}
                className="h-44 w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-sm">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
