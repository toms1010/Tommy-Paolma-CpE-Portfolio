export type ProjectCategory = 'web' | 'game' | 'registration' | 'orders' | 'events';

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
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  note: string;
}

export type SkillIcon = 'code' | 'globe' | 'chip' | 'database' | 'shield' | 'tools';

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
}

export interface TimelineItem {
  kicker: string;
  title: string;
  description: string;
}

export type SocialIcon = 'x' | 'github' | 'linkedin' | 'facebook' | 'mail';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type Theme = 'dark' | 'light';
