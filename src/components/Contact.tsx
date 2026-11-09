import { useState } from 'react';
import { EMAIL, SOCIAL_LINKS } from '../data/portfolio';
import type { ContactFormData } from '../types/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SocialGlyph, UiIcon } from './icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM: ContactFormData = { name: '', email: '', message: '' };

export function Contact(): React.JSX.Element {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formError, setFormError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [mailStatus, setMailStatus] = useState<{ message: string; type: 'info' | 'error' } | null>(
    null,
  );

  const set = (field: keyof ContactFormData, value: string): void => {
    setForm((f) => ({ ...f, [field]: value }));
    // Clear field-specific error as the user types.
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next: Partial<Record<keyof ContactFormData, string>> = {};
      for (const key of Object.keys(prev) as (keyof ContactFormData)[]) {
        if (key !== field) next[key] = prev[key];
      }
      return next;
    });
    setFormError('');
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const next: Partial<Record<keyof ContactFormData, string>> = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) next.name = 'Please enter your name.';
    if (!EMAIL_RE.test(email)) next.email = 'Please enter a valid email address.';
    if (message.length < 10) next.message = 'Please write a message of at least 10 characters.';

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setFormError('Please fix the highlighted fields and try again.');
      return;
    }

    setFormError('');
    setSending(true);
    setMailStatus(null);

    // mailto: opens the visitor's email application — nothing is sent to a server.
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setSending(false);
    setMailStatus({
      type: 'info',
      message: `Your email app should have opened with your message addressed to ${EMAIL}. If nothing opened, please email me directly at ${EMAIL}.`,
    });
  };

  const copyEmail = (): void => {
    const done = (msg: string): void => {
      setCopyStatus(msg);
      setTimeout(() => {
        setCopyStatus('');
      }, 2500);
    };
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(EMAIL)
        .then(() => {
          done('Email address copied to clipboard.');
        })
        .catch(() => {
          done(`Copy failed — the address is ${EMAIL}.`);
        });
    } else {
      done(`Copy not supported — the address is ${EMAIL}.`);
    }
  };

  const inputClass = (field: keyof ContactFormData): string =>
    `w-full rounded-xl border bg-black/5 px-4 py-3 text-ink placeholder:text-muted/70 dark:bg-black/35 ${
      errors[field] ? 'border-red-500' : 'border-line'
    }`;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-16">
      <Reveal>
        <SectionHeading id="contact-heading" accent="Connect">
          Let&apos;s
        </SectionHeading>
        <div className="mt-10 rounded-3xl border border-line bg-card p-6 sm:p-10">
          <p className="mx-auto max-w-xl text-muted text-center sm:text-left">
            Open to internships, OJT opportunities, collaborations, and technical conversations. The
            form below opens your email app — nothing is sent to a server.
          </p>

          {/* Desktop: two columns; mobile: stacked */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:items-start">
            {/* Left: Contact information */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-card p-5 sm:p-6">
                <h3 className="mb-3 text-lg font-bold text-ink">Contact Information</h3>
                <ul className="space-y-3">
                  <li className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-sm font-semibold text-muted">Email</span>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-sm text-accent hover:underline break-all sm:break-normal"
                    >
                      {EMAIL}
                    </a>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-sm font-semibold text-muted">GitHub</span>
                    <a
                      href="https://github.com/toms1010"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline break-all sm:break-normal"
                    >
                      github.com/toms1010
                    </a>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-sm font-semibold text-muted">LinkedIn</span>
                    <a
                      href="https://www.linkedin.com/in/tommy-paolma-65663b341/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline break-all sm:break-normal"
                    >
                      linkedin.com/in/tommy-paolma-65663b341
                    </a>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-sm font-semibold text-muted">Location</span>
                    <span className="text-sm text-muted">Iloilo City, Philippines</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <span className="text-sm font-semibold text-muted">Availability</span>
                    <span className="text-sm text-accent font-medium">Open to OJT opportunities</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={`mailto:${EMAIL}`} className="btn-primary">
                  {EMAIL} <UiIcon name="mail" className="h-4 w-4" />
                </a>
                <button type="button" onClick={copyEmail} className="btn-outline">
                  Copy email <UiIcon name="copy" className="h-4 w-4" />
                </button>
              </div>
              {copyStatus && (
                <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-accent">
                  {copyStatus}
                </p>
              )}
            </div>

            {/* Right: Contact form */}
            <div className="space-y-4">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="grid gap-4 text-left"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label htmlFor="cfName" className="text-sm font-semibold">
                      Your name
                    </label>
                    <input
                      id="cfName"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      placeholder="Juan Dela Cruz"
                      value={form.name}
                      onChange={(e) => {
                        set('name', e.target.value);
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'cfNameErr' : undefined}
                      className={inputClass('name')}
                    />
                    {errors.name ? (
                      <p id="cfNameErr" role="alert" className="text-sm text-red-500">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="cfEmail" className="text-sm font-semibold">
                      Your email
                    </label>
                    <input
                      id="cfEmail"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => {
                        set('email', e.target.value);
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'cfEmailErr' : undefined}
                      className={inputClass('email')}
                    />
                    {errors.email ? (
                      <p id="cfEmailErr" role="alert" className="text-sm text-red-500">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="cfMessage" className="text-sm font-semibold">
                    Message
                  </label>
                  <textarea
                    id="cfMessage"
                    rows={5}
                    required
                    minLength={10}
                    placeholder="Hi Tommy, I'd like to talk about..."
                    value={form.message}
                    onChange={(e) => {
                      set('message', e.target.value);
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'cfMessageErr' : undefined}
                    className={inputClass('message')}
                  />
                  {errors.message ? (
                    <p id="cfMessageErr" role="alert" className="text-sm text-red-500">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                {formError ? (
                  <p role="alert" className="text-sm text-red-500">
                    {formError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary justify-center"
                >
                  {sending ? 'Opening your email app…' : 'Compose email'}
                  {!sending && <UiIcon name="send" className="h-4 w-4" />}
                </button>
                {mailStatus ? (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`mt-3 text-sm ${
                      mailStatus.type === 'error' ? 'text-red-500' : 'text-muted'
                    }`}
                  >
                    {mailStatus.message}
                  </p>
                ) : null}
              </form>

              <div className="mt-6 flex justify-center gap-1">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-xl text-ink transition-all hover:-translate-y-0.5 hover:text-accent"
                  >
                    <SocialGlyph icon={s.icon} className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
