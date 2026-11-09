export type ProjectCategory =
  | 'web'
  | 'game'
  | 'registration'
  | 'orders'
  | 'events'
  | 'desktop'
  | 'mobile'
  | 'electronics'
  | 'other';

export interface Project {
  title: string;
  kicker: string;
  description: string;
  /** Real role on the project (e.g. sole developer, team consultant). Omit when unknown. */
  role?: string;
  problem?: string;
  solution?: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  /** Local public-dir images resolve through the Vite base; absolute URLs pass through. */
  imageLocal?: boolean;
  demo?: string;
  github?: string;
  categories: ProjectCategory[];
  /** Canonical URL slug for the dedicated project page (e.g. 'wit-barcode'). */
  projectId?: string;
  featured?: boolean;
  /**
   * anchor (or route) of the in-portfolio case-study section for this
   * project, e.g. "#project-transport-system". When present, project
   * cards render a "View Project" button linking to it.
   */
  detailsHref?: string;
  /** Extra display badges for the card (e.g. "Interactive Web App"). */
  badges?: string[];
  /** Bulleted objectives for the project details view. Omit when unknown. */
  objectives?: string[];
  /** Bulleted future improvements for the project details view. Omit when unknown. */
  futureImprovements?: string[];
  /** Gallery screenshots for the project details view. Omit when none. */
  screenshots?: { src: string; alt: string; caption: string }[];
  /** Optional rich case-study content rendered inside the project details modal. */
  highlights?: { title: string; body: string }[];
  /** Optional control table for game / interactive projects. */
  controls?: { input: string; action: string }[];
  /** Optional ordered game flow steps. */
  flow?: string[];
  /** Optional run command (e.g. install + launch steps). */
  runCommand?: string;
  /** Optional note about how to run / play the project. */
  runNote?: string;
  /** Optional ordered architecture / workflow steps for desktop applications. */
  workflow?: string[];
  /** Optional engineering challenges and how they were solved. */
  challenges?: { title: string; body: string }[];
  /** Optional call-to-action for the details modal. */
  cta?: { title: string; body: string };
}

export interface SkillItem {
  name: string;
  /** Short evidence tag (e.g. "Certified"). Omit when there is nothing factual to claim. */
  note?: string;
  /** Local public-dir logo path (e.g. "images/tech/c.svg"). Omit for text-only items. */
  logo?: string;
  /**
   * Experience tier grounded in actual project work.
   * 'used'   — shipped in a completed project (experienced).
   * 'familiar' — practiced, but not yet a core project technology.
   * 'learning' — actively studying; not claimed as expertise.
   */
  tier: 'used' | 'familiar' | 'learning';
}

export type SkillIcon =
  | 'code'
  | 'globe'
  | 'chip'
  | 'database'
  | 'shield'
  | 'tools'
  | 'server'
  | 'mobile'
  | 'game'
  | 'cloud';

export interface SkillGroup {
  title: string;
  icon: SkillIcon;
  blurb?: string;
  items: SkillItem[];
  images?: { src: string; alt: string }[];
}

export interface Certification {
  name: string;
  description: string;
  image: string;
  /** Category grouping (not fabricated — derived from the certificate subject). */
  category:
    | 'Programming & Software Development'
    | 'Web Development'
    | 'Databases & Data Science'
    | 'Cybersecurity'
    | 'Cloud Computing'
    | 'Hardware & System Configuration'
    | 'Workshops & Technical Training';
  /** Issuing organization. Omitted when not verified — never fabricated. */
  issuer?: string;
  /** Completion date. Omitted when not verified — never fabricated. */
  date?: string;
}

export interface TimelineItem {
  kicker: string;
  title: string;
  description: string;
  /** Organization or event name, when applicable. */
  organization?: string;
  /** Date or academic year range. Omit when not verified. */
  date?: string;
  /** Bulleted responsibilities / contributions. */
  responsibilities?: string[];
}

export type SocialIcon = 'x' | 'github' | 'linkedin' | 'facebook' | 'mail';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type Theme = 'dark' | 'light';
