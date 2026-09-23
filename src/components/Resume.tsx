import { Download } from 'lucide-react';
import { EMAIL, GITHUB_PROFILE } from '../data/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const CV_PDF = 'Tommy-Paolma-CV.pdf';

const PROJECT_BULLETS = [
  'JDAJNSH school website — consultant/software developer on a team-built Student Code of Conduct site (HTML, CSS, JS).',
  'MARPOL Ocean Adventure — educational marine-awareness site with study resources and browser games (HTML, CSS, JS).',
  'Battle of Bands Registration — online registration with organized real-time entries (Google Apps Script, HTML, CSS, JS).',
  'Pre-Event Registration — pre-registration with email confirmation and QR codes.',
  'Participant Rating — real-time committee scoring with instant score calculation.',
  'Sports Event Manager — schedules, teams, and live scoreboards.',
  'T-Shirt & Cap Order Systems — size, quantity, and payment tracking.',
  'Campus Navigation — venue map with directions and hall info.',
];

export function Resume(): React.JSX.Element {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="resume-heading" accent="ume">
          Res
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          This section is the resume — use <strong>Print / Save as PDF</strong> to download a copy
          for applications.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
          <a
            href={asset(CV_PDF)}
            download={CV_PDF}
            target="_blank"
            rel="noopener noreferrer"
            data-download-cv
            aria-label="Download CV as PDF (opens in a new tab)"
            className="btn-primary"
          >
            <Download className="h-4 w-4" /> Download CV
          </a>
          <button
            type="button"
            onClick={() => {
              window.print();
            }}
            className="btn-outline"
          >
            <Download className="h-4 w-4" /> Print / Save as PDF
          </button>
          <a href="#contact" className="btn-outline">
            Contact Me
          </a>
        </div>
        <article
          aria-label="Resume of Tommy Paolma"
          className="resume-sheet mx-auto mt-8 max-w-3xl rounded-2xl bg-white p-6 text-slate-900 sm:p-12"
        >
          <header className="mb-5 border-b-[3px] border-b-[#13adc7] pb-4">
            <h3 className="text-3xl font-extrabold">Tommy Paolma</h3>
            <p className="font-semibold text-slate-700">
              Computer Engineering Student · Aspiring Software Engineer
            </p>
            <p className="text-sm text-slate-600">
              <a href={`mailto:${EMAIL}`} className="text-[#0e7490] hover:underline">
                {EMAIL}
              </a>{' '}
              ·{' '}
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0e7490] hover:underline"
              >
                github.com/toms1010
              </a>{' '}
              ·{' '}
              <a
                href="https://www.linkedin.com/in/tommy-paolma-65663b341/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0e7490] hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </header>
          <section aria-label="Summary" className="mb-5">
            <h4 className="mb-1.5 text-base font-bold tracking-wide text-[#0e7490] uppercase">
              Summary
            </h4>
            <p>
              Computer Engineering student building practical web applications, event management
              systems, and embedded projects. Experienced in shipping live tools used at real
              events, competing in C Programming at ICPEP, and mentoring peers in Arduino and
              programming fundamentals.
            </p>
          </section>
          <section aria-label="Education" className="mb-5">
            <h4 className="mb-1.5 text-base font-bold tracking-wide text-[#0e7490] uppercase">
              Education
            </h4>
            <p>
              <strong>Bachelor of Science in Computer Engineering</strong> — in progress
              <br />
              Focus: software development, hardware-software integration, engineering
              problem-solving.
            </p>
          </section>
          <section aria-label="Projects" className="mb-5">
            <h4 className="mb-1.5 text-base font-bold tracking-wide text-[#0e7490] uppercase">
              Selected Projects (sole developer)
            </h4>
            <ul className="list-disc space-y-1 pl-5">
              {PROJECT_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
          <section aria-label="Technical skills" className="mb-5">
            <h4 className="mb-1.5 text-base font-bold tracking-wide text-[#0e7490] uppercase">
              Technical Skills
            </h4>
            <p>
              <strong>Languages:</strong> Python, Java, C, C++, C#, SQL, R, JavaScript
              <br />
              <strong>Web:</strong> HTML, CSS, Google Apps Script, responsive design
              <br />
              <strong>Embedded:</strong> Arduino, sensors, hardware programming basics
              <br />
              <strong>Other:</strong> Git, GitHub, Google Cloud fundamentals, cybersecurity
              fundamentals
            </p>
          </section>
          <section aria-label="Certifications" className="mb-5">
            <h4 className="mb-1.5 text-base font-bold tracking-wide text-[#0e7490] uppercase">
              Certifications (18)
            </h4>
            <p>
              Python · Web Development · C# · Java · R · SQL · Data Science · Data Visualization ·
              Google Cloud · Cybersecurity Fundamentals · Ethical Hacking · Cyber Hygiene · System
              Configuration · Hardware &amp; Setup · Aviation Technology.
            </p>
          </section>
          <section aria-label="Activities">
            <h4 className="mb-1.5 text-base font-bold tracking-wide text-[#0e7490] uppercase">
              Activities &amp; Leadership
            </h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>ICPEP — C Programming competitor (live problem-solving + technical Q&amp;A).</li>
              <li>Arduino &amp; programming workshops — mentored fellow students hands-on.</li>
            </ul>
          </section>
        </article>
      </Reveal>
    </section>
  );
}
