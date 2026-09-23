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
  const [mailStatus, setMailStatus] = useState('');

  const set = (field: keyof ContactFormData, value: string): void => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }): void => {
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
    setMailStatus('');
    setSending(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    window.setTimeout(() => {
      setSending(false);
      // A mailto: link cannot confirm delivery, so report only what happened.
      setMailStatus(
        `Your email app should have opened with your message addressed to ${EMAIL}. If nothing opened, please email me directly at ${EMAIL}.`
      );
    }, 2000);
  };

  const copyEmail = (): void => {
    const done = (msg: string): void => {
      setCopyStatus(msg);
    };
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(EMAIL).then(
        () => {
          done('Email address copied to clipboard.');
        },
        () => {
          done(`Copy failed — the address is ${EMAIL}.`);
        }
      );
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
        <div className="mt-10 rounded-[2.5rem] border border-line bg-card p-6 text-center sm:p-10">
          <p className="mx-auto max-w-xl text-muted">
            Open to internships, OJT opportunities, collaborations, and technical conversations. The
            form below opens your email app — nothing is sent to a server.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${EMAIL}`} className="btn-primary">
              {EMAIL} <UiIcon name="mail" className="h-4 w-4" />
            </a>
            <button type="button" onClick={copyEmail} className="btn-outline">
              Copy email <UiIcon name="copy" className="h-4 w-4" />
            </button>
          </div>
          <p role="status" aria-live="polite" className="mt-2 min-h-6 text-sm text-accent">
            {copyStatus}
          </p>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-4 grid max-w-2xl gap-4 text-left"
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
            <button type="submit" disabled={sending} className="btn-primary justify-center">
              {sending ? 'Opening your email app…' : 'Compose email'}
              {!sending && <UiIcon name="send" className="h-4 w-4" />}
            </button>
            {mailStatus ? (
              <p role="status" aria-live="polite" className="text-sm text-muted">
                {mailStatus}
              </p>
            ) : null}
          </form>
          <div className="mt-8 flex justify-center gap-1">
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
      </Reveal>
    </section>
  );
}
