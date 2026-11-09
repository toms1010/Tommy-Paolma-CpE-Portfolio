import { Download, Printer } from 'lucide-react';
import { EMAIL, GITHUB_PROFILE } from '../data/portfolio';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const CV_PDF = 'Tommy-Paolma-CV.pdf';

const PROJECT_BULLETS = [
  'WIT Barcode Student Information System — desktop app with barcode scanning, computer vision (YOLOv8), MySQL, PySide6, and AI training center (sole developer).',
  'Student Transport Management System — C++17 Qt Widgets desktop app + console app sharing one domain layer, seat allocation, route fares, and payments (sole developer).',
  'Shadow Hunter — 2D action game in Python + Pygame with 4 hunters, 10 levels, 8 upgradeable weapons (sole developer).',
  'JDAJNSH School Website — team-built student code-of-conduct and information site (consultant / developer).',
];

export function Resume(): React.JSX.Element {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="resume-heading" accent="Resume">
          Resume &amp;
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Professional background in one printable view. Use <strong>Download CV</strong> for the
          PDF, or <strong>Print / Save as PDF</strong> from your browser.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
          <a
            href={asset(CV_PDF)}
            download={CV_PDF}
            data-download-cv
            aria-label="Download CV as PDF"
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
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </button>
          <a href="#contact" className="btn-outline">
            Contact Me
          </a>
        </div>
        <article
          aria-label="Resume of Tommy Paolma"
          className="resume-sheet mx-auto mt-8 max-w-[210mm] min-w-[210mm] rounded-3xl bg-white p-6 text-slate-900 sm:p-10 print:max-w-none print:rounded-none print:border-none print:shadow-none"
        >
          <header className="mb-6 border-b-[3px] border-b-[#38bdf8] pb-4 print:border-b-black print:pb-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight">Tommy Paolma</h3>
                <p className="mt-1 font-semibold text-slate-700 print:text-black">
                  Computer Engineering Student · Software Developer · Technical Writer
                </p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-sm text-slate-600 print:text-black">
                  <a href={`mailto:${EMAIL}`} className="text-[#0b6e81] hover:underline print:no-underline print:text-black">
                    {EMAIL}
                  </a>
                </p>
                <p className="text-sm text-slate-600 print:text-black">
                  <a
                    href={GITHUB_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0b6e81] hover:underline print:no-underline print:text-black"
                  >
                    github.com/toms1010
                  </a>
                </p>
                <p className="text-sm text-slate-600 print:text-black">
                  <a
                    href="https://www.linkedin.com/in/tommy-paolma-65663b341/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0b6e81] hover:underline print:no-underline print:text-black"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </header>

          <section aria-label="Summary" className="mt-6 mb-6 print:mb-4 print:break-inside-avoid">
            <h4 className="mb-2 text-base font-bold tracking-wide uppercase text-[#0b6e81] print:text-black">
              Professional Summary
            </h4>
            <p className="text-sm leading-relaxed print:text-black">
              Computer Engineering student at Western Institute of Technology (Iloilo City,
              Philippines) building practical software solutions across web, desktop, mobile, and
              embedded systems. Experienced in shipping live event-management tools used at real
              events, competing in C Programming at ICPEP, and mentoring peers in Arduino and
              programming fundamentals. Technical writer documenting engineering topics for clear,
              accessible guides.
            </p>
          </section>

          <section aria-label="Education" className="mb-6 print:mb-4 print:break-inside-avoid">
            <h4 className="mb-2 text-base font-bold tracking-wide uppercase text-[#0b6e81] print:text-black">
              Education
            </h4>
            <p className="text-sm print:text-black">
              <strong>Bachelor of Science in Computer Engineering</strong>
              <br className="hidden sm:block" />
              Western Institute of Technology — Iloilo City, Philippines
              <br className="hidden sm:block" />
              Currently studying
            </p>
          </section>

          <section aria-label="Selected Projects" className="mb-6 print:mb-4 print:break-inside-avoid">
            <h4 className="mb-2 text-base font-bold tracking-wide uppercase text-[#0b6e81] print:text-black">
              Selected Projects
            </h4>
            <ul className="list-disc space-y-1.5 pl-5 text-sm print:text-black">
              {PROJECT_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          <section aria-label="Technical Skills" className="mb-6 print:mb-4 print:break-inside-avoid">
            <h4 className="mb-2 text-base font-bold tracking-wide uppercase text-[#0b6e81] print:text-black">
              Technical Skills
            </h4>
            <p className="text-sm leading-relaxed print:text-black">
              <strong>Used in projects:</strong> C, C++, Java, JavaScript, Python, HTML, CSS,
              MySQL, Qt, PySide6, Pygame, Arduino, Git, GitHub, CMake
              <br />
              <strong>Familiar with:</strong> C#, TypeScript, React, Node.js, MongoDB, PostgreSQL,
              Electron, Android, Godot, Docker
              <br />
              <strong>Currently learning:</strong> Go, Rust, ASP.NET Core, Neon, AWS, Azure, Google
              Cloud, Firebase, Terraform, Ansible
            </p>
          </section>

          <section aria-label="Certifications" className="mb-6 print:mb-4 print:break-inside-avoid">
            <h4 className="mb-2 text-base font-bold tracking-wide uppercase text-[#0b6e81] print:text-black">
              Certifications &amp; Technical Training (18)
            </h4>
            <p className="text-sm print:text-black">
              Python Programming · Web Development Fundamentals · C# Programming · Java Basic ·
              R Basic · SQL Basic · Data Science · Data Visualization · Cybersecurity Fundamentals ·
              Ethical Hacking · Cyber Hygiene · Certificate of Cyber · Advanced Technical Training ·
              System Configuration · Basic Hardware · Computer Setup · Aviation Technology ·
              Google Cloud Fundamentals
            </p>
          </section>

          <section aria-label="Leadership & Activities" className="mb-6 print:mb-4 print:break-inside-avoid">
            <h4 className="mb-2 text-base font-bold tracking-wide uppercase text-[#0b6e81] print:text-black">
              Leadership &amp; Activities
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm print:text-black">
              <li>
                ICpEP.SE Region VI — Regional Auditor (2024–2025 Academic Year)
              </li>
              <li>
                ACES — First Year Representative (2024–2025 Academic Year)
              </li>
              <li>NSTP — Class President (2024–2025 Academic Year)</li>
              <li>
                ICPEP — C Programming Competition participant
              </li>
              <li>
                Arduino &amp; Programming Workshops — facilitator and mentor
              </li>
            </ul>
          </section>

          <section aria-label="Contact" className="mb-6 print:mb-4 print:break-inside-avoid">
            <h4 className="mb-2 text-base font-bold tracking-wide uppercase text-[#0b6e81] print:text-black">
              Contact Information
            </h4>
            <p className="text-sm print:text-black">
              Email: <a href={`mailto:${EMAIL}`} className="text-[#0b6e81] hover:underline print:no-underline print:text-black">
                {EMAIL}
              </a>{' · '}
              GitHub: <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" className="text-[#0b6e81] hover:underline print:no-underline print:text-black">
                github.com/toms1010
              </a>{' · '}
              LinkedIn: <a href="https://www.linkedin.com/in/tommy-paolma-65663b341/" target="_blank" rel="noopener noreferrer" className="text-[#0b6e81] hover:underline print:no-underline print:text-black">
                linkedin.com/in/tommy-paolma-65663b341
              </a>
            </p>
          </section>
        </article>
      </Reveal>
    </section>
  );
}
